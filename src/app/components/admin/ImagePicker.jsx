'use client'
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { X, Search, Image as ImageIcon, CheckCircle2, Loader2 } from 'lucide-react';
import { loadPublicImages } from '@/app/lib/fn_server';

export default function ImagePicker({ onSelect, onClose }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await loadPublicImages('public/images/blogs');
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl shadow-indigo-900/10 
                      bg-white border border-slate-200 flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header - Bayanihan Modern Style */}
        <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
                <ImageIcon size={24} />
             </div>
             <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Media Library</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Asset</p>
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
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
            </div>
            <button 
                onClick={onClose}
                className="p-2.5 hover:bg-slate-200 text-slate-400 hover:text-slate-900 rounded-xl transition-all"
            >
                <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto min-h-[400px] bg-white custom-scrollbar">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="aspect-square bg-slate-100 rounded-2xl animate-pulse" />
                ))}
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredImages.map((img) => (
                <button
                  key={img}
                  onClick={() => {
                    onSelect(`/images/blogs/${img}`);
                    onClose();
                  }}
                  className="group relative aspect-square rounded-3xl overflow-hidden border-4 border-transparent 
                             hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100 active:scale-95 transition-all duration-300"
                >
                  <Image
                    src={`/images/blogs/${img}`}
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
                <div className="p-6 bg-slate-50 rounded-full mb-4">
                    <Search size={40} className="text-slate-200" />
                </div>
                <h4 className="text-slate-900 font-bold">No assets found</h4>
                <p className="text-slate-500 text-sm max-w-[200px]">We couldn't find any images matching "{search}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {filteredImages.length} Images available
          </span>
          <button 
            onClick={onClose}
            className="px-8 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}