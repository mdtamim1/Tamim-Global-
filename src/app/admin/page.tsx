// ============================================================
// Tamim Global — Admin Route
// Server component shell — renders the client admin.
// Route: /admin
// ============================================================

import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin — Tamim Global",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminClient />;
}
