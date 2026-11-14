"use client";

// ============================================================
// Tamim Global — Project Card
// Cinematic full-bleed card with hover reveal and Live Demo button.
// ============================================================

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scaleReveal } from "@/lib/animations";
import LiveDemoButton from "@/components/ui/LiveDemoButton";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt on hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      variants={scaleReveal}
      custom={index}
    >
      <motion.div
        ref={cardRef}
        className="group relative rounded-3xl overflow-hidden glass border border-glass-border cursor-pointer"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ boxShadow: "0 8px 48px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.1) inset" }}
        transition={{ duration: 0.3 }}
      >
        {/* Cover image */}
        <div className="relative aspect-[16/9] bg-base-700 overflow-hidden">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={`Cover image for ${project.title}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : null}
          {/* Gradient placeholder (always visible, hidden behind real image) */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, hsl(${260 + index * 30}, 50%, 8%) 0%, hsl(${260 + index * 30}, 60%, 15%) 100%)`,
            }}
            aria-hidden
          >
            <div className="text-center px-8">
              <div className="font-display text-display-lg text-violet-300/30 font-bold leading-none" aria-hidden>
                {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-radial from-violet-500/10 via-transparent to-transparent" />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-base-900/90 via-base-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Category tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-lg glass border border-glass-border text-label text-ink-400 uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          {/* Case study link arrow */}
          <Link
            href={`/work/${project.id}`}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl glass border border-glass-border flex items-center justify-center text-ink-400 hover:text-violet-300 hover:border-violet-500/40 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
            aria-label={`View case study for ${project.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <Link href={`/work/${project.id}`} className="group/title">
              <h3 className="font-display font-semibold text-display-md text-ink-50 group-hover/title:text-violet-300 transition-colors duration-200">
                {project.title}
              </h3>
            </Link>
            {project.featured && (
              <span className="flex-shrink-0 px-2 py-0.5 rounded-md bg-violet-500/15 border border-violet-500/25 text-label text-violet-400 uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>

          <p className="text-body-sm text-ink-400 mb-5 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-base-700 border border-glass-border text-label text-ink-400"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-1 rounded-lg bg-base-700 border border-glass-border text-label text-ink-500">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <LiveDemoButton
              liveUrl={project.liveUrl}
              liveEnabled={project.liveEnabled}
              projectTitle={project.title}
            />
            <Link
              href={`/work/${project.id}`}
              className="text-body-sm text-ink-500 hover:text-violet-400 transition-colors duration-200 ml-auto"
            >
              Case Study →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

