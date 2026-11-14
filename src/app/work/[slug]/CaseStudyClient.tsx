"use client";

// ============================================================
// Tamim Global — Cybernetic Case Study Client
// Problem → Approach → Solution → Outcome architecture breakdown.
// ============================================================

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Cpu } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import LiveDemoButton from "@/components/ui/LiveDemoButton";
import type { Project } from "@/types";

interface CaseStudyClientProps {
  project: Project;
  nextProject: Project;
  prevProject: Project;
}

const caseStudySteps = [
  { key: "problem",  label: "The Challenge & Friction",  color: "text-red-400",    badge: "01 // PROBLEM" },
  { key: "approach", label: "Architecture & Strategy",   color: "text-cyan-400",   badge: "02 // APPROACH" },
  { key: "solution", label: "Full-Stack Implementation", color: "text-violet-400", badge: "03 // SOLUTION" },
  { key: "outcome",  label: "Business Impact & Metrics", color: "text-emerald-400",badge: "04 // OUTCOME" },
] as const;

export default function CaseStudyClient({ project, nextProject, prevProject }: CaseStudyClientProps) {
  return (
    <article className="min-h-screen bg-base-950 pt-28 md:pt-36">
      {/* ---- Hero ---- */}
      <section className="relative pb-20 overflow-hidden">
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs text-ink-400 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO SYSTEMS ARCHIVE</span>
            </Link>
          </motion.div>

          {/* Category + Tech Tags */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 font-mono text-xs text-violet-300 uppercase tracking-widest">
              {project.category}
            </span>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 font-mono text-xs text-ink-400">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display text-display-2xl text-white mb-6 tracking-tight leading-none"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {project.title}
          </motion.h1>

          {/* Summary + Live Demo CTA */}
          <motion.div
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pt-4 border-t border-white/5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <p className="text-body-lg text-ink-300 max-w-2xl leading-relaxed font-sans">
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

      {/* ---- Cover Visual Banner ---- */}
      <motion.section
        className="max-w-6xl mx-auto px-6 mb-24"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <div
          className="relative aspect-[16/7] rounded-3xl overflow-hidden glass-card border border-white/15 p-8 flex flex-col justify-between select-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
          style={{ background: `radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.25) 0%, rgba(5, 5, 10, 0.95) 75%), linear-gradient(135deg, #0A0A14 0%, #030305 100%)` }}
        >
          {/* Top telemetry stamp */}
          <div className="flex items-center justify-between font-mono text-xs text-violet-400">
            <span>RELEASE_ARCHIVE // {project.id.toUpperCase()}</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM VERIFIED
            </span>
          </div>

          {/* Central Watermark */}
          <div className="my-auto text-center">
            <div className="font-display font-black text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white via-violet-200 to-violet-500/20 drop-shadow-[0_0_35px_rgba(124,58,237,0.3)]">
              {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
            </div>
            <div className="mt-2 font-mono text-xs text-cyan-300 tracking-widest uppercase">
              {project.category} · PRODUCTION BUILD
            </div>
          </div>

          <div className="font-mono text-[11px] text-ink-500">
            SYSTEM LATENCY: &lt; 50ms // STATUS: PRODUCTION READY
          </div>
        </div>
      </motion.section>

      {/* ---- Case Study Matrix ---- */}
      <section className="max-w-5xl mx-auto px-6 mb-28">
        <div className="mb-12">
          <span className="font-mono text-xs text-violet-400 uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            SYSTEM ARCHITECTURE MATRIX
          </span>
          <h2 className="font-display font-bold text-display-lg text-white mt-4">
            Deconstructing the engineering.
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer(0, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
          {caseStudySteps.map(({ key, label, color, badge }) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="p-8 rounded-3xl glass-card border border-white/10 hover:border-violet-500/40 hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.2)] transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5 font-mono text-xs">
                <span className="text-violet-400 font-semibold">{badge}</span>
                <span className={`font-semibold ${color}`}>{label}</span>
              </div>
              <p className="text-body-md text-ink-300 leading-relaxed font-sans">
                {project.caseStudy[key]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- Full Tech Arsenal ---- */}
      <section className="max-w-5xl mx-auto px-6 mb-28">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="p-8 rounded-3xl glass-card border border-white/10">
            <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Technology Primitives</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs text-violet-300 hover:border-cyan-400/40 hover:text-white transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---- Next / Prev Navigation Rails ---- */}
      <section className="border-t border-white/10 bg-base-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Link
              href={`/work/${prevProject.id}`}
              className="group flex items-center gap-4 py-12 pr-8 md:border-r border-white/10 hover:bg-white/[0.02] transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-ink-500 group-hover:text-cyan-400 transition-colors duration-200 flex-shrink-0" />
              <div>
                <p className="font-mono text-[11px] text-violet-400 uppercase tracking-widest mb-1">Previous Release</p>
                <p className="font-display font-bold text-display-md text-white group-hover:text-violet-300 transition-colors duration-200">
                  {prevProject.title}
                </p>
              </div>
            </Link>

            <Link
              href={`/work/${nextProject.id}`}
              className="group flex items-center justify-end gap-4 py-12 pl-8 hover:bg-white/[0.02] transition-colors duration-300 text-right"
            >
              <div>
                <p className="font-mono text-[11px] text-cyan-400 uppercase tracking-widest mb-1">Next Release</p>
                <p className="font-display font-bold text-display-md text-white group-hover:text-cyan-300 transition-colors duration-200">
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-ink-500 group-hover:text-cyan-400 transition-colors duration-200 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
