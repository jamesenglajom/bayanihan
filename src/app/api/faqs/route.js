import { NextResponse } from 'next/server';
import { redis } from '@/app/lib/upstash';

export async function GET() {
  try {
    const data = await redis.get(process.env.UPSTASH_KEY_FAQ);
    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}