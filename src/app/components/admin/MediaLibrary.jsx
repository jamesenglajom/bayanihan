"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  Search,
  Image as ImageIcon,
  UploadCloud,
  Copy,
  Check,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { validateImageFile, MAX_IMAGE_SIZE } from "@/app/lib/imageValidation";

const PAGE_SIZE = 24;

export default function MediaLibrary() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const fileInputRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const fetchMedia = useCallback(async (targetPage, targetSearch) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(targetPage),
        pageSize: String(PAGE_SIZE),
      });
      if (targetSearch) params.set("search", targetSearch);

      const res = await fetch(`/api/media?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to load media", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia(page, search);
  }, [page, search, fetchMedia]);

  // Debounce search input -> search query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      setSearch(searchInput.trim());
    }, 350);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploadError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setPage(1);
      setSearch("");
      setSearchInput("");
      await fetchMedia(1, "");
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.original_name || item.file_name}"? This can't be undone.`)) return;

    setDeletingId(item.id);
    try {
      const res = await fetch(`/api/media/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete image");
      await fetchMedia(page, search);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId((current) => (current === item.id ? null : current)), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const inputStyle =
    "w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all";

  return (
    <div className="max-w-7xl mx-auto antialiased text-slate-900 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-xl text-white">
            <ImageIcon size={20} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Media Library</h1>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {total} {total === 1 ? "image" : "images"} stored
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by filename..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={inputStyle}
            />
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-black text-[11px] uppercase tracking-widest transition-colors disabled:opacity-50 shrink-0"
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
            Upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/webp"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </div>

      {uploadError && (
        <div className="flex items-center gap-3 p-4 mb-6 rounded-xl text-sm font-semibold bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20">
          <AlertCircle size={18} className="shrink-0" />
          {uploadError}
        </div>
      )}

      <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
        WEBP only &middot; max {(MAX_IMAGE_SIZE / (1024 * 1024)).toFixed(0)}MB per image
      </p>

      {/* Grid */}
      <div className="bg-white dark:bg-white/2 rounded-2xl border border-slate-200 dark:border-slate-800/60 p-6">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-square bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-indigo-600 transition-all duration-200 bg-slate-50 dark:bg-white/5"
              >
                <Image
                  src={item.url}
                  alt={item.original_name || item.file_name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                  <button
                    onClick={() => handleCopy(item)}
                    title="Copy URL"
                    className="p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full border border-white/30 text-white transition-colors"
                  >
                    {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item.id}
                    title="Delete"
                    className="p-2.5 bg-rose-500/80 hover:bg-rose-600 backdrop-blur-md rounded-full text-white transition-colors disabled:opacity-50"
                  >
                    {deletingId === item.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-black/50 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="text-[10px] text-white font-medium truncate">
                    {item.original_name || item.file_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-full mb-4">
              <ImageIcon size={40} className="text-slate-200 dark:text-slate-700" />
            </div>
            <h4 className="text-slate-900 dark:text-white font-bold">No images yet</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-64">
              {search ? `No results for "${search}".` : "Upload your first image to get started."}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
