import React from "react";
import Image from "next/image";
function Donate() {
  return (
    <div className="w-full py-7.5 my-7">
      <div className="container mx-auto flex gap-15">
        <div className="w-[50%]">
          <div className="h-60 overflow-hidden w-full flex justify-center items-center text-neutral-500 font-bold bg-neutral-200 relative">
            <Image
              src={"/banner/banner.png"}
              alt="Background description"
              className="object-cover"
              fill
              priority
            />
          </div>
        </div>
        <div className="w-[50%] flex flex-col gap-6">
          <h2 className="font-bold font-fraunces text-5xl">Be part of something bigger</h2>
          <div>Your support strengthens our community and keeps our traditions alive</div>
          <div className="flex gap-5">
            <button className="py-2 px-3 border border-theme-yellow bg-theme-yellow rounded-md text-theme-dark font-medium">
              Donate
            </button>
            <button className="py-2 px-3 border border-neutral-200 rounded-md font-medium">
              Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;
