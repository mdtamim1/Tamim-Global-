// ============================================================
// Tamim Global — Unified Services & Portfolio Expertise Data
// Single source of truth consumed by:
//   - WhatIBuildSection (cards + interactive pricing configurator)
//   - NeoExpertiseSection ("Expertise & Craft" portfolio showcase)
// ============================================================

export interface ServiceAddOn {
  id: string;
  label: string;
  description: string;
  price: number;
}

export interface ExpertiseMetric {
  value: string;
  label: string;
}

export interface ServiceExpertiseMeta {
  shortLabel: string;
  code: string;
  headline: string;
  paragraphs: string[];
  deliverables: string[];
  stack: string[];
  metrics: ExpertiseMetric[];
  caseStudySlug?: string;
  featuredWorkTitle: string;
  featuredWorkCategory: string;
  featuredWorkOutcome: string;
  featuredWorkBadges: string[];
  clientQuote?: {
    quote: string;
    author: string;
    role: string;
  };
  telemetryLabel: string;
  telemetryStatus: string;
  telemetryBars: number[];
  showcaseImage?: string;
}

export interface ServiceData {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  image: string;
  imageAlt: string;
  basePrice: number;
  baseIncludes: string[];
  addOns: ServiceAddOn[];
  deliveryDays: number;
  accentColor: string;
  expertise: ServiceExpertiseMeta;
}

export const STUDIO_PORTFOLIO_CREDENTIALS = [
  { value: "8Y", label: "Studio Craft" },
  { value: "50+", label: "Websites & Stores" },
  { value: "100+", label: "Brand Identities" },
  { value: "4M+", label: "Video Views" },
  { value: "60+", label: "Original Scores" },
  { value: "5.0 ★", label: "Client Rating" },
] as const;

