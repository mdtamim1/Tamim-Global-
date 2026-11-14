"use client";

// ============================================================
// Tamim Global — Work / Selected Systems Section
// Cinematic masonry showcase of production digital systems.
// ============================================================

import { useRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types";

interface WorkSectionProps {
  projects: Project[];
}

export default function WorkSection({ projects }: WorkSectionProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="work"
      ref={ref}
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      {/* Laser divider line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/8 blur-[160px] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 lg:mb-24"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-violet-400 uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
              [ 01 // PRODUCTION ARCHITECTURE ]
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.h2
              variants={fadeUp}
              className="font-display text-display-xl text-white max-w-2xl leading-none"
            >
              Systems that{" "}
              <span className="text-gradient">dominate &amp; scale.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-body-md text-ink-400 max-w-md md:text-right font-sans"
            >
              High-converting marketing flagships, multi-tenant SaaS dashboards, and robust e-commerce platforms engineered without compromise.
            </motion.p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
