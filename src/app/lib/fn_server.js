'use server'
import fs from 'fs';
import path from 'path';
import { unstable_cache } from 'next/cache';
import { supabase } from "@/app/lib/supabase";
import { generateHTML } from "@tiptap/html";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

// BLOGS
export const getCachedBlogs = unstable_cache(
  async () => {
    return await getBlogs();
  },
  ['blogs-list'], // Cache key
  { revalidate: 60, tags: ['blogs'] } // Revalidate every minute
);

export const getBlogs = async () => {
  try {
    // Slim payload for list views: omit the heavy Tiptap 'content' column
    const { data, error } = await supabase
      .from("blogs")
      .select("id, handle, title, excerpt, author, badge, read_duration, main_image, categories, published_at, created_at, updated_at")
      .order("published_at", { ascending: false });

    if (error) throw error;
    return data || [];

  } catch (error) {
    console.error("Detailed Error Loading Blogs: ", error);
    // Return a specific error object instead of just a string
    return { error: true, message: "Could not synchronize with BES Cloud. Check Supabase connection." };
  }
};

export async function getBlogById (id) {
    if(!id) return null;
    const { data } = await supabase.from("blogs").select("*").eq("id", id).maybeSingle();
    return data;
}

export async function getBlogByHandle (handle) {
  const { data: blog } = await supabase.from("blogs").select("*").eq("handle", handle).maybeSingle();
  if (!blog) return null;
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