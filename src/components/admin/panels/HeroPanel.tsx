"use client";
// Hero content editor

import { useState, useEffect } from "react";
import type { SiteContent, HeroContent } from "@/types";

interface Props {
  content: SiteContent | null;
  loading: boolean;
  updateSection: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  [key: string]: unknown;
}

export default function HeroPanel({ content, loading, updateSection, showToast }: Props) {
  const [form, setForm] = useState<HeroContent | null>(null);

  useEffect(() => {
    if (content) setForm({ ...content.hero });
  }, [content]);

  if (loading || !content || !form) return null;

  const set = <K extends keyof HeroContent>(k: K, v: string) => setForm(f => f ? ({ ...f, [k]: v }) : f);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    updateSection("hero", form);
    showToast("Hero content saved.");
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl glass border border-glass-border text-body-sm text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all duration-200 bg-transparent";
  const labelCls = "text-label text-ink-500 uppercase tracking-wider block mb-1.5";

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-display-lg text-ink-50 mb-2">Hero Section</h1>
        <p className="text-body-md text-ink-400">The first thing visitors see. Keep it bold and outcome-focused.</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl glass border border-glass-border flex flex-col gap-5">
        <div>
          <label className={labelCls}>Headline *</label>
          <input required className={inputCls} value={form.headline} onChange={e => set("headline", e.target.value)} placeholder="I build digital products that convert." />
        </div>
        <div>
          <label className={labelCls}>Subheadline</label>
          <textarea rows={2} className={`${inputCls} resize-none`} value={form.subheadline} onChange={e => set("subheadline", e.target.value)} placeholder="One powerful sentence about what you do..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Primary CTA</label>
            <input className={inputCls} value={form.ctaPrimary} onChange={e => set("ctaPrimary", e.target.value)} placeholder="View Work" />
          </div>
          <div>
            <label className={labelCls}>Secondary CTA</label>
            <input className={inputCls} value={form.ctaSecondary} onChange={e => set("ctaSecondary", e.target.value)} placeholder="Start a Project" />
          </div>
        </div>

        {/* Live preview */}
        <div className="border-t border-glass-border pt-5">
          <p className="text-label text-ink-500 uppercase tracking-widest mb-3">Preview</p>
          <div className="p-6 rounded-xl bg-base-800/50 border border-glass-border">
            <p className="font-display text-display-md text-ink-50 mb-2">{form.headline || "Your headline here"}</p>
            <p className="text-body-sm text-ink-400">{form.subheadline || "Your subheadline here"}</p>
            <div className="flex gap-3 mt-4">
              <span className="px-4 py-2 rounded-lg bg-violet-500 text-white text-body-sm">{form.ctaPrimary || "CTA"}</span>
              <span className="px-4 py-2 rounded-lg glass border border-glass-border text-ink-300 text-body-sm">{form.ctaSecondary || "CTA 2"}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="self-start px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-semibold transition-all duration-200">
          Save Hero
        </button>
      </form>
    </div>
  );
}
