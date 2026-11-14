"use client";

// ============================================================
// Tamim Global — Work Section (#work)
// Exact match to awmedia.marketing's case studies showcase
// ============================================================

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types";

interface WorkSectionProps {
  projects: Project[];
}

const CATEGORIES = ["All", "E-Commerce", "SaaS Platform", "Marketing Site"];

export default function WorkSection({ projects }: WorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="work" className="py-28 wrap">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="eyebrow">Selected Work</div>
          <h2 className="display text-white">
            From idea to live. <span className="chrome">Sites that ship.</span>
          </h2>
        </div>
        <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
          Real products, real business outcomes. Each project is engineered to perform, convert, and built to last.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs md:text-sm px-4 py-2 rounded-full border transition-all ${
              activeCategory === cat
                ? "bg-white text-black font-semibold border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                : "bg-white/5 text-white/70 border-white/10 hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
