"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function SpotLight() {
  return (
    <section className="w-full py-16 md:py-24 bg-neutral-900 dark:bg-black overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          
          {/* Image Section: Reveal from Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square w-full max-w-[500px] mx-auto overflow-hidden rounded-3xl shadow-2xl border border-neutral-800">
              <Image
                src="/banner/banner.png"
                alt="Kay Alvefelt"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                priority
              />
              {/* Subtle Gradient Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Text Content: Reveal from Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col gap-8 md:gap-12"
          >
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-block py-1 px-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest"
              >
                Spotlight
              </motion.div>
              
              <blockquote className="relative">
                {/* Large Decorative Quote Mark */}
                <span className="absolute -top-10 -left-6 text-8xl text-blue-500/20 font-serif pointer-events-none italic">
                  &ldquo;
                </span>
                <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl font-fraunces leading-tight text-neutral-100 dark:text-white relative z-10">
                  This Association gave me back my <span className="text-blue-400 italic">roots</span> and people. I found family here.
                </h2>
              </blockquote>
            </div>

            <div className="flex flex-col gap-1 border-l-2 border-blue-500 pl-6">
              <div className="font-bold text-xl text-white tracking-wide">
                Kay Alvefelt
              </div>
              <div className="text-neutral-400 font-medium">
                Community Member
              </div>
              <div className="text-blue-400 text-sm font-bold tracking-tighter uppercase">
                MERKADOPH
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default SpotLight;