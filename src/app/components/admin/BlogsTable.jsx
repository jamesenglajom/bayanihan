"use client";
import { Pencil, User, Calendar, Tag, Plus, ImageIcon, Search } from 'lucide-react';
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const BlogsTable = ({ blogs = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Search Logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => 
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogs, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 antialiased text-slate-800">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Blog Management</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage your association's stories and updates.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all w-64"
            />
          </div>
          <Link
            href="/admin/blogs/add"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition-all duration-300 active:scale-95 font-bold text-sm"
          >
            <Plus size={18} />
            Create Post
          </Link>
        </div>
      </div>

      {/* --- Desktop Table View --- */}
      <div className="hidden md:block overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="p-4 pl-8 font-bold text-[10px] uppercase tracking-widest text-slate-400 w-24">Preview</th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400">Article Details</th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 w-56">Author & Read</th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 w-40">Timeline</th>
              <th className="p-4 pr-8 text-right font-bold text-[10px] uppercase tracking-widest text-slate-400 w-32">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((blog, index) => (
              <tr key={blog?.id || index} className="group hover:bg-slate-50/50 transition-all duration-200">
                {/* Media Column */}
                <td className="p-4 pl-8">
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 shadow-sm">
                    {blog?.main_image ? (
                      <img
                        src={blog.main_image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full bg-slate-200/40 text-slate-400">
                        <ImageIcon size={16} strokeWidth={1.5} className="flex-shrink-0" />
                        <span className="text-[7px] font-black mt-0.5 leading-none">NO IMAGE</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Article Details Column */}
                <td className="p-4">
                  <div className="flex flex-col max-w-md">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-tight">
                            {blog?.badge || 'Post'}
                        </span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {blog?.title}
                    </span>
                    <span className="text-xs text-slate-400 italic font-serif line-clamp-1 mt-0.5">
                      "{blog?.excerpt || blog?.description}"
                    </span>
                  </div>
                </td>

                {/* Author Column */}
                <td className="p-4 text-slate-600">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <User size={14} className="text-slate-400 flex-shrink-0" /> 
                        <span className="truncate">{blog?.author || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                        <Tag size={12} className="flex-shrink-0" /> 
                        {blog?.read_duration || "5 min read"}
                    </div>
                  </div>
                </td>

                {/* Timeline Column */}
                <td className="p-4 text-slate-600">
                  <div className="flex items-center gap-2 text-xs font-bold whitespace-nowrap">
                    <Calendar size={14} className="text-slate-400 flex-shrink-0" />
                    {blog?.created_at ? new Date(blog.created_at).toLocaleDateString() : (blog?.date || "N/A")}
                  </div>
                </td>

                {/* Action Column */}
                <td className="p-4 pr-8 text-right">
                  <Link
                    href={`/admin/blogs/update/${blog?.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm"
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
          <div key={blog?.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
            <div className="flex items-center justify-between mb-4 pl-2">
              <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200 uppercase tracking-widest">
                {blog?.badge || 'Post'}
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Calendar size={12} className="flex-shrink-0" /> {blog?.date || 'Recent'}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 leading-tight mb-2 pl-2">{blog?.title}</h3>
            <p className="text-xs text-slate-500 mb-5 line-clamp-2 italic font-serif pl-2">
              {blog?.excerpt || "No summary provided."}
            </p>
            <Link
              href={`/admin/blogs/update/${blog?.id}`}
              className="flex items-center justify-center w-full py-3 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg shadow-slate-100 active:scale-95 transition-all"
            >
              <Pencil size={14} className="mr-2" /> Manage Content
            </Link>
          </div>
        ))}
      </div>

      {/* --- Pagination --- */}
      <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between border-t border-slate-100 pt-8">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Showing <span className="text-slate-900">{startIndex + 1}</span> - <span className="text-slate-900">{Math.min(startIndex + itemsPerPage, filteredBlogs.length)}</span> of {filteredBlogs.length}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm"
          >
            <Pencil size={18} className="rotate-180" /> {/* Replaced Chevron for simplicity */}
          </button>

          <div className="flex items-center px-5 h-10 bg-slate-900 rounded-xl text-white font-bold text-xs">
            {currentPage} / {totalPages}
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm"
          >
             <Pencil size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsTable;