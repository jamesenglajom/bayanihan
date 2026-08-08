import React from 'react'
import { Newspaper } from 'lucide-react'

export const metadata = {
  title: "News | Admin",
};

function page() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          News
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
          Press coverage and external mentions.
        </p>
      </div>

      <div className="py-20 flex flex-col items-center justify-center text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl mb-4 text-slate-300 dark:text-slate-700">
          <Newspaper size={28} strokeWidth={1.5} />
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
          Nothing here yet
        </p>
      </div>
    </div>
  )
}

export default page
