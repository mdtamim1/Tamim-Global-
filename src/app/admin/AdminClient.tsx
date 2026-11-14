"use client";

// ============================================================
// Tamim Global — Admin Client Shell
// SECURITY NOTE: This password gate is client-side only.
// The password is stored in an env variable (NEXT_PUBLIC_ADMIN_PASSWORD).
// It prevents casual access but is NOT suitable for protecting
// sensitive data — anyone who inspects the source can bypass it.
// For real security, add a server-side auth layer (NextAuth,
// Clerk, or a simple Next.js middleware route guard).
// ============================================================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, LayoutDashboard, FolderKanban, Zap, User, 
  Briefcase, GitBranch, Layers, MessageSquare, Mail,
  Download, Upload, RotateCcw, LogOut, AlertTriangle,
  CheckCircle2, ChevronRight
} from "lucide-react";
import { useAdminContent } from "@/hooks/useAdminContent";
import { cn } from "@/lib/utils";

// Panel imports (lazy is fine here — admin is not public critical path)
import DashboardPanel from "@/components/admin/panels/DashboardPanel";
import ProjectsPanel from "@/components/admin/panels/ProjectsPanel";
import HeroPanel from "@/components/admin/panels/HeroPanel";
import AboutPanel from "@/components/admin/panels/AboutPanel";
import ServicesPanel from "@/components/admin/panels/ServicesPanel";
import ProcessPanel from "@/components/admin/panels/ProcessPanel";
import StackPanel from "@/components/admin/panels/StackPanel";
import TestimonialsPanel from "@/components/admin/panels/TestimonialsPanel";
import ContactPanel from "@/components/admin/panels/ContactPanel";

// ---- Env password (defaults to "tamim2024" if not set) ----
// Set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local to override.
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "tamim2024";
const AUTH_KEY = "tg_admin_authed";

type Panel =
  | "dashboard" | "projects" | "hero" | "about"
  | "services" | "process" | "stack" | "testimonials" | "contact";

const NAV_ITEMS: { id: Panel; label: string; icon: React.ElementType }[] = [
  { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { id: "projects",     label: "Projects",     icon: FolderKanban },
  { id: "hero",         label: "Hero",         icon: Zap },
  { id: "about",        label: "About",        icon: User },
  { id: "services",     label: "Services",     icon: Briefcase },
  { id: "process",      label: "Process",      icon: GitBranch },
  { id: "stack",        label: "Stack",        icon: Layers },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "contact",      label: "Contact",      icon: Mail },
];

