"use client";
// About section editor — headline, bio, portrait path, stats

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { SiteContent, AboutContent } from "@/types";

interface Props {
  content: SiteContent | null;
  loading: boolean;
  updateSection: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  [key: string]: unknown;
}

export default function AboutPanel({ content, loading, updateSection, showToast }: Props) {
  const [form, setForm] = useState<AboutContent | null>(null);

  useEffect(() => {
    if (content) setForm(JSON.parse(JSON.stringify(content.about)));
  }, [content]);

  if (loading || !content || !form) return null;

  const set = <K extends keyof AboutContent>(k: K, v: AboutContent[K]) => setForm(f => f ? ({ ...f, [k]: v }) : f);

  const updateStat = (i: number, field: "label" | "value", v: string) => {
    const stats = [...form.stats];
    stats[i] = { ...stats[i], [field]: v };
    set("stats", stats);
  };

  const addStat = () => set("stats", [...form.stats, { label: "", value: "" }]);
  const removeStat = (i: number) => set("stats", form.stats.filter((_, idx) => idx !== i));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("about", form);
    showToast("About content saved.");
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl glass border border-glass-border text-body-sm text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all duration-200 bg-transparent";
  const labelCls = "text-label text-ink-500 uppercase tracking-wider block mb-1.5";

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-display-lg text-ink-50 mb-2">About</h1>
        <p className="text-body-md text-ink-400">Keep it short, confident, and personal.</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl glass border border-glass-border flex flex-col gap-5">
        <div>
          <label className={labelCls}>Headline</label>
          <input className={inputCls} value={form.headline} onChange={e => set("headline", e.target.value)} placeholder="Precision-crafted, beautifully engineered." />
        </div>
        <div>
          <label className={labelCls}>Bio</label>
          <textarea rows={4} className={`${inputCls} resize-none`} value={form.bio} onChange={e => set("bio", e.target.value)} placeholder="Short, confident biography..." />
        </div>
        <div>
          <label className={labelCls}>Portrait Path</label>
          <input className={inputCls} value={form.portrait ?? ""} onChange={e => set("portrait", e.target.value)} placeholder="/images/tamim-portrait.jpg" />
          <p className="text-label text-ink-500 mt-1">Place your photo in /public/images/ and enter the path.</p>
        </div>

        {/* Stats */}
        <div className="border-t border-glass-border pt-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-label text-violet-400 uppercase tracking-widest">Stats</p>
            <button type="button" onClick={addStat} className="flex items-center gap-1.5 text-label text-violet-400 hover:text-violet-300 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Stat
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {form.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <input className={`${inputCls} flex-1`} value={stat.value} onChange={e => updateStat(i, "value", e.target.value)} placeholder="20+" />
                <input className={`${inputCls} flex-1`} value={stat.label} onChange={e => updateStat(i, "label", e.target.value)} placeholder="Projects Shipped" />
                <button type="button" onClick={() => removeStat(i)} className="w-9 h-9 rounded-lg glass border border-glass-border flex items-center justify-center text-ink-500 hover:text-red-400 transition-colors flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="self-start px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-semibold transition-all duration-200">
          Save About
        </button>
      </form>
    </div>
  );
}
