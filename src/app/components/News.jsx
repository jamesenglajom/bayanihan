"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SiteSectionHeader from "./SiteSectionHeader";
import Link from "next/link";

/**
 * GLOBAL CONFIGURATION & DATA
 * Use these constants to ensure data consistency across all 5 versions.
 */
const DATA = {
  header: {
    tagline: "Latest Updates",
    title: "News and announcements",
    description:
      "Stay informed about the stories and milestones that matter to our community.",
  },
  newsList: [
    {
      badge: "Culture",
      read_duration: "3 min read",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
      title: "Heritage month brings community together",
      excerpt:
        "Celebrating our shared traditions and values through events and storytelling.",
      date: "Oct 12, 2024",
    },
    {
      badge: "Outreach",
      read_duration: "4 min read",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
      title: "New Scholarship program launches",
      excerpt:
        "Supporting education for our young members to build a brighter future.",
      date: "Oct 10, 2024",
    },
    {
      badge: "Youth",
      read_duration: "5 min read",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      title: "Mentorship program expands statewide",
      excerpt:
        "Connecting experienced leaders with rising talents in the community.",
      date: "Oct 08, 2024",
    },
  ],
};

// Animation Presets
const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const STAGGER_CONTAINER = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/**
 * VERSION 1: REFINED GRID (The Evolution)
 * Traditional card layout optimized with the new palette.
 */
