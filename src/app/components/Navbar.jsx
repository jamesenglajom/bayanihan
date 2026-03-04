"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useActiveSection } from "../hooks/useActiveSection";

function Navbar() {
  const navItems = [
    {url: "home", name: "Home" },
    {url: "about", name: "About" },
    {url: "events", name: "Events" },
    {url: "news", name: "News" },
    {url: "faqs", name: "FAQs" },
  ];

  const activeSection = useActiveSection(navItems.map(link => link.url));
  return (
    <div className="w-full dark:bg-theme-dark py-2 border-b border-neutral-300 sticky top-0 z-50 bg-white">
      <div className="container mx-auto flex items-center justify-between gap-10">
        <div className="flex items-center justify-center h-20 w-35 font-bold relative ">
          <Image
            src="/logo/KAY_bes_word_light01pngx4.png"
            alt="Description of image"
            fill
            className="object-contain block dark:hidden"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <Image
            src="/logo/KAY_bes_word_dark02pngx2.png"
            alt="App Screenshot Dark"
            fill
            className="object-contain hidden dark:block"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="flex gap-15">
          {
            navItems.map(item => (
          <Link key={`nav-item-${item?.url}`} href={`#${item?.url}`} className={`p-3 font-semibold ${activeSection === item?.url ? "border-b-4 border-theme-blue text-theme-dark" :"text-stone-700"}`}>
            {item?.name}
          </Link>))
          }
        </div>
        <Link href="#contact" className="h-12 px-5 flex items-center justify-center font-medium bg-theme-yellow rounded-full">
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
