"use client";

// ============================================================
// Tamim Global — Hero Section
// Bold headline + 3D scene + magnetic CTAs + scroll indicator.
// ============================================================

import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";
import { staggerContainer, textReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types";

// Lazy-load Three.js scene — keeps initial bundle small
const HeroScene = lazy(() => import("@/components/3d/HeroScene"));

interface HeroSectionProps {
  content: HeroContent;
}

// Magnetic button wrapper
function MagneticButton({
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
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  const props = {
    ref,
    href,
    className: cn("inline-flex items-center gap-2 transition-transform duration-300 ease-expo-out", className),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

  return <a {...props}>{children}</a>;
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

    // Small delay before showing 3D scene for smooth load
    const t = setTimeout(() => setSceneReady(true), 300);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(t);
    };
  }, []);

  // Split headline into words for stagger reveal
  const words = content.headline.split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ---- 3D Background Scene ---- */}
      {sceneReady && !reducedMotion && (
        <div className="absolute inset-0 z-0" aria-hidden>
          <Suspense fallback={null}>
            <HeroScene mouse={mouse} />
          </Suspense>
        </div>
      )}

      {/* ---- Radial ambient glows ---- */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-500/8 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-700/6 blur-[100px]" />
        {/* Noise overlay for depth */}
        <div className="absolute inset-0 opacity-[0.03] bg-noise bg-repeat" />
      </div>

      {/* ---- Hero Content ---- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-glass-border text-label text-violet-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-slow" />
            Available for new projects
          </span>
        </motion.div>

        {/* Headline — word by word stagger (skipped on reduced-motion) */}
        <h1
          className="font-display text-display-2xl text-ink-50 mb-6 max-w-5xl"
          aria-label={content.headline}
        >
          <motion.span
            className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-1"
            variants={reducedMotion ? undefined : staggerContainer(0.3, 0.1)}
            initial={reducedMotion ? undefined : "hidden"}
            animate={reducedMotion ? undefined : "visible"}
          >
            {words.map((word, i) => (
              <span key={i} className="clip-reveal overflow-hidden inline-block">
                <motion.span
                  className="inline-block"
                  variants={reducedMotion ? undefined : textReveal}
                >
                  {/* Accent the last word */}
                  {i === words.length - 1 ? (
                    <span className="text-gradient">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </h1>

        {/* Sub-copy */}
        <motion.p
          className="text-body-lg text-ink-400 max-w-2xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        >
          {content.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
        >
          {/* Primary CTA */}
          <MagneticButton
            href="#work"
            className={cn(
              "px-8 py-4 rounded-xl",
              "bg-violet-500 hover:bg-violet-400",
              "text-white font-semibold text-body-md",
              "shadow-glow-sm hover:shadow-glow-violet",
              "hover:-translate-y-0.5",
              "group"
            )}
          >
            {content.ctaPrimary}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </MagneticButton>

          {/* Secondary CTA */}
          <MagneticButton
            href="#contact"
            className={cn(
              "px-8 py-4 rounded-xl",
              "glass border border-glass-border",
              "text-ink-50 font-semibold text-body-md",
              "hover:border-violet-500/40 hover:text-violet-300",
              "group"
            )}
          >
            {content.ctaSecondary}
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
          </MagneticButton>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
        >
          {[
            { label: "Projects Shipped", value: "20+" },
            { label: "Countries Served", value: "5+" },
            { label: "Years Building", value: "3+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-extrabold text-ink-50 mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-label text-ink-400 uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-hidden
      >
        <span className="text-label text-ink-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-ink-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

