import { supabase } from '@/app/lib/supabase';
import { notFound } from 'next/navigation';
import EventsForm from '@/app/components/admin/EventsForm';

export default async function EventPage({ params }) {
  const { id } = await params;

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (!event) {
    notFound(); // Triggers 404 if not found
  }

  return (
    <EventsForm event={event}/>
  );
}