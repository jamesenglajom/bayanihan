"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventsForm({ event }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const url = event ? "/api/events/update" : "/api/events/save";
      const method = event ? "PUT" : "POST";

      // --- FIX STARTS HERE ---
      const payload = event 
        ? { 
            id: event.id, 
            oldEventString: JSON.stringify(event), // Must match exactly what's in Redis
            newData: data 
          } 
        : data;
      // --- FIX ENDS HERE ---

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Send the payload instead of just 'data'
      });

      if (!response.ok) throw new Error("Failed to save event");

      setMessage({ type: "success", text: `Event ${event ? "updated" : "created"} successfully! 🎉` });
      
      setTimeout(() => {
        router.push("/admin/events");
      }, 2000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
}

  return (
    <div className="max-w-2xl p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {!event ? "Create New Event" : "Update Event"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Badge Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={event?.name || ""}
              required
              placeholder="Gala 2026"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Badge/Category
            </label>
            <input
              name="badge"
              type="text"
              defaultValue={event?.badge || ""}
              placeholder="Community"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Date & Location Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Date</label>
            <input
              name="date"
              type="datetime-local"
              defaultValue={event?.date ? event.date.slice(0, 16) : ""}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Location</label>
            <input
              name="location"
              type="text"
              defaultValue={event?.location || ""}
              required
              placeholder="Davao City"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold mb-1">Image URL</label>
          <input
            name="image"
            type="url"
            defaultValue={event?.image || ""}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={event?.description || ""}
            rows="3"
            placeholder="Describe the event..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Feedback Message */}
        {message.text && (
          <div
            className={`p-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : event ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
}
