import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Bookmark,
} from "lucide-react";
import { getBlogs } from "@/app/lib/fn_server";
// --- GLOBAL MOCK DATA (Simulating your getBlogs logic) ---
const BLOG_DATA = {
  featured: {
    handle: "future-of-ui-design",
    title: "The Renaissance of Minimalism in Digital Interfaces",
    excerpt:
      "Exploring how the shift back to clean lines and purposeful whitespace is redefining user experience in the high-end luxury sector.",
    main_image: "/banner/banner.png",
    author: "Julian Thorne",
    category: "Design Trends",
    read_duration: "8 min read",
  },
  posts: [
    {
      id: 1,
      handle: "b1",
      title: "Why Typography is the Soul of Branding",
      category: "Branding",
      read_duration: "5 min",
      main_image: "/banner/banner.png",
    },
    {
      id: 2,
      handle: "b2",
      title: "Mastering the Dark Mode Aesthetic",
      category: "Development",
      read_duration: "4 min",
      main_image: "/banner/banner.png",
    },
    {
      id: 3,
      handle: "b3",
      title: "The Psychology of Color in E-commerce",
      category: "UX Research",
      read_duration: "6 min",
      main_image: "/banner/banner.png",
    },
    {
      id: 4,
      handle: "b4",
      title: "Next.js 15: What You Need to Know",
      category: "Tech",
      read_duration: "10 min",
      main_image: "/banner/banner.png",
    },
    {
      id: 5,
      handle: "b5",
      title: "Architecting Scalable Design Systems",
      category: "Architecture",
      read_duration: "12 min",
      main_image: "/banner/banner.png",
    },
    {
      id: 6,
      handle: "b6",
      title: "The Rise of Motion Design in 2026",
      category: "Motion",
      read_duration: "7 min",
      main_image: "/banner/banner.png",
    },
  ],
};

