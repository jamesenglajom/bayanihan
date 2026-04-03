"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Use Next.js Link for internal navigation
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import {
  Bold, Italic, List, ImageIcon, Save, User, Tag,
  X, Hash, FileText, ExternalLink,
  ImagePlus, ChevronLeft, Sparkles, Loader2, Underline as UnderlineIcon
} from "lucide-react";
import ImagePicker from "@/app/components/admin/ImagePicker";

const BlogAlert = () => {
  return (
    <div className="flex items-start gap-5 p-6 mb-10 bg-indigo-50/40 border border-indigo-100/50 rounded-[2rem] shadow-sm backdrop-blur-sm">
      <div className="flex-shrink-0 p-3 bg-white rounded-2xl shadow-sm text-indigo-600 border border-indigo-50">
        <ImagePlus size={22} />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-900 flex items-center gap-2">
          <Sparkles size={14} className="animate-pulse text-indigo-400" /> Media Assets Guide
        </h3>
        <p className="text-sm text-indigo-800/80 leading-relaxed font-medium">
          To maintain site performance, please use the <strong className="text-indigo-900 font-black">BES Library</strong> workflow for all story assets.
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
        HTMLAttributes: { class: "text-indigo-600 underline font-bold" } 
      }),
      Placeholder.configure({ placeholder: "Start writing your masterpiece..." }),
    ],
    content: post.content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none focus:outline-none min-h-[600px] p-8 md:p-16 text-slate-700 leading-relaxed text-lg",
      },
    },
  });

  const handleSave = async () => {
    if (!post.title.trim()) return;
    setIsSaving(true);
    // Your actual API call would go here
    // e.g., await fetch('/api/blogs', { method: 'POST', body: JSON.stringify(post) })
    setTimeout(() => setIsSaving(false), 1200);
  };

  const handleImageSelect = (url) => {
    if (pickImageFor === "main_image") setPost({ ...post, main_image: url });
    else if (url && editor) editor.chain().focus().setImage({ src: url }).run();
    setShowPicker(false);
  };

  // Logic for dynamic live preview URL
  const liveUrl = `/blog/${post.handle || post.id}`;
  
  const labelStyle = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-2 px-1";
  const inputStyle = "w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 transition-all outline-none placeholder:text-slate-300 shadow-inner-sm";

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 antialiased text-slate-900">
      
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
        <button 
          onClick={() => router.push("/admin/blogs")}
          className="group flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-black text-[10px] uppercase tracking-[0.2em]"
        >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blogs
        </button>

        <div className="flex items-center gap-4">
            {blog && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm group/link"
              >
                <ExternalLink size={12} className="text-indigo-500 group-hover/link:text-white transition-colors" />
                View Live Story
              </a>
            )}

            <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Cloud Sync Active</span>
            </div>
        </div>
      </div>

      <BlogAlert />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Main Workspace (Left) */}
        <div className="lg:col-span-8 space-y-10">
          
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden group/card">
            <div 
              onClick={() => { setPickImageFor("main_image"); setShowPicker(true); }}
              className="relative h-80 w-full bg-slate-50 border-b border-slate-100 cursor-pointer overflow-hidden"
            >
              {post.main_image ? (
                <>
                  <img src={post.main_image} alt="Cover" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                    <div className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl">Replace Header Media</div>
                    <button onClick={(e) => { e.stopPropagation(); setPost({...post, main_image: ""}); }} className="p-3 bg-rose-500 text-white rounded-2xl hover:bg-rose-600 shadow-xl transition-all"><X size={20}/></button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-300 group-hover/card:text-indigo-500 transition-colors">
                  <div className="p-6 rounded-[2rem] bg-white shadow-sm mb-4 group-hover/card:scale-110 group-hover/card:shadow-indigo-100 transition-all duration-500 border border-slate-50">
                    <ImagePlus size={32} strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Upload Cover Image</p>
                </div>
              )}
            </div>

            <div className="p-10 md:p-14">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 block mb-6">Headline</label>
                <textarea
                    placeholder="The title of your story..."
                    className="w-full text-4xl md:text-6xl font-black border-none focus:ring-0 placeholder-slate-100 p-0 text-slate-900 leading-[1.1] resize-none min-h-[120px] selection:bg-indigo-100"
                    value={post.title}
                    onChange={(e) => setPost({...post, title: e.target.value})}
                />
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative">
            {editor && (
              <div className="sticky top-6 z-40 mx-auto max-w-fit px-5 py-2.5 bg-slate-900/90 backdrop-blur-xl rounded-2xl flex items-center gap-1 shadow-2xl shadow-slate-900/20 border border-slate-800">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('bold') ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><Bold size={16}/></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('italic') ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><Italic size={16}/></button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('underline') ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><UnderlineIcon size={16}/></button>
                <div className="w-px h-5 bg-slate-700 mx-2" />
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>H2</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('bulletList') ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><List size={16}/></button>
                <div className="w-px h-5 bg-slate-700 mx-2" />
                <button onClick={() => { setPickImageFor("blog_content"); setShowPicker(true); }} className="p-2.5 rounded-xl text-slate-400 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2 group/btn">
                    <ImageIcon size={16} /> <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Add Media</span>
                </button>
              </div>
            )}
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Sidebar Settings (Right) */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-10">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-50 pb-6 flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-400" /> Story Parameters
            </h4>
            
            <div className="space-y-1">
                <label className={labelStyle}><User size={14} className="text-indigo-500" /> Lead Author</label>
                <input type="text" value={post.author} onChange={(e) => setPost({...post, author: e.target.value})} placeholder="Full name" className={inputStyle} />
            </div>

            <div className="space-y-1">
                <label className={labelStyle}><Tag size={14} className="text-indigo-500" /> Display Category</label>
                <input type="text" value={post.badge} onChange={(e) => setPost({...post, badge: e.target.value})} placeholder="e.g. Community Update" className={inputStyle} />
            </div>

            <div className="space-y-1">
                <label className={labelStyle}><FileText size={14} className="text-indigo-500" /> SEO Metadata</label>
                <textarea 
                    value={post.excerpt} 
                    onChange={(e) => setPost({...post, excerpt: e.target.value})}
                    placeholder="Brief description for social sharing..."
                    className={`${inputStyle} min-h-[120px] leading-relaxed resize-none font-medium`}
                />
            </div>

            <div className="space-y-4">
                <label className={labelStyle}><Hash size={14} className="text-indigo-500" /> Semantic Tags</label>
                <div className="flex flex-wrap gap-2">
                    {post.categories.map((cat, i) => (
                        <span key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-slate-200">
                            {cat} <X size={12} className="cursor-pointer hover:text-rose-400 transition-colors" onClick={() => setPost({...post, categories: post.categories.filter((_, idx) => idx !== i)})} />
                        </span>
                    ))}
                    <input 
                        type="text" value={categoryInput} 
                        onChange={(e) => setCategoryInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && categoryInput) {
                                setPost({...post, categories: [...post.categories, categoryInput.trim()]});
                                setCategoryInput("");
                            }
                        }}
                        placeholder="+ Add Tag"
                        className="bg-slate-50 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 focus:text-indigo-600 outline-none w-28"
                    />
                </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center justify-center gap-3 w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl transition-all active:scale-95
              ${isSaving ? "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"}`}
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {blog ? "Sync Changes" : "Publish Story"}
          </button>
        </div>
      </div>

      {showPicker && <ImagePicker onSelect={handleImageSelect} onClose={() => setShowPicker(false)} />}
    </div>
  );
};

export default BlogEditor;