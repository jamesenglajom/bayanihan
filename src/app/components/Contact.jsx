"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserPlus,
  ArrowRight,
  CheckCircle,
  QrCode,
  ShieldCheck,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  Sparkles
} from "lucide-react";

import SiteSectionHeader from "./SiteSectionHeader";

// --- GLOBAL CONSTANTS ---
const CONTENT = {
  tagline: "Connect",
  title: "Send us a message",
  description: "Tell us how we can help you or collaborate with our growing community.",
  ctaTitle: "Join the Community",
  ctaDescription: "Become a member of Bayanihan Exchange Sweden. Sign up to get early access to workshops, cultural events, and community support.",
  googleFormLink: "https://forms.gle/9U1PNqCBciuPN2iD7",
  benefits: ["Early Event Access", "Cultural Workshops", "Community Support"],
  contactItems: [
    {
      icon: <Mail className="w-6 h-6" />,
      name: "Email",
      message: "Send us a message",
      value: process.env.NEXT_PUBLIC_CONTACT_EMAIL, // Using placeholder for demo
      colorClass: "bg-theme-blue/10 text-theme-blue",
    },
    // {
    //   icon: <Phone className="w-6 h-6" />,
    //   name: "Phone",
    //   message: "Call us anytime",
    //   value: process.env.NEXT_PUBLIC_CONTACT_NUMBER,
    //   colorClass: "bg-theme-red/10 text-theme-red",
    // },
  ],
};

