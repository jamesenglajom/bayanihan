"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { adminNav } from "@/app/components/admin/AdminSidebar";
import { ChevronRight, Home, Bell, Search, Command } from "lucide-react";

const Breadcrumb = ({ pageLabel }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-400">
      <Home size={14} />
    </div>
    <ChevronRight size={12} className="text-slate-300 dark:text-slate-600" />
    <span className="text-[13px] font-semibold text-slate-900 dark:text-white tracking-tight">
      {pageLabel || "Dashboard"}
    </span>
  </div>
);

function AdminNavbar() {
  const pathname = usePathname();
  const activeItem = adminNav.find(
    (item) => item?.url === pathname && item?.type !== "separator"
  );
  const pageLabel = activeItem?.label;

  return (
    <header className="sticky top-0 z-[40] w-full border-b transition-all duration-300
      bg-white/80 border-slate-200 backdrop-blur-md
      dark:bg-[#0B1120]/80 dark:border-slate-800/60">
      
      <div className="flex items-center justify-between h-16 px-6">
        
        {/* LEFT: Contextual Navigation */}
        <div className="flex items-center gap-4">
          <Breadcrumb pageLabel={pageLabel} />
        </div>

        {/* RIGHT: Global Actions & Search */}
        <div className="flex items-center gap-3">
          
          {/* Pro Search Bar (Visual Only for now) */}
          {/* <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 group cursor-pointer hover:border-indigo-500/30 transition-colors">
            <Search size={14} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
            <span className="text-[11px] font-medium text-slate-400 pr-8">Search...</span>
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
               <Command size={8} className="text-slate-400" />
               <span className="text-[9px] font-bold text-slate-400">K</span>
            </div>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden md:block" /> */}

          {/* Notifications Button */}
          {/* <button className="relative p-2 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95">
            <Bell size={18} strokeWidth={2.2} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 border-2 border-white dark:border-[#0B1120]" />
          </button> */}

          {/* Status Indicator (Mobile/Small screens) */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Live
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;