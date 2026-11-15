"use client";

// ============================================================
// Tamim Global — Technology Architecture Section
// Exact match to neoleaf.bytetown.agency Section 3
// ============================================================

import { ShieldCheck, Terminal } from "lucide-react";

export default function TechArchitectureSection() {
  return (
    <section className="py-28 wrap" id="technology">
      {/* Eyebrow */}
      <div className="eyebrow mb-4">Core Technology</div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Narrative */}
        <div className="lg:col-span-7">
          <h2 className="display text-white mb-8">
            Technology that powers this <span className="chrome">revolution in web engineering.</span>
          </h2>
          <p className="lede text-white/70 mb-6 leading-relaxed">
            At Tamim Global, we engineer cutting-edge digital products built on React 19 Server Components, Next.js 15 App Router, and Vercel Edge networks — delivering sub-second response times without costly maintenance overhead.
          </p>
          <p className="text-sm md:text-base text-white/50 leading-relaxed mb-8">
            Leading software engineering practices drive our builds, bringing the latest advancements in AI pipelines, type-safe database schemas, and micro-interaction physics directly to your production codebase.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="chip">
              <span className="dot"></span>
              <span>React 19 Server Actions</span>
            </span>
            <span className="chip">
              <span className="dot"></span>
              <span>Turbopack Engine</span>
            </span>
            <span className="chip">
              <span className="dot"></span>
              <span>Edge CDN Caching</span>
            </span>
          </div>
        </div>

        {/* Right Column: Telemetry & Benchmark Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass p-7 border-white/15">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                <Terminal size={14} className="text-emerald-400" />
                <span>BENCHMARK_TELEMETRY</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                ACTIVE
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/40">Time to Interactive (TTI)</span>
                <span className="text-white font-bold">&lt; 140ms</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[95%] h-full bg-emerald-400 rounded-full" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-white/40">Google Lighthouse Score</span>
                <span className="text-white font-bold">100 / 100</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-full h-full bg-emerald-400 rounded-full" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-white/40">Edge Network Latency</span>
                <span className="text-white font-bold">12ms Global</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-emerald-400 rounded-full" />
              </div>
            </div>
          </div>

          <div className="glass p-6 border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <ShieldCheck size={20} className="text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Production Hardened</h4>
                <p className="text-xs text-white/50">Zero vulnerabilities · PCI Compliant</p>
              </div>
            </div>
            <span className="text-xs font-mono text-white/40">v15.2</span>
          </div>
        </div>
      </div>
    </section>
  );
}
