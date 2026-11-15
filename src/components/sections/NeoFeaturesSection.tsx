"use client";

// ============================================================
// Tamim Global — Key Features with Synchronized Videos & Dot Matrix
// Exact 1:1 Match to neoleaf.bytetown.agency Section 6
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Customizable product",
    tag: "custom",
    text: "Tamim Global provides advanced customization tools that deliver top model and application performance at competitive inference and cloud cost.",
    video: "/video/features/1.mp4",
    dots: [
      false, true, true,
      false, true, false,
      true, false, true
    ],
  },
  {
    id: 2,
    title: "Flexibility and Diversity",
    tag: "flex",
    text: "Tamim Global delivers the greatest variety and diversity of modern architectures to help deliver maximum performance and business conversion.",
    video: "/video/features/2.mp4",
    dots: [
      true, false, true,
      false, false, false,
      true, false, true
    ],
  },
  {
    id: 3,
    title: "Scalability",
    tag: "performance",
    text: "Tamim Global is packaged with distributed edge runtimes that deliver better application throughput at lower costs. Scale up, or down, as needed.",
    video: "/video/features/3.mp4",
    dots: [
      false, true, true,
      true, false, true,
      true, true, false
    ],
  },
];

export default function NeoFeaturesSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative -mt-20 lg:mt-[-100px]" id="features">
      <div className="w-full px-5 md:px-10 lg:px-[60px] grid grid-cols-4 gap-5 lg:grid-cols-12 lg:gap-6 gap-y-4 pt-20 lg:gap-y-8 lg:pt-[100px]">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 lg:gap-3 col-span-full md:col-span-2 lg:col-span-5 lg:-mr-6">
          <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
            Key features
          </div>
          <h2
            className="text-h2-d lg:text-h2 font-semibold text-text-black"
            id="title-features"
          >
            The best in the business
          </h2>
        </div>

        {/* Video Stage (Left) */}
        <div className="relative col-span-full aspect-[320/274] overflow-hidden rounded-2xl md:col-span-2 md:row-start-2 lg:col-span-5 lg:-mr-6 lg:aspect-[560/481] lg:rounded-[28px] bg-bg-black shadow-xl">
          <AnimatePresence mode="wait">
            <motion.video
              key={features[activeIdx].video}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
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
                className={`relative z-0 flex gap-10 overflow-hidden rounded-3xl px-6 py-8 text-white lg:rounded-[28px] lg:p-8 lg:pr-10 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-bg-dark-gray shadow-xl ring-2 ring-accent-1"
                    : "bg-[#232428] opacity-80 hover:opacity-100 hover:bg-bg-dark-gray"
                }`}
              >
                <div className="flex grow flex-col justify-end gap-2">
                  <div className="text-h4-d font-semibold max-md:mb-4 lg:text-[40px] tracking-tight">
                    {feat.title}
                  </div>
                  <div className="text-body-small-d lg:text-body-small text-text-light-gray mb-4 lg:mb-8">
                    {feat.text}
                  </div>
                  <div className="text-body-d self-start rounded-[40px] bg-[#37393E] px-6 py-2 capitalize lg:text-[22px] lg:leading-[120%] text-white font-medium">
                    {feat.tag}
                  </div>
                </div>

                {/* 3x3 Dot Matrix Indicator */}
                <div className="shrink-0 self-start lg:py-2">
                  <div className="relative flex size-[52px] flex-wrap place-content-between gap-1 lg:size-[62px]">
                    {feat.dots.map((isYellow, dotIdx) => (
                      <div
                        key={dotIdx}
                        className={`relative size-3 rounded-full lg:size-[14px] transition-colors duration-300 ${
                          isYellow && isActive ? "bg-[#E6F536]" : "bg-[#747577]"
                        }`}
                      />
                    ))}
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
