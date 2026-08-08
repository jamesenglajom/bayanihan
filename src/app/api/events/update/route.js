import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...newData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing event ID" },
        { status: 400 }
      );
    }

    const updatedFields = {
      ...newData,
      date: newData.date ? new Date(newData.date).toISOString() : undefined,
    };

    const { error } = await supabase
      .from('events')
      .update(updatedFields)
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/events');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Supabase Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}
