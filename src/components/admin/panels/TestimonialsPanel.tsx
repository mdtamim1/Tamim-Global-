"use client";

// ============================================================
// Tamim Global — Admin: Testimonials Panel
// Add, edit, delete testimonials.
// Section is hidden on the public site when the array is empty.
// ============================================================

import { useState } from "react";
import { Plus, Pencil, Trash2, Quote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { SiteContent, Testimonial } from "@/types";

interface Props {
  content: SiteContent | null;
  loading: boolean;
  upsertTestimonial: (t: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  [key: string]: unknown;
}

const EMPTY: Testimonial = { id: "", name: "", role: "", company: "", avatar: "", quote: "" };

const inputCls =
  "w-full px-3 py-2.5 rounded-xl glass border border-glass-border text-body-sm text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all duration-200 bg-transparent";
const labelCls = "text-label text-ink-500 uppercase tracking-wider block mb-1.5";

function TestimonialForm({
  t,
  onSave,
  onCancel,
}: {
  t: Testimonial;
  onSave: (t: Testimonial) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Testimonial>(t);
  const isNew = !t.id;

  const set = <K extends keyof Testimonial>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id || `testimonial-${Date.now()}`;
    onSave({ ...form, id });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl glass border border-glass-border flex flex-col gap-4"
    >
      <h3 className="font-display text-ink-50 font-semibold">
        {isNew ? "Add Testimonial" : "Edit Testimonial"}
      </h3>

      <div>
        <label className={labelCls}>Quote *</label>
        <textarea
          required
          rows={3}
          className={`${inputCls} resize-none`}
          value={form.quote}
          onChange={(e) => set("quote", e.target.value)}
          placeholder="What the client said about working with you..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Name *</label>
          <input
            required
            className={inputCls}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Alex Johnson"
          />
        </div>
        <div>
          <label className={labelCls}>Role</label>
          <input
            className={inputCls}
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            placeholder="CEO"
          />
        </div>
        <div>
          <label className={labelCls}>Company</label>
          <input
            className={inputCls}
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Acme Inc."
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Avatar URL (optional)</label>
        <input
          className={inputCls}
          value={form.avatar ?? ""}
          onChange={(e) => set("avatar", e.target.value)}
          placeholder="/images/testimonials/alex.jpg"
        />
        <p className="text-label text-ink-500 mt-1">
          Leave blank to show an initial avatar fallback.
        </p>
      </div>

      {/* Live preview */}
      <div className="border-t border-glass-border pt-4">
        <p className="text-label text-ink-500 uppercase tracking-widest mb-3">Preview</p>
        <div className="p-5 rounded-xl bg-base-800/50 border border-glass-border flex flex-col gap-3">
          <Quote className="w-5 h-5 text-violet-500/40" />
          <p className="text-body-sm text-ink-300 italic">
            &ldquo;{form.quote || "Quote will appear here…"}&rdquo;
          </p>
          <div className="flex items-center gap-3 pt-3 border-t border-glass-border">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300 text-body-sm font-bold flex-shrink-0">
              {form.name ? form.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <p className="text-body-sm font-semibold text-ink-50">{form.name || "Name"}</p>
              <p className="text-label text-ink-500">
                {form.role || "Role"} · {form.company || "Company"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-semibold transition-all duration-200"
        >
          {isNew ? "Add Testimonial" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl glass border border-glass-border text-body-sm text-ink-400 hover:text-ink-100 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function TestimonialsPanel({
  content,
  loading,
  upsertTestimonial,
  deleteTestimonial,
  showToast,
}: Props) {
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  if (loading || !content) return null;

  const testimonials = content.testimonials;

  const handleSave = (t: Testimonial) => {
    upsertTestimonial(t);
    setEditing(null);
    setAddingNew(false);
    showToast(`Testimonial from "${t.name}" saved.`);
  };

  const handleDelete = (t: Testimonial) => {
    if (!confirm(`Delete testimonial from "${t.name}"? This cannot be undone.`)) return;
    deleteTestimonial(t.id);
    showToast(`Testimonial deleted.`, "error");
  };

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-display-lg text-ink-50 mb-1">Testimonials</h1>
          <p className="text-body-sm text-ink-400">
            {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""} ·{" "}
            <span className="text-violet-400">
              Section is hidden on the public site when empty.
            </span>
          </p>
        </div>
        {!addingNew && !editing && (
          <button
            onClick={() => setAddingNew(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        )}
      </div>

      {/* Add form */}
      <AnimatePresence>
        {addingNew && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <TestimonialForm
              t={EMPTY}
              onSave={handleSave}
              onCancel={() => setAddingNew(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonial list */}
      <div className="flex flex-col gap-3">
        {testimonials.map((t) => (
          <div key={t.id}>
            {editing?.id === t.id ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <TestimonialForm
                  t={editing}
                  onSave={handleSave}
                  onCancel={() => setEditing(null)}
                />
              </motion.div>
            ) : (
              <div className="p-5 rounded-2xl glass border border-glass-border flex items-start gap-4 group hover:border-violet-500/20 transition-all duration-200">
                <Quote className="w-5 h-5 text-violet-500/40 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm text-ink-300 mb-2 line-clamp-2">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-label text-ink-500">
                    <span className="text-ink-300 font-medium">{t.name}</span>
                    {t.role && ` · ${t.role}`}
                    {t.company && `, ${t.company}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                  <button
                    onClick={() => setEditing(t)}
                    className="w-8 h-8 rounded-lg glass border border-glass-border flex items-center justify-center text-ink-400 hover:text-violet-400 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t)}
                    className="w-8 h-8 rounded-lg glass border border-glass-border flex items-center justify-center text-ink-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {testimonials.length === 0 && !addingNew && (
        <div className="text-center py-16 rounded-2xl glass border border-glass-border">
          <Quote className="w-10 h-10 mx-auto mb-4 text-ink-500 opacity-30" />
          <p className="text-body-md text-ink-400 mb-2">No testimonials yet.</p>
          <p className="text-body-sm text-ink-500">
            The Testimonials section will be hidden on the site until you add some.
          </p>
        </div>
      )}
    </div>
  );
}

