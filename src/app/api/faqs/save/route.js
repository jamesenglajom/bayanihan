import { NextResponse } from 'next/server';
import { redis } from '@/app/lib/upstash'; // Assuming you put redis client in src/lib/redis.js

export async function POST(request) {
  try {
    const body = await request.json();
    await redis.set(process.env.UPSTASH_KEY_FAQ, body);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}