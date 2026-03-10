"use client";

import React, { useMemo } from "react";
import Image from "next/image";
function Events() {
  const eventsList = [
    {
      date: "2026-04-11",
      badge: "Launching",
      image: "/images/sample-image.jpg",
      title: "You are invited to the launching of Bayanihan Exchange in Sweden",
      venue: "Big Tambayan Lokal, Torslanda torg",
      excerpt: "Music, food and dancing",
    },
    {
      date: "2026-05-01",
      badge: "Community",
      image: "/images/sample-image.jpg",
      title: "Concert for a Cause",
      venue: "TBA",
      excerpt: "Helping hands making real difference together",
    },
    {
      date: "2026-06-13",
      badge: "Community",
      image: "/images/sample-image.jpg",
      title: "Philippine Independence Day Celebration 2026",
      venue: "TBA",
      excerpt: "",
    },
  ];

  const events = useMemo(() => {
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
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [eventsList]);

  return (
    <div id="events" className="w-full py-7.5 my-7">
      <div className="container mx-auto flex flex-col items-center gap-5">
        <div className="font-bold">Upcoming</div>
        <h2 className="font-bold text-5xl font-fraunces">Events</h2>
        <div>Join us for gathering that matter</div>
        <div className="mt-7 w-full flex gap-5">
          {events.map((event, index) => (
            <div
              key={`event-card-${index}-${event?.date}`}
              className="w-full relative border rounded-xl border-neutral-300 overflow-hidden pb-10"
            >
              <div className="overflow-hidden aspect-square w-full flex justify-center items-center text-neutral-500 font-bold bg-neutral-200 relative">
                <Image
                  src={event?.image}
                  alt="Background description"
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className={`absolute right-3 top-3 w-20  rounded-md shadow-md flex flex-col items-center gap-1 py-3 ${index === 0 ? "bg-theme-red  text-theme-cream" : "bg-white text-black"}`}
                >
                  <div className="font-normal text-base">{event?.day}</div>
                  <div className="font-fraunces text-2xl font-bold">
                    {event?.dateNumber}
                  </div>
                  <div className="font-normal text-base">{`${event?.month} ${event.year}`}</div>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex">
                  <div className="font-semibold py-1 px-3 border border-neutral-200 bg-neutral-100 rounded-full">
                    {event?.badge}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold leading-tight font-fraunces">
                    {event.title}
                  </h2>
                  <div className="font-medium">{event?.venue}</div>
                </div>
                <div>{event?.excerpt}</div>
              </div>
              <div className="absolute px-5 bottom-3">View Event &rsaquo;</div>
            </div>
          ))}
        </div>
        <button className="bg-neutral-200 py-3 px-7 rounded-full font-semibold mt-10">
          Show All
        </button>
      </div>
    </div>
  );
}

export default Events;
