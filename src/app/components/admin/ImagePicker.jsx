'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { loadPublicImages } from '@/app/lib/fn_server'; // Your Server Action

export default function ImagePicker({ onSelect, onClose }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await loadPublicImages('public/images/blogs');
        setImages(data);
      } catch (err) {
        console.error("Failed to load images", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl 
                      bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Library</h3>
            <p className="text-xs text-zinc-500">Select an image from /public/images/blogs</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto min-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full text-zinc-500">Loading gallery...</div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <button
                  key={img}
                  onClick={() => {
                    onSelect(`/images/blogs/${img}`);
                    onClose();
                  }}
                  className="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent 
                             hover:border-blue-500 active:scale-95 transition-all duration-200 shadow-sm"
                >
                  <Image
                    src={`/images/blogs/${img}`}
                    alt={img}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-zinc-500">No images found in the directory.</div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-zinc-800 flex justify-end gap-3 bg-zinc-50 dark:bg-zinc-900/50">
          <button 
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}