import type { Metadata } from "next";
import ServicesPageClient from "@/components/sections/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services & Process — Tamim Global",
  description:
    "Full-stack web engineering, luxury UI/UX design systems, cinema 4K video post-production, and bespoke soundscapes by Tamim Global.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
