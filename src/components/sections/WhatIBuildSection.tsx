"use client";

// ============================================================
// Tamim Global — "What I Build & Create" Section
// Ultra-Premium Service Showcase + Interactive Pricing Configurator
// 5 Services · Feature-based add-on pricing · Inline order form
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data Types ───────────────────────────────────────────────────────────────

interface AddOn {
  id: string;
  label: string;
  description: string;
  price: number;
}

interface ServiceData {
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
  addOns: AddOn[];
  deliveryDays: number;
  accentColor: string;
}

// ─── Services Data ─────────────────────────────────────────────────────────────

const SERVICES: ServiceData[] = [
  {
    id: "fullstack",
    number: "01",
    title: "Full-Stack Engineering",
    tagline: "Production-grade web applications built to scale",
    description:
      "Architecting resilient full-stack applications and APIs — Next.js, TypeScript, Postgres, edge-deployed and engineered for real users at real scale.",
    capabilities: ["NEXT.JS & REACT 19", "TYPESCRIPT & NODE", "POSTGRES & PRISMA", "100/100 LIGHTHOUSE"],
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
      { id: "admin", label: "Admin Dashboard", description: "Full CRUD admin panel with analytics", price: 84 },
      { id: "api", label: "Third-Party API Integrations", description: "Stripe, Twilio, SendGrid, etc.", price: 56 },
      { id: "realtime", label: "Real-Time Features", description: "WebSockets, live notifications, chat", price: 70 },
      { id: "analytics", label: "Analytics & Reporting", description: "Custom dashboards, export to CSV/PDF", price: 42 },
      { id: "mobile", label: "Mobile App Wrapper", description: "React Native or Capacitor mobile app", price: 105 },
      { id: "cms", label: "CMS Integration", description: "Sanity, Contentful, or Payload CMS", price: 49 },
    ],
    deliveryDays: 21,
    accentColor: "#002BFF",
  },
  {
    id: "uiux3d",
    number: "02",
    title: "UI/UX & Interactive 3D",
    tagline: "Digital experiences that command attention",
    description:
      "Designing distinctive digital flagships with WebGL shaders, GSAP motion, and Figma-to-code precision. Every pixel has a reason to exist.",
    capabilities: ["DESIGN SYSTEMS", "THREE.JS & SHADERS", "GSAP CHOREOGRAPHY", "FIGMA TO CODE"],
    image: "/images/services/service-2.png",
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
      { id: "webgl", label: "WebGL / Three.js Hero", description: "Custom 3D canvas animation or scene", price: 105 },
      { id: "gsap", label: "GSAP Scroll Animations", description: "Cinematic scroll-driven motion system", price: 56 },
      { id: "brand", label: "Brand Identity Package", description: "Logo, color system, typography guide", price: 70 },
      { id: "screens", label: "Extra Screen Designs", description: "5 additional screens (+$21 each)", price: 105 },
      { id: "cursor", label: "Custom Cursor & Micro-interactions", description: "Bespoke hover effects & cursor", price: 42 },
      { id: "darklight", label: "Dark + Light Mode Variants", description: "Full dual-mode design system", price: 35 },
    ],
    deliveryDays: 14,
    accentColor: "#7c3aed",
  },
  {
    id: "video",
    number: "03",
    title: "Cinematic Video Editing",
    tagline: "Cinema-grade storytelling for brands",
    description:
      "Cutting high-retention brand films and ads with DaVinci Resolve color science, rhythm-driven pacing, and 4K REC.709 mastering.",
    capabilities: ["DAVINCI RESOLVE", "PREMIERE & AFTER FX", "RHYTHM PACING", "4K REC.709 MASTER"],
    image: "/images/services/service-3.png",
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
      { id: "4k", label: "4K UHD Export", description: "Cinema 4K master + web-optimized version", price: 35 },
      { id: "motion", label: "Custom Motion Graphics", description: "Animated titles, lower-thirds, transitions", price: 56 },
      { id: "vo", label: "Voiceover Integration", description: "AI or human VO edit, mix & sync", price: 28 },
      { id: "cuts", label: "YouTube + Reel Cuts", description: "16:9, 9:16, 1:1 format optimization", price: 21 },
      { id: "davinci", label: "DaVinci Color Science Grade", description: "Film emulation + LUT-based look development", price: 42 },
      { id: "long", label: "Long-Form Edit (up to 10 min)", description: "Extended documentary or brand film", price: 70 },
    ],
    deliveryDays: 7,
    accentColor: "#d97706",
  },
  {
    id: "music",
    number: "04",
    title: "Music & Sound Design",
    tagline: "Original sonic identities that resonate",
    description:
      "Composing original film scores, sonic identities, and studio-grade audio — from orchestral swells to lo-fi electronic textures.",
    capabilities: ["ORIGINAL SCORES", "ORCHESTRAL & SYNTH", "SPATIAL SOUND FX", "STUDIO MASTERING"],
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
      { id: "fulltrack", label: "Full Track (3+ minutes)", description: "Extended composition with full arc", price: 56 },
      { id: "orchestral", label: "Orchestral Arrangement", description: "Full string/brass/woodwind orchestration", price: 84 },
      { id: "sfx", label: "SFX Package", description: "10+ custom designed sound effects", price: 35 },
      { id: "stems", label: "Royalty-Free License", description: "Full commercial license + stems delivery", price: 42 },
      { id: "album", label: "Album Mix & Master", description: "Up to 10 tracks, full mastering suite", price: 105 },
      { id: "spatial", label: "Spatial / Dolby Atmos Mix", description: "Immersive audio for film/VR/gaming", price: 63 },
    ],
    deliveryDays: 7,
    accentColor: "#059669",
  },
  {
    id: "ecommerce",
    number: "05",
    title: "E-Commerce Web Design",
    tagline: "Online stores engineered to convert",
    description:
      "Building high-converting e-commerce experiences on Shopify, WooCommerce, or custom stacks — mobile-first, payment-ready, and growth-optimized.",
    capabilities: ["SHOPIFY & WOOCOMMERCE", "CUSTOM PRODUCT PAGES", "PAYMENT GATEWAY", "MOBILE-FIRST PWA"],
    image: "/images/services/service-1.jpg",
    imageAlt: "E-Commerce Web Design & Development",
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
      { id: "theme", label: "Custom Animated Theme", description: "Bespoke brand-matched storefront design", price: 35 },
      { id: "inventory", label: "Inventory Management System", description: "Stock alerts, bulk upload, variant tracking", price: 45 },
      { id: "analytics", label: "Advanced Analytics Dashboard", description: "Sales, conversion, heatmaps & traffic insights", price: 35 },
      { id: "multicurrency", label: "Multi-Currency & Language", description: "Auto geo-currency + multilingual storefront", price: 28 },
      { id: "blog", label: "Blog / Content Section", description: "Full CMS-powered blog integrated", price: 22 },
      { id: "seo", label: "Advanced SEO Package", description: "Schema markup, structured data, speed audit", price: 28 },
      { id: "email", label: "Email Marketing Integration", description: "Klaviyo, Mailchimp, abandoned cart flows", price: 35 },
      { id: "loyalty", label: "Loyalty & Rewards System", description: "Points, referrals, discount tiers", price: 42 },
      { id: "multivendor", label: "Multi-Vendor Marketplace", description: "Vendor onboarding, commissions, payouts", price: 70 },
      { id: "unlimited", label: "Unlimited Product Listings", description: "No cap — add as many products as needed", price: 35 },
      { id: "wishlist", label: "Wishlist & Save for Later", description: "User wishlists, saved carts, back-in-stock alerts", price: 18 },
      { id: "reviews", label: "Product Reviews & Ratings", description: "Verified purchase reviews, star ratings, photos", price: 20 },
      { id: "subscription", label: "Subscription / Recurring Orders", description: "Weekly/monthly auto-billing & delivery scheduling", price: 55 },
      { id: "livechat", label: "Live Chat Integration", description: "Intercom, Tidio or Crisp chat widget setup", price: 22 },
      { id: "speed", label: "Performance & Speed Optimization", description: "Core Web Vitals 90+, image CDN, lazy loading", price: 32 },
      { id: "abandoned", label: "Abandoned Cart Recovery", description: "Automated email + SMS cart abandonment flows", price: 28 },
      { id: "pos", label: "POS / In-Store Integration", description: "Sync online store with physical point-of-sale", price: 60 },
      { id: "ar", label: "AR Product Preview", description: "WebAR try-before-you-buy product visualization", price: 90 },
      { id: "b2b", label: "B2B Wholesale Portal", description: "Tiered pricing, bulk orders, net-30 invoicing", price: 80 },
      { id: "giftvoucher", label: "Gift Cards & Discount Vouchers", description: "Digital gift cards, promo codes, store credit", price: 20 },
      { id: "whatsapp", label: "WhatsApp Chat Button", description: "One-click WhatsApp contact + product share", price: 12 },
      { id: "socialsync", label: "Facebook & Instagram Shop Sync", description: "Auto-sync product catalog to Meta shops", price: 32 },
      { id: "googleshopping", label: "Google Shopping Feed", description: "Google Merchant Center product feed setup", price: 28 },
      { id: "flashsale", label: "Flash Sales & Countdown Timer", description: "Urgency timers, limited-time offers, sale badges", price: 18 },
      { id: "compare", label: "Product Comparison Tool", description: "Side-by-side feature comparison for products", price: 22 },
      { id: "videodemo", label: "Video Product Demo Support", description: "Embeddable video demos on product pages", price: 25 },
      { id: "bulkdiscount", label: "Bulk Discount Rules", description: "Buy X get Y, quantity breaks, tiered pricing", price: 25 },
      { id: "digital", label: "Digital Downloads (PDF/Software)", description: "Secure file delivery for digital products", price: 32 },
      { id: "affiliate", label: "Affiliate / Referral Program", description: "Referral tracking, commission management, payouts", price: 52 },
      { id: "customerdash", label: "Customer Account Dashboard", description: "Order history, saved addresses, wishlist, profile", price: 32 },
      { id: "returns", label: "Returns & Refund Manager", description: "Self-service return requests, tracking & refunds", price: 28 },
      { id: "shipping", label: "Advanced Shipping Calculator", description: "Live shipping rates, zones, free shipping rules", price: 20 },
      { id: "bundles", label: "Product Bundles & Upsells", description: "Bundle deals, upsell popups, cross-sell sections", price: 38 },
      { id: "popup", label: "Newsletter Popup & Exit Intent", description: "Lead capture popups, exit-intent discount offers", price: 18 },
      { id: "agegate", label: "Age Verification Gate", description: "Mandatory age check for restricted products", price: 12 },
      { id: "gdpr", label: "GDPR / Privacy Compliance Kit", description: "Cookie policy, data requests, privacy page setup", price: 18 },
    ],
    deliveryDays: 14,
    accentColor: "#f84022",
  },
];

