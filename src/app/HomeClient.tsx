"use client";

// ============================================================
// Tamim Global — Homepage Client Architecture
// Full 1:1 Implementation of neoleaf.bytetown.agency:
// - Standalone Curtain Preloader
// - Section 1: Hero with Embedded Cinematic Video
// - Section 2: Kinetic Tags Marquee Cloud
// - Section 3: Technology Architecture & Telemetry
// - Section 4: What's Possible With Us (Bento + Media Video)
// - Section 5: Deep Engineering Expertise (Interactive Tabs)
// - Section 6: Key Features (3 Looping Feature Videos)
// - Section 7: Flagship Work & Case Studies
// - Section 8: Collaborative Team & Founder Profile
// - Section 9: Interactive FAQ
// - Section 10: High-Impact Closing Contact
// ============================================================

import { useState } from "react";
import Preloader from "@/components/ui/Preloader";
import HeroNeoSection from "@/components/sections/HeroNeoSection";
import KineticTagsSection from "@/components/sections/KineticTagsSection";
import TechArchitectureSection from "@/components/sections/TechArchitectureSection";
import CapabilitiesBentoSection from "@/components/sections/CapabilitiesBentoSection";
import ExpertiseTabsSection from "@/components/sections/ExpertiseTabsSection";
import FeaturesVideoSection from "@/components/sections/FeaturesVideoSection";
import WorkSection from "@/components/sections/WorkSection";
import AboutSection from "@/components/sections/AboutSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import type { SiteContent } from "@/types";

interface HomeClientProps {
  content: SiteContent;
}

export default function HomeClient({ content }: HomeClientProps) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const sortedProjects = [...content.projects].sort((a, b) => a.order - b.order);

  return (
    <>
      {/* NeoLeaf-Style Luxury Curtain Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Main Page Content */}
      <div className="relative bg-black min-h-screen">
        {/* Section 1: Hero with Cinematic Video */}
        <HeroNeoSection />

        {/* Section 2: Kinetic Tag Cloud Marquee */}
        <KineticTagsSection />

        {/* Section 3: Core Technology Architecture */}
        <TechArchitectureSection />

        {/* Section 4: What's Possible With Us (Bento + Media Video) */}
        <CapabilitiesBentoSection />

        {/* Section 5: Deep Expertise (Interactive Tabs) */}
        <ExpertiseTabsSection />

        {/* Section 6: Key Features (3 Looping Feature Videos) */}
        <FeaturesVideoSection />

        {/* Section 7: Flagship Work Showcase */}
        <WorkSection projects={sortedProjects} />

        {/* Section 8: Founder & Engineering Studio */}
        <AboutSection content={content.about} />

        {/* Section 9: Frequently Asked Questions */}
        <FaqSection />

        {/* Section 10: Closing Get in Touch */}
        <CtaSection />
      </div>
    </>
  );
}
