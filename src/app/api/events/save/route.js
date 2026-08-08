import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const body = await request.json();

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

    const parsedDate = date ? new Date(date) : new Date();

    const { data, error } = await supabase
      .from("events")
      .insert({
        date: parsedDate.toISOString(),
        badge,
        image,
        name,
        location,
        description,
        external_url,
        external_link_button_label,
      })
      .select("id")
      .single();

    if (error) throw error;

    revalidatePath("/admin/events");
    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (error) {
    console.error("Supabase Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save event" },
      { status: 500 },
    );
  }
}
