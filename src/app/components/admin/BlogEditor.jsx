"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold, Italic, List, ImageIcon, Save, User, Tag,
  Link as LinkIcon, Clock, X, Hash, Plus, FileText,
  ImagePlus, ChevronLeft, Sparkles, Loader2, Underline as UnderlineIcon
} from "lucide-react";
import ImagePicker from "@/app/components/admin/ImagePicker";

const BlogAlert = () => {
  return (
    <div className="flex items-start gap-5 p-6 mb-10 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] shadow-sm backdrop-blur-sm">
      <div className="flex-shrink-0 p-3 bg-white rounded-2xl shadow-sm text-indigo-600 border border-indigo-50">
        <ImagePlus size={24} />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-900 flex items-center gap-2">
          <Sparkles size={14} className="animate-pulse" /> Media Assets Guide
        </h3>
        <p className="text-sm text-indigo-800/80 leading-relaxed font-medium">
          To include new images in your story, follow the <strong className="text-indigo-900 font-black">BES Cloud</strong> media workflow:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-3">
          <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 bg-white/50 px-3 py-1.5 rounded-lg border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Request cloud optimization from DEV.
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 bg-white/50 px-3 py-1.5 rounded-lg border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Format: /images/blogs/filename.webp
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogEditor = ({ blog }) => {
  const [post, setPost] = useState({
    id: blog?.id || null,
    title: blog?.title || "",
    excerpt: blog?.excerpt || "",
    author: blog?.author || "",
    badge: blog?.badge || "",
    handle: blog?.handle || "",
    read_duration: blog?.read_duration || "",
    main_image: blog?.main_image || "",
    categories: blog?.categories || [],
    content: !blog ? "" : blog?.content,
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickImageFor, setPickImageFor] = useState("main_image");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Image, Underline, Typography,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-indigo-600 underline font-bold" } }),
      Placeholder.configure({ placeholder: "Type your story here..." }),
    ],
    content: post?.content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none focus:outline-none min-h-[500px] p-8 md:p-12 text-slate-700 leading-relaxed",
      },
    },
  });

  // --- Handlers ---
  const handleSave = async () => {
    if (!post.title.trim()) return alert("Title is required.");
    setIsSaving(true);
    // ... (Your existing fetch logic remains the same)
    setTimeout(() => setIsSaving(false), 1500); // UI Mockup delay
  };

  const handleImageSelect = (url) => {
    if(pickImageFor === "main_image") setPost({ ...post, main_image: url });
    else if (url) editor.chain().focus().setImage({ src: url }).run();
    setShowPicker(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-6 md:p-10 antialiased">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-sm uppercase tracking-widest">
            <ChevronLeft size={18} /> Back to Library
        </button>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BES Cloud Synchronized</span>
        </div>
      </div>

      <BlogAlert />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Editor Core */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Headline & Cover Section */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div 
              onClick={() => { setPickImageFor("main_image"); setShowPicker(true); }}
              className={`relative h-72 w-full group transition-all duration-500 cursor-pointer overflow-hidden
                ${post.main_image ? "bg-slate-100" : "bg-slate-50 border-b border-slate-100"}`}
            >
              {post.main_image ? (
                <>
                  <img src={post.main_image} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                    <div className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Change Cover</div>
                    <button onClick={(e) => { e.stopPropagation(); setPost({...post, main_image: ""}); }} className="p-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 shadow-xl"><X size={20}/></button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-300 group-hover:text-indigo-600 transition-colors">
                  <div className="p-5 rounded-3xl bg-white shadow-sm mb-4 group-hover:shadow-indigo-100 transition-all">
                    <ImagePlus size={40} strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest">Assign Cover Media</p>
                </div>
              )}
            </div>

            <div className="p-8 md:p-12">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 block mb-4">Master Headline</label>
                <textarea
                    placeholder="Enter story title..."
                    className="w-full text-4xl md:text-5xl font-black border-none focus:ring-0 placeholder-slate-200 p-0 text-slate-900 leading-tight resize-none min-h-[100px]"
                    value={post.title}
                    onChange={(e) => setPost({...post, title: e.target.value})}
                />
            </div>
          </div>

          {/* Tiptap Canvas */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            {editor && (
              <div className="sticky top-4 z-30 mx-4 mt-4 px-4 py-2 bg-slate-900/95 backdrop-blur-md rounded-2xl flex items-center gap-1 overflow-x-auto shadow-2xl shadow-indigo-900/20">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('bold') ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Bold size={18}/></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('italic') ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Italic size={18}/></button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('underline') ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><UnderlineIcon size={18}/></button>
                <div className="w-px h-6 bg-slate-700 mx-2" />
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>H2</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('bulletList') ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><List size={18}/></button>
                <div className="w-px h-6 bg-slate-700 mx-2" />
                <button onClick={() => { setPickImageFor("blog_content"); setShowPicker(true); }} className="p-2.5 rounded-xl text-slate-400 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-auto">
                    <ImageIcon size={18} /> <span className="hidden sm:inline">Add Photo</span>
                </button>
              </div>
            )}
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Right Column: Sidebar Configuration */}
        <div className="space-y-6 lg:sticky lg:top-10">
          
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-4">Configuration</h4>
            
            {/* Field: Author */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                    <User size={14} className="text-indigo-500" /> Writer
                </label>
                <input 
                    type="text" value={post.author} 
                    onChange={(e) => setPost({...post, author: e.target.value})}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all outline-none"
                />
            </div>

            {/* Field: Label */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                    <Tag size={14} className="text-indigo-500" /> Category Badge
                </label>
                <input 
                    type="text" value={post.badge} 
                    onChange={(e) => setPost({...post, badge: e.target.value})}
                    placeholder="News, Update, Story"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white transition-all outline-none"
                />
            </div>

            {/* Field: Excerpt */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                    <FileText size={14} className="text-indigo-500" /> Social Excerpt
                </label>
                <textarea 
                    value={post.excerpt} 
                    onChange={(e) => setPost({...post, excerpt: e.target.value})}
                    placeholder="Short summary for SEO..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-medium focus:bg-white transition-all outline-none min-h-[100px] leading-relaxed resize-none"
                />
            </div>

            {/* Field: Categories */}
            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                    <Hash size={14} className="text-indigo-500" /> Tags
                </label>
                <div className="flex flex-wrap gap-2">
                    {post.categories.map((cat, i) => (
                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                            {cat} <X size={10} className="cursor-pointer hover:text-red-400" onClick={() => setPost({...post, categories: post.categories.filter((_, idx) => idx !== i)})} />
                        </span>
                    ))}
                    <input 
                        type="text" value={categoryInput} 
                        onChange={(e) => setCategoryInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && categoryInput) {
                                setPost({...post, categories: [...post.categories, categoryInput]});
                                setCategoryInput("");
                            }
                        }}
                        placeholder="+ Add Tag"
                        className="w-24 bg-transparent text-[10px] font-bold focus:outline-none"
                    />
                </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center justify-center gap-3 w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 text-xs
              ${isSaving ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"}`}
          >
            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {blog ? "Sync Changes" : "Publish Story"}
          </button>
        </div>
      </div>

      {showPicker && <ImagePicker onSelect={handleImageSelect} onClose={() => setShowPicker(false)} />}
    </div>
  );
};

export default BlogEditor;