
// export const dynamic = 'force-dynamic';

import { redis, getFAQs } from "@/app/lib/upstash";
import { getCachedBlogs } from "./lib/fn_server";

import Navbar from "@/app/components/Navbar";
import Banner from "@/app/components/Banner";
import WhatWeDo from "@/app/components/WhatWeDo";
import OurStory from "@/app/components/OurStory";
import SpotLight from "@/app/components/SpotLight";
import Events from "@/app/components/Events";
import News from "@/app/components/News";
import Faqs from "@/app/components/Faqs";
import Contact from "@/app/components/Contact";
import Donate from "@/app/components/Donate";
import Growth from "@/app/components/Growth";
import Leaders from "@/app/components/Leaders";
import Footer from "@/app/components/Footer";


// 1. Add the ISR revalidation period (in seconds)
// 3600 = 1 hour, 60 = 1 minute. Choose based on how often events/blogs update.
export const revalidate = 60; 

export default async function Home() {
  // 2. Wrap your fetches in a Promise.all for parallel performance
  // This is a "Senior Dev" pattern that loads all data simultaneously 
  // instead of one after the other (Waterfall).
  const [faqs, blogs, rawEvents] = await Promise.all([
    getFAQs(),
    getCachedBlogs(),
    redis.zrange(process.env.UPSTASH_KEY_EVENTS || "", 0, -1, { rev: true })
  ]);

  // 3. Process the events
  const events = (rawEvents || [])
    .map((item) => (typeof item === 'string' ? JSON.parse(item) : item))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative">
      <Navbar />
      <Banner />
      <WhatWeDo />
      <OurStory />
      <SpotLight />
      <Leaders />
      <Events eventsList={events}/>
      <News blogs={blogs}/>
      <Faqs faqsList={faqs}/>
      <Donate />
      <Contact />
      <Footer />
    </div>
  );
}