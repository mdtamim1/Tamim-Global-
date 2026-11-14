// ============================================================
// Tamim Global — Footer
// Minimal, premium. Back-to-top, socials, legal line.
// ============================================================

import Link from "next/link";
import { getContent } from "@/lib/content";
import BackToTop from "@/components/ui/BackToTop";
import CopyrightYear from "@/components/ui/CopyrightYear";

const NAV_LINKS = [
  { href: "/#work",     label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process",  label: "Process" },
  { href: "/#about",    label: "About" },
  { href: "/#contact",  label: "Contact" },
];

export default async function Footer() {
  const content = await getContent();
  const { contact } = content;

  return (
    <footer className="relative border-t border-glass-border">
      {/* Subtle violet glow top-centre */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-violet flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">TL</span>
              </div>
              <span className="font-display font-semibold text-ink-50">Tamim Global</span>
            </div>
            <p className="text-body-sm text-ink-400 max-w-[240px] leading-relaxed">
              Building digital products that convert. Based in Dhaka, working worldwide.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-label uppercase text-ink-500 mb-5 tracking-widest">Navigate</p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-ink-400 hover:text-ink-50 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-label uppercase text-ink-500 mb-5 tracking-widest">Get in Touch</p>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${contact.email}`}
                className="text-body-sm text-ink-400 hover:text-violet-400 transition-colors duration-200"
              >
                {contact.email}
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-ink-400 hover:text-violet-400 transition-colors duration-200"
              >
                WhatsApp
              </a>
              <div className="flex items-center gap-4 mt-4">
                {contact.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label text-ink-400 hover:text-ink-50 uppercase tracking-wider transition-colors duration-200"
                    aria-label={social.platform}
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-glass-border">
          <p className="text-label text-ink-500">
            © <CopyrightYear /> Tamim Global. All rights reserved.
          </p>
          <p className="text-label text-ink-500">
            Designed & built by Tamim
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
