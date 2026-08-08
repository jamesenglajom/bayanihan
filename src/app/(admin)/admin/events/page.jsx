import React from 'react'
import { supabase } from '@/app/lib/supabase';
import EventsTable from '@/app/components/admin/EventsTable';
export const metadata = {
  title: "Events | Admin",
};

export const dynamic = 'force-dynamic';

async function page() {
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });

  return (
    <EventsTable events={events || []}/>
  )
}

export default page