// ============================================================
// Tamim Global — Work / Case Study Dynamic Route
// /work/[slug] — server-rendered, SEO metadata, structured data.
// ============================================================

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/content";
import CaseStudyClient from "./CaseStudyClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for each project
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Tamim Global`,
      description: project.summary,
      images: project.cover ? [{ url: project.cover }] : [],
    },
  };
}

// Generate static params from all projects (not just featured)
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.id }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  // Nav: cycle through all projects
  const allProjects = await getProjects();
  const currentIndex = allProjects.findIndex((p) => p.id === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <CaseStudyClient
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
    />
  );
}
