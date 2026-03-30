"use client";
import { Pencil, User, Calendar, Tag } from 'lucide-react';
import React, { useState } from "react";
import Link from "next/link";

const BlogsTable = ({ blogs = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Reduced for better visibility, adjust as needed

  const totalPages = Math.ceil(blogs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = blogs.slice(startIndex, startIndex + itemsPerPage);

  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="w-full p-6 antialiased text-gray-800 bg-gray-50/50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Blog Management</h2>
          <p className="text-slate-500 mt-1">Manage your association's stories and updates.</p>
        </div>
        <Link
          href="/admin/blogs/add"
          className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 font-bold bg-[#003566] hover:bg-[#001d3d] text-white active:scale-95"
        >
          + Create New Post
        </Link>
      </div>

      <div className="mb-4 inline-block">
        <span className="text-xs font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full shadow-sm">
          Total Content: {blogs.length} Posts
        </span>
      </div>

      {/* --- Desktop Table View --- */}
      <div className="hidden md:block overflow-hidden border border-slate-200 rounded-2xl shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-wider w-16">Preview</th>
              <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Article Details</th>
              <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Author & Stats</th>
              <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Timeline</th>
              <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((blog, index) => (
              <tr key={`blog-item-${blog?.handle}-${index}`} className="hover:bg-blue-50/30 transition-colors group">
                {/* Image Preview */}
                <td className="p-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    {blog?.main_image ? (
                      <img src={blog.main_image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xl uppercase italic">B</div>
                    )}
                  </div>
                </td>

                {/* Title & Info */}
                <td className="p-4 max-w-md">
                  <div className="flex flex-col gap-1.5">
                    {blog?.badge && (
                      <span className="w-fit text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-100 text-[#003566] rounded">
                        {blog.badge}
                      </span>
                    )}
                    <Link href={`/blogs/${blog?.handle}`}className="text-base font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                      {blog?.title}
                    </Link>
                    <div className="text-sm text-slate-500 line-clamp-1 italic font-serif">
                      "{blog?.excerpt || blog?.description}"
                    </div>
                    {/* Categories Chips */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {blog?.categories?.map((cat, i) => (
                        <span key={i} className="text-[10px] text-slate-400 font-medium">#{cat}</span>
                      ))}
                    </div>
                  </div>
                </td>

                {/* Author & Stats */}
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <User size={14} className="text-slate-400" /> {blog?.author || "Anonymous"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Tag size={12} /> {blog?.read_duration || "5 min read"}
                    </div>
                  </div>
                </td>

                {/* Dates */}
                <td className="p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Calendar size={14} /> {blog?.created_at ? new Date(blog.created_at).toLocaleDateString() : (blog?.date || "N/A")}
                  </div>
                </td>

                {/* Action */}
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/blogs/update/${blog?.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-[#003566] hover:text-white transition-all duration-200"
                  >
                    <Pencil size={14} />
                    <span>Edit Post</span>
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
          <div key={blog?.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#003566]"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase tracking-widest">
                {blog?.badge || 'Post'}
              </span>
              <span className="text-xs font-bold text-blue-600">
                {blog?.date || 'Today'}
              </span>
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 leading-tight mb-2">{blog?.title}</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2 italic font-serif">
              {blog?.excerpt || "No summary provided."}
            </p>
            <Link
              href={`/admin/blogs/update/${blog?.id}`}
              className="flex items-center justify-center w-full py-3 bg-slate-50 text-[#003566] font-bold rounded-xl border border-slate-200"
            >
              <Pencil size={16} className="mr-2" /> Edit Content
            </Link>
          </div>
        ))}
      </div>

      {/* --- Pagination --- */}
      <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="text-sm font-medium text-slate-500">
          Viewing <span className="text-slate-900">{startIndex + 1} - {Math.min(startIndex + itemsPerPage, blogs.length)}</span> of {blogs.length}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentPage === 1}
            className="px-5 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
          >
            Prev
          </button>
          <div className="px-4 text-sm font-bold text-slate-400">
             {currentPage} <span className="mx-1 text-slate-200">/</span> {totalPages}
          </div>
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="px-5 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsTable;