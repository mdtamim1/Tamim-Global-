"use client";
// ============================================================
// Tamim Global — Copyright year (client component)
// Uses useEffect to avoid prerender issues with new Date()
// ============================================================
import { useEffect, useState } from "react";

export default function CopyrightYear() {
  const [year, setYear] = useState("2026");
  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);
  return <>{year}</>;
}
