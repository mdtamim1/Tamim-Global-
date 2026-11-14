"use client";

// ============================================================
// Tamim Global — Intro & Pain Section (#intro & #pain)
// Exact match to awmedia.marketing's manifesto & contrast grid
// ============================================================

import { XCircle, CheckCircle2 } from "lucide-react";

const COMPARISONS = [
  {
    oldTitle: "Traditional Agency Retainers",
    oldDesc: "Slow 4–6 month delivery cycles, bloated overhead, and endless unproductive meetings.",
    newTitle: "AI-Accelerated Sprints",
    newDesc: "Live production builds delivered in 7 to 14 days without sacrificing bespoke craft.",
  },
  {
    oldTitle: "Junior Dev Handoffs",
    oldDesc: "Sold by seasoned executives, then delegated to interns or outsourced offshore teams.",
    newTitle: "Direct Principal Access",
    newDesc: "You deal directly with Tamim — from system architecture to pixel-perfect deployment.",
  },
  {
    oldTitle: "Templated WordPress Sprawl",
    oldDesc: "Heavy bloated themes, 40+ plugins, brittle security vulnerabilities, and sluggish page loads.",
    newTitle: "Next.js 15 Clean Architecture",
    newDesc: "Engineered on React 19, TypeScript, and Edge CDN with 100% Google Lighthouse scores.",
  },
];

export default function IntroPainSection() {
  return (
    <section className="py-24 wrap" id="intro">
      {/* Intro Manifesto */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <div className="eyebrow">Studio Manifesto</div>
        <h2 className="display text-white mb-6">
          Award-winning design, <span className="chrome">AI-accelerated</span> where it counts, bespoke where it matters.
        </h2>
        <p className="lede max-w-2xl mx-auto">
          We cut through the agency fluff. No account managers, no junior handoffs, no bloated retainers. Just clean engineering, high-converting interfaces, and systems that scale.
        </p>
      </div>

      {/* Pain Comparison Section */}
      <div className="max-w-5xl mx-auto" id="pain">
        <div className="text-center mb-12">
          <div className="chip mb-3">
            <span className="dot"></span>
            <span>Why The Old Agency Model Fails</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
            Stop paying multiple agencies for things that should work together.
          </h3>
        </div>

        {/* 3-Column Contrast Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMPARISONS.map((item, index) => (
            <div key={index} className="glass p-7 flex flex-col justify-between">
              {/* The Old Way */}
              <div className="pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <XCircle size={15} />
                  <span>The Typical Agency</span>
                </div>
                <h4 className="text-base font-bold text-white/70 mb-2">{item.oldTitle}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{item.oldDesc}</p>
              </div>

              {/* The Tamim Global Way */}
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <CheckCircle2 size={15} />
                  <span>Tamim Global Standard</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.newTitle}</h4>
                <p className="text-xs text-white/70 leading-relaxed">{item.newDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
