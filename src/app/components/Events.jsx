"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteSectionHeader from "./SiteSectionHeader";

// --- Global Constants for Reusability ---
const SECTION_CONTENT = {
  tagline: "Upcoming",
  title: "Events",
  description: "Join us for gatherings that matter and impact our community.",
};

const EventsSection = ({ eventsList }) => {
  // Logic shared across all versions
  const processedEvents = useMemo(() => {
    if (!eventsList) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventsList
      .map((event) => {
        const dateObj = new Date(event.date);
        return {
          ...event,
          year: dateObj.getFullYear(),
          month: dateObj.toLocaleString("en-US", { month: "short" }),
          day: dateObj.toLocaleString("en-US", { weekday: "short" }),
          dateNumber: dateObj.getDate().toString().padStart(2, "0"),
          timestamp: dateObj.getTime(),
        };
      })
      .filter((event) => event.timestamp >= today.getTime())
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [eventsList]);

  if (!processedEvents.length) return null;

  return (
    <div className="flex flex-col gap-20 bg-theme-alice dark:bg-theme-dark py-20">
      {/* UNCOMMENT THE VERSION YOU WANT TO USE 
          OR SCROLL TO SEE ALL STACKED 
      */}

      {/* <Version1 events={processedEvents} /> */}
      {/* <Version2 events={processedEvents} /> */}
      {/* <Version3 events={processedEvents} /> */}
      <Version4 events={processedEvents} />
      {/* <Version5 events={processedEvents} /> */}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* VERSION 1: ENHANCED CLASSIC (The Original logic, Clean & Professional)     */
/* -------------------------------------------------------------------------- */
const Version1 = ({ events }) => (
  <section className="container mx-auto px-4">
    <Header align="center" />
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Featured Card */}
      <div className="group overflow-hidden rounded-2xl bg-white dark:bg-slate-800/50 border border-theme-blue/10 shadow-xl transition-all hover:shadow-2xl">
        <div className="relative aspect-video">
          <Image
            src={events[0].image || "/banner/banner.png"}
            alt="Event"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-theme-red text-theme-cream p-3 rounded-xl text-center shadow-lg">
            <span className="block text-xs uppercase font-bold tracking-widest">
              {events[0].month}
            </span>
            <span className="block text-3xl font-bold font-fraunces">
              {events[0].dateNumber}
            </span>
          </div>
        </div>
        <div className="p-8">
          <span className="inline-block px-3 py-1 rounded-full bg-theme-blue/10 text-theme-blue text-xs font-bold mb-4 uppercase tracking-tighter">
            {events[0].badge}
          </span>
          <h3 className="text-3xl font-bold text-theme-dark dark:text-theme-alice mb-2">
            {events[0].name}
          </h3>
          <p className="text-theme-dark/60 dark:text-theme-alice/60 mb-4">
            {events[0].location}
          </p>
          <p className="text-theme-dark/80 dark:text-theme-alice/80 line-clamp-3">
            {events[0].description}
          </p>
        </div>
      </div>

      {/* Side List */}
      <div className="flex flex-col gap-4">
        {events.slice(1, 4).map((event, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-800/30 border border-transparent hover:border-theme-yellow transition-all"
          >
            <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-theme-dark text-theme-yellow rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm font-bold">{event.month}</span>
              <span className="text-2xl font-bold">{event.dateNumber}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-theme-dark dark:text-theme-alice line-clamp-1">
                {event.name}
              </h4>
              <p className="text-sm text-theme-red font-medium">
                {event.location}
              </p>
              <p className="text-sm text-theme-dark/60 dark:text-theme-alice/50 line-clamp-2 mt-1">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* VERSION 2: MASONRY STYLE (Modern, Asymmetric)                              */
/* -------------------------------------------------------------------------- */
const Version2 = ({ events }) => (
  <section className="container mx-auto px-4">
    <Header align="left" />
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.slice(0, 3).map((event, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-3xl ${i === 0 ? "md:col-span-2" : ""} h-[400px] group`}
        >
          <Image
            src={event.image || "/banner/banner.png"}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-dark via-theme-dark/20 to-transparent" />
          <div className="absolute bottom-0 p-8 w-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-theme-yellow text-theme-dark px-3 py-1 rounded text-xs font-black">
                {event.dateNumber} {event.month}
              </span>
              <span className="text-theme-cream text-sm font-medium">
                {event.badge}
              </span>
            </div>
            <h3
              className={`font-bold text-white ${i === 0 ? "text-4xl" : "text-xl"}`}
            >
              {event.name}
            </h3>
            <p className="text-theme-alice/70 mt-2 line-clamp-2">
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* VERSION 3: BENTO GRID (Clean, UI-First, High Information Density)          */
/* -------------------------------------------------------------------------- */
const Version3 = ({ events }) => (
  <section className="container mx-auto px-4">
    <div className="bg-theme-dark p-8 md:p-12 rounded-[2rem] text-theme-alice shadow-2xl">
      <Header align="left" theme="dark" />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        {events.slice(0, 4).map((event, i) => (
          <div
            key={i}
            className={`${i === 0 ? "md:col-span-2 bg-theme-blue" : "bg-theme-alice/10"} p-6 rounded-2xl flex flex-col justify-between hover:bg-theme-red transition-colors group`}
          >
            <div>
              <span className="text-4xl font-black opacity-20 group-hover:opacity-100 transition-opacity">
                0{i + 1}
              </span>
              <h4 className="text-xl font-bold mt-4 mb-2">{event.name}</h4>
              <p className="text-sm opacity-70 line-clamp-3">
                {event.description}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-bold text-theme-yellow">
                {event.month} {event.dateNumber}
              </span>
              <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">
                →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* VERSION 4: MINIMALIST LIST (Typography & Spacing focused)                  */
/* -------------------------------------------------------------------------- */
const Version4 = ({ events }) => {
  // Track the hovered index, defaulting to the first item (index 0)
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const section = {
    tagline: "Agenda",
    title: "Upcoming Events",
    description:
      "Building community, one event at a time. Explore our latest schedule and connect with us.",
  };
  console.log("events", events);
  return (
    <section id="events" className="container mx-auto px-4 max-w-6xl py-20">
      <SiteSectionHeader
        tagline={section?.tagline}
        title={section?.title}
        description={section?.description}
      />
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Event List */}
        <div className="flex-1 w-full space-y-0">
          {events.slice(0, 5).map((event, i) => (
            <Link
              href={event?.external_url || "#"}
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              className="group flex items-center py-8 border-b border-theme-dark/10 dark:border-theme-alice/10 hover:px-6 transition-all cursor-pointer"
            >
              <div className="w-24 flex-shrink-0">
                <span className="text-theme-red font-black text-2xl block leading-none">
                  {event.dateNumber}
                </span>
                <span className="block text-xs uppercase tracking-widest opacity-60 dark:text-theme-alice">
                  {event.month}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-theme-dark dark:text-theme-alice group-hover:text-theme-blue transition-colors">
                  {event.name}
                </h3>
                <p className="text-sm opacity-60 italic dark:text-theme-alice">
                  {event.location}
                </p>
              </div>
              {event?.external_url && (
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                  <button className="bg-theme-dark dark:bg-theme-alice dark:text-theme-dark text-theme-cream px-6 py-2 rounded-full text-sm font-bold hover:bg-theme-blue hover:text-white transition-colors">
                    Details
                  </button>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Dynamic Image Display */}
        <div className="w-full lg:w-96 lg:sticky lg:top-10">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-theme-dark/5 dark:bg-theme-alice/5">
            {events.slice(0, 5).map((event, i) => (
              <img
                key={i}
                src={event?.image || "/logo/noimage.webp"}
                alt={event.name}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
                  hoveredIndex === i
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-110 rotate-2"
                }`}
              />
            ))}

            {/* Overlay Gradient for better look */}
            <div className="absolute inset-0 bg-gradient-to-t from-theme-dark/60 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-theme-yellow font-bold text-xs uppercase tracking-widest mb-1">
                Featured Event
              </p>
              <p className="text-lg font-bold leading-tight">
                {events[hoveredIndex]?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* VERSION 5: THE "MAGAZINE" (Large Visuals, High Impact)                     */
/* -------------------------------------------------------------------------- */
const Version5 = ({ events }) => (
  <section className="w-full">
    <div className="container mx-auto px-4 mb-8 flex justify-between items-end">
      <Header align="left" />
      <div className="hidden md:block pb-2">
        <button className="border-2 border-theme-dark dark:border-theme-alice px-8 py-3 font-bold hover:bg-theme-dark hover:text-white transition-all">
          VIEW CALENDAR
        </button>
      </div>
    </div>

    <div className="container mx-auto flex overflow-x-auto pb-10 hide-scrollbar gap-6 px-4">
      {events.map((event, i) => (
        <div key={i} className="min-w-[300px] md:min-w-[450px] relative group">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src={event.image || "/banner/banner.png"}
              alt={event.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-theme-red/20 mix-blend-multiply group-hover:bg-transparent transition-all" />
            <div className="absolute top-6 left-6 text-white">
              <span className="text-6xl font-black leading-none">
                {event.dateNumber}
              </span>
              <span className="block text-xl font-bold border-t-4 border-theme-yellow pt-2">
                {event.month}
              </span>
            </div>
            <div className="absolute bottom-0 p-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform">
              <p className="text-theme-yellow font-bold uppercase tracking-widest text-xs mb-2">
                {event.badge}
              </p>
              <h3 className="text-3xl font-bold leading-tight">{event.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- Shared Internal Header Component ---
const Header = ({ align = "center", theme = "light" }) => {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  const textColor =
    theme === "dark"
      ? "text-theme-alice"
      : "text-theme-dark dark:text-theme-alice";

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      <span className="text-theme-red font-bold uppercase tracking-[0.2em] text-sm">
        {SECTION_CONTENT.tagline}
      </span>
      <h2
        className={`text-5xl md:text-6xl font-black font-fraunces ${textColor}`}
      >
        {SECTION_CONTENT.title}
      </h2>
      <p className={`max-w-xl text-lg opacity-70 ${textColor}`}>
        {SECTION_CONTENT.description}
      </p>
    </div>
  );
};

export default EventsSection;
