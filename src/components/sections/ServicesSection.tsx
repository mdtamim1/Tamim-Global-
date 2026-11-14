"use client";

// ============================================================
// Tamim Global — Services Section
// Interactive cards with icon, hover glow, mouse-tracking
// spotlight, and stagger reveal.
// ============================================================

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, Layers, ShoppingBag, Sparkles, CreditCard, Server,
} from "lucide-react";
import { staggerContainer, fadeUp, scaleReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Layers, ShoppingBag, Sparkles, CreditCard, Server,
};

interface ServicesSectionProps {
  services: Service[];
}

/** Mouse-tracking spotlight card */
function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const Icon = ICON_MAP[service.icon] ?? Globe;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={scaleReveal}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, opacity: 0 }))}
      className={cn(
        "group relative p-7 rounded-2xl glass border border-glass-border overflow-hidden",
        "hover:border-violet-500/30 hover:shadow-glow-sm",
        "transition-all duration-500 cursor-default",
        index === 0 && "lg:col-span-2"
      )}
    >
      {/* Mouse-tracking spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(300px circle at ${spotlight.x}% ${spotlight.y}%, rgba(124,58,237,0.10) 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-all duration-300">
        <Icon className="w-5 h-5 text-violet-400" />
      </div>

      {/* Text */}
      <h3 className="font-display font-semibold text-display-md text-ink-50 mb-3 group-hover:text-violet-200 transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-body-sm text-ink-400 leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="relative py-32 lg:py-40">
      {/* Top rule */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <motion.p variants={fadeUp} className="text-label text-violet-400 uppercase tracking-widest mb-4">
            What I Build
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2 variants={fadeUp} className="font-display text-display-xl text-ink-50 max-w-2xl">
              Services that{" "}
              <span className="text-gradient">drive results.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body-md text-ink-400 max-w-sm md:text-right">
              Every engagement is scoped to your exact needs — no bloat, no guesswork.
            </motion.p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer(0.1, 0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

