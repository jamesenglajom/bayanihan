'use server'
import fs from 'fs';
import path from 'path';
import { redis } from "@/app/lib/upstash";
import { generateHTML } from "@tiptap/html";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
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
  blog["content"] = generateHTML(blog?.content, [
    StarterKit,
    Image,
    Underline,
    Link.configure({
      HTMLAttributes: {
        class: "text-blue-600 underline", 
      },
    }),
  ]);
  return blog;
};

// LOAD PUBLIC IMAGES
export async function loadPublicImages(public_url) {
  const dir = path.join(process.cwd(), public_url || 'public/images/blogs');
  
  try {
    const files = fs.readdirSync(dir);

    // 1. Filter for images and map to an object with stats
    const filesWithStats = files
      .filter(file => /\.(png|jpe?g|webp|gif|svg)$/i.test(file))
      .map(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          time: stats.mtime.getTime(), // Get timestamp
        };
      });

    // 2. Sort by time (Descending: newest first)
    filesWithStats.sort((a, b) => b.time - a.time);

    // 3. Return only the filenames
    return filesWithStats.map(file => file.name);

  } catch (error) {
    console.error("Directory not found or error reading stats", error);
    return [];
  }
}