// --- VERSION 1: REFINED ORIGINAL (THE ENHANCED CLASSIC) ---
const Version1 = () => (
  <div
  id="contact"
  className="flex flex-col lg:flex-row gap-12 lg:items-center">
    <div
    className="w-full lg:w-1/2 space-y-12">
      {CONTENT.contactItems.map((item, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -20 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          className="group flex gap-6 items-start"
        >
          <div className={`p-4 rounded-3xl transition-transform group-hover:scale-110 ${item.colorClass}`}>
            {item.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-theme-dark dark:text-theme-alice">{item.name}</h3>
            <p className="text-theme-dark/60 dark:text-theme-alice/60 mb-1">{item.message}</p>
            <p className="text-lg font-semibold text-theme-blue">{item.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <motion.div
      className="w-full lg:w-1/2 p-10 bg-theme-alice dark:bg-theme-dark border border-theme-blue/10 rounded-3xl shadow-xl relative overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <QrCode size={120} className="text-theme-dark dark:text-theme-alice" />
      </div>
      <div className="relative z-10 text-center lg:text-left">
        <div className="w-16 h-16 bg-theme-yellow rounded-3xl flex items-center justify-center mb-6 shadow-lg rotate-3">
          <UserPlus className="text-theme-dark" />
        </div>
        <h4 className="text-3xl font-bold text-theme-dark dark:text-theme-alice mb-4">{CONTENT.ctaTitle}</h4>
        <p className="text-theme-dark/70 dark:text-theme-alice/70 mb-8">{CONTENT.ctaDescription}</p>
        <Link href={CONTENT.googleFormLink} className="inline-flex items-center gap-3 px-8 py-4 bg-theme-red text-white font-bold rounded-full hover:bg-theme-blue transition-colors">
          REGISTER NOW <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  </div>
);

// --- VERSION 2: BENTO GRID STYLE (MODERN & STRUCTURED) ---
const Version2 = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="md:col-span-2 p-8 bg-theme-blue text-white rounded-3xl flex flex-col justify-between min-h-[300px]">
      <div className="space-y-4">
        <h3 className="text-4xl font-bold italic">Start your journey.</h3>
        <p className="max-w-md opacity-90">{CONTENT.ctaDescription}</p>
      </div>
      <Link href={CONTENT.googleFormLink} className="bg-theme-yellow text-theme-dark w-fit px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
        Get Started
      </Link>
    </div>
    <div className="space-y-6">
      {CONTENT.contactItems.map((item, i) => (
        <div key={i} className="p-6 bg-theme-alice dark:bg-theme-dark border border-theme-dark/5 dark:border-theme-alice/5 rounded-3xl">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${item.colorClass}`}>
            {item.icon}
          </div>
          <p className="font-bold text-theme-dark dark:text-theme-alice">{item.value}</p>
        </div>
      ))}
    </div>
  </div>
);

// --- VERSION 3: NEUMORPHIC MINIMALISM (CLEAN & PREMIUM) ---
const Version3 = () => (
  <div className="max-w-4xl mx-auto text-center space-y-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div className="p-1 w-full bg-gradient-to-br from-theme-red to-theme-blue rounded-3xl">
        <div className="bg-white dark:bg-theme-dark rounded-[calc(1.5rem-1px)] p-8 h-full">
           <ShieldCheck className="mx-auto mb-4 text-theme-red" size={40} />
           <h4 className="text-xl font-bold dark:text-theme-alice mb-2">Secure Registration</h4>
           <p className="text-sm opacity-70 dark:text-theme-alice/60">Your data is protected and handled with care within our community.</p>
        </div>
      </div>
      <div className="p-1 w-full bg-gradient-to-br from-theme-yellow to-theme-cream rounded-3xl">
        <div className="bg-white dark:bg-theme-dark rounded-[calc(1.5rem-1px)] p-8 h-full">
           <Sparkles className="mx-auto mb-4 text-theme-yellow" size={40} />
           <h4 className="text-xl font-bold dark:text-theme-alice mb-2">Immediate Access</h4>
           <p className="text-sm opacity-70 dark:text-theme-alice/60">Get instant updates on the next "Bayanihan" meeting in Sweden.</p>
        </div>
      </div>
    </div>
    <Link href={CONTENT.googleFormLink} className="block p-10 border-2 border-dashed border-theme-blue/30 rounded-3xl hover:border-theme-blue transition-colors group">
      <p className="text-theme-blue font-bold tracking-widest uppercase mb-2">Click to Apply</p>
      <h3 className="text-3xl font-bold text-theme-dark dark:text-theme-alice group-hover:text-theme-red transition-colors">Open the official Google Form</h3>
    </Link>
  </div>
);

// --- VERSION 4: SPLIT-SCREEN IMMERSIVE (VISUAL HEAVY) ---
const Version4 = () => (
  <div className="flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-theme-alice dark:bg-theme-dark border border-theme-dark/10">
    <div className="lg:w-1/2 p-12 space-y-8">
      <h3 className="text-4xl font-bold text-theme-dark dark:text-theme-alice">Ready to make an impact?</h3>
      <ul className="space-y-4">
        {CONTENT.benefits.map((b, i) => (
          <li key={i} className="flex items-center gap-3 dark:text-theme-alice/80">
            <CheckCircle className="text-theme-red" size={20} /> {b}
          </li>
        ))}
      </ul>
      <div className="pt-6 border-t border-theme-dark/10">
        <p className="text-sm font-bold text-theme-blue mb-4">REACH OUT</p>
        <div className="flex gap-4">
          <div className="p-3 bg-white dark:bg-theme-dark/50 rounded-2xl shadow-sm"><Mail size={20} className="text-theme-blue"/></div>
          <div className="p-3 bg-white dark:bg-theme-dark/50 rounded-2xl shadow-sm"><Phone size={20} className="text-theme-red"/></div>
        </div>
      </div>
    </div>
    <div className="lg:w-1/2 bg-theme-blue p-12 flex flex-col justify-center items-center text-center text-white relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      <h4 className="text-2xl font-medium mb-6 italic">"Bayanihan: The spirit of civic unity and cooperation."</h4>
      <Link href={CONTENT.googleFormLink} className="relative z-10 px-10 py-5 bg-theme-yellow text-theme-dark rounded-full font-black shadow-2xl hover:scale-105 transition-transform">
        JOIN US TODAY
      </Link>
    </div>
  </div>
);

// --- VERSION 5: CONTACT-FIRST (TRUST & TRANSPARENCY) ---
const Version5 = () => (
  <div className="max-w-5xl mx-auto">
    <div className="bg-theme-dark text-theme-alice rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h3 className="text-5xl font-bold leading-tight">We are one <span className="text-theme-red text-shadow-glow">call</span> away.</h3>
        <p className="text-theme-alice/60">Prefer speaking to a human? Our coordinators are available for a chat about our mission and how you can fit in.</p>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <div className="px-6 py-3 bg-theme-blue/20 border border-theme-blue/30 rounded-2xl flex items-center gap-3">
             <MessageSquare size={18} className="text-theme-blue" />
             <span className="font-semibold">{CONTENT.contactItems[0].value}</span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto">
        <div className="bg-white dark:bg-theme-alice/10 p-2 rounded-[2rem]">
          <Link href={CONTENT.googleFormLink} className="block bg-theme-red text-white p-12 rounded-3xl text-center hover:bg-theme-yellow transition-colors group">
            <UserPlus size={48} className="mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold">Sign Up Form</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT WRAPPER ---
export default function ContactAndJoin() {
  return (
    <section className="w-full py-20 bg-white dark:bg-theme-dark transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* SECTION HEADER */}
        <SiteSectionHeader tagline={CONTENT.tagline} title={CONTENT.title} description={CONTENT.description} />

        {/* VERSIONS STACKED - Comment/Uncomment as needed */}
        <div className="space-y-40">
          
          <div id="v1">
            {/* <p className="text-[10px] font-mono text-theme-red mb-4">VERSION 1: ENHANCED CLASSIC</p> */}
            <Version1 />
          </div>

          {/* <div id="v2">
            <p className="text-[10px] font-mono text-theme-red mb-4">VERSION 2: MODERN BENTO</p>
            <Version2 />
          </div>

          <div id="v3">
             <p className="text-[10px] font-mono text-theme-red mb-4">VERSION 3: NEUMORPHIC MINIMAL</p>
             <Version3 />
          </div>

          <div id="v4">
             <p className="text-[10px] font-mono text-theme-red mb-4">VERSION 4: SPLIT IMMERSIVE</p>
             <Version4 />
          </div>

          <div id="v5">
             <p className="text-[10px] font-mono text-theme-red mb-4">VERSION 5: TRUST-CENTRIC</p>
             <Version5 />
          </div> */}

        </div>
      </div>
    </section>
  );
}