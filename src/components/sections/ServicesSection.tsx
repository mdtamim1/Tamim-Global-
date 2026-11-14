"use client";

// ============================================================
// Tamim Global — Services Section (#services)
// Bento grid matching awmedia.marketing's unified agency services
// ============================================================

import { useState } from "react";
import { Globe, ShoppingBag, Sparkles, Server, Zap } from "lucide-react";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

const SERVICES_DATA = [
  {
    number: "01",
    title: "Web Design & Next.js Development",
    description: "Ultra-fast, fluidly responsive websites and web applications built from scratch on Next.js 15, React 19, and Tailwind CSS. 100% Google Lighthouse score guaranteed.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "100% Lighthouse"],
    icon: Globe,
    featured: true,
  },
  {
    number: "02",
    title: "Logo Design & Brand Systems",
    description: "Modern brand identity systems, custom typography, color tokens, and design systems that establish immediate trust and premium positioning.",
    tags: ["Brand Identity", "Design Tokens", "Typography", "Guidelines"],
    icon: Sparkles,
    featured: false,
  },
  {
    number: "03",
    title: "Bespoke Systems & Software",
    description: "Custom multi-tenant SaaS dashboards, client portals, booking engines, and database architectures with role-based auth and automated workflows.",
    tags: ["PostgreSQL", "Prisma ORM", "Auth.js", "REST / GraphQL"],
    icon: Server,
    featured: false,
  },
  {
    number: "04",
    title: "E-Commerce & Payment Engines",
    description: "High-converting online shopping platforms with zero-latency checkout, cart recovery, and seamless integrations for Stripe, bKash, Nagad, and SSLCommerz.",
    tags: ["Stripe Subscriptions", "SSLCommerz", "bKash & Nagad", "Webhook Pipelines"],
    icon: ShoppingBag,
    featured: false,
  },
  {
    number: "05",
    title: "Performance SEO & Conversion Architecture",
    description: "Engineered search dominance: semantic JSON-LD structured data, instant edge caching, core web vitals optimization, and conversion funnel auditing.",
    tags: ["Edge Caching", "JSON-LD Schema", "Core Web Vitals", "Analytics"],
    icon: Zap,
    featured: false,
  },
];

export default function ServicesSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-24 wrap" id="services">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="eyebrow">Disciplines &amp; Capabilities</div>
        <h2 className="display text-white mb-4">
          Stop paying multiple agencies <span className="chrome">for things that should work together.</span>
        </h2>
        <p className="lede max-w-2xl mx-auto">
          We bring high-end design, production engineering, performance SEO, and full-stack software under one unified, accountable roof.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.number}
              className={`glass p-8 flex flex-col justify-between group transition-all duration-300 ${
                service.featured ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                  <span className="text-xs font-mono font-semibold text-white/40">
                    DISCIPLINE // {service.number}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-solid"
        >
          <span>Request a Tailored Quote</span>
        </button>
      </div>

      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
