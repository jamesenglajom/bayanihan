"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  GripVertical,
  Trash2,
  Plus,
  ChevronDown,
  Save,
  XCircle,
  CheckCircle2,
  HelpCircle,
  RefreshCcw,
  Loader2,
} from "lucide-react";

export default function FaqManager() {
  const [faqs, setFaqs] = useState([]);
  const [originalFaqs, setOriginalFaqs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges = JSON.stringify(faqs) !== JSON.stringify(originalFaqs);

  // 1. Rearrange logic
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(faqs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFaqs(items);
  };

  const addFaq = () => {
    const newFaq = { id: Date.now().toString(), question: "", answer: "" };
    setFaqs([newFaq, ...faqs]);
    setEditingId(newFaq.id);
  };

  const updateFaq = (id, field, value) => {
    setFaqs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const deleteFaq = (id) => {
    setFaqs(faqs.filter((item) => item.id !== id));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/faqs/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqs),
      });

      if (response.ok) {
        setOriginalFaqs(faqs);
        // Using a more modern notification style would be better than alert, 
        // but keeping logic consistent with your snippet.
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAbort = () => {
    if (confirm("Discard all unsaved changes? This cannot be undone.")) {
      setFaqs(originalFaqs);
      setEditingId(null);
    }
  };

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const response = await fetch("/api/faqs");
        const initData = await response.json();
        setFaqs(initData || []);
        setOriginalFaqs(initData || []);
      } catch (err) {
        console.error("Load error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadFaqs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing Registry</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 antialiased">
      
      {/* BAYANIHAN TOP BAR */}
      <div className="sticky top-0 z-50 mb-10 -mx-4 px-4 py-6 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <HelpCircle size={20} className="text-indigo-600" /> FAQ Registry
          </h1>
          <div className="mt-1">
            {hasChanges ? (
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Draft Mode: Unsaved Modifications
              </span>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1.5">
                <CheckCircle2 size={12} /> Live Sync: Up to Date
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {hasChanges && (
            <button
              onClick={handleAbort}
              className="flex-1 sm:flex-none px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
            >
              Abort Changes
            </button>
          )}
          <button
            disabled={!hasChanges || isSaving}
            onClick={handleSaveAll}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-100/50 
              ${hasChanges 
                ? "bg-slate-900 text-white hover:bg-indigo-600" 
                : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"}`}
          >
            {isSaving ? <RefreshCcw size={14} className="animate-spin" /> : <Save size={14} />}
            Commit Changes
          </button>
        </div>
      </div>

      {/* ACTION: ADD NEW */}
      <button
        onClick={addFaq}
        className="w-full mb-8 group flex flex-col items-center justify-center py-8 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300"
      >
        <div className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 shadow-sm mb-3">
            <Plus size={20} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-indigo-600 transition-colors">Append New Entry</span>
      </button>

      {/* DRAGGABLE LIST */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="faq-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <Draggable key={faq.id} draggableId={faq.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`group bg-white border rounded-[2rem] transition-all duration-300 overflow-hidden
                        ${snapshot.isDragging 
                          ? "shadow-[0_20px_50px_rgba(79,70,229,0.15)] ring-2 ring-indigo-500 border-transparent z-[100] scale-[1.02]" 
                          : "shadow-sm border-slate-100 hover:border-slate-300"}`}
                    >
                      <div className="p-6 md:p-8 flex items-start gap-6">
                        {/* DRAG HANDLE */}
                        <div
                          {...provided.dragHandleProps}
                          className="mt-1 text-slate-300 hover:text-indigo-500 cursor-grab active:cursor-grabbing transition-colors"
                        >
                          <GripVertical size={20} />
                        </div>

                        {/* CONTENT AREA */}
                        <div className="flex-1 min-w-0 space-y-4">
                          <div className="relative">
                            <label className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-2 block px-1">Question</label>
                            <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                                placeholder="State the inquiry..."
                                className="w-full text-lg font-bold text-slate-900 border-none focus:ring-0 placeholder:text-slate-200 bg-transparent p-0 leading-snug"
                            />
                          </div>

                          {(editingId === faq.id || faq.question === "") && (
                            <div className="pt-4 border-t border-slate-50 animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Detailed Resolution</label>
                                <textarea
                                    value={faq.answer}
                                    onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                                    placeholder="Provide a comprehensive answer..."
                                    rows={4}
                                    className="w-full p-6 bg-slate-50 border-none rounded-2xl text-slate-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium leading-relaxed"
                                />
                            </div>
                          )}
                        </div>

                        {/* ACTIONS COLUMN */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => setEditingId(editingId === faq.id ? null : faq.id)}
                            className={`p-3 rounded-2xl transition-all duration-300 ${
                              editingId === faq.id
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                                : "text-slate-400 bg-slate-50 hover:bg-slate-100"
                            }`}
                          >
                            <ChevronDown
                              className={`transition-transform duration-500 ${editingId === faq.id ? "rotate-180" : ""}`}
                              size={18}
                            />
                          </button>
                          <button
                            onClick={() => deleteFaq(faq.id)}
                            className="p-3 text-slate-400 hover:text-white hover:bg-rose-500 rounded-2xl transition-all duration-300"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* EMPTY STATE */}
      {faqs.length === 0 && (
        <div className="py-20 text-center">
            <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">The knowledge base is currently empty</p>
        </div>
      )}
    </div>
  );
}