import { NextResponse } from 'next/server';
import { redis } from '@/app/lib/upstash';
export async function GET() {
  try {
      const rawEvents = await redis.zrange(process.env.UPSTASH_KEY_EVENTS, 0, -1, { rev: true });
      const events = rawEvents.map((item) => 
        typeof item === 'string' ? JSON.parse(item) : item
      );
    return NextResponse.json(events || [], { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: 'Failed to fetch Event' }, { status: 500 });
  }
}