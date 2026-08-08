"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { adminNav } from "@/app/components/admin/AdminSidebar";
import { ChevronRight, Home, Menu } from "lucide-react";
import ThemeToggle from "@/app/components/admin/ThemeToggle";

const Breadcrumb = ({ pageLabel }) => (
  <div className="flex items-center gap-2 min-w-0">
    <div className="hidden sm:flex items-center justify-center h-8 w-8 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-400 shrink-0">
      <Home size={14} />
    </div>
    <ChevronRight size={12} className="hidden sm:block text-slate-300 dark:text-slate-600 shrink-0" />
    <span className="text-[13px] font-semibold text-slate-900 dark:text-white tracking-tight truncate">
      {pageLabel || "Dashboard"}
    </span>
  </div>
);

function AdminNavbar({ onMenuClick = () => {} }) {
  const pathname = usePathname();
  const activeItem = adminNav.find(
    (item) => item?.url === pathname && item?.type !== "separator"
  );
  const pageLabel = activeItem?.label;

  return (
    <header className="sticky top-0 z-30 w-full border-b transition-colors duration-300
      bg-white/80 border-slate-200 backdrop-blur-md
      dark:bg-[#0B1120]/80 dark:border-slate-800/60">

      <div className="flex items-center justify-between h-16 px-4 sm:px-6 gap-3">

        {/* LEFT: Mobile menu trigger + contextual breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="lg:hidden shrink-0 h-9 w-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
          >
            <Menu size={18} />
          </button>
          <Breadcrumb pageLabel={pageLabel} />
        </div>

        {/* RIGHT: Global actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
              Live
            </span>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
