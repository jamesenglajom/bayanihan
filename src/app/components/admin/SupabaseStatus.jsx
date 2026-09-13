"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Database, Zap, Loader2, History, CheckCircle2, Clock } from "lucide-react";

const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

function daysRemaining(nextEligibleAt) {
  if (!nextEligibleAt) return 0;
  const ms = new Date(nextEligibleAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
}

export default function SupabaseStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pinging, setPinging] = useState(false);
  const [error, setError] = useState("");

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/keepalive");
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error("Failed to load keep-alive status", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handlePing = async () => {
    setPinging(true);
    setError("");
    try {
      const res = await fetch("/api/keepalive", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to ping Supabase");
      setStatus(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setPinging(false);
    }
  };

  const canPingNow = status?.canPingNow;
  const remaining = daysRemaining(status?.nextEligibleAt);

  return (
    <div className="max-w-3xl mx-auto antialiased text-slate-900 dark:text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-indigo-600 rounded-xl text-white">
          <Database size={20} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Supabase</h1>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Free-tier keep-alive
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-white/2 rounded-2xl border border-slate-200 dark:border-slate-800/60 p-8 space-y-6">
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Supabase pauses free-tier projects after a week with no API activity. A Vercel Cron Job
          pings this project automatically every Monday, and you can trigger an extra ping here
          manually -- limited to once every 7 days.
        </p>

        {loading ? (
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm">
            <Loader2 size={16} className="animate-spin" /> Loading status...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-slate-800/60">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                  Last Ping
                </p>
                {status?.lastPing ? (
                  <>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {dateTimeFormat.format(new Date(status.lastPing.created_at))}
                    </p>
                    <span className="inline-block mt-2 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {status.lastPing.source === "cron" ? "Automatic" : "Manual"}
                    </span>
                  </>
                ) : (
                  <p className="text-sm font-bold text-slate-400 dark:text-slate-500">Never pinged yet</p>
                )}
              </div>

              <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-slate-800/60">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                  Status
                </p>
                {canPingNow ? (
                  <p className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={16} /> Ready to ping
                  </p>
                ) : (
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                    <Clock size={16} /> Available in {remaining} day{remaining === 1 ? "" : "s"}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl text-sm font-semibold bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20">
                {error}
              </div>
            )}

            <button
              onClick={handlePing}
              disabled={!canPingNow || pinging}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] transition-all active:scale-95
                ${!canPingNow || pinging
                  ? "bg-slate-100 text-slate-300 dark:bg-white/5 dark:text-slate-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
            >
              {pinging ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
              {canPingNow ? "Ping Supabase Now" : "Already Pinged This Week"}
            </button>

            {status?.history?.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                  <History size={14} /> Recent Pings
                </p>
                <ul className="space-y-2">
                  {status.history.map((ping, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      <span>{dateTimeFormat.format(new Date(ping.created_at))}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                        {ping.source === "cron" ? "Automatic" : "Manual"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
