"use client";

// ============================================================
// Tamim Global — Cybernetic Preview Modal
// High-tech device viewport simulator with desktop/tablet/mobile toggles.
// ============================================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, AlertCircle, RefreshCw, Monitor, Tablet, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

type DeviceMode = "desktop" | "tablet" | "mobile";

export default function PreviewModal({ isOpen, onClose, url, title }: PreviewModalProps) {
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState<DeviceMode>("desktop");

  useEffect(() => {
    if (isOpen) { setIframeError(false); setLoading(true); }
  }, [isOpen, url]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const deviceWidthClass = {
    desktop: "w-full h-full",
    tablet:  "w-[768px] h-[92%] my-auto shadow-2xl rounded-2xl border border-white/10",
    mobile:  "w-[390px] h-[85%] my-auto shadow-2xl rounded-3xl border border-white/15",
  }[device];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[8000] bg-base-950/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-3 md:inset-6 z-[8001] flex flex-col rounded-3xl overflow-hidden glass-card border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Browser Console Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-base-950 border-b border-white/10 flex-shrink-0">
              {/* Traffic Lights */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors"
                  aria-label="Close"
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>

              {/* Device Mode Switchers */}
              <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5">
                <button
                  onClick={() => setDevice("desktop")}
                  className={cn(
                    "p-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1",
                    device === "desktop" ? "bg-white/10 text-white" : "text-ink-500 hover:text-white"
                  )}
                  title="Desktop View"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">1920px</span>
                </button>
                <button
                  onClick={() => setDevice("tablet")}
                  className={cn(
                    "p-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1",
                    device === "tablet" ? "bg-white/10 text-white" : "text-ink-500 hover:text-white"
                  )}
                  title="Tablet View"
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">768px</span>
                </button>
                <button
                  onClick={() => setDevice("mobile")}
                  className={cn(
                    "p-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1",
                    device === "mobile" ? "bg-white/10 text-white" : "text-ink-500 hover:text-white"
                  )}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">390px</span>
                </button>
              </div>

              {/* URL & Actions */}
              <div className="flex items-center gap-2">
                <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-xs text-ink-400 max-w-xs truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="truncate">{url}</span>
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl glass hover:border-violet-400/40 text-ink-400 hover:text-white transition-colors"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl glass hover:border-red-400/40 text-ink-400 hover:text-red-400 transition-colors"
                  aria-label="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewport Workspace */}
            <div className="relative flex-1 bg-base-950/80 flex items-center justify-center p-2 md:p-4 overflow-hidden">
              {loading && !iframeError && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-base-950/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-3">
                    <RefreshCw className="w-6 h-6 text-violet-400 animate-spin" />
                    <span className="font-mono text-xs text-ink-400">CONNECTING TO {title.toUpperCase()}…</span>
                  </div>
                </div>
              )}

              {iframeError ? (
                <div className="text-center max-w-sm px-6">
                  <AlertCircle className="w-10 h-10 text-violet-400 mx-auto mb-4" />
                  <h4 className="font-display font-semibold text-lg text-white mb-2">Live Preview Restricted</h4>
                  <p className="text-body-sm text-ink-400 mb-6">
                    This website prevents inline iframe embedding via X-Frame-Options. Launch it directly in a dedicated tab.
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs font-mono font-semibold"
                  >
                    <span>Launch {title}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <iframe
                  src={url}
                  title={`Live simulation of ${title}`}
                  className={cn(
                    "border-0 transition-all duration-500 bg-white",
                    deviceWidthClass,
                    loading ? "opacity-0" : "opacity-100"
                  )}
                  onLoad={() => setLoading(false)}
                  onError={() => { setIframeError(true); setLoading(false); }}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
