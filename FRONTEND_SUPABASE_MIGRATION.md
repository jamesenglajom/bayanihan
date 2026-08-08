# Task: Replace Redis/Upstash data-fetching with Supabase (read-only)

## Context

This app is the **public-facing frontend** for Bayanihan Exchange Sweden. Its sibling admin app was just migrated off Upstash Redis onto Supabase Postgres — **all writes (new blogs, events, FAQs) now go to Supabase, not Redis.** If this frontend keeps reading from Redis, it will silently go stale: anything added or edited in the admin from now on will never show up here.

Your job: find every place this app reads from Redis/Upstash and swap it for a Supabase read, **without changing any UI/component code** — only the data-fetching functions. Component contracts (prop shapes, field names) must stay identical so nothing downstream breaks.

## Step 1 — Audit before touching anything

```bash
grep -rln "upstash\|UPSTASH\|@upstash/redis\|ioredis" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" .
grep -rn "redis\." --include="*.js" --include="*.jsx" .
```

Expect to find something close to this shape (this is the sibling app's pre-migration code, likely near-identical here):

- `src/app/lib/upstash.js` — exports a `redis` client and a `getFAQs()` function
- `src/app/lib/fn_server.js` — exports `getCachedBlogs()`, `getBlogs()`, `getBlogById(id)`, `getBlogByHandle(handle)`, all backed by Redis
- The homepage likely imports `redis` **directly** and calls `redis.zrange(process.env.UPSTASH_KEY_EVENTS, 0, -1, { rev: true })` inline — not wrapped in a helper
- A public blogs listing page and a `/blogs/[handle]` detail page, both calling the `fn_server.js` functions
- A `Faqs` component fed by `getFAQs()`, an `Events` component fed by the inline redis call, a `News` component fed by `getCachedBlogs()`

If actual file names/locations differ, adapt the same pattern — every function that currently returns data via Redis needs its internals replaced, keeping the same function signature and return shape.

## Step 2 — Install and configure Supabase

```bash
npm install @supabase/supabase-js
```

Add to `.env` (safe to expose client-side — read-only, RLS-scoped to public data only, cannot write, cannot see the `users`/auth table at all):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://qjqaclyoxxmvzjzaserg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_TBfgmk__XaU2ZNVOC1FTmw_3-95UaAI
```

Create `src/app/lib/supabase.js`:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
```

## Step 3 — Replace `lib/upstash.js`'s `getFAQs()`

Old (Redis):
```js
export const getFAQs = async() => {
  try {
    const data = await redis.get(process.env.UPSTASH_KEY_FAQ);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch FAQs.");
  }
}
```

New (Supabase) — **same function name, same return shape** (array of `{id, question, answer}`):
```js
import { supabase } from "@/app/lib/supabase";

export const getFAQs = async() => {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('id, question, answer')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch FAQs.");
  }
}
```

If `lib/upstash.js` also exports a bare `redis` client used elsewhere, leave that export in place (don't delete the file) — just stop relying on it for FAQs.

## Step 4 — Replace `lib/fn_server.js`'s blog functions

Keep `getCachedBlogs` and its `unstable_cache` wrapper exactly as-is — only the inner functions' bodies change:

```js
import { supabase } from "@/app/lib/supabase";

export const getBlogs = async () => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, handle, title, excerpt, author, badge, read_duration, main_image, categories, published_at, created_at, updated_at')
      .order('published_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Detailed Error Loading Blogs: ", error);
    return { error: true, message: "Could not synchronize with BES Cloud." };
  }
};

export async function getBlogById(id) {
  if (!id) return null;
  const { data } = await supabase.from('blogs').select('*').eq('id', id).maybeSingle();
  return data;
}

export async function getBlogByHandle(handle) {
  const { data: blog } = await supabase.from('blogs').select('*').eq('handle', handle).maybeSingle();
  if (!blog) return null;
  // `content` is stored as Tiptap JSON (jsonb) -- keep whatever generateHTML
  // conversion this function already does, it doesn't need to change.
  blog["content"] = generateHTML(blog?.content, [/* existing extensions */]);
  return blog;
}
```

**Important:** the old code filtered published posts client-side (`published_at !== ""`). With Supabase + RLS, unpublished/draft blogs are **already invisible** to this key at the database level — `getBlogs()` above will never return drafts. If the blogs-listing page has a manual `.filter(({published_at}) => published_at !== "")`, it's now redundant (harmless to leave, safe to remove).

## Step 5 — Add `getEvents()` and replace the inline homepage Redis call

If the homepage has something like:
```js
const rawEvents = await redis.zrange(process.env.UPSTASH_KEY_EVENTS, 0, -1, { rev: true });
const events = (rawEvents || [])
  .map((item) => (typeof item === 'string' ? JSON.parse(item) : item))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
```

Replace it with a helper and call that instead:
```js
export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });
  if (error) {
    console.error("Error loading events:", error);
    return [];
  }
  return data || [];
}
```

Returned event objects keep the same field names as before (`name`, `location`, `badge`, `image`, `description`, `external_url`, `external_link_button_label`, `date`) — the `Events` component should need zero changes. One field is gone: the old Redis events had a numeric `timestamp` field alongside `date`. If any component reads `event.timestamp` directly for sorting, switch it to `new Date(event.date)` — Postgres doesn't carry the duplicate field.

## Step 6 — Verify, don't assume

1. `npm run build` — must be clean
2. Run dev and actually load: homepage, FAQ section, events section, blogs listing, one blog detail page
3. Add a test blog/event in the **admin app**, confirm it shows up here — proves you're reading from Supabase, not a stale cached Redis result
4. Confirm no *live* Redis read remains in any reachable code path — that staleness bug is the entire reason for this migration

## What NOT to touch

- Don't change any component's props or rendering — only the data-fetching functions
- Don't touch the donate page or purely static/presentational components (Navbar, Footer, Banner, OurStory, Leaders, SpotLight, WhatWeDo, Contact, Growth) — no data fetching there
- Don't delete the old `lib/upstash.js` Redis client or `UPSTASH_*` env vars — leave them in place unused, in case of rollback
- This app should only ever use the **anon/publishable key** above, never a `service_role` key — it has no write access and can't sign in or create posts (that's the admin app's job)
