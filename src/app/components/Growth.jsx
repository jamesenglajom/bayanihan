"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function Growth() {
  const growth = {
    members: {
      value: "500+",
      label: "Active Members",
    },
    service: {
      value: "5",
      label: "Years serving",
    },
    lives: {
      value: "99+",
      label: "Lives touched annually",
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } 
    },
  };

  return (
    <section id="community" className="w-full py-16 md:py-24 bg-white dark:bg-neutral-950 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 mb-12 lg:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h3 className="font-bold font-fraunces text-4xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-neutral-100 leading-tight">
              Growing stronger with <br className="hidden md:block" /> each passing year
            </h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 flex items-center"
          >
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 border-blue-600 dark:border-blue-400 pl-6">
              Our numbers tell the story of a community that matters. From
              humble beginnings to where we stand today, the growth reflects the
              dedication of those who believe in our mission.
            </p>
          </motion.div>
        </div>

        {/* Growth Stats Grid (Bento Style) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          
          {/* Main Stat Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 flex flex-col items-center justify-center p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 shadow-sm"
          >
            <span className="font-bold text-7xl md:text-8xl lg:text-9xl text-blue-600 dark:text-blue-400 tracking-tighter">
              {growth.members.value}
            </span>
            <span className="font-bold text-xl text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mt-4">
              {growth.members.label}
            </span>
          </motion.div>

          {/* Secondary Stats Grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Image Box 1 */}
            <motion.div variants={itemVariants} className="relative rounded-3xl aspect-video overflow-hidden shadow-lg group">
              <Image
                src="/banner/banner.png"
                alt="Community event"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </motion.div>

            {/* Service Stat */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-colors"
            >
              <span className="font-bold text-6xl md:text-7xl text-neutral-900 dark:text-neutral-100">
                {growth.service.value}
              </span>
              <span className="font-bold text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                {growth.service.label}
              </span>
            </motion.div>

            {/* Lives Touched Stat */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-colors"
            >
              <span className="font-bold text-6xl md:text-7xl text-neutral-900 dark:text-neutral-100">
                {growth.lives.value}
              </span>
              <span className="font-bold text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                {growth.lives.label}
              </span>
            </motion.div>

            {/* Image Box 2 */}
            <motion.div variants={itemVariants} className="relative rounded-3xl aspect-video overflow-hidden shadow-lg group">
              <Image
                src="/banner/banner.png"
                alt="Community growth"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Growth;