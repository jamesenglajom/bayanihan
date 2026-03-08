"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Bold, Italic, List, ImageIcon, Save, User } from "lucide-react";

const BlogEditor = ({ onSave }) => {
  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    author: "",
  });

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Start writing your story...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[300px] p-4 border rounded-b-lg border-neutral-300",
      },
    },
  });

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const handleSave = () => {
    const data = {
      ...post,
      content: editor.getJSON(), // Best for Upstash storage
      updatedAt: Date.now(),
    };
    onSave(data);
  };

  return (
    <div className="max-w-4xl space-y-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
      {/* Header / Title */}
      <input
        type="text"
        placeholder="Title"
        className="w-full text-4xl font-bold border-none focus:ring-0 placeholder-slate-300"
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />

      {/* Author & Excerpt Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <User className="text-slate-400 w-5" />
          <input
            type="text"
            placeholder="Author Name"
            className="w-full border-none focus:ring-0 text-slate-600"
            onChange={(e) => setPost({ ...post, author: e.target.value })}
          />
        </div>
      </div>
      <div className="mt-4">
        <textarea
          placeholder="Short excerpt..."
          className="w-full border-b border-slate-100 focus:ring-0 text-slate-500 italic"
          onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
        />
      </div>
      {/* Editor Toolbar */}
      <div className="mt-4">
        <div className="flex gap-2 p-2 bg-slate-50 border border-b-0 border-neutral-300 rounded-t-lg">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="p-1 hover:bg-white rounded"
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="p-1 hover:bg-white rounded"
          >
            <Italic size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="p-1 hover:bg-white rounded"
          >
            <List size={18} />
          </button>
          <button
            onClick={addImage}
            className="p-1 hover:bg-white rounded text-blue-600"
          >
            <ImageIcon size={18} />
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>

      {/* Save Button using your theme-blue */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-2 bg-theme-blue text-white rounded-lg hover:opacity-90 transition-all font-medium"
      >
        <Save size={18} /> Publish Post
      </button>
    </div>
  );
};

export default BlogEditor;
