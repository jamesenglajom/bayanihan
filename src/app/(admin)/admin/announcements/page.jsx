import React from 'react'
import Link from 'next/link'
import { Megaphone, Plus } from 'lucide-react'

export const metadata = {
  title: "Announcements | Admin",
};

function page() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Announcements
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
            Community-wide notices and updates.
          </p>
        </div>
        <Link
          href="/admin/announcements/add"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors active:scale-95 font-bold text-sm whitespace-nowrap w-fit"
        >
          <Plus size={18} /> New Announcement
        </Link>
      </div>

      <div className="py-20 flex flex-col items-center justify-center text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl mb-4 text-slate-300 dark:text-slate-700">
          <Megaphone size={28} strokeWidth={1.5} />
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
          No announcements yet
        </p>
      </div>
    </div>
  )
}

export default page
