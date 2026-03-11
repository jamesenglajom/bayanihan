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
} from "lucide-react";

export default function FaqManager() {
  const [faqs, setFaqs] = useState([]);
  const [originalFaqs, setOriginalFaqs] = useState([]); // Tracks baseline for "Abort"
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if anything has changed compared to the last saved state
  const hasChanges = JSON.stringify(faqs) !== JSON.stringify(originalFaqs);

  // 1. Rearrange logic
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(faqs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFaqs(items);
  };

  // 2. Add new item
  const addFaq = () => {
    const newFaq = { id: Date.now().toString(), question: "", answer: "" };
    setFaqs([newFaq, ...faqs]);
    setEditingId(newFaq.id);
  };

  // 3. Update existing item
  const updateFaq = (id, field, value) => {
    setFaqs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  // 4. Delete item
  const deleteFaq = (id) => {
    setFaqs(faqs.filter((item) => item.id !== id));
  };

  // 5. Save All Changes
  const handleSaveAll = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/faqs/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faqs), // Send the current faqs state
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setOriginalFaqs(faqs); // Update baseline so "Abort" hides
        alert("Changes saved to Redis!");
      } else {
        throw new Error(result.error || "Save failed");
      }
    } catch (err) {
      alert("Error saving: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Abort Changes
  const handleAbort = () => {
    if (confirm("Discard all unsaved changes? This cannot be undone.")) {
      setFaqs(originalFaqs);
      setEditingId(null);
    }
  };

  useEffect(() => {
    const initFAQObject = async () => {
      try {
        const response = await fetch("/api/faqs");
        if (!response.ok) throw new Error("Network response was not ok");

        const initData = await response.json();
        setFaqs(initData);
        setOriginalFaqs(initData);
      } catch (err) {
        console.error("Load error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    initFAQObject();
  }, []);
  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Header with Save/Abort Controls */}
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-gray-50/90 backdrop-blur-sm py-4 z-10 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ Editor</h1>
          <p className="text-sm text-gray-500">
            {hasChanges ? (
              <span className="text-amber-600 font-medium flex items-center gap-1">
                <XCircle size={14} /> Unsaved changes detected
              </span>
            ) : (
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 size={14} /> All changes saved
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-3">
          {hasChanges && (
            <button
              onClick={handleAbort}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Abort Changes
            </button>
          )}
          <button
            disabled={!hasChanges || isLoading}
            onClick={handleSaveAll}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all shadow-md font-semibold ${
              hasChanges
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            }`}
          >
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <Save size={18} /> Save All
              </>
            )}
          </button>
        </div>
      </div>

      <button
        onClick={addFaq}
        className="w-full mb-6 flex items-center justify-center gap-2 border-2 border-dashed border-indigo-200 text-indigo-600 hover:bg-indigo-50 py-3 rounded-xl transition-colors"
      >
        <Plus size={18} /> Add New Question
      </button>

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
                      className={`bg-white border rounded-xl transition-all ${
                        snapshot.isDragging
                          ? "shadow-2xl ring-2 ring-indigo-400 scale-[1.02]"
                          : "shadow-sm"
                      }`}
                    >
                      <div className="p-4 flex items-start gap-4">
                        <div
                          {...provided.dragHandleProps}
                          className="mt-1 text-gray-400 cursor-grab active:cursor-grabbing"
                        >
                          <GripVertical size={20} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) =>
                              updateFaq(faq.id, "question", e.target.value)
                            }
                            placeholder="Type your question here..."
                            className="w-full text-lg font-medium text-gray-800 border-none focus:ring-0 placeholder:text-gray-300"
                          />

                          {editingId === faq.id && (
                            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                              <textarea
                                value={faq.answer}
                                onChange={(e) =>
                                  updateFaq(faq.id, "answer", e.target.value)
                                }
                                placeholder="Provide the detailed answer..."
                                rows={4}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:border-indigo-400"
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() =>
                              setEditingId(editingId === faq.id ? null : faq.id)
                            }
                            className={`p-2 rounded-lg transition-colors ${
                              editingId === faq.id
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-gray-400 hover:bg-gray-100"
                            }`}
                          >
                            <ChevronDown
                              className={`transition-transform duration-200 ${editingId === faq.id ? "rotate-180" : ""}`}
                              size={18}
                            />
                          </button>
                          <button
                            onClick={() => deleteFaq(faq.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
    </div>
  );
}
