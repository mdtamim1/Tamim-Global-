"use client";

// ============================================================
// Tamim Global — Quick Enquiry Modal
// Replicating awmedia's instant project qualification flow
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, CheckCircle2 } from "lucide-react";

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  "Full-Stack Web Application (Next.js / Node.js)",
  "Custom Web Design & UI/UX System",
  "Cinematic Video Editing & Post-Production",
  "Original Music Composition & Sound Design",
  "Interactive Motion & 3D WebGL Experience",
  "Brand Identity & Visual Direction",
];

const BUDGET_RANGES = [
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000+",
];

const TIMELINES = [
  "Rapid Lane (7–14 Days)",
  "Bespoke Deep Craft (3–6 Weeks)",
  "Flexible / Long Term",
];

export default function QuickEnquiryModal({ isOpen, onClose }: QuickEnquiryModalProps) {
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [budget, setBudget] = useState(BUDGET_RANGES[0]);
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi Tamim, I'd like to discuss a project:\n\n` +
      `• Type: ${projectType}\n` +
      `• Budget: ${budget}\n` +
      `• Timeline: ${timeline}\n` +
      `• Name: ${name || "Client"}\n` +
      `• Email: ${email || "N/A"}\n` +
      `• Notes: ${notes || "None"}`
    );
    window.open(`https://wa.me/8801700000000?text=${text}`, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl glass p-7 md:p-9 text-left rounded-[28px]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-5">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Initiated!</h3>
                <p className="text-white/60 text-sm">Redirecting to WhatsApp to finalize details with Tamim directly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="chip mb-3">
                    <Sparkles size={13} className="text-violet-400" />
                    <span>Project Qualification</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Start a <span className="chrome">Project</span>
                  </h3>
                  <p className="text-white/60 text-sm mt-1">
                    Select your scope, budget, and timeline to initiate direct collaboration.
                  </p>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                    Project Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`text-xs px-3.5 py-2 rounded-full border transition-all ${
                          projectType === type
                            ? "bg-white text-black font-semibold border-white"
                            : "bg-white/5 text-white/70 border-white/10 hover:border-white/20"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget & Timeline Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                      Estimated Budget
                    </label>
                    <div className="space-y-1.5">
                      {BUDGET_RANGES.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudget(b)}
                          className={`w-full text-left text-xs px-3.5 py-2 rounded-xl border transition-all ${
                            budget === b
                              ? "bg-white/15 text-white font-semibold border-white/30"
                              : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                      Target Timeline
                    </label>
                    <div className="space-y-1.5">
                      {TIMELINES.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTimeline(t)}
                          className={`w-full text-left text-xs px-3.5 py-2 rounded-xl border transition-all ${
                            timeline === t
                              ? "bg-white/15 text-white font-semibold border-white/30"
                              : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                  />
                </div>

                {/* Additional Notes */}
                <textarea
                  placeholder="Briefly describe what you're looking to build..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30 resize-none"
                />

                {/* Action Button */}
                <button
                  type="submit"
                  className="btn btn-solid w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
