"use client";

// ============================================================
// Tamim Global — Operator Profile & Holographic Dossier (About)
// Cybernetic digital identity, animated telemetry counters, and bio.
// ============================================================

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp, slideInLeft } from "@/lib/animations";
import { ShieldCheck, MapPin } from "lucide-react";
import type { AboutContent } from "@/types";

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) { setDisplay(value); return; }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return <div ref={ref} className="font-display font-bold text-3xl md:text-4xl text-white mb-1 tracking-tight">{display}</div>;
}

interface AboutSectionProps {
  content: AboutContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="relative py-32 lg:py-44 overflow-hidden">
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* Left Column — Holographic Digital Dossier Card (5 cols) */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="lg:col-span-5 relative"
          >
            {/* Hologram Card Frame */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card border border-white/15 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(124,58,237,0.2)]">
              {/* Inner container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-base-950 flex flex-col justify-between p-6">
                
                {/* Real Image if available */}
                {content.portrait && !imgError ? (
                  <Image
                    src={content.portrait}
                    alt="Tamim portrait"
                    fill
                    className="object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : null}

                {/* Hologram Visual Grid & Ambient Core */}
                {(!content.portrait || imgError) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-950/60 via-base-950 to-base-900 flex flex-col justify-between p-6 pointer-events-none">
                    {/* Corner Reticles */}
                    <div className="flex justify-between items-start font-mono text-[9px] text-violet-400">
                      <span>SEC_LEVEL // 04</span>
                      <span>SYS_ID: TM-2026</span>
                    </div>

                    {/* Central Holographic Emblem */}
                    <div className="flex flex-col items-center justify-center my-auto">
                      <div className="relative w-28 h-28 rounded-full border border-violet-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                        <span className="font-display font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white via-violet-200 to-cyan-300">
                          TG
                        </span>
                        <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-spin" style={{ animationDuration: "12s" }} />
                      </div>
                      <div className="mt-4 font-mono text-xs text-white tracking-widest uppercase">
                        TAMIM // ARCHITECT
                      </div>
                      <div className="text-[10px] font-mono text-cyan-300 mt-1">
                        FULL-STACK WEB ENGINEER
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-ink-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-violet-400" />
                        DHAKA // 23.81° N, 90.41° E
                      </span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        VERIFIED
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Verified Badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 glass border border-white/15 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] text-ink-400 uppercase tracking-widest leading-none">Status</span>
                  <span className="font-mono text-xs font-semibold text-white">Full-Stack Verified</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column — Content & Stats Grid (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              variants={staggerContainer(0, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-violet-400 uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                  [ 05 // OPERATOR PROFILE ]
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-display text-display-xl text-white mb-6 leading-tight"
              >
                Obsessed with craft,{" "}
                <span className="text-gradient">engineered to convert.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-body-lg text-ink-300 leading-relaxed font-sans mb-10"
              >
                {content.bio}
              </motion.p>

              {/* Telemetry Stats Grid */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl glass-card border border-white/10"
              >
                {content.stats.map((stat) => (
                  <div key={stat.label} className="text-left">
                    <AnimatedStat value={stat.value} />
                    <div className="font-mono text-[11px] text-ink-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
