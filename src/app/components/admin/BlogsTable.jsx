"use client";
import {
  Pencil,
  User,
  Calendar,
  Tag,
  Plus,
  ImageIcon,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const BlogsTable = ({ blogs = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Search Logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [blogs, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage,
  ).sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="w-full max-w-7xl mx-auto antialiased text-slate-800 dark:text-slate-200">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Blog Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
            Manage your association's stories and updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all w-full sm:w-64"
            />
          </div>
          <Link
            href="/admin/blogs/add"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors active:scale-95 font-bold text-sm whitespace-nowrap"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Create Post</span>
          </Link>
        </div>
      </div>

      {/* --- Desktop Table View --- */}
      <div className="hidden md:block overflow-hidden bg-white dark:bg-white/2 border border-slate-200 dark:border-slate-800/60 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-white/2 border-b border-slate-200 dark:border-slate-800/60">
              <th className="p-4 pl-6 font-bold text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 w-20">
                Preview
              </th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Article Details
              </th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 w-56">
                Author & Read
              </th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 w-36">
                Published
              </th>
              <th className="p-4 pr-6 text-right font-bold text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 w-28">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {currentItems.map((blog, index) => (
              <tr
                key={blog?.id || index}
                className="group hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors duration-150"
              >
                {/* Media Column */}
                <td className="p-4 pl-6">
                  <div className="relative h-11 w-11 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                    {blog?.main_image ? (
                      <Image
                        src={blog.main_image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full bg-slate-200/40 dark:bg-slate-800 text-slate-400 dark:text-slate-600">
                        <ImageIcon size={16} strokeWidth={1.5} className="flex-shrink-0" />
                      </div>
                    )}
                  </div>
                </td>

                {/* Article Details Column */}
                <td className="p-4">
                  <div className="flex flex-col max-w-md">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-500/20 uppercase tracking-tight">
                        {blog?.badge || "Post"}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {blog?.title}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 italic font-serif line-clamp-1 mt-0.5">
                      "{blog?.excerpt || blog?.description}"
                    </span>
                  </div>
                </td>

                {/* Author Column */}
                <td className="p-4 text-slate-600 dark:text-slate-400">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <User size={14} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                      <span className="truncate">
                        {blog?.author || "Anonymous"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      <Tag size={12} className="flex-shrink-0" />
                      {blog?.read_duration || "5 min read"}
                    </div>
                  </div>
                </td>

                {/* Timeline Column */}
                <td className="p-4 text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2 text-xs font-bold whitespace-nowrap font-mono">
                    <Calendar size={14} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                    {blog?.published_at
                      ? new Date(blog.published_at).toLocaleDateString()
                      : <span className="text-amber-500 dark:text-amber-400 font-sans font-bold uppercase text-[10px] tracking-wider">Draft</span>}
                  </div>
                </td>

                {/* Action Column */}
                <td className="p-4 pr-6 text-right">
                  <Link
                    href={`/admin/blogs/update/${blog?.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 transition-colors"
                  >
                    <Pencil size={14} />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile Card View --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {currentItems.map((blog) => (
          <div
            key={blog?.id}
            className="p-5 bg-white dark:bg-white/2 border border-slate-200 dark:border-slate-800/60 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>
            <div className="flex items-center justify-between mb-4 pl-2">
              <span className="text-[10px] font-black bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 uppercase tracking-widest">
                {blog?.badge || "Post"}
              </span>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 font-mono">
                <Calendar size={12} className="flex-shrink-0" />{" "}
                {blog?.published_at ? new Date(blog.published_at).toLocaleDateString() : "Draft"}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white leading-tight mb-2 pl-2">
              {blog?.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 line-clamp-2 italic font-serif pl-2">
              {blog?.excerpt || "No summary provided."}
            </p>
            <Link
              href={`/admin/blogs/update/${blog?.id}`}
              className="flex items-center justify-center w-full py-3 bg-slate-900 dark:bg-indigo-600 text-white text-xs font-bold rounded-lg active:scale-95 transition-all"
            >
              <Pencil size={14} className="mr-2" /> Manage Content
            </Link>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="py-20 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">No articles match your search.</p>
        </div>
      )}

      {/* --- Pagination --- */}
      {filteredBlogs.length > 0 && (
        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between border-t border-slate-100 dark:border-slate-800/60 pt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Showing <span className="text-slate-900 dark:text-white font-mono">{startIndex + 1}</span> -{" "}
            <span className="text-slate-900 dark:text-white font-mono">
              {Math.min(startIndex + itemsPerPage, filteredBlogs.length)}
            </span>{" "}
            of <span className="font-mono">{filteredBlogs.length}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center px-4 h-9 bg-slate-900 dark:bg-indigo-600 rounded-lg text-white font-bold text-xs font-mono">
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsTable;
