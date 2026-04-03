"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
const donate_link = "/donate";
const volunteer_link = "#";
function Donate() {
  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-neutral-950 transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Image Container with Reveal Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative h-72 md:h-96 lg:h-[450px] w-full overflow-hidden rounded-3xl shadow-2xl dark:shadow-blue-900/10">
              <Image
                src="/banner/banner.png"
                alt="Community Support"
                className="object-cover transition-transform duration-700 hover:scale-105"
                fill
                priority
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Text Content with Staggered Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm"
              >
                Support BES
              </motion.span>
              <h2 className="font-bold font-fraunces text-4xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-neutral-100 leading-tight">
                Be part of <br className="hidden md:block" /> something bigger
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0">
                Your support strengthens our community and keeps our traditions alive. 
                Together, we can ensure the Filipino spirit thrives in Sweden.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2"
            >
              <Link href={donate_link} className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-neutral-900 font-bold rounded-full shadow-lg transition-all active:scale-95">
                Donate Now
              </Link>
              <Link href={volunteer_link} className="px-8 py-4 border-2 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-bold rounded-full transition-all active:scale-95">
                Volunteer
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Donate;