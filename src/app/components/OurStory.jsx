"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function OurStory() {
  // Animation variants for the text section
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
    },
  };

  // Animation variants for the emblem section
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      transition: { duration: 1, ease: "backOut" } 
    },
  };

  return (
    <section 
      id="about" 
      className="w-full py-16 md:py-24 bg-white dark:bg-neutral-950 transition-colors duration-500 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Content Section */}
        <motion.div 
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8"
        >
          <motion.div variants={textVariants} className="font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase text-sm">
            Heritage
          </motion.div>
          
          <motion.h2 variants={textVariants} className="font-bold text-4xl md:text-5xl lg:text-6xl font-fraunces leading-[1.1] text-neutral-900 dark:text-neutral-100">
            Our story and <br className="hidden md:block" /> 
            commitment to <br className="hidden md:block" /> 
            community
          </motion.h2>
          
          <motion.div variants={textVariants} className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed space-y-6">
            <p>
              Bayanihan Exchange in Sweden (BES) is a community‑driven, non‑profit
              cultural organisation dedicated to celebrating the richness of
              Filipino heritage, showcasing Filipino talents, and fostering
              meaningful cultural exchange across Sweden. Open to all, BES brings
              people together through the Filipino spirit of <span className="text-blue-600 dark:text-blue-400 font-semibold italic">bayanihan</span>—lifting one
              another through shared effort, shared joy, and shared purpose.
            </p>
            <p className="hidden md:block">
              Through festivals, workshops, and collaborative projects, BES invites 
              both Filipinos and non‑Filipinos to experience the warmth, resilience, 
              artistry, and generosity that define Filipino identity.
            </p>
          </motion.div>

          <motion.ul variants={textVariants} className="flex flex-col gap-4 mt-4">
            <li className="flex items-center gap-4 text-neutral-800 dark:text-neutral-200 group">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16"/><path d="m12 14-3-3m3 3 3-3"/><path d="M12 20V14"/><circle cx="12" cy="9" r="5"/></svg>
              </div>
              <span className="font-medium">Respect for tradition and cultural pride</span>
            </li>
            <li className="flex items-center gap-4 text-neutral-800 dark:text-neutral-200 group">
              <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
              </div>
              <span className="font-medium">Dedication to help our members</span>
            </li>
            <li className="flex items-center gap-4 text-neutral-800 dark:text-neutral-200 group">
              <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
              </div>
              <span className="font-medium">Commitment to a shared thriving future</span>
            </li>
          </motion.ul>
        </motion.div>

        {/* Right Image/Emblem Section */}
        <motion.div 
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full lg:w-1/2 min-h-[400px] relative flex items-center justify-center bg-theme-cream dark:bg-neutral-900 overflow-hidden rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-xl"
        >
          {/* Subtle background pattern/glow */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
          
          <div className="relative w-4/5 h-4/5">
            <Image
              src="/logo/KAY_bes_emblem_light01pngx4.png"
              alt="BES Emblem"
              fill
              className="object-contain dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default OurStory;