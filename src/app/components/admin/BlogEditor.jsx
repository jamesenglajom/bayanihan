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
  Bold,
  Italic,
  List,
  ImageIcon,
  Save,
  User,
  Tag,
  Link as LinkIcon,
  Clock,
  Image as FileImage,
  X,
  Hash,
  Plus,
  FileText,
  Info,
  ImagePlus,
} from "lucide-react";
import ImagePicker from "@/app/components/admin/ImagePicker";

const BlogAlert = () => {
  return (
    <div className="flex items-start gap-4 p-5 mb-8 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
      <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm text-indigo-600">
        <ImagePlus size={20} />
      </div>
      <div className="space-y-2">
        <h3 className="text-xs font-black uppercase tracking-widest text-indigo-900">
          Media Assets Guide
        </h3>
        <p className="text-sm text-indigo-800/80 leading-relaxed">
          To include new images in your story, please follow the{" "}
          <strong>BES Cloud</strong> media workflow:
        </p>

        <ul className="grid gap-2">
          <li className="flex items-center gap-2 text-xs font-medium text-indigo-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Send high-res files to the developer for cloud optimization.
          </li>
          <li className="flex items-center gap-2 text-xs font-medium text-indigo-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Use the reserved path format:{" "}
            <code className="px-1.5 py-0.5 bg-white border border-indigo-200 rounded font-mono text-indigo-600">
              /images/blogs/your-image.webp
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
};

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const calculateReadTime = (text) => {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  return Math.ceil(noOfWords / wordsPerMinute);
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
    content: !blog ? "<p>Start writing your story...</p>" : blog?.content,
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [pickImageFor, setPickImageFor] = useState("main_image");

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // We configure heading to only allow specific levels
        heading: { levels: [2, 3] },
      }),
      Image,
      Underline,
      Typography,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-bes-blue underline", // Matches your frontend style
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your story...",
      }),
    ],
    content: post?.content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[400px] p-6 bg-white rounded-b-xl border border-slate-200",
      },
    },
  });

  const generateId = () => {
    // 1. Get current timestamp (e.g., 1715634821000)
    const timestamp = Date.now().toString(36); // Convert to Base36 for shorter length

    // 2. Generate a shorter random suffix (6 characters)
    const randomPart = Math.random().toString(36).substring(2, 8);

    // Result format: blog_lvj8q2w_4k9z2x
    return `${timestamp}_${randomPart}`;
  };
  // ###UNFINISHED
  const handleImageSelect = (url) => {
    if(pickImageFor==="main_image"){
      setPost({ ...post, main_image: url });
    }else{
      if (url) editor.chain().focus().setImage({ src: url }).run();
    }
    // showPicker is closed automatically by the internal logic, 
    // but we can ensure it here too:
    setShowPicker(false);
  };
  
  const handleSetMainImage = () => {
    setPickImageFor("main_image");
    setShowPicker(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setPost((prev) => ({
      ...prev,
      title: val,
      handle:
        prev.handle === generateSlug(prev.title)
          ? generateSlug(val)
          : prev.handle,
    }));
  };

  const addCategory = (e) => {
    if ((e.key === "Enter" || e.key === ",") && categoryInput.trim()) {
      e.preventDefault();
      const newCat = categoryInput.trim().replace(/,/g, "");
      if (!post.categories.includes(newCat)) {
        setPost({ ...post, categories: [...post.categories, newCat] });
      }
      setCategoryInput("");
    }
  };

  const removeCategory = (index) => {
    setPost({
      ...post,
      categories: post.categories.filter((_, i) => i !== index),
    });
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

    // Construct the final payload
    const data = {
      ...post,
      id: post.id || `${generateId()}`, // Use existing ID or generate new one
      content: editor.getJSON(),
      read_duration: finalReadDuration,
      handle: post.handle || generateSlug(post.title),
      updated_at: new Date().toISOString(),
      created_at: post.created_at || new Date().toISOString(),
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

      const result = await response.json();
      console.log("Success:", result);

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

  useEffect(() => {
    if (blog) {
      console.log("blog", blog);
      setPost((prev) => ({ ...blog }));
    }
  }, [blog]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-8 bg-slate-50/50 min-h-screen">
      <BlogAlert />
      {/* --- Section: Media & Title --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
          Cover Media
        </label>
        <div
          onClick={!post.main_image ? handleSetMainImage : undefined}
          className={`relative group w-full h-64 rounded-xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center 
            ${post.main_image ? "border-transparent shadow-inner" : "border-slate-300 bg-slate-50 hover:border-[#003566] hover:bg-blue-50/50 cursor-pointer"}`}
        >
          {post.main_image ? (
            <>
              <img
                src={post.main_image}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  onClick={handleSetMainImage}
                  className="px-5 py-2 bg-white text-slate-900 rounded-lg font-bold shadow-xl hover:scale-105 transition-transform"
                >
                  Change URL
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPost({ ...post, main_image: "" });
                  }}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-xl"
                >
                  <X size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <Plus
                size={32}
                className="mx-auto text-slate-400 mb-2 group-hover:text-[#003566] transition-colors"
              />
              <p className="font-bold text-slate-600 group-hover:text-[#003566]">
                Set Main Image URL
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Headline
          </label>
          <input
            type="text"
            placeholder="Enter a captivating title..."
            className="w-full text-4xl font-black border-none focus:ring-0 placeholder-slate-200 p-0 text-slate-900"
            value={post.title}
            onChange={handleTitleChange}
          />
        </div>
      </div>

      {/* --- Section: Metadata Grid --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-4">
          Post Configuration
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Author Field */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:bg-white transition-all">
            <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400">
              <User size={18} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                Author
              </p>
              <input
                type="text"
                placeholder="Name of writer"
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-semibold text-slate-700 placeholder-slate-300"
                value={post?.author || ""}
                onChange={(e) => setPost({ ...post, author: e.target.value })}
              />
            </div>
          </div>

          {/* Badge Field */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:bg-white transition-all">
            <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400">
              <Tag size={18} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                Label Badge
              </p>
              <input
                type="text"
                placeholder="e.g. Community News"
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-semibold text-slate-700 placeholder-slate-300"
                value={post?.badge}
                onChange={(e) => setPost({ ...post, badge: e.target.value })}
              />
            </div>
          </div>

          {/* URL Handle Field */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:bg-white transition-all">
            <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400">
              <LinkIcon size={18} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                URL Handle
              </p>
              <input
                type="text"
                placeholder="slug-format"
                value={post.handle}
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-mono text-blue-600 font-bold"
                onChange={(e) => setPost({ ...post, handle: e.target.value })}
              />
            </div>
          </div>

          {/* Read Duration Field */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:bg-white transition-all">
            <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400">
              <Clock size={18} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                Read Time
              </p>
              <input
                type="text"
                placeholder="Auto-calculated"
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-semibold text-slate-700 placeholder-slate-300"
                value={post?.read_duration}
                onChange={(e) =>
                  setPost({ ...post, read_duration: e.target.value })
                }
              />
            </div>
          </div>

          {/* Categories Section */}
          <div className="md:col-span-2 space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400">
                <Hash size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  Categories
                </p>
                <input
                  type="text"
                  placeholder="Press Enter to add category tags..."
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={addCategory}
                  className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-semibold text-slate-700"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
              {post.categories.length > 0 ? (
                post.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#003566] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm"
                  >
                    {cat}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-red-300"
                      onClick={() => removeCategory(i)}
                    />
                  </span>
                ))
              ) : (
                <span className="text-[10px] font-bold text-slate-300 uppercase italic">
                  No categories added yet
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Section: Excerpt & Content --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
          Content Summary & Story
        </label>
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <FileText size={20} className="text-slate-400 mt-1" />
          <textarea
            placeholder="Briefly describe what this post is about for the search cards..."
            className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-600 italic font-serif leading-relaxed min-h-[80px] resize-none"
            value={post?.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
          />
        </div>

        {editor && (
          <div className="mt-6">
            <div className="flex items-center gap-1 p-2 bg-slate-800 text-slate-200 border-x border-t border-slate-800 rounded-t-xl overflow-x-auto">
              <button
                title="Bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Bold size={16} />
              </button>
              <button
                title="Italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Italic size={16} />
              </button>

              {/* Add Underline */}
              <button
                title="Underline"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded-lg ${editor.isActive("underline") ? "bg-blue-600" : "hover:bg-slate-700"}`}
              >
                <u className="text-sm font-bold">U</u>
              </button>
              <div className="w-px h-6 bg-slate-600 mx-1" />
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                title="Heading 2"
                className={`p-2 px-3 rounded-lg text-xs font-black ${editor.isActive("heading", { level: 2 }) ? "bg-blue-600" : "hover:bg-slate-700"}`}
              >
                H2
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                title="Heading 3"
                className={`p-2 px-3 rounded-lg text-xs font-black ${editor.isActive("heading", { level: 3 }) ? "bg-blue-600" : "hover:bg-slate-700"}`}
              >
                H3
              </button>

              {/* <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                title="Heading 4"
                className={`p-2 px-3 rounded-lg text-xs font-black ${editor.isActive("heading", { level: 4 }) ? "bg-blue-600" : "hover:bg-slate-700"}`}
              >
                H4
              </button> */}

              <div className="w-px h-6 bg-slate-600 mx-1" />
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <List size={16} />
              </button>

              <div className="w-px h-6 bg-slate-600 mx-1" />

              {/* Add Link */}
              <button
                onClick={addLink}
                className={`p-2 rounded-lg ${editor.isActive("link") ? "bg-blue-600" : "hover:bg-slate-700"}`}
              >
                <LinkIcon size={16} />
              </button>

              <button
                onClick={() => {
                  setPickImageFor("blog_content");
                  setShowPicker(true);
                }}
                className="p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
              >
                <ImageIcon size={16} /> <span>Insert Photo</span>
              </button>
            </div>
            <EditorContent editor={editor} />
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`
      flex items-center gap-3 px-10 py-5 rounded-2xl transition-all 
      font-black uppercase tracking-widest shadow-2xl w-full md:w-auto justify-center
      ${
        isSaving
          ? "bg-slate-400 cursor-not-allowed opacity-80"
          : "bg-[#003566] hover:bg-[#001d3d] hover:scale-[1.02] shadow-blue-900/30 active:scale-95"
      }
      text-white
    `}
        >
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Syncing...</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>{blog ? "Update" : "Create"}</span>
            </>
          )}
        </button>
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
