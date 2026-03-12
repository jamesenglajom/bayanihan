"use client";
import { Pencil } from 'lucide-react';
import React, { useState } from "react";
import Link from "next/link";

const EventsTable = ({ events = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Pagination Logic
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = events.slice(startIndex, startIndex + itemsPerPage);

  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="w-full p-4 antialiased text-gray-800">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Events</h2>
        <Link
          href="/admin/events/add"
          className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all shadow-md font-semibold bg-indigo-600 hover:bg-indigo-700 text-white`}
        >
          + Add
        </Link>
      </div>
      <div>
        <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
          Total: {events.length} Events
        </span>
      </div>

      {/* --- Desktop Table View (Hidden on Mobile) --- */}
      <div className="hidden md:block overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {/* <th className="p-4 font-semibold text-gray-600"></th> */}
              <th className="p-4 font-semibold text-gray-600">Event</th>
              <th className="p-4 font-semibold text-gray-600 w-50">Location</th>
              <th className="p-4 font-semibold text-gray-600 w-50">Date</th>
              <th className="p-4 font-semibold text-gray-600 w-50"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((event) => (
              <tr
                key={event.id}
                className="hover:bg-blue-50/50 transition-colors"
              >
                {/* <td className="p-4 text-sm text-gray-500">#{event.image}</td> */}
                <td className="p-4 flex flex-col gap-2">
                  <div className="text-sm font-bold text-gray-900">
                    {event.name}
                  </div>
                  <div className="text-xs text-gray-700">{event.badge}</div>
                  <div className="text-xs text-gray-700">
                    {event.description}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{event.location}</td>
                <td className="p-4 text-sm text-gray-600">{event.date}</td>
                <td className="p-4 text-sm text-gray-600 text-right">
                  <Link
                    href={`/admin/events/update/${event.id}`}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 group"
                    title="Update Event"
                  >
                    <Pencil className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Update</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile Card View (Hidden on Desktop) --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {currentItems.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono text-gray-400">
                ID: {event.id}
              </span>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {event.date}
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900">{event.name}</h3>
            <p className="text-sm text-gray-600 mt-1 flex items-center">
              <span className="mr-1">📍</span> {event.location}
            </p>
          </div>
        ))}
      </div>

      {/* --- Pagination Controls --- */}
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-bold text-gray-800">{startIndex + 1}</span> to{" "}
          <span className="font-bold text-gray-800">
            {Math.min(startIndex + itemsPerPage, events.length)}
          </span>
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={goToPrev}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>

          <div className="flex items-center px-4 py-2 font-semibold text-sm">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
