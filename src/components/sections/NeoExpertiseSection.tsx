"use client";

// ============================================================
// Tamim Global — Expertise Interactive Tabs Section
// Exact NeoLeaf Section 5 Architecture with Ultra-Luxury Styling:
// - Sleek Horizontal Glass Capsule Tabs (Single Bar)
// - Monolithic Editorial Typography & Dual Metric Counters
// - 4K Cinematic Studio Showcase Video Stage
// - 100% GSAP ScrollTrigger slide-in scrub (xPercent: 101 -> 0)
// ============================================================

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExpertiseVideoStage from "@/components/ui/ExpertiseVideoStage";

const tabsData = [
  {
    id: "fullstack",
    label: "Full-Stack Dev",
    paragraphs: [
      "I engineer production-grade distributed web applications using TypeScript, React 19, Next.js 15, Node.js, Prisma ORM, and PostgreSQL. From high-throughput REST APIs to real-time WebSocket clusters.",
      "Every architecture is typed end-to-end, tested, and containerized for global edge deployment with zero-latency caching and automated CI/CD pipelines.",
      "Engineered for enterprise reliability, high concurrent traffic, and a perfect 100/100 Google Lighthouse score.",
    ],
    stat1: "100/100",
    stat1Label: "Google Lighthouse score",
    stat2: "0ms",
    stat2Label: "first paint latency delay",
  },
  {
    id: "web-design",
    label: "Web & UI/UX Design",
    paragraphs: [
      "I craft visually unforgettable bespoke digital flagships designed in Figma with mathematical precision — airtight typographic hierarchy, intentional micro-spacing, and responsive fluidity across all screen sizes.",
      "Every layout translates to 100% pixel-perfect Next.js code with clean semantic architecture — zero generic templates, zero bloated UI libraries.",
      "From sleek portfolio flagships to multi-page corporate hubs, every design is built to establish undeniable brand authority and drive conversions.",
    ],
    stat1: "99.8%",
    stat1Label: "client satisfaction rating",
    stat2: "60fps",
    stat2Label: "buttery smooth UI performance",
  },
  {
    id: "video-editing",
    label: "Cinematic Video",
    paragraphs: [
      "Video is the most powerful storytelling medium. I direct, edit, and color-grade high-impact commercial ads, brand films, YouTube features, and viral short-form reels.",
      "Utilizing Premiere Pro, DaVinci Resolve, and After Effects for precision pacing, Hollywood-grade color science, custom cinema LUTs, and layered sound design that emotionally connects.",
      "Turn raw footage into an emotional visual experience that hooks viewers in the first 3 seconds, commands attention, and drives real conversions.",
    ],
    stat1: "4M+",
    stat1Label: "organic video views generated",
    stat2: "4K UHD",
    stat2Label: "cinema-grade master output",
  },
  {
    id: "music",
    label: "Music Composition",
    paragraphs: [
      "I compose original cinematic scores, ambient soundscapes, brand anthems, and commercial jingles using Ableton Live, Logic Pro X, and professional orchestral libraries.",
      "From cinematic orchestral swells to lo-fi electronic textures — every note is crafted specifically around visual cuts to amplify narrative impact.",
      "Studio-grade mixing and mastering delivered in pristine 48kHz / 24-bit lossless stereo — the invisible architecture that makes visuals unforgettable.",
    ],
    stat1: "60+",
    stat1Label: "original compositions crafted",
    stat2: "48kHz",
    stat2Label: "lossless studio-grade master",
  },
  {
    id: "motion",
    label: "Motion & 3D",
    paragraphs: [
      "Static websites are dead. I bring pages to life with GSAP ScrollTrigger, Three.js WebGL particle shaders, kinetic typography, and fluid spring physics.",
      "Every motion sequence is engineered for 60fps to 120fps performance with will-change transforms, GPU-accelerated compositing, and zero dropped frames.",
      "Create an unforgettable interactive journey that wins awards and leaves an indelible brand impression in visitors' minds.",
    ],
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
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    // Exact NeoLeaf scrub animation for the stage
    const ctx = gsap.context(() => {
      gsap.from(stage, {
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
      <div className="col-span-full flex flex-col gap-4 lg:col lg:col-span-6 lg:gap-5 xl:pr-8 z-10">
        <div className="flex flex-col items-start gap-2 lg:gap-3 max-md:gap-1">
          <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
            Expertise &amp; Arsenal
          </div>
          <h2
            className="text-h2-d lg:text-h2 font-semibold text-white tracking-tight"
            id="title-expertise"
          >
            Five disciplines. One obsessive standard of craft.
          </h2>
        </div>

        <div className="flex flex-col gap-5 lg:gap-7">
          {/* Sleek Horizontal Capsule Tab Selector matching NeoLeaf border-gallery */}
          <div className="relative max-w-full self-start overflow-hidden rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl shadow-lg">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-1">
              {tabsData.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`relative z-0 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 sm:px-5 py-2 text-center text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-accent-1 text-black font-semibold shadow-[0_0_20px_rgba(230,245,54,0.35)]"
                        : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Tab Body Paragraphs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-body-d lg:text-body text-white/65 flex flex-col gap-3.5"
            >
              {current.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Monolithic Dual Stat Metrics Counters */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-stats"}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10"
            >
              <div>
                <div className="font-semibold text-accent-2 flex text-[48px] leading-none max-xs:text-[38px] lg:text-[56px] xl:text-[80px]">
                  <span className="whitespace-nowrap">{current.stat1}</span>
                </div>
                <div className="text-body-small-d lg:text-body-small text-white/50 mt-2 uppercase tracking-wider text-xs">
                  {current.stat1Label}
                </div>
              </div>
              <div>
                <div className="font-semibold text-accent-2 flex text-[48px] leading-none max-xs:text-[38px] lg:text-[56px] xl:text-[80px]">
                  <span className="whitespace-nowrap">{current.stat2}</span>
                </div>
                <div className="text-body-small-d lg:text-body-small text-white/50 mt-2 uppercase tracking-wider text-xs">
                  {current.stat2Label}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Col 2: 4K Cinematic Studio Showcase Video Stage with GSAP Scroll Scrub */}
      <div
        ref={stageRef}
        className="col-span-full md:col-span-2 lg:col-span-6 flex items-center justify-center will-change-transform z-10"
      >
        <ExpertiseVideoStage activeTab={activeTab} />
      </div>
    </section>
  );
}
