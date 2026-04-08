"use client";
import React, {useState} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SiteSectionHeader from "./SiteSectionHeader";
import { ChevronDown } from 'lucide-react'; // Elegant icon choice

// --- GLOBAL CONTENT DATA ---
const STORY_CONTENT = {
  tagline: "Heritage",
  title: "Our story and commitment to community",
  description: [
    {
      text: "Bayanihan Exchange in Sweden (BES) is a community‑driven, non‑profit cultural organisation dedicated to celebrating the richness of Filipino heritage, showcasing Filipino talents, and fostering meaningful cultural exchange across Sweden.",
      highlight: "bayanihan",
    },
    {
      text: "BES serves as a vibrant platform for sharing Filipino culture with the world. It ensures that traditions, stories, and creative expressions are not only preserved but passed on to the next generations growing up in Sweden.",
    },
    {
      text: "At its heart, BES believes that culture grows stronger when it is shared. The organisation nurtures an environment where ideas flow freely, where perspectives meet, and where a deep sense of community and belonging naturally takes root.",
    },
  ],
  benefits: [
    { label: "Celebrate Filipino traditions and cultural pride", icon: "heritage", color: "text-theme-blue" },
    { label: "Dedication to empower", icon: "help", color: "text-theme-yellow" },
    { label: "Commitment to a stronger and connected community", icon: "future", color: "text-theme-red" },
  ],
  image: "/images/our-story/our-story.webp",
};

// --- ANIMATION VARIANTS ---
const faders = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
};

// --- HELPER COMPONENTS ---
const Icon = ({ type }) => {
  if (type === "heritage") return <path d="M4 20h16M12 14-3-3m3 3 3-3M12 20V14" />;
  if (type === "help") return <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />;
  return <path d="M18 20V10M12 20V4M6 20v-6" />;
};

const BenefitList = ({ className = "" }) => (
  <ul className={`space-y-4 ${className}`}>
    {STORY_CONTENT.benefits.map((item, i) => (
      <li key={i} className="flex items-center gap-4 group">
        <div className={`p-2 rounded-lg bg-theme-alice dark:bg-theme-dark/50 ${item.color} group-hover:scale-110 transition-transform shadow-sm`}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Icon type={item.icon} />
          </svg>
        </div>
        <span className="font-medium text-theme-dark dark:text-theme-alice">{item.label}</span>
      </li>
    ))}
  </ul>
);

// --- VERSIONS ---

/** * VERSION 1: ENHANCED CLASSICAL 
 * Sophisticated split-screen with large rounded corners and semantic brand colors.
 */
