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

  // --- Status Calculation ---
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
        styles: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
        icon: <Clock size={12} className="animate-pulse" />,
      };
    }
    if (diffInMs < 0) {
      return {
        label: "Past Event",
        time: "Concluded",
        styles: "bg-red-50 text-red-600 border-red-100 opacity-80 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
        icon: <CheckCircle2 size={12} />,
      };
    }
    return {
      label: "Upcoming",
      time:
        diffInDays > 1
          ? `${diffInDays} days left`
          : `${diffInHours} hours left`,
      styles: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
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
      return "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20";
    if (b.includes("social"))
      return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
    return "bg-slate-50 text-slate-600 border-slate-100 dark:bg-white/5 dark:text-slate-400 dark:border-slate-800";
  };

  return (
    <div className="w-full max-w-7xl mx-auto antialiased text-slate-800 dark:text-slate-200">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Events
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
            Manage your community schedule and event listings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all w-full sm:w-64"
            />
          </div>
          <Link
            href="/admin/events/add"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors active:scale-95 font-bold text-sm whitespace-nowrap"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Add Event</span>
          </Link>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden bg-white dark:bg-white/2 border border-slate-200 dark:border-slate-800/60 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-white/2 border-b border-slate-200 dark:border-slate-800/60">
              <th className="p-4 pl-6 font-bold text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 w-20">
                Media
              </th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Event Info
              </th>
              <th className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 w-56">
                Location
              </th>
              <th
                className="p-4 font-bold text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 w-52 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/sort"
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
              <th className="p-4 pr-6 text-right font-bold text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {currentItems.map((event) => {
              const status = getEventStatus(event.date);
              return (
                <tr
                  key={event.id}
                  className="group hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors duration-150"
                >
                  <td className="p-4 pl-6">
                    <div className="relative h-11 w-11 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shrink-0">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-slate-200/40 dark:bg-slate-800 text-slate-400 dark:text-slate-600">
                          <ImageIcon size={16} strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate max-w-[280px]">
                        {event.name}
                      </span>
                      <div className="italic text-slate-500 dark:text-slate-400 text-xs line-clamp-1 mb-1 font-serif">
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

                  <td className="p-4 text-slate-600 dark:text-slate-400 font-medium text-xs">
                    <div className="flex items-start gap-2 max-w-[220px]">
                      <MapPin size={14} className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                        <Calendar size={14} className="text-indigo-400 shrink-0" />
                        {new Date(event.date).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-black uppercase tracking-wider ${status.styles}`}
                        >
                          {status.icon} {status.label}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 italic">
                          {status.time}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <Link
                      href={`/admin/events/update/${event.id}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 transition-colors"
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
              className="p-5 bg-white dark:bg-white/2 border border-slate-200 dark:border-slate-800/60 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shrink-0">
                  {event.image ? (
                    <Image src={event.image} alt={event.name} fill className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 dark:text-slate-600">
                      <ImageIcon size={20} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`inline-block text-[9px] px-2 py-0.5 rounded-md border font-bold uppercase tracking-tight mb-1 ${getBadgeStyles(event.badge)}`}
                  >
                    {event.badge || "Event"}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-tight truncate">
                    {event.name}
                  </h3>
                </div>
              </div>
              <div className="space-y-4 mb-5">
                <div className="flex items-start text-xs text-slate-500 dark:text-slate-400 font-medium gap-2.5">
                  <MapPin size={16} className="shrink-0 text-slate-400 dark:text-slate-500" />{" "}
                  <span className="leading-snug">{event.location}</span>
                </div>
                <div className="flex flex-col gap-2 p-3 bg-slate-50 dark:bg-white/3 rounded-xl border border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center text-xs text-slate-700 dark:text-slate-300 font-bold gap-2.5 font-mono">
                    <Calendar size={16} className="shrink-0 text-indigo-400" />{" "}
                    <span>{new Date(event.date).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-black uppercase ${status.styles}`}
                    >
                      {status.icon} {status.label}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold italic">
                      {status.time}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href={`/admin/events/update/${event.id}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-indigo-600 text-white text-xs font-bold rounded-lg active:scale-95 transition-all"
              >
                <Pencil size={14} /> Manage Event
              </Link>
            </div>
          );
        })}
      </div>

      {filteredAndSortedEvents.length === 0 && (
        <div className="py-20 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">No events match your search.</p>
        </div>
      )}

      {/* Pagination */}
      {filteredAndSortedEvents.length > 0 && (
        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between border-t border-slate-100 dark:border-slate-800/60 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Showing <span className="text-slate-900 dark:text-white font-mono">{startIndex + 1}</span> -{" "}
            <span className="text-slate-900 dark:text-white font-mono">
              {Math.min(startIndex + itemsPerPage, filteredAndSortedEvents.length)}
            </span>{" "}
            of <span className="font-mono">{filteredAndSortedEvents.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center px-4 h-9 bg-slate-900 dark:bg-indigo-600 rounded-lg text-white font-bold text-xs font-mono">
              {currentPage} / {totalPages}
            </div>
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsTable;
