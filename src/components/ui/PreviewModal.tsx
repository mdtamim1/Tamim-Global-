"use client";

// ============================================================
// Tamim Global — Preview Modal
// Shows a site inside a stylised browser-frame mockup (iframe).
// Graceful fallback if the target blocks iframes.
// ============================================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function PreviewModal({ isOpen, onClose, url, title }: PreviewModalProps) {
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) { setIframeError(false); setLoading(true); }
  }, [isOpen, url]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[8000] bg-base-950/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-8 z-[8001] flex flex-col rounded-2xl overflow-hidden border border-glass-border shadow-card"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Browser chrome bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-base-800 border-b border-glass-border flex-shrink-0">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" aria-label="Close" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>

              {/* URL bar */}
              <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-700 border border-glass-border">
                <div className="w-3 h-3 rounded-full border border-emerald-400/60 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                </div>
                <span className="text-label text-ink-400 truncate">{url}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg glass hover:border-violet-500/30 text-ink-400 hover:text-ink-50 transition-all duration-200"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg glass hover:border-red-500/30 text-ink-400 hover:text-red-400 transition-all duration-200"
                  aria-label="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* iframe area */}
            <div className="relative flex-1 bg-base-900">
              {/* Loading skeleton */}
              {loading && !iframeError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <RefreshCw className="w-6 h-6 text-violet-400 animate-spin" />
                    <span className="text-body-sm text-ink-400">Loading {title}…</span>
                  </div>
                </div>
              )}

              {/* Fallback: iframe blocked */}
              {iframeError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center max-w-sm px-6">
                    <AlertCircle className="w-10 h-10 text-ink-500 mx-auto mb-4" />
                    <p className="text-body-md text-ink-400 mb-6">
                      This site can&apos;t be previewed inline. Open it directly instead.
                    </p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-semibold text-body-sm transition-all duration-300"
                    >
                      Open {title}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {!iframeError && (
                <iframe
                  src={url}
                  title={`Preview of ${title}`}
                  className={cn("w-full h-full border-0 transition-opacity duration-500", loading ? "opacity-0" : "opacity-100")}
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

