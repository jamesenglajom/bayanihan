
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


export default async function Home() {
  const faqs = await getFAQs();
  const rawEvents = await redis.zrange(process.env.UPSTASH_KEY_EVENTS, 0, -1, { rev: true });
  const events = rawEvents
  .map((item) => (typeof item === 'string' ? JSON.parse(item) : item))
  // Sort descending: Newest Date first
  .sort((a, b) => new Date(b.date) - new Date(a.date));
  const blogs = await getCachedBlogs();


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
      {/* <Growth /> */}
      <Donate />
      <Contact />
      <Footer />
    </div>
  );
}
