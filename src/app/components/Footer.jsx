"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Globe, Mail, Heart, ArrowUpRight } from "lucide-react";

// --- GLOBAL CONSTANTS ---
const FOOTER_DATA = {
  brand: {
    name: "BES",
    fullName: "Bayanihan Exchange Sweden",
    logo: "/logo/KAY_bes_emblem_light01pngx4.png",
    description:
      "Celebrating Filipino heritage and fostering cultural pride across Sweden through community, cooperation, and connection.",
  },
  socials: [
    {
      name: "Facebook",
      url: "https://www.facebook.com/bayanihan.se",
      icon: <Facebook size={18} />,
      color: "hover:bg-theme-blue",
    },
    {
      name: "Website",
      url: "/",
      icon: <Globe size={18} />,
      color: "hover:bg-theme-red",
    },
  ],
  links: [
    {
      title: "Navigation",
      items: [
        { name: "About Us", href: "#about" },
        { name: "Events", href: "#events" },
        { name: "News", href: "#news" },
        { name: "FAQs", href: "#FAQS" },
        { name: "Donate", href: "/donate" },
      ],
    },
    {
      title: "Support",
      items: [
        { name: "Donate", href: "#" },
        { name: "Volunteer", href: "#" },
        { name: "Membership", href: "#" },
        { name: "FAQs", href: "#faqs" },
      ],
    },
    {
      title: "Legal",
      items: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Bylaws", href: "#" },
      ],
    },
  ],
  credits: {
    author: "jamesenglajom@gmail.com",
    year: new Date().getFullYear(),
  },
};

