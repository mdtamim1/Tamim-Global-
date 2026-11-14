"use client";

// ============================================================
// Tamim Global — Built Device Section (#built)
// Exact match to awmedia.marketing's browser device showcase
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const SHOWCASE_BUILDS = [
  {
    id: "tatka-bazar",
    title: "Tatka Bazar — Multivendor E-Commerce & Logistics",
    url: "https://tatkabazar.app",
    domain: "tatkabazar.app",
    tag: "Realtime E-Commerce",
    description: "Full-stack marketplace with bKash / Nagad / SSLCommerz payment engine and live courier tracking.",
    gradient: "from-emerald-950/60 via-black to-black",
    accent: "#10b981",
  },
  {
    id: "cloudmetrics-saas",
    title: "CloudMetrics SaaS — Analytics & Telemetry Engine",
    url: "https://cloudmetrics.io",
    domain: "cloudmetrics.io",
    tag: "Multi-Tenant SaaS",
    description: "Next.js 15, PostgreSQL & Stripe billing portal with sub-second real-time queries.",
    gradient: "from-blue-950/60 via-black to-black",
    accent: "#3b82f6",
  },
  {
    id: "apex-fitness",
    title: "Apex Fitness — High-Converting Performance Platform",
    url: "https://apexfitness.com",
    domain: "apexfitness.com",
    tag: "Conversion Flagship",
    description: "Custom headless membership portal with integrated Stripe subscriptions and client onboarding.",
    gradient: "from-violet-950/60 via-black to-black",
    accent: "#8b5cf6",
  },
];

export default function BuiltDeviceSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeBuild = SHOWCASE_BUILDS[activeTab];

  return (
    <section className="py-24 px-4 wrap" id="built">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="chip mb-4">
          <span className="dot"></span>
          <span>Recent Build · {activeBuild.title.split("—")[0].trim()}</span>
        </div>
        <h2 className="display text-white mb-4">
          Built <span className="chrome">like this.</span>
        </h2>
        <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
          Real client work. AI-accelerated build, shipped in weeks not months. Same craft as a six-month bespoke.
        </p>

        {/* Build Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {SHOWCASE_BUILDS.map((build, index) => (
            <button
              key={build.id}
              onClick={() => setActiveTab(index)}
              className={`text-xs md:text-sm px-4 py-2 rounded-full border transition-all ${
                activeTab === index
                  ? "bg-white text-black font-semibold border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 text-white/70 border-white/10 hover:border-white/20"
              }`}
            >
              {build.title.split("—")[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Browser Device Stage */}
      <motion.div
        key={activeBuild.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto"
      >
        <div className="device">
          {/* Top Window Bar */}
          <div className="device-bar">
            <div className="device-lights">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="device-url">
              <em>https://</em>{activeBuild.domain}
            </div>
            <div className="w-12 hidden sm:block"></div>
          </div>

          {/* Interactive Screen Viewport */}
          <div className={`device-screen min-h-[420px] md:min-h-[520px] p-6 md:p-12 flex flex-col justify-between bg-gradient-to-br ${activeBuild.gradient}`}>
            {/* Top Bar inside Preview */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeBuild.accent }}
                />
                <span className="text-xs uppercase tracking-widest font-mono text-white/50">
                  {activeBuild.tag}
                </span>
              </div>
              <a
                href={activeBuild.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Live Preview</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Core Feature Content inside screen */}
            <div className="my-10 max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                {activeBuild.title}
              </h3>
              <p className="text-base md:text-xl text-white/75 leading-relaxed mb-6">
                {activeBuild.description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-md bg-white/10 text-white/80 border border-white/15">
                  Next.js 15 App Router
                </span>
                <span className="px-3 py-1 rounded-md bg-white/10 text-white/80 border border-white/15">
                  Tailwind CSS
                </span>
                <span className="px-3 py-1 rounded-md bg-white/10 text-white/80 border border-white/15">
                  100% Lighthouse Score
                </span>
              </div>
            </div>

            {/* Bottom Actions inside Mockup */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="text-xs text-white/50">
                Engineered & shipped directly by Tamim Global
              </div>
              <Link
                href={`/work/${activeBuild.id}`}
                className="btn btn-solid btn-sm text-xs font-bold flex items-center gap-2"
              >
                <span>Explore Full Case Study</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