const Version1 = () => (
  <section className="py-20 bg-theme-alice dark:bg-theme-dark transition-colors duration-500">
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <motion.div variants={faders.container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.span variants={faders.item} className="text-theme-red font-bold uppercase tracking-widest text-sm mb-4 block">
          {STORY_CONTENT.tagline}
        </motion.span>
        <motion.h2 variants={faders.item} className="text-4xl md:text-6xl font-bold text-theme-dark dark:text-white mb-8 leading-tight">
          {STORY_CONTENT.title}
        </motion.h2>
        <motion.div variants={faders.item} className="text-theme-dark/80 dark:text-theme-alice/80 space-y-6 text-lg">
          {STORY_CONTENT.description.map((p, i) => (
            <p key={i}>{p.text}</p>
          ))}
        </motion.div>
        <BenefitList className="mt-10" />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="relative h-[400px] md:h-[600px] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white dark:border-theme-dark/50">
        <Image src={STORY_CONTENT.image} alt="Story" fill className="object-cover" />
      </motion.div>
    </div>
  </section>
);

/** * VERSION 2: THE BENTO GRID 
 * A modern, modular layout that separates the story into distinct visual cards.
 */
const Version2 = () => (
  <section className="py-20 bg-white dark:bg-[#0f1721]">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-7 bg-theme-blue p-8 md:p-16 rounded-[3rem] text-white">
          <span className="bg-theme-yellow text-theme-dark px-4 py-1 rounded-full text-xs font-bold mb-6 inline-block uppercase">Our Heritage</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{STORY_CONTENT.title}</h2>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">{STORY_CONTENT.description[0].text}</p>
        </div>
        <div className="lg:col-span-5 relative min-h-[350px] rounded-[3rem] overflow-hidden group">
          <Image src={STORY_CONTENT.image} alt="Story" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-dark/80 to-transparent" />
        </div>
        <div className="lg:col-span-4 bg-theme-cream p-8 rounded-[3rem] flex items-center">
           <BenefitList />
        </div>
        <div className="lg:col-span-8 bg-theme-alice dark:bg-theme-dark p-8 md:p-12 rounded-[3rem] border border-theme-blue/10 flex items-center">
          <p className="text-theme-dark dark:text-theme-alice leading-relaxed italic text-xl md:text-2xl font-serif">
            "{STORY_CONTENT.description[2].text}"
          </p>
        </div>
      </div>
    </div>
  </section>
);

/** * VERSION 3: MINIMALIST INSET 
 * Clean, corporate look with a bold brand accent and deep shadows.
 */
const Version3 = () => (
  <section className="py-24 bg-theme-dark relative overflow-hidden">
    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-20 grayscale">
      <Image src={STORY_CONTENT.image} alt="bg" fill className="object-cover" />
    </div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-3xl bg-white dark:bg-theme-dark p-10 md:p-20 rounded-2xl md:rounded-r-[4rem] md:rounded-l-none shadow-2xl border-l-[12px] border-theme-red">
        <h2 className="text-4xl md:text-5xl font-bold text-theme-dark dark:text-theme-alice mb-6">{STORY_CONTENT.title}</h2>
        <div className="space-y-4 mb-8 text-theme-dark/70 dark:text-theme-alice/70 text-lg">
          <p>{STORY_CONTENT.description[0].text}</p>
          <p className="hidden md:block">{STORY_CONTENT.description[1].text}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="bg-theme-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-theme-red transition-all transform hover:-translate-y-1">Join Our Community</button>
          <button className="border-2 border-theme-blue text-theme-blue dark:text-theme-alice px-8 py-4 rounded-xl font-bold hover:bg-theme-alice/10 transition-colors">Learn More</button>
        </div>
      </div>
    </div>
  </section>
);

/** * VERSION 4: CENTERED TYPOGRAPHIC 
 * Focuses on high-impact headlines and a unique circular visual.
 */
// const Version4 = () => (
//   <section className="py-24 bg-theme-alice dark:bg-[#151d27] text-center">
//     <div className="container mx-auto px-6 max-w-5xl">
//       <SiteSectionHeader tagline={STORY_CONTENT?.tagline} title={STORY_CONTENT?.title} description=""/>
//       <div className="grid md:grid-cols-2 gap-12 text-left items-center">
//         <div className="relative aspect-square rounded-full overflow-hidden border-[12px] md:border-[20px] border-theme-cream shadow-2xl">
//            <Image src={STORY_CONTENT.image} alt="Story" fill className="object-cover" />
//         </div>
//         <div className="space-y-8">
//           <p className="text-xl md:text-2xl text-theme-blue dark:text-theme-yellow font-medium leading-relaxed italic">
//             {STORY_CONTENT.description[0].text}
//           </p>
//           <div className="h-px bg-theme-dark/10 dark:bg-theme-alice/10 w-full" />
//           <BenefitList />
//         </div>
//       </div>
//     </div>
//   </section>
// );

const Version4 = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // We show the first paragraph immediately, then hide the rest
  const initialText = STORY_CONTENT.description[0].text;
  const remainingText = STORY_CONTENT.description.slice(1);

  return (
    <section className="py-24 bg-theme-alice dark:bg-[#151d27] text-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <SiteSectionHeader 
          tagline={STORY_CONTENT?.tagline} 
          title={STORY_CONTENT?.title} 
          description=""
        />
        
        <div className="grid md:grid-cols-2 gap-12 text-left items-center">
          {/* Image Container */}
          <div className="relative aspect-square rounded-full overflow-hidden border-[12px] md:border-[20px] border-theme-cream shadow-2xl">
            <Image 
              src={STORY_CONTENT.image} 
              alt="Story" 
              fill 
              className="object-cover" 
            />
          </div>

          {/* Content Container */}
          <div className="space-y-6">
            <div className="relative">
              <p className="text-xl md:text-2xl text-theme-blue dark:text-theme-yellow font-medium leading-relaxed italic">
                {initialText}
              </p>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="overflow-hidden"
                  >
                    {remainingText.map((item, index) => (
                      <p key={index} className="mt-4 text-base md:text-lg text-theme-dark/80 dark:text-theme-alice/80 leading-relaxed">
                        {item.text}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Gradient overlay for "Read More" hint when collapsed */}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-theme-alice dark:from-[#151d27] to-transparent pointer-events-none" />
              )}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-theme-blue dark:text-theme-yellow hover:opacity-70 transition-all"
            >
              <span>{isExpanded ? "Show Less" : "Read Full Story"}</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
              />
            </button>

            <div className="h-px bg-theme-dark/10 dark:bg-theme-alice/10 w-full" />
            <BenefitList />
          </div>
        </div>
      </div>
    </section>
  );
};

/** * VERSION 5: THE OFFSET OVERLAP 
 * A designer-centric layout using overlapping elements for visual depth.
 */
const Version5 = () => (
  <section className="py-28 bg-white dark:bg-theme-dark overflow-hidden">
    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-3/5 z-20">
        <div className="bg-theme-alice dark:bg-[#202b3a] p-8 md:p-20 rounded-[2.5rem] shadow-2xl lg:-mr-32 border border-theme-blue/5">
          <h2 className="text-4xl md:text-6xl font-extrabold text-theme-dark dark:text-white mb-8 leading-none">
            Celebrating <span className="text-theme-red underline decoration-theme-yellow underline-offset-8">Heritage</span> In Sweden
          </h2>
          <p className="text-lg md:text-xl text-theme-dark/80 dark:text-theme-alice/80 mb-10 max-w-xl leading-relaxed">
            {STORY_CONTENT.description[1].text}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STORY_CONTENT.benefits.map((b, i) => (
              <div key={i} className="text-center p-6 bg-white dark:bg-theme-dark rounded-2xl shadow-sm border-b-4 border-theme-yellow">
                <div className={`mx-auto mb-3 ${b.color}`}>
                   <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="2"><Icon type={b.icon}/></svg>
                </div>
                <p className="text-[10px] font-black uppercase text-theme-dark dark:text-theme-alice tracking-tighter leading-tight">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/5 mt-12 lg:mt-0 relative group perspective-1000">
        <div className="absolute -inset-6 bg-theme-yellow/20 rounded-[3rem] -rotate-3 transition-transform duration-500 group-hover:rotate-0" />
        <div className="relative h-[450px] md:h-[550px] rounded-[3rem] overflow-hidden shadow-2xl">
          <Image src={STORY_CONTENT.image} alt="Story" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
        </div>
      </div>
    </div>
  </section>
);

// --- MAIN COMPONENT ---
export default function OurStoryShowcase() {
  return (
    <div className="flex flex-col w-full">
      {/* UIUX Designer Note: 
          Comment/Uncomment sections below to preview different Hero/Story styles.
      */}

      {/* <Version1 />
      <Version2 />
      <Version3 /> */}
      <Version4 />
      {/* <Version5 /> */}
      
    </div>
  );
}