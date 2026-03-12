import React from 'react'
import { redis } from '@/app/lib/upstash';
import EventsTable from '@/app/components/admin/EventsTable';
export const metadata = {
  title: "Events | Admin",
};



async function page() {
  // 1. Fetch from Upstash
  // zrange returns an array of strings (our JSON events)
  // { rev: true } puts the newest timestamps at the top
  const rawEvents = await redis.zrange(process.env.UPSTASH_KEY_EVENTS, 0, -1, { rev: true });
  // 2. Parse the strings back into JavaScript objects
  // Upstash often auto-parses, but mapping ensures consistency
  const events = rawEvents.map((item) => 
    typeof item === 'string' ? JSON.parse(item) : item
  );

  return (
    <EventsTable events={events}/>
  )
}

export default page