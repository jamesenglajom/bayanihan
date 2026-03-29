import { redis } from "@/app/lib/upstash";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

// BLOGS
export async function getBlogById (id) {
    if(!id) return null;
    const blog_id = `blog-${id}`;
    const blog = await redis.get(blog_id);
    return blog;
}

export async function getBlogByHandle (handle) {
  const handle_key = `handle:${handle}`;
  const blog_id = await redis.get(handle_key);
  const blog = await redis.get(blog_id);
  blog["content"] = generateHTML(blog?.content, [StarterKit]);
  return blog;
};