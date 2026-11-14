"use client";

// ============================================================
// Tamim Global — Cybernetic Project Card
// Ultra-futuristic luxury project card with browser mockup frame,
// interactive 3D tilt, telemetry tags, and Live Demo launch.
// ============================================================

import { useRef, useState } from "react";
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
  const [imageError, setImageError] = useState(false);

  // 3D tilt on hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3.5, -3.5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div variants={scaleReveal} custom={index}>
      <motion.div
        ref={cardRef}
        className="group relative rounded-3xl overflow-hidden glass-card border border-white/10 transition-all duration-500 hover:border-violet-500/40 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Browser Mockup Chrome Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-base-950/80 border-b border-white/5 text-[11px] font-mono text-ink-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            <span className="ml-2 text-ink-500">release_{paddedIndex}.sys</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-violet-400">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-[9px] font-mono text-violet-300">
                FEATURED
              </span>
            )}
          </div>
        </div>

        {/* Visual / Cover Container */}
        <div className="relative aspect-[16/10] bg-base-950 overflow-hidden">
          {project.cover && !imageError ? (
            <Image
              src={project.cover}
              alt={`Cover for ${project.title}`}
              fill
              className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageError(true)}
            />
          ) : null}

          {/* Futuristic Cyber Visual Blueprint (Fallback or default) */}
          {(!project.cover || imageError) && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-8 select-none"
              style={{
                background: `radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.25) 0%, rgba(5, 5, 10, 0.95) 75%), linear-gradient(145deg, hsl(${260 + index * 30}, 30%, 10%) 0%, #030305 100%)`,
              }}
              aria-hidden
            >
              {/* Concentric tech radar rings */}
              <div className="absolute w-80 h-80 rounded-full border border-violet-500/10 pointer-events-none" />
              <div className="absolute w-60 h-60 rounded-full border border-violet-500/15 pointer-events-none" />
              <div className="absolute w-40 h-40 rounded-full border border-cyan-500/15 pointer-events-none" />

              {/* Grid dots */}
              <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #C084FC 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Stylized Centerpiece */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="font-display font-extrabold text-5xl md:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-violet-200 to-violet-500/40 drop-shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs font-mono text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>ARCHITECTURE // VERIFIED</span>
                </div>
              </div>
            </div>
          )}

          {/* Hover Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-base-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <Link href={`/work/${project.id}`} className="group/title">
              <h3 className="font-display font-bold text-display-md text-white group-hover/title:text-violet-300 transition-colors duration-200">
                {project.title}
              </h3>
            </Link>
            <Link
              href={`/work/${project.id}`}
              className="p-2 rounded-full glass border border-white/10 text-ink-400 hover:text-white hover:border-violet-400/50 hover:bg-violet-500/10 transition-all duration-300 flex-shrink-0"
              aria-label={`View case study for ${project.title}`}
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <p className="text-body-sm text-ink-400 mb-6 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-violet-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[11px] font-mono text-ink-500">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Interactive Action Bar */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <LiveDemoButton
              liveUrl={project.liveUrl}
              liveEnabled={project.liveEnabled}
              projectTitle={project.title}
            />

            <Link
              href={`/work/${project.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-violet-300 transition-colors duration-200 group/link"
            >
              <span>Explore Architecture</span>
              <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
