import React from "react";
import Image from "next/image";
import Link from "next/link";
import {redis} from "@/app/lib/upstash"
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
export const dynamic = "force-dynamic";

const getBlogs = async () => {
  try {
    // 1. Get the Index (Source of Truth) from environment variable key
    const blogsKey = process.env.UPSTASH_KEY_BLOGS;
    const blogIds = (await redis.get(blogsKey)) || [];

    // 2. Guard: If no blogs exist, return empty array immediately
    // This prevents calling mget with empty arguments which causes an error
    if (!blogIds || blogIds.length === 0) {
      return [];
    }

    // 3. Fetch all data in one efficient round-trip
    const allBlogs = await redis.mget(...blogIds);

    console.log("allBlogs", allBlogs);

    // 4. Filter, Transform, and Sort
    // filter(Boolean) removes nulls if an ID exists but the data was deleted
    return allBlogs
      .filter(Boolean)
      .map(({ content, ...rest }) => ({
        ...rest, 
        // We omit the 'content' (Tiptap JSON) to keep the table payload light
      }))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  } catch (error) {
    console.error("Detailed Error Loading Blogs: ", error);
    // Return a specific error object instead of just a string
    return { error: true, message: "Could not synchronize with BES Cloud. Check Redis connection." };
  }
};


export default async function page({ searchParams }) {
  const allBlogs = await getBlogs();
  const currentPage = Number(searchParams?.page) || 1;
  const postsPerPage = 6;
  
  // High-end logic: The very first post is "Featured" and gets a special layout
  const featuredPost = allBlogs[0];
  const regularPosts = allBlogs.slice(1);
  
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);
  const displayPosts = regularPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-700">
      
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        
        {/* 2. Featured Post: Editorial Style */}
        {featuredPost && currentPage === 1 && (
          <section className="mb-20">
            <Link href={`/blogs/${featuredPost.handle}`} className="group relative grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#070e1e] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-white/5 transition-all duration-500 hover:shadow-blue-500/10">
              <div className="lg:col-span-7 relative h-[300px] lg:h-[500px] overflow-hidden">
                <Image 
                  src={featuredPost.main_image} 
                  alt={featuredPost.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              </div>
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-yellow-500 font-black text-[10px] tracking-[0.2em] mb-4 uppercase">
                  <span className="w-8 h-[2px] bg-yellow-500" /> Featured Story
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold text-[#001d3d] dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-100 dark:border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">
                        {featuredPost.author?.[0] || 'B'}
                      </div>
                      <span className="text-sm font-bold dark:text-slate-300">{featuredPost.author || 'BES Team'}</span>
                   </div>
                   <ArrowRight className="text-slate-300 group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-all group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* 3. The Grid: "Masonry-ish" Clean Look */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayPosts.map((blog) => (
            <article key={blog.id} className="group flex flex-col">
              <Link href={`/blogs/${blog.handle}`} className="relative h-72 mb-6 overflow-hidden rounded-[2rem] shadow-xl">
                 <Image 
                   src={blog.image} 
                   alt={blog.title} 
                   fill 
                   className="object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </Link>
              <div className="px-2">
                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  <span className="text-blue-600 dark:text-yellow-500">{blog.category}</span>
                  <span>•</span>
                  <span>{blog.read_duration}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#001d3d] dark:text-white mb-4 leading-snug hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
                  <Link href={`/blogs/${blog.handle}`}>{blog.title}</Link>
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* 4. Sleek Pagination */}
        {totalPages > 1 && (
            <nav className="mt-24 flex items-center justify-center gap-4">
                <PaginationLink href={`?page=${currentPage-1}`} disabled={currentPage === 1}>
                    <ChevronLeft size={20} />
                </PaginationLink>
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
                    Page {currentPage} <span className="mx-2 text-slate-200">/</span> {totalPages}
                </span>
                <PaginationLink href={`?page=${currentPage+1}`} disabled={currentPage === totalPages}>
                    <ChevronRight size={20} />
                </PaginationLink>
            </nav>
        )}
      </div>
    </div>
  );
}

function PaginationLink({ href, children, disabled }) {
    return (
        <Link 
            href={disabled ? '#' : href}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all border
                ${disabled 
                    ? 'opacity-20 cursor-not-allowed border-slate-200 dark:border-white/10' 
                    : 'bg-white dark:bg-[#070e1e] border-slate-100 dark:border-white/5 shadow-lg hover:border-blue-500 dark:hover:border-yellow-500 hover:-translate-y-1 text-[#001d3d] dark:text-white'}`}
        >
            {children}
        </Link>
    )
}