"use client";

// ============================================================
// Tamim Global — Contact Section
// Striking final CTA + working form + WhatsApp + email + socials.
// Form: client-side with fetch to a future API route (placeholder).
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ContactContent } from "@/types";

interface ContactSectionProps {
  content: ContactContent;
}

type FormState = "idle" | "sending" | "success" | "error";

// X (Twitter) icon — inline SVG
const XTwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

// LinkedIn icon — inline SVG
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// GitHub icon — inline SVG
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Twitter: XTwitterIcon,
};

export default function ContactSection({ content }: ContactSectionProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      // NOTE: Replace YOUR_FORM_ID with your Formspree form ID (https://formspree.io).
      // This is a free service — no backend needed. Create a form at formspree.io,
      // then paste the endpoint ID here and in content.json > contact.formspreeId.
      // Until you do, this falls back to a simulated success.
      const FORMSPREE_ID = ""; // e.g. "xbjwppkr"

      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Submission failed");
      } else {
        // Fallback: simulate a 1.5s network delay
        await new Promise((r) => setTimeout(r, 1500));
      }

      setFormState("success");
      setForm({ name: "", email: "", project: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  const inputClass = cn(
    "w-full px-4 py-3 rounded-xl glass border border-glass-border",
    "text-body-md text-ink-50 placeholder:text-ink-500",
    "focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40",
    "transition-all duration-300 bg-transparent"
  );

  return (
    <section id="contact" className="relative py-32 lg:py-40">
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Background glow */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[600px] h-[600px] rounded-full bg-violet-500/6 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Headline */}
        <motion.div
          className="mb-16 lg:mb-20 text-center"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        >
          <motion.p variants={fadeUp} className="text-label text-violet-400 uppercase tracking-widest mb-4">
            Get in Touch
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-display-xl text-ink-50 mb-6 max-w-3xl mx-auto">
            {content.headline}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body-lg text-ink-400 max-w-xl mx-auto">
            {content.subtext}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Left — Contact info */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            variants={staggerContainer(0.2, 0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          >
            {/* Email */}
            <motion.a
              variants={fadeUp}
              href={`mailto:${content.email}`}
              className="group flex items-center gap-4 p-5 rounded-2xl glass border border-glass-border hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 group-hover:bg-violet-500/20 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                <Mail className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-label text-ink-500 uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-body-sm font-medium text-ink-50 group-hover:text-violet-300 transition-colors duration-200">
                  {content.email}
                </p>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              variants={fadeUp}
              href={`https://wa.me/${content.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl glass border border-glass-border hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-label text-ink-500 uppercase tracking-wider mb-0.5">WhatsApp</p>
                <p className="text-body-sm font-medium text-ink-50 group-hover:text-emerald-300 transition-colors duration-200">
                  {content.whatsapp}
                </p>
              </div>
            </motion.a>

            {/* Socials */}
            <motion.div variants={fadeUp} className="flex gap-3">
              {content.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform] ?? GitHubIcon;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="w-11 h-11 rounded-xl glass border border-glass-border flex items-center justify-center text-ink-400 hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </motion.div>

            {/* Response time note */}
            <motion.p variants={fadeUp} className="text-label text-ink-500 mt-2">
              ⚡ Typical response time: within 24 hours
            </motion.p>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-10 rounded-3xl glass border border-emerald-500/20 text-center"
              >
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-display text-display-md text-ink-50 mb-3">Message sent!</h3>
                <p className="text-body-md text-ink-400 mb-6">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="text-body-sm text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors duration-200"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass border border-glass-border flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="text-label text-ink-500 uppercase tracking-wider block mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Alex Johnson"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-label text-ink-500 uppercase tracking-wider block mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="project" className="text-label text-ink-500 uppercase tracking-wider block mb-2">
                    Project Type
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    className={cn(inputClass, "appearance-none")}
                  >
                    <option value="" disabled>Select a service…</option>
                    <option value="marketing">Marketing Site</option>
                    <option value="saas">SaaS Platform</option>
                    <option value="ecommerce">E-commerce System</option>
                    <option value="ai">AI Integration</option>
                    <option value="payment">Payment Gateway</option>
                    <option value="other">Something Else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-label text-ink-500 uppercase tracking-wider block mb-2">
                    Tell Me About Your Project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe what you're building, your timeline, and any technical requirements…"
                    value={form.message}
                    onChange={handleChange}
                    className={cn(inputClass, "resize-none")}
                  />
                </div>

                {formState === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-body-sm">
                    <AlertCircle className="w-4 h-4" />
                    Something went wrong. Please email me directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className={cn(
                    "flex items-center justify-center gap-2 w-full py-4 rounded-xl",
                    "bg-violet-500 hover:bg-violet-400",
                    "text-white font-semibold text-body-md",
                    "transition-all duration-300 hover:shadow-glow-violet hover:-translate-y-0.5",
                    "disabled:opacity-60 disabled:translate-y-0 disabled:cursor-not-allowed"
                  )}
                >
                  {formState === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-label text-ink-500 text-center">
                  Your details are never shared or sold.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
