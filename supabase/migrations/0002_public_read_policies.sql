-- Read-only public access for the marketing/frontend app, which authenticates
-- with the anon/publishable key (never the service_role key).
-- `users` intentionally gets no policy here -- it stays fully inaccessible
-- to anon, service_role-only, exactly as before.

-- BLOGS: only published posts are visible to anon.
create policy "public can read published blogs"
  on public.blogs
  for select
  to anon
  using (published_at is not null);

-- EVENTS: all events are public.
create policy "public can read events"
  on public.events
  for select
  to anon
  using (true);

-- FAQS: all faqs are public.
create policy "public can read faqs"
  on public.faqs
  for select
  to anon
  using (true);
