// ============================================================
// Tamim Global — Shared TypeScript Types
// ============================================================

/** A single portfolio project */
export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  cover: string;
  summary: string;
  caseStudy: CaseStudy;
  liveUrl: string;
  liveEnabled: boolean;
  featured: boolean;
  order: number;
}

/** Case study breakdown for each project */
export interface CaseStudy {
  problem: string;
  approach: string;
  solution: string;
  outcome: string;
  images?: string[];
}

/** A service offering */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

/** A process step */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

/** A stack / technology item */
export interface StackItem {
  name: string;
  category: string;
  icon?: string;
}

/** A testimonial */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
}

/** Hero section content */
export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

/** About section content */
export interface AboutContent {
  headline: string;
  bio: string;
  portrait?: string;
  stats: { label: string; value: string }[];
}

/** Contact content */
export interface ContactContent {
  headline: string;
  subtext: string;
  email: string;
  whatsapp: string;
  socials: { platform: string; url: string }[];
}

/** Root content.json shape */
export interface SiteContent {
  meta: {
    siteTitle: string;
    siteDescription: string;
    ogImage: string;
  };
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  process: ProcessStep[];
  stack: StackItem[];
  testimonials: Testimonial[];
  contact: ContactContent;
  projects: Project[];
}

