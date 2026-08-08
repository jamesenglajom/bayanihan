import React from 'react'
import Link from 'next/link'
import { supabase } from '@/app/lib/supabase'
import { LayoutGrid, Calendar, HelpCircle, ArrowUpRight, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Dashboard | Admin",
};

async function getCounts() {
  const [blogs, events, faqs] = await Promise.all([
    supabase.from('blogs').select('id', { count: 'exact', head: true }),
    supabase.from('events').select('id', { count: 'exact', head: true }),
    supabase.from('faqs').select('id', { count: 'exact', head: true }),
  ]);
  return {
    blogs: blogs.count ?? 0,
    events: events.count ?? 0,
    faqs: faqs.count ?? 0,
  };
}

export default async function AdminRootPage() {
  const counts = await getCounts();

  const cards = [
    {
      label: "Editorial Blogs",
      count: counts.blogs,
      href: "/admin/blogs",
      addHref: "/admin/blogs/add",
      icon: LayoutGrid,
    },
    {
      label: "Cultural Events",
      count: counts.events,
      href: "/admin/events",
      addHref: "/admin/events/add",
      icon: Calendar,
    },
    {
      label: "Knowledge Base",
      count: counts.faqs,
      href: "/admin/faqs",
      addHref: null,
      icon: HelpCircle,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
          Registry overview for Bayanihan Exchange Sweden.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ label, count, href, addHref, icon: Icon }) => (
          <div
            key={label}
            className="group bg-white dark:bg-white/2 border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 flex flex-col gap-6 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Icon size={18} />
              </div>
              {addHref && (
                <Link
                  href={addHref}
                  aria-label={`Add ${label}`}
                  className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-500/10 transition-colors"
                >
                  <Plus size={16} />
                </Link>
              )}
            </div>

            <div>
              <p className="text-4xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                {count}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">
                {label}
              </p>
            </div>

            <Link
              href={href}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
            >
              Manage
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
