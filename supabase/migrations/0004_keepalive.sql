-- Tracks pings used to keep the free-tier Supabase project from pausing due
-- to inactivity (weekly cron + an optional manual button in /admin/supabase).

create table if not exists public.keepalive_pings (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'manual', -- 'manual' | 'cron'
  created_at timestamptz not null default now()
);

create index if not exists keepalive_pings_created_at_idx on public.keepalive_pings (created_at desc);

-- Reachable only via the service-role key from admin API routes.
alter table public.keepalive_pings enable row level security;
