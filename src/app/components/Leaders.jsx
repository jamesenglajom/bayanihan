"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, ChevronRight } from "lucide-react";

// Example Data Structure
const team = [
  {
    id: 1,
    name: "Lorraine Hager",
    position: "Chairperson",
    // Bio as an HTML String
    bio: `
      <div class="space-y-6">
    <p class="text-lg leading-relaxed">
      Lorraine leads with purpose, cultural pride, and a deep commitment to people. Above all, she is a <strong>mother and wife first</strong>, grounding everything she does in family, faith, and service. Her leadership journey began early; from grade school through university, she was consistently involved as a student leader, drawn to roles that allowed her to serve, organise, and uplift others.
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border-l-4 border-blue-600">
      <p class="italic text-neutral-800 dark:text-neutral-200">
        "In 2025, she became the first Filipina—and the only woman—elected to the Board of Directors of <strong>The Swedish Club</strong> for the 2025–2026 term."
      </p>
    </div>

    <p>
      Today, she is a passionate advocate for seafarer wellbeing, delivering training internationally and representing The Swedish Club in the <strong>International Group of P&I Clubs’ Working Group on Mental Wellbeing in Maritime</strong>. She is also an active member of <em>WISTA Sweden</em>, supporting initiatives that elevate women’s leadership in the maritime sector.
    </p>

    <p>
      Faith is central to her life. Lorraine serves as a <strong>Praise and Worship Leader</strong> at Amazing Grace of Christ Church in Sweden, where she shares her love for music and ministry.
    </p>

    <div class="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      <h5 class="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Did you know?</h5>
      <p class="mb-4">
        Long before stepping into boardrooms, Lorraine was expressing herself through music and sports:
      </p>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 list-none !pl-0">
        <li class="flex items-start gap-2">
          <span class="text-blue-500">✔</span> <span>Rhythm guitarist and singer in a band</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500">✔</span> <span>Certified BAP Basketball Referee</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500">✔</span> <span>Varsity Basketball Athlete</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500">✔</span> <span>Girls' Football Coach (7 years)</span>
        </li>
      </ul>
    </div>

    <p class="pt-4 text-sm italic opacity-80">
      When she’s not leading, Lorraine is often found baking, singing, or switching between guitar and piano—bringing joy to her family and community through creativity and heart.
    </p>
  </div>
    `,
    mainImage: "/images/leaders/lorraine-1.webp",
    gallery: [
      "/images/leaders/lorraine-2.webp", 
      "/images/leaders/lorraine-3.webp", 
      "/images/leaders/lorraine-4.webp",
      // "/team/lorraine-5.jpg"
    ],
  },
  {
    id: 2,
    name: "Montclair Lee",
    position: "Vice Chairman",
    // Bio as an HTML String
    bio: `
      <div class="space-y-6">
    <p class="text-lg leading-relaxed">
      Montclair grew up in <strong>Dumaguete City</strong>, the <em>“City of Gentle People,”</em> where his love for music, service, and community began. Trained early in public speaking by his mother—who was also his English teacher—he became a versatile leader in choir, marching bands, student government, and campus journalism.
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border-l-4 border-blue-600">
      <h5 class="text-blue-700 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">A Global Journey</h5>
      <p class="text-neutral-800 dark:text-neutral-200">
        In 1996, he joined the mission ship <strong>MV Doulos</strong>. As a galley cook for 350 crew members from 30+ nations, he traveled to <strong>21 countries and 37 cities</strong>. It was on this very ship that he met his wife, Petra.
      </p>
    </div>

    <p>
      After moving to Sweden in 2001, Montclair built a reputation for reliability and kindness. Today, he works as a distribution lorry driver for one of Sweden's largest food wholesalers, bringing the same spirit of service to his professional life that he learned on the high seas.
    </p>

    <div class="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      <h5 class="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Music & Ministry</h5>
      <p class="mb-4">
        Montclair remains a central figure in the community’s creative and spiritual life:
      </p>
      <ul class="space-y-3 list-none !pl-0">
        <li class="flex items-center gap-3">
          <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">🎸</span>
          <span><strong>Band Leader:</strong> Leading the band <em>FamiLee</em> to share music with friends and family.</span>
        </li>
        <li class="flex items-center gap-3">
          <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">🔊</span>
          <span><strong>Sound Technician:</strong> Freelance audio support for the church and the Filipino community.</span>
        </li>
        <li class="flex items-center gap-3">
          <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">👨‍👩‍👧‍👦</span>
          <span><strong>Fatherhood:</strong> Proudly supporting the creative endeavors of his children, Melvin and Selma.</span>
        </li>
      </ul>
    </div>

    <p class="pt-4 text-sm italic opacity-80 border-t border-neutral-100 dark:border-neutral-800">
      Known for his "willingness to help anyone who needs a hand," Montclair continues to bridge his roots in Dumaguete with his vibrant life in Sweden.
    </p>
  </div>
    `,
    mainImage: "/images/leaders/montclair-1.webp",
    gallery: [
      "/images/leaders/montclair-2.webp",
      "/images/leaders/montclair-3.webp",
    ],
  },
  {
    id: 3,
    name: "Mariafe Vince",
    position: "Secretary",
    // Bio as an HTML String
    bio: `
      <div class="space-y-6">
    <p class="text-lg leading-relaxed">
      Mariafe is a dedicated education professional with a heart for service and a global perspective. Born in <strong>Escalante City, Negros Occidental</strong>, she grew up as the breadwinner of her family—roles that shaped her resilience, responsibility, and leadership from an early age.
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border-l-4 border-blue-600">
      <h5 class="text-blue-700 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">A Global Educator</h5>
      <p class="text-neutral-800 dark:text-neutral-200">
        Since moving to Sweden in 2018, Mariafe has brought a solution-focused mindset to her work. With a <strong>Bachelor of Elementary Education</strong>, she has shared her expertise across the Philippines, Iceland, and Sweden.
      </p>
    </div>

    <div class="space-y-4">
      <h5 class="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm">Professional Expertise</h5>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 list-none !pl-0">
        <li class="flex items-start gap-2">
          <span class="text-blue-500">🎓</span> <span>Mother-tongue Instruction (Tagalog & Bisaya)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500">🏫</span> <span>Public School & Preschool Teaching</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500">🌍</span> <span>Cross-cultural Communication</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500">🌱</span> <span>Continuous Professional Growth</span>
        </li>
      </ul>
    </div>

    <p>
      Her international journey—living in <strong>Sweden, Norway, Iceland, and the Philippines</strong>—has strengthened her adaptability. She is known for her professionalism and warmth, believing that integrity and optimism are key to building a strong community.
    </p>

    <div class="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      <p class="text-sm text-neutral-500 dark:text-neutral-400 italic">
        Outside of her professional life, Mariafe enjoys entrepreneurship, traveling, nature walks, and the simple joy of spending quality time with her loved ones.
      </p>
    </div>
  </div>
    `,
    mainImage: "/images/leaders/mafe-1.webp",
    gallery: [
      "/images/leaders/mafe-2.webp",
      "/images/leaders/mafe-3.webp",
    ],
  },
  {
    id: 4,
    name: "Jerry Rariza",
    position: "Treasurer",
    // Bio as an HTML String
    bio: `
      <div class="space-y-6">
    <p class="text-lg leading-relaxed">
      Jerry is known for his humor, strength, and unwavering loyalty. He is the kind of person who will gladly set aside his own needs for the sake of others. A man of principle, he stands firmly for what is right and fair, values family above all, and treats friends like kin. 
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border-l-4 border-blue-600">
      <h5 class="text-blue-700 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Technical Expertise</h5>
      <p class="text-neutral-800 dark:text-neutral-200">
        Since 2007, Jerry has been a specialist at <strong>Swede Heat Mobilvärmebehandling AB</strong>. His mastery of heat treatment includes complex processes like <strong>PWHT, annealing, and furnace building</strong>, alongside job planning and equipment calibration.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        <h6 class="font-bold text-blue-600 dark:text-blue-400 text-sm mb-2">The SWENOYS Leader</h6>
        <p class="text-sm">Leader of the band <strong>SWENOYS</strong>, where he plays lead guitar and sings with passion.</p>
      </div>
      <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        <h6 class="font-bold text-blue-600 dark:text-blue-400 text-sm mb-2">Culinary Heart</h6>
        <p class="text-sm">An avid cook who finds joy in feeding friends and family with warmth and generosity.</p>
      </div>
    </div>

    <p>
      Before his technical career in Sweden, Jerry spent <strong>10 years as a farmer</strong>—cultivating land, planting rice, and caring for animals. This decade of labor shaped the resilience and "work hard, play hard" ethic that defines him today.
    </p>

    <div class="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      <p class="text-center text-blue-600 dark:text-blue-400 font-medium italic">
        "Work hard, play hard."
      </p>
    </div>
  </div>
    `,
    mainImage: "/images/leaders/jerry-1.webp",
    gallery: [
      "/images/leaders/jerry-2.webp", 
      "/images/leaders/jerry-3.webp", 
      // "/images/leaders/jerry-4.webp",
    ],
  },
  {
    id: 5,
    name: "Francis Ocampo",
    position: "Director",
    // Bio as an HTML String
    bio: `
      <div class="space-y-6">
    <p class="text-lg leading-relaxed">
      Francis brings over <strong>23 years of Global Technical Support experience</strong> from Breas Medical AB, along with a calm, reliable presence that people naturally trust. Born in Makati and living in Sweden since 1992, he perfectly embodies the blend of Filipino warmth and Swedish steadiness.
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border-l-4 border-blue-600">
      <h5 class="text-blue-700 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Technical Leadership</h5>
      <p class="text-neutral-800 dark:text-neutral-200">
        A graduate of the <em>Industri Programmet</em> at Kortedala Gymnasiet, Francis has built a respected career defined by teamwork, complex problem-solving, and a consistently positive attitude.
      </p>
    </div>

    <div class="flex flex-wrap gap-2">
      <span class="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-medium">🇸🇪 Swedish</span>
      <span class="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-medium">🇵🇭 Tagalog</span>
      <span class="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-medium">🇬🇧 English</span>
    </div>

    <div class="space-y-4">
      <h5 class="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm">Community & Creativity</h5>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 list-none !pl-0">
        <li class="flex items-center gap-2">
          <span class="text-blue-500">🎸</span> <span>Guitarist & Drummer (InFlow Band)</span>
        </li>
        <li class="flex items-center gap-2">
          <span class="text-blue-500">🍳</span> <span>Passionate Home Cook</span>
        </li>
        <li class="flex items-center gap-2">
          <span class="text-blue-500">🎣</span> <span>Fishing & Nature Enthusiast</span>
        </li>
        <li class="flex items-center gap-2">
          <span class="text-blue-500">🤝</span> <span>Trusted Board Member</span>
        </li>
      </ul>
    </div>

    <p class="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
      Francis brings to the board a grounded personality and a genuine love for people. Whether he is solving technical challenges or sharing music with the community, he remains a valued and trusted pillar of the team.
    </p>
  </div>
    `,
    mainImage: "/images/leaders/francis-1.webp",
    gallery: [
      "/images/leaders/francis-2.webp", 
      "/images/leaders/francis-3.webp", 
    ],
  },
  // Add more members here...
];

