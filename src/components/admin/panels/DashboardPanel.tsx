"use client";
// Admin dashboard — overview stats and quick links

import { FolderKanban, MessageSquare, Briefcase, ExternalLink } from "lucide-react";
import type { SiteContent } from "@/types";

interface Props {
  content: SiteContent | null;
  loading: boolean;
  showToast: (msg: string, type?: "success" | "error") => void;
  [key: string]: unknown;
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ElementType; color: string }) {
  return (
    <div className="p-6 rounded-2xl glass border border-glass-border flex items-center gap-5">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="font-display text-display-lg text-ink-50">{value}</div>
        <div className="text-label text-ink-500 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
}

export default function DashboardPanel({ content, loading }: Props) {
  if (loading || !content) return null;

  const stats = [
    { label: "Projects", value: content.projects.length, icon: FolderKanban, color: "bg-violet-500/10 text-violet-400" },
    { label: "Testimonials", value: content.testimonials.length, icon: MessageSquare, color: "bg-blue-500/10 text-blue-400" },
    { label: "Services", value: content.services.length, icon: Briefcase, color: "bg-emerald-500/10 text-emerald-400" },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-display-lg text-ink-50 mb-2">Dashboard</h1>
        <p className="text-body-md text-ink-400">Welcome back. Here's your content at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Quick links */}
      <div className="p-6 rounded-2xl glass border border-glass-border mb-6">
        <h2 className="font-display text-ink-50 font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-body-sm font-medium transition-all duration-200">
            View Live Site <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* How-to note */}
      <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5">
        <h3 className="font-display text-ink-50 font-semibold mb-2">📋 How to publish changes</h3>
        <ol className="flex flex-col gap-1.5 text-body-sm text-ink-400 list-decimal list-inside">
          <li>Edit content in any panel on the left.</li>
          <li>Click <strong className="text-ink-200">Export JSON</strong> in the top bar to download <code className="text-violet-300">content.json</code>.</li>
          <li>Replace <code className="text-violet-300">data/content.json</code> in your project with the downloaded file.</li>
          <li>Commit and push — Vercel auto-deploys.</li>
        </ol>
      </div>
    </div>
  );
}
