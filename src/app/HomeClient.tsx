"use client";

// ============================================================
// Tamim Global — Homepage Client Shell
// All sections: Preloader → Hero → Work → Services →
// Process → Stack → About → Testimonials → Contact
// ============================================================

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/ui/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/sections/WorkSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import StackSection from "@/components/sections/StackSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import type { SiteContent } from "@/types";

interface HomeClientProps {
  content: SiteContent;
}

export default function HomeClient({ content }: HomeClientProps) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const sortedProjects = [...content.projects].sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Preloader — unmounts after complete */}
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      {/* Main page — fades in after preloader */}
      <AnimatePresence>
        {preloaderDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Phase 2 */}
            <HeroSection content={content.hero} />

            {/* Phase 3 */}
            <WorkSection projects={sortedProjects} />

            {/* Phase 4 */}
            <ServicesSection services={content.services} />
            <ProcessSection steps={content.process} />
            <StackSection stack={content.stack} />
            <AboutSection content={content.about} />
            <TestimonialsSection testimonials={content.testimonials} />
            <ContactSection content={content.contact} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
