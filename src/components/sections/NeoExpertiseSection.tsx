"use client";

// ============================================================
// Tamim Global — Expertise Interactive Tabs Section
// Exact 1:1 Match to neoleaf.bytetown.agency Section 5
// Features: Real NeoLeaf hand mockup with GSAP ScrollTrigger
// slide-in scrub (xPercent: 101 -> 0, scale: 0.85 -> 1.0),
// dynamic tabs, animated capsule, and matching dual stat counters.
// ============================================================

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const tabsData = [
  {
    id: "fullstack",
    label: "Full-Stack Dev",
    paragraphs: [
      "I build end-to-end production applications using TypeScript, React 19, Next.js 15, Node.js, Prisma ORM, and PostgreSQL. From REST APIs to real-time WebSocket systems.",
      "My code is clean, typed, and maintainable — built with CI/CD pipelines, automated testing, and modern DevOps practices on Vercel and Railway.",
      "Every app I ship is fast (100/100 Lighthouse), accessible, and engineered for scale — not just for looks.",
    ],
    stat1: "100/100", stat1Label: "Google Lighthouse score",
    stat2: "0ms", stat2Label: "time to first meaningful paint",
  },
  {
    id: "web-design",
    label: "Web & UI/UX Design",
    paragraphs: [
      "I craft visually stunning bespoke websites in Figma with mathematical precision — perfect typographic hierarchy, airtight grid systems, and obsessive attention to micro-interactions.",
      "Every layout ships as pixel-perfect Next.js code. Zero generic templates, zero bloated libraries — pure aesthetic precision fused with engineering excellence.",
      "From sleek portfolio flagships to complex multi-page corporate hubs, every design is built to convert and to awe.",
    ],
    stat1: "99.8%", stat1Label: "client satisfaction rating",
    stat2: "60fps", stat2Label: "buttery smooth UI performance",
  },
  {
    id: "video-editing",
    label: "Cinematic Video",
    paragraphs: [
      "Video is the most powerful storytelling medium. I direct, edit, and color-grade high-impact brand films, commercial ads, YouTube long-forms, and viral short-form reels.",
      "Using Premiere Pro, DaVinci Resolve, and After Effects for precision pacing, Hollywood-grade color science, and immersive sound design that emotionally connects.",
      "Turn raw footage into an emotional visual experience that stops the scroll, commands attention, and drives real conversions.",
    ],
    stat1: "4M+", stat1Label: "organic video views generated",
    stat2: "4K UHD", stat2Label: "cinema-grade master output",
  },
  {
    id: "music",
    label: "Music Composition",
    paragraphs: [
      "I compose original music scores, brand anthems, ambient soundscapes, and commercial jingles using Ableton Live, Logic Pro X, and professional orchestral libraries.",
      "From cinematic orchestral swells to lo-fi electronic textures — every note is crafted to serve the visual narrative and amplify emotional impact.",
      "Music is the invisible architecture of every great film, game, and brand identity. I make yours unforgettable.",
    ],
    stat1: "60+", stat1Label: "original compositions produced",
    stat2: "48kHz", stat2Label: "studio-grade audio master",
  },
  {
    id: "motion",
    label: "Motion & 3D",
    paragraphs: [
      "Static websites are dead. I bring pages to life with GSAP ScrollTrigger, Three.js WebGL particle systems, kinetic typography, and spring-physics micro-animations.",
      "Every motion sequence is engineered for 60fps performance — even on mobile — with will-change transforms and GPU-accelerated compositing.",
      "I create unforgettable interactive journeys that win awards and imprint your brand permanently in memory.",
    ],
    stat1: "120Hz", stat1Label: "motion fluidity target",
    stat2: "0.2s", stat2Label: "interaction response time",
  },
];

