"use client";

// ============================================================
// Tamim Global — CTA Section (#cta)
// Exact match to awmedia.marketing's high-conversion closing CTA
// ============================================================

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

export default function CtaSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-24 wrap" id="cta">
      <div className="glass p-10 md:p-16 text-center max-w-5xl mx-auto rounded-[32px] relative overflow-hidden border-white/15">
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-transparent blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="chip mb-6">
            <span className="dot"></span>
            <span>Available for Q1 / Q2 Projects</span>
          </div>

          <h2 className="display text-white mb-6">
            Ready to stop losing clients <span className="chrome">to better websites?</span>
          </h2>

          <p className="lede max-w-xl mx-auto mb-10 text-white/70">
            Book a free 20-minute strategy call. We will review your current platform, outline our two production lanes, and provide a fixed quote.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-solid w-full sm:w-auto"
            >
              <span>Book a Free Strategy Call</span>
            </button>
            <a
              href="https://wa.me/8801700000000?text=Hi%20Tamim%2C%20I%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <MessageCircle size={17} />
              <span>Message on WhatsApp</span>
            </a>
          </div>

          <p className="text-xs text-white/40 tracking-wide font-mono">
            Direct response within 2 hours · Fixed price quotes · 0% templates
          </p>
        </div>
      </div>

      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
