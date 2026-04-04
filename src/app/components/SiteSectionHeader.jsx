"use client";
import React from "react";
import { motion } from "framer-motion";

const fup = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2, // Slightly increased for a more dramatic entrance
    },
  },
};

function SiteSectionHeader({
  tagline = "tagline",
  title = "Title",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis praesentium accusantium a incidunt expedita aperiam minima harum quo veniam voluptatum!",
  flexAlign = "items-center",
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      className={`flex flex-col mb-16 ${flexAlign}`}
    >
      {/* Tagline Container */}
      <motion.div
        variants={fup}
        className="inline-flex items-center gap-4 mb-8"
      >
        <div className="h-[2px] w-8 md:w-16 bg-theme-red" />
        <span className="text-theme-red font-black uppercase tracking-[0.3em] text-sm">
          {tagline}
        </span>
        <div className="h-[2px] w-8 md:w-16 bg-theme-red" />
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={fup}
        className="text-center font-clarendon text-4xl md:text-7xl font-bold text-theme-dark dark:text-white leading-tight"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={fup}
        className="max-w-2xl mx-auto text-theme-blue dark:text-theme-cream/80 text-lg text-center"
      >
        { description }
      </motion.p>
    </motion.div>
  );
}

export default SiteSectionHeader;
