import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

const BUCKET = "media";

// --- DELETE: Remove an image from the library and the bucket ---
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const { data: row, error: fetchError } = await supabase
      .from("media")
      .select("file_name")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!row) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const { error: removeError } = await supabase.storage.from(BUCKET).remove([row.file_name]);
    if (removeError) throw removeError;

    const { error: deleteError } = await supabase.from("media").delete().eq("id", id);
    if (deleteError) throw deleteError;

    return NextResponse.json({ message: "Image deleted" });
  } catch (error) {
    console.error("Media Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
