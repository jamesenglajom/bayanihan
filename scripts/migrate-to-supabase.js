// One-time backfill: copies existing data out of Upstash Redis and into
// Supabase Postgres. Safe to re-run -- everything is upserted on primary key.
//
// Usage:
//   node --env-file=.env scripts/migrate-to-supabase.js

const { Redis } = require("@upstash/redis");
const { createClient } = require("@supabase/supabase-js");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function parse(value) {
  return typeof value === "string" ? JSON.parse(value) : value;
}

async function migrateUsers() {
  const keys = await redis.keys("user:*");
  if (keys.length === 0) {
    console.log("Users: nothing to migrate");
    return;
  }

  const raw = await redis.mget(...keys);
  const rows = [];
  const usedIds = new Set();
  raw.forEach((entry, i) => {
    if (!entry) return;
    try {
      const user = parse(entry);
      if (!user?.username || !user?.password) {
        console.warn(`Users: skipping malformed entry for key ${keys[i]}`);
        return;
      }
      let id = user.id ?? Date.now() + i;
      if (usedIds.has(id)) {
        // Source data has colliding ids (copy-paste artifact) -- keep
        // uniqueness by offsetting instead of dropping the user.
        console.warn(`Users: id ${id} collided for "${user.username}", reassigning`);
        id = Date.now() + i;
      }
      usedIds.add(id);
      rows.push({
        id,
        username: user.username.toLowerCase(),
        name: user.name || null,
        password: user.password,
        role: user.role || "user",
      });
    } catch (err) {
      console.warn(`Users: skipping unparsable entry for key ${keys[i]}:`, err.message);
    }
  });

  if (rows.length === 0) {
    console.log("Users: nothing valid to migrate");
    return;
  }

  const { error } = await supabase.from("users").upsert(rows, { onConflict: "username" });
  if (error) throw new Error(`Users migration failed: ${error.message}`);
  console.log(`Users: migrated ${rows.length}`);
}

async function migrateBlogs() {
  const blogIds = (await redis.get(process.env.UPSTASH_KEY_BLOGS)) || [];
  if (blogIds.length === 0) {
    console.log("Blogs: nothing to migrate");
    return;
  }

  const allBlogs = await redis.mget(...blogIds);
  const rows = allBlogs.filter(Boolean).map((blog) => ({
    id: blog.id,
    handle: blog.handle,
    title: blog.title,
    excerpt: blog.excerpt || null,
    author: blog.author || null,
    badge: blog.badge || null,
    read_duration: blog.read_duration || null,
    main_image: blog.main_image || null,
    categories: Array.isArray(blog.categories) ? blog.categories : [],
    content: blog.content || null,
    published_at: blog.published_at || null,
    created_at: blog.created_at || new Date().toISOString(),
    updated_at: blog.updated_at || new Date().toISOString(),
  }));

  const { error } = await supabase.from("blogs").upsert(rows, { onConflict: "id" });
  if (error) throw new Error(`Blogs migration failed: ${error.message}`);
  console.log(`Blogs: migrated ${rows.length}`);
}

async function migrateEvents() {
  const raw = await redis.zrange(process.env.UPSTASH_KEY_EVENTS, 0, -1);
  if (!raw || raw.length === 0) {
    console.log("Events: nothing to migrate");
    return;
  }

  const rows = raw.map(parse).map((event) => ({
    id: event.id,
    name: event.name,
    location: event.location || null,
    badge: event.badge || null,
    image: event.image || null,
    description: event.description || null,
    external_url: event.external_url || null,
    external_link_button_label: event.external_link_button_label || null,
    date: event.date,
  }));

  const { error } = await supabase.from("events").upsert(rows, { onConflict: "id" });
  if (error) throw new Error(`Events migration failed: ${error.message}`);
  console.log(`Events: migrated ${rows.length}`);
}

async function migrateFaqs() {
  const faqs = (await redis.get(process.env.UPSTASH_KEY_FAQ)) || [];
  if (faqs.length === 0) {
    console.log("FAQs: nothing to migrate");
    return;
  }

  const rows = faqs.map((faq, index) => ({
    id: faq.id?.toString(),
    question: faq.question,
    answer: faq.answer || null,
    sort_order: index,
  }));

  const { error } = await supabase.from("faqs").upsert(rows, { onConflict: "id" });
  if (error) throw new Error(`FAQs migration failed: ${error.message}`);
  console.log(`FAQs: migrated ${rows.length}`);
}

async function main() {
  const required = [
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
  ];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`Missing env vars: ${missing.join(", ")}`);
    console.error("Run with: node --env-file=.env scripts/migrate-to-supabase.js");
    process.exit(1);
  }

  await migrateUsers();
  await migrateBlogs();
  await migrateEvents();
  await migrateFaqs();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
