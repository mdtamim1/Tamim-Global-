"use client";

// ============================================================
// Tamim Global — Complete 1:1 Architecture of NeoLeaf
// (neoleaf.bytetown.agency)
// - Pure Black Luxury Curtain Preloader with Titanium TG Mark
// - Section 1: Header & Hero with intro.mp4 video
// - Section 2: Kinetic Tag Cloud Marquee
// - Section 3: Technology Architecture
// - Section 4: Products Bento Cards with product-image-generation.mp4
// - Section 5: Deep Expertise Interactive Tabs
// - Section 6: Key Features with 3 Synchronized Looping Videos
// - Section 7: Collaborative Team of Experts
// - Footer: Luxury Studio Footer with Giant Monolithic Typography
// ============================================================

import { useState } from "react";
import Preloader from "@/components/ui/Preloader";
import WaterCursorEffect from "@/components/ui/WaterCursorEffect";
import { ThemeProvider } from "@/context/ThemeContext";
import NeoHeroSection from "@/components/sections/NeoHeroSection";
import NeoKineticTicker from "@/components/sections/NeoKineticTicker";
import NeoTechnologySection from "@/components/sections/NeoTechnologySection";
import NeoProductsBentoSection from "@/components/sections/NeoProductsBentoSection";
import NeoExpertiseSection from "@/components/sections/NeoExpertiseSection";
import NeoFeaturesSection from "@/components/sections/NeoFeaturesSection";
import NeoTeamSection from "@/components/sections/NeoTeamSection";
import NeoFooter from "@/components/layout/NeoFooter";
import WhatIBuildSection from "@/components/sections/WhatIBuildSection";
import type { SiteContent } from "@/types";

interface HomeClientProps {
  content: SiteContent;
}

export default function HomeClient({ content }: HomeClientProps) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <ThemeProvider>
      {/* 3D Water Drop Cursor + Click Ripple – desktop only */}
      <WaterCursorEffect />

      {/* 1:1 NeoLeaf Style Curtain Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Main NeoLeaf Container – theme-reactive via data-theme on <html> */}
      <main className="relative flex-1 transition-colors duration-500">
        {/* Section 1: Header & Hero with Embedded Video */}
        <NeoHeroSection />

        {/* Section 2: Kinetic Tag Cloud Marquee */}
        <NeoKineticTicker />

        {/* Section 3: What I Build & Create – Oxnod-style Service List */}
        <WhatIBuildSection />

        {/* Section 4: Technology Architecture */}
        <NeoTechnologySection />

        {/* Section 4: Products Bento with Embedded Video */}
        <NeoProductsBentoSection />

        {/* Section 5: Deep Expertise Interactive Tabs */}
        <NeoExpertiseSection />

        {/* Section 6: Key Features with 3 Looping Videos */}
        <NeoFeaturesSection />

        {/* Section 7: Team & Collaborative Studio */}
        <NeoTeamSection />
      </main>

      {/* Luxury Footer with Giant Typography */}
      <NeoFooter />
    </ThemeProvider>
  );
}
