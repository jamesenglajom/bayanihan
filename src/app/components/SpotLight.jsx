"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// --- GLOBAL CONTENT DATA ---
const SPOTLIGHT_DATA = {
  name: "Kay Alvefelt",
  role: "Community Member",
  brand: "MERKADOPH",
  quote: "This Association gave me back my roots and people. I found family here.",
  highlight: "roots",
  image: "/banner/banner.png",
};

// --- VERSION 1: THE REFINED CLASSIC (Enhanced Original) ---
const SpotlightV1 = () => (
  <section className="w-full py-16 md:py-24 bg-theme-alice dark:bg-theme-dark transition-colors duration-500">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-3xl overflow-hidden shadow-xl border-4 border-theme-cream dark:border-theme-blue/20">
            <Image src={SPOTLIGHT_DATA.image} alt={SPOTLIGHT_DATA.name} fill className="object-cover" />
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <span className="text-theme-red font-bold tracking-[0.2em] uppercase text-sm">Spotlight</span>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-dark dark:text-theme-alice leading-tight">
            "{SPOTLIGHT_DATA.quote.split(SPOTLIGHT_DATA.highlight)[0]} 
            <span className="text-theme-blue italic">{SPOTLIGHT_DATA.highlight}</span> 
            {SPOTLIGHT_DATA.quote.split(SPOTLIGHT_DATA.highlight)[1]}"
          </h2>
          <div className="border-l-4 border-theme-yellow pl-6">
            <p className="text-xl font-bold text-theme-dark dark:text-theme-alice">{SPOTLIGHT_DATA.name}</p>
            <p className="text-theme-blue dark:text-theme-yellow/80">{SPOTLIGHT_DATA.role} • {SPOTLIGHT_DATA.brand}</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- VERSION 2: THE MODERN SPLIT (Bold & Symmetrical) ---
const SpotlightV2 = () => (
  <section className="w-full bg-theme-blue dark:bg-theme-dark py-20">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] shadow-2xl bg-theme-alice dark:bg-[#1f2b3a]">
        <div className="relative h-[400px] lg:h-full">
          <Image src={SPOTLIGHT_DATA.image} alt={SPOTLIGHT_DATA.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-theme-blue/10 mix-blend-multiply" />
        </div>
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="w-12 h-1 bg-theme-red mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-theme-dark dark:text-white mb-8">
            {SPOTLIGHT_DATA.quote}
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-theme-yellow flex items-center justify-center font-bold text-theme-dark">KA</div>
            <div>
              <p className="font-bold text-theme-dark dark:text-theme-alice">{SPOTLIGHT_DATA.name}</p>
              <p className="text-sm uppercase tracking-widest text-theme-red">{SPOTLIGHT_DATA.brand}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- VERSION 3: THE MINIMALIST FLOATING (Elegant White-space) ---
const SpotlightV3 = () => (
  <section className="w-full py-24 bg-theme-alice dark:bg-theme-dark">
    <div className="container mx-auto px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <Image 
          src={SPOTLIGHT_DATA.image} alt={SPOTLIGHT_DATA.name} 
          width={120} height={120} 
          className="mx-auto rounded-full border-4 border-theme-yellow mb-8 object-cover h-[120px] w-[120px]" 
        />
        <h2 className="text-3xl md:text-5xl font-medium text-theme-dark dark:text-theme-alice italic leading-relaxed mb-10">
          &ldquo;{SPOTLIGHT_DATA.quote}&rdquo;
        </h2>
        <div className="space-y-1">
          <h4 className="text-2xl font-bold text-theme-blue dark:text-theme-yellow">{SPOTLIGHT_DATA.name}</h4>
          <p className="text-theme-dark/60 dark:text-theme-alice/60 uppercase tracking-tighter font-bold">{SPOTLIGHT_DATA.brand}</p>
        </div>
      </motion.div>
    </div>
  </section>
);

// --- VERSION 4: THE BRUTALIST (High Contrast & Edgy) ---
const SpotlightV4 = () => (
  <section className="w-full py-20 bg-theme-yellow dark:bg-theme-red">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row border-4 border-theme-dark dark:border-theme-alice bg-theme-alice dark:bg-theme-dark shadow-[12px_12px_0px_0px_rgba(25,35,48,1)] dark:shadow-[12px_12px_0px_0px_rgba(240,244,248,1)]">
        <div className="w-full md:w-1/3 border-b-4 md:border-b-0 md:border-r-4 border-theme-dark dark:border-theme-alice p-6">
          <div className="aspect-[3/4] relative grayscale hover:grayscale-0 transition-all">
            <Image src={SPOTLIGHT_DATA.image} alt={SPOTLIGHT_DATA.name} fill className="object-cover" />
          </div>
        </div>
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-between">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-theme-dark dark:text-theme-alice italic">
            {SPOTLIGHT_DATA.quote}
          </h2>
          <div className="mt-8 pt-8 border-t-2 border-theme-dark/10 dark:border-theme-alice/10 flex justify-between items-end">
            <div>
              <p className="text-2xl font-black text-theme-red dark:text-theme-yellow">{SPOTLIGHT_DATA.name}</p>
              <p className="font-bold text-theme-dark dark:text-theme-alice">{SPOTLIGHT_DATA.role}</p>
            </div>
            <p className="text-4xl font-black opacity-20 text-theme-dark dark:text-theme-alice">04</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- VERSION 5: THE FEATURE OVERLAY (Cinematic & Depth) ---
const SpotlightV5 = () => (
  <section className="w-full py-24 bg-theme-dark relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-theme-blue/20 skew-x-12 translate-x-20" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute -inset-4 bg-theme-red/20 blur-3xl rounded-full" />
          <Image 
            src={SPOTLIGHT_DATA.image} alt={SPOTLIGHT_DATA.name} 
            width={600} height={600} 
            className="rounded-2xl relative z-10 border border-theme-alice/10" 
          />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-theme-yellow text-theme-dark font-bold text-xs mb-6">
            <div className="w-2 h-2 rounded-full bg-theme-red animate-pulse" />
            MEMBER FEATURE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-theme-alice mb-8 leading-tight">
            Building <span className="text-theme-yellow">community</span> one connection at a time.
          </h2>
          <p className="text-xl text-theme-alice/80 mb-10 leading-relaxed border-l-2 border-theme-blue pl-6 italic">
            "{SPOTLIGHT_DATA.quote}"
          </p>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-theme-alice/30" />
            <span className="text-theme-alice font-bold tracking-widest">{SPOTLIGHT_DATA.name}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- MAIN COMPONENT WRAPPER ---
export default function SpotlightShowcase() {
  return (
    <div className=" bg-theme-alice dark:bg-theme-dark">
      {/* 1. Enhanced Original */}
      {/* <SpotlightV1 /> */}

      {/* 2. Split Card Layout */}
      <SpotlightV2 />

      {/* 3. Minimalist Center-focused */}
      {/* <SpotlightV3 /> */}

      {/* 4. Brutalist Industrial */}
      {/* <SpotlightV4 /> */}

      {/* 5. Cinematic Feature Overlay */}
      {/* <SpotlightV5 /> */}
    </div>
  );
}