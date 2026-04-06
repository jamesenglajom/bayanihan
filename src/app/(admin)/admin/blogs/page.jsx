import React from "react";
import { redis } from "@/app/lib/upstash";
import BlogsTable from "@/app/components/admin/BlogsTable";
import { getCachedBlogs } from "@/app/lib/fn_server"
export const metadata = {
  title: "Blogs | Admin",
};

// const getBlogs = async () => {
//   try {
//     // 1. Get the Index (Source of Truth) from environment variable key
//     const blogsKey = process.env.UPSTASH_KEY_BLOGS;
//     const blogIds = (await redis.get(blogsKey)) || [];

//     // 2. Guard: If no blogs exist, return empty array immediately
//     // This prevents calling mget with empty arguments which causes an error
//     if (!blogIds || blogIds.length === 0) {
//       return [];
//     }

//     // 3. Fetch all data in one efficient round-trip
//     const allBlogs = await redis.mget(...blogIds);

//     // 4. Filter, Transform, and Sort
//     // filter(Boolean) removes nulls if an ID exists but the data was deleted
//     return allBlogs
//       .filter(Boolean)
//       .map(({ content, ...rest }) => ({
//         ...rest, 
//         // We omit the 'content' (Tiptap JSON) to keep the table payload light
//       }))
//       .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

//   } catch (error) {
//     console.error("Detailed Error Loading Blogs: ", error);
//     // Return a specific error object instead of just a string
//     return { error: true, message: "Could not synchronize with BES Cloud. Check Redis connection." };
//   }
// };

async function page() {
  const blogsData = await getCachedBlogs();

  // Handle Error State gracefully
  if (blogsData.error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-xl border border-red-200 m-6">
        <h2 className="text-red-800 font-bold text-xl">Database Connection Error</h2>
        <p className="text-red-600 mt-2">{blogsData.message}</p>
      </div>
    );
  }

  // Handle Empty State
  // if (blogsData.length === 0) {
  //   return (
  //     <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl m-6">
  //       <p className="text-slate-500 font-medium italic">No blogs found. Start by creating your first post!</p>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6">
       <BlogsTable blogs={blogsData} />
    </div>
  );
}

export default page;