import { NextResponse } from 'next/server';
import { redis } from '@/app/lib/upstash';
import { revalidatePath } from 'next/cache';

export async function PUT(request) {
  try {
    const body = await request.json();
    
    // id: the unique event ID
    // oldEventString: the EXACT JSON string currently in Redis
    // newData: the updated fields from your form
    const { id, oldEventString, newData } = body;

    if (!id || !oldEventString) {
      return NextResponse.json(
        { error: "Missing ID or original event data" }, 
        { status: 400 }
      );
    }

    // 1. Prepare the updated object
    // We keep the original ID but merge in the new data
    const updatedEventData = {
      ...newData,
      id: id,
    };

    // 2. Calculate the score (timestamp) for the new entry
    const newTimestamp = new Date(updatedEventData.date).getTime();

    // 3. Use a Pipeline to ensure Atomic execution
    // This prevents a "ghost" event where the old one is deleted 
    // but the new one fails to save.
    const pipeline = redis.pipeline();
    
    // Remove the old member (exact string match required)
    pipeline.zrem(process.env.UPSTASH_KEY_EVENTS, oldEventString);
    
    // Add the new member
    pipeline.zadd(process.env.UPSTASH_KEY_EVENTS, {
      score: newTimestamp,
      member: JSON.stringify(updatedEventData),
    });

    await pipeline.exec();

    // 4. Clear the Next.js cache so the table shows the change immediately
    revalidatePath('/admin/events');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update event" }, 
      { status: 500 }
    );
  }
}