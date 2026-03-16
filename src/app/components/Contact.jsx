"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.28-2.28a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

function Contact() {
  const googleFormLink = "https://forms.gle/9U1PNqCBciuPN2iD7";
  const contactItems = [
    {
      icon: <EmailIcon />,
      name: "Email",
      message: "Send us a message",
      value: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      icon: <PhoneIcon />,
      name: "Phone",
      message: "Call us anytime",
      value: process.env.NEXT_PUBLIC_CONTACT_NUMBER,
      color:
        "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    },
  ];

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 bg-white dark:bg-neutral-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-12 md:mb-16"
        >
          <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest text-xs">
            Connect
          </span>
          <h2 className="font-bold text-4xl md:text-6xl font-fraunces text-neutral-900 dark:text-neutral-100">
            Send us a message
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Tell us how we can help you or collaborate.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Contact Details Side */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10 md:gap-16">
            {contactItems.map((item, index) => (
              <motion.div
                key={`contact-item-${index}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group flex flex-col gap-4"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110 ${item.color}`}
                >
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-fraunces text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {item.name}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-500 font-medium">
                    {item.message}
                  </p>
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 break-words">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form Area (Glassmorphism Look) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative min-h-[500px] flex items-center justify-center rounded-[2rem] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-8"
          >
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 blur-[100px] -z-10" />

            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto shadow-md">
                <EmailIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-fraunces">
                  Send us a Message
                </h4>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs mx-auto leading-relaxed">
                  Have questions or want to get involved? Click the button below
                  to fill out our contact form, and we'll get back to you
                  shortly.
                </p>
              </div>

              <Link
                href={googleFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-10 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Open Contact Form
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
