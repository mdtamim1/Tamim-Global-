"use client";

// ============================================================
// Tamim Global — Key Features with Synchronized Videos
// Exact 1:1 Match to neoleaf.bytetown.agency Section 6
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Customizable architecture",
    text: "Tamim Global provides advanced full-stack customization tools and modular Next.js architectures that deliver top application performance at zero technical debt.",
    video: "/video/features/1.mp4",
  },
  {
    id: 2,
    title: "Enterprise security & privacy",
    text: "SOC2-ready protocols, automated sanitization, end-to-end encryption, and role-based access controls engineered into every database and endpoint.",
    video: "/video/features/2.mp4",
  },
  {
    id: 3,
    title: "Sub-50ms global edge speed",
    text: "Global edge deployments across 300+ distributed nodes on Vercel and Cloudflare, ensuring instantaneous responses for users worldwide.",
    video: "/video/features/3.mp4",
  },
];

export default function NeoFeaturesSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative -mt-20 lg:mt-[-100px] py-20" id="features">
      <div className="w-full px-5 md:px-10 lg:px-[60px] grid grid-cols-4 gap-5 lg:grid-cols-12 lg:gap-6 gap-y-4 pt-20 lg:gap-y-8 lg:pt-[100px]">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 lg:gap-3 col-span-full md:col-span-2 lg:col-span-5 lg:-mr-6">
          <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
            Key features
          </div>
          <h2
            className="text-h2-d lg:text-h2 font-semibold styles_gradientMask__lzbc_ text-text-black"
            id="title-features"
          >
            The best in the business
          </h2>
        </div>

        {/* Video Stage (Left) */}
        <div className="relative col-span-full aspect-[320/274] overflow-hidden rounded-2xl md:col-span-2 md:row-start-2 lg:col-span-5 lg:-mr-6 lg:aspect-[560/481] lg:rounded-[28px] bg-bg-black shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.video
              key={features[activeIdx].video}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="size-full object-cover rounded-[inherit]"
              playsInline
              autoPlay
              loop
              muted
            >
              <source src={features[activeIdx].video} type="video/mp4" />
            </motion.video>
          </AnimatePresence>
        </div>

        {/* Feature Cards Column (Right) */}
        <div className="relative col-span-full flex flex-col gap-4 max-md:grid md:col-span-2 md:row-start-2 lg:col-span-6 lg:col-start-7 lg:gap-6">
          {features.map((feat, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveIdx(idx)}
                className={`relative z-0 flex gap-6 overflow-hidden rounded-3xl p-6 lg:rounded-[28px] lg:p-8 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-bg-dark-gray text-white shadow-xl ring-2 ring-accent-1/60 scale-[1.01]"
                    : "bg-[#202124] text-white/70 hover:bg-[#28292d] hover:text-white"
                }`}
              >
                <div className="flex grow flex-col justify-end gap-2">
                  <div className="text-h4-d font-semibold max-md:mb-3 lg:text-[34px] tracking-tight">
                    {feat.title}
                  </div>
                  <div className="text-body-small-d lg:text-body-small text-text-light-gray mb-3 lg:mb-6">
                    {feat.text}
                  </div>
                  <div className="text-body-d self-start font-semibold text-accent-1 flex items-center gap-2">
                    <span>0{feat.id}</span>
                    <span className="w-8 h-px bg-accent-1 inline-block" />
                    <span className="text-xs uppercase tracking-wider text-white/60">
                      {isActive ? "Active Feature" : "Click to View Video"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

