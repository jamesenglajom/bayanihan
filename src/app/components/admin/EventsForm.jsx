"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Tag,
  Image as ImageIcon,
  AlignLeft,
  Save,
  Loader2,
  Link as LinkIcon,
  Plus,
  X
} from "lucide-react";
import ImagePicker from "@/app/components/admin/ImagePicker";

export default function EventsForm({ event }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [showPicker, setShowPicker] = useState(false);

  // Track selected image for immediate UI feedback
  const [selectedImage, setSelectedImage] = useState(event?.image || "");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const url = event ? "/api/events/update" : "/api/events/save";
      const method = event ? "PUT" : "POST";

      const payload = event ? { id: event.id, ...data } : data;

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save event. Please check your connection.");

      setStatus({ type: "success", text: `Event ${event ? "updated" : "created"} successfully!` });

      setTimeout(() => {
        router.push("/admin/events");
      }, 1500);
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  const removeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedImage("")
  }

  const inputBase = "w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-lg focus:bg-white dark:focus:bg-white/8 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200 text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600";
  const labelBase = "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 ml-1";

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-white/2 rounded-2xl border border-slate-200 dark:border-slate-800/60 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 bg-gradient-to-b from-slate-50 to-white dark:from-white/3 dark:to-transparent border-b border-slate-100 dark:border-slate-800/60">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {!event ? "Create New Event" : "Edit Event Details"}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your event content and external connection links.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">

        {/* Row 1: Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelBase}><Tag size={14} /> Event Name</label>
            <input
              name="name"
              type="text"
              defaultValue={event?.name || ""}
              required
              placeholder="e.g. Community Meetup"
              className={inputBase}
            />
          </div>
          <div>
            <label className={labelBase}><Tag size={14} /> Category / Badge</label>
            <input
              name="badge"
              type="text"
              defaultValue={event?.badge || ""}
              placeholder="e.g. Social"
              className={inputBase}
            />
          </div>
        </div>

        {/* Row 2: Date & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelBase}><Calendar size={14} /> Date & Time</label>
            <input
              name="date"
              type="datetime-local"
              defaultValue={event?.date ? event.date.slice(0, 16) : ""}
              required
              className={`${inputBase} scheme-light dark:scheme-dark`}
            />
          </div>
          <div>
            <label className={labelBase}><MapPin size={14} /> Location</label>
            <input
              name="location"
              type="text"
              defaultValue={event?.location || ""}
              required
              placeholder="Physical address or Online"
              className={inputBase}
            />
          </div>
        </div>

        {/* Row 3: Image Selection Area */}
        <div className="space-y-4">
          <label className={labelBase}><ImageIcon size={14} /> Cover Image</label>

          {/* Interactive Preview Trigger */}
          <div
            onClick={() => setShowPicker(true)}
            className="relative group cursor-pointer aspect-21/9 w-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-white/2 overflow-hidden hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-all duration-300"
          >
            {selectedImage ? (
              <>
                <Image
                  src={selectedImage}
                  alt="Preview"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                  <ImageIcon size={32} className="mb-2" />
                  <span className="text-xs font-bold uppercase tracking-widest">Change Image</span>
                  <button onClick={removeImage}
                  disabled={selectedImage === ""}
                  title="Remove Image"
                  className="bg-rose-600 hover:bg-rose-700 transition-colors flex mt-5 w-8 h-8 items-center justify-center rounded-lg cursor-pointer disabled:pointer-events-none disabled:opacity-20">
                    <X size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                <div className="p-4 bg-white dark:bg-white/5 rounded-xl shadow-sm mb-3 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:scale-110 transition-all">
                  <Plus size={24} />
                </div>
                <p className="text-xs font-bold uppercase tracking-tighter">Click to select from Library</p>
              </div>
            )}
          </div>

          {/* Hidden/Manual URL Input */}
          <div className="relative">
            <input
              name="image"
              type="hidden"
              value={selectedImage}
              onChange={(e) => setSelectedImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={inputBase}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest pointer-events-none">
              Direct Link
            </div>
          </div>
        </div>

        {/* Row 4: External Link Logic */}
        <div className="p-5 bg-indigo-50/30 dark:bg-indigo-500/5 rounded-2xl border border-indigo-100/50 dark:border-indigo-500/20 space-y-4">
          <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
            <LinkIcon size={16} /> External Call-to-Action
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>Target URL</label>
              <input
                name="external_url"
                type="url"
                defaultValue={event?.external_url || ""}
                placeholder="https://facebook.com/events/..."
                className={inputBase}
              />
            </div>
            <div>
              <label className={labelBase}>Button Label</label>
              <input
                name="external_link_button_label"
                list="button-labels"
                defaultValue={event?.external_link_button_label || "Learn More"}
                placeholder="e.g. View on Facebook"
                className={inputBase}
              />
              <datalist id="button-labels">
                <option value="Learn More" />
                <option value="Register Now" />
                <option value="See Who's Going" />
                <option value="Join on Facebook" />
                <option value="Save My Spot" />
                <option value="Get Tickets" />
              </datalist>
            </div>
          </div>
        </div>

        {/* Row 5: Description */}
        <div>
          <label className={labelBase}><AlignLeft size={14} /> Brief Description (Excerpt)</label>
          <textarea
            name="description"
            defaultValue={event?.description || ""}
            rows="3"
            placeholder="A short summary for the event listing..."
            className={`${inputBase} resize-none`}
          />
        </div>

        {/* Feedback Alert */}
        {status.text && (
          <div className={`flex items-center gap-3 p-4 rounded-xl text-sm font-semibold animate-in fade-in slide-in-from-top-1 ${
            status.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
              : "bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
          }`}>
            <span>{status.type === "success" ? "✓" : "✕"}</span>
            {status.text}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="group w-full flex items-center justify-center gap-2 py-4 bg-slate-900 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors duration-300 active:scale-[0.98] disabled:opacity-50 shadow-sm"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Save size={18} className="group-hover:scale-110 transition-transform" />
              {event ? "Update Event Listing" : "Publish Event"}
            </>
          )}
        </button>
      </form>

      {/* Image Picker Modal Trigger */}
      {showPicker && (
        <ImagePicker
          source="/images/events"
          onClose={() => setShowPicker(false)}
          onSelect={(url) => {
            setSelectedImage(url);
            setShowPicker(false);
          }}
        />
      )}
    </div>
  );
}
