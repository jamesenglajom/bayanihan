
export const dynamic = 'force-static';

import { getFAQs } from "@/app/lib/upstash";


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
import Footer from "@/app/components/Footer";


export default async function Home() {
  const faqs = await getFAQs();
  console.log(faqs)
  return (
    <div className="relative">
      <Navbar />
      <Banner />
      <WhatWeDo />
      <OurStory />
      <SpotLight />
      <Events />
      <News />
      <Faqs faqsList={faqs}/>
      <Growth />
      <Donate />
      <Contact />
      <Footer />
    </div>
  );
}
