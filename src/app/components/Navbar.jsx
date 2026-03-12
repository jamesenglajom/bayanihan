"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // npm install lucide-react
import { useActiveSection } from "../hooks/useActiveSection";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { url: "home", name: "Home" },
    { url: "about", name: "About" },
    { url: "events", name: "Events" },
    { url: "news", name: "News" },
    { url: "faqs", name: "FAQs" },
  ];

  const activeSection = useActiveSection(navItems.map(link => link.url));

  return (
    <nav className="w-full sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section - flex-shrink-0 prevents shrinking */}
          <Link href="#home" className="relative h-12 w-40 flex-shrink-0">
            <Image
              src="/logo/KAY_bes_word_light01pngx4.png"
              alt="BES Logo"
              fill
              className="object-contain dark:hidden"
              priority
            />
            <Image
              src="/logo/KAY_bes_word_dark02pngx2.png"
              alt="BES Logo Dark"
              fill
              className="object-contain hidden dark:block"
              priority
            />
          </Link>

          {/* Desktop Navigation - Hidden on tablet/mobile (lg:flex) */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map(item => (
              <Link 
                key={`nav-item-${item.url}`} 
                href={`#${item.url}`} 
                className={`relative py-2 font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400
                  ${activeSection === item.url 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-neutral-600 dark:text-neutral-400"}
                `}
              >
                {item.name}
                {activeSection === item.url && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section - CTA Button */}
          <div className="hidden lg:block">
            <Link 
              href="#contact" 
              className="px-6 py-2.5 bg-yellow-400 dark:bg-yellow-500 text-neutral-900 font-bold rounded-full hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-all whitespace-nowrap flex-shrink-0"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button 
            className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Overlay Menu */}
      <div className={`
        lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
      `}>
        <div className="flex flex-col p-6 gap-4">
          {navItems.map(item => (
            <Link 
              key={`mob-item-${item.url}`} 
              href={`#${item.url}`}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-semibold ${activeSection === item.url ? "text-blue-600" : "text-neutral-600 dark:text-neutral-400"}`}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full py-4 text-center bg-yellow-400 text-neutral-900 font-bold rounded-xl"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;