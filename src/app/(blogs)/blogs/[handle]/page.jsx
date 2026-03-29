import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { getBlogByHandle } from "@/app/lib/fn_server";

export default async function page({ params }) {
  const { handle } = await params;
  if (!handle) return notFound();
  console.log("handle", handle);

  const blog = await getBlogByHandle(handle);
  if (!blog) return notFound();

  return (
    <article className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">
      {/* 2. Reading Progress Bar (Fixed at top) */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-slate-100 dark:bg-white/5">
        <div className="h-full bg-blue-600 dark:bg-yellow-400 w-1/3" />{" "}
        {/* Note: Real progress requires a Client Component scroll listener */}
      </div>

      {/* 3. Sleek Floating Header */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5 py-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-sm font-bold text-[#003566] dark:text-yellow-400 group"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Insights
          </Link>
          <div className="flex gap-4 text-slate-400">
            <Share2
              size={18}
              className="hover:text-blue-600 cursor-pointer transition-colors"
            />
            <Bookmark
              size={18}
              className="hover:text-blue-600 cursor-pointer transition-colors"
            />
          </div>
        </div>
      </nav>

      {/* 4. Hero Header Section */}
      <header className="pt-16 pb-12 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
          {blog.category || "Community News"}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-[#001d3d] dark:text-white tracking-tighter leading-[1.1] mb-8">
          {blog.title}
        </h1>

        <div className="flex items-center justify-center gap-6 text-slate-400 dark:text-slate-500 text-sm font-bold border-y border-slate-100 dark:border-white/5 py-6">
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-500" />
            {new Date(blog.created_at).toLocaleDateString("en-SE", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-blue-500" />
            {blog.read_duration}
          </span>
        </div>
      </header>

      {/* 5. Featured Image */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl">
          <Image
            src={blog?.main_image || "/placeholder.jpg"}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* 6. Main Content (Typography Focused) */}
      <section className="max-w-3xl mx-auto px-6 pb-32">
        <div
          className="prose prose-lg md:prose-xl dark:prose-invert 
          prose-headings:text-[#001d3d] dark:prose-headings:text-white 
          prose-headings:font-black prose-headings:tracking-tighter
          prose-p:text-slate-600 dark:prose-p:text-slate-300
          prose-a:text-blue-600 dark:prose-a:text-yellow-400
          prose-strong:text-[#001d3d] dark:prose-strong:text-white
          max-w-none"
        >
          {/* If using Tiptap JSON, you need a renderer here. 
              If using HTML, use dangerouslySetInnerHTML 
          */}
          <p className="lead italic text-xl text-slate-500 mb-10">
            {blog.excerpt}
          </p>

          <div
            className="prose prose-slate dark:prose-invert max-w-none 
                 prose-headings:font-black prose-headings:tracking-tighter
                 prose-h4:border-l-4 prose-h4:border-bes-yellow prose-h4:pl-4
                 prose-a:text-bes-blue dark:prose-a:text-bes-yellow 
                 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* 7. Footer Tag Cloud */}
        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-2">
          {blog.categories?.map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-slate-50 dark:bg-white/5 text-slate-500 text-xs font-bold rounded-lg uppercase tracking-wider"
            >
              #{category}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
}
