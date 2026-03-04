import React from "react";
import Image from "next/image";
function WhatWeDo() {
  return (
    <div className="py-7.5 my-7">
      <div className="container mx-auto flex flex-col items-center gap-5">
        <div className="font-bold">Mission</div>
        <h2 className="font-bold text-5xl font-fraunces">What We Do</h2>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
          dolore quae nulla aliquam deleniti provident illo odit odio.
          Exercitationem, laborum?
        </div>
        <div className="w-full flex gap-5 mt-10">
          {/* card 1 */}
          <div className="w-[25%] relative border rounded-xl border-neutral-300 overflow-hidden pb-10">
            <div className="h-45 w-full flex justify-center items-center text-neutral-500 font-bold bg-neutral-200 relative">
              <Image
                src="/banner/banner.png"
                alt="Background description"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="font-semibold">Culture</div>
              <h2 className="text-3xl font-bold leading-tight">
                Community
                <br />
                Support
              </h2>
              <div>Helping members navigate life's challenges together</div>
            </div>
            <div className="absolute px-5 bottom-3">Learn &rsaquo;</div>
          </div>
          {/* card 2 */}
          <div className="w-[25%] relative border rounded-xl border-neutral-300 overflow-hidden pb-10">
            <div className="h-45 w-full flex justify-center text-neutral-500 font-bold bg-neutral-200 relative">
              <Image
                src="/banner/banner.png"
                alt="Background description"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="font-semibold">Outreach</div>
              <h2 className="text-3xl font-bold leading-tight">
                Strenghtening ties with local organizations
              </h2>
              <div>Building partnerships that matter</div>
            </div>
            <div className="absolute px-5 bottom-3">Learn &rsaquo;</div>
          </div>
          {/* card 3 */}
          <div className="w-[50%] relative border rounded-xl border-neutral-300 overflow-hidden flex">
            <div className="h-full w-[50%] flex justify-center items-center text-neutral-500 font-bold bg-neutral-200 overflow-hidden relative">
              <Image
                src="/images/sample-image.jpg"
                alt="Background description"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-5 w-[50%] flex items-center">
              <div className="flex flex-col gap-4">
                <div className="font-semibold">Culture</div>
                <h2 className="text-3xl font-bold leading-tight">
                  Empowering the next generation of Filipino leaders
                </h2>
                <div>
                  Investing in our future through education and mentorship
                </div>
                <div>Join &rsaquo;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatWeDo;
