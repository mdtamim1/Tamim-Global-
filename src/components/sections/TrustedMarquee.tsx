"use client";

// ============================================================
// Tamim Global — Trusted Marquee (#trusted)
// Infinite dual ticker matching awmedia.marketing
// ============================================================

const ROW_ONE = [
  "Tatka Bazar",
  "CloudMetrics SaaS",
  "Apex Fitness Glasgow",
  "Adept Heating Systems",
  "PureFactor Formulations",
  "Harcon Construction",
  "Ryze Health Telemetry",
  "No Rub Club UK",
  "RankSauce SEO",
  "Skulpt Fitness",
];

const ROW_TWO = [
  "Next.js 15 App Architecture",
  "Stripe Subscriptions",
  "PostgreSQL & Prisma",
  "Tailwind CSS Engine",
  "Lighthouse 100 Performance",
  "SSLCommerz & bKash Gateway",
  "TypeScript First",
  "Framer Motion Transitions",
  "Three.js & WebGL",
  "Vercel Edge Deployment",
];

export default function TrustedMarquee() {
  return (
    <section className="py-16 border-y border-white/5 overflow-hidden bg-black/40" id="trusted">
      <div className="text-center mb-8 px-4">
        <p className="text-xs md:text-sm font-semibold tracking-widest text-white/40 uppercase">
          Trusted by ambitious founders & engineering teams worldwide
        </p>
      </div>

      {/* Row 1: Forward */}
      <div className="relative w-full overflow-hidden mb-4">
        <div className="animate-ticker flex items-center gap-8 whitespace-nowrap">
          {[...ROW_ONE, ...ROW_ONE].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white/70 hover:text-white transition-colors cursor-default">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-ticker-reverse flex items-center gap-8 whitespace-nowrap">
          {[...ROW_TWO, ...ROW_TWO].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="text-sm md:text-base font-medium tracking-wide text-white/40 font-mono">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

