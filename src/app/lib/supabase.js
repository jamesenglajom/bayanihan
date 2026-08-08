import { createClient } from '@supabase/supabase-js'

// Server-only client using the service role key. Never import this from a
// "use client" component -- it bypasses Row Level Security entirely, the
// same trust boundary the old Upstash REST token had.
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)
