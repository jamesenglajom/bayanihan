"use client";
import React from "react";
import AdminNavbar from "@/app/components/admin/AdminNavbar";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { useHasMounted } from "@/app/hooks/use-has-mounted"; // Use the hook we made

function AdminTemplate({ children }) {
  const hasMounted = useHasMounted();

  // If we haven't mounted, render a stable "Skeleton" shell.
  // This matches the Server's HTML perfectly.
  if (!hasMounted) {
    return (
      <div className="flex animate-pulse">
        <div className="w-64 h-screen bg-slate-50 dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800" />
        <div className="flex-1 bg-white dark:bg-[#0B1120]">
          <div className="h-16 border-b border-slate-200 dark:border-slate-800" />
          <div className="p-3">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="min-h-dvh w-[calc(100%-256px)]">
        <AdminNavbar />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

export default AdminTemplate;