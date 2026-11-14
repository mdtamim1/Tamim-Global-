"use client";

// ============================================================
// Tamim Global — Cybernetic Live Demo Button
// High-tech launch button with live status beacon & preview modal.
// ============================================================

import { useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import PreviewModal from "./PreviewModal";

interface LiveDemoButtonProps {
  liveUrl: string;
  liveEnabled: boolean;
  projectTitle: string;
}

export default function LiveDemoButton({
  liveUrl,
  liveEnabled,
  projectTitle,
}: LiveDemoButtonProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!liveEnabled) return null;

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Live Demo Link */}
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400/60 text-emerald-300 text-xs font-mono font-medium transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span>Live System</span>
          <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>

        {/* Modal Preview Button */}
        <button
          onClick={() => setPreviewOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-violet-400/40 text-ink-400 hover:text-white text-xs font-mono transition-all duration-300"
          aria-label={`Preview ${projectTitle}`}
        >
          <Eye className="w-3 h-3" />
          <span>Preview</span>
        </button>
      </div>

      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        url={liveUrl}
        title={projectTitle}
      />
    </>
  );
}
