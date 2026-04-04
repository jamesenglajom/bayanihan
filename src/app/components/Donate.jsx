"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// --- GLOBAL CONTENT ---
const CONTENT = {
  tagline: "Support BES",
  title: "Be part of something bigger",
  description: "Your support strengthens our community and keeps our traditions alive. Together, we can ensure the Filipino spirit thrives in Sweden.",
  donateLabel: "Donate Now",
  volunteerLabel: "Volunteer",
  image: "/banner/banner.png",
  links: {
    donate: "/donate",
    volunteer: "#",
  },
  benefits: ["Community Support", "Cultural Preservation", "Youth Programs"]
};

// --- UTILITY COMPONENTS ---
const Badge = ({ children }) => (
  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-theme-red/10 text-theme-red border border-theme-red/20 mb-4">
    {children}
  </span>
);

const PrimaryBtn = ({ label, href }) => (
  <Link href={href} className="inline-flex items-center gap-3 px-8 py-4 bg-theme-red text-white font-bold rounded-full hover:bg-theme-blue transition-colors">
    {label}
  </Link>
);

const SecondaryBtn = ({ label, href }) => (
  <Link href={href} className="px-8 py-4 border-2 border-theme-blue text-theme-blue dark:text-theme-alice hover:bg-theme-blue/5 font-bold rounded-full transition-all active:scale-95 text-center">
    {label}
  </Link>
);

// --- VERSION 1: THE CLASSIC (ENHANCED) ---
const Version1 = () => (
  <section className="w-full py-20 bg-theme-alice dark:bg-theme-dark transition-colors">
    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="w-full lg:w-1/2">
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl">
          <Image src={CONTENT.image} alt="Hero" fill className="object-cover" />
        </div>
      </motion.div>
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        {/* <Badge>{CONTENT.tagline}</Badge> */}
        <div className="inline-flex items-center gap-4 mb-8">
          <span className="text-theme-red font-black uppercase tracking-[0.3em] text-sm">
            {CONTENT.tagline}
          </span>
          <div className="h-[2px] w-8 md:w-16 bg-theme-red" />
        </div>
        <h2 className="font-clarendon text-4xl md:text-6xl font-bold text-theme-dark dark:text-theme-alice mb-6 leading-tight">{CONTENT.title}</h2>
        <p className="text-lg text-theme-dark/70 dark:text-theme-alice/70 mb-8 max-w-xl">{CONTENT.description}</p>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <PrimaryBtn label={CONTENT.donateLabel} href={CONTENT.links.donate} />
          <SecondaryBtn label={CONTENT.volunteerLabel} href={CONTENT.links.volunteer} />
        </div>
      </div>
    </div>
  </section>
);

// --- VERSION 2: THE "CREAM" FLOATING CARD ---
const Version2 = () => (
  <section className="w-full py-20 bg-white dark:bg-neutral-900">
    <div className="container mx-auto px-6">
      <div className="bg-theme-cream dark:bg-theme-dark rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row-reverse items-center gap-12 border border-theme-yellow/20">
        <div className="w-full lg:w-1/2 relative h-[350px] rounded-3xl overflow-hidden border-4 border-white dark:border-theme-blue/20">
          <Image src={CONTENT.image} alt="Hero" fill className="object-cover" />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-bold text-theme-blue mb-4">{CONTENT.title}</h2>
          <p className="text-theme-dark/80 dark:text-theme-alice/80 mb-8 text-lg leading-relaxed">{CONTENT.description}</p>
          <div className="flex gap-4">
            <Link href={CONTENT.links.donate} className="px-8 py-3 bg-theme-blue text-white rounded-full font-bold">Get Involved</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- VERSION 3: MODERN MINIMALIST (SPLIT) ---
const Version3 = () => (
  <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[600px] bg-theme-alice dark:bg-theme-dark">
    <div className="relative h-full min-h-[300px]">
      <Image src={CONTENT.image} alt="Hero" fill className="object-cover" />
    </div>
    <div className="flex items-center justify-center p-8 md:p-20">
      <div className="max-w-md">
        <div className="w-12 h-1.5 bg-theme-red mb-6" />
        <h2 className="text-5xl font-bold text-theme-dark dark:text-theme-alice mb-6">{CONTENT.title}</h2>
        <p className="text-theme-dark/60 dark:text-theme-alice/60 mb-10">{CONTENT.description}</p>
        <PrimaryBtn label={CONTENT.donateLabel} href={CONTENT.links.donate} />
      </div>
    </div>
  </section>
);

// --- VERSION 4: THE TRUST BUILDER (BLUE & YELLOW) ---
const Version4 = () => (
  <section className="w-full py-24 bg-theme-blue text-theme-alice">
    <div className="container mx-auto px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">{CONTENT.title}</h2>
        <div className="relative w-full h-[300px] mb-12 rounded-3xl overflow-hidden border-8 border-theme-yellow">
           <Image src={CONTENT.image} alt="Hero" fill className="object-cover" />
        </div>
        <p className="text-xl opacity-90 mb-10">{CONTENT.description}</p>
        <Link href={CONTENT.links.donate} className="px-12 py-5 bg-theme-yellow text-theme-dark font-black rounded-full text-xl hover:scale-105 transition-transform inline-block">
          {CONTENT.donateLabel}
        </Link>
      </div>
    </div>
  </section>
);

// --- VERSION 5: BENTO GRID STYLE ---
const Version5 = () => (
  <section className="w-full py-20 bg-theme-alice dark:bg-theme-dark">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8 bg-white dark:bg-neutral-800 p-10 rounded-3xl shadow-sm border border-theme-alice/50">
        <Badge>{CONTENT.tagline}</Badge>
        <h2 className="text-4xl font-bold text-theme-dark dark:text-theme-alice mb-4">{CONTENT.title}</h2>
        <p className="text-theme-dark/70 dark:text-theme-alice/70 text-lg mb-6">{CONTENT.description}</p>
        <div className="flex gap-4">
          <PrimaryBtn label={CONTENT.donateLabel} href={CONTENT.links.donate} />
        </div>
      </div>
      <div className="md:col-span-4 relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl">
        <Image src={CONTENT.image} alt="Hero" fill className="object-cover" />
      </div>
      {CONTENT.benefits.map((b, i) => (
        <div key={i} className="md:col-span-4 bg-theme-yellow/10 border border-theme-yellow/20 p-6 rounded-3xl text-center">
          <p className="font-bold text-theme-dark dark:text-theme-yellow">{b}</p>
        </div>
      ))}
    </div>
  </section>
);

// --- MAIN COMPONENT STACK ---
export default function DonateSections() {
  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      <Version1 />
      {/* <Version2 /> */}
      {/* <Version3 /> */}
      {/* <Version4 /> */}
      {/* <Version5 /> */}
      
    </div>
  );
}