"use client";

// ============================================================
// Tamim Global — Case Study Client Component
// Problem → Approach → Solution → Outcome layout.
// Big visuals, next/prev project navigation.
// ============================================================

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import LiveDemoButton from "@/components/ui/LiveDemoButton";
import type { Project } from "@/types";

interface CaseStudyClientProps {
  project: Project;
  nextProject: Project;
  prevProject: Project;
}

const caseStudySteps = [
  { key: "problem",  label: "The Problem",  color: "text-red-400" },
  { key: "approach", label: "The Approach",  color: "text-blue-400" },
  { key: "solution", label: "The Solution",  color: "text-violet-400" },
  { key: "outcome",  label: "The Outcome",   color: "text-emerald-400" },
] as const;

export default function CaseStudyClient({ project, nextProject, prevProject }: CaseStudyClientProps) {
  return (
    <article className="min-h-screen">
      {/* ---- Hero ---- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-500/8 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-body-sm text-ink-500 hover:text-violet-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              All Work
            </Link>
          </motion.div>

          {/* Category + tags */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="px-3 py-1 rounded-lg glass border border-glass-border text-label text-violet-400 uppercase tracking-wider">
              {project.category}
            </span>
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-lg bg-base-700 border border-glass-border text-label text-ink-400">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display text-display-xl text-ink-50 mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {project.title}
          </motion.h1>

          {/* Summary + live demo */}
          <motion.div
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <p className="text-body-lg text-ink-400 max-w-2xl leading-relaxed">
              {project.summary}
            </p>
            <div className="flex-shrink-0">
              <LiveDemoButton
                liveUrl={project.liveUrl}
                liveEnabled={project.liveEnabled}
                projectTitle={project.title}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- Cover visual ---- */}
      <motion.section
        className="max-w-6xl mx-auto px-6 mb-20"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <div
          className="relative aspect-[16/7] rounded-3xl overflow-hidden glass border border-glass-border"
          style={{ background: `linear-gradient(135deg, #0A0A0F 0%, #14141F 50%, #1E0A3C 100%)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-display text-[8rem] font-bold text-violet-300/10 select-none leading-none">
              {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-radial from-violet-500/8 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 text-label text-ink-500">
            Add project cover image at: {project.cover}
          </p>
        </div>
      </motion.section>

      {/* ---- Case Study Breakdown ---- */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer(0, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
          {caseStudySteps.map(({ key, label, color }) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="p-8 rounded-2xl glass border border-glass-border hover:border-violet-500/20 transition-colors duration-300"
            >
              <p className={`text-label uppercase tracking-widest mb-3 ${color}`}>
                {label}
              </p>
              <p className="text-body-md text-ink-400 leading-relaxed">
                {project.caseStudy[key]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- Full Tech Stack ---- */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-display text-display-md text-ink-50 mb-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-xl glass border border-glass-border text-body-sm text-ink-300 hover:border-violet-500/30 hover:text-violet-300 transition-all duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ---- Next / Prev navigation ---- */}
      <section className="border-t border-glass-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Prev */}
            <Link
              href={`/work/${prevProject.id}`}
              className="group flex items-center gap-4 py-10 pr-8 border-r border-glass-border hover:bg-base-800/40 transition-colors duration-300 px-6"
            >
              <ArrowLeft className="w-5 h-5 text-ink-500 group-hover:text-violet-400 transition-colors duration-200 flex-shrink-0" />
              <div>
                <p className="text-label text-ink-500 uppercase tracking-wider mb-1">Previous</p>
                <p className="font-display font-semibold text-display-md text-ink-50 group-hover:text-violet-300 transition-colors duration-200">
                  {prevProject.title}
                </p>
              </div>
            </Link>

            {/* Next */}
            <Link
              href={`/work/${nextProject.id}`}
              className="group flex items-center justify-end gap-4 py-10 pl-8 hover:bg-base-800/40 transition-colors duration-300 px-6"
            >
              <div className="text-right">
                <p className="text-label text-ink-500 uppercase tracking-wider mb-1">Next Project</p>
                <p className="font-display font-semibold text-display-md text-ink-50 group-hover:text-violet-300 transition-colors duration-200">
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-ink-500 group-hover:text-violet-400 transition-colors duration-200 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

