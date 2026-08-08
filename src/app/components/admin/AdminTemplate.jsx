"use client";
import React, { useState } from "react";
import AdminNavbar from "@/app/components/admin/AdminNavbar";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { useHasMounted } from "@/app/hooks/use-has-mounted";

function AdminTemplate({ children }) {
  const hasMounted = useHasMounted();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If we haven't mounted, render a stable "Skeleton" shell.
  // This matches the Server's HTML perfectly.
  if (!hasMounted) {
    return (
      <div className="flex min-h-dvh bg-slate-50 dark:bg-[#0B1120] animate-pulse">
        <div className="hidden lg:block w-72 h-dvh bg-white dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800/60" />
        <div className="flex-1 min-w-0">
          <div className="h-16 border-b border-slate-200 dark:border-slate-800/60" />
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-slate-50 dark:bg-[#0B1120]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminTemplate;
