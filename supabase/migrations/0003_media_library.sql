-- Media library: metadata for images uploaded to the "media" Storage bucket.
-- The bucket holds the bytes; this table is the source of truth for search
-- and pagination in the admin Media Library and image picker.

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  file_name text unique not null,
  original_name text,
  url text not null,
  size bigint not null,
  content_type text not null default 'image/webp',
  created_at timestamptz not null default now()
);

create index if not exists media_created_at_idx on public.media (created_at desc);

-- Reachable only via the service-role key from admin API routes -- same
-- trust model as users/blogs/events/faqs writes. No anon policy.
alter table public.media enable row level security;
