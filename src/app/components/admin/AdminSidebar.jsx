"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LogOut, LayoutGrid, Calendar, HelpCircle, User, Loader2, ShieldCheck, X } from "lucide-react";
import { handleLogout } from "@/app/lib/actions";
import { useHasMounted } from "@/app/hooks/use-has-mounted";

export const adminNav = [
  { type: "separator", label: "Registry Management" },
  { type: "menu-item", url: "/admin/blogs", label: "Editorial Blogs", icon: <LayoutGrid size={18} /> },
  { type: "menu-item", url: "/admin/events", label: "Cultural Events", icon: <Calendar size={18} /> },
  { type: "menu-item", url: "/admin/faqs", label: "Knowledge Base", icon: <HelpCircle size={18} /> },
];

function AdminSidebar({ open = false, onClose = () => {} }) {
  const pathname = usePathname();
  const hasMounted = useHasMounted();
  const { data: session, status } = useSession();

  const isLoading = !hasMounted || status === "loading";
  const user = session?.user;

  return (
    <>
      {/* Mobile scrim */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-72 border-r transition-transform duration-300 ease-out will-change-transform
          bg-white border-slate-200 dark:bg-[#0B1120] dark:border-slate-800/60
          lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* BRANDING */}
        <div className="flex items-center justify-between gap-2 p-6 mb-2">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-3 min-w-0 group">
            <div className="relative h-10 w-10 shrink-0">
              <Image
                src="/logo/KAY_bes_emblem_light01pngx4.png"
                alt="BES Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-black text-[11px] uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Bayanihan</span>
              <span className="font-bold text-sm text-slate-900 dark:text-white leading-tight truncate">Exchange Sweden</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="lg:hidden shrink-0 h-9 w-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-4 space-y-0.5 overflow-y-auto">
          {adminNav.map((item, index) => {
            if (item.type === "separator") {
              return (
                <div key={`sep-${index}`} className="px-4 mt-6 mb-2 first:mt-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">{item.label}</span>
                </div>
              );
            }
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.url}
                href={item.url}
                onClick={onClose}
                className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-[13px] transition-colors duration-150 group
                  ${isActive
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5"}`}
              >
                {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-r-full" />}
                <span className={isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-indigo-500"}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER / USER SECTION */}
        <div className="p-4 mt-auto">
          <div className="bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-2">
            {isLoading ? (
              <div className="flex items-center gap-3 p-2 animate-pulse">
                <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-2 w-12 bg-slate-100 dark:bg-slate-800/50 rounded" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2 p-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-9 w-9 shrink-0">
                    <div className="relative h-full w-full rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 overflow-hidden">
                      {user?.image ? <Image src={user.image} alt="User" fill className="object-cover" /> : <User size={18} />}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-50 dark:border-[#0B1120] bg-emerald-500" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-[13px] font-bold text-slate-900 dark:text-white truncate">{user?.name || "Admin"}</p>
                    <div className="flex items-center gap-1">
                      <ShieldCheck size={10} className="text-indigo-500 shrink-0" />
                      <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono truncate">{user?.role || "Staff"}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleLogout()}
                  aria-label="Log out"
                  className="shrink-0 h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