// ---- Password Gate ----
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onLogin();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-base-900 flex items-center justify-center px-6">
      {/* Background glow */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-violet-500/8 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-violet flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">TG</span>
          </div>
          <span className="font-display font-semibold text-ink-50">Tamim Global</span>
          <span className="text-label text-ink-500 ml-1">/ Admin</span>
        </div>

        <motion.form
          onSubmit={submit}
          animate={shaking ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl glass border border-glass-border flex flex-col gap-5"
        >
          <div className="text-center mb-2">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-violet-400" />
            </div>
            <h1 className="font-display text-display-md text-ink-50 mb-1">Admin Access</h1>
            <p className="text-body-sm text-ink-500">Enter your admin password</p>
          </div>

          <div>
            <label htmlFor="admin-pw" className="text-label text-ink-500 uppercase tracking-wider block mb-2">
              Password
            </label>
            <input
              id="admin-pw"
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="••••••••"
              autoFocus
              className={cn(
                "w-full px-4 py-3 rounded-xl glass border",
                "text-body-md text-ink-50 placeholder:text-ink-500",
                "focus:outline-none focus:ring-1 transition-all duration-300 bg-transparent",
                error
                  ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/40"
                  : "border-glass-border focus:border-violet-500/60 focus:ring-violet-500/40"
              )}
            />
            {error && (
              <p className="text-label text-red-400 mt-2">Incorrect password. Try again.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-semibold text-body-md transition-all duration-300 hover:shadow-glow-violet hover:-translate-y-0.5"
          >
            Enter Admin
          </button>

          {/* Honest security note */}
          <p className="text-label text-ink-500 text-center leading-relaxed">
            ⚠️ Client-side gate only. See code comments for production security guidance.
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
}

// ---- Main Admin Shell ----
export default function AdminClient() {
  const [authed, setAuthed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [activePanel, setActivePanel] = useState<Panel>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const {
    content,
    loading,
    dirty,
    updateSection,
    upsertProject,
    deleteProject,
    reorderProjects,
    upsertTestimonial,
    deleteTestimonial,
    exportJSON,
    importJSON,
    resetToBase,
  } = useAdminContent();

  // Check if already authed in this session
  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
    setAuthChecked(true);
  }, []);

  // Restore default cursor on the admin page (overrides global cursor:none)
  useEffect(() => {
    document.body.classList.add("admin-cursor-restore");
    return () => document.body.classList.remove("admin-cursor-restore");
  }, []);

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleExport = () => {
    exportJSON();
    showToast("content.json downloaded — commit it and redeploy to publish.");
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        importJSON(file);
        showToast("JSON imported successfully.");
      }
    };
    input.click();
  };

  const handleReset = async () => {
    if (!confirm("Reset all content to base content.json? This will clear localStorage.")) return;
    await resetToBase();
    showToast("Reset to base content.json.");
  };

  if (!authChecked) return null;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const panelProps = {
    content: content!,
    loading,
    updateSection,
    upsertProject,
    deleteProject,
    reorderProjects,
    upsertTestimonial,
    deleteTestimonial,
    showToast,
  };

  const PANELS: Record<Panel, React.ReactNode> = {
    dashboard:    <DashboardPanel {...panelProps} />,
    projects:     <ProjectsPanel {...panelProps} />,
    hero:         <HeroPanel {...panelProps} />,
    about:        <AboutPanel {...panelProps} />,
    services:     <ServicesPanel {...panelProps} />,
    process:      <ProcessPanel {...panelProps} />,
    stack:        <StackPanel {...panelProps} />,
    testimonials: <TestimonialsPanel {...panelProps} />,
    contact:      <ContactPanel {...panelProps} />,
  };

  return (
    <div className="min-h-screen bg-base-900 flex">
      {/* ---- Sidebar ---- */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-glass-border glass transition-all duration-300",
          sidebarOpen ? "w-56" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 h-16 border-b border-glass-border flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-violet flex items-center justify-center flex-shrink-0">
            <span className="text-white font-display font-bold text-xs">TG</span>
          </div>
          {sidebarOpen && (
            <span className="font-display text-ink-50 text-sm font-semibold truncate">Admin</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activePanel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePanel(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-200",
                  "hover:bg-white/5 group",
                  active && "bg-violet-500/10 border-r-2 border-violet-500"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className={cn("w-4 h-4 flex-shrink-0 transition-colors", active ? "text-violet-400" : "text-ink-500 group-hover:text-ink-300")} />
                {sidebarOpen && (
                  <span className={cn("text-body-sm truncate transition-colors", active ? "text-violet-300 font-medium" : "text-ink-400 group-hover:text-ink-100")}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-glass-border">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-ink-500 hover:text-red-400 transition-all duration-200"
            title={!sidebarOpen ? "Logout" : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="text-body-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ---- Main area ---- */}
      <div className={cn("flex-1 flex flex-col min-h-screen transition-all duration-300", sidebarOpen ? "ml-56" : "ml-16")}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 glass border-b border-glass-border">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-ink-500 hover:text-ink-100 transition-all duration-200"
            >
              <ChevronRight className={cn("w-4 h-4 transition-transform duration-300", sidebarOpen && "rotate-180")} />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2">
              <span className="text-label text-ink-500">Admin</span>
              <span className="text-label text-ink-500">/</span>
              <span className="text-body-sm text-ink-100 font-medium capitalize">{activePanel}</span>
            </div>

            {/* Dirty indicator */}
            {dirty && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-label text-amber-400">Unsaved changes</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label text-ink-400 hover:text-ink-100 hover:bg-white/5 transition-all duration-200"
            >
              View site ↗
            </a>
            <button
              onClick={handleImport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-glass-border text-label text-ink-400 hover:text-ink-100 hover:border-violet-500/30 transition-all duration-200"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Import</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500 hover:bg-violet-400 text-white text-label font-medium transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Export JSON</span>
            </button>
            <button
              onClick={handleReset}
              title="Reset to base content.json"
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-ink-500 hover:text-red-400 transition-all duration-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Panel content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 lg:p-8"
            >
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                </div>
              ) : (
                PANELS[activePanel]
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl glass border shadow-xl max-w-sm",
              toast.type === "success" ? "border-emerald-500/30" : "border-red-500/30"
            )}
          >
            {toast.type === "success"
              ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              : <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            }
            <p className="text-body-sm text-ink-100">{toast.msg}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
