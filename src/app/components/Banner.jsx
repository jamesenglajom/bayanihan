"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function Banner() {
  return (
    <div 
      id="home" 
      className="w-full bg-theme-alice dark:bg-neutral-950 pb-10 lg:pb-24 relative overflow-hidden transition-colors duration-500"
    >
      {/* 1. Animated Background Blur */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.4, scale: 1.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-full h-full bg-hero bg-cover bg-center blur-2xl opacity-40" 
        aria-hidden="true"
      />

      {/* Decorative Gradient Blob for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 pt-20 pb-12 lg:pt-32 lg:pb-20 flex flex-col items-center justify-center relative z-20">
        <div className="max-w-4xl text-center">
          {/* 2. Headline Animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-fraunces leading-[1.05] text-theme-dark dark:text-white"
          >
            Celebrating <br />
            <span className="text-blue-600 dark:text-blue-400 inline-block">
              Filipino culture
            </span> <br />
            and community
          </motion.h1>

          {/* 3. Subtext Animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium"
          >
            A bridge between heritage and future. Connecting the Filipino diaspora 
            across Sweden through shared stories and support.
          </motion.p>
        </div>
      </div>

      {/* 4. Hero Image Animation */}
      <div className="container mx-auto px-4 md:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative h-[350px] md:h-[500px] lg:h-[650px] w-full overflow-hidden rounded-[2rem] bg-neutral-300 dark:bg-neutral-800 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] z-20 border border-white/20 dark:border-neutral-700/30"
        >
          <Image
            src="/banner/banner.png"
            alt="Bayanihan Community"
            fill
            className="object-cover transition-transform duration-1000 hover:scale-105"
            priority
            sizes="100vw"
          />
          {/* Subtle vignette for a premium look */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Scroll Indicator Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-600 to-transparent" />
      </motion.div>
    </div>
  );
}

export default Banner;