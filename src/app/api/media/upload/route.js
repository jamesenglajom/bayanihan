import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import { validateImageFile } from "@/app/lib/imageValidation";

const BUCKET = "media";

// --- POST: Upload an image into the media library ---
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    const validationError = validateImageFile(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.webp`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, buffer, { contentType: "image/webp", upsert: false });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

    const row = {
      file_name: fileName,
      original_name: file.name || fileName,
      url: publicUrlData.publicUrl,
      size: file.size,
      content_type: "image/webp",
    };

    const { data, error: insertError } = await supabase
      .from("media")
      .insert(row)
      .select()
      .single();

    if (insertError) {
      // Roll back the uploaded object so storage and the media table stay in sync.
      await supabase.storage.from(BUCKET).remove([fileName]);
      throw insertError;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Media Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
