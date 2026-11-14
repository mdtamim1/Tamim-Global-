"use client";
import { useState, useEffect } from "react";
import type { SiteContent, ProcessStep } from "@/types";

interface Props {
  content: SiteContent | null;
  loading: boolean;
  updateSection: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  [key: string]: unknown;
}

export default function ProcessPanel({ content, loading, updateSection, showToast }: Props) {
  const [steps, setSteps] = useState<ProcessStep[]>([]);

  useEffect(() => {
    if (content) setSteps(JSON.parse(JSON.stringify(content.process)));
  }, [content]);

  if (loading || !content) return null;

  const updateStep = (i: number, field: "title" | "description", value: string) => {
    const updated = [...steps];
    updated[i] = { ...updated[i], [field]: value };
    setSteps(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("process", steps);
    showToast("Process steps saved.");
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl glass border border-glass-border text-body-sm text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all duration-200 bg-transparent";
  const labelCls = "text-label text-ink-500 uppercase tracking-wider block mb-1.5";

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-display-lg text-ink-50 mb-2">Process</h1>
        <p className="text-body-md text-ink-400">The 5-step timeline shown to potential clients.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        {steps.map((step, i) => (
          <div key={step.step} className="p-5 rounded-2xl glass border border-glass-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <span className="font-display text-violet-400 text-body-sm font-bold">{String(step.step).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className={labelCls}>Step Title</label>
                <input required className={inputCls} value={step.title} onChange={e => updateStep(i, "title", e.target.value)} placeholder="Discover" />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea rows={2} required className={`${inputCls} resize-none`} value={step.description} onChange={e => updateStep(i, "description", e.target.value)} placeholder="What happens in this step..." />
              </div>
            </div>
          </div>
        ))}
        <button type="submit" className="self-start px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-semibold transition-all duration-200 mt-2">
          Save Process
        </button>
      </form>
    </div>
  );
}
