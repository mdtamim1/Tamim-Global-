"use client";

// ============================================================
// Tamim Global — Admin: Contact Panel
// Edit contact headline, subtext, email, WhatsApp, social links.
// ============================================================

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { SiteContent, ContactContent } from "@/types";

interface Props {
  content: SiteContent | null;
  loading: boolean;
  updateSection: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  [key: string]: unknown;
}

const inputCls =
  "w-full px-3 py-2.5 rounded-xl glass border border-glass-border text-body-sm text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all duration-200 bg-transparent";
const labelCls = "text-label text-ink-500 uppercase tracking-wider block mb-1.5";

export default function ContactPanel({ content, loading, updateSection, showToast }: Props) {
  const [form, setForm] = useState<ContactContent | null>(null);

  useEffect(() => {
    if (content) setForm(JSON.parse(JSON.stringify(content.contact)));
  }, [content]);

  if (loading || !content || !form) return null;

  const set = <K extends keyof ContactContent>(k: K, v: ContactContent[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const updateSocial = (i: number, field: "platform" | "url", v: string) => {
    const socials = [...form.socials];
    socials[i] = { ...socials[i], [field]: v };
    set("socials", socials);
  };

  const addSocial = () =>
    set("socials", [...form.socials, { platform: "", url: "" }]);

  const removeSocial = (i: number) =>
    set("socials", form.socials.filter((_, idx) => idx !== i));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("contact", form);
    showToast("Contact details saved.");
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-display-lg text-ink-50 mb-2">Contact</h1>
        <p className="text-body-md text-ink-400">
          Update your email, WhatsApp number, and social profile links.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        {/* Copy */}
        <div className="p-6 rounded-2xl glass border border-glass-border flex flex-col gap-4">
          <p className="text-label text-violet-400 uppercase tracking-widest mb-1">Section Copy</p>
          <div>
            <label className={labelCls}>Headline</label>
            <input
              className={inputCls}
              value={form.headline}
              onChange={(e) => set("headline", e.target.value)}
              placeholder="Let's build something remarkable."
            />
          </div>
          <div>
            <label className={labelCls}>Subtext</label>
            <textarea
              rows={2}
              className={`${inputCls} resize-none`}
              value={form.subtext}
              onChange={(e) => set("subtext", e.target.value)}
              placeholder="Have a project in mind? Let's talk..."
            />
          </div>
        </div>

        {/* Contact details */}
        <div className="p-6 rounded-2xl glass border border-glass-border flex flex-col gap-4">
          <p className="text-label text-violet-400 uppercase tracking-widest mb-1">Contact Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Email *</label>
              <input
                required
                type="email"
                className={inputCls}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="hello@tamimglobal.com"
              />
            </div>
            <div>
              <label className={labelCls}>WhatsApp</label>
              <input
                className={inputCls}
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                placeholder="+880 1XXXXXXXXX"
              />
              <p className="text-label text-ink-500 mt-1">
                Include country code — used for wa.me link.
              </p>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="p-6 rounded-2xl glass border border-glass-border flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-label text-violet-400 uppercase tracking-widest">Social Links</p>
            <button
              type="button"
              onClick={addSocial}
              className="flex items-center gap-1.5 text-label text-violet-400 hover:text-violet-300 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Link
            </button>
          </div>

          {form.socials.length === 0 && (
            <p className="text-body-sm text-ink-500">No social links yet. Add one above.</p>
          )}

          <div className="flex flex-col gap-3">
            {form.socials.map((social, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-28 flex-shrink-0">
                  <input
                    className={inputCls}
                    value={social.platform}
                    onChange={(e) => updateSocial(i, "platform", e.target.value)}
                    placeholder="GitHub"
                    list="platform-list"
                  />
                </div>
                <input
                  className={inputCls}
                  value={social.url}
                  onChange={(e) => updateSocial(i, "url", e.target.value)}
                  placeholder="https://github.com/tamimglobal"
                  type="url"
                />
                <button
                  type="button"
                  onClick={() => removeSocial(i)}
                  className="w-9 h-9 rounded-lg glass border border-glass-border flex items-center justify-center text-ink-500 hover:text-red-400 transition-colors flex-shrink-0"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Datalist for platform autocomplete */}
          <datalist id="platform-list">
            {["GitHub", "LinkedIn", "Twitter", "Instagram", "Dribbble", "Behance"].map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>

          <p className="text-label text-ink-500">
            Supported icon platforms: GitHub, LinkedIn, Twitter. Others show as text links.
          </p>
        </div>

        {/* Formspree note */}
        <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5">
          <p className="text-label text-amber-400 uppercase tracking-widest mb-2">📋 Contact Form</p>
          <p className="text-body-sm text-ink-400 leading-relaxed">
            To receive real emails from the contact form, create a free account at{" "}
            <a
              href="https://formspree.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
            >
              formspree.io
            </a>
            , copy your form ID, and add it to{" "}
            <code className="text-violet-300 text-label bg-violet-500/10 px-1.5 py-0.5 rounded">
              .env.local
            </code>{" "}
            as{" "}
            <code className="text-violet-300 text-label bg-violet-500/10 px-1.5 py-0.5 rounded">
              NEXT_PUBLIC_FORMSPREE_ID=your_id
            </code>
            .
          </p>
        </div>

        <button
          type="submit"
          className="self-start px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        >
          Save Contact
        </button>
      </form>
    </div>
  );
}

