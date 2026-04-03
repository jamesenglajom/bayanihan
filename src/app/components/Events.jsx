"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import ImagePicker from "@/app/components/admin/ImagePicker";

function Events({ eventsList }) {
  const events = useMemo(() => {
    if (!eventsList) return [];

    // Get the start of today (00:00:00) to ensure today's events are included
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    return (
      eventsList
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
        // Filter out any event where the timestamp is before the start of today
        .filter((event) => event.timestamp >= todayTimestamp)
        .sort((a, b) => a.timestamp - b.timestamp)
    );
  }, [eventsList]);

  return (
    <div
      id="events"
      className="w-full py-7.5 my-7 text-neutral-900 dark:text-neutral-100"
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-5">
        <div className="font-bold text-blue-600 dark:text-blue-400">
          Upcoming
        </div>
        <h2 className="font-bold text-5xl font-fraunces">Events</h2>
        <div className="text-neutral-600 dark:text-neutral-400 text-center">
          Join us for gathering that matter
        </div>

        {/* Responsive Grid: Column on mobile, Two-column on desktop */}
        <div className="mt-7 w-full flex flex-col lg:flex-row gap-8">
          {/* Main Featured Event */}
          <div className="w-full lg:w-1/2 relative border rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden pb-10">
            <div className="overflow-hidden aspect-video w-full flex justify-center items-center bg-neutral-200 dark:bg-neutral-800 relative">
              <Image
                src={events?.[0]?.image || "/banner/banner.png"}
                alt="Event cover"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute right-3 top-3 w-20 rounded-md shadow-md flex flex-col items-center gap-1 py-3 bg-theme-red text-theme-cream">
                <div className="font-normal text-base">{events?.[0]?.day}</div>
                <div className="font-fraunces text-2xl font-bold">
                  {events?.[0]?.dateNumber}
                </div>
                <div className="font-normal text-base">{`${events?.[0]?.month} ${events?.[0]?.year}`}</div>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div className="flex">
                <div className="font-semibold py-1 px-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm">
                  {events?.[0]?.badge}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold leading-tight font-fraunces mb-1">
                  {events?.[0]?.name}
                </h2>
                <div className="font-medium text-neutral-500 dark:text-neutral-400">
                  {events?.[0]?.location}
                </div>
              </div>
              <div className="text-neutral-700 dark:text-neutral-300 line-clamp-3">
                {events?.[0]?.description}
              </div>
            </div>
          </div>

          {/* Side Events List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            {events.slice(1).map((event, index) => (
              <div
                key={`event-card-${index}-${event?.date}`}
                className="w-full relative border rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col sm:flex-row transition-hover hover:border-blue-500 dark:hover:border-blue-400"
              >
                {/* Date Box: Full width on mobile, Fixed width on desktop */}
                <div className="w-full sm:min-w-32 sm:w-32 flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-1 py-3 bg-stone-200 dark:bg-neutral-800 text-stone-800 dark:text-neutral-200">
                  <div className="font-normal text-base">{event?.day}</div>
                  <div className="font-fraunces text-2xl font-bold">
                    {event?.dateNumber}
                  </div>
                  <div className="font-normal text-base">{`${event?.month} ${event.year}`}</div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex">
                    <div className="font-semibold py-0.5 px-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-full text-xs">
                      {event?.badge}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold leading-tight font-fraunces mb-1">
                      {event.name}
                    </h3>
                    <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 italic">
                      {event?.location}
                    </div>
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
                    {event?.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
