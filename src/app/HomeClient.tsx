"use client";

// ============================================================
// Tamim Global — Homepage Client Architecture
// Exact 1:1 sequence matching awmedia.marketing:
// Hero → Built Device → Trusted Marquee → Intro & Pain →
// Work → Lanes → Services → Process → Proof → Why → FAQ →
// About → Closing CTA
// ============================================================

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/ui/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import BuiltDeviceSection from "@/components/sections/BuiltDeviceSection";
import TrustedMarquee from "@/components/sections/TrustedMarquee";
import IntroPainSection from "@/components/sections/IntroPainSection";
import WorkSection from "@/components/sections/WorkSection";
import LanesSection from "@/components/sections/LanesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ProofSection from "@/components/sections/ProofSection";
import WhySection from "@/components/sections/WhySection";
import FaqSection from "@/components/sections/FaqSection";
import AboutSection from "@/components/sections/AboutSection";
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
      {/* Preloader */}
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <AnimatePresence>
        {preloaderDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 01. Hero Section */}
            <HeroSection content={content.hero} />

            {/* 02. Built Device Showcase (awmedia signature) */}
            <BuiltDeviceSection />

            {/* 03. Infinite Marquee Ticker */}
            <TrustedMarquee />

            {/* 04. Studio Manifesto & Pain Comparison */}
            <IntroPainSection />

            {/* 05. Flagship Work Showcase */}
            <WorkSection projects={sortedProjects} />

            {/* 06. Dual Speed Lanes (AI-Accelerated vs Bespoke) */}
            <LanesSection />

            {/* 07. Comprehensive Bento Services Matrix */}
            <ServicesSection />

            {/* 08. 5-Step Process Roadmap */}
            <ProcessSection />

            {/* 09. Verified 5.0 Star Reviews & Social Proof */}
            <ProofSection testimonials={content.testimonials} />

            {/* 10. Why Ambitious Businesses Choose Us */}
            <WhySection />

            {/* 11. Everything You Need to Know (FAQ Accordion) */}
            <FaqSection />

            {/* 12. Behind The Studio / Founder Profile */}
            <AboutSection content={content.about} />

            {/* 13. High-Impact Closing CTA Banner */}
            <CtaSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
