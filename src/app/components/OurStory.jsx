import React from "react";
import Image from "next/image";
function OurStory() {
  return (
    <div id="about" className="w-full py-7.5 my-7">
      <div className="container mx-auto flex gap-15">
        <div className="w-[50%] flex flex-col gap-7">
          <div className="font-bold">Heritage</div>
          <h2 className="font-bold text-5xl font-fraunces leading-tight">
            Our story and
            <br /> commitment to
            <br /> community
          </h2>
          <div>
            Bayanihan Exchange in Sweden (BES) is a community‑driven, non‑profit
            cultural organisation dedicated to celebrating the richness of
            Filipino heritage, showcasing Filipino talents, and fostering
            meaningful cultural exchange across Sweden. Open to all, BES brings
            people together through the Filipino spirit of bayanihan—lifting one
            another through shared effort, shared joy, and shared purpose.
            <br />
            <br />
            BES serves as a vibrant platform for sharing Filipino culture with
            the world. It ensures that traditions, stories, and creative
            expressions are not only preserved but passed on to the next
            generations growing up in Sweden. Through festivals, workshops,
            dialogues, and collaborative projects, BES invites both Filipinos
            and non‑Filipinos to experience the warmth, resilience, artistry,
            and generosity that define Filipino identity.
            <br />
            <br />
            At its heart, BES believes that culture grows stronger when it is
            shared. The organisation nurtures an environment where ideas flow
            freely, where perspectives meet, and where a deep sense of community
            and belonging naturally takes root. It is a space where people can
            celebrate who they are, learn from one another, and build bridges
            between Filipino heritage and Swedish society.
            <br />
            <br />
            More than an organisation, BES is a movement of kindness, cultural
            pride, and collective empowerment. It honours its roots while
            embracing new possibilities—creating a future where every voice is
            valued, every story has a place, and every individual feels part of
            a shared and thriving community.
          </div>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-3">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 20H20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <path
                  d="M12 20V14M12 14L9 11M12 14L15 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M12 4C9.23858 4 7 6.23858 7 9C7 10.1539 7.38814 11.217 10.0381 12.6085C11.2514 13.2455 12.7486 13.2455 13.9619 12.6085C16.6119 11.217 17 10.1539 17 9C17 6.23858 14.7614 4 12 4Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <path
                  d="M9 20C9 21.1046 8.10457 22 7 22"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M15 20C15 21.1046 15.8954 22 17 22"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              Respect for tradition and cultural pride
            </li>
            <li className="flex items-center gap-3">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 14C8 12.3431 9.34315 11 11 11H13C14.6569 11 16 12.3431 16 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <path
                  d="M4 15C4 18.3137 6.68629 21 10 21H14C17.3137 21 20 18.3137 20 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <path
                  d="M19 5V9M17 7H21"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Dedication to help our members
            </li>
            <li className="flex items-center gap-3">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 18V10M17 18V6M21 18V2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="5"
                  cy="11"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="9"
                  cy="11"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <path
                  d="M2 19C2 16.5 4 15 6 15H8C10 15 12 16.5 12 19V21H2V19Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                <path
                  d="M12 21H22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Commitment to building a better future together
            </li>
          </ul>
          {/* <div className="flex items-center gap-6">
            <button className="py-2 px-3 border border-neutral-200 rounded-md">
              About
            </button>
            <button>More &rsaquo;</button>
          </div> */}
        </div>
        <div className="w-[50%] relative flex items-center justify-center bg-theme-cream text-neutral-500 font-bold overflow-hidden rounded-xl">
          <Image
            src="/logo/KAY_bes_emblem_light01pngx4.png"
            alt="Background description"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default OurStory;
