"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LogOut, LayoutGrid, Calendar, HelpCircle, User, Loader2, ShieldCheck } from "lucide-react";
import { handleLogout } from "@/app/lib/actions";
import { useHasMounted } from "@/app/hooks/use-has-mounted";

export const adminNav = [
  { type: "separator", label: "Registry Management" },
  { type: "menu-item", url: "/admin/blogs", label: "Editorial Blogs", icon: <LayoutGrid size={18} /> },
  { type: "menu-item", url: "/admin/events", label: "Cultural Events", icon: <Calendar size={18} /> },
  { type: "menu-item", url: "/admin/faqs", label: "Knowledge Base", icon: <HelpCircle size={18} /> },
];

function AdminSidebar() {
  const pathname = usePathname();
  const hasMounted = useHasMounted();
  const { data: session, status } = useSession();

  const isLoading = !hasMounted || status === "loading";
  const user = session?.user;

  return (
    <aside className="flex flex-col w-72 h-screen sticky top-0 border-r transition-colors duration-300
      bg-white border-slate-200 dark:bg-[#0B1120] dark:border-slate-800">
      
      {/* BRANDING */}
      <div className="p-6 mb-2">
        <div className="flex items-center gap-4 group">
          <div className="relative h-10 w-10 shrink-0">
            <Image
              src="/logo/KAY_bes_emblem_light01pngx4.png"
              alt="BES Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[11px] uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Bayanihan</span>
            <span className="font-bold text-sm text-slate-900 dark:text-white leading-tight">Exchange Sweden</span>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {adminNav.map((item, index) => {
          if (item.type === "separator") {
            return (
              <div key={`sep-${index}`} className="px-4 mt-8 mb-3">
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">{item.label}</span>
              </div>
            );
          }
          const isActive = pathname === item.url;
          return (
            <Link key={item.url} href={item.url}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[13px] transition-all duration-200 group
                ${isActive ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400" : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5"}`}
            >
              {isActive && <div className="absolute left-0 w-1 h-5 bg-indigo-600 dark:bg-indigo-400 rounded-r-full" />}
              <span className={isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-indigo-500"}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER / USER SECTION */}
      <div className="p-4 mt-auto">
        <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 rounded-[2rem] p-2">
          {isLoading ? (
            // Shimmer Loading State
            <div className="flex items-center gap-3 p-2 animate-pulse">
              <div className="h-10 w-10 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-2 w-12 bg-slate-100 dark:bg-slate-800/50 rounded" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 p-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-10 w-10 shrink-0">
                  <div className="relative h-full w-full rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 overflow-hidden">
                    {user?.image ? <Image src={user.image} alt="User" fill className="object-cover" /> : <User size={20} />}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500" />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-[13px] font-bold text-slate-900 dark:text-white truncate">{user?.name || "Admin"}</p>
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={10} className="text-indigo-500" />
                    <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{user?.role || "Staff"}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => handleLogout()} className="h-10 w-10 flex items-center justify-center rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 transition-all">
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;