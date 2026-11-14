// ============================================================
// Tamim Global — Dynamic Sitemap (Next.js App Router)
// Auto-generated from content.json projects + static routes.
// Place at: src/app/sitemap.ts
// ============================================================

import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";

const BASE_URL = "https://tamimglobal.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/work/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}

