// One-time backfill: uploads every .webp under public/images into the
// Supabase "media" bucket/table (flat, no folder grouping), then rewires any
// blog.main_image / event.image that referenced the old local path to the
// new Supabase public URL. Safe to re-run -- files already present in the
// media table (matched by original filename) are skipped.
//
// Usage:
//   node --env-file=.env scripts/migrate-public-images.js

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const BUCKET = "media";
const IMAGES_ROOT = path.join(process.cwd(), "public", "images");
const MAX_BYTES = 2 * 1024 * 1024; // matches the bucket's 2MB limit

// Legacy pre-policy assets can exceed the 2MB cap. Re-encode as webp at
// decreasing quality (then downscale as a last resort) until it fits.
async function ensureUnderLimit(buffer, originalName) {
  if (buffer.length <= MAX_BYTES) return buffer;

  for (let quality = 80; quality >= 30; quality -= 10) {
    const out = await sharp(buffer).webp({ quality }).toBuffer();
    if (out.length <= MAX_BYTES) {
      console.log(`  Compressed ${originalName} to quality ${quality} (${out.length} bytes)`);
      return out;
    }
  }

  const out = await sharp(buffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 60 })
    .toBuffer();
  console.log(`  Downscaled ${originalName} to fit under 2MB (${out.length} bytes)`);
  return out;
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.webp$/i.test(entry.name)) out.push(full);
  }
  return out;
}

async function main() {
  const files = walk(IMAGES_ROOT);
  console.log(`Found ${files.length} .webp file(s) under public/images`);

  const { data: existingMedia, error: existingError } = await supabase
    .from("media")
    .select("original_name, url");
  if (existingError) throw existingError;
  const existingByName = new Map((existingMedia || []).map((m) => [m.original_name, m.url]));

  // Maps the old local public path (e.g. "/images/blogs/x.webp") to its new
  // Supabase URL, so blogs/events referencing it can be rewired below.
  const urlByPublicPath = {};

  for (const file of files) {
    const relFromPublic =
      "/" + path.relative(path.join(process.cwd(), "public"), file).split(path.sep).join("/");
    const originalName = path.basename(file);

    let url = existingByName.get(originalName);
    if (url) {
      console.log(`Skip (already migrated): ${originalName}`);
    } else {
      const buffer = await ensureUnderLimit(fs.readFileSync(file), originalName);
      const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.webp`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, buffer, { contentType: "image/webp", upsert: false });
      if (uploadError) {
        console.error(`Failed to upload ${originalName}: ${uploadError.message}`);
        continue;
      }

      const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
      url = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from("media").insert({
        file_name: fileName,
        original_name: originalName,
        url,
        size: buffer.length,
        content_type: "image/webp",
      });
      if (insertError) {
        await supabase.storage.from(BUCKET).remove([fileName]);
        console.error(`Failed to record ${originalName}: ${insertError.message}`);
        continue;
      }
      console.log(`Migrated: ${originalName} -> ${url}`);
    }

    urlByPublicPath[relFromPublic] = url;
  }

  const { data: blogs, error: blogsError } = await supabase.from("blogs").select("id, main_image");
  if (blogsError) throw blogsError;
  let blogUpdates = 0;
  for (const blog of blogs || []) {
    const newUrl = blog.main_image && urlByPublicPath[blog.main_image];
    if (newUrl && newUrl !== blog.main_image) {
      const { error } = await supabase.from("blogs").update({ main_image: newUrl }).eq("id", blog.id);
      if (error) console.error(`Failed to update blog ${blog.id}: ${error.message}`);
      else {
        blogUpdates++;
        console.log(`Blog ${blog.id}: main_image -> ${newUrl}`);
      }
    }
  }

  const { data: events, error: eventsError } = await supabase.from("events").select("id, image");
  if (eventsError) throw eventsError;
  let eventUpdates = 0;
  for (const event of events || []) {
    const newUrl = event.image && urlByPublicPath[event.image];
    if (newUrl && newUrl !== event.image) {
      const { error } = await supabase.from("events").update({ image: newUrl }).eq("id", event.id);
      if (error) console.error(`Failed to update event ${event.id}: ${error.message}`);
      else {
        eventUpdates++;
        console.log(`Event ${event.id}: image -> ${newUrl}`);
      }
    }
  }

  console.log(
    `\nDone. ${blogUpdates} blog(s) and ${eventUpdates} event(s) rewired to Supabase URLs.`,
  );
}

main().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
