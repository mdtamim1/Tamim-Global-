"use client";

// ============================================================
// Tamim Global — Live Demo Button
// Shows pulsing "Live" indicator when liveEnabled = true.
// liveEnabled = false → renders nothing (no broken links).
// ============================================================

import { useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
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
        {/* Live Demo — opens in new tab */}
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 hover:border-violet-500/60",
            "text-violet-300 text-body-sm font-medium",
            "transition-all duration-300",
            "group"
          )}
        >
          {/* Pulsing live dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Live Demo
          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>

        {/* Preview in modal */}
        <button
          onClick={() => setPreviewOpen(true)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg",
            "glass border border-glass-border hover:border-violet-500/30",
            "text-ink-400 hover:text-ink-50 text-body-sm",
            "transition-all duration-300"
          )}
          aria-label={`Preview ${projectTitle}`}
        >
          <Eye className="w-3.5 h-3.5" />
          Preview
        </button>
      </div>

      {/* Preview modal */}
      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        url={liveUrl}
        title={projectTitle}
      />
    </>
  );
}

