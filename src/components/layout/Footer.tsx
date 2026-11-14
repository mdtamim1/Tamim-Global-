// ============================================================
// Tamim Global — Footer
// Exact match to awmedia.marketing's high-end studio footer
// ============================================================

import Link from "next/link";
import CopyrightYear from "@/components/ui/CopyrightYear";

const WORK_LINKS = [
  { href: "/work/tatka-bazar", label: "Tatka Bazar E-Commerce" },
  { href: "/work/cloudmetrics-saas", label: "CloudMetrics SaaS" },
  { href: "/work/apex-fitness", label: "Apex Fitness Platform" },
  { href: "/#work", label: "All Case Studies →" },
];

const SERVICE_LINKS = [
  { href: "/#services", label: "Web Design & Next.js" },
  { href: "/#services", label: "Logo & Brand Identity" },
  { href: "/#services", label: "Bespoke SaaS & Portals" },
  { href: "/#services", label: "Performance SEO" },
  { href: "/#lanes", label: "AI-Accelerated Lane" },
];

const STUDIO_LINKS = [
  { href: "/#about", label: "About Founder" },
  { href: "/#process", label: "How We Work" },
  { href: "/#lanes", label: "Two Production Lanes" },
  { href: "/#why", label: "Why Choose Us" },
  { href: "/#faq", label: "FAQ & Pricing" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black pt-20 pb-12 overflow-hidden">
      <div className="wrap relative z-10">
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs text-white">
                TG
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Tamim Global
              </span>
            </div>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed mb-6">
              Award-winning digital experiences & scalable platforms engineered at AI-accelerated speed. Two lanes. Both fully custom. Never templated.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Q1 / Q2 Projects</span>
            </div>
          </div>

          {/* Work Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-mono font-semibold mb-4">
              Featured Work
            </h4>
            <ul className="space-y-2.5 text-sm">
              {WORK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-mono font-semibold mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-mono font-semibold mb-4">
              Studio
            </h4>
            <ul className="space-y-2.5 text-sm">
              {STUDIO_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Huge Watermark Brand Text */}
        <div className="w-full text-center py-10 border-y border-white/5 select-none pointer-events-none">
          <span className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white/[0.04] block">
            TAMIM GLOBAL
          </span>
        </div>

        {/* Sub-Footer Base */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <div>
            © <CopyrightYear /> Tamim Global Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/mdtamim1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              WhatsApp
            </a>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
