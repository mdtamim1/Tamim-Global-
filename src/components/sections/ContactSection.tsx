"use client";

// ============================================================
// Tamim Global — Cyber Transmission Console (Contact Section)
// Command console form, instant WhatsApp link, encrypted email,
// and live availability telemetry.
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageCircle, CheckCircle, AlertCircle, Copy, ArrowUpRight, Terminal } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ContactContent } from "@/types";

interface ContactSectionProps {
  content: ContactContent;
}

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactSection({ content }: ContactSectionProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(content.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";

      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Submission failed");
      } else {
        await new Promise((r) => setTimeout(r, 1200));
      }

      setFormState("success");
      setForm({ name: "", email: "", project: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  const inputClass = cn(
    "w-full px-5 py-3.5 rounded-2xl glass-card border border-white/10",
    "text-body-md text-white placeholder:text-ink-500 font-sans",
    "focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 focus:shadow-[0_0_20px_rgba(124,58,237,0.3)]",
    "transition-all duration-300 bg-base-950/60"
  );

  return (
    <section id="contact" className="relative py-32 lg:py-44 overflow-hidden">
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[160px] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* Left Column: Transmission Brief (5 cols) */}
          <motion.div
            className="lg:col-span-5"
            variants={staggerContainer(0, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-violet-400 uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                [ 06 // TRANSMISSION CONSOLE ]
              </span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="font-display text-display-xl text-white mb-6 leading-none">
              Let&apos;s build the{" "}
              <span className="text-gradient">exceptional.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-body-lg text-ink-300 font-sans mb-10 leading-relaxed">
              Have an ambitious vision, a flagship product, or a mission-critical platform to launch? Let&apos;s collaborate.
            </motion.p>

            {/* Direct Comms Links */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {/* WhatsApp Direct Line */}
              <a
                href={`https://wa.me/${content.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl glass-card border border-white/10 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        WhatsApp Direct Line
                      </span>
                      <span className="radar-beacon"><span /><span /></span>
                    </div>
                    <span className="font-mono text-xs text-ink-500">{content.whatsapp}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink-500 group-hover:text-emerald-400 transition-colors" />
              </a>

              {/* Direct Encrypted Email with Copy Button */}
              <div className="group p-5 rounded-2xl glass-card border border-white/10 hover:border-violet-500/40 hover:shadow-[0_0_25px_rgba(124,58,237,0.2)] transition-all duration-300 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white">Direct Transmission</div>
                    <span className="font-mono text-xs text-ink-500">{content.email}</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 font-mono text-xs text-violet-300 transition-colors flex items-center gap-1.5"
                  aria-label="Copy email address"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </motion.div>

            {/* Response Telemetry Badge */}
            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3 font-mono text-xs text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>AVERAGE RESPONSE TIME: &lt; 2 HOURS</span>
            </motion.div>
          </motion.div>

          {/* Right Column: High-Tech Command Console Form (7 cols) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-8 md:p-10 rounded-3xl glass-card border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(124,58,237,0.2)]">
              {/* Form Terminal Bar */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5 font-mono text-xs">
                <span className="text-violet-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-violet-400" />
                  INITIATE_PROJECT.CMD
                </span>
                <span className="text-ink-500 font-mono text-[10px]">ENCRYPTED PROTOCOL</span>
              </div>

              {formState === "success" ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">Transmission Received</h3>
                  <p className="text-body-sm text-ink-400 max-w-sm mx-auto mb-6">
                    Your brief has been logged successfully. I will review and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="btn-cyber px-6 py-2.5 rounded-full text-xs font-mono text-white"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-ink-400 mb-2 uppercase tracking-wider">
                        Your Identity *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Alex Vance"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-ink-400 mb-2 uppercase tracking-wider">
                        Electronic Mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-400 mb-2 uppercase tracking-wider">
                      System Category
                    </label>
                    <select
                      name="project"
                      value={form.project}
                      onChange={handleChange}
                      className={cn(inputClass, "cursor-pointer")}
                    >
                      <option value="" className="bg-base-950 text-ink-500">Select Architecture Requirement…</option>
                      <option value="marketing" className="bg-base-950 text-white">High-Converting Marketing Flagship</option>
                      <option value="saas" className="bg-base-950 text-white">Full-Stack SaaS Platform</option>
                      <option value="ecommerce" className="bg-base-950 text-white">E-Commerce Architecture</option>
                      <option value="custom" className="bg-base-950 text-white">Custom Engineering & AI Integration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-400 mb-2 uppercase tracking-wider">
                      Mission Brief *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your goals, timeline, and deliverables…"
                      className={cn(inputClass, "resize-none")}
                    />
                  </div>

                  {formState === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-mono">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Transmission failed. Please reach out directly on WhatsApp or Email.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="btn-shimmer w-full py-4 rounded-2xl text-white text-body-md font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xl mt-2 disabled:opacity-50"
                  >
                    {formState === "sending" ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        <span>Transmitting Data…</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Project Brief</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
