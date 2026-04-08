"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  HelpCircle,
  Mail,
  ArrowRight,
} from "lucide-react";
import SiteSectionHeader from "./SiteSectionHeader";

/**
 * GLOBAL DATA
 * Centralized to maintain consistency across all 5 versions.
 */
const FAQ_DATA = {
  header: {
    tagline: "Help Center",
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about our association and community efforts. Can't find what you're looking for?",
  },
  items: [
    {
      question: "How do I join the community association?",
      answer:
        "Joining is simple. You can register through our online portal or visit the community office. Membership provides access to exclusive events, voting rights in local decisions, and our monthly newsletter.",
    },
    {
      question: "What are the annual membership fees used for?",
      answer:
        "Fees directly fund local landscaping, security initiatives, community events like the Summer Gala, and the maintenance of our shared recreational facilities.",
    },
    {
      question: "How can I volunteer for upcoming events?",
      answer:
        "We love volunteers! Navigate to our 'Take Action' page to see a list of upcoming committees. You can sign up for specific shifts or lead a project team.",
    },
    {
      question: "Are there guidelines for home renovations?",
      answer:
        "Yes, to maintain our community aesthetic, certain external renovations require approval. You can download the 'Architecture & Design Guidelines' PDF from our resource library.",
    },
  ],
  cta: {
    title: "Still have questions?",
    description:
      "Our dedicated support team is ready to assist you with any specific inquiries.",
    buttonText: "Contact Support",
  },
};

