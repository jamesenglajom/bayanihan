import React from "react";
import Image from "next/image";
function Banner() {
  return (
    <div id="home" className="w-full bg-theme-alice pb-10 relative overflow-hidden">
      <div 
        className="absolute w-full h-full bg-hero bg-cover bg-center blur-lg scale-110 opacity-40" 
        aria-hidden="true"
        />
      <div className="container mx-auto  h-100 flex items-center justify-center ">
        <div className="z-20">
          <h1 className="text-6xl font-bold font-fraunces text-center leading-tight text-theme-dark">
            Celebrating
            <br /> Filipino culture
            <br /> and community
          </h1>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="relative h-125 w-full overflow-hidden rounded-3xl bg-neutral-300 shadow-2xl z-20">
          <Image
            src="/banner/banner.png"
            alt="Background description"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
