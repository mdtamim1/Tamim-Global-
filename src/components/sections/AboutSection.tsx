"use client";

// ============================================================
// Tamim Global — About Section (#about)
// Clean liquid glass studio founder profile matching awmedia
// ============================================================

import { MapPin } from "lucide-react";
import type { AboutContent } from "@/types";

interface AboutSectionProps {
  content?: AboutContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  const stats = content?.stats ?? [
    { label: "Websites & Systems Shipped", value: "30+" },
    { label: "Client Satisfaction", value: "100%" },
    { label: "Countries Served", value: "5+" },
    { label: "Average Delivery Time", value: "12 Days" },
  ];

  return (
    <section className="py-24 wrap" id="about">
      <div className="glass p-8 md:p-14 max-w-5xl mx-auto rounded-[32px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Portrait & Quick Info */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:text-left">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-tr from-white/30 via-white/10 to-transparent border border-white/20 mb-6 relative">
              <div className="w-full h-full rounded-full bg-neutral-900 overflow-hidden flex items-center justify-center font-bold text-4xl text-white/40">
                TG
              </div>
              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-2 border-black" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">Md Tamim</h3>
            <p className="text-sm text-white/50 mb-3">Founder &amp; Principal Software Engineer</p>

            <div className="flex items-center gap-2 text-xs text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <MapPin size={13} className="text-emerald-400" />
              <span>Dhaka, Bangladesh · Serving Worldwide</span>
            </div>
          </div>

          {/* Right Column: Studio Story & Stats */}
          <div className="lg:col-span-7">
            <div className="eyebrow mb-4">Behind The Studio</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              A decade of engineering mindset. <span className="chrome">Zero fluff.</span>
            </h2>

            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
              {content?.bio ||
                "I started building web applications because I was frustrated by how bloated, slow, and overpriced agency work had become. Tamim Global is an independent design & engineering studio built on a simple premise: ship high-converting, bespoke digital products with absolute craftsmanship, at AI-accelerated speed."}
            </p>

            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
              Clients deal directly with me. No junior designers, no outsourced developers, and no translation layers. Just direct, high-conviction engineering.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              {stats.map((s, idx) => (
                <div key={idx}>
                  <div className="text-2xl md:text-3xl font-mono font-bold text-white mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