const Version1Grid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {DATA.newsList.map((news, i) => (
      <motion.div
        key={i}
        variants={FADE_UP}
        className="group bg-white dark:bg-theme-dark border border-theme-alice/20 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all"
      >
        <div className="relative h-56 overflow-hidden">
          <img
            src={news.image}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={news.title}
          />
          <div className="absolute top-4 left-4 bg-theme-blue text-white text-xs font-bold px-3 py-1 rounded-full">
            {news.badge}
          </div>
        </div>
        <div className="p-6">
          <p className="text-theme-red text-xs font-bold mb-2 tracking-widest uppercase">
            {news.read_duration}
          </p>
          <h3 className="text-2xl font-bold text-theme-dark dark:text-theme-alice mb-3 group-hover:text-theme-blue transition-colors leading-tight">
            {news.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {news.excerpt}
          </p>
          <button className="text-theme-blue dark:text-theme-yellow font-bold text-sm inline-flex items-center gap-1">
            Read More <span className="text-xl">→</span>
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

/**
 * VERSION 2: FEATURED SPOTLIGHT (UX focus on Primary News)
 * Highlights the first item as a main feature.
 */
const Version2Spotlight = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <motion.div
      variants={FADE_UP}
      className="lg:col-span-7 group relative rounded-3xl overflow-hidden h-[500px]"
    >
      <img
        src={DATA.newsList[0].image}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Featured"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-theme-dark via-theme-dark/40 to-transparent" />
      <div className="absolute bottom-0 p-8 lg:p-12">
        <span className="bg-theme-yellow text-theme-dark px-4 py-1 rounded-md font-bold text-xs mb-4 inline-block">
          {DATA.newsList[0].badge}
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {DATA.newsList[0].title}
        </h3>
        <p className="text-theme-alice/80 max-w-md mb-6">
          {DATA.newsList[0].excerpt}
        </p>
        <button className="bg-theme-blue text-white px-6 py-3 rounded-full font-bold hover:bg-theme-red transition-colors">
          Read Featured Story
        </button>
      </div>
    </motion.div>
    <div className="lg:col-span-5 flex flex-col gap-6">
      {DATA.newsList.slice(1).map((news, i) => (
        <motion.div
          key={i}
          variants={FADE_UP}
          className="flex gap-4 p-4 rounded-2xl bg-theme-alice/30 dark:bg-theme-dark border border-transparent hover:border-theme-blue/30 transition-all"
        >
          <img
            src={news.image}
            className="w-24 h-24 rounded-xl object-cover"
            alt=""
          />
          <div>
            <span className="text-theme-red font-bold text-[10px] uppercase">
              {news.badge}
            </span>
            <h4 className="font-bold text-theme-dark dark:text-theme-alice line-clamp-2 group-hover:text-theme-blue transition-colors">
              {news.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">{news.read_duration}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/**
 * VERSION 3: MINIMALIST LIST (Clean & Professional)
 * High contrast, focus on typography and whitespace.
 */
const Version3List = () => (
  <div className="max-w-4xl mx-auto divide-y divide-gray-200 dark:divide-theme-alice/10">
    {DATA.newsList.map((news, i) => (
      <motion.div
        key={i}
        variants={FADE_UP}
        className="py-8 group flex flex-col md:flex-row md:items-center gap-6 justify-between"
      >
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-theme-blue font-black text-xs tracking-tighter italic">
              0{i + 1}
            </span>
            <span className="text-gray-400 text-xs">{news.date}</span>
          </div>
          <h3 className="text-2xl font-bold text-theme-dark dark:text-theme-alice group-hover:text-theme-red transition-colors">
            {news.title}
          </h3>
          <p className="text-gray-500 text-sm mt-2 line-clamp-1">
            {news.excerpt}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-xs font-bold text-theme-dark dark:text-theme-alice">
            {news.read_duration}
          </span>
          <div className="w-12 h-12 rounded-full border border-theme-dark dark:border-theme-alice flex items-center justify-center group-hover:bg-theme-dark group-hover:text-white dark:group-hover:bg-theme-yellow dark:group-hover:text-theme-dark transition-all cursor-pointer">
            →
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

/**
 * VERSION 4: BENTO MASONRY (Modern SaaS style)
 * Non-uniform grid for a dynamic feel.
 */
const Version4Bento = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
    {/* Large Tile */}
    <motion.div
      variants={FADE_UP}
      className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden bg-theme-blue p-8 flex flex-col justify-end group"
    >
      <img
        src={DATA.newsList[1].image}
        className="absolute inset-0 opacity-40 object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
        alt=""
      />
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-white mb-2">
          {DATA.newsList[1].title}
        </h3>
        <p className="text-theme-cream text-sm">Latest Outreach Milestone</p>
      </div>
    </motion.div>
    {/* Side Tiles */}
    {DATA.newsList.map((news, i) => (
      <motion.div
        key={i}
        variants={FADE_UP}
        className={`md:col-span-2 rounded-3xl p-6 flex flex-col justify-center border-2 border-theme-alice dark:border-theme-dark/50 bg-white dark:bg-theme-dark/40`}
      >
        <div className="flex justify-between items-start">
          <span className="w-2 h-2 rounded-full bg-theme-red animate-pulse"></span>
          <span className="text-[10px] font-bold text-theme-blue uppercase tracking-widest">
            {news.badge}
          </span>
        </div>
        <h4 className="mt-4 font-bold text-theme-dark dark:text-theme-alice text-lg leading-tight">
          {news.title}
        </h4>
      </motion.div>
    ))}
  </div>
);

/**
 * VERSION 5: EDITORIAL STRIP (The High-End Magazine Look)
 * Uses the Cream and Red accents for a premium feel.
 */
const Version5Editorial = ({ blogs }) => (
  <div className="space-y-12">
    {blogs.map((blog_news, i) => (
      <motion.div
        key={i}
        variants={FADE_UP}
        className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
      >
        <div className="w-full md:w-1/2 overflow-hidden rounded-3xl">
          <img
            src={blog_news.main_image}
            className="w-full aspect-video object-cover hover:scale-110 transition-all duration-1000 rounded-3xl"
            alt=""
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-12 bg-theme-red"></div>
            <span className="text-theme-red font-bold text-xs uppercase tracking-widest">
              {blog_news.badge}
            </span>
          </div>
          <h3 className="text-4xl font-clarendon text-theme-dark dark:text-theme-alice">
            {blog_news.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {blog_news.excerpt}
          </p>
          <Link
            href={blog_news?.handle ? `/blogs/${blog_news.handle}` : "#"}
            className="border-b-2 border-theme-dark dark:border-theme-yellow pb-1 font-bold text-theme-dark dark:text-theme-yellow hover:text-theme-red transition-colors"
          >
            Discover Story
          </Link>
        </div>
      </motion.div>
    ))}
  </div>
);

/**
 * MAIN COMPONENT WRAPPER
 * Comment/Uncomment the Versions inside the render to toggle.
 */
function News({ blogs }) {
  const newsBlogs = useMemo(() => {
    if (!blogs) return [];

    return blogs
      .filter(({ categories }) =>
        categories.map((i) => i.toLowerCase()).includes("news"),
      )
      .sort((a, b) => {// Convert ISO strings to timestamps
        const dateA = new Date(a.published_at).getTime();
        const dateB = new Date(b.published_at).getTime();

        // Newest first (Descending)
        return dateB - dateA;
      });
  }, [blogs]);

  return (
    <section
      id="news"
      className="w-full py-20 bg-theme-alice dark:bg-theme-dark transition-colors duration-500 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* REUSABLE HEADER */}
        <SiteSectionHeader
          tagline={DATA.header.tagline}
          title={DATA.header.title}
          description={DATA.header.description}
        />

        {/* VERSIONS TOGGLE: Simply comment/uncomment the one you want to preview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={STAGGER_CONTAINER}
          viewport={{ once: true }}
        >
          {/* <Version1Grid />  */}
          {/* <Version2Spotlight /> */}
          {/* <Version3List /> */}
          {/* <Version4Bento /> */}
          <Version5Editorial blogs={newsBlogs} />
        </motion.div>

        {/* FOOTER CTA */}
        <div className="flex justify-center mt-20">
          <Link
            href="/blogs"
            className="bg-theme-yellow hover:bg-theme-red text-theme-dark hover:text-white px-12 py-5 rounded-xl font-black shadow-xl hover:shadow-theme-red/20 transition-all active:scale-95 uppercase text-sm tracking-widest"
          >
            Explore
          </Link>
        </div>
      </div>
    </section>
  );
}

export default News;