export default function NeoExpertiseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabsData[activeTab];

  const sectionRef = useRef<HTMLElement | null>(null);
  const handRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const hand = handRef.current;
    if (!section || !hand) return;

    // Exact NeoLeaf scrub animation for the phone in hand
    const ctx = gsap.context(() => {
      gsap.from(hand, {
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
      <div className="col-span-full flex flex-col gap-3 lg:col lg:col-span-6 lg:gap-4 xl:pr-8">
        <div className="flex flex-col items-start gap-2 lg:gap-3 max-md:gap-1">
          <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
            Expertise &amp; Arsenal
          </div>
          <h2
            className="text-h2-d lg:text-h2 font-semibold text-white"
            id="title-expertise"
          >
            Five disciplines. One obsessive standard of craft.
          </h2>
        </div>

        <div className="flex flex-col gap-5 lg:gap-7">
          {/* Capsule Tab Selector matching NeoLeaf border-gallery */}
          <div className="relative max-w-full self-start overflow-hidden rounded-full border border-white/10 bg-white/5 p-1.5">
            <div className="flex flex-wrap gap-1">
              {tabsData.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`relative z-0 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[100px] px-4 py-2 text-center text-sm transition-all duration-300 font-medium ${
                      isActive
                        ? "bg-accent-1 text-black font-semibold shadow-sm"
                        : "text-white/50 hover:text-white"
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
              transition={{ duration: 0.3 }}
              className="text-body-d lg:text-body text-white/60 flex flex-col gap-3.5"
            >
              {current.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Dual Stat Metrics Counters */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-stats"}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10"
            >
              <div>
                <div className="font-semibold text-accent-2 flex text-[48px] leading-none max-xs:text-[38px] lg:text-[56px] xl:text-[80px]">
                  <span className="whitespace-nowrap">{current.stat1}</span>
                </div>
                <div className="text-body-small-d lg:text-body-small text-white/50 mt-2">
                  {current.stat1Label}
                </div>
              </div>
              <div>
                <div className="font-semibold text-accent-2 flex text-[48px] leading-none max-xs:text-[38px] lg:text-[56px] xl:text-[80px]">
                  <span className="whitespace-nowrap">{current.stat2}</span>
                </div>
                <div className="text-body-small-d lg:text-body-small text-white/50 mt-2">
                  {current.stat2Label}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Col 2: Real NeoLeaf Hand & Phone Mockup with GSAP Scroll Scrub */}
      <div className="col-span-full relative flex aspect-[320/274] items-end justify-center overflow-hidden rounded-2xl bg-[#030209] md:col-span-2 lg:col-span-6 lg:aspect-[560/481] lg:rounded-[28px] shadow-xl">
        {/* Background Texture */}
        <Image
          alt="Expertise Background"
          src="/neoleaf-media/bg.7173f725.webp"
          fill
          className="max-lg:hidden rounded-[inherit] object-cover select-none pointer-events-none"
        />
        <Image
          alt="Expertise Background"
          src="/neoleaf-media/bg-d.fb84fa4c.webp"
          fill
          className="lg:hidden rounded-[inherit] object-cover select-none pointer-events-none"
        />

        {/* Ambient Light Effect */}
        <div className="pointer-events-none absolute inset-0 z-10 select-none overflow-hidden rounded-[inherit] max-lg:hidden">
          <Image
            alt="Light Effect"
            src="/neoleaf-media/light.53a4274a.webp"
            width={955}
            height={814}
            className="absolute left-0 top-0 w-[176.5%] max-w-none translate-x-[22%] translate-y-[44%]"
          />
        </div>

        {/* Realistic Hand Holding Smartphone with GSAP Scroll Scrub */}
        <div
          ref={handRef}
          className="relative z-10 select-none flex items-end justify-center h-full w-full will-change-transform"
        >
          <Image
            alt="Hand holding app"
            src="/neoleaf-media/hand.f044b646.webp"
            width={1944}
            height={1713}
            className="max-lg:hidden object-contain max-h-[92%] w-auto"
            priority
          />
          <Image
            alt="Hand holding app"
            src="/neoleaf-media/hand-d.ec4d028c.webp"
            width={987}
            height={933}
            className="lg:hidden object-contain max-h-[92%] w-auto"
          />
        </div>
      </div>
    </section>
  );
}
