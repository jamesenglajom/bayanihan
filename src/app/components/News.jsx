"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function News() {
  const newsList = [
    {
      badge: "Culture",
      read_duration: "3 min read",
      image: "/images/sample-image.jpg",
      title: "Heritage month brings community together",
      excerpt: "Celebrating our shared traditions and values through events and storytelling.",
    },
    {
      badge: "Outreach",
      read_duration: "4 min read",
      image: "/images/sample-image.jpg",
      title: "New Scholarship program launches",
      excerpt: "Supporting education for our young members to build a brighter future.",
    },
    {
      badge: "Youth",
      read_duration: "5 min read",
      image: "/images/sample-image.jpg",
      title: "Mentorship program expands statewide",
      excerpt: "Connecting experienced leaders with rising talents in the community.",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section 
      id="news" 
      className="w-full py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 text-center mb-12"
        >
          <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] text-xs">
            Latest Updates
          </span>
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl font-fraunces text-neutral-900 dark:text-neutral-100">
            News and announcements
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-lg">
            Stay informed about the stories and milestones that matter to our community.
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {newsList.map((news, index) => (
            <motion.div 
              key={`news-card-${index}`} 
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group flex flex-col bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] w-full relative overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow gap-4">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="py-1 px-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full uppercase">
                    {news.badge}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-500 uppercase tracking-tighter">
                    {news.read_duration}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold leading-tight font-fraunces text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
                  {news.excerpt}
                </p>

                <div className="mt-auto pt-4 flex items-center text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:gap-2 transition-all">
                  Read article <span className="ml-1 text-blue-600">&rsaquo;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <button className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-neutral-900 px-10 py-4 rounded-full font-bold shadow-lg transition-all active:scale-95">
            View All News
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default News;