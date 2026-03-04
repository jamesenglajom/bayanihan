"use client"
import React from "react";
import { usePathname } from "next/navigation";
import { adminNav } from "@/app/components/admin/AdminSidebar";

const NavLabel = ({pageLabel=""}) => {
  if(!pageLabel) return "Admin"
  return <span>{pageLabel}</span>
}

function AdminNavbar() {
  const pathname = usePathname();
  const page_label = adminNav.find(item => item?.url === pathname && item?.type !== "separator")?.label;
  return (
    <div className="w-full dark:bg-theme-dark py-5 border-b border-neutral-300 sticky top-0 z-50 bg-white">
      <div className="flex items-center gap-5 px-2">
        <div className=" text-neutral-800 text-2xl">
          <NavLabel pageLabel={page_label}/>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
