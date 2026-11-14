"use client";

// ============================================================
// Tamim Global — Process Section (#process)
// Exact match to awmedia.marketing's "From brief to live site"
// ============================================================

const STEPS = [
  {
    num: "01",
    title: "We figure out exactly what you need.",
    description: "A free, no-obligation strategy session. We map your business goals, target audience, technical requirements, and deliver a fixed quote and guaranteed timeline.",
    output: "Scope & Architecture Brief",
  },
  {
    num: "02",
    title: "We move fast. With more options.",
    description: "Rapid wireframes, user flow diagrams, and multiple design directions presented in days, not weeks. You give real-time feedback so we lock the exact vision.",
    output: "Interactive Design Prototypes",
  },
  {
    num: "03",
    title: "Crafting the pixel-perfect experience.",
    description: "Every button, interaction, font pairing, and responsive breakpoint is refined. Bespoke typography and fluid micro-animations that feel instant and tactile.",
    output: "Production Design System",
  },
  {
    num: "04",
    title: "Engineered on a modern stack.",
    description: "Built clean on Next.js 15, React 19, TypeScript, and Tailwind CSS. No sluggish plugins or bloated templates. 100% Lighthouse scores across all metrics.",
    output: "Full-Stack Codebase",
  },
  {
    num: "05",
    title: "We ship, then we stick around.",
    description: "Zero-downtime deployment to Vercel Edge CDN, custom domain routing, SSL security, and proactive monthly optimization to ensure ongoing ROI.",
    output: "Live Production & Scaling",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 wrap" id="process">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="eyebrow">How We Work</div>
        <h2 className="display text-white mb-4">
          From brief to live site, <span className="chrome">in five clear steps.</span>
        </h2>
        <p className="lede max-w-2xl mx-auto">
          A predictable, transparent delivery framework designed to ship world-class digital products with deadline certainty.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="glass p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:border-white/20 transition-all"
          >
            <div className="flex items-start gap-6">
              <span className="text-2xl md:text-3xl font-mono font-bold text-white/30 group-hover:text-white transition-colors">
                {step.num}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>

            <div className="flex-none self-end md:self-center">
              <span className="text-xs font-mono text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                {step.output}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
