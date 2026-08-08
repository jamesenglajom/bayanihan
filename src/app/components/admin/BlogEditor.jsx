"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  List,
  ImageIcon,
  Save,
  User,
  Tag,
  X,
  Hash,
  FileText,
  ExternalLink,
  ImagePlus,
  ChevronLeft,
  Sparkles,
  Loader2,
  Underline as UnderlineIcon,
  Calendar,
} from "lucide-react";
import ImagePicker from "@/app/components/admin/ImagePicker";

const BlogAlert = () => {
  return (
    <div className="flex items-start gap-5 p-6 mb-8 bg-indigo-50/40 dark:bg-indigo-500/5 border border-indigo-100/50 dark:border-indigo-500/20 rounded-2xl">
      <div className="shrink-0 p-3 bg-white dark:bg-white/5 rounded-xl shadow-sm text-indigo-600 dark:text-indigo-400 border border-indigo-50 dark:border-indigo-500/10">
        <ImagePlus size={22} />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
          <Sparkles size={14} className="animate-pulse text-indigo-400" /> Media
          Assets Guide
        </h3>
        <p className="text-sm text-indigo-800/80 dark:text-indigo-300/70 leading-relaxed font-medium">
          To maintain site performance, please use the{" "}
          <strong className="text-indigo-900 dark:text-indigo-200 font-black">BES Library</strong>{" "}
          workflow for all story assets.
        </p>
      </div>
    </div>
  );
};

