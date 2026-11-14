"use client";

// ============================================================
// Tamim Global — Testimonials Section
// Data-driven: hidden when testimonials array is empty.
// Shows avatar, quote, name, role, company.
// ============================================================

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { staggerContainer, fadeUp, scaleReveal } from "@/lib/animations";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // Hidden when empty — no placeholder cards
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative py-32 lg:py-40">
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20 text-center"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <motion.p variants={fadeUp} className="text-label text-violet-400 uppercase tracking-widest mb-4">
            What Clients Say
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-display-xl text-ink-50">
            Outcomes speak{" "}
            <span className="text-gradient">louder.</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={scaleReveal}
              className="p-7 rounded-2xl glass border border-glass-border hover:border-violet-500/20 transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-6 h-6 text-violet-500/50 mb-5" />

              {/* Quote text */}
              <p className="text-body-md text-ink-300 leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-glass-border">
                {t.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-xl object-cover border border-glass-border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-violet-300 text-body-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-body-sm font-semibold text-ink-50">{t.name}</p>
                  <p className="text-label text-ink-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

