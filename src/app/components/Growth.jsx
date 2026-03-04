import React from "react";
import Image from "next/image";

function Growth() {
  const growth = {
    members: {
      value: "500+",
      label: "Active Members",
    },
    service:{
      value: "5",
      label: "Years serving",
    },
    lives:{
      value: "99+",
      label: "Lives touched annually"
    }
  }

  return (
    <div id="community" className="w-full py-7.5 my-7">
      <div className="container mx-auto flex flex-col gap-7">
        <div className="flex gap-15">
          <div className="w-[50%]">
            <h3 className="font-bold font-fraunces text-3xl">
              Growing stronger with each passing year
            </h3>
          </div>
          <div className="w-[50%]">
            <div>
              Our numbers tell the story of a community that matters. From
              humble beginnings to where we stand today, the growth reflects the
              dedication of those who believe in what we do.
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-[33.3%] flex items-center justify-center rounded-lg border border-neutral-300">
            <div className="flex flex-col gap-1 items-center">
              <div className="font-bold text-9xl">{growth?.members?.value}</div>
              <div className="font-bold">{growth?.members?.label}</div>
            </div>
          </div>
          <div className="w-[66.6%] flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="w-[50%] rounded-lg aspect-video bg-neutral-200 relative overflow-hidden">
                <Image
                  src={"/banner/banner.png"}
                  alt="Background description"
                  className="object-cover"
                  fill
                  priority
                />
              </div>
              <div className="w-[50%] rounded-lg aspect-video border border-neutral-300 flex items-center justify-center">
                <div className="flex flex-col gap-1 items-center">
                  <div className="font-bold text-8xl">{growth?.service?.value}</div>
                  <div className="font-bold">{growth?.service?.label}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-[50%] rounded-lg aspect-video border border-neutral-300 flex items-center justify-center">
                <div className="flex flex-col gap-1 items-center">
                  <div className="font-bold text-8xl">{growth?.lives?.value}</div>
                  <div className="font-bold">{growth?.lives?.label}</div>
                </div>
              </div>
              <div className="w-[50%] rounded-lg aspect-video  bg-neutral-200 relative overflow-hidden">
                <Image
                  src={"/banner/banner.png"}
                  alt="Background description"
                  className="object-cover"
                  fill
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Growth;
