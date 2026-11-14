"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { SiteContent, StackItem } from "@/types";

interface Props {
  content: SiteContent | null;
  loading: boolean;
  updateSection: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  [key: string]: unknown;
}

export default function StackPanel({ content, loading, updateSection, showToast }: Props) {
  const [items, setItems] = useState<StackItem[]>([]);

  useEffect(() => {
    if (content) setItems(JSON.parse(JSON.stringify(content.stack)));
  }, [content]);

  if (loading || !content) return null;

  const updateItem = (i: number, field: keyof StackItem, value: string) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: value };
    setItems(updated);
  };

  const addItem = () => setItems(prev => [...prev, { name: "", category: "" }]);
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("stack", items.filter(it => it.name.trim()));
    showToast("Tech stack saved.");
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl glass border border-glass-border text-body-sm text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all duration-200 bg-transparent";
  const labelCls = "text-label text-ink-500 uppercase tracking-wider block mb-1.5";

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-display-lg text-ink-50 mb-2">Tech Stack</h1>
        <p className="text-body-md text-ink-400">The technologies displayed in the marquee. Enter name and category for each.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="p-5 rounded-2xl glass border border-glass-border flex flex-col gap-3">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
            <span className={labelCls}>Name</span>
            <span className={labelCls}>Category</span>
            <span />
          </div>
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
              <input className={inputCls} value={item.name} onChange={e => updateItem(i, "name", e.target.value)} placeholder="Next.js" />
              <input className={inputCls} value={item.category} onChange={e => updateItem(i, "category", e.target.value)} placeholder="Framework" list="cats" />
              <button type="button" onClick={() => removeItem(i)}
                className="w-9 h-9 rounded-lg glass border border-glass-border flex items-center justify-center text-ink-500 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {/* Category datalist for autocomplete */}
          <datalist id="cats">
            {["Framework","Language","Runtime","Styling","Animation","3D","Database","ORM","Cache","DevOps","Deployment","Payments","Design","Tools"].map(c => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <button type="button" onClick={addItem}
            className="flex items-center gap-2 text-label text-violet-400 hover:text-violet-300 transition-colors self-start mt-1">
            <Plus className="w-3.5 h-3.5" /> Add Technology
          </button>
        </div>

        <button type="submit" className="self-start px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-semibold transition-all duration-200">
          Save Stack
        </button>
      </form>
    </div>
  );
}
