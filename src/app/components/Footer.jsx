"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Globe } from "lucide-react";
function Footer() {
  const currentYear = new Date().getFullYear();

  const socialMedia = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/bayanihan.se",
      icon: <Facebook size={20} />,
      color: "hover:bg-[#1877F2] hover:text-white",
    },
    // {
    //   name: "Instagram",
    //   url: "https://instagram.com/your-profile",
    //   icon: <Instagram size={20} />,
    //   color: "hover:bg-[#E4405F] hover:text-white",
    // },
    // {
    //   name: "LinkedIn",
    //   url: "https://linkedin.com/in/your-profile",
    //   icon: <Linkedin size={20} />,
    //   color: "hover:bg-[#0A66C2] hover:text-white",
    // },
    {
      name: "Website",
      url: "/",
      icon: <Globe size={20} />,
      color: "hover:bg-[#003566] hover:text-white",
    },
  ];

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "About Us", href: "#about" },
        { name: "News", href: "#news" },
        { name: "Community", href: "#community" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Donate", href: "#" },
        { name: "Volunteer", href: "#" },
        { name: "Membership", href: "#" },
        { name: "FAQs", href: "#faqs" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Organization Bylaws", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-neutral-50 dark:bg-neutral-950 pt-16 pb-8 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo/KAY_bes_emblem_light01pngx4.png"
                  alt="BES Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-fraunces font-bold text-2xl tracking-tight text-neutral-900 dark:text-white">
                BES
              </span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
              Bayanihan Exchange in Sweden is dedicated to celebrating Filipino
              heritage and fostering cultural pride across Sweden.
            </p>
            {/* Social Icons Placeholder */}
            <div className="flex gap-4">
              {socialMedia.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`
            w-10 h-10 rounded-full flex items-center justify-center
            bg-neutral-100 dark:bg-neutral-800 
            text-neutral-500 dark:text-neutral-400
            transition-all duration-300 transform hover:-translate-y-1
            ${social.color}
          `}
                >
                  {social.icon}
                </Link>
                // <div key={i} className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors cursor-pointer" />
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="space-y-6"
            >
              <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-widest text-sm">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Credits Area */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {currentYear} Bayanihan Exchange in Sweden. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1"
          >
            <span>Crafted with heart by</span>
            <a
              href="#"
              className="font-bold text-neutral-900 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              jamesenglajom@gmail.com
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
