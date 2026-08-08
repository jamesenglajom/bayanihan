'use client'
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { X, Search, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { loadPublicImages } from '@/app/lib/fn_server';

export default function ImagePicker({ onSelect, onClose, source='/images/blogs' }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await loadPublicImages(`public${source}`);
        setImages(data || []);
      } catch (err) {
        console.error("Failed to load images", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const filteredImages = useMemo(() => {
    return images.filter(img => img.toLowerCase().includes(search.toLowerCase()));
  }, [images, search]);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">

      {/* Modal Container */}
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl
                      bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 flex flex-col animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-white/2">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-indigo-600 rounded-xl text-white">
                <ImageIcon size={20} />
             </div>
             <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">Media Library</h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Select Asset</p>
             </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search gallery..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
            </div>
            <button
                onClick={onClose}
                className="p-2.5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
            >
                <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto min-h-100 bg-white dark:bg-transparent">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="aspect-square bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
                ))}
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {filteredImages.map((img) => (
                <button
                  key={img}
                  onClick={() => {
                    onSelect(`${source}/${img}`);
                    onClose();
                  }}
                  className="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent
                             hover:border-indigo-600 active:scale-95 transition-all duration-200"
                >
                  <Image
                    src={`${source}/${img}`}
                    alt={img}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Glass Overlay on hover */}
                  <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                     <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white scale-75 group-hover:scale-100 transition-transform duration-300">
                        <CheckCircle2 size={24} />
                     </div>
                  </div>

                  {/* Filename Tag */}
                  <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-black/50 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                     <p className="text-[10px] text-white font-medium truncate">{img}</p>
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
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-50">We couldn't find any images matching "{search}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center bg-slate-50/50 dark:bg-white/2">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {filteredImages.length} Images available
          </span>
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
