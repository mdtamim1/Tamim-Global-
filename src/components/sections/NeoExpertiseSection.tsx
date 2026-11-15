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
    id: "launch",
    label: "Product launch",
    paragraphs: [
      "We will help you to launch the best web & software product in the market with ease, while ensuring flawless execution and maximum market impact.",
      "Our expertise in launching digital projects with precise data insights and optimized strategies will ensure your product reaches its full potential from day one.",
      "We will help you to achieve a successful launch with the combined power of AI acceleration and robust modern engineering.",
    ],
    stat1: "33K",
    stat1Label: "monthly installs at first launch",
    stat2: "12K",
    stat2Label: "revenue in the first month",
  },
  {
    id: "validation",
    label: "Hypothesis validation",
    paragraphs: [
      "We aim to validate that we are on the right track already at the first steps. Using insights from real user research, we will refine your strategies aimed at user acquisition, engagement, and retention.",
      "By analyzing interactions, feedback, and behavioral data, we can validate key assumptions, optimize flows, and identify high-value growth opportunities.",
      "Great measurable results are what we are all about.",
    ],
    stat1: "12+",
    stat1Label: "active enterprise pilots",
    stat2: "8+",
    stat2Label: "validated software architectures",
  },
  {
    id: "scaling",
    label: "Scaling",
    paragraphs: [
      "Scaling is what we are all about. Our experience in successful scaling of high-load platforms will ensure that you are in the right hands.",
      "Whether you're handling increased data loads, expanding user bases, or enhancing service capabilities, our architecture ensures smooth, efficient scaling without compromising speed or quality.",
      "Become a major player in the modern digital market with us!",
    ],
    stat1: "280K",
    stat1Label: "peak requests handled / sec",
    stat2: "100K",
    stat2Label: "concurrent users scaled",
  },
  {
    id: "marketing",
    label: "Product marketing",
    paragraphs: [
      "Revolutionize your strategy with AI-powered, high-converting digital flagships. Unlock the full potential of your brand using our engineering and UI experts.",
      "We will ensure a smooth ride with the product marketing approach — achieve greater impact, efficiency, and ROI from targeted campaigns to optimized content.",
      "Even an amazing product needs exceptional engineering and design, and we are here to make it great.",
    ],
    stat1: "4M+",
    stat1Label: "global platform impressions",
    stat2: "74%",
    stat2Label: "average conversion uplift",
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
      className="w-full px-5 md:px-10 lg:px-[60px] grid grid-cols-4 lg:grid-cols-12 lg:gap-6 -scroll-mt-px gap-[67px] py-20 lg:py-[100px] overflow-hidden"
      id="expertise"
    >
      {/* Col 1: Left Tab Controls & Insights */}
      <div className="col-span-full flex flex-col gap-3 lg:col lg:col-span-6 lg:gap-4 xl:pr-8">
        <div className="flex flex-col items-start gap-2 lg:gap-3 max-md:gap-1">
          <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
            Expertise
          </div>
          <h2
            className="text-h2-d lg:text-h2 font-semibold text-text-black"
            id="title-expertise"
          >
            We have huge expertise
          </h2>
        </div>

        <div className="flex flex-col gap-5 lg:gap-7">
          {/* Capsule Tab Selector matching NeoLeaf border-gallery */}
          <div className="relative max-w-full self-start overflow-hidden rounded-full border border-black/10 bg-black/5 p-1.5">
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
                        ? "bg-accent-1 text-text-black font-semibold shadow-sm"
                        : "text-text-gray hover:text-text-black"
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
              className="text-body-d lg:text-body text-text-gray flex flex-col gap-3.5"
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
              className="grid grid-cols-2 gap-6 pt-4 border-t border-black/10"
            >
              <div>
                <div className="font-semibold text-accent-2 flex text-[48px] leading-none max-xs:text-[38px] lg:text-[56px] xl:text-[80px]">
                  <span className="whitespace-nowrap">{current.stat1}</span>
                </div>
                <div className="text-body-small-d lg:text-body-small text-text-gray mt-2">
                  {current.stat1Label}
                </div>
              </div>
              <div>
                <div className="font-semibold text-accent-2 flex text-[48px] leading-none max-xs:text-[38px] lg:text-[56px] xl:text-[80px]">
                  <span className="whitespace-nowrap">{current.stat2}</span>
                </div>
                <div className="text-body-small-d lg:text-body-small text-text-gray mt-2">
                  {current.stat2Label}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Col 2: Real NeoLeaf Hand & Phone Mockup with GSAP Scroll Scrub */}
      <div className="col-span-full relative flex aspect-[320/274] items-end justify-center overflow-hidden rounded-2xl bg-bg-black md:col-span-2 lg:col-span-6 lg:aspect-[560/481] lg:rounded-[28px] shadow-xl">
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
