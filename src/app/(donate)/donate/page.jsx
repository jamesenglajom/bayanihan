"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  QrCode,
  ShieldCheck,
  ExternalLink,
  CheckCircle, // Added the missing import here
} from "lucide-react";
import swishQrcodeSvg from "swish-qrcode-svg";

// --- Static Public Navbar ---
const PublicNavbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md border-slate-200 dark:border-slate-800/60 transition-colors">
    <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative h-9 w-9 transition-transform group-hover:scale-110">
          <Image
            src="/logo/KAY_bes_emblem_light01pngx4.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-[10px] uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Bayanihan
          </span>
          <span className="font-bold text-xs text-slate-900 dark:text-white">
            Exchange Sweden
          </span>
        </div>
      </Link>
    </div>
  </nav>
);

export default function DonatePage() {
  const year = process.env.NEXT_PUBLIC_YEAR || "2028";
  const org_number = process.env.NEXT_PUBLIC_ORG_NUMBER || "";
  const swishUrl = process.env.NEXT_PUBLIC_SWISH_URL || "";
  const swishHRCode = process.env.NEXT_PUBLIC_SWISH_HR_CODE || "";

  const svgString = useMemo(() => {
    try {
      return swishQrcodeSvg(swishUrl, {
        margin: 0,
        backgroundColor: "transparent",
      });
    } catch (error) {
      console.error("QR Generation Error:", error);
      return null;
    }
  }, [swishUrl]);

  return (
    <div className="relative min-h-screen pt-20 selection:bg-indigo-500 selection:text-white bg-white dark:bg-[#0B1120] transition-colors">
      <PublicNavbar />

      {/* Abstract Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border-[100px] border-indigo-600 rounded-full rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square border-[50px] border-indigo-400 rounded-full -rotate-12" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Community Support {year}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              Empower Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
                Filipino-Swedish
              </span>{" "}
              <br />
              Community.
            </h1>

            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Your donation funds integration workshops, cultural festivals, and
              emergency aid for those in need. Every krona builds a stronger
              bridge.
            </p>
          </div>

          {/* Verification Badges */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                <CheckCircle size={16} className="text-emerald-500" />
                <span>Swedish Org. Registered</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                <CheckCircle size={16} className="text-emerald-500" />
                <span>Secure Payments</span>
            </div>
          </div>
        </div>

        {/* Right Column: Swish QR & Mobile Pay */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full opacity-50 dark:opacity-20" />

            <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-transform hover:scale-[1.01]">
              <div className="flex items-center justify-between mb-8">
                <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                  <QrCode size={24} />
                </div>
                <div className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest">
                  Swish Only
                </div>
              </div>

              {/* QR Code Container (Desktop View) */}
              <div className="hidden md:block relative aspect-square bg-white rounded-3xl p-6 mb-8 border border-slate-50 shadow-inner group">
                {!svgString ? (
                  <div className="flex items-center justify-center h-full text-rose-500 font-bold text-xs uppercase">
                    Generation Error
                  </div>
                ) : (
                  <div
                    className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:block transition-transform duration-500 group-hover:scale-105"
                    dangerouslySetInnerHTML={{ __html: svgString }}
                  />
                )}
              </div>

              {/* Mobile "Deep Link" Button (Visible on Mobile Only) */}
              <div className="md:hidden mb-8">
                <a 
                  href={swishUrl} 
                  className="flex flex-col items-center justify-center gap-3 w-full py-8 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 active:scale-95 transition-all"
                >
                  <ExternalLink size={28} />
                  <span className="font-black text-sm uppercase tracking-widest">Open Swish App</span>
                </a>
              </div>

              <div className="text-center space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                   {svgString ? "Scan to Donate" : "Manual Entry"}
                </p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {swishHRCode}
                </h3>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-center gap-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/5 py-2 rounded-full border border-emerald-100/50 dark:border-emerald-500/10">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Verified Receiver
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-[11px] font-medium text-slate-400 tracking-wide">
          © {year} Bayanihan Exchange Sweden. Org. No: {org_number}
        </p>
        <div className="flex gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <span className="cursor-default">Stockholm</span>
          <span className="hidden md:inline h-3 w-px bg-slate-200 dark:bg-slate-800" />
          <span className="cursor-default">Philippines</span>
        </div>
      </footer>
    </div>
  );
}