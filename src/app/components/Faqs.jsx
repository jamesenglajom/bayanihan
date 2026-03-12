"use client";

import React from "react";
import { motion } from "framer-motion";

function Faqs({ faqsList = [] }) {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  // Animation variants for each FAQ row
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section 
      id="faqs" 
      className="w-full py-16 md:py-24 bg-white dark:bg-neutral-950 transition-colors duration-500 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 mb-12 md:mb-20 text-center md:text-left"
        >
          <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest text-xs">Help Center</span>
          <h2 className="font-bold text-4xl md:text-6xl font-fraunces text-neutral-900 dark:text-neutral-100">
            Frequently Asked <br className="hidden md:block" /> Questions
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-md">
            Find answers to common questions about our association and community efforts.
          </p>
        </motion.div>

        {/* FAQ List with Staggered Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col border-b border-neutral-200 dark:border-neutral-800"
        >
          {faqsList.map((faq, index) => (
            <motion.div
              key={`faq-item-${index}`}
              variants={rowVariants}
              className="group w-full border-t border-neutral-200 dark:border-neutral-800 py-8 md:py-12 flex flex-col md:flex-row gap-6 md:gap-16 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors px-4 -mx-4 rounded-xl"
            >
              {/* Question */}
              <div className="w-full md:w-[35%]">
                <h3 className="font-bold text-xl md:text-lg leading-tight text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {faq?.question}
                </h3>
              </div>

              {/* Answer */}
              <div
                className="w-full md:w-[65%] prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: faq?.answer || "" }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer / CTA Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 flex flex-col md:flex-row gap-8 bg-neutral-100 dark:bg-neutral-900 p-8 md:p-14 rounded-[2.5rem] items-center justify-between border border-neutral-200 dark:border-neutral-800"
        >
          <div className="space-y-3 text-center md:text-left">
            <h3 className="font-bold text-3xl md:text-4xl font-fraunces text-neutral-900 dark:text-neutral-100">
              Still have questions?
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">
              We&apos;re here to help. Reach out to our support team anytime.
            </p>
          </div>
          
          <button className="whitespace-nowrap py-4 px-10 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl dark:shadow-none">
            Contact Support
          </button>
        </motion.div>

      </div>
    </section>
  );
}

export default Faqs;