import React from "react";
import Image from "next/image";
function SpotLight() {
  return (
    <div className="w-full py-7.5 my-7 bg-theme-dark">
      <div className="container mx-auto flex gap-15">
        {/* Spot light */}
        <div className="relative overflow-hidden w-[50%] bg-neutral-200 text-neutral-500 rounded-xl relativ flex items-center justify-center aspect-square">
          <Image
            src="/banner/banner.png"
            alt="Background description"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="w-[50%] flex items-center">
          <div className="flex flex-col gap-10">
            <div className="font-bold text-white">Spot Light</div>
            <div className="font-bold text-3xl font-fraunces leading-tight text-theme-cream text-shadow">
              This Association gave me back my roots and people. I found family
              here.
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-bold text-white">Kay Alvefelt</div>
              <div className="text-white">Community Member</div>
              <div className="text-white">MERKADOPH</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotLight;
