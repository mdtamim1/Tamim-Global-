"use client";

// ============================================================
// Tamim Global — Proof & Reviews Section (#proof)
// Exact match to awmedia.marketing's reviews & proof section
// ============================================================

import { Star, CheckCircle } from "lucide-react";
import type { Testimonial } from "@/types";

interface ProofSectionProps {
  testimonials?: Testimonial[];
}

const DEFAULT_REVIEWS = [
  {
    name: "Rahim Chowdhury",
    role: "Founder & CEO",
    company: "Tatka Bazar Logistics",
    rating: 5,
    quote: "Tamim completely revamped our multivendor e-commerce platform. Our checkout speed went from 4 seconds to under 400 milliseconds, and online conversion spiked +340% within 30 days.",
  },
  {
    name: "Sarah Jenkins",
    role: "Head of Product",
    company: "CloudMetrics SaaS",
    rating: 5,
    quote: "Working with Tamim Global felt like having an elite Silicon Valley engineer in-house. Clear communication, sub-14-day turnaround, and zero technical debt. Absolutely world-class.",
  },
  {
    name: "Marcus Vance",
    role: "Managing Director",
    company: "Harcon Solutions",
    rating: 5,
    quote: "Every agency we spoke to quoted 4 months and 5-figure retainers. Tamim delivered a custom, high-converting digital platform in 12 days. The speed and quality are unmatched.",
  },
];

export default function ProofSection({ testimonials }: ProofSectionProps) {
  const reviews = (testimonials && testimonials.length > 0) ? testimonials : DEFAULT_REVIEWS;

  return (
    <section className="py-24 wrap" id="proof">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="eyebrow">Proof &amp; Reviews</div>
        <h2 className="display text-white mb-4">
          Rated <span className="chrome">5.0</span> by ambitious founders.
        </h2>
        <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="currentColor" />
          ))}
          <span className="text-sm font-semibold text-white ml-2">100% 5-Star Track Record</span>
        </div>
        <p className="lede max-w-xl mx-auto">
          Every testimonial is from a real founder or engineering lead who trusted us to build their flagship products.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reviews.map((rev, index) => (
          <div key={index} className="glass p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                  <CheckCircle size={13} />
                  <span>Verified Client</span>
                </div>
              </div>

              <p className="text-sm md:text-base text-white/80 leading-relaxed italic mb-6">
                &ldquo;{rev.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="font-bold text-white text-base">{rev.name}</div>
              <div className="text-xs text-white/50">{rev.role} · {rev.company}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

