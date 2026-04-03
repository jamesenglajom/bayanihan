"use client";

import { 
  Pencil, 
  Plus, 
  MapPin, 
  Calendar, 
  Image as ImageIcon, 
  ChevronLeft, 
  ChevronRight,
  Search,
  MoreHorizontal
} from 'lucide-react';
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const EventsTable = ({ events = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Filter logic for search
  const filteredEvents = useMemo(() => {
    return events.filter(event => 
      event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  // Helper for Badge Styling
  const getBadgeStyles = (badge) => {
    const b = badge?.toLowerCase() || "";
    if (b.includes('community')) return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (b.includes('social')) return 'bg-blue-50 text-blue-700 border-blue-100';
    return 'bg-slate-50 text-slate-600 border-slate-100';
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 antialiased text-slate-800">
      
      {/* --- Header & Actions Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Events</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Manage your community schedule and event listings.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all w-64"
            />
          </div>
          <Link
            href="/admin/events/add"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition-all duration-300 active:scale-95 font-bold text-sm"
          >
            <Plus size={18} />
            Add Event
          </Link>
        </div>
      </div>

      {/* --- Desktop Table View --- */}
      <div className="hidden md:block overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="p-4 pl-8 font-bold text-[10px] uppercase tracking-widest text-slate-400 w-24">Media</th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400">Event Info</th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 w-64">Location</th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 w-48">Date</th>
              <th className="p-4 pr-8 text-right font-bold text-[10px] uppercase tracking-widest text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((event) => (
              <tr key={event.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                {/* Media Column */}
                <td className="p-4 pl-8">
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 shadow-sm">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full bg-slate-200/40 text-slate-400">
                        <ImageIcon size={16} strokeWidth={1.5} />
                        <span className="text-[7px] font-black mt-0.5 leading-none">NO IMAGE</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Info Column */}
                <td className="p-4">
                  <div className="flex flex-col">
                    <span title={event.name} className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate max-w-[300px]">
                      {event.name}
                    </span>
                    <div className="italic text-neutral-500 text-sm line-clamp-2">
                      {event.description}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border font-bold uppercase tracking-tight ${getBadgeStyles(event.badge)}`}>
                        {event.badge || 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Location Column */}
                <td className="p-4 text-slate-600">
                  <div className="flex items-start gap-2 text-sm max-w-[240px]">
                    <MapPin size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="truncate" title={event.location}>{event.location}</span>
                  </div>
                </td>

                {/* Date Column */}
                <td className="p-4 text-slate-600">
                  <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                    <Calendar size={14} className="text-slate-400 flex-shrink-0" />
                    {event.date}
                  </div>
                </td>

                {/* Action Column */}
                <td className="p-4 pr-8 text-right">
                  <Link
                    href={`/admin/events/update/${event.id}`}
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
        {currentItems.map((event) => (
          <div key={event.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0">
                {event.image ? (
                   <Image src={event.image} alt={event.name} fill className="object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-300">
                    <ImageIcon size={20} strokeWidth={1} />
                    <span className="text-[8px] font-bold mt-1">NO IMAGE</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`inline-block text-[9px] px-2 py-0.5 rounded-md border font-bold uppercase tracking-tight mb-1 ${getBadgeStyles(event.badge)}`}>
                  {event.badge || 'Event'}
                </div>
                <h3 className="font-bold text-slate-900 leading-tight truncate">{event.name}</h3>
              </div>
            </div>
            
            <div className="space-y-3 mb-5">
              <div className="flex items-start text-xs text-slate-500 font-medium gap-2.5">
                <MapPin size={16} className="flex-shrink-0 text-slate-400" /> 
                <span className="leading-snug">{event.location}</span>
              </div>
              <div className="flex items-center text-xs text-slate-500 font-medium gap-2.5">
                <Calendar size={16} className="flex-shrink-0 text-slate-400" /> 
                <span>{event.date}</span>
              </div>
            </div>

            <Link
              href={`/admin/events/update/${event.id}`}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg shadow-slate-100 active:scale-95 transition-all"
            >
              <Pencil size={14} /> Manage Event
            </Link>
          </div>
        ))}
      </div>

      {/* --- Empty State --- */}
      {filteredEvents.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <Search size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No events found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-xs">
            Try adjusting your search terms or create a new event to get started.
          </p>
        </div>
      )}

      {/* --- Pagination Section --- */}
      <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between border-t border-slate-100 pt-8">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Showing <span className="text-slate-900">{startIndex + 1}</span> - <span className="text-slate-900">{Math.min(startIndex + itemsPerPage, filteredEvents.length)}</span> of {filteredEvents.length}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center px-5 h-10 bg-slate-900 rounded-xl text-white font-bold text-xs tracking-tighter">
            {currentPage} / {totalPages}
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsTable;