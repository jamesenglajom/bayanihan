"use client";

import React, { useMemo } from "react";
import Image from "next/image";
function News() {
  const newsList = [
    {
      badge: "Culture",
      read_duration: "3 min read",
      image: "/images/sample-image.jpg",
      title: "Heritage month brings community together",
      excerpt: "Celebrating our shared traditions and values",
    },
    {
      badge: "Outreach",
      read_duration: "4 min read",
      image: "/images/sample-image.jpg",
      title: "New Scholarship program launches",
      excerpt: "Supporting education for our young members",
    },
    {
      badge: "Youth",
      read_duration: "5 min read",
      image: "/images/sample-image.jpg",
      title: "Mentorship program expands statewide",
      excerpt: "Connecting experineced leaders with rising talents",
    },
  ];

  return (
    <div id="news" className="w-full py-7.5 my-7 bg-theme-red text-white">
      <div className="container mx-auto flex flex-col items-center gap-5">
        <div className="font-bold">Updates</div>
        <h2 className="font-bold text-5xl font-fraunces">News and announcements</h2>
        <div>Stay informed about what matters</div>
        <div className="mt-7 w-full flex gap-5">
          {newsList.map((news, index) => (
            <div key={`news-card-${index}`} className="w-full bg-white text-black relative border rounded-xl border-neutral-300 overflow-hidden pb-10">
              <div className="aspect-square w-full flex justify-center items-center text-neutral-500 font-bold bg-neutral-200 relative">
                <Image
                    src={news?.image}
                    alt="Background description"
                    fill
                    className="object-cover"
                    priority
                  />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="font-semibold py-1 px-3 border border-neutral-200 bg-neutral-100 rounded-full">
                    {news?.badge}
                  </div>
                  <div>{news?.read_duration}</div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold leading-tight font-fraunces">
                    {news?.title}
                  </h2>
                </div>
                <div>{news?.excerpt}</div>
              </div>
              <div className="absolute px-5 bottom-3">Read more &rsaquo;</div>
            </div>
          ))}
        </div>
        <button className="bg-theme-yellow text-theme-dark py-3 px-7 rounded-full font-semibold mt-10">Show All</button>
      </div>
    </div>
  );
}

export default News;
