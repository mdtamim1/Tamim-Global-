"use client";

// ============================================================
// Tamim Global — Work / Selected Projects Section
// Cinematic project cards in a masonry-style grid.
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
      className="relative py-32 lg:py-40"
    >
      {/* Subtle section glow */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-16 lg:mb-20"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <motion.p
            variants={fadeUp}
            className="text-label text-violet-400 uppercase tracking-widest mb-4"
          >
            Selected Work
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              variants={fadeUp}
              className="font-display text-display-xl text-ink-50 max-w-2xl"
            >
              Projects that{" "}
              <span className="text-gradient">move the needle.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-body-md text-ink-400 max-w-sm md:text-right"
            >
              Real products, real outcomes. Each project is built to perform and built to last.
            </motion.p>
          </div>
        </motion.div>

        {/* Project grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={staggerContainer(0.1, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        {/* View all CTA */}
        {projects.length > 4 && (
          <motion.div
            className="mt-12 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <button className="px-8 py-4 rounded-xl glass border border-glass-border hover:border-violet-500/40 text-ink-50 font-semibold text-body-md transition-all duration-300 hover:-translate-y-0.5">
              View All Work
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