/**
 * ANIMATION VARIANTS
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ----------------------------------------------------------------------
// VERSION 1: BRAND ENHANCED (Original Logic + Palette)
// ----------------------------------------------------------------------
const FaqsV1 = ({ faqsList }) => (
  <section className="py-20 bg-white dark:bg-theme-dark transition-colors">
    <div className="container mx-auto px-4 max-w-6xl">
      <SiteSectionHeader
        tagline={FAQ_DATA?.header?.tagline}
        title={FAQ_DATA?.header?.title}
        description={FAQ_DATA?.header?.description}
      />
      <div className="flex flex-col border-b border-theme-dark/10 dark:border-theme-alice/10">
        {faqsList.map((faq, i) => (
          <div
            key={i}
            className="group border-t border-theme-dark/10 dark:border-theme-alice/10 py-10 flex flex-col md:flex-row gap-8 hover:bg-theme-blue/5 transition-colors px-6 -mx-6 rounded-xl"
          >
            <h3 className="w-full md:w-1/3 shrink-0 font-bold text-xl text-theme-blue dark:text-theme-yellow">
              {faq.question}
            </h3>
            {/* Added flex-1 to let the answer fill the rest of the space */}
            <div 
              className="flex-1"
              dangerouslySetInnerHTML={{ __html: faq.answer }} 
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------
// VERSION 2: MODERN ACCORDION (Interactive & Space Saving)
// ----------------------------------------------------------------------
const FaqsV2 = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="py-24 bg-white dark:bg-theme-dark">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-theme-dark dark:text-theme-alice mb-4">
            {FAQ_DATA.header.title}
          </h2>
          <p className="text-theme-dark/60 dark:text-theme-alice/60">
            {FAQ_DATA.header.description}
          </p>
        </div>
        <div className="space-y-4">
          {FAQ_DATA.items.map((faq, i) => (
            <div
              key={i}
              className="border border-theme-dark/10 dark:border-theme-alice/10 rounded-2xl overflow-hidden bg-theme-alice/30 dark:bg-white/5"
            >
              <button
                onClick={() => setActive(active === i ? -1 : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span
                  className={`font-bold text-lg ${active === i ? "text-theme-red" : "text-theme-dark dark:text-theme-alice"}`}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transform transition-transform ${active === i ? "rotate-180 text-theme-red" : ""}`}
                />
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-6 pt-0 text-theme-dark/70 dark:text-theme-alice/70 border-t border-theme-dark/5 dark:border-white/5">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// VERSION 3: BENTO GRID STYLE (High Visual Impact)
// ----------------------------------------------------------------------
const FaqsV3 = () => (
  <section className="py-24 bg-theme-alice dark:bg-theme-dark">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-theme-blue p-10 rounded-[2rem] text-white flex flex-col justify-between">
          <div>
            <HelpCircle size={40} className="mb-6 text-theme-yellow" />
            <h2 className="text-4xl font-bold mb-4">{FAQ_DATA.header.title}</h2>
            <p className="text-theme-alice/80 text-lg">
              {FAQ_DATA.header.description}
            </p>
          </div>
          <button className="mt-8 flex items-center gap-2 font-bold text-theme-yellow group">
            Contact Support{" "}
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <div className="grid gap-6">
          {FAQ_DATA.items.slice(0, 3).map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-white/5 p-8 rounded-[2rem] border border-theme-dark/5 shadow-sm"
            >
              <h3 className="font-bold text-lg mb-2 text-theme-red">
                {faq.question}
              </h3>
              <p className="text-theme-dark/70 dark:text-theme-alice/70 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------
// VERSION 4: SPLIT LAYOUT (Editorial Style)
// ----------------------------------------------------------------------
const FaqsV4 = () => (
  <section className="py-24 bg-white dark:bg-theme-dark border-y border-theme-dark/5">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3 sticky top-24 h-fit">
          <div className="w-12 h-1 bg-theme-red mb-6" />
          <h2 className="text-4xl font-bold text-theme-dark dark:text-theme-alice mb-6">
            Common Inquiries
          </h2>
          <p className="text-theme-dark/60 dark:text-theme-alice/60 mb-8">
            {FAQ_DATA.header.description}
          </p>
          <div className="p-6 bg-theme-cream/20 rounded-2xl border border-theme-cream/50">
            <Mail className="text-theme-blue mb-3" />
            <p className="font-bold text-theme-dark dark:text-theme-alice">
              Need personal help?
            </p>
            <p className="text-sm text-theme-dark/60">
              Response time: &lt; 24h
            </p>
          </div>
        </div>
        <div className="lg:w-2/3 space-y-12">
          {FAQ_DATA.items.map((faq, i) => (
            <div
              key={i}
              className="relative pl-8 border-l-2 border-theme-blue/20 hover:border-theme-blue transition-colors"
            >
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-theme-blue" />
              <h3 className="text-xl font-bold text-theme-dark dark:text-theme-alice mb-3">
                {faq.question}
              </h3>
              <p className="text-theme-dark/70 dark:text-theme-alice/70 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------
// VERSION 5: MINIMALIST CARDS (The "Clean" Look)
// ----------------------------------------------------------------------
const FaqsV5 = () => (
  <section className="py-24 bg-theme-dark text-theme-alice">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h2 className="text-4xl font-bold mb-4">{FAQ_DATA.header.title}</h2>
        <div className="h-1 w-20 bg-theme-yellow mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FAQ_DATA.items.map((faq, i) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={i}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-theme-red/50 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-theme-red/20 flex items-center justify-center mb-6">
              <span className="text-theme-red font-bold">{i + 1}</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-theme-yellow">
              {faq.question}
            </h3>
            <p className="text-theme-alice/60 leading-relaxed">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-20 p-10 rounded-[3rem] bg-gradient-to-br from-theme-blue to-theme-dark border border-white/10 text-center">
        <h3 className="text-2xl font-bold mb-4">{FAQ_DATA.cta.title}</h3>
        <button className="px-8 py-3 bg-theme-yellow text-theme-dark font-bold rounded-full hover:bg-white transition-colors">
          {FAQ_DATA.cta.buttonText}
        </button>
      </div>
    </div>
  </section>
);

/**
 * MAIN COMPONENT
 * Toggle comments below to switch between versions
 */
export default function Faqs({ faqsList = [] }) {
  return (
    <div id="FAQS" className="">
      <FaqsV1 faqsList={faqsList} />
      {/* <FaqsV2 /> */}
      {/* <FaqsV3 /> */}
      {/* <FaqsV4 /> */}
      {/* <FaqsV5 /> */}
    </div>
  );
}
