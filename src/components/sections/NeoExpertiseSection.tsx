"use client";

// ============================================================
// Tamim Global — Expertise Interactive Tabs Section
// Ultra-Premium 5-Discipline Showcase
// Exact GSAP ScrollTrigger scrub integration, high-tech glass
// segmented tabs, structured craft pillars, illuminated metric
// cards, and an interactive titanium studio device.
// ============================================================

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Layout,
  Film,
  Music,
  Sparkles,
  CheckCircle2,
  Zap,
  Activity,
} from "lucide-react";
import ExpertiseDeviceShowcase from "@/components/ui/ExpertiseDeviceShowcase";

const tabsData = [
  {
    id: "fullstack",
    num: "01",
    label: "Full-Stack Dev",
    icon: Code2,
    lead: "Production-grade distributed web applications engineered for speed, resilience, and scale.",
    points: [
      "TypeScript & React 19 / Next.js 15 App Router architecture with sub-second page loads.",
      "Scalable REST & WebSocket APIs, Prisma ORM, PostgreSQL clusters, and edge deployments.",
      "Obsessive DevOps, automated CI/CD pipelines, and rigorous type safety from client to DB.",
    ],
    tech: ["TypeScript", "Next.js 15", "Node.js", "Prisma", "PostgreSQL", "Docker"],
    stat1: "100/100",
    stat1Label: "Google Lighthouse score",
    stat2: "0ms",
    stat2Label: "first paint latency delay",
  },
  {
    id: "web-design",
    num: "02",
    label: "Web & UI/UX Design",
    icon: Layout,
    lead: "Bespoke digital flagships designed in Figma with mathematical precision and converted directly into code.",
    points: [
      "Tailored visual systems with airtight typography scales, micro-spacing, and intentional negative space.",
      "100% pixel-perfect translation to clean Next.js & Tailwind CSS without generic templates.",
      "Optimized user journeys designed to establish instant authority and drive conversions.",
    ],
    tech: ["Figma", "Design Systems", "Tailwind CSS", "Micro-Interactions", "Responsive 4K"],
    stat1: "99.8%",
    stat1Label: "client satisfaction rating",
    stat2: "60fps",
    stat2Label: "smooth interaction target",
  },
  {
    id: "video-editing",
    num: "03",
    label: "Cinematic Video",
    icon: Film,
    lead: "High-retention commercial ads, brand films, and documentary cuts that hook viewers from second zero.",
    points: [
      "Rhythm-matched pacing and narrative flow engineered in Premiere Pro & DaVinci Resolve.",
      "Hollywood-caliber color grading with custom cinema LUTs and true Rec.709 mastering.",
      "Layered, multi-track sound design and foley that emotionally envelops the audience.",
    ],
    tech: ["DaVinci Resolve", "Premiere Pro", "After Effects", "Color Grading", "4K Cinema"],
    stat1: "4M+",
    stat1Label: "organic video views generated",
    stat2: "4K UHD",
    stat2Label: "cinema master output",
  },
  {
    id: "music",
    num: "04",
    label: "Music Composition",
    icon: Music,
    lead: "Original cinematic scores, ambient soundscapes, and brand sonic identities composed from scratch.",
    points: [
      "Composed in Ableton Live & Logic Pro using premium analog modeling and orchestral libraries.",
      "Bespoke audio architecture built specifically around visual cuts and video pacing.",
      "Studio-grade mixing and mastering delivered in pristine 48kHz / 24-bit lossless stereo.",
    ],
    tech: ["Ableton Live", "Logic Pro X", "Orchestral VSTs", "Foley & SFX", "Mastering"],
    stat1: "60+",
    stat1Label: "original compositions crafted",
    stat2: "48kHz",
    stat2Label: "lossless studio-grade master",
  },
  {
    id: "motion",
    num: "05",
    label: "Motion & 3D",
    icon: Sparkles,
    lead: "Award-caliber interactive experiences powered by Three.js WebGL and GSAP ScrollTrigger physics.",
    points: [
      "Custom WebGL particle systems, gravity simulators, and reactive canvas shaders.",
      "GPU-accelerated scrub animations with will-change optimizations for lag-free performance.",
      "Kinetic typography and spring physics that make your portfolio feel alive.",
    ],
    tech: ["Three.js", "WebGL Shaders", "GSAP ScrollTrigger", "Spring Physics", "Framer Motion"],
    stat1: "120Hz",
    stat1Label: "motion fluidity target",
    stat2: "0.2s",
    stat2Label: "interaction response time",
  },
];

