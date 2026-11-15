"use client";

// ============================================================
// Tamim Global — Expertise Tabs Section
// Exact match to neoleaf.bytetown.agency Section 5
// Interactive tab switching with dynamic metrics & copy
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, TrendingUp, Target, ArrowRight } from "lucide-react";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

const TABS = [
  {
    id: "launch",
    title: "Product Launch",
    icon: Rocket,
    headline: "We help you launch market-defining digital products with speed and precision.",
    description: "Our rapid engineering framework takes your project from architecture blueprint to live production in 7 to 14 days, ensuring flawless execution, zero downtime, and immediate market impact.",
    stats: [
      { label: "Average Delivery", value: "12 Days" },
      { label: "Deployment Uptime", value: "99.99%" },
      { label: "Template Usage", value: "0% Custom" },
    ],
  },
  {
    id: "engineering",
    title: "Architecture & Engineering",
    icon: ShieldCheck,
    headline: "Enterprise-grade foundations built without bloated legacy dependencies.",
    description: "Clean Next.js 15 App Router architecture, TypeScript strict typing, normalized PostgreSQL databases, and edge API caching engineered to handle rapid user scaling without refactoring.",
    stats: [
      { label: "Core Web Vitals", value: "100/100" },
      { label: "API Latency", value: "< 50ms" },
      { label: "Type Safety", value: "100% Strict" },
    ],
  },
  {
    id: "scaling",
    title: "Performance Scaling",
    icon: TrendingUp,
    headline: "Engineered to scale from your first 100 users to millions of queries.",
    description: "Serverless Edge functions, global CDN caching, and database query optimization ensure your application remains blazing fast under heavy traffic surges without skyrocketing hosting bills.",
    stats: [
      { label: "Throughput", value: "280K+ Req/m" },
      { label: "Global Edge Nodes", value: "300+" },
      { label: "Cold Start Time", value: "0ms" },
    ],
  },
  {
    id: "cro",
    title: "Conversion Optimization",
    icon: Target,
    headline: "Every pixel, button, and headline is engineered to generate revenue.",
    description: "We don't just build pretty websites. We study user intent, remove checkout friction, optimize visual hierarchy, and craft compelling CTAs that increase sales conversion up to 340%.",
    stats: [
      { label: "Avg Conversion Lift", value: "+340%" },
      { label: "Checkout Friction", value: "Zero Latency" },
      { label: "Mobile Usability", value: "100%" },
    ],
  },
];

export default function ExpertiseTabsSection() {
  const [activeTabId, setActiveTabId] = useState("launch");
  const [modalOpen, setModalOpen] = useState(false);
  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];

  return (
    <section className="py-24 wrap" id="expertise">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="eyebrow">Proven Methodology</div>
        <h2 className="display text-white mb-4">
          We have <span className="chrome">deep expertise.</span>
        </h2>
        <p className="lede max-w-xl mx-auto">
          Combining the speed of an elite solo craftsman with the rigorous standards of high-end software studios.
        </p>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`text-xs md:text-sm px-5 py-2.5 rounded-full border transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-white text-black font-semibold border-white shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon size={14} className={isActive ? "text-black" : "text-white/60"} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Box */}
      <motion.div
        key={activeTab.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="glass p-8 md:p-14 max-w-5xl mx-auto rounded-[32px] border-white/15"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-3 font-semibold">
              EXPERTISE // {activeTab.title.toUpperCase()}
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-snug">
              {activeTab.headline}
            </h3>
            <p className="text-sm md:text-base text-white/60 leading-relaxed mb-8 max-w-2xl">
              {activeTab.description}
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-solid text-xs md:text-sm font-bold flex items-center gap-2"
            >
              <span>Initiate {activeTab.title}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Stats Column */}
          <div className="lg:col-span-4 space-y-4">
            {activeTab.stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                <div className="text-2xl md:text-3xl font-mono font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
