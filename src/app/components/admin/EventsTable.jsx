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
  Clock,
  Timer,
  CheckCircle2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const EventsTable = ({ events = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc', 'desc', or null
  const itemsPerPage = 10;

  // --- SENIOR UIUX UTILITY: Status Calculation ---
  const getEventStatus = (dateString) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const isToday = eventDate.toDateString() === now.toDateString();
    const diffInMs = eventDate - now;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));

    if (isToday) {
      return {
        label: "Today",
        time: "Starts today",
        styles:
          "bg-blue-50 text-blue-700 border-blue-100 ring-4 ring-blue-500/5",
        icon: <Clock size={12} className="animate-pulse" />,
      };
    }
    if (diffInMs < 0) {
      return {
        label: "Past Event",
        time: "Concluded",
        styles: "bg-red-50 text-red-600 border-red-100 opacity-80",
        icon: <CheckCircle2 size={12} />,
      };
    }
    return {
      label: "Upcoming",
      time:
        diffInDays > 1
          ? `${diffInDays} days left`
          : `${diffInHours} hours left`,
      styles: "bg-emerald-50 text-emerald-700 border-emerald-100",
      icon: <Timer size={12} />,
    };
  };

  // --- Combined Filter & Sort Logic ---
  const filteredAndSortedEvents = useMemo(() => {
    let result = events.filter(
      (event) =>
        event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortOrder) {
      result.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    return result;
  }, [events, searchTerm, sortOrder]);

  // Pagination Logic
  const totalPages =
    Math.ceil(filteredAndSortedEvents.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredAndSortedEvents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const getBadgeStyles = (badge) => {
    const b = badge?.toLowerCase() || "";
    if (b.includes("community"))
      return "bg-indigo-50 text-indigo-700 border-indigo-100";
    if (b.includes("social"))
      return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-slate-50 text-slate-600 border-slate-100";
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 antialiased text-slate-800 font-sans">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Events
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Manage your community schedule and event listings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
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
            <Plus size={18} /> Add Event
          </Link>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="p-4 pl-8 font-bold text-[10px] uppercase tracking-widest text-slate-400 w-24">
                Media
              </th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400">
                Event Info
              </th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 w-64">
                Location
              </th>
              <th
                className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 w-56 cursor-pointer hover:text-indigo-600 transition-colors group/sort"
                onClick={toggleSort}
              >
                <div className="flex items-center gap-2">
                  Date & Status
                  {sortOrder === "asc" ? (
                    <ArrowUp size={12} className="text-indigo-500" />
                  ) : sortOrder === "desc" ? (
                    <ArrowDown size={12} className="text-indigo-500" />
                  ) : (
                    <ArrowUpDown
                      size={12}
                      className="opacity-0 group-hover/sort:opacity-100"
                    />
                  )}
                </div>
              </th>
              <th className="p-4 pr-8 text-right font-bold text-[10px] uppercase tracking-widest text-slate-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((event) => {
              const status = getEventStatus(event.date);
              return (
                <tr
                  key={event.id}
                  className="group hover:bg-slate-50/50 transition-all duration-200"
                >
                  <td className="p-4 pl-8">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 shadow-sm">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full bg-slate-200/40 text-slate-400">
                          <ImageIcon size={16} strokeWidth={1.5} />
                          <span className="text-[7px] font-black mt-0.5 uppercase">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate max-w-[300px]">
                        {event.name}
                      </span>
                      <div className="italic text-slate-500 text-xs line-clamp-1 mb-1">
                        {event.description}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-md border font-bold uppercase tracking-tight ${getBadgeStyles(event.badge)}`}
                        >
                          {event.badge || "Event"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-slate-600 font-medium text-xs">
                    <div className="flex items-start gap-2 max-w-[240px]">
                      <MapPin
                        size={14}
                        className="text-slate-400 mt-0.5 flex-shrink-0"
                      />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <Calendar
                          size={14}
                          className="text-indigo-400 flex-shrink-0"
                        />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-black uppercase tracking-wider ${status.styles}`}
                        >
                          {status.icon} {status.label}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 italic">
                          {status.time}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 pr-8 text-right">
                    <Link
                      href={`/admin/events/update/${event.id}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                    >
                      <Pencil size={14} /> Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {currentItems.map((event) => {
          const status = getEventStatus(event.date);
          return (
            <div
              key={event.id}
              className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0 shadow-sm">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300">
                      <ImageIcon size={20} />
                      <span className="text-[8px] font-bold mt-1 uppercase">
                        No Image
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`inline-block text-[9px] px-2 py-0.5 rounded-md border font-bold uppercase tracking-tight mb-1 ${getBadgeStyles(event.badge)}`}
                  >
                    {event.badge || "Event"}
                  </div>
                  <h3 className="font-bold text-slate-900 leading-tight truncate">
                    {event.name}
                  </h3>
                </div>
              </div>
              <div className="space-y-4 mb-5">
                <div className="flex items-start text-xs text-slate-500 font-medium gap-2.5">
                  <MapPin size={16} className="flex-shrink-0 text-slate-400" />{" "}
                  <span className="leading-snug">{event.location}</span>
                </div>
                <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center text-xs text-slate-700 font-bold gap-2.5">
                    <Calendar
                      size={16}
                      className="flex-shrink-0 text-indigo-400"
                    />{" "}
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-black uppercase ${status.styles}`}
                    >
                      {status.icon} {status.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold italic">
                      {status.time}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href={`/admin/events/update/${event.id}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg active:scale-95 transition-all"
              >
                <Pencil size={14} /> Manage Event
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between border-t border-slate-100 pt-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Showing <span className="text-slate-900">{startIndex + 1}</span> -{" "}
          <span className="text-slate-900">
            {Math.min(
              startIndex + itemsPerPage,
              filteredAndSortedEvents.length,
            )}
          </span>{" "}
          of {filteredAndSortedEvents.length}
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
