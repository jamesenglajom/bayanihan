"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// --- Hero Variations ---

/**
 * 1. THE EDITORIAL (Center Aligned / Modern)
 * Best for: Storytelling and brand identity.
 */
const EditorialHero = () => (
  <div className="container mx-auto px-4 pt-20 pb-12 lg:pt-32 lg:pb-20 flex flex-col items-center justify-center relative z-20">
    <div className="max-w-4xl text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-theme-dark dark:text-white"
      >
        Celebrating <span className="text-theme-blue dark:text-theme-yellow italic">Filipino culture</span> and community
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="mt-8 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
      >
        A bridge between heritage and future. Connecting the Filipino diaspora across Sweden.
      </motion.p>
    </div>
    <motion.div 
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
      className="mt-12 relative h-[350px] md:h-[500px] lg:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/20"
    >
      <Image src="/banner/banner.png" alt="Hero" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
    </motion.div>
  </div>
);

/**
 * 2. THE SPLIT-SCREEN (Conversion Focused)
 * Best for: Action-oriented sites with clear CTAs.
 */
const SplitHero = () => (
  <div className="container mx-auto px-4 py-20 lg:py-40 grid lg:grid-cols-2 gap-12 items-center relative z-20">
    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-8 h-[2px] bg-theme-red"></span>
        <span className="text-theme-red font-bold tracking-widest text-sm uppercase">Established in Sweden</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-theme-dark dark:text-white leading-tight">
        Bringing the <span className="text-theme-blue">Bayanihan</span> Spirit to the North.
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg">
        We empower Filipinos in Sweden through community building, cultural events, and professional networking.
      </p>
      <div className="flex gap-4 pt-4">
        <button className="bg-theme-blue text-white px-8 py-4 rounded-full font-bold hover:bg-theme-dark transition-colors shadow-lg">Join Us</button>
        <button className="border-2 border-theme-dark dark:border-white text-theme-dark dark:text-white px-8 py-4 rounded-full font-bold hover:bg-theme-dark hover:text-white transition-all">Our Story</button>
      </div>
    </motion.div>
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[400px] lg:h-[550px] rounded-[3rem] overflow-hidden shadow-2xl">
      <Image src="/banner/banner.png" alt="Hero" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
    </motion.div>
  </div>
);

/**
 * 3. THE BENTO GRID (Visual-Heavy)
 * Best for: Showcasing community variety and richness.
 */
const BentoHero = () => (
  <div className="container mx-auto px-4 py-20 lg:py-32 relative z-20">
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <h1 className="text-6xl md:text-8xl font-black text-theme-dark dark:text-white tracking-tighter uppercase">
          Pinoy <br/> <span className="text-theme-red underline decoration-theme-yellow">Strong</span>
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-md italic">
          "Connecting hearts across oceans, building a home away from home."
        </p>
        <div className="relative h-[300px] w-full rounded-3xl overflow-hidden shadow-lg">
           <Image src="/banner/banner.png" alt="Hero" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
        </div>
      </div>
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="bg-theme-blue p-10 rounded-[2.5rem] text-white flex-grow flex flex-col justify-end">
          <h3 className="text-3xl font-bold mb-2 text-theme-cream">2k+ Members</h3>
          <p className="opacity-80">A growing community of resilient Filipinos across the Swedish landscape.</p>
        </div>
        <div className="bg-theme-cream p-10 rounded-[2.5rem] text-theme-dark h-[200px]">
           <p className="font-bold text-xl uppercase">Upcoming Events</p>
           <p className="mt-2">Midsummer Fiesta 2026 — Stockholm</p>
        </div>
      </div>
    </div>
  </div>
);

/**
 * 4. THE OVERLAY (Cinematic)
 * Best for: High-impact landing with a premium feel.
 */
const OverlayHero = () => (
  <div className="container mx-auto px-4 py-10 relative z-20">
    <div className="relative h-[85vh] min-h-[600px] w-full rounded-[3rem] overflow-hidden group">
      <Image src="/banner/banner.png" alt="Hero" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
      <div className="absolute inset-0 bg-gradient-to-r from-theme-dark/90 via-theme-dark/40 to-transparent flex items-center">
        <div className="p-10 md:p-20 max-w-2xl">
          <motion.h1 initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Roots. <br/> Your <span className="text-theme-yellow">Future.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-theme-alice/80 text-xl mb-8">
            Navigating Swedish life while honoring Filipino heritage. Find your tribe today.
          </motion.p>
          <button className="bg-theme-red text-white px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
            Explore the Community
          </button>
        </div>
      </div>
    </div>
  </div>
);

/**
 * 5. THE MINIMALIST (Text Focus)
 * Best for: Fast-loading, clean, and professional aesthetics.
 */
const MinimalistHero = () => (
  <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
    {/* 1. Background Image Layer */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/banner/banner.png"
        alt="Background"
        fill
        className="object-cover opacity-20 dark:opacity-10 grayscale-[50%]"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* 2. Intelligent Readability Mask (Radial Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-b from-theme-alice via-transparent to-theme-alice dark:from-theme-dark dark:via-transparent dark:to-theme-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_var(--color-theme-alice)_90%)] dark:bg-[radial-gradient(circle,_transparent_20%,_var(--color-theme-dark)_90%)]" />
    </div>

    {/* 3. Content Layer */}
    <div className="container mx-auto px-4 py-32 lg:py-52 flex flex-col items-center text-center relative z-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <h2 className="text-theme-blue font-bold tracking-[0.5em] uppercase text-sm mb-4">
          Bayanihan Exchange in Sweden
        </h2>
        
        <h1 className="font-clarendon  text-5xl md:text-8xl font-light text-theme-dark dark:text-white leading-none tracking-tight">
          Culture. <span className="text-theme-red">Collaboration.</span> <br /> Community.
        </h1>

        <p className="text-neutral-600 dark:text-neutral-300 text-lg md:text-xl max-w-xl mx-auto pt-6 font-medium">
          A platform dedicated to the empowerment of the Filipino diaspora in <span className="text-theme-red">Sweden</span>.
        </p>

        {/* Stats Row */}
        {/* <div className="pt-10 flex justify-center gap-12">
          <div className="text-left">
            <p className="text-4xl font-bold text-theme-dark dark:text-white">15+</p>
            <p className="text-[10px] text-theme-blue font-bold uppercase tracking-widest">Cities</p>
          </div>
          
          <div className="w-[1px] h-12 bg-theme-dark/10 dark:bg-white/10" />
          
          <div className="text-left">
            <p className="text-4xl font-bold text-theme-dark dark:text-white">500+</p>
            <p className="text-[10px] text-theme-blue font-bold uppercase tracking-widest">Stories</p>
          </div>
        </div> */}
      </motion.div>
    </div>
  </div>
);

// --- Main Component ---

function Banner() {
  return (
    <div 
      id="home" 
      className="w-full bg-theme-alice dark:bg-theme-dark transition-colors duration-500 relative overflow-hidden min-h-screen"
    >
      {/* 1. Global Background Decorative Elements */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-theme-blue/5 dark:bg-theme-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-theme-red/5 dark:bg-theme-red/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Hero Versions Selector: Comment out to switch */}
      
      {/* <EditorialHero />
      <SplitHero />
      <BentoHero />
      <OverlayHero /> */}
      <MinimalistHero />

      {/* 3. Global Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 dark:text-neutral-500">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-theme-blue via-theme-blue/50 to-transparent" />
      </motion.div>
    </div>
  );
}

export default Banner;