const BlogEditor = ({ blog }) => {
  const router = useRouter();

  // Initialize state with safety fallbacks
  const [post, setPost] = useState({
    id: blog?.id || blog?._id || null,
    title: blog?.title || "",
    excerpt: blog?.excerpt || "",
    author: blog?.author || "",
    badge: blog?.badge || "",
    handle: blog?.handle || "",
    read_duration: blog?.read_duration || "",
    main_image: blog?.main_image || "",
    categories: Array.isArray(blog?.categories) ? blog.categories : [],
    content: blog?.content || "",
    published_at: blog?.published_at || "",
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickImageFor, setPickImageFor] = useState("main_image");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      ImageExtension,
      Underline,
      Typography,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-indigo-600 dark:text-indigo-400 underline font-bold" },
      }),
      Placeholder.configure({
        placeholder: "Start writing your masterpiece...",
      }),
    ],
    content: post.content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[600px] p-8 md:p-16 text-slate-700 dark:text-slate-300 leading-relaxed text-lg",
      },
    },
  });

  // Add these helper functions at the bottom of your file
  const calculateReadTime = (text) => {
    if (!text) return 0;
    const wordsPerMinute = 225;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSave = async () => {
    if (!post.title.trim()) {
      alert("Please enter a title before saving.");
      return;
    }

    setIsSaving(true);
    const contentText = editor.getText();
    const finalReadDuration =
      post.read_duration || `${calculateReadTime(contentText)} min read`;
    const entryDate = new Date().toISOString();

    // Construct the final payload
    const data = {
      ...post,
      id: post.id || `${generateId()}`, // Use existing ID or generate new one
      content: editor.getJSON(),
      read_duration: finalReadDuration,
      handle: post.handle || generateSlug(post.title),
      updated_at: entryDate,
      created_at: post.created_at || entryDate,
      published_at: post?.published_at ? post.published_at.split("T")[0] : "",
    };

    try {
      const response = await fetch("/api/blogs", {
        method: blog ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save blog");
      }

      await response.json();

      // Success feedback
      alert("Blog synchronized successfully with BES Cloud!");

      // Optional: Redirect to the table view after saving
      // router.push("/admin/blogs");
    } catch (error) {
      console.error("Save Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageSelect = (url) => {
    if (pickImageFor === "main_image") setPost({ ...post, main_image: url });
    else if (url && editor) editor.chain().focus().setImage({ src: url }).run();
    setShowPicker(false);
  };

  // Logic for dynamic live preview URL
  const liveUrl = post?.handle ? `/blogs/${post.handle}` : "#";

  const labelStyle =
    "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 flex items-center gap-2 mb-2 px-1";
  const inputStyle =
    "w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-xl px-5 py-3.5 text-sm font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-white/8 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 dark:focus:border-indigo-500 transition-all outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600";

  return (
    <div className="max-w-7xl mx-auto antialiased text-slate-900 dark:text-white">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <button
          onClick={() => router.push("/admin/blogs")}
          className="group flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-black text-[10px] uppercase tracking-[0.2em]"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back to Blogs
        </button>

        <div className="flex items-center gap-3">
          {blog && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-full text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 transition-colors group/link"
            >
              <ExternalLink
                size={12}
                className="text-indigo-500 dark:text-indigo-400 group-hover/link:text-white transition-colors"
              />
              View Live Story
            </a>
          )}

          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-100 dark:border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Cloud Sync Active
            </span>
          </div>
        </div>
      </div>

      <BlogAlert />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Workspace (Left) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-white/2 rounded-2xl border border-slate-200 dark:border-slate-800/60 overflow-hidden group/card">
            <div
              onClick={() => {
                setPickImageFor("main_image");
                setShowPicker(true);
              }}
              className="relative h-72 w-full bg-slate-50 dark:bg-white/2 border-b border-slate-100 dark:border-slate-800/60 cursor-pointer overflow-hidden"
            >
              {post.main_image ? (
                <>
                  <img
                    src={post.main_image}
                    alt="Cover"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                    <div className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl">
                      Replace Header Media
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPost({ ...post, main_image: "" });
                      }}
                      className="p-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-300 dark:text-slate-700 group-hover/card:text-indigo-500 dark:group-hover/card:text-indigo-400 transition-colors">
                  <div className="p-6 rounded-2xl bg-white dark:bg-white/5 shadow-sm mb-4 group-hover/card:scale-110 transition-all duration-500 border border-slate-50 dark:border-slate-800">
                    <ImagePlus size={32} strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                    Upload Cover Image
                  </p>
                </div>
              )}
            </div>

            <div className="p-8 md:p-12">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 block mb-5">
                Headline
              </label>
              <textarea
                placeholder="The title of your story..."
                className="w-full text-3xl md:text-5xl font-black border-none focus:ring-0 placeholder-slate-100 dark:placeholder-slate-800 p-0 text-slate-900 dark:text-white leading-[1.1] resize-none min-h-[100px] selection:bg-indigo-100 dark:selection:bg-indigo-500/30 bg-transparent"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-white/2 rounded-2xl border border-slate-200 dark:border-slate-800/60 overflow-hidden relative">
            {editor && (
              <div className="sticky top-4 z-30 mx-auto max-w-fit px-5 py-2.5 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl rounded-2xl flex items-center gap-1 shadow-2xl shadow-slate-900/20 border border-slate-800">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2.5 rounded-lg transition-colors ${editor.isActive("bold") ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                >
                  <Bold size={16} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2.5 rounded-lg transition-colors ${editor.isActive("italic") ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                >
                  <Italic size={16} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-2.5 rounded-lg transition-colors ${editor.isActive("underline") ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                >
                  <UnderlineIcon size={16} />
                </button>
                <div className="w-px h-5 bg-slate-700 mx-2" />
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`px-3 py-2 rounded-lg text-[10px] font-black transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                >
                  H2
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`p-2.5 rounded-lg transition-colors ${editor.isActive("bulletList") ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                >
                  <List size={16} />
                </button>
                <div className="w-px h-5 bg-slate-700 mx-2" />
                <button
                  onClick={() => {
                    setPickImageFor("blog_content");
                    setShowPicker(true);
                  }}
                  className="p-2.5 rounded-lg text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors flex items-center gap-2 group/btn"
                >
                  <ImageIcon size={16} />{" "}
                  <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">
                    Add Media
                  </span>
                </button>
              </div>
            )}
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Sidebar Settings (Right) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          <div className="bg-white dark:bg-white/2 p-8 rounded-2xl border border-slate-200 dark:border-slate-800/60 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 border-b border-slate-50 dark:border-slate-800/60 pb-5 flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-400" /> Story
              Parameters
            </h4>

            <div className="space-y-1">
              <label className={labelStyle}>
                <Calendar size={14} className="text-indigo-500 dark:text-indigo-400" /> Publication
                Date
              </label>
              <input
                type="date"
                value={post?.published_at || ""}
                onChange={(e) =>
                  setPost({ ...post, published_at: e.target.value })
                }
                className={`${inputStyle} cursor-pointer scheme-light dark:scheme-dark`}
              />
            </div>

            <div className="space-y-1">
              <label className={labelStyle}>
                <User size={14} className="text-indigo-500 dark:text-indigo-400" /> Lead Author
              </label>
              <input
                type="text"
                value={post.author}
                onChange={(e) => setPost({ ...post, author: e.target.value })}
                placeholder="Full name"
                className={inputStyle}
              />
            </div>

            <div className="space-y-1">
              <label className={labelStyle}>
                <Tag size={14} className="text-indigo-500 dark:text-indigo-400" /> Display Category
              </label>
              <input
                type="text"
                value={post.badge}
                onChange={(e) => setPost({ ...post, badge: e.target.value })}
                placeholder="e.g. Community Update"
                className={inputStyle}
              />
            </div>

            <div className="space-y-1">
              <label className={labelStyle}>
                <FileText size={14} className="text-indigo-500 dark:text-indigo-400" /> SEO Metadata
              </label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                placeholder="Brief description for social sharing..."
                className={`${inputStyle} min-h-[110px] leading-relaxed resize-none font-medium`}
              />
            </div>

            <div className="space-y-3">
              <label className={labelStyle}>
                <Hash size={14} className="text-indigo-500 dark:text-indigo-400" /> Semantic Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-900 dark:bg-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded-lg"
                  >
                    {cat}{" "}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-rose-400 transition-colors"
                      onClick={() =>
                        setPost({
                          ...post,
                          categories: post.categories.filter(
                            (_, idx) => idx !== i,
                          ),
                        })
                      }
                    />
                  </span>
                ))}
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && categoryInput) {
                      setPost({
                        ...post,
                        categories: [...post.categories, categoryInput.trim()],
                      });
                      setCategoryInput("");
                    }
                  }}
                  placeholder="+ Add Tag"
                  className="bg-slate-50 dark:bg-white/5 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 focus:text-indigo-600 dark:focus:text-indigo-400 outline-none w-28"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] shadow-sm transition-all active:scale-95
              ${isSaving ? "bg-slate-100 text-slate-300 dark:bg-white/5 dark:text-slate-600 cursor-not-allowed shadow-none" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            {blog ? "Sync Changes" : "Publish Story"}
          </button>
        </div>
      </div>

      {showPicker && (
        <ImagePicker
          onSelect={handleImageSelect}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
};

export default BlogEditor;
