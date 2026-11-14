"use client";

// ============================================================
// Tamim Global — Liquid Glass Project Card
// Matching awmedia.marketing's glass cards with spotlight sheen
// ============================================================

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LiveDemoButton from "@/components/ui/LiveDemoButton";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: -40 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        ["--mx" as string]: `${coords.x}%`,
        ["--my" as string]: `${coords.y}%`,
      }}
      className="glass group flex flex-col justify-between p-6 md:p-8 transition-transform duration-500 hover:-translate-y-1.5"
    >
      <div>
        {/* Browser Top Window Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-white/50">{project.id}.app</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-white/60 font-medium">
            {project.category}
          </span>
        </div>

        {/* Project Thumbnail / Visual Container */}
        <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-white/10 via-white/5 to-black border border-white/10 flex items-center justify-center group-hover:scale-[1.01] transition-transform duration-500">
          <div className="absolute inset-0 bg-radial from-violet-600/20 via-transparent to-transparent opacity-60" />
          <div className="text-center p-6 relative z-10">
            <span className="text-2xl md:text-3xl font-black text-white/80 tracking-tight block mb-2">
              {project.title}
            </span>
            <span className="text-xs font-mono text-white/50 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10 gap-3">
        {project.liveEnabled ? (
          <LiveDemoButton
            liveUrl={project.liveUrl}
            liveEnabled={project.liveEnabled}
            projectTitle={project.title}
          />
        ) : (
          <span className="text-xs text-white/40 font-mono">Production Active</span>
        )}

        <Link
          href={`/work/${project.id}`}
          className="btn btn-solid btn-sm text-xs font-bold flex items-center gap-1.5"
        >
          <span>Case Study</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
