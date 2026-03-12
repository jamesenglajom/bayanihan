import { redis } from '@/app/lib/upstash';
import { notFound } from 'next/navigation';
import EventsForm from '@/app/components/admin/EventsForm';

export default async function EventPage({ params }) {
  const { id } = await params;

  // 1. Fetch all members from the set
  const allEventsRaw = await redis.zrange(process.env.UPSTASH_KEY_EVENTS, 0, -1);
  
  // 2. Find the specific event by ID
  const event = allEventsRaw
    .map(item => typeof item === 'string' ? JSON.parse(item) : item)
    .find(e => e.id == id);

  if (!event) {
    notFound(); // Triggers 404 if not found
  }

  return (
    <EventsForm event={event}/>
  );
}