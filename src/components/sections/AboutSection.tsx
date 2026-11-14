"use client";

// ============================================================
// Tamim Global — About Section
// Short, confident, personal. Portrait + stats + bio.
// Animated counters on stat cards for immediate impact.
// ============================================================

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp, slideInLeft } from "@/lib/animations";
import type { AboutContent } from "@/types";

/** Animate a numeric value from 0 → target when in view */
function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    // Extract leading number and trailing suffix (e.g. "20+" → 20, "+")
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) { setDisplay(value); return; }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1200; // ms
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return <div ref={ref} className="font-display text-display-lg text-ink-50 mb-1">{display}</div>;
}

interface AboutSectionProps {
  content: AboutContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-32 lg:py-40">
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Ambient glow */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-start pointer-events-none overflow-hidden">
        <div className="w-[500px] h-[500px] rounded-full bg-violet-500/4 blur-[100px] -translate-x-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Portrait */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="relative"
          >
            {/* Portrait frame */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden max-w-sm mx-auto lg:mx-0">
              {/* Placeholder gradient — replace with real portrait */}
              <div className="absolute inset-0 bg-gradient-to-br from-base-700 via-base-800 to-violet-900/30 flex items-end">
                <div className="p-8 w-full">
                  <p className="text-label text-ink-500">
                    Add portrait at: {content.portrait ?? "/images/tamim-portrait.jpg"}
                  </p>
                </div>
              </div>

              {/* Monogram watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[10rem] text-violet-500/5 select-none pointer-events-none leading-none">
                TG
              </div>

              {/* Frame border */}
              <div className="absolute inset-0 rounded-3xl border border-glass-border ring-1 ring-inset ring-white/5" />
            </div>

            {/* Floating badge — availability */}
            <motion.div
              className="absolute -bottom-6 -right-4 lg:right-auto lg:-left-6 glass border border-glass-border rounded-2xl p-4 flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
              </span>
              <div>
                <p className="text-body-sm font-semibold text-ink-50">Available</p>
                <p className="text-label text-ink-500">for new projects</p>
              </div>
            </motion.div>

            {/* Decorative violet ring */}
            <div
              aria-hidden
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full border border-violet-500/20 opacity-60"
            />
            <div
              aria-hidden
              className="absolute -top-3 -left-3 w-12 h-12 rounded-full border border-violet-500/30 opacity-40"
            />
          </motion.div>

          {/* Right — Bio + stats */}
          <motion.div
            variants={staggerContainer(0, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <motion.p variants={fadeUp} className="text-label text-violet-400 uppercase tracking-widest mb-4">
              About
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-display-xl text-ink-50 mb-6">
              {content.headline}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body-lg text-ink-400 leading-relaxed mb-10">
              {content.bio}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 gap-5 mb-10"
            >
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 rounded-2xl glass border border-glass-border hover:border-violet-500/20 transition-colors duration-300"
                >
                  <AnimatedStat value={stat.value} />
                  <div className="text-label text-ink-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Signature detail */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-violet flex items-center justify-center flex-shrink-0">
                <span className="text-white font-display font-bold text-xs">TG</span>
              </div>
              <div>
                <p className="text-body-sm font-semibold text-ink-50">Tamim</p>
                <p className="text-label text-ink-500">Full-stack Designer & Developer · Dhaka, Bangladesh</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

