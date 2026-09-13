export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_IMAGE_TYPE = "image/webp";

// Shared by the Media Library upload UI, the image picker's upload tab, and
// the upload API route -- client-side checks are for UX only, the route is
// the real gate.
export function validateImageFile(file) {
  if (!file) return "No file selected.";
  if (file.type !== ALLOWED_IMAGE_TYPE) return "Only WEBP images are allowed.";
  if (file.size > MAX_IMAGE_SIZE) return "Image must be 2MB or smaller.";
  return null;
}