export default function NeoExpertiseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabsData[activeTab];

  const sectionRef = useRef<HTMLElement | null>(null);
  const deviceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const device = deviceRef.current;
    if (!section || !device) return;

    // Exact NeoLeaf scrub animation for the device
    const ctx = gsap.context(() => {
      gsap.from(device, {
        xPercent: 101,
        yPercent: 15,
        scale: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "5% bottom",
          end: "95% bottom",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-5 md:px-10 lg:px-[60px] grid grid-cols-4 lg:grid-cols-12 lg:gap-6 -scroll-mt-px gap-[67px] py-20 lg:py-[100px] overflow-hidden bg-[#030209]"
      id="expertise"
    >
      {/* Col 1: Left Tab Controls & Insights */}
      <div className="col-span-full flex flex-col gap-4 lg:col lg:col-span-6 lg:gap-5 xl:pr-6 z-10">
        <div className="flex flex-col items-start gap-2.5 max-md:gap-1.5">
          {/* Glowing Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-2/10 border border-accent-2/30 text-accent-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-accent-2 animate-ping" />
            <span className="size-1.5 rounded-full bg-accent-2 -ml-3" />
            Expertise &amp; Arsenal
          </div>
          <h2
            className="text-h2-d lg:text-h2 font-semibold text-white tracking-tight leading-tight"
            id="title-expertise"
          >
            Five disciplines. One obsessive standard of craft.
          </h2>
        </div>

        <div className="flex flex-col gap-5 lg:gap-6">
          {/* Luxury Segmented Tab Selector with Icons & Numbers */}
          <div className="flex flex-wrap gap-2 pt-1">
            {tabsData.map((tab, idx) => {
              const isActive = activeTab === idx;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`group relative z-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-accent-1 text-black font-bold shadow-[0_0_24px_rgba(230,245,54,0.35)] scale-[1.02]"
                      : "bg-white/[0.04] hover:bg-white/[0.09] text-white/70 hover:text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  <span
                    className={`size-4 sm:size-5 rounded flex items-center justify-center text-[9px] sm:text-[10px] font-mono font-bold ${
                      isActive
                        ? "bg-black/15 text-black"
                        : "bg-white/10 text-white/50 group-hover:text-white"
                    }`}
                  >
                    {tab.num}
                  </span>
                  <Icon className={`size-3.5 sm:size-4 ${isActive ? "text-black" : "text-accent-2"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Tab Body with Lead, Checkpoints & Tech Arsenal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4 text-white/90"
            >
              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg font-medium text-white/90 leading-relaxed">
                {current.lead}
              </p>

              {/* 3 Structured Craft Pillars */}
              <div className="space-y-2.5 pt-1">
                {current.points.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-white/70 leading-normal"
                  >
                    <div className="size-5 rounded-full bg-accent-1/10 border border-accent-1/30 flex items-center justify-center shrink-0 mt-0.5 text-accent-1">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Technical Arsenal Pill Row */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] uppercase font-mono tracking-wider text-white/40 mr-1">
                  Arsenal:
                </span>
                {current.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/10 text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dual Stat Metrics Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-stats"}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-white/10"
            >
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-accent-1/40 transition-all">
                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-60 transition-opacity">
                  <Zap className="size-4 sm:size-5 text-accent-1" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white flex items-baseline">
                  <span className="bg-gradient-to-r from-accent-1 via-[#f4ff70] to-white bg-clip-text text-transparent">
                    {current.stat1}
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-white/60 mt-1 uppercase tracking-wider">
                  {current.stat1Label}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-accent-2/40 transition-all">
                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-60 transition-opacity">
                  <Activity className="size-4 sm:size-5 text-accent-2" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white flex items-baseline">
                  <span className="bg-gradient-to-r from-accent-2 via-[#c4b5fd] to-white bg-clip-text text-transparent">
                    {current.stat2}
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-white/60 mt-1 uppercase tracking-wider">
                  {current.stat2Label}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Col 2: Ultra-Luxury Device Showcase Stage with GSAP Scroll Scrub */}
      <div className="col-span-full relative flex items-center justify-center overflow-hidden rounded-3xl lg:rounded-[36px] bg-gradient-to-b from-[#0b0818] via-[#05030e] to-[#020106] border border-white/10 md:col-span-2 lg:col-span-6 p-4 sm:p-6 lg:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(124,58,237,0.15)] min-h-[460px] lg:min-h-[580px]">
        {/* Subtle Background Radial Starfield */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-2/15 via-transparent to-transparent pointer-events-none" />

        {/* Ambient Studio Lighting Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Interactive Titanium Device with GSAP Scroll Scrub */}
        <div
          ref={deviceRef}
          className="relative z-10 w-full flex items-center justify-center will-change-transform"
        >
          <ExpertiseDeviceShowcase activeTab={activeTab} />
        </div>
      </div>
    </section>
  );
}
