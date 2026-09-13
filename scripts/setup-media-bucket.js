// One-time setup: creates the public "media" Storage bucket used by the
// admin Media Library and the blog/event image picker. Safe to re-run --
// exits quietly if the bucket already exists.
//
// Usage:
//   node --env-file=.env scripts/setup-media-bucket.js

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET = "media";

async function main() {
  const { data: existing, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw listError;

  const options = {
    public: true,
    fileSizeLimit: 2 * 1024 * 1024, // 2MB
    allowedMimeTypes: ["image/webp"],
  };

  if (existing.some((b) => b.name === BUCKET)) {
    const { error } = await supabase.storage.updateBucket(BUCKET, options);
    if (error) throw error;
    console.log(`Bucket "${BUCKET}" already existed -- updated to public, 2MB limit, webp only.`);
    return;
  }

  const { error } = await supabase.storage.createBucket(BUCKET, options);
  if (error) throw error;
  console.log(`Bucket "${BUCKET}" created (public, 2MB limit, webp only).`);
}

main().catch((err) => {
  console.error("Failed to set up media bucket:", err.message);
  process.exit(1);
});