export default async function BlogsPage({ searchParams }) {
  // 1. Fetch all data
  const allBlogs = (await getBlogs()) || [];

  // 2. Pagination Configuration
  const postsPerPage = 6;
  const currentPage = Number(searchParams?.page) || 1;

  // 3. Logic: Extract Featured (always the first one)
  const featured = allBlogs[0];
  const remainingPosts = allBlogs.slice(1);

  // 4. Calculate Slicing for the Grid
  const totalPages = Math.ceil(remainingPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayPosts = remainingPosts.slice(startIndex, endIndex);

  // 5. Package data for components
  const blogsData = {
    featured: featured,
    posts: [
      ...displayPosts,
      // {
      //   id: 1,
      //   handle: "b1",
      //   title: "Why Typography is the Soul of Branding",
      //   category: "Branding",
      //   read_duration: "5 min",
      //   main_image: "/banner/banner.png",
      // },
      // {
      //   id: 2,
      //   handle: "b2",
      //   title: "Mastering the Dark Mode Aesthetic",
      //   category: "Development",
      //   read_duration: "4 min",
      //   main_image: "/banner/banner.png",
      // },
      // {
      //   id: 3,
      //   handle: "b3",
      //   title: "The Psychology of Color in E-commerce",
      //   category: "UX Research",
      //   read_duration: "6 min",
      //   main_image: "/banner/banner.png",
      // },
      // {
      //   id: 4,
      //   handle: "b4",
      //   title: "Next.js 15: What You Need to Know",
      //   category: "Tech",
      //   read_duration: "10 min",
      //   main_image: "/banner/banner.png",
      // },
      // {
      //   id: 5,
      //   handle: "b5",
      //   title: "Architecting Scalable Design Systems",
      //   category: "Architecture",
      //   read_duration: "12 min",
      //   main_image: "/banner/banner.png",
      // },
      // {
      //   id: 6,
      //   handle: "b6",
      //   title: "The Rise of Motion Design in 2026",
      //   category: "Motion",
      //   read_duration: "7 min",
      //   main_image: "/banner/banner.png",
      // },
    ],
  };

  return (
    <main className="min-h-screen bg-theme-alice dark:bg-theme-dark transition-colors duration-500 pb-20 pt-10">
      {/* UI/UX Strategy: Only show Featured Hero on Page 1. 
          If user is on Page 2+, show a smaller header or just the grid.
      */}

      {/* VERSION 1: THE EDITORIAL MAG */}
      <EditorialLayout data={blogsData} isFirstPage={currentPage === 1} />

      {/* VERSION 2: THE BENTO GRID */}
      {/* <BentoLayout data={blogsData} isFirstPage={currentPage === 1} /> */}

      {/* VERSION 3: THE MINIMALIST LIST */}
      {/* <MinimalistLayout data={blogsData} isFirstPage={currentPage === 1} /> */}

      {/* VERSION 4: THE FLOATING CARDS */}
      {/* <FloatingLayout data={blogsData} isFirstPage={currentPage === 1} /> */}

      {/* VERSION 5: THE BRUTALIST SPLIT */}
      {/* <BrutalistLayout data={blogsData} isFirstPage={currentPage === 1} /> */}

      {/* PAGINATION COMPONENT */}
      {totalPages > 1 && (
        <PaginationSection totalPages={totalPages} currentPage={currentPage} />
      )}
    </main>
  );
}

/**
 * VERSION 1: EDITORIAL MAG (Refined version of original)
 * Focus: High-contrast typography and clear hierarchy.
 */
function EditorialLayout({ data }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-theme-dark dark:text-theme-alice mb-4">
          Our Journal
        </h1>
        <p className="text-theme-blue dark:text-theme-yellow font-medium">
          Insights from the forefront of digital innovation.
        </p>
      </div>

      {/* Featured */}
      <div className="group relative bg-white dark:bg-[#1f2b3b] rounded-3xl overflow-hidden shadow-xl border border-black/5 dark:border-white/5 mb-16">
        <Link href={`/blogs/${data.featured.handle}`} className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 h-[400px] lg:h-[600px] overflow-hidden relative">
            <Image
              src={data.featured.main_image}
              alt="Featured"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center">
            <span className="text-theme-red font-bold tracking-tighter text-sm uppercase mb-4 block">
              Featured Story
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-theme-dark dark:text-white mb-6 leading-tight">
              {data.featured.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              {data.featured.excerpt}
            </p>
            <button
              // href={`/blogs/${data.featured.handle}`}
              className="flex items-center gap-2 text-theme-blue dark:text-theme-yellow font-bold group/btn"
            >
              Read Article{" "}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
            </button>
          </div>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.posts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/blogs/${post.handle}`} className="group">
              <div className="relative h-64 mb-6 rounded-3xl overflow-hidden shadow-md">
                <Image
                  src={post.main_image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-theme-cream/30 text-theme-dark dark:text-theme-yellow px-3 py-1 rounded-full text-xs font-bold">
                  {post.category}
                </span>
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.read_duration}
                </span>
              </div>
              <h3 className="text-xl font-bold text-theme-dark dark:text-white leading-snug group-hover:text-theme-blue dark:group-hover:text-theme-yellow transition-colors">
                {post.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * VERSION 2: BENTO GRID
 * Focus: Visual density and geometric modernism.
 */
function BentoLayout({ data }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 auto-rows-[250px]">
        {/* Featured Bento Piece */}
        <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group">
          <Image
            src={data.featured.main_image}
            alt="Featured"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-dark to-transparent p-8 flex flex-col justify-end">
            <h2 className="text-white text-3xl font-bold mb-2">
              {data.featured.title}
            </h2>
            <p className="text-white/80 line-clamp-2">
              The ultimate guide to modern interface theory.
            </p>
          </div>
        </div>

        {data.posts.map((post, i) => (
          <div
            key={post.id}
            className={`relative rounded-3xl overflow-hidden group ${i === 0 ? "md:col-span-2" : ""} bg-white dark:bg-[#1f2b3b]`}
          >
            <Image
              src={post.main_image}
              alt={post.title}
              fill
              className={`object-cover opacity-60 group-hover:opacity-100 transition-opacity`}
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-black/40">
              <h3 className="text-white font-bold text-lg leading-tight">
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * VERSION 3: MINIMALIST LIST
 * Focus: Content-first, typography-heavy, zero distractions.
 */
function MinimalistLayout({ data }) {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-24">
      <div className="space-y-16">
        {[data.featured, ...data.posts].map((post, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row gap-8 items-start group border-b border-theme-dark/10 dark:border-white/10 pb-16"
          >
            <div className="w-full md:w-1/3 aspect-video relative rounded-3xl overflow-hidden">
              <Image
                src={post.main_image}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                alt="img"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 text-theme-red font-black text-xs uppercase mb-2">
                <span>{post.category}</span>
                <span className="w-1 h-1 bg-theme-dark dark:bg-white rounded-full" />
                <span className="text-slate-400 font-medium">
                  {post.read_duration}
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-theme-dark dark:text-white mb-4 group-hover:text-theme-blue transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Experience the narrative of high-end design culture.
              </p>
              <Link
                href="#"
                className="inline-block p-4 rounded-full border border-theme-dark dark:border-white hover:bg-theme-dark hover:text-white dark:hover:bg-white dark:hover:text-theme-dark transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * VERSION 4: FLOATING CARDS
 * Focus: Depth, soft shadows, and card-based interaction.
 */
function FloatingLayout({ data }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[data.featured, ...data.posts.slice(0, 3)].map((post, i) => (
          <div
            key={i}
            className="group bg-white dark:bg-[#1f2b3b] rounded-3xl p-4 shadow-2xl hover:-translate-y-4 transition-transform duration-500"
          >
            <div className="relative h-80 rounded-3xl overflow-hidden mb-6">
              <Image
                src={post.main_image}
                alt="img"
                fill
                className="object-cover"
              />
            </div>
            <div className="px-4 pb-4">
              <h3 className="text-2xl font-black text-theme-dark dark:text-white mb-4">
                {post.title}
              </h3>
              <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/10 pt-4">
                <span className="text-theme-blue dark:text-theme-yellow font-bold uppercase text-xs tracking-widest">
                  {post.category}
                </span>
                <Bookmark className="w-5 h-5 text-slate-300 hover:text-theme-red cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * VERSION 5: BRUTALIST SPLIT
 * Focus: Raw, asymmetric, and bold.
 */
function BrutalistLayout({ data }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12">
      <div className="flex flex-col gap-1">
        {[data.featured, ...data.posts.slice(0, 4)].map((post, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row group overflow-hidden border-2 border-theme-dark dark:border-white rounded-3xl mb-4 bg-theme-cream dark:bg-theme-dark"
          >
            <div className="md:w-1/4 h-48 md:h-auto relative border-b md:border-b-0 md:border-r-2 border-theme-dark dark:border-white">
              <Image
                src={post.main_image}
                alt="img"
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="flex-1 p-8 flex items-center justify-between">
              <div>
                <span className="text-theme-red font-bold text-xs">
                  0{i + 1} / 05
                </span>
                <h3 className="text-2xl font-bold text-theme-dark dark:text-white uppercase tracking-tighter">
                  {post.title}
                </h3>
              </div>
              <div className="hidden md:block">
                <Link
                  href="#"
                  className="bg-theme-dark dark:bg-white text-white dark:text-theme-dark px-8 py-4 rounded-3xl font-black hover:bg-theme-red transition-colors"
                >
                  READ
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pagination({ totalPages, currentPage }) {
  return (
    <nav className="mt-20 flex items-center justify-center gap-6">
      <button className="w-12 h-12 rounded-3xl bg-theme-dark dark:bg-white text-white dark:text-theme-dark flex items-center justify-center hover:bg-theme-red transition-colors">
        <ChevronLeft />
      </button>
      <div className="flex gap-4">
        {[...Array(totalPages)].map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${i + 1 === currentPage ? "bg-theme-red" : "bg-slate-300 dark:bg-slate-700"}`}
          />
        ))}
      </div>
      <button className="w-12 h-12 rounded-3xl bg-theme-dark dark:bg-white text-white dark:text-theme-dark flex items-center justify-center hover:bg-theme-red transition-colors">
        <ChevronRight />
      </button>
    </nav>
  );
}
