"use client";

// ============================================================
// Tamim Global — Kinetic Tags Section
// Exact match to neoleaf.bytetown.agency Section 2
// Multi-row kinetic keyword cloud with bidirectional infinite ticker
// ============================================================

const ROW_A = [
  "smart",
  "deep",
  "cognitive",
  "neural",
  "empathetic",
  "intuitive",
  "machine-learning",
  "data-driven",
  "generative",
  "ultra-scalable",
];

const ROW_B = [
  "Next.js 15",
  "Full-Stack SaaS",
  "Edge Architecture",
  "100% Lighthouse",
  "TypeScript",
  "Turbopack",
  "Stripe Billing",
  "Prisma ORM",
  "Framer Physics",
  "AI Automations",
];

export default function KineticTagsSection() {
  return (
    <section className="py-14 border-y border-white/5 bg-black/60 overflow-hidden select-none">
      {/* Row 1: Forward Ticker */}
      <div className="relative w-full overflow-hidden mb-4">
        <div className="animate-ticker flex items-center gap-4 whitespace-nowrap">
          {[...ROW_A, ...ROW_A, ...ROW_A].map((tag, idx) => (
            <div
              key={idx}
              className="px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all text-sm md:text-base font-medium tracking-wide flex items-center gap-3 group cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-emerald-400 transition-colors" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Ticker */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-ticker-reverse flex items-center gap-4 whitespace-nowrap">
          {[...ROW_B, ...ROW_B, ...ROW_B].map((tag, idx) => (
            <div
              key={idx}
              className="px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/5 hover:border-white/20 text-white/40 hover:text-white/80 transition-all text-xs md:text-sm font-mono tracking-wider flex items-center gap-2 group cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-violet-400 transition-colors" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

