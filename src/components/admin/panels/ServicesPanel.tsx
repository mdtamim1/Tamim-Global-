"use client";
import { useState, useEffect } from "react";
import type { SiteContent, Service } from "@/types";

interface Props {
  content: SiteContent | null;
  loading: boolean;
  updateSection: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  [key: string]: unknown;
}

const ICON_OPTIONS = ["Globe", "Layers", "ShoppingBag", "Sparkles", "CreditCard", "Server", "Code", "Database"];

export default function ServicesPanel({ content, loading, updateSection, showToast }: Props) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (content) setServices(JSON.parse(JSON.stringify(content.services)));
  }, [content]);

  if (loading || !content) return null;

  const updateService = (i: number, field: keyof Service, value: string) => {
    const updated = [...services];
    updated[i] = { ...updated[i], [field]: value };
    setServices(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("services", services);
    showToast("Services saved.");
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl glass border border-glass-border text-body-sm text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all duration-200 bg-transparent";
  const labelCls = "text-label text-ink-500 uppercase tracking-wider block mb-1.5";

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-display-lg text-ink-50 mb-2">Services</h1>
        <p className="text-body-md text-ink-400">Edit your service offerings. The first card spans two columns on desktop.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        {services.map((service, i) => (
          <div key={service.id} className="p-5 rounded-2xl glass border border-glass-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-label text-violet-400 font-bold">{i + 1}</span>
              <span className="font-display text-ink-50 font-semibold text-body-md">{service.title}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Icon</label>
                <select value={service.icon} onChange={e => updateService(i, "icon", e.target.value)}
                  className={`${inputCls} appearance-none`}>
                  {ICON_OPTIONS.map(opt => (
                    <option key={opt} value={opt} className="bg-base-800">{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={service.title} onChange={e => updateService(i, "title", e.target.value)} required />
              </div>
              <div className="sm:col-span-3">
                <label className={labelCls}>Description</label>
                <textarea rows={2} className={`${inputCls} resize-none`} value={service.description} onChange={e => updateService(i, "description", e.target.value)} required />
              </div>
            </div>
          </div>
        ))}
        <button type="submit" className="self-start px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-semibold transition-all duration-200 mt-2">
          Save Services
        </button>
      </form>
    </div>
  );
}
