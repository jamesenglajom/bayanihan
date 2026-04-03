import { NextResponse } from "next/server";
import { redis } from "@/app/lib/upstash";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Destructure everything you plan to use
    const {
      name,
      location,
      badge,
      date,
      image,
      description,
      external_url,
      external_link_button_label,
    } = body;

    // 2. Safely convert the incoming date string to a timestamp
    // If 'date' is missing, Date.now() serves as a fallback
    const parsedDate = date ? new Date(date) : new Date();
    const timestamp = parsedDate.getTime();

    // 3. Build the object
    const eventId = crypto.randomUUID();
    const eventData = {
      id: eventId,
      date: parsedDate.toISOString(), // Standardized string format
      timestamp, // Store the raw number for easy sorting later
      badge,
      image,
      name,
      location,
      description,
      external_url,
      external_link_button_label
    };

    // 4. Save to Upstash
    await redis.zadd(process.env.UPSTASH_KEY_EVENTS, {
      score: timestamp,
      member: JSON.stringify(eventData),
    });
    revalidatePath("/admin/events");
    return NextResponse.json({ success: true, id: eventId }, { status: 201 });
  } catch (error) {
    console.error("Redis Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save event" },
      { status: 500 },
    );
  }
}
