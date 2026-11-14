"use client";

// ============================================================
// Tamim Global — Ultra-Futuristic Luxury Hero Section
// High-tech 3D cosmos, commanding typography, shimmer CTAs,
// and floating HUD Telemetry Console Dock.
// ============================================================

import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ExternalLink, Activity } from "lucide-react";
import { staggerContainer, textReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types";

const HeroScene = lazy(() => import("@/components/3d/HeroScene"));

interface HeroSectionProps {
  content: HeroContent;
}

// Magnetic interactive button
function MagneticCTA({
  children,
  className,
  href,
  external = false,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <a
      ref={ref}
      href={href}
      className={cn("transition-transform duration-300 ease-expo-out", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function HeroSection({ content }: HeroSectionProps) {
  const mouse = useRef({ x: 0, y: 0 });
  const [sceneReady, setSceneReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const t = setTimeout(() => setSceneReady(true), 200);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(t);
    };
  }, []);

  const words = content.headline.split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32"
    >
      {/* ---- 3D Cosmic Background Canvas ---- */}
      {sceneReady && !reducedMotion && (
        <div className="absolute inset-0 z-0" aria-hidden>
          <Suspense fallback={null}>
            <HeroScene mouse={mouse} />
          </Suspense>
        </div>
      )}

      {/* ---- Futuristic Cyber Perspective Grid Floor ---- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 cyber-grid-floor" aria-hidden />

      {/* ---- Ambient Deep Space Nebular Glows ---- */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] rounded-full bg-violet-600/12 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      {/* ---- Main Hero Content ---- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Futuristic Status Pill */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(124,58,237,0.2)]">
            <span className="radar-beacon">
              <span />
              <span />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-violet-300">
              [ SYSTEM // ACTIVE ]
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-xs font-mono text-ink-400">
              AVAILABLE FOR PRODUCTION
            </span>
          </div>
        </motion.div>

        {/* Monumental Hero Headline */}
        <h1
          className="font-display text-display-2xl text-white mb-8 max-w-5xl tracking-tight leading-none drop-shadow-sm"
          aria-label={content.headline}
        >
          <motion.span
            className="flex flex-wrap justify-center gap-x-[0.28em] gap-y-1"
            variants={reducedMotion ? undefined : staggerContainer(0.2, 0.08)}
            initial={reducedMotion ? undefined : "hidden"}
            animate={reducedMotion ? undefined : "visible"}
          >
            {words.map((word, i) => (
              <span key={i} className="clip-reveal overflow-hidden inline-block">
                <motion.span
                  className="inline-block"
                  variants={reducedMotion ? undefined : textReveal}
                >
                  {i === words.length - 1 ? (
                    <span className="text-gradient drop-shadow-[0_0_35px_rgba(124,58,237,0.5)]">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </h1>

        {/* Sub-headline with engineering precision */}
        <motion.p
          className="text-body-lg text-ink-400 max-w-2xl mb-12 leading-relaxed font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          {content.subheadline}
        </motion.p>

        {/* Futuristic CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          {/* Primary Shimmer Button */}
          <MagneticCTA
            href="#work"
            className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-white text-body-md font-semibold tracking-wide group"
          >
            <span>{content.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticCTA>

          {/* Secondary Cyber Glass Button */}
          <MagneticCTA
            href="#contact"
            className="btn-cyber w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-ink-100 text-body-md font-medium group"
          >
            <span>{content.ctaSecondary}</span>
            <ExternalLink className="w-4 h-4 text-ink-500 group-hover:text-cyan-400 transition-colors" />
          </MagneticCTA>
        </motion.div>

        {/* ---- Futuristic HUD Telemetry Dock ---- */}
        <motion.div
          className="w-full max-w-3xl hud-dock rounded-2xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-left border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
        >
          {/* Stat 1 */}
          <div className="flex flex-col border-r border-white/5 pr-4">
            <span className="font-mono text-[10px] text-violet-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              DEPLOYMENTS
            </span>
            <span className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight">
              20+
            </span>
            <span className="text-[11px] text-ink-500 font-mono mt-0.5">Production Shipped</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col md:border-r border-white/5 pr-4">
            <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              GLOBAL REACH
            </span>
            <span className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight">
              5+
            </span>
            <span className="text-[11px] text-ink-500 font-mono mt-0.5">Countries Served</span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col border-r border-white/5 pr-4">
            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              EXPERIENCE
            </span>
            <span className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight">
              3+
            </span>
            <span className="text-[11px] text-ink-500 font-mono mt-0.5">Years Engineering</span>
          </div>

          {/* Telemetry metadata */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 mb-1">
              <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>STATUS: NOMINAL</span>
            </div>
            <div className="text-[11px] font-mono text-ink-400">
              LOC: DHAKA // BD
            </div>
            <div className="text-[10px] font-mono text-violet-400/80 mt-0.5">
              LATENCY &lt; 30ms
            </div>
          </div>
        </motion.div>

      </div>

      {/* ---- Minimalist Scroll Down Pill ---- */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">Explore Releases</span>
        <ArrowDown className="w-3 h-3 text-violet-400 animate-bounce" />
      </motion.div>
    </section>
  );
}
