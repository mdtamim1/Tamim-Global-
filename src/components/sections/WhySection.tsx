"use client";

// ============================================================
// Tamim Global — Why Choose Us Section (#why)
// Exact match to awmedia.marketing's "Why ambitious businesses choose us"
// ============================================================

import { Clock, HeartHandshake, ShieldCheck, Cpu } from "lucide-react";

const REASONS = [
  {
    icon: Clock,
    title: "We deliver on time. Always.",
    description: "Every sprint comes with a locked timeline. No scope creep, no endless delays, and zero excuses. When we commit to a launch date, we hit it.",
  },
  {
    icon: HeartHandshake,
    title: "We don't disappear after launch.",
    description: "Shipping is just day one. We stay active to monitor performance, optimize conversion rates, push security updates, and scale features as you grow.",
  },
  {
    icon: ShieldCheck,
    title: "We're not corporate. We're direct.",
    description: "No layers of account managers, sales reps, or junior handoffs. You talk directly with the engineer designing and building your product.",
  },
  {
    icon: Cpu,
    title: "Engineered on modern foundations.",
    description: "No slow WordPress themes or fragile page-builders. We build on Next.js 15, TypeScript, and Edge networks for unmatched speed and security.",
  },
];

export default function WhySection() {
  return (
    <section className="py-24 wrap" id="why">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="eyebrow">Differentiators</div>
        <h2 className="display text-white mb-4">
          Why ambitious businesses <span className="chrome">choose us.</span>
        </h2>
        <p className="lede max-w-2xl mx-auto">
          We combine the agility of an elite solo craftsman with the engineering rigor of a top-tier digital product studio.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {REASONS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="glass p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 group-hover:bg-white/10 transition-all">
                  <Icon size={22} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

