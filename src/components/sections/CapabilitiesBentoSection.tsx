"use client";

// ============================================================
// Tamim Global — Capabilities Bento Section
// Exact match to neoleaf.bytetown.agency Section 4:
// "What's possible with us" with embedded looping media video
// ============================================================

import { Globe, Layers, Sparkles, ShoppingBag } from "lucide-react";

export default function CapabilitiesBentoSection() {
  return (
    <section className="py-24 wrap" id="products">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="eyebrow">Disciplines &amp; Deliverables</div>
        <h2 className="display text-white mb-4">
          What’s possible <span className="chrome">with us.</span>
        </h2>
        <p className="lede max-w-xl mx-auto">
          From rapid high-converting marketing flagships to complex multi-tenant SaaS and automated AI systems.
        </p>
      </div>

      {/* 4 Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Card 1: Web Apps & Flagships (7 cols) */}
        <div className="lg:col-span-7 glass p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <span className="text-xs font-mono text-white/40 uppercase">01 // PRODUCTION WEB</span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Globe size={18} />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              High-Converting Web Applications
            </h3>
            <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 max-w-lg">
              Sub-second page speeds, custom fluid typography, responsive micro-interactions, and conversion-optimized sales funnels engineered on Next.js 15.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 text-xs font-mono text-white/50">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Sub-100ms TTI</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Edge SSR</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Tailwind v4</span>
          </div>
        </div>

        {/* Card 2: SaaS Platforms (5 cols) */}
        <div className="lg:col-span-5 glass p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <span className="text-xs font-mono text-white/40 uppercase">02 // CLOUD SAAS</span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Layers size={18} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Multi-Tenant SaaS Dashboards
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Complete software backends, PostgreSQL schemas, Prisma ORM, role-based auth, and automated Stripe / SSLCommerz recurring billing.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 text-xs font-mono text-white/50">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">PostgreSQL</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Stripe Billing</span>
          </div>
        </div>

        {/* Card 3: AI Workflows (5 cols) */}
        <div className="lg:col-span-5 glass p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <span className="text-xs font-mono text-white/40 uppercase">03 // AI PIPELINES</span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              AI Automations &amp; Workflows
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Connecting modern LLMs, vector search, automated data parsers, and custom API integrations directly into your core business workflow.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 text-xs font-mono text-white/50">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">LLM Integrations</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Vector DBs</span>
          </div>
        </div>

        {/* Card 4: Embedded Video Card (7 cols) - NeoLeaf Signature */}
        <div className="lg:col-span-7 glass p-8 flex flex-col justify-between overflow-hidden relative group hover:border-white/25 transition-all">
          <div className="relative z-10 mb-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <span className="text-xs font-mono text-white/40 uppercase">04 // INTERACTIVE MEDIA ENGINE</span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <ShoppingBag size={18} />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Digital Systems &amp; Visual Generation
            </h3>
            <p className="text-sm text-white/60 leading-relaxed max-w-md">
              High-definition interactive product showcases, video embeds, and fluid real-time ecommerce checkouts that convert at 3x standard benchmarks.
            </p>
          </div>

          {/* Embedded Looping Video */}
          <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden border border-white/15 bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/video/product-image-generation.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 text-[11px] font-mono text-white/70 bg-black/60 px-2.5 py-1 rounded-md border border-white/10">
              LIVE_MEDIA_STREAM // 60FPS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
