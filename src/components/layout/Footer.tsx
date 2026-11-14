// ============================================================
// Tamim Global — Cybernetic Luxury Footer
// Minimalist high-tech signature with telemetry metadata.
// ============================================================

import Link from "next/link";
import { getContent } from "@/lib/content";
import BackToTop from "@/components/ui/BackToTop";
import CopyrightYear from "@/components/ui/CopyrightYear";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/#work",     label: "Work",     badge: "01" },
  { href: "/#services", label: "Services", badge: "02" },
  { href: "/#process",  label: "Process",  badge: "03" },
  { href: "/#about",    label: "About",    badge: "04" },
  { href: "/#contact",  label: "Contact",  badge: "05" },
];

export default async function Footer() {
  const content = await getContent();
  const { contact } = content;

  return (
    <footer className="relative border-t border-white/10 bg-base-950 overflow-hidden">
      {/* Top laser beam */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22D3EE]"
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Col 1: Brand Mark & Mission (5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 via-violet-500 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                <div className="w-full h-full rounded-full bg-base-950 flex items-center justify-center">
                  <span className="font-display font-black text-xs text-white">TG</span>
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">Tamim Global</span>
            </div>
            <p className="text-body-sm text-ink-400 max-w-sm leading-relaxed font-sans mb-6">
              Full-stack digital architecture & engineering. Designing and developing high-converting digital flagships and scalable SaaS for forward-thinking brands worldwide.
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <span className="radar-beacon"><span /><span /></span>
              <span>BASE OF OPERATIONS: DHAKA, BANGLADESH</span>
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="md:col-span-3">
            <p className="font-mono text-xs text-violet-400 uppercase tracking-widest mb-6">
              Navigation // Index
            </p>
            <ul className="flex flex-col gap-3 font-mono text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-ink-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="text-violet-400/80">{link.badge}</span>
                    <span className="font-sans text-sm text-ink-300 group-hover:text-white">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Network & Comms (4 cols) */}
          <div className="md:col-span-4">
            <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-6">
              Transmissions // Network
            </p>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={`mailto:${contact.email}`}
                className="font-mono text-xs text-ink-300 hover:text-cyan-300 transition-colors flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/30"
              >
                <span>{contact.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-500" />
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-ink-300 hover:text-emerald-300 transition-colors flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-400/30"
              >
                <span>WhatsApp: {contact.whatsapp}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-500" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              {contact.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-[11px] text-ink-400 hover:text-white hover:border-violet-400/40 transition-all duration-200 uppercase tracking-wider"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-xs font-mono text-ink-500">
          <p>© <CopyrightYear /> Tamim Global. All systems operational.</p>
          <div className="flex items-center gap-6">
            <span>AESTHETIC &amp; ENGINEERING PRECISION</span>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