const HEADLINE_WORDS =
  "Five crafts. One unified creative studio.".split(" ");

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowRightIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }} aria-hidden="true">
      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ size = 14, color = "#22c55e" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block", marginTop: 2 }} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PlusIcon({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }} aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CloseIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ArrowToBarIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }} aria-hidden="true">
      <path d="M4 12h11" /><path d="M11 7l5 5-5 5" /><path d="M19 6v12" />
    </svg>
  );
}

// ─── Pricing Panel Component ───────────────────────────────────────────────────

interface PricingPanelProps {
  service: ServiceData;
  isDark: boolean;
  onClose: () => void;
}

function PricingPanel({ service, isDark, onClose }: PricingPanelProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [orderOpen, setOrderOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const panelRef = useRef<HTMLDivElement | null>(null);

  const totalPrice =
    service.basePrice +
    [...selectedAddOns].reduce((sum, id) => {
      const addon = service.addOns.find((a) => a.id === id);
      return sum + (addon?.price ?? 0);
    }, 0);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string } = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Valid email is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedFeatures = [...selectedAddOns]
      .map((id) => service.addOns.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    const mailtoBody = encodeURIComponent(
      `Service: ${service.title}\nBase Package: $${service.basePrice}\nAdd-ons: ${selectedFeatures || "None"}\nTotal: $${totalPrice}\n\nBrief:\n${form.brief}`
    );
    window.location.href = `mailto:tamimglobal@gmail.com?subject=Order: ${service.title}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  // Animate in
  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 32, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  const bg = isDark ? "#0a0a0a" : "#ffffff";
  const border = isDark ? "rgba(255,255,255,0.1)" : "#e5e5e5";
  const textPrimary = isDark ? "#ffffff" : "#0a0a0a";
  const textMuted = isDark ? "#8e8e93" : "#6b7280";
  const cardBg = isDark ? "#111111" : "#f9f9f9";
  const addOnBg = isDark ? "#1a1a1a" : "#f4f4f4";
  const addOnSelected = isDark ? `${service.accentColor}18` : `${service.accentColor}12`;
  const addOnBorder = isDark ? "rgba(255,255,255,0.08)" : "#e5e5e5";
  const addOnBorderSelected = service.accentColor;

  return (
    <div
      ref={panelRef}
      className="tg-pricing-panel"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 20,
        marginTop: 24,
        marginBottom: 8,
        overflow: "hidden",
        boxShadow: isDark
          ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)"
          : "0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 28px",
          borderBottom: `1px solid ${border}`,
          background: isDark ? "#0d0d0d" : "#fafafa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: service.accentColor,
              boxShadow: `0 0 12px ${service.accentColor}80`,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: service.accentColor,
                marginBottom: 2,
              }}
            >
              Service {service.number} · Configure & Order
            </div>
            <div
              style={{
                fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                fontSize: 20,
                fontWeight: 600,
                color: textPrimary,
                letterSpacing: "-0.4px",
              }}
            >
              {service.title}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close pricing panel"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            border: "none",
            cursor: "pointer",
            color: textMuted,
            transition: "background 0.2s",
          }}
        >
          <CloseIcon size={16} color={textMuted} />
        </button>
      </div>

      {/* Panel body */}
      <div style={{ padding: "28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        className="tg-pricing-grid">
        
        {/* Left: Base package */}
        <div>
          <div
            style={{
              background: cardBg,
              borderRadius: 14,
              padding: "22px 24px",
              border: `1px solid ${border}`,
              height: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: textMuted,
                    marginBottom: 6,
                  }}
                >
                  Base Package
                </div>
                <div
                  style={{
                    fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                    fontSize: 32,
                    fontWeight: 700,
                    color: textPrimary,
                    letterSpacing: "-1px",
                    lineHeight: 1,
                  }}
                >
                  ${service.basePrice}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  color: service.accentColor,
                  background: `${service.accentColor}18`,
                  borderRadius: 6,
                  padding: "4px 10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {service.deliveryDays}d delivery
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${border}`, paddingTop: 18 }}>
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: textMuted,
                  marginBottom: 12,
                }}
              >
                What&apos;s included
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {service.baseIncludes.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckIcon size={14} color="#22c55e" />
                    <span
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 12,
                        color: isDark ? "rgba(255,255,255,0.8)" : "#374151",
                        lineHeight: 1.5,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Add-ons */}
        <div>
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: textMuted,
              marginBottom: 14,
            }}
          >
            Add-On Features — click to select
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 480, overflowY: "auto", paddingRight: 4, scrollbarWidth: "thin", scrollbarColor: `${service.accentColor}40 transparent` }}>
            {service.addOns.map((addon) => {
              const isSelected = selectedAddOns.has(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddOn(addon.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 16px",
                    borderRadius: 10,
                    border: `1px solid ${isSelected ? addOnBorderSelected : addOnBorder}`,
                    background: isSelected ? addOnSelected : addOnBg,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "left",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                    {/* Checkbox visual */}
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        border: `2px solid ${isSelected ? service.accentColor : (isDark ? "rgba(255,255,255,0.2)" : "#d1d5db")}`,
                        background: isSelected ? service.accentColor : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 12,
                          fontWeight: 500,
                          color: isSelected ? service.accentColor : textPrimary,
                          letterSpacing: "-0.01em",
                          lineHeight: 1.3,
                          transition: "color 0.2s",
                        }}
                      >
                        {addon.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 10,
                          color: textMuted,
                          marginTop: 2,
                          letterSpacing: "0.01em",
                          lineHeight: 1.4,
                        }}
                      >
                        {addon.description}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: isSelected ? service.accentColor : (isDark ? "#ffffff" : "#0a0a0a"),
                      letterSpacing: "-0.3px",
                      flexShrink: 0,
                      transition: "color 0.2s",
                    }}
                  >
                    +${addon.price}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer: Total + Order CTA */}
      <div
        style={{
          borderTop: `1px solid ${border}`,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          background: isDark ? "#0d0d0d" : "#fafafa",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: textMuted,
              marginBottom: 4,
            }}
          >
            Estimated Total
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span
              className="tg-price-counter"
              style={{
                fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                fontSize: 42,
                fontWeight: 800,
                color: service.accentColor,
                letterSpacing: "-2px",
                lineHeight: 1,
                transition: "all 0.3s ease",
              }}
            >
              ${totalPrice}
            </span>
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11,
                color: textMuted,
                letterSpacing: "0.06em",
              }}
            >
              USD
            </span>
          </div>
          {selectedAddOns.size > 0 && (
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 10,
                color: textMuted,
                marginTop: 2,
              }}
            >
              Base ${service.basePrice} + {selectedAddOns.size} add-on{selectedAddOns.size > 1 ? "s" : ""}
            </div>
          )}
        </div>

        {!orderOpen && (
          <button
            type="button"
            onClick={() => setOrderOpen(true)}
            className="tg-order-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 10,
              border: "none",
              background: service.accentColor,
              color: "#ffffff",
              fontFamily: "'Geist Mono', monospace",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: `0 8px 24px ${service.accentColor}40`,
            }}
          >
            Order Now
            <ArrowRightIcon size={16} color="#ffffff" />
          </button>
        )}
      </div>

      {/* Inline Order Form */}
      {orderOpen && !submitted && (
        <div
          style={{
            borderTop: `1px solid ${border}`,
            padding: "28px",
            background: isDark ? "#080808" : "#f9f9f9",
          }}
        >
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: service.accentColor,
              marginBottom: 20,
            }}
          >
            Order Request — {service.title}
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
              className="tg-order-form-grid">
              {/* Name */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: textMuted,
                    marginBottom: 6,
                  }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Smith"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 8,
                    border: `1px solid ${formErrors.name ? "#ef4444" : border}`,
                    background: isDark ? "#111111" : "#ffffff",
                    color: textPrimary,
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 13,
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                />
                {formErrors.name && (
                  <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontFamily: "'Geist Mono', monospace" }}>
                    {formErrors.name}
                  </div>
                )}
              </div>
              {/* Email */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: textMuted,
                    marginBottom: 6,
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@company.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 8,
                    border: `1px solid ${formErrors.email ? "#ef4444" : border}`,
                    background: isDark ? "#111111" : "#ffffff",
                    color: textPrimary,
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 13,
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                />
                {formErrors.email && (
                  <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontFamily: "'Geist Mono', monospace" }}>
                    {formErrors.email}
                  </div>
                )}
              </div>
            </div>

            {/* Brief */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: textMuted,
                  marginBottom: 6,
                }}
              >
                Project Brief
              </label>
              <textarea
                value={form.brief}
                onChange={(e) => setForm({ ...form, brief: e.target.value })}
                placeholder="Tell me about your project, timeline, and any specific requirements..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: `1px solid ${border}`,
                  background: isDark ? "#111111" : "#ffffff",
                  color: textPrimary,
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 13,
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Summary row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderRadius: 10,
                background: `${service.accentColor}10`,
                border: `1px solid ${service.accentColor}30`,
                marginBottom: 20,
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>
                  Order Summary
                </div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: textPrimary }}>
                  {service.title} — ${service.basePrice} base
                  {selectedAddOns.size > 0 && ` + ${selectedAddOns.size} add-on${selectedAddOns.size > 1 ? "s" : ""}`}
                </div>
              </div>
              <div style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: 24, fontWeight: 800, color: service.accentColor, letterSpacing: "-1px" }}>
                ${totalPrice}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                type="submit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 32px",
                  borderRadius: 10,
                  border: "none",
                  background: service.accentColor,
                  color: "#ffffff",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: `0 8px 24px ${service.accentColor}40`,
                }}
              >
                Submit Order Request
                <ArrowRightIcon size={15} color="#ffffff" />
              </button>
              <button
                type="button"
                onClick={() => setOrderOpen(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "14px 24px",
                  borderRadius: 10,
                  border: `1px solid ${border}`,
                  background: "transparent",
                  color: textMuted,
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success state */}
      {submitted && (
        <div
          style={{
            borderTop: `1px solid ${border}`,
            padding: "36px 28px",
            textAlign: "center",
            background: isDark ? "#080808" : "#f9f9f9",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#22c55e18",
              border: "2px solid #22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <CheckIcon size={22} color="#22c55e" />
          </div>
          <div
            style={{
              fontFamily: "'Urbanist', var(--font-onest), sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: textPrimary,
              marginBottom: 8,
            }}
          >
            Order Request Sent!
          </div>
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 12,
              color: textMuted,
              letterSpacing: "0.02em",
            }}
          >
            I&apos;ll review your request and get back to you within 24 hours.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function WhatIBuildSection() {
  const { isDark } = useTheme();
  const [openPanelId, setOpenPanelId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsWrapperRef = useRef<HTMLDivElement | null>(null);
  const cardWrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const cardsWrapper = cardsWrapperRef.current;
    if (!section || !titleEl || !cardsWrapper) return;

    const mutedColor = isDark ? "#717171" : "#979797";
    const activeColor = isDark ? "#ffffff" : "#000000";

    const ctx = gsap.context(() => {
      // Per-character color scrub (Oxnod style)
      const chars = titleEl.querySelectorAll<HTMLElement>(".oxnod-title-char");
      if (chars.length > 0) {
        gsap.fromTo(
          chars,
          { color: mutedColor },
          {
            color: activeColor,
            stagger: { each: 0.5 },
            ease: "power1.out",
            scrollTrigger: {
              trigger: titleEl,
              start: "top 95%",
              end: "bottom 35%",
              scrub: 0.8,
            },
          }
        );
      }

      // Desktop staggered slide-in
      const mm = gsap.matchMedia();

      mm.add("(min-width: 992px)", () => {
        const cards = cardWrapRefs.current.filter((el): el is HTMLDivElement => el !== null);
        if (cards.length === 0) return;

        const positions = [0, 0.18, 0.36, 0.54, 0.72];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsWrapper,
            start: "top bottom",
            end: "bottom 60%",
            scrub: 1.5,
          },
        });

        cards.forEach((cardEl, idx) => {
          const fromX = idx % 2 === 0 ? 60 : -60;
          tl.fromTo(
            cardEl,
            { xPercent: fromX, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 0.32, ease: "none" },
            positions[idx] ?? idx * 0.18
          );
        });
      });

      mm.add("(max-width: 991px)", () => {
        const cards = cardWrapRefs.current.filter((el): el is HTMLDivElement => el !== null);
        cards.forEach((cardEl, idx) => {
          const fromPx = idx % 2 === 0 ? -48 : 48;
          gsap.fromTo(
            cardEl,
            { x: fromPx, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardEl,
                start: "top 86%",
                once: true,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  const handleViewDetails = useCallback((id: string) => {
    setOpenPanelId((prev) => {
      if (prev === id) return null;
      // Scroll to panel after short delay
      setTimeout(() => {
        const el = document.getElementById(`tg-pricing-${id}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return id;
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-i-build"
      className={`relative w-full py-[60px] md:py-[68px] lg:py-[120px] transition-colors duration-500 ${
        isDark
          ? "bg-[#000000] text-white border-t border-white/[0.06]"
          : "bg-[#f2f2f2] text-[#000000] border-t border-[#ececec]"
      }`}
      style={{ overflowX: "clip" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10">
        {/* ── Top Header Block ───────────────────────────────────────── */}
        <div className="mb-8 md:mb-12 lg:mb-[72px]">
          {/* Section bar */}
          <div
            className={`flex items-center justify-between border-t pt-3 mb-6 lg:mb-10 ${
              isDark ? "border-white/[0.14]" : "border-[#dcdcdc]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                style={{ width: 18, height: 18, flexShrink: 0, display: "block" }} aria-hidden="true">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#f84022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="#f84022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="#f84022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                className="text-[13px] md:text-[14px] leading-[18px] tracking-[-0.14px] uppercase font-normal whitespace-nowrap"
                style={{ fontFamily: "'Geist Mono', monospace", color: isDark ? "rgba(255,255,255,0.9)" : "#252424" }}
              >
                WHAT I BUILD &amp; CREATE
              </span>
            </div>
            <span
              className="text-[13px] md:text-[14px] leading-[18px] tracking-[-0.14px] uppercase whitespace-nowrap"
              style={{ fontFamily: "'Geist Mono', monospace", color: isDark ? "rgba(255,255,255,0.8)" : "#252424" }}
            >
              @TAMIMGLOBAL
            </span>
          </div>

          {/* Headline + CTA */}
          <div className="flex flex-wrap lg:flex-nowrap justify-between items-end gap-6">
            <div className="w-full max-w-[850px]">
              <h2
                ref={titleRef}
                className="font-medium text-[30px] leading-[1.2] sm:text-[36px] sm:leading-[44px] lg:text-[44px] lg:leading-[52px] tracking-[-0.88px]"
                style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif" }}
              >
                {HEADLINE_WORDS.map((word, wIdx) => (
                  <span key={wIdx} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, cIdx) => (
                      <span
                        key={cIdx}
                        className="oxnod-title-char inline-block"
                        style={{ color: isDark ? "#717171" : "#979797", transition: "none" }}
                      >
                        {char}
                      </span>
                    ))}
                    {wIdx < HEADLINE_WORDS.length - 1 ? "\u00A0" : ""}
                  </span>
                ))}
              </h2>
            </div>

            <div className="shrink-0">
              <a
                href="/services"
                className="group/pbtn inline-flex items-center select-none uppercase cursor-pointer"
                style={{ fontFamily: "'Geist Mono', monospace", color: "#ffffff" }}
              >
                <div
                  className="relative flex items-center justify-center rounded-l-[8px]"
                  style={{
                    width: 48, height: 44,
                    backgroundColor: isDark ? "#1a1a1d" : "#121212",
                    color: "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.16)" : "none",
                    clipPath: "polygon(0 0, 100% 0, 86% 100%, 0 100%)",
                    paddingRight: 6,
                  }}
                >
                  <div className="flex flex-col gap-[2px] opacity-65" style={{ position: "absolute", top: 6, right: 9 }}>
                    <span className="rounded-full" style={{ width: 2, height: 2, backgroundColor: "#f84022" }} />
                    <span className="rounded-full" style={{ width: 2, height: 2, backgroundColor: "#ffffff" }} />
                    <span className="rounded-full" style={{ width: 2, height: 2, backgroundColor: "#ffffff" }} />
                  </div>
                  <div className="overflow-hidden flex items-center justify-end relative" style={{ width: 18, height: 18 }}>
                    <div className="flex items-center transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/pbtn:translate-x-[18px]">
                      <ArrowToBarIcon color="#ffffff" size={18} />
                      <ArrowToBarIcon color="#f84022" size={18} />
                    </div>
                  </div>
                </div>
                <div
                  className="relative flex items-center justify-center rounded-r-[8px]"
                  style={{
                    height: 44, marginLeft: -4, paddingLeft: 28, paddingRight: 24,
                    backgroundColor: isDark ? "#1a1a1d" : "#121212",
                    color: "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.16)" : "none",
                    clipPath: "polygon(6px 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <div style={{ height: 20, overflow: "hidden" }}>
                    <div className="flex flex-col text-[13px] md:text-[14px] leading-[20px] font-medium tracking-[0.02em] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/pbtn:-translate-y-1/2">
                      <span className="flex items-center whitespace-nowrap" style={{ height: 20, color: "#ffffff" }}>VIEW ALL SERVICES</span>
                      <span className="flex items-center whitespace-nowrap" style={{ height: 20, color: "#f84022" }}>VIEW ALL SERVICES</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ── Service Cards ──────────────────────────────────────────── */}
        <div ref={cardsWrapperRef} className="flex flex-col gap-5 md:gap-8 lg:gap-[40px]">
          {SERVICES.map((svc, idx) => {
            const isRightAligned = idx % 2 === 0;
            const isPanelOpen = openPanelId === svc.id;

            return (
              <div key={svc.id}>
                <div className={isRightAligned ? "oxnod-service-slot-right" : "oxnod-service-slot-left"}>
                  <div
                    ref={(el) => { cardWrapRefs.current[idx] = el; }}
                    className="will-change-transform"
                  >
                    {/* Service card */}
                    <div
                      className={`group/card oxnod-service-card-inner ${!isRightAligned ? "is-even" : ""} rounded-[12px] p-[8px] border transition-all duration-300 ${
                        isPanelOpen
                          ? isDark
                            ? "bg-[#121212] border-white/[0.26]"
                            : "bg-white border-black/20"
                          : isDark
                          ? "bg-[#121212] border-white/[0.12] hover:border-white/[0.26]"
                          : "bg-white border-[#ececec] hover:border-black/20"
                      }`}
                      style={{
                        boxShadow: isPanelOpen
                          ? isDark
                            ? `0 0 0 2px ${svc.accentColor}30, 0 24px 48px rgba(0,0,0,0.4)`
                            : `0 0 0 2px ${svc.accentColor}20, 0 24px 48px rgba(0,0,0,0.08)`
                          : "none",
                      }}
                    >
                      {/* Thumbnail */}
                      <div className="w-full md:w-[244px] md:min-w-[244px] md:max-w-[244px] shrink-0">
                        <div className="w-full h-[250px] sm:h-[290px] md:h-full md:min-h-[238px] rounded-[8px] overflow-hidden bg-[#1a1a1d] relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={svc.image}
                            alt={svc.imageAlt}
                            loading="lazy"
                            className="w-full h-full object-cover rounded-[8px] transition-transform duration-700 ease-out group-hover/card:scale-105"
                          />
                          {/* Service number ghost overlay */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: 10,
                              right: 12,
                              fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                              fontSize: 56,
                              fontWeight: 900,
                              color: "rgba(255,255,255,0.08)",
                              lineHeight: 1,
                              letterSpacing: "-4px",
                              pointerEvents: "none",
                              userSelect: "none",
                            }}
                            aria-hidden="true"
                          >
                            {svc.number}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className={`oxnod-service-content flex-1 flex flex-col justify-between py-3 px-2 md:py-3 ${isRightAligned ? "md:pr-4 md:pl-0" : ""}`}
                      >
                        <div
                          className={`oxnod-service-top-grid pb-5 border-b ${
                            isDark ? "border-white/[0.10]" : "border-[#ececec]"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className="text-[13px] font-semibold"
                                style={{ color: svc.accentColor, fontFamily: "'Geist Mono', monospace", letterSpacing: "0.06em" }}
                              >
                                {svc.number}.
                              </div>
                              <div
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: svc.accentColor,
                                  boxShadow: `0 0 6px ${svc.accentColor}`,
                                }}
                              />
                              <span
                                style={{
                                  fontFamily: "'Geist Mono', monospace",
                                  fontSize: 10,
                                  color: svc.accentColor,
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                }}
                              >
                                from ${svc.basePrice}
                              </span>
                            </div>
                            <h3
                              className={`text-[22px] lg:text-[24px] leading-[32px] font-medium mb-1 tracking-[-0.48px] ${
                                isDark ? "text-white" : "text-[#000000]"
                              }`}
                              style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif" }}
                            >
                              {svc.title}
                            </h3>
                            <p
                              className="text-[13px] font-medium mb-2"
                              style={{ color: svc.accentColor, fontFamily: "'Geist Mono', monospace", letterSpacing: "0.01em" }}
                            >
                              {svc.tagline}
                            </p>
                            <p
                              className="text-[15px] lg:text-[16px] leading-[24px] font-medium"
                              style={{ color: isDark ? "#8e8e93" : "#717171" }}
                            >
                              {svc.description}
                            </p>
                          </div>

                          <div className="flex flex-col gap-3 justify-start items-start pt-0.5">
                            {svc.capabilities.map((cap) => (
                              <div key={cap} className="flex items-center gap-2.5">
                                <span
                                  className="rounded-full shrink-0"
                                  style={{
                                    width: 6,
                                    height: 6,
                                    backgroundColor: isDark ? "rgba(255,255,255,0.75)" : "#252424",
                                  }}
                                />
                                <span
                                  className="text-[13px] lg:text-[14px] leading-[18px] uppercase font-normal tracking-[-0.14px] whitespace-nowrap"
                                  style={{
                                    fontFamily: "'Geist Mono', monospace",
                                    color: isDark ? "rgba(255,255,255,0.85)" : "#252424",
                                  }}
                                >
                                  {cap}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Footer row */}
                        <div className="mt-5 flex items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={() => handleViewDetails(svc.id)}
                            className="group/vbtn relative inline-flex items-center gap-2 pb-1.5 uppercase cursor-pointer"
                            style={{
                              fontFamily: "'Geist Mono', monospace",
                              color: isPanelOpen ? svc.accentColor : (isDark ? "#ffffff" : "#000000"),
                              transition: "color 0.2s",
                            }}
                          >
                            <div className="overflow-hidden flex items-center justify-end" style={{ width: 20, height: 20 }}>
                              <div className="flex items-center transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/vbtn:translate-x-[20px]">
                                <ArrowToBarIcon color={isPanelOpen ? svc.accentColor : "#16a34a"} size={18} />
                                <ArrowToBarIcon color="#f84022" size={18} />
                              </div>
                            </div>
                            <div style={{ height: 22, overflow: "hidden" }}>
                              <div className="flex flex-col text-[14px] leading-[22px] font-medium tracking-[-0.14px] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/vbtn:-translate-y-1/2">
                                <span className="flex items-center whitespace-nowrap" style={{ height: 22, color: isPanelOpen ? svc.accentColor : (isDark ? "#ffffff" : "#000000") }}>
                                  {isPanelOpen ? "HIDE DETAILS" : "VIEW DETAILS"}
                                </span>
                                <span className="flex items-center whitespace-nowrap" style={{ height: 22, color: "#f84022" }}>
                                  {isPanelOpen ? "HIDE DETAILS" : "VIEW DETAILS"}
                                </span>
                              </div>
                            </div>
                            <span
                              className="absolute bottom-0 left-0 right-0 h-px transition-colors duration-300"
                              style={{ backgroundColor: isPanelOpen ? svc.accentColor : (isDark ? "#ffffff" : "#000000") }}
                            />
                          </button>

                          {/* Base price badge */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "6px 12px",
                              borderRadius: 8,
                              background: `${svc.accentColor}12`,
                              border: `1px solid ${svc.accentColor}30`,
                            }}
                          >
                            <PlusIcon size={12} color={svc.accentColor} />
                            <span
                              style={{
                                fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                                fontSize: 15,
                                fontWeight: 700,
                                color: svc.accentColor,
                                letterSpacing: "-0.3px",
                              }}
                            >
                              from ${svc.basePrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Pricing Panel (inline, below card) ── */}
                {isPanelOpen && (
                  <div id={`tg-pricing-${svc.id}`}>
                    <PricingPanel
                      service={svc}
                      isDark={isDark}
                      onClose={() => setOpenPanelId(null)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
