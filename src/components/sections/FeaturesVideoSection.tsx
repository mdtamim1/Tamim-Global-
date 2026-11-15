"use client";

// ============================================================
// Tamim Global — Features Video Section
// Exact match to neoleaf.bytetown.agency Section 6:
// "The best in the business" featuring 3 embedded looping videos
// ============================================================

import { Code2, ShieldCheck, HeartHandshake } from "lucide-react";

const FEATURES = [
  {
    video: "/video/features/1.mp4",
    tag: "01 // ZERO-TEMPLATE",
    icon: Code2,
    title: "Customizable, Bespoke Architecture",
    description: "Tamim Global provides fully bespoke software systems tailored to your exact business operations. No fragile WordPress plugins, no off-the-shelf themes, and zero bloated dependencies.",
    highlights: ["Hand-Crafted Components", "Tailwind v4 Clean CSS", "Full Source Ownership"],
  },
  {
    video: "/video/features/2.mp4",
    tag: "02 // ENTERPRISE SCALE",
    icon: ShieldCheck,
    title: "Edge Security & Infinite Scalability",
    description: "Built from day one to withstand traffic surges and cyber threats. Automated DDoS protection, SSL encryption, and Edge distribution across 300+ global data centers.",
    highlights: ["Global Edge CDN", "99.99% Guaranteed SLA", "Automated Security Patches"],
  },
  {
    video: "/video/features/3.mp4",
    tag: "03 // DIRECT CRAFTSMANSHIP",
    icon: HeartHandshake,
    title: "Relentless Post-Launch Partnership",
    description: "We don't disappear after launch. We remain your dedicated technical partner — monitoring real-time telemetry, updating security patches, and rolling out feature enhancements.",
    highlights: ["Direct Engineer Access", "Proactive CRO Tuning", "Monthly Feature Sprints"],
  },
];

export default function FeaturesVideoSection() {
  return (
    <section className="py-24 wrap" id="features">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="eyebrow">Production Excellence</div>
        <h2 className="display text-white mb-4">
          The best in <span className="chrome">the business.</span>
        </h2>
        <p className="lede max-w-xl mx-auto">
          Every project is treated as a mission-critical asset, engineered to outperform competition in speed, stability, and aesthetics.
        </p>
      </div>

      {/* 3 Features Cards with Embedded Videos */}
      <div className="space-y-8 max-w-5xl mx-auto">
        {FEATURES.map((item, index) => {
          const Icon = item.icon;
          const isReversed = index % 2 === 1;

          return (
            <div
              key={index}
              className="glass p-6 md:p-10 rounded-[32px] border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group hover:border-white/25 transition-all"
            >
              {/* Content Column */}
              <div className={`lg:col-span-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-emerald-400 font-semibold">
                  <Icon size={16} />
                  <span>{item.tag}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-mono text-white/70">
                  {item.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Video Column */}
              <div className={`lg:col-span-6 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
