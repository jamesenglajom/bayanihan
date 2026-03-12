"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // npm install framer-motion

function WhatWeDo() {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-neutral-950 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 mb-16"
        >
          <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] text-xs">
            Our Mission
          </span>
          <h2 className="font-bold text-4xl md:text-6xl font-fraunces text-neutral-900 dark:text-neutral-100 text-center leading-tight">
            What We Do
          </h2>
          <p className="max-w-2xl text-center text-neutral-600 dark:text-neutral-400 text-lg">
            Dedicated to fostering a vibrant Filipino community in Sweden through 
            cultural preservation and mutual empowerment.
          </p>
        </motion.div>

        {/* Animated Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          
          {/* Card 1 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10 }}
            className="group relative border rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden pb-14 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="h-52 w-full relative overflow-hidden">
              <Image
                src="/banner/banner.png"
                alt="Community Support"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">Culture</span>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-fraunces">
                Community Support
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                Navigating life's challenges through shared wisdom and collective action.
              </p>
            </div>
            <button className="absolute left-6 bottom-5 font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 group/btn">
              Learn More <span className="group-hover/btn:translate-x-1 transition-transform">&rsaquo;</span>
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10 }}
            className="group relative border rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden pb-14 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="h-52 w-full relative overflow-hidden">
              <Image
                src="/banner/banner.png"
                alt="Outreach"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">Outreach</span>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-fraunces">
                Local Ties
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                Strengthening partnerships with Swedish organizations and institutions.
              </p>
            </div>
            <button className="absolute left-6 bottom-5 font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 group/btn">
              Learn More <span className="group-hover/btn:translate-x-1 transition-transform">&rsaquo;</span>
            </button>
          </motion.div>

          {/* Card 3 - Wide Card */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-2 relative border rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="h-64 sm:h-auto sm:w-1/2 relative overflow-hidden group">
              <Image
                src="/images/sample-image.jpg"
                alt="Leadership"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 sm:w-1/2 flex flex-col justify-center gap-4">
              <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">Leadership</span>
              <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 font-fraunces leading-tight">
                Empowering Future Leaders
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-base">
                Investing in our youth through structured mentorship and heritage education.
              </p>
              <button className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group/btn w-fit">
                Join the Program <span className="group-hover/btn:translate-x-1 transition-transform">&rsaquo;</span>
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default WhatWeDo;