export const SERVICES: ServiceData[] = [
  {
    id: "fullstack",
    number: "01",
    title: "Full-Stack Engineering",
    tagline: "Production-grade web applications built to scale",
    description:
      "Architecting resilient full-stack applications and APIs — Next.js, TypeScript, Postgres, edge-deployed and engineered for real users at real scale.",
    capabilities: [
      "NEXT.JS & REACT 19",
      "TYPESCRIPT & NODE",
      "POSTGRES & PRISMA",
      "100/100 LIGHTHOUSE",
    ],
    image: "/images/services/service-1.jpg",
    imageAlt: "Full-Stack Web Engineering & Systems Architecture",
    basePrice: 209,
    baseIncludes: [
      "5-page production web app",
      "Authentication system (JWT/OAuth)",
      "PostgreSQL database + Prisma ORM",
      "REST or GraphQL API",
      "Vercel/Netlify edge deployment",
      "3 rounds of revisions",
      "30-day post-launch support",
    ],
    addOns: [
      {
        id: "admin",
        label: "Admin Dashboard",
        description: "Full CRUD admin panel with analytics",
        price: 84,
      },
      {
        id: "api",
        label: "Third-Party API Integrations",
        description: "Stripe, Twilio, SendGrid, etc.",
        price: 56,
      },
      {
        id: "realtime",
        label: "Real-Time Features",
        description: "WebSockets, live notifications, chat",
        price: 70,
      },
      {
        id: "analytics",
        label: "Analytics & Reporting",
        description: "Custom dashboards, export to CSV/PDF",
        price: 42,
      },
      {
        id: "mobile",
        label: "Mobile App Wrapper",
        description: "React Native or Capacitor mobile app",
        price: 105,
      },
      {
        id: "cms",
        label: "CMS Integration",
        description: "Sanity, Contentful, or Payload CMS",
        price: 49,
      },
    ],
    deliveryDays: 21,
    accentColor: "#002BFF",
    expertise: {
      shortLabel: "Full-Stack Dev",
      code: "SYS // 01",
      headline: "Distributed systems engineered from database schema to edge CDN.",
      paragraphs: [
        "Every full-stack platform is built type-safe end-to-end with Next.js App Router, TypeScript, Node.js, PostgreSQL, and Prisma ORM — zero bloated plugins or brittle shortcuts.",
        "From multi-tenant SaaS products like CloudMetrics to real-time WebSocket dashboards and Stripe metered billing, I architect clean foundations built for rapid scale and 100/100 Core Web Vitals.",
      ],
      deliverables: [
        "End-to-end strict TypeScript architecture",
        "Normalized PostgreSQL & Prisma schemas",
        "JWT / OAuth authentication & RBAC security",
        "Automated edge CI/CD with sub-50ms responses",
      ],
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma ORM",
        "REST / GraphQL",
        "Vercel Edge",
      ],
      metrics: [
        { value: "100/100", label: "Lighthouse Speed" },
        { value: "<50ms", label: "Edge API Latency" },
        { value: "99.99%", label: "Uptime Architecture" },
      ],
      caseStudySlug: "saas-dashboard",
      featuredWorkTitle: "CloudMetrics SaaS",
      featuredWorkCategory: "Multi-Tenant SaaS Platform",
      featuredWorkOutcome:
        "Zero-to-launch in 8 weeks. First 50 paying customers within 30 days and churn under 5% in Q1.",
      featuredWorkBadges: ["Next.js", "PostgreSQL", "Prisma", "Stripe"],
      clientQuote: {
        quote:
          "Clear communication, sub-14-day turnaround, and zero technical debt. Absolutely world-class.",
        author: "Sarah Jenkins",
        role: "Head of Product · CloudMetrics SaaS",
      },
      telemetryLabel: "EDGE PIPELINE // LIVE",
      telemetryStatus: "100 LIGHTHOUSE · <50MS",
      telemetryBars: [42, 68, 54, 88, 76, 96, 82, 100, 91, 98],
    },
  },
  {
    id: "uiux3d",
    number: "02",
    title: "UI/UX & Interactive 3D",
    tagline: "Digital experiences that command attention",
    description:
      "Designing distinctive digital flagships with WebGL shaders, GSAP motion, and Figma-to-code precision. Every pixel has a reason to exist.",
    capabilities: [
      "DESIGN SYSTEMS",
      "THREE.JS & SHADERS",
      "GSAP CHOREOGRAPHY",
      "FIGMA TO CODE",
    ],
    image: "/images/services/service-2.jpg",
    imageAlt: "Web Design & Interactive 3D Motion",
    basePrice: 139,
    baseIncludes: [
      "Figma design system (tokens, components)",
      "5 fully-designed responsive screens",
      "1 clickable Figma prototype",
      "Responsive breakpoints (mobile/tablet/desktop)",
      "2 rounds of revisions",
      "Design handoff + annotations",
    ],
    addOns: [
      {
        id: "webgl",
        label: "WebGL / Three.js Hero",
        description: "Custom 3D canvas animation or scene",
        price: 105,
      },
      {
        id: "gsap",
        label: "GSAP Scroll Animations",
        description: "Cinematic scroll-driven motion system",
        price: 56,
      },
      {
        id: "brand",
        label: "Brand Identity Package",
        description: "Logo, color system, typography guide",
        price: 70,
      },
      {
        id: "screens",
        label: "Extra Screen Designs",
        description: "5 additional screens (+$21 each)",
        price: 105,
      },
      {
        id: "cursor",
        label: "Custom Cursor & Micro-interactions",
        description: "Bespoke hover effects & cursor",
        price: 42,
      },
      {
        id: "darklight",
        label: "Dark + Light Mode Variants",
        description: "Full dual-mode design system",
        price: 35,
      },
    ],
    deliveryDays: 14,
    accentColor: "#7c3aed",
    expertise: {
      shortLabel: "UI/UX & 3D",
      code: "DSP // 02",
      headline: "Editorial Figma systems fused with 60fps WebGL & GSAP motion.",
      paragraphs: [
        "Templates blend in; flagships command authority. I craft bespoke Figma design systems with mathematical typography scales, purposeful hierarchy, and dual dark/light token architecture.",
        "Paired with custom GLSL shaders, Three.js interactive canvases, and GSAP ScrollTrigger choreography — turning passive visitors into deeply engaged prospects.",
      ],
      deliverables: [
        "Tokenized Figma design system & prototypes",
        "Interactive WebGL / Three.js 3D hero scenes",
        "GSAP ScrollTrigger & micro-interaction choreography",
        "Fluid responsive fidelity across mobile to 4K",
      ],
      stack: [
        "Figma",
        "Three.js / WebGL",
        "GLSL Shaders",
        "GSAP 3.15",
        "Framer Motion",
        "Tailwind CSS",
        "Lenis Scroll",
      ],
      metrics: [
        { value: "60fps", label: "Shader & Motion Budget" },
        { value: "+180%", label: "Inbound Enquiry Lift" },
        { value: "100+", label: "Identities Crafted" },
      ],
      caseStudySlug: "agency-marketing-site",
      featuredWorkTitle: "Apex Creative Agency",
      featuredWorkCategory: "Interactive 3D Marketing Flagship",
      featuredWorkOutcome:
        "Bounce rate dropped from 70% to 32%. Average session time jumped 4× and inbound enquiries rose +180%.",
      featuredWorkBadges: ["Three.js", "GSAP", "Framer Motion", "Figma"],
      clientQuote: {
        quote:
          "Tamim delivered a custom, high-converting digital platform in 12 days. The speed and quality are unmatched.",
        author: "Marcus Vance",
        role: "Managing Director · Harcon Solutions",
      },
      telemetryLabel: "RENDER STAGE // 60FPS",
      telemetryStatus: "WEBGL2 · 16.6MS FRAME",
      telemetryBars: [65, 78, 90, 84, 96, 92, 98, 95, 89, 100],
    },
  },
  {
    id: "video",
    number: "03",
    title: "Cinematic Video Editing",
    tagline: "Cinema-grade storytelling for brands",
    description:
      "Cutting high-retention brand films and ads with DaVinci Resolve color science, rhythm-driven pacing, and 4K REC.709 mastering.",
    capabilities: [
      "DAVINCI RESOLVE",
      "PREMIERE & AFTER FX",
      "RHYTHM PACING",
      "4K REC.709 MASTER",
    ],
    image: "/images/services/service-3.jpg",
    imageAlt: "Cinematic Video Production & Color Grading",
    basePrice: 104,
    baseIncludes: [
      "Up to 2-minute final edit",
      "Full DaVinci color grade",
      "Licensed music sync & timing",
      "1080p master export",
      "2 rounds of revisions",
      "Delivery in 5–7 days",
    ],
    addOns: [
      {
        id: "4k",
        label: "4K UHD Export",
        description: "Cinema 4K master + web-optimized version",
        price: 35,
      },
      {
        id: "motion",
        label: "Custom Motion Graphics",
        description: "Animated titles, lower-thirds, transitions",
        price: 56,
      },
      {
        id: "vo",
        label: "Voiceover Integration",
        description: "AI or human VO edit, mix & sync",
        price: 28,
      },
      {
        id: "cuts",
        label: "YouTube + Reel Cuts",
        description: "16:9, 9:16, 1:1 format optimization",
        price: 21,
      },
      {
        id: "davinci",
        label: "DaVinci Color Science Grade",
        description: "Film emulation + LUT-based look development",
        price: 42,
      },
      {
        id: "long",
        label: "Long-Form Edit (up to 10 min)",
        description: "Extended documentary or brand film",
        price: 70,
      },
    ],
    deliveryDays: 7,
    accentColor: "#d97706",
    expertise: {
      shortLabel: "Cinematic Video",
      code: "FLM // 03",
      headline: "High-retention brand films sculpted with cinema color science.",
      paragraphs: [
        "Attention is won or lost in the first 3 seconds. I cut commercial campaigns, founder stories, and viral short-form reels anchored by musical rhythm and visual pacing.",
        "Every timeline moves seamlessly between Premiere Pro, After Effects motion typography, and DaVinci Resolve ACES color grading for theatrical 4K REC.709 delivery.",
      ],
      deliverables: [
        "3-second hook retention narrative pacing",
        "DaVinci Resolve filmic color grading & LUTs",
        "After Effects kinetic titles & visual FX",
        "Multi-ratio masters (16:9, 9:16 Reels, 1:1)",
      ],
      stack: [
        "DaVinci Resolve",
        "Premiere Pro",
        "After Effects",
        "ACES Color",
        "Cinema LUTs",
        "Motion GFX",
        "4K REC.709",
      ],
      metrics: [
        { value: "4M+", label: "Organic Video Views" },
        { value: "4K UHD", label: "Master Delivery Spec" },
        { value: "5–7d", label: "Studio Turnaround" },
      ],
      featuredWorkTitle: "Commercial Films & Brand Reels",
      featuredWorkCategory: "Cinema Post-Production",
      featuredWorkOutcome:
        "4M+ organic views generated across founder launch films, social ad campaigns, and YouTube documentary cuts.",
      featuredWorkBadges: ["DaVinci 4K", "After Effects", "REC.709", "Rhythm Cut"],
      telemetryLabel: "TIMECODE // 00:01:24:18",
      telemetryStatus: "4K UHD · REC.709 GRADE",
      telemetryBars: [55, 82, 48, 94, 70, 88, 60, 96, 84, 72],
    },
  },
  {
    id: "music",
    number: "04",
    title: "Music & Sound Design",
    tagline: "Original sonic identities that resonate",
    description:
      "Composing original film scores, sonic identities, and studio-grade audio — from orchestral swells to lo-fi electronic textures.",
    capabilities: [
      "ORIGINAL SCORES",
      "ORCHESTRAL & SYNTH",
      "SPATIAL SOUND FX",
      "STUDIO MASTERING",
    ],
    image: "/images/services/service-4.png",
    imageAlt: "Original Music Composition & Audio Production",
    basePrice: 69,
    baseIncludes: [
      "60-second original composition",
      "2 instrument arrangement",
      "2 rounds of revisions",
      "WAV 48kHz/24-bit master",
      "Stems delivery",
      "7-day delivery",
    ],
    addOns: [
      {
        id: "fulltrack",
        label: "Full Track (3+ minutes)",
        description: "Extended composition with full arc",
        price: 56,
      },
      {
        id: "orchestral",
        label: "Orchestral Arrangement",
        description: "Full string/brass/woodwind orchestration",
        price: 84,
      },
      {
        id: "sfx",
        label: "SFX Package",
        description: "10+ custom designed sound effects",
        price: 35,
      },
      {
        id: "stems",
        label: "Royalty-Free License",
        description: "Full commercial license + stems delivery",
        price: 42,
      },
      {
        id: "album",
        label: "Album Mix & Master",
        description: "Up to 10 tracks, full mastering suite",
        price: 105,
      },
      {
        id: "spatial",
        label: "Spatial / Dolby Atmos Mix",
        description: "Immersive audio for film/VR/gaming",
        price: 63,
      },
    ],
    deliveryDays: 7,
    accentColor: "#059669",
    expertise: {
      shortLabel: "Music & Audio",
      code: "AUD // 04",
      headline: "Original scores and spatial soundscapes scored to the frame.",
      paragraphs: [
        "Great visuals lose half their impact without bespoke sound. I compose original film scores, brand sonic signatures, and electronic textures in Ableton Live and Logic Pro X.",
        "From subtle foley transitions synced to web micro-interactions to lush orchestral arrangements mastered at 48kHz / 24-bit lossless stereo — zero generic stock tracks.",
      ],
      deliverables: [
        "100% original compositions & brand themes",
        "Frame-accurate cinema foley & spatial SFX",
        "Full multitrack stems + commercial rights",
        "48kHz / 24-bit lossless studio mastering",
      ],
      stack: [
        "Ableton Live",
        "Logic Pro X",
        "Orchestral VSTs",
        "Analog Synth",
        "Foley & SFX",
        "Spatial Audio",
        "48kHz Master",
      ],
      metrics: [
        { value: "60+", label: "Original Scores Crafted" },
        { value: "48kHz", label: "24-Bit Lossless Spec" },
        { value: "0%", label: "Stock Audio Usage" },
      ],
      featuredWorkTitle: "Sonic Identities & Film Scores",
      featuredWorkCategory: "Original Composition & Mastering",
      featuredWorkOutcome:
        "60+ bespoke compositions and commercial sonic beds crafted across brand films, interactive sites, and documentaries.",
      featuredWorkBadges: ["48kHz WAV", "Ableton", "Logic Pro", "Stems"],
      telemetryLabel: "MASTER BUS // -14 LUFS",
      telemetryStatus: "48KHZ · 24-BIT STEREO",
      telemetryBars: [35, 62, 88, 95, 78, 92, 66, 84, 58, 74],
    },
  },
  {
    id: "ecommerce",
    number: "05",
    title: "E-Commerce Web Design",
    tagline: "Online stores engineered to convert",
    description:
      "Building high-converting e-commerce experiences on Shopify, WooCommerce, or custom stacks — mobile-first, payment-ready, and growth-optimized.",
    capabilities: [
      "SHOPIFY & WOOCOMMERCE",
      "CUSTOM PRODUCT PAGES",
      "PAYMENT GATEWAY",
      "MOBILE-FIRST PWA",
    ],
    image: "/images/services/service-5.png",
    imageAlt: "E-Commerce Web Design & High-Converting Storefronts",
    basePrice: 70,
    baseIncludes: [
      "Up to 50 product listings",
      "Shopping cart & checkout flow",
      "2 payment gateways (Stripe + PayPal)",
      "Mobile-responsive design",
      "Product search & filtering",
      "SSL certificate setup",
      "Basic SEO (meta, title, XML sitemap)",
      "Order confirmation emails",
      "Google Analytics integration",
      "Contact form & About/Home pages",
      "Cookie consent banner",
      "Social media links & icons",
      "404 error page",
      "2 rounds of revisions",
    ],
    addOns: [
      {
        id: "theme",
        label: "Custom Animated Theme",
        description: "Bespoke brand-matched storefront design",
        price: 35,
      },
      {
        id: "inventory",
        label: "Inventory Management System",
        description: "Stock alerts, bulk upload, variant tracking",
        price: 45,
      },
      {
        id: "analytics",
        label: "Advanced Analytics Dashboard",
        description: "Sales, conversion, heatmaps & traffic insights",
        price: 35,
      },
      {
        id: "multicurrency",
        label: "Multi-Currency & Language",
        description: "Auto geo-currency + multilingual storefront",
        price: 28,
      },
      {
        id: "blog",
        label: "Blog / Content Section",
        description: "Full CMS-powered blog integrated",
        price: 22,
      },
      {
        id: "seo",
        label: "Advanced SEO Package",
        description: "Schema markup, structured data, speed audit",
        price: 28,
      },
      {
        id: "email",
        label: "Email Marketing Integration",
        description: "Klaviyo, Mailchimp, abandoned cart flows",
        price: 35,
      },
      {
        id: "loyalty",
        label: "Loyalty & Rewards System",
        description: "Points, referrals, discount tiers",
        price: 42,
      },
      {
        id: "multivendor",
        label: "Multi-Vendor Marketplace",
        description: "Vendor onboarding, commissions, payouts",
        price: 70,
      },
      {
        id: "unlimited",
        label: "Unlimited Product Listings",
        description: "No cap — add as many products as needed",
        price: 35,
      },
      {
        id: "wishlist",
        label: "Wishlist & Save for Later",
        description: "User wishlists, saved carts, back-in-stock alerts",
        price: 18,
      },
      {
        id: "reviews",
        label: "Product Reviews & Ratings",
        description: "Verified purchase reviews, star ratings, photos",
        price: 20,
      },
      {
        id: "subscription",
        label: "Subscription / Recurring Orders",
        description: "Weekly/monthly auto-billing & delivery scheduling",
        price: 55,
      },
      {
        id: "livechat",
        label: "Live Chat Integration",
        description: "Intercom, Tidio or Crisp chat widget setup",
        price: 22,
      },
      {
        id: "speed",
        label: "Performance & Speed Optimization",
        description: "Core Web Vitals 90+, image CDN, lazy loading",
        price: 32,
      },
      {
        id: "abandoned",
        label: "Abandoned Cart Recovery",
        description: "Automated email + SMS cart abandonment flows",
        price: 28,
      },
      {
        id: "pos",
        label: "POS / In-Store Integration",
        description: "Sync online store with physical point-of-sale",
        price: 60,
      },
      {
        id: "ar",
        label: "AR Product Preview",
        description: "WebAR try-before-you-buy product visualization",
        price: 90,
      },
      {
        id: "b2b",
        label: "B2B Wholesale Portal",
        description: "Tiered pricing, bulk orders, net-30 invoicing",
        price: 80,
      },
      {
        id: "giftvoucher",
        label: "Gift Cards & Discount Vouchers",
        description: "Digital gift cards, promo codes, store credit",
        price: 20,
      },
      {
        id: "whatsapp",
        label: "WhatsApp Chat Button",
        description: "One-click WhatsApp contact + product share",
        price: 12,
      },
      {
        id: "socialsync",
        label: "Facebook & Instagram Shop Sync",
        description: "Auto-sync product catalog to Meta shops",
        price: 32,
      },
      {
        id: "googleshopping",
        label: "Google Shopping Feed",
        description: "Google Merchant Center product feed setup",
        price: 28,
      },
      {
        id: "flashsale",
        label: "Flash Sales & Countdown Timer",
        description: "Urgency timers, limited-time offers, sale badges",
        price: 18,
      },
      {
        id: "compare",
        label: "Product Comparison Tool",
        description: "Side-by-side feature comparison for products",
        price: 22,
      },
      {
        id: "videodemo",
        label: "Video Product Demo Support",
        description: "Embeddable video demos on product pages",
        price: 25,
      },
      {
        id: "bulkdiscount",
        label: "Bulk Discount Rules",
        description: "Buy X get Y, quantity breaks, tiered pricing",
        price: 25,
      },
      {
        id: "digital",
        label: "Digital Downloads (PDF/Software)",
        description: "Secure file delivery for digital products",
        price: 32,
      },
      {
        id: "affiliate",
        label: "Affiliate / Referral Program",
        description: "Referral tracking, commission management, payouts",
        price: 52,
      },
      {
        id: "customerdash",
        label: "Customer Account Dashboard",
        description: "Order history, saved addresses, wishlist, profile",
        price: 32,
      },
      {
        id: "returns",
        label: "Returns & Refund Manager",
        description: "Self-service return requests, tracking & refunds",
        price: 28,
      },
      {
        id: "shipping",
        label: "Advanced Shipping Calculator",
        description: "Live shipping rates, zones, free shipping rules",
        price: 20,
      },
      {
        id: "bundles",
        label: "Product Bundles & Upsells",
        description: "Bundle deals, upsell popups, cross-sell sections",
        price: 38,
      },
      {
        id: "popup",
        label: "Newsletter Popup & Exit Intent",
        description: "Lead capture popups, exit-intent discount offers",
        price: 18,
      },
      {
        id: "agegate",
        label: "Age Verification Gate",
        description: "Mandatory age check for restricted products",
        price: 12,
      },
      {
        id: "gdpr",
        label: "GDPR / Privacy Compliance Kit",
        description: "Cookie policy, data requests, privacy page setup",
        price: 18,
      },
    ],
    deliveryDays: 14,
    accentColor: "#f84022",
    expertise: {
      shortLabel: "E-Commerce",
      code: "COM // 05",
      headline: "Conversion-engineered storefronts built for mobile speed & trust.",
      paragraphs: [
        "Every second of checkout delay costs real revenue. I engineer conversion-first stores with instant search, streamlined carts, and local + global gateways (Stripe, PayPal, bKash, SSLCommerz).",
        "Backed by proven production results on platforms like Tatka Bazar — multi-vendor dashboards, real-time inventory tracking, SEO readiness, and sub-400ms checkout experiences.",
      ],
      deliverables: [
        "50-product mobile-first store with cart & filter",
        "Dual payment gateways (Stripe/PayPal or local)",
        "SSL, sitemap SEO, Analytics & transactional email",
        "Scalable modularity with 36 growth add-ons",
      ],
      stack: [
        "Next.js Commerce",
        "Shopify",
        "WooCommerce",
        "Stripe & PayPal",
        "bKash / SSLCommerz",
        "MongoDB / Postgres",
        "Conversion SEO",
      ],
      metrics: [
        { value: "+340%", label: "Conversion Spike" },
        { value: "97%", label: "Payment Success" },
        { value: "<400ms", label: "Checkout Speed" },
      ],
      caseStudySlug: "tatka-bazar",
      featuredWorkTitle: "Tatka Bazar",
      featuredWorkCategory: "Multi-Vendor E-Commerce Platform",
      featuredWorkOutcome:
        "Launched with 15 vendors in Week 1, 97% payment success rate, and 3× regional mobile conversion.",
      featuredWorkBadges: ["Next.js", "bKash", "SSLCommerz", "WebSockets"],
      clientQuote: {
        quote:
          "Our checkout speed went from 4 seconds to under 400ms, and online conversion spiked +340% within 30 days.",
        author: "Rahim Chowdhury",
        role: "Founder & CEO · Tatka Bazar Logistics",
      },
      telemetryLabel: "CHECKOUT // FUNNEL",
      telemetryStatus: "97% AUTH · <400MS",
      telemetryBars: [48, 62, 74, 80, 88, 91, 95, 97, 96, 100],
    },
  },
];
