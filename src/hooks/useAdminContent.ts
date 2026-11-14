// ============================================================
// Tamim Global — useAdminContent hook
// Manages SiteContent in localStorage with helpers for CRUD.
// NOTE: This is a CLIENT-SIDE-ONLY storage solution.
// All edits live in localStorage until the user exports JSON
// and redeploys. For a real CMS, replace saveContent() with
// an API call — component APIs remain identical.
// ============================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import type { SiteContent, Project, Testimonial } from "@/types";

const STORAGE_KEY = "tg_admin_content";

/** Load base content.json from the bundle */
async function loadBaseContent(): Promise<SiteContent> {
  const raw = await import("../../data/content.json");
  return raw.default as SiteContent;
}

export function useAdminContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false); // unsaved changes flag

  // ---- Load: localStorage override → base JSON fallback ----
  useEffect(() => {
    (async () => {
      const base = await loadBaseContent();
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setContent(JSON.parse(stored) as SiteContent);
        } else {
          setContent(base);
        }
      } catch {
        setContent(base);
      }
      setLoading(false);
    })();
  }, []);

  // ---- Persist to localStorage whenever content changes ----
  const saveContent = useCallback((next: SiteContent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setContent(next);
    setDirty(true);
  }, []);

  // ---- Generic section updater ----
  const updateSection = useCallback(<K extends keyof SiteContent>(
    key: K,
    value: SiteContent[K],
  ) => {
    if (!content) return;
    saveContent({ ...content, [key]: value });
  }, [content, saveContent]);

  // ---- Projects ----
  const upsertProject = useCallback((project: Project) => {
    if (!content) return;
    const exists = content.projects.some((p) => p.id === project.id);
    const projects = exists
      ? content.projects.map((p) => (p.id === project.id ? project : p))
      : [...content.projects, { ...project, order: content.projects.length + 1 }];
    saveContent({ ...content, projects });
  }, [content, saveContent]);

  const deleteProject = useCallback((id: string) => {
    if (!content) return;
    saveContent({ ...content, projects: content.projects.filter((p) => p.id !== id) });
  }, [content, saveContent]);

  const reorderProjects = useCallback((projects: Project[]) => {
    if (!content) return;
    const reordered = projects.map((p, i) => ({ ...p, order: i + 1 }));
    saveContent({ ...content, projects: reordered });
  }, [content, saveContent]);

  // ---- Testimonials ----
  const upsertTestimonial = useCallback((t: Testimonial) => {
    if (!content) return;
    const exists = content.testimonials.some((x) => x.id === t.id);
    const testimonials = exists
      ? content.testimonials.map((x) => (x.id === t.id ? t : x))
      : [...content.testimonials, t];
    saveContent({ ...content, testimonials });
  }, [content, saveContent]);

  const deleteTestimonial = useCallback((id: string) => {
    if (!content) return;
    saveContent({ ...content, testimonials: content.testimonials.filter((t) => t.id !== id) });
  }, [content, saveContent]);

  // ---- Export / Import ----
  const exportJSON = useCallback(() => {
    if (!content) return;
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
    setDirty(false);
  }, [content]);

  const importJSON = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string) as SiteContent;
        saveContent(parsed);
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  }, [saveContent]);

  const resetToBase = useCallback(async () => {
    const base = await loadBaseContent();
    localStorage.removeItem(STORAGE_KEY);
    setContent(base);
    setDirty(false);
  }, []);

  return {
    content,
    loading,
    dirty,
    updateSection,
    upsertProject,
    deleteProject,
    reorderProjects,
    upsertTestimonial,
    deleteTestimonial,
    exportJSON,
    importJSON,
    resetToBase,
  };
}
