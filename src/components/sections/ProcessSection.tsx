"use client";

// ============================================================
// Tamim Global — Cyber Execution Pipeline (Process Section)
// High-tech timeline with illuminated laser connector & execution briefs.
// ============================================================

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { CheckCircle2 } from "lucide-react";
import type { ProcessStep } from "@/types";

interface ProcessSectionProps {
  steps: ProcessStep[];
}

const STEP_METRICS = [
  { phase: "PHASE_01", output: "Architecture Blueprint & High-Fidelity UX", duration: "Week 01" },
  { phase: "PHASE_02", output: "Full-Stack System & Interactive Motion",    duration: "Week 02-03" },
  { phase: "PHASE_03", output: "Security, Performance & Conversion Tuning",  duration: "Week 04" },
  { phase: "PHASE_04", output: "Global Deployment & DNS Verification",       duration: "Day of Launch" },
  { phase: "PHASE_05", output: "Post-Launch Monitoring & Optimization",      duration: "Ongoing" },
];

export default function ProcessSection({ steps }: ProcessSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative py-32 lg:py-44 overflow-hidden">
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20 lg:mb-28 text-center max-w-2xl mx-auto"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-violet-400 uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
              [ 03 // EXECUTION PIPELINE ]
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display text-display-xl text-white mb-4">
            Engineered for{" "}
            <span className="text-gradient">precision &amp; speed.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-body-md text-ink-400 font-sans">
            A battle-tested 5-phase delivery framework that eliminates friction, guarantees deadline certainty, and ships flawless digital products.
          </motion.p>
        </motion.div>

        {/* High-tech Roadmap */}
        <div className="relative">
          {/* Glowing Laser Connector Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" aria-hidden>
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-violet-500 via-cyan-400 to-violet-500 origin-top shadow-[0_0_15px_#22D3EE]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-20">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const metric = STEP_METRICS[index] ?? { phase: `PHASE_0${index+1}`, output: "Milestone Delivery", duration: "Sprint" };
              const paddedStep = String(step.step).padStart(2, "0");

              return (
                <motion.div
                  key={step.step}
                  className={`relative flex items-center gap-8 md:gap-16 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Glowing Node on the Central Line */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex-shrink-0">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-base-950 border border-violet-400/50 shadow-[0_0_20px_rgba(124,58,237,0.4)] backdrop-blur-xl group">
                      <span className="font-mono font-bold text-xs text-white">
                        {paddedStep}
                      </span>
                      <span className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping opacity-25" />
                    </div>
                  </div>

                  {/* Execution Brief Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-4rem)] p-8 rounded-3xl glass-card border border-white/10 hover:border-violet-500/40 hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.25)] transition-all duration-500 ${isEven ? "md:mr-auto" : "md:ml-auto"}`}
                  >
                    {/* Top Brief Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5 font-mono text-[11px]">
                      <span className="text-violet-400 tracking-wider font-semibold">
                        {metric.phase}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-cyan-300 border border-white/5">
                        {metric.duration}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-display-md text-white mb-3">
                      {step.title}
                    </h3>

                    <p className="text-body-sm text-ink-400 leading-relaxed font-sans mb-6">
                      {step.description}
                    </p>

                    {/* Output Tag */}
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5 text-[11px] font-mono text-ink-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-ink-400">Deliverable:</span>
                      <span className="text-white font-medium">{metric.output}</span>
                    </div>
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
