"use client";

// ============================================================
// Tamim Global — Process Section
// 5-step timeline with animated connector line.
// ============================================================

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import type { ProcessStep } from "@/types";

interface ProcessSectionProps {
  steps: ProcessStep[];
}

const STEP_COLORS = [
  "from-violet-500/30 to-violet-700/10",
  "from-blue-500/30 to-blue-700/10",
  "from-cyan-500/30 to-cyan-700/10",
  "from-emerald-500/30 to-emerald-700/10",
  "from-violet-400/30 to-violet-600/10",
];

export default function ProcessSection({ steps }: ProcessSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative py-32 lg:py-40">
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20 text-center"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <motion.p variants={fadeUp} className="text-label text-violet-400 uppercase tracking-widest mb-4">
            How I Work
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-display-xl text-ink-50">
            A process built for{" "}
            <span className="text-gradient">clarity.</span>
          </motion.h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Animated connector line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-glass-border -translate-x-1/2" aria-hidden>
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-violet-500 to-violet-300 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  className={`relative flex items-center gap-8 md:gap-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Step number — centred on the line */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${STEP_COLORS[index]} flex items-center justify-center border border-glass-border glass backdrop-blur-sm`}>
                      <span className="font-display font-bold text-ink-50 text-body-md">
                        {String(step.step).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content card — takes up half width on desktop */}
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-3.5rem)] p-7 rounded-2xl glass border border-glass-border hover:border-violet-500/20 transition-all duration-300 ${isEven ? "md:mr-auto" : "md:ml-auto"}`}>
                    <p className="text-label text-violet-400 uppercase tracking-widest mb-2">
                      Step {step.step}
                    </p>
                    <h3 className="font-display font-semibold text-display-md text-ink-50 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-body-sm text-ink-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

