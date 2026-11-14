"use client";

// ============================================================
// Tamim Global — Capabilities & Services Section
// Interactive cybernetic spotlight modules with holographic icons.
// ============================================================

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, Layers, ShoppingBag, Sparkles, CreditCard, Server, Cpu
} from "lucide-react";
import { staggerContainer, fadeUp, scaleReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Layers, ShoppingBag, Sparkles, CreditCard, Server,
};

const SERVICE_TAGS: Record<string, string[]> = {
  "marketing-sites": ["Next.js 16", "Sub-100ms TTI", "Lead Generation", "SEO Dominance"],
  "saas-platforms": ["Multi-tenant", "Real-time Telemetry", "Auth & RBAC", "Stripe Billing"],
  "ecommerce-systems": ["SSLCommerz & bKash", "Live Inventory", "Instant Checkout", "Analytics"],
  "ai-integrations": ["OpenAI & Claude API", "Vector Embeddings", "Automated Agents", "Fine-Tuning"],
  "payment-gateways": ["Webhook Handlers", "Escrow Flows", "PCI Compliance", "Zero Failure Rate"],
};

interface ServicesSectionProps {
  services: Service[];
}

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const Icon = ICON_MAP[service.icon] ?? Cpu;
  const tags = SERVICE_TAGS[service.id] ?? ["Engineered", "Scalable", "Production"];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={cardRef}
      variants={scaleReveal}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, opacity: 0 }))}
      className={cn(
        "spotlight-card group p-8 lg:p-10",
        index === 0 && "lg:col-span-2"
      )}
    >
      {/* Interactive Laser Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, rgba(124,58,237,0.18) 0%, transparent 70%)`,
        }}
      />

      {/* Top Bar: Code Index & Hologram Icon */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-violet-400 uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/5">
            {"// MOD_"}{paddedIndex}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>

        {/* Icon Container with glowing aura */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600/20 via-violet-500/10 to-transparent border border-violet-500/30 flex items-center justify-center text-violet-300 group-hover:scale-110 group-hover:border-violet-400 group-hover:text-cyan-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 mb-8">
        <h3 className="font-display font-bold text-display-md text-white mb-3 group-hover:text-violet-200 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-body-sm text-ink-400 leading-relaxed font-sans max-w-xl">
          {service.description}
        </p>
      </div>

      {/* Futuristic Deliverable Tags */}
      <div className="relative z-10 flex flex-wrap gap-2 pt-6 border-t border-white/5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-mono text-ink-400 group-hover:border-white/10 group-hover:text-violet-300 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="relative py-32 lg:py-44 overflow-hidden">
      {/* Top laser line */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-600/8 blur-[160px] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-24"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-violet-400 uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
              [ 02 // CORE CAPABILITIES ]
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.h2
              variants={fadeUp}
              className="font-display text-display-xl text-white max-w-2xl leading-none"
            >
              Engineered for{" "}
              <span className="text-gradient">peak conversion.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-body-md text-ink-400 max-w-md md:text-right font-sans"
            >
              From bespoke marketing flagships to mission-critical SaaS architectures. We deliver world-class digital craft with engineering rigor.
            </motion.p>
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