// --- VERSION 1: THE REFINED CLASSIC (CLEAN & PROFESSIONAL) ---
const Version1 = () => (
  <div className="bg-theme-alice dark:bg-theme-dark transition-colors duration-500 rounded-t-3xl pt-16 pb-8 border-t border-theme-blue/10">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-white dark:bg-theme-alice/10 rounded-xl p-2">
              <Image
                src="/images/logo/KAY_bes_word_light01pngx2.png"
                alt="Bayanihan Exchange Logo"
                fill
                className="object-contain p-1 dark:hidden"
              />

              {/* Dark Mode Logo */}
              <Image
                src="/images/logo/KAY_bes_word_dark01pngx2.png"
                alt="Bayanihan Exchange Logo"
                fill
                className="object-contain p-1 hidden dark:block"
              />
            </div>
            <span className="font-bold text-2xl text-theme-dark dark:text-white uppercase tracking-tighter">
              {FOOTER_DATA.brand.name}
            </span>
          </div>
          <p className="text-theme-dark/60 dark:text-theme-alice/60 max-w-sm leading-relaxed">
            {FOOTER_DATA.brand.description}
          </p>
          <div className="flex gap-3">
            {FOOTER_DATA.socials.map((s) => (
              <Link
                key={s.name}
                href={s.url}
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-theme-alice/5 text-theme-dark dark:text-theme-alice transition-all ${s.color} hover:text-white`}
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>
        {FOOTER_DATA.links.map((section) => (
          <div key={section.title} className="space-y-6">
            <h4 className="font-bold text-theme-red uppercase tracking-widest text-xs">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.items.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-theme-dark/70 dark:text-theme-alice/50 hover:text-theme-blue dark:hover:text-theme-yellow transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-8 border-t border-theme-dark/5 dark:border-theme-alice/5 flex flex-col md:flex-row justify-between items-center text-xs text-theme-dark/40 dark:text-theme-alice/40">
        <p>
          © {FOOTER_DATA.credits.year} {FOOTER_DATA.brand.fullName}
        </p>
        <p>
          Crafted by{" "}
          <span className="text-theme-blue font-bold">
            {FOOTER_DATA.credits.author}
          </span>
        </p>
      </div>
    </div>
  </div>
);

// --- VERSION 2: THE HIGH-CONTRAST BENTO (MODERN & BOLD) ---
const Version2 = () => (
  <div className="bg-white dark:bg-theme-dark p-4 md:p-8">
    <div className="bg-theme-dark dark:bg-theme-alice/5 rounded-3xl p-8 md:p-12 text-theme-alice">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-2 bg-theme-blue/20 rounded-3xl p-8 flex flex-col justify-between">
          <h3 className="text-4xl font-bold italic mb-8">
            Building a home away from home.
          </h3>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="bg-theme-yellow text-theme-dark px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Join Us <ArrowUpRight size={18} />
            </Link>
            <Link
              href="#"
              className="bg-theme-red text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform"
            >
              Donate
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:col-span-2">
          {FOOTER_DATA.links.slice(0, 2).map((section) => (
            <div key={section.title} className="space-y-4">
              <p className="text-theme-yellow font-bold uppercase text-[10px] tracking-widest">
                {section.title}
              </p>
              {section.items.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  className="block text-theme-alice/60 hover:text-white transition-colors"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
        <span className="text-2xl font-black italic text-theme-red">BES.</span>
        <div className="flex gap-4">
          {FOOTER_DATA.socials.map((s) => (
            <Link
              key={s.name}
              href={s.url}
              className="text-theme-alice/40 hover:text-white"
            >
              {s.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- VERSION 3: MODERN CENTERED (STYLISH & SYMMETRICAL) ---
const Version3 = () => {
  // If you have a specific wide or large version of the logo,
  // you can replace FOOTER_DATA.brand.logo with a new string path here.
  const largeLogo = "/logo/KAY_bes_emblem_light01pngx4.png";

  return (
    <div className="bg-theme-alice dark:bg-[#151d27] py-24 text-center transition-colors duration-500">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* LOGO AREA: Removed the rounded div, increased size, and added floating animation */}
        <motion.div className="relative w-48 h-24 mb-10 md:w-64 md:h-32 lg:w-72 lg:h-40">
          <Link href="/">
            <Image
              src="/logo/KAY_bes_word_light01pngx2.png"
              alt="Bayanihan Exchange Logo"
              fill
              priority
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
              className="object-contain p-1 dark:hidden"
            />

            <Image
              src="/logo/KAY_bes_word_dark01pngx2.png"
              alt="Bayanihan Exchange Logo"
              fill
              priority
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
              className="object-contain p-1 hidden dark:block"
            />
          </Link>
        </motion.div>

        {/* FULL NAME - Adjusted margin for better visual balance with the larger logo */}
        {/* <h2 className="text-2xl md:text-3xl font-bold text-theme-dark dark:text-theme-alice mb-8 tracking-[0.2em] uppercase">
          {FOOTER_DATA.brand.fullName}
        </h2> */}

        {/* NAVIGATION LINKS */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12 max-w-2xl">
          {FOOTER_DATA.links[0].items.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="text-theme-dark/60 dark:text-theme-alice/60 font-bold hover:text-theme-red dark:hover:text-theme-yellow uppercase text-[10px] tracking-widest transition-colors"
            >
              {l.name}
            </Link>
          ))}
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-6 mb-16">
          {FOOTER_DATA.socials.map((s) => (
            <Link
              key={s.name}
              href={s.url}
              className="w-10 h-10 rounded-full bg-theme-blue/5 dark:bg-theme-alice/5 flex items-center justify-center text-theme-blue dark:text-theme-alice hover:bg-theme-dark dark:hover:bg-theme-alice hover:text-white dark:hover:text-theme-dark transition-all duration-300"
            >
              {s.icon}
            </Link>
          ))}
        </div>

        {/* FINAL CREDITS */}
        <div className="space-y-2">
          <p className="text-[16px] uppercase tracking-[0.3em] text-theme-dark dark:text-theme-alice flex items-center justify-center gap-2">
            Made with{" "}
            <Heart
              size={10}
              className="text-theme-red fill-theme-red animate-pulse"
            />{" "}
            for the Community
          </p>
          {/* <p className="text-[12px] text-theme-dark/50 dark:text-theme-alice/50 font-mono">
            © {FOOTER_DATA.credits.year} {FOOTER_DATA.brand.name} • {FOOTER_DATA.credits.author}
          </p> */}
        </div>
      </div>
    </div>
  );
};

// --- VERSION 4: THE SPLIT-ACTION (UTILITY FOCUSED) ---
const Version4 = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-theme-dark/5">
    <div className="lg:col-span-1 bg-theme-red p-12 flex flex-col justify-between items-start text-white">
      <div>
        <h3 className="text-4xl font-black mb-4 uppercase">Let's Talk.</h3>
        <p className="opacity-80 mb-6">
          Get in touch with our team for collaborations or inquiries.
        </p>
        <Link
          href="mailto:hello@bes.se"
          className="inline-flex items-center gap-2 font-bold border-b-2 border-white pb-1"
        >
          <Mail size={18} /> {FOOTER_DATA.credits.author}
        </Link>
      </div>
      <div className="mt-8 text-xs font-mono opacity-50">STHLM / SE © 2026</div>
    </div>
    <div className="lg:col-span-2 bg-white dark:bg-theme-dark p-12 grid grid-cols-2 md:grid-cols-3 gap-8">
      {FOOTER_DATA.links.map((sec) => (
        <div key={sec.title}>
          <p className="font-bold text-theme-dark dark:text-theme-alice mb-6">
            {sec.title}
          </p>
          <div className="flex flex-col gap-3">
            {sec.items.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="text-sm text-theme-dark/50 dark:text-theme-alice/40 hover:translate-x-1 transition-transform"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- VERSION 5: THE MINIMALIST BAR (CLEAN & COMPACT) ---
const Version5 = () => (
  <div className="bg-theme-alice dark:bg-theme-dark border-t border-theme-dark/5 px-6 py-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-8">
        <span className="font-black text-xl text-theme-blue">BES.</span>
        <div className="hidden md:flex gap-6">
          {FOOTER_DATA.links[0].items.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="text-[10px] font-bold uppercase tracking-widest text-theme-dark/40 dark:text-theme-alice/40"
            >
              {l.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-4 border-r border-theme-dark/10 pr-6">
          {FOOTER_DATA.socials.map((s) => (
            <Link
              key={s.name}
              href={s.url}
              className="text-theme-dark/40 dark:text-theme-alice/40 hover:text-theme-red"
            >
              {s.icon}
            </Link>
          ))}
        </div>
        <p className="text-[10px] font-bold text-theme-dark/40 dark:text-theme-alice/40">
          © {FOOTER_DATA.credits.year}
        </p>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export default function UniversalFooter() {
  return (
    <footer className="flex flex-col">
      {/* UI/UX GUIDE:
          Uncomment the version you wish to see. 
          Each version is designed to be fully responsive.
      */}

      {/* <section id="footer-v1">
        <p className="p-4 text-[10px] font-mono text-theme-red bg-theme-cream/20">VERSION 1: REFINED CLASSIC</p>
        <Version1 />
      </section> */}

      {/* <section id="footer-v2">
        <p className="p-4 text-[10px] font-mono text-theme-red bg-theme-cream/20">VERSION 2: BENTO BOX</p>
        <Version2 />
      </section> */}

      {/* <section id="footer-v3"> */}
      <Version3 />
      {/* </section> */}

      {/* <section id="footer-v4">
        <p className="p-4 text-[10px] font-mono text-theme-red bg-theme-cream/20">VERSION 4: SPLIT ACTION</p>
        <Version4 />
      </section> */}

      {/* <section id="footer-v5">
        <p className="p-4 text-[10px] font-mono text-theme-red bg-theme-cream/20">VERSION 5: MINIMALIST BAR</p>
        <Version5 />
      </section> */}
    </footer>
  );
}
