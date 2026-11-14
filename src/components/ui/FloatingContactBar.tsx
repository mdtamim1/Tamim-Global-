"use client";

// ============================================================
// Tamim Global — Floating Contact Bar (#awc-bar)
// Exact match to awmedia.marketing's bottom-left floating widget
// ============================================================

import { useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import QuickEnquiryModal from "./QuickEnquiryModal";

export default function FloatingContactBar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div id="awc-bar" role="region" aria-label="Quick contact toolbar">
        {/* Pulsating Availability Pill */}
        <div className="flex items-center gap-2 pr-2 text-xs font-semibold tracking-tight text-white/90">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline">Available for projects</span>
          <span className="sm:hidden">Available</span>
        </div>

        {/* WhatsApp Icon Button */}
        <a
          href="https://wa.me/8801700000000?text=Hi%20Tamim%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Message"
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105"
        >
          <MessageCircle size={17} />
        </a>

        {/* Quick Enquiry Shimmer Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-solid btn-sm text-xs font-bold px-3.5 py-1.5 flex items-center gap-1.5"
        >
          <Sparkles size={13} className="text-black" />
          <span>Quick Enquiry</span>
        </button>
      </div>

      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
