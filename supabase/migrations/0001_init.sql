-- Bayanihan Exchange Sweden: initial Supabase schema
-- Replaces the Upstash Redis data model (users, blogs, events, faqs) 1:1.
-- Run this once in the Supabase SQL Editor (or via the migration script) before
-- switching the app over.

-- USERS ---------------------------------------------------------------
-- Backs the NextAuth Credentials provider. Passwords stay bcrypt hashes,
-- carried over as-is from Redis (no rehash / reset needed).
create table if not exists public.users (
  id bigint primary key,
  username text unique not null,
  name text,
  password text not null,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

-- BLOGS -----------------------------------------------------------------
create table if not exists public.blogs (
  id text primary key,
  handle text unique not null,
  title text not null,
  excerpt text,
  author text,
  badge text,
  read_duration text,
  main_image text,
  categories text[] not null default '{}',
  content jsonb,
  published_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blogs_published_at_idx on public.blogs (published_at desc);

-- EVENTS ------------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  badge text,
  image text,
  description text,
  external_url text,
  external_link_button_label text,
  date timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists events_date_idx on public.events (date desc);

-- FAQS --------------------------------------------------------------------
create table if not exists public.faqs (
  id text primary key,
  question text not null,
  answer text,
  sort_order int not null default 0
);

create index if not exists faqs_sort_order_idx on public.faqs (sort_order);

-- All access happens server-side via the service role key (same trust
-- model as the previous Upstash REST token), so RLS stays enabled with no
-- public policies -- nothing is reachable from an anon/browser client.
alter table public.users enable row level security;
alter table public.blogs enable row level security;
alter table public.events enable row level security;
alter table public.faqs enable row level security;
