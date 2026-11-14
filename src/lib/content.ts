// ============================================================
// Tamim Global — Content Loader
// Single source of truth: data/content.json
// NOTE: In a production CMS migration, replace this module's
// fetch logic with your CMS SDK — component APIs stay the same.
// ============================================================

import type { SiteContent, Project } from "@/types";

// In Next.js App Router, we import JSON directly (server component safe)
// For client-side admin edits, localStorage overrides are applied on top.
let _content: SiteContent | null = null;

export async function getContent(): Promise<SiteContent> {
  if (_content) return _content;
  // Dynamic import keeps the JSON out of the client bundle by default
  const raw = await import("../../data/content.json");
  _content = raw.default as SiteContent;
  return _content;
}

export async function getProjects(): Promise<Project[]> {
  const content = await getContent();
  return [...content.projects].sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === slug);
}

/** Client-side: apply localStorage admin overrides on top of base content */
export function getClientContent(): SiteContent | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("tg_admin_content");
    return stored ? (JSON.parse(stored) as SiteContent) : null;
  } catch {
    return null;
  }
}

export function saveClientContent(content: SiteContent): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("tg_admin_content", JSON.stringify(content));
}

