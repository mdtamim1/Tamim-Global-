"use client";

// ============================================================
// Tamim Global — Expertise Interactive Tabs Section
// Exact 1:1 Match to neoleaf.bytetown.agency Section 5
// ============================================================

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const tabsData = [
  {
    id: "launch",
    label: "Product launch",
    paragraphs: [
      "We will help you launch the best web & SaaS product in the market with ease, ensuring flawless architecture and maximum market impact from day one.",
      "Our expertise in deploying high-performance applications with precise telemetry and optimized user journeys ensures your product converts visitors into loyal customers.",
      "We will help you achieve a successful launch with the combined power of AI acceleration and robust modern engineering.",
    ],
    metric: "14 Days",
    metricLabel: "Average MVP Launch Velocity",
  },
  {
    id: "validation",
    label: "Hypothesis validation",
    paragraphs: [
      "We aim to validate that we are on the right track already at the first steps. Using rapid interactive prototypes, we test real user friction and refine conversion pathways.",
      "By analyzing interactions, user feedback, and behavioral data, we validate key assumptions, optimize flows, and uncover high-value growth opportunities.",
      "Real business metrics and measurable conversion are what we are all about.",
    ],
    metric: "3.2x",
    metricLabel: "Average Conversion Uplift",
  },
  {
    id: "scaling",
    label: "Scaling architecture",
    paragraphs: [
      "Scaling is what we are all about. Our experience in engineering distributed, serverless, and multi-tenant architectures ensures you are in expert hands.",
      "Whether you are handling millions of requests, heavy database throughput, or expanding across global regions, our architectures scale smoothly without sacrificing speed.",
      "Grow into a powerhouse in your market with zero technical debt.",
    ],
    metric: "99.99%",
    metricLabel: "System Uptime & Reliability",
  },
  {
    id: "engineering",
    label: "Full-stack engineering",
    paragraphs: [
      "Revolutionize your tech stack with AI-powered, full-stack software development. Unlock the full potential of modern Next.js 15, PostgreSQL, and Cloudflare Edge.",
      "We ensure smooth end-to-end delivery — from bespoke design systems and component libraries to secure REST & GraphQL microservices.",
      "Every single line of code is meticulously crafted, modular, and optimized for lifetime maintainability.",
    ],
    metric: "<50ms",
    metricLabel: "Global Edge Response Time",
  },
];

export default function NeoExpertiseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabsData[activeTab];

  return (
    <section
      className="w-full px-5 md:px-10 lg:px-[60px] grid grid-cols-4 lg:grid-cols-12 lg:gap-6 -scroll-mt-px gap-[67px] py-20 lg:py-[100px]"
      id="expertise"
    >
      {/* Left Column: Interactive Tab Controls & Insights */}
      <div className="col-span-full flex flex-col gap-3 lg:col lg:col-span-6 lg:gap-4 xl:pr-8">
        <div className="flex flex-col items-start gap-2 lg:gap-3 max-md:gap-1">
          <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
            Expertise
          </div>
          <h2
            className="text-h2-d lg:text-h2 font-semibold styles_gradientMask__lzbc_ text-text-black"
            id="title-expertise"
          >
            We have huge expertise
          </h2>
        </div>

        <div className="flex flex-col gap-5 lg:gap-7">
          {/* Tab Selector Pill Track */}
          <div className="relative max-w-full self-start overflow-hidden rounded-full border border-black/15 bg-black/5 p-1.5">
            <div className="flex flex-wrap gap-1">
              {tabsData.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`group relative z-0 inline-flex shrink-0 cursor-pointer appearance-none items-center justify-center gap-2 whitespace-nowrap border-0 px-4 py-2 text-center text-sm font-medium tracking-normal rounded-full transition-all duration-300 ${
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

          {/* Dynamic Tab Body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-body-d lg:text-body text-text-gray flex flex-col gap-4"
            >
              {current.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: Visual Stage with NeoLeaf Background & Metrics */}
      <div className="col-span-full relative flex min-h-[360px] lg:min-h-[460px] items-center justify-center overflow-hidden rounded-3xl bg-bg-dark-gray p-8 text-white lg:col-span-6 lg:rounded-[36px] shadow-lg">
        {/* Decorative Background */}
        <div className="absolute inset-0 select-none pointer-events-none opacity-40">
          <Image
            alt="Expertise Background"
            src="/neoleaf-media/bg.7173f725.webp"
            fill
            className="object-cover"
          />
        </div>

        {/* Dynamic Metric Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 max-w-sm"
          >
            <div className="font-brand font-extrabold text-5xl md:text-7xl text-accent-1 tracking-tight mb-2">
              {current.metric}
            </div>
            <div className="text-body-d lg:text-body font-medium text-white/90">
              {current.metricLabel}
            </div>
            <div className="mt-4 text-xs uppercase tracking-wider text-text-light-gray font-mono">
              Tamim Global Standard
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