export default function TeamSection() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") setSelectedPerson(null); };
    if (selectedPerson) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPerson]);

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* The Flat Horizontal Container */}
        <div 
          className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-2 h-auto lg:h-[500px]"
          onMouseLeave={() => setHoveredId(null)}
        >
          {team.map((person) => (
            <motion.div
              key={person.id}
              layoutId={`card-${person.id}`}
              onMouseEnter={() => setHoveredId(person.id)}
              onClick={() => setSelectedPerson(person)}
              className={`
                relative cursor-pointer overflow-hidden group
                w-full lg:flex-1 rounded-3xl lg:rounded-[2.5rem]
                transition-all duration-500 ease-in-out
                ${hoveredId && hoveredId !== person.id ? "lg:opacity-40 lg:scale-[0.98]" : "lg:opacity-100 lg:scale-100"}
                ${hoveredId === person.id ? "lg:flex-[1.5]" : "lg:flex-1"}
              `}
            >
              {/* Image Layer */}
              <img 
                src={person.mainImage} 
                alt={person.name}
                className="w-full aspect-1 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Text Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 text-white">
                <motion.div
                  initial={false}
                  animate={{ y: hoveredId === person.id ? -10 : 0 }}
                  className="space-y-1"
                >
                  <h3 className="text-2xl lg:text-3xl font-bold font-fraunces leading-tight">
                    {person.name}
                  </h3>
                  <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
                    {person.position}
                  </p>
                  
                  {/* Desktop Only: "Read More" reveal on hover */}
                  <div className="hidden lg:block overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredId === person.id ? 1 : 0,
                        y: hoveredId === person.id ? 0 : 20 
                      }}
                      className="pt-4 flex items-center gap-2 text-white/70 text-sm"
                    >
                      View Profile <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPerson && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPerson(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 bottom-0 top-0 w-full lg:w-[650px] bg-white dark:bg-neutral-950 z-[101] overflow-y-auto shadow-2xl"
            >
              {/* Close Button */}
              <div className="sticky top-0 right-0 p-6 flex justify-end bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl z-20">
                <button 
                  onClick={() => setSelectedPerson(null)}
                  className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="px-8 lg:px-12 pb-20 space-y-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                  <div className="w-full lg:w-48 aspect-square rounded-[2rem] overflow-hidden shadow-xl shrink-0">
                    <img src={selectedPerson.mainImage} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-bold font-fraunces text-neutral-900 dark:text-neutral-100">
                      {selectedPerson.name}
                    </h2>
                    <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mt-2">
                      {selectedPerson.position}
                    </p>
                  </div>
                </div>

                <div className="prose dark:prose-invert prose-blue max-w-none">
                  <div 
                    className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: selectedPerson.bio }} 
                  />
                </div>

                {/* Gallery */}
                <div className="space-y-6 pt-10 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3 text-neutral-900 dark:text-neutral-100 font-bold">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-xl">Gallery</h4>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedPerson.gallery.map((img, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden aspect-square bg-neutral-100 dark:bg-neutral-800 shadow-sm">
                        <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}