"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SiteSectionHeader from "@/app/components/SiteSectionHeader"
/**
 * MASTER COMPONENT
 * Toggle sections by commenting/uncommenting the sub-components below.
 */
export default function WhatWeDoGallery() {
  return (
    <div id="about" className="flex flex-col gap-20 bg-theme-alice dark:bg-theme-dark">
      {/* Version 1: The Modern Bento (Refined) */}
      <VersionModernBento />

      {/* Version 2: The Side-by-Side Split */}
      {/* <VersionSideBySide /> */}

      {/* Version 3: The High-Impact Cards (Glassmorphism) */}
      {/* <VersionGlassCards /> */}

      {/* Version 4: The Minimalist Icon Grid */}
      {/* <VersionMinimalistGrid /> */}

      {/* Version 5: The Featured Highlight Stack */}
      {/* <VersionFeatureStack /> */}
    </div>
  );
}

// --- SHARED ANIMATIONS ---
const fup = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// --- VERSION 1: MODERN BENTO (ENHANCED) ---
function VersionModernBento() {
  const tagline = "Our Story";
  const title = "What We Do";
  const description = "Bringing people together through community, culture and meaningful changes that create lasting connections and shared experiences.";
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SiteSectionHeader tagline={tagline} title={title} description={description}/>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {/* Main Large Card */}
          <motion.div
            variants={fup}
            className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden bg-theme-blue min-h-[400px]"
          >
            <Image
              src="/images/what-we-do/wwd-leaders.webp"
              alt="Leadership"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-theme-dark via-transparent to-transparent p-8 flex flex-col justify-end">
              <span className="bg-theme-yellow text-theme-dark px-3 py-1 rounded-full text-xs font-bold w-fit mb-4">
                LEADERSHIP
              </span>
              <h3 className="font-clarendon text-3xl font-bold text-theme-alice mb-2">
                Empowering Future Leaders
              </h3>
              <p className="text-theme-cream text-sm max-w-md">
                Structured mentorship and heritage education for the next
                generation of Filipinos in Sweden.
              </p>
            </div>
          </motion.div>

          {/* Red Accent Card */}
          <motion.div
            variants={fup}
            className="md:col-span-2 bg-theme-red p-8 rounded-3xl flex flex-col justify-between group hover:shadow-xl hover:shadow-theme-red/20 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl">
                🤝
              </div>
              <div className="text-white/40 font-black text-6xl">01</div>
            </div>
            <div>
              <h3 className="font-clarendon text-2xl font-bold text-white mb-2">
                Community Support
              </h3>
              <p className="text-theme-alice/80">
                Navigating life's challenges through shared wisdom and
                collective action.
              </p>
            </div>
          </motion.div>

          {/* Yellow Highlight Card */}
          <motion.div
            variants={fup}
            className="bg-theme-yellow p-8 rounded-3xl flex flex-col justify-between hover:rotate-2 transition-transform"
          >
            <h3 className="font-clarendon text-xl font-bold text-theme-dark">Local Ties</h3>
            <p className="text-theme-dark/70 text-sm">
              Strengthening partnerships with Swedish institutions.
            </p>
          </motion.div>

          {/* Dark Contrast Card */}
          <motion.div
            variants={fup}
            className="bg-theme-dark dark:bg-theme-blue p-8 rounded-3xl flex flex-col justify-between border border-white/10"
          >
            <h3 className="font-clarendon text-xl font-bold text-theme-alice">Culture</h3>
            <p className="text-theme-alice/60 text-sm">
              Annual festivals and workshops keeping the spirit of the
              Philippines alive.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --- VERSION 2: SIDE BY SIDE SPLIT ---
function VersionSideBySide() {
  const items = [
    {
      title: "Heritage",
      desc: "Keeping Filipino traditions alive in Scandinavia.",
      color: "bg-theme-blue",
      icon: "🇵🇭",
    },
    {
      title: "Advocacy",
      desc: "Representing Filipino interests at local levels.",
      color: "bg-theme-red",
      icon: "🛡️",
    },
    {
      title: "Education",
      desc: "Language and history classes for kids.",
      color: "bg-theme-yellow",
      icon: "📚",
    },
  ];

  return (
    <section className="py-24 px-6 bg-theme-alice dark:bg-theme-dark">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <span className="text-theme-blue font-black uppercase text-sm">
            Step by Step
          </span>
          <h2 className="text-5xl font-bold text-theme-dark dark:text-theme-alice mt-2 mb-8 leading-tight">
            We build bridges <br />
            <span className="text-theme-red">between cultures.</span>
          </h2>
          <div className="space-y-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-theme-dark shadow-sm border border-theme-cream/30 hover:border-theme-blue transition-colors group"
              >
                <div
                  className={`shrink-0 w-14 h-14 rounded-xl ${item.color} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-theme-dark dark:text-theme-alice">
                    {item.title}
                  </h4>
                  <p className="text-theme-blue/70 dark:text-theme-cream/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 relative rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
          <div className="absolute inset-0 bg-theme-red/10 z-10" />
          <Image
            src="/images/community.jpg"
            width={600}
            height={800}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            alt="Teamwork"
          />
        </div>
      </div>
    </section>
  );
}

// --- VERSION 3: GLASS CARDS ---
function VersionGlassCards() {
  return (
    <section className="py-24 px-6 bg-theme-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-theme-blue rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-theme-red rounded-full blur-[150px] opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center">Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((x) => (
            <div
              key={x}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-all group"
            >
              <div className="w-12 h-12 bg-theme-yellow rounded-full mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-clarendon text-2xl font-bold mb-4">Strategic Outreach</h3>
              <p className="text-theme-cream/70 leading-relaxed">
                Collaborating with local Swedish municipalities to create
                integrated community programs.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- VERSION 4: MINIMALIST GRID ---
function VersionMinimalistGrid() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-theme-dark">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold text-theme-dark dark:text-theme-alice mb-4">
            Building a Legacy
          </h2>
          <p className="text-theme-blue/70 dark:text-theme-cream/70">
            We believe that cultural identity is the foundation of integration
            and personal growth.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <h4 className="text-theme-red font-bold text-lg mb-2">
                0{i}. Vision
              </h4>
              <p className="text-sm text-theme-dark dark:text-theme-alice/60">
                Focused on long-term sustainability for our members.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- VERSION 5: FEATURE STACK ---
function VersionFeatureStack() {
  return (
    <section className="py-24 px-6 bg-theme-alice dark:bg-theme-dark">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="bg-theme-blue rounded-[2.5rem] p-12 text-white flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Preserving Our Roots
            </h2>
            <button className="bg-theme-yellow text-theme-dark px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
              Get Involved
            </button>
          </div>
          <div className="md:w-1/2 h-64 bg-theme-dark/30 rounded-2xl w-full flex items-center justify-center text-4xl">
            🖼️
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-theme-red rounded-[2.5rem] p-10 text-white h-64 flex items-end">
            <h3 className="font-clarendon text-3xl font-bold">Swedish Integration</h3>
          </div>
          <div className="bg-theme-cream rounded-[2.5rem] p-10 text-theme-dark h-64 flex items-end">
            <h3 className="font-clarendon text-3xl font-bold">Global Networking</h3>
          </div>
        </div>
      </div>
    </section>
  );
}