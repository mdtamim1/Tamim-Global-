"use client";

// ============================================================
// Tamim Global — Dual Lanes Section (#lanes)
// Exact match to awmedia.marketing's "Pick your speed. Pick your depth."
// ============================================================

import { useState } from "react";
import { Zap, Sparkles, Check, ArrowRight } from "lucide-react";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

export default function LanesSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-24 wrap" id="lanes">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="eyebrow">Engagement Models</div>
        <h2 className="display text-white mb-4">
          Pick your speed. <span className="chrome">Pick your depth.</span>
        </h2>
        <p className="lede max-w-xl mx-auto">
          Two distinct production lanes. Both fully custom. Neither templated. Choose the track that matches your goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Lane A: AI-Accelerated */}
        <div className="glass p-8 md:p-10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                7–14 Day Turnaround
              </span>
              <Zap size={20} className="text-emerald-400" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-2">AI-Accelerated Lane</h3>
            <p className="text-sm text-white/60 mb-8 leading-relaxed">
              Full-custom marketing sites, conversion flagships, and lean MVPs designed and engineered with modern AI-assisted workflows to ship at lightning speed.
            </p>

            <ul className="space-y-3 mb-10 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <Check size={16} className="text-emerald-400 flex-none" />
                <span>Custom design — 0% templates, built from scratch</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={16} className="text-emerald-400 flex-none" />
                <span>Next.js 15 & Tailwind CSS clean architecture</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={16} className="text-emerald-400 flex-none" />
                <span>100% Google Lighthouse performance guarantee</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={16} className="text-emerald-400 flex-none" />
                <span>Technical SEO & social share meta built in</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={16} className="text-emerald-400 flex-none" />
                <span>Live production ready in 1 to 2 weeks</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-solid w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
          >
            <span>Book AI-Accelerated Sprint</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Lane B: Bespoke Deep Craft */}
        <div className="glass p-8 md:p-10 flex flex-col justify-between border-violet-500/30 hover:border-violet-500/50 transition-all">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-violet-300 font-semibold bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
                3–6 Week Full Build
              </span>
              <Sparkles size={20} className="text-violet-400" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-2">Bespoke Deep Craft</h3>
            <p className="text-sm text-white/60 mb-8 leading-relaxed">
              Deep product strategy, multi-tenant SaaS dashboards, custom payment engines, interactive 3D/WebGL experiences, and bespoke software systems.
            </p>

            <ul className="space-y-3 mb-10 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <Check size={16} className="text-violet-400 flex-none" />
                <span>Deep architecture & UX wireframing sprints</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={16} className="text-violet-400 flex-none" />
                <span>Full-Stack SaaS, PostgreSQL, Auth & Prisma</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={16} className="text-violet-400 flex-none" />
                <span>Stripe / SSLCommerz / bKash payment infrastructure</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={16} className="text-violet-400 flex-none" />
                <span>Interactive 3D / Three.js & Framer Motion physics</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={16} className="text-violet-400 flex-none" />
                <span>Comprehensive post-launch maintenance & scaling</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-solid w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
          >
            <span>Discuss Bespoke Architecture</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}

