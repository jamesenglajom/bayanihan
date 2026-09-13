"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Search,
  Image as ImageIcon,
  CheckCircle2,
  UploadCloud,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { validateImageFile, MAX_IMAGE_SIZE } from "@/app/lib/imageValidation";

const PAGE_SIZE = 15;

export default function ImagePicker({ onSelect, onClose }) {
  const [tab, setTab] = useState("browse"); // "browse" | "upload"

  // Browse state
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const fetchMedia = useCallback(async (targetPage, targetSearch) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(targetPage), pageSize: String(PAGE_SIZE) });
      if (targetSearch) params.set("search", targetSearch);
      const res = await fetch(`/api/media?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to load images", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "browse") fetchMedia(page, search);
  }, [tab, page, search, fetchMedia]);

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

      onSelect(data.url);
      onClose();
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const inputStyle =
    "w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-white/2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl text-white">
              <ImageIcon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">Media Library</h3>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Select or upload an asset</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors self-end sm:self-auto"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-transparent">
          <button
            onClick={() => setTab("browse")}
            className={`px-4 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-t-lg transition-colors ${
              tab === "browse"
                ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Browse Library
          </button>
          <button
            onClick={() => setTab("upload")}
            className={`px-4 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-t-lg transition-colors ${
              tab === "upload"
                ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Upload New
          </button>

          {tab === "browse" && (
            <div className="ml-auto mb-2 relative w-56">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={inputStyle}
              />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto min-h-100 bg-white dark:bg-transparent">
          {tab === "browse" ? (
            loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="aspect-square bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : items.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelect(item.url);
                      onClose();
                    }}
                    className="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent
                               hover:border-indigo-600 active:scale-95 transition-all duration-200"
                  >
                    <Image
                      src={item.url}
                      alt={item.original_name || item.file_name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white scale-75 group-hover:scale-100 transition-transform duration-300">
                        <CheckCircle2 size={24} />
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-black/50 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] text-white font-medium truncate">{item.original_name || item.file_name}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-full mb-4">
                  <Search size={40} className="text-slate-200 dark:text-slate-700" />
                </div>
                <h4 className="text-slate-900 dark:text-white font-bold">No assets found</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-50">
                  {search ? `We couldn't find any images matching "${search}"` : "Upload your first image to get started."}
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div
                onClick={() => !uploading && fileInputRef.current?.click()}
                className="w-full max-w-md p-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-all"
              >
                {uploading ? (
                  <Loader2 size={36} className="animate-spin mx-auto text-indigo-500" />
                ) : (
                  <UploadCloud size={36} className="mx-auto text-slate-300 dark:text-slate-700" />
                )}
                <p className="mt-4 text-sm font-bold text-slate-700 dark:text-slate-300">
                  {uploading ? "Uploading..." : "Click to choose an image"}
                </p>
                <p className="mt-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  WEBP only &middot; max {(MAX_IMAGE_SIZE / (1024 * 1024)).toFixed(0)}MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/webp"
                onChange={handleUpload}
                className="hidden"
              />

              {uploadError && (
                <div className="flex items-center gap-2 mt-5 px-4 py-3 rounded-xl text-sm font-semibold bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20">
                  <AlertCircle size={16} className="shrink-0" />
                  {uploadError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center bg-slate-50/50 dark:bg-white/2">
          {tab === "browse" && totalPages > 1 ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          ) : (
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {tab === "browse" ? `${total} images available` : " "}
            </span>
          )}
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
