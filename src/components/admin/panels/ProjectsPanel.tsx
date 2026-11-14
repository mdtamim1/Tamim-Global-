"use client";
// Projects panel — list, add, edit, delete, reorder, toggle live demo

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, ExternalLink, Eye, EyeOff, Star, FolderKanban } from "lucide-react";
import type { SiteContent, Project } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  content: SiteContent | null;
  loading: boolean;
  upsertProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (p: Project[]) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  [key: string]: unknown;
}

const EMPTY_PROJECT: Project = {
  id: "", title: "", category: "", tags: [], cover: "", summary: "",
  caseStudy: { problem: "", approach: "", solution: "", outcome: "" },
  liveUrl: "", liveEnabled: false, featured: false, order: 0,
};

function ProjectForm({ project, onSave, onCancel }: { project: Project; onSave: (p: Project) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Project>(project);
  const isNew = !project.id;

  const set = <K extends keyof Project>(k: K, v: Project[K]) => setForm(f => ({ ...f, [k]: v }));
  const setCS = <K extends keyof Project["caseStudy"]>(k: K, v: string) =>
    setForm(f => ({ ...f, caseStudy: { ...f.caseStudy, [k]: v } }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    onSave({ ...form, id });
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl glass border border-glass-border text-body-sm text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all duration-200 bg-transparent";
  const labelCls = "text-label text-ink-500 uppercase tracking-wider block mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass border border-glass-border flex flex-col gap-5">
      <h2 className="font-display text-ink-50 font-semibold">{isNew ? "Add Project" : "Edit Project"}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Title *</label>
          <input required className={inputCls} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Project Title" />
        </div>
        <div>
          <label className={labelCls}>Category *</label>
          <input required className={inputCls} value={form.category} onChange={e => set("category", e.target.value)} placeholder="SaaS Platform" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Tech Tags (comma-separated)</label>
          <input className={inputCls} value={form.tags.join(", ")} onChange={e => set("tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} placeholder="Next.js, TypeScript, Prisma" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Cover Image Path</label>
          <input className={inputCls} value={form.cover} onChange={e => set("cover", e.target.value)} placeholder="/images/projects/my-project.jpg" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Summary *</label>
          <textarea required rows={3} className={cn(inputCls, "resize-none")} value={form.summary} onChange={e => set("summary", e.target.value)} placeholder="Short result-oriented description..." />
        </div>
      </div>

      {/* Case study */}
      <div className="border-t border-glass-border pt-5">
        <p className="text-label text-violet-400 uppercase tracking-widest mb-4">Case Study</p>
        <div className="flex flex-col gap-4">
          {(["problem","approach","solution","outcome"] as const).map(field => (
            <div key={field}>
              <label className={labelCls}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <textarea rows={3} className={cn(inputCls, "resize-none")} value={form.caseStudy[field]} onChange={e => setCS(field, e.target.value)} placeholder={`Describe the ${field}...`} />
            </div>
          ))}
        </div>
      </div>

      {/* Live demo */}
      <div className="border-t border-glass-border pt-5">
        <p className="text-label text-violet-400 uppercase tracking-widest mb-4">Live Demo</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Live URL</label>
            <input className={inputCls} value={form.liveUrl} onChange={e => set("liveUrl", e.target.value)} placeholder="https://..." />
          </div>
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => set("liveEnabled", !form.liveEnabled)}
                className={cn("w-10 h-5 rounded-full transition-colors duration-200 relative cursor-pointer",
                  form.liveEnabled ? "bg-violet-500" : "bg-glass-border border border-glass-border")}
              >
                <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
                  form.liveEnabled ? "translate-x-5" : "translate-x-0.5")} />
              </div>
              <span className="text-body-sm text-ink-300">Live Demo Enabled</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => set("featured", !form.featured)}
                className={cn("w-10 h-5 rounded-full transition-colors duration-200 relative cursor-pointer",
                  form.featured ? "bg-amber-500" : "bg-glass-border border border-glass-border")}
              >
                <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
                  form.featured ? "translate-x-5" : "translate-x-0.5")} />
              </div>
              <span className="text-body-sm text-ink-300">Featured</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-semibold transition-all duration-200">
          {isNew ? "Add Project" : "Save Changes"}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl glass border border-glass-border text-body-sm text-ink-400 hover:text-ink-100 transition-all duration-200">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ProjectsPanel({ content, loading, upsertProject, deleteProject, reorderProjects, showToast }: Props) {
  const [editing, setEditing] = useState<Project | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  if (loading || !content) return null;

  const projects = [...content.projects].sort((a, b) => a.order - b.order);

  const handleSave = (p: Project) => {
    upsertProject(p);
    setEditing(null);
    setAddingNew(false);
    showToast(`"${p.title}" saved.`);
  };

  const handleDelete = (p: Project) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    deleteProject(p.id);
    showToast(`"${p.title}" deleted.`, "error");
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const arr = [...projects];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    reorderProjects(arr);
  };

  const moveDown = (i: number) => {
    if (i === projects.length - 1) return;
    const arr = [...projects];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    reorderProjects(arr);
  };

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-display-lg text-ink-50 mb-1">Projects</h1>
          <p className="text-body-sm text-ink-400">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
        </div>
        {!addingNew && !editing && (
          <button onClick={() => setAddingNew(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-semibold transition-all duration-200">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        )}
      </div>

      {/* Add form */}
      <AnimatePresence>
        {addingNew && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <ProjectForm project={EMPTY_PROJECT} onSave={handleSave} onCancel={() => setAddingNew(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project list */}
      <div className="flex flex-col gap-3">
        {projects.map((p, i) => (
          <div key={p.id}>
            {editing?.id === p.id ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ProjectForm project={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
              </motion.div>
            ) : (
              <div className="p-5 rounded-2xl glass border border-glass-border flex items-center gap-4 group">
                {/* Order controls */}
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveUp(i)} className="text-ink-500 hover:text-ink-100 transition-colors" title="Move up">▲</button>
                  <button onClick={() => moveDown(i)} className="text-ink-500 hover:text-ink-100 transition-colors" title="Move down">▼</button>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-display text-ink-50 font-semibold truncate">{p.title}</span>
                    {p.featured && <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" fill="currentColor" />}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-label text-ink-500">{p.category}</span>
                    {p.liveEnabled
                      ? <span className="flex items-center gap-1 text-label text-emerald-400"><Eye className="w-3 h-3" /> Live</span>
                      : <span className="flex items-center gap-1 text-label text-ink-500"><EyeOff className="w-3 h-3" /> Hidden</span>
                    }
                  </div>
                </div>

                {/* Tags */}
                <div className="hidden lg:flex flex-wrap gap-1.5 max-w-[200px]">
                  {p.tags.slice(0, 3).map(t => (
                    <span key={t} className="text-label px-2 py-0.5 rounded-md glass border border-glass-border text-ink-400">{t}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {p.liveUrl && p.liveEnabled && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg glass border border-glass-border flex items-center justify-center text-ink-400 hover:text-violet-400 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button onClick={() => setEditing(p)} className="w-8 h-8 rounded-lg glass border border-glass-border flex items-center justify-center text-ink-400 hover:text-violet-400 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(p)} className="w-8 h-8 rounded-lg glass border border-glass-border flex items-center justify-center text-ink-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {projects.length === 0 && !addingNew && (
        <div className="text-center py-16 text-ink-500">
          <FolderKanban className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p className="text-body-md">No projects yet. Add your first one.</p>
        </div>
      )}
    </div>
  );
}
