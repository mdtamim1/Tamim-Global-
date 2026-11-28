"use client";

// ============================================================
// Tamim Global — "What I Build & Create" — Ultra Premium v3
// Editorial magazine layout · GSAP clip-path reveals
// Ghost numbers · Stagger text · Premium motion system
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ────────────────────────────────────────────────────────────────────

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
  stat: { value: string; label: string };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: ServiceData[] = [
  {
    id: "fullstack",
    number: "01",
    title: "Full-Stack\nEngineering",
    tagline: "Production-grade web applications built to scale",
    description:
      "Architecting resilient full-stack applications and APIs — Next.js, TypeScript, Postgres, edge-deployed and engineered for real users at real scale.",
    capabilities: ["NEXT.JS & REACT 19", "TYPESCRIPT & NODE", "POSTGRES & PRISMA", "100/100 LIGHTHOUSE"],
    image: "/images/services/service-1.jpg",
    imageAlt: "Full-Stack Engineering",
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
    stat: { value: "100/100", label: "Lighthouse Score" },
  },
  {
    id: "uiux3d",
    number: "02",
    title: "UI/UX &\nInteractive 3D",
    tagline: "Digital experiences that command attention",
    description:
      "Designing distinctive digital flagships with WebGL shaders, GSAP motion, and Figma-to-code precision. Every pixel has a reason to exist.",
    capabilities: ["DESIGN SYSTEMS", "THREE.JS & SHADERS", "GSAP CHOREOGRAPHY", "FIGMA TO CODE"],
    image: "/images/services/service-2.png",
    imageAlt: "UI/UX & Interactive 3D Design",
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
    stat: { value: "60fps", label: "Buttery Smooth Motion" },
  },
  {
    id: "video",
    number: "03",
    title: "Cinematic\nVideo Editing",
    tagline: "Cinema-grade storytelling for brands",
    description:
      "Cutting high-retention brand films and ads with DaVinci Resolve color science, rhythm-driven pacing, and 4K REC.709 mastering.",
    capabilities: ["DAVINCI RESOLVE", "PREMIERE & AFTER FX", "RHYTHM PACING", "4K REC.709 MASTER"],
    image: "/images/services/service-3.png",
    imageAlt: "Cinematic Video Production",
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
    stat: { value: "4K", label: "REC.709 Mastered" },
  },
  {
    id: "music",
    number: "04",
    title: "Music &\nSound Design",
    tagline: "Original sonic identities that resonate",
    description:
      "Composing original film scores, sonic identities, and studio-grade audio — from orchestral swells to lo-fi electronic textures.",
    capabilities: ["ORIGINAL SCORES", "ORCHESTRAL & SYNTH", "SPATIAL SOUND FX", "STUDIO MASTERING"],
    image: "/images/services/service-4.png",
    imageAlt: "Music Composition & Sound Design",
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
    stat: { value: "48kHz", label: "Studio-Grade Master" },
  },
  {
    id: "ecommerce",
    number: "05",
    title: "E-Commerce\nWeb Design",
    tagline: "Online stores engineered to convert",
    description:
      "Building high-converting e-commerce experiences on Shopify, WooCommerce, or custom stacks — mobile-first, payment-ready, and growth-optimized.",
    capabilities: ["SHOPIFY & WOOCOMMERCE", "CUSTOM PRODUCT PAGES", "PAYMENT GATEWAY", "MOBILE-FIRST PWA"],
    image: "/images/services/service-1.jpg",
    imageAlt: "E-Commerce Web Design",
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
    stat: { value: "50+", label: "Products Free" },
  },
];

// ─── Pricing Panel ─────────────────────────────────────────────────────────────

interface PricingPanelProps {
  service: ServiceData;
  isDark: boolean;
  onClose: () => void;
}

function CheckIcon({ size = 13, color = "#22c55e" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block", marginTop: 2 }} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function ArrowRight({ size = 15, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }} aria-hidden="true">
      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
    </svg>
  );
}
function CloseIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function PricingPanel({ service, isDark, onClose }: PricingPanelProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [orderOpen, setOrderOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const panelRef = useRef<HTMLDivElement | null>(null);

  const totalPrice = service.basePrice + [...selectedAddOns].reduce((sum, id) => {
    return sum + (service.addOns.find((a) => a.id === id)?.price ?? 0);
  }, 0);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string } = {};
    if (!form.name.trim()) errors.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Valid email required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const feats = [...selectedAddOns].map((id) => service.addOns.find((a) => a.id === id)?.label).filter(Boolean).join(", ");
    const body = encodeURIComponent(`Service: ${service.title}\nBase: $${service.basePrice}\nAdd-ons: ${feats || "None"}\nTotal: $${totalPrice}\n\nBrief:\n${form.brief}`);
    window.location.href = `mailto:tamimglobal@gmail.com?subject=Order: ${service.title}&body=${body}`;
    setSubmitted(true);
  };

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 24, scale: 0.99 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" });
    }
  }, []);

  const bg = isDark ? "#080808" : "#ffffff";
  const border = isDark ? "rgba(255,255,255,0.08)" : "#e5e5e5";
  const textPrimary = isDark ? "#ffffff" : "#0a0a0a";
  const textMuted = isDark ? "rgba(255,255,255,0.4)" : "#9ca3af";
  const cardBg = isDark ? "#0f0f0f" : "#f8f8f8";
  const addOnBg = isDark ? "#111111" : "#f4f4f4";

  return (
    <div ref={panelRef} className="tg-pricing-panel" style={{ background: bg, border: `1px solid ${border}`, borderRadius: 20, marginTop: 2, overflow: "hidden",
      boxShadow: isDark ? `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px ${service.accentColor}10` : `0 40px 80px rgba(0,0,0,0.1)` }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: `1px solid ${border}`, background: isDark ? "#0a0a0a" : "#fafafa" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: service.accentColor, boxShadow: `0 0 10px ${service.accentColor}` }} />
          <div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: service.accentColor, marginBottom: 2 }}>
              Configure & Order · Service {service.number}
            </div>
            <div style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: 18, fontWeight: 700, color: textPrimary, letterSpacing: "-0.3px" }}>
              {service.title.replace("\n", " ")}
            </div>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" style={{ width: 34, height: 34, borderRadius: "50%", background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CloseIcon size={15} color={textMuted} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="tg-pricing-grid">
        {/* Base */}
        <div style={{ background: cardBg, borderRadius: 14, padding: "20px", border: `1px solid ${border}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: textMuted, marginBottom: 6 }}>Base Package</div>
              <div style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: 36, fontWeight: 800, color: textPrimary, letterSpacing: "-1.5px", lineHeight: 1 }}>${service.basePrice}</div>
            </div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: service.accentColor, background: `${service.accentColor}18`, borderRadius: 6, padding: "4px 10px", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4, whiteSpace: "nowrap" }}>
              {service.deliveryDays}d delivery
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${border}`, paddingTop: 14 }}>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: textMuted, marginBottom: 10 }}>What&apos;s included free</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {service.baseIncludes.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <CheckIcon size={12} color="#22c55e" />
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: isDark ? "rgba(255,255,255,0.75)" : "#374151", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: textMuted, marginBottom: 10 }}>
            Add-On Features — click to select
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 440, overflowY: "auto", paddingRight: 4, scrollbarWidth: "thin", scrollbarColor: `${service.accentColor}40 transparent` }}>
            {service.addOns.map((addon) => {
              const sel = selectedAddOns.has(addon.id);
              return (
                <button key={addon.id} type="button" onClick={() => toggleAddOn(addon.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 9, border: `1px solid ${sel ? service.accentColor : (isDark ? "rgba(255,255,255,0.07)" : "#e5e5e5")}`, background: sel ? `${service.accentColor}14` : addOnBg, cursor: "pointer", transition: "all 0.18s ease", textAlign: "left", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${sel ? service.accentColor : (isDark ? "rgba(255,255,255,0.18)" : "#d1d5db")}`, background: sel ? service.accentColor : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.18s ease" }}>
                      {sel && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 500, color: sel ? service.accentColor : textPrimary, letterSpacing: "-0.01em", lineHeight: 1.3, transition: "color 0.18s" }}>{addon.label}</div>
                      <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, color: textMuted, marginTop: 1, lineHeight: 1.4 }}>{addon.description}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: 13, fontWeight: 700, color: sel ? service.accentColor : textPrimary, letterSpacing: "-0.3px", flexShrink: 0, transition: "color 0.18s" }}>+${addon.price}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${border}`, padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, background: isDark ? "#0a0a0a" : "#fafafa", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: textMuted, marginBottom: 3 }}>Estimated Total</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: 44, fontWeight: 900, color: service.accentColor, letterSpacing: "-2.5px", lineHeight: 1, transition: "all 0.3s ease" }}>${totalPrice}</span>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: textMuted }}>USD</span>
          </div>
          {selectedAddOns.size > 0 && <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, color: textMuted, marginTop: 1 }}>Base ${service.basePrice} + {selectedAddOns.size} add-on{selectedAddOns.size > 1 ? "s" : ""}</div>}
        </div>
        {!orderOpen && (
          <button type="button" onClick={() => setOrderOpen(true)} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 10, border: "none", background: service.accentColor, color: "#ffffff", fontFamily: "'Geist Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", boxShadow: `0 8px 28px ${service.accentColor}40`, transition: "all 0.3s ease" }}>
            Order Now <ArrowRight size={15} />
          </button>
        )}
      </div>

      {/* Order Form */}
      {orderOpen && !submitted && (
        <div style={{ borderTop: `1px solid ${border}`, padding: "24px 28px", background: isDark ? "#060606" : "#f9f9f9" }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: service.accentColor, marginBottom: 18 }}>Order Request — {service.title.replace("\n", " ")}</div>
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} className="tg-order-form-grid">
              {[{ key: "name", label: "Your Name *", ph: "John Smith", type: "text" }, { key: "email", label: "Email *", ph: "john@company.com", type: "email" }].map(({ key, label, ph, type }) => (
                <div key={key}>
                  <label style={{ display: "block", fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: textMuted, marginBottom: 5 }}>{label}</label>
                  <input type={type} value={form[key as "name" | "email"]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={ph}
                    style={{ width: "100%", padding: "11px 13px", borderRadius: 8, border: `1px solid ${formErrors[key as "name" | "email"] ? "#ef4444" : border}`, background: isDark ? "#111" : "#fff", color: textPrimary, fontFamily: "'Geist Mono', monospace", fontSize: 12, outline: "none", boxSizing: "border-box" }} />
                  {formErrors[key as "name" | "email"] && <div style={{ fontSize: 10, color: "#ef4444", marginTop: 3, fontFamily: "'Geist Mono', monospace" }}>{formErrors[key as "name" | "email"]}</div>}
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: textMuted, marginBottom: 5 }}>Project Brief</label>
              <textarea value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} placeholder="Tell me about your project, timeline, and requirements..." rows={3}
                style={{ width: "100%", padding: "11px 13px", borderRadius: 8, border: `1px solid ${border}`, background: isDark ? "#111" : "#fff", color: textPrimary, fontFamily: "'Geist Mono', monospace", fontSize: 12, outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 10, background: `${service.accentColor}10`, border: `1px solid ${service.accentColor}25`, marginBottom: 18, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: textPrimary }}>{service.title.replace("\n", " ")} — {selectedAddOns.size > 0 ? `$${service.basePrice} base + ${selectedAddOns.size} add-on${selectedAddOns.size > 1 ? "s" : ""}` : `$${service.basePrice} base`}</div>
              <div style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: 22, fontWeight: 800, color: service.accentColor, letterSpacing: "-1px" }}>${totalPrice}</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="submit" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, border: "none", background: service.accentColor, color: "#fff", fontFamily: "'Geist Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", boxShadow: `0 8px 24px ${service.accentColor}40` }}>
                Submit Order <ArrowRight size={14} />
              </button>
              <button type="button" onClick={() => setOrderOpen(false)} style={{ display: "inline-flex", alignItems: "center", padding: "13px 20px", borderRadius: 10, border: `1px solid ${border}`, background: "transparent", color: textMuted, fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {submitted && (
        <div style={{ borderTop: `1px solid ${border}`, padding: "32px 28px", textAlign: "center", background: isDark ? "#060606" : "#f9f9f9" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#22c55e18", border: "1.5px solid #22c55e", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <CheckIcon size={20} color="#22c55e" />
          </div>
          <div style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: 18, fontWeight: 700, color: textPrimary, marginBottom: 6 }}>Order Request Sent!</div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: textMuted }}>I&apos;ll review and get back to you within 24 hours.</div>
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
  const headerRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ghostRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textColRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Header reveal ──────────────────────────────────────────
      if (headerRef.current) {
        const els = headerRef.current.querySelectorAll<HTMLElement>(".tg-hdr-anim");
        gsap.fromTo(els,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 88%", once: true } }
        );
      }

      // ── Per service row animations ─────────────────────────────
      SERVICES.forEach((_, idx) => {
        const line = lineRefs.current[idx];
        const imgWrap = imgRefs.current[idx];
        const ghost = ghostRefs.current[idx];
        const textCol = textColRefs.current[idx];

        // Separator line scale reveal
        if (line) {
          gsap.fromTo(line, { scaleX: 0, transformOrigin: "left center" }, {
            scaleX: 1, duration: 1.1, ease: "power3.inOut",
            scrollTrigger: { trigger: line, start: "top 90%", once: true }
          });
        }

        // Image clip-path reveal (left to right)
        if (imgWrap) {
          gsap.fromTo(imgWrap,
            { clipPath: "inset(0 100% 0 0)", opacity: 1 },
            { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.inOut",
              scrollTrigger: { trigger: imgWrap, start: "top 85%", once: true } }
          );
        }

        // Ghost number parallax
        if (ghost) {
          gsap.fromTo(ghost, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.4, ease: "power3.out",
            scrollTrigger: { trigger: ghost, start: "top 90%", once: true }
          });
          gsap.to(ghost, {
            y: -50,
            ease: "none",
            scrollTrigger: { trigger: ghost, start: "top bottom", end: "bottom top", scrub: 1.5 }
          });
        }

        // Text column stagger reveal
        if (textCol) {
          const els = textCol.querySelectorAll<HTMLElement>(".tg-row-anim");
          gsap.fromTo(els,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.07, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: textCol, start: "top 85%", once: true } }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  const handleViewDetails = useCallback((id: string) => {
    setOpenPanelId((prev) => {
      const next = prev === id ? null : id;
      if (next) {
        setTimeout(() => {
          document.getElementById(`tg-panel-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
      return next;
    });
  }, []);

  const bg = isDark ? "#000000" : "#f0f0ec";
  const textPrimary = isDark ? "#ffffff" : "#0a0a0a";
  const textMuted = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";

  return (
    <section
      ref={sectionRef}
      id="what-i-build"
      style={{ background: bg, color: textPrimary, overflowX: "clip", borderTop: `1px solid ${borderColor}` }}
      className="transition-colors duration-500"
    >
      {/* ── Section Header ────────────────────────────────────────── */}
      <div ref={headerRef} className="w-full max-w-[1440px] mx-auto px-4 md:px-10 pt-16 md:pt-20 lg:pt-24 pb-0">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12 md:mb-16">
          {/* Label */}
          <div className="flex items-center gap-3 tg-hdr-anim">
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f84022", boxShadow: "0 0 10px #f84022" }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}>
              What I Build &amp; Create
            </span>
          </div>
          {/* Count badge */}
          <div className="tg-hdr-anim" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", letterSpacing: "0.08em" }}>
            05 DISCIPLINES
          </div>
        </div>

        {/* Big headline */}
        <div className="mb-0">
          <h2
            className="tg-hdr-anim"
            style={{
              fontFamily: "'Urbanist', var(--font-onest), sans-serif",
              fontSize: "clamp(36px, 6vw, 80px)",
              fontWeight: 800,
              letterSpacing: "-3px",
              lineHeight: 1.05,
              color: textPrimary,
              maxWidth: 800,
            }}
          >
            Five crafts.<br />
            <span style={{ color: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)" }}>One unified</span><br />
            creative force.
          </h2>
        </div>
      </div>

      {/* ── Service Rows ──────────────────────────────────────────── */}
      <div className="mt-16 md:mt-20">
        {SERVICES.map((svc, idx) => {
          const isOpen = openPanelId === svc.id;
          const isEven = idx % 2 === 0;

          return (
            <div key={svc.id} ref={(el) => { rowRefs.current[idx] = el; }}>
              {/* Separator line */}
              <div ref={(el) => { lineRefs.current[idx] = el; }} style={{ height: 1, background: borderColor, transformOrigin: "left center" }} />

              {/* Row */}
              <div
                className="w-full max-w-[1440px] mx-auto px-4 md:px-10 relative overflow-hidden"
                style={{ paddingTop: "clamp(40px, 5vw, 72px)", paddingBottom: "clamp(40px, 5vw, 72px)" }}
              >
                {/* Ghost number */}
                <div
                  ref={(el) => { ghostRefs.current[idx] = el; }}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "50%",
                    [isEven ? "right" : "left"]: "-2%",
                    transform: "translateY(-50%)",
                    fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                    fontSize: "clamp(140px, 20vw, 260px)",
                    fontWeight: 900,
                    letterSpacing: "-12px",
                    color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 0,
                  }}
                >
                  {svc.number}
                </div>

                {/* Two-column grid */}
                <div
                  className="tg-service-editorial-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: isEven ? "1fr 420px" : "420px 1fr",
                    gap: "clamp(32px, 5vw, 80px)",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* ── Text column ── */}
                  <div
                    ref={(el) => { textColRefs.current[idx] = el; }}
                    style={{ order: isEven ? 0 : 1 }}
                  >
                    {/* Number + accent line */}
                    <div className="flex items-center gap-4 mb-5 tg-row-anim">
                      <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: "0.14em", color: svc.accentColor, fontWeight: 600 }}>
                        {svc.number}.
                      </span>
                      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${svc.accentColor}60, transparent)`, maxWidth: 80 }} />
                      <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: svc.accentColor, background: `${svc.accentColor}15`, padding: "3px 10px", borderRadius: 20 }}>
                        from ${svc.basePrice}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="tg-row-anim"
                      style={{
                        fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                        fontSize: "clamp(32px, 4.5vw, 60px)",
                        fontWeight: 800,
                        letterSpacing: "-2.5px",
                        lineHeight: 1.05,
                        color: textPrimary,
                        marginBottom: 12,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {svc.title}
                    </h3>

                    {/* Tagline */}
                    <p className="tg-row-anim" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: "0.02em", color: svc.accentColor, marginBottom: 14, lineHeight: 1.5 }}>
                      {svc.tagline}
                    </p>

                    {/* Description */}
                    <p className="tg-row-anim" style={{ fontSize: 15, lineHeight: 1.75, color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", marginBottom: 24, maxWidth: 500 }}>
                      {svc.description}
                    </p>

                    {/* Capabilities */}
                    <div className="flex flex-wrap gap-2 mb-7 tg-row-anim">
                      {svc.capabilities.map((cap) => (
                        <span
                          key={cap}
                          style={{
                            fontFamily: "'Geist Mono', monospace",
                            fontSize: 10,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
                            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                            padding: "5px 12px",
                            borderRadius: 20,
                          }}
                        >
                          {cap}
                        </span>
                      ))}
                    </div>

                    {/* Stat */}
                    <div className="tg-row-anim mb-7">
                      <div style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: 36, fontWeight: 900, color: svc.accentColor, letterSpacing: "-2px", lineHeight: 1 }}>
                        {svc.stat.value}
                      </div>
                      <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: textMuted, marginTop: 4 }}>
                        {svc.stat.label}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="tg-row-anim">
                      <button
                        type="button"
                        onClick={() => handleViewDetails(svc.id)}
                        className="group/cta tg-service-cta"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0,
                          border: "none",
                          cursor: "pointer",
                          background: "transparent",
                          padding: 0,
                        }}
                      >
                        {/* Icon half */}
                        <div style={{
                          width: 46, height: 46,
                          background: svc.accentColor,
                          borderRadius: "10px 0 0 10px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.3s ease",
                          boxShadow: `0 6px 20px ${svc.accentColor}50`,
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.35s ease" }}>
                            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                          </svg>
                        </div>
                        {/* Label half */}
                        <div style={{
                          height: 46,
                          padding: "0 20px",
                          background: isDark ? "#1a1a1a" : "#0a0a0a",
                          borderRadius: "0 10px 10px 0",
                          display: "flex", alignItems: "center",
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 12,
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#ffffff",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "transparent"}`,
                          borderLeft: "none",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}>
                          <div style={{ height: 20, overflow: "hidden" }}>
                            <div style={{ display: "flex", flexDirection: "column", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }} className="group-hover/cta:tg-slide-label">
                              <span style={{ height: 20, display: "flex", alignItems: "center", color: "#ffffff" }}>
                                {isOpen ? "HIDE DETAILS" : "CONFIGURE & ORDER"}
                              </span>
                              <span style={{ height: 20, display: "flex", alignItems: "center", color: svc.accentColor }}>
                                {isOpen ? "HIDE DETAILS" : "CONFIGURE & ORDER"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* ── Image column ── */}
                  <div style={{ order: isEven ? 1 : 0 }}>
                    <div
                      ref={(el) => { imgRefs.current[idx] = el; }}
                      style={{
                        borderRadius: 16,
                        overflow: "hidden",
                        aspectRatio: "4/3",
                        position: "relative",
                        clipPath: "inset(0 100% 0 0)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={svc.image}
                        alt={svc.imageAlt}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.8s ease", transformOrigin: "center" }}
                        className="tg-img-hover"
                      />
                      {/* Image overlay gradient */}
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${svc.accentColor}20 0%, transparent 60%)`, pointerEvents: "none" }} />
                      {/* Corner badge */}
                      <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: svc.accentColor, boxShadow: `0 0 6px ${svc.accentColor}` }} />
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#ffffff", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          {svc.number} / 05
                        </span>
                      </div>
                      {/* Price badge */}
                      <div style={{ position: "absolute", bottom: 16, right: 16, background: svc.accentColor, borderRadius: 8, padding: "8px 14px" }}>
                        <div style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: 18, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px", lineHeight: 1 }}>
                          from ${svc.basePrice}
                        </div>
                        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>
                          {svc.deliveryDays}d delivery
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Panel */}
              {isOpen && (
                <div id={`tg-panel-${svc.id}`} className="w-full max-w-[1440px] mx-auto px-4 md:px-10 pb-10">
                  <PricingPanel service={svc} isDark={isDark} onClose={() => setOpenPanelId(null)} />
                </div>
              )}
            </div>
          );
        })}
        {/* Final bottom line */}
        <div style={{ height: 1, background: borderColor }} />
      </div>

      {/* ── Bottom CTA bar ─────────────────────────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-16 md:py-20 flex flex-wrap items-center justify-between gap-6">
        <div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: textMuted, marginBottom: 8 }}>Ready to start?</div>
          <div style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, color: textPrimary, letterSpacing: "-1.5px" }}>
            Let&apos;s build something<br />remarkable together.
          </div>
        </div>
        <a
          href="/services"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", borderRadius: 12, background: isDark ? "#ffffff" : "#0a0a0a", color: isDark ? "#000000" : "#ffffff", fontFamily: "'Geist Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease", boxShadow: isDark ? "0 8px 32px rgba(255,255,255,0.1)" : "0 8px 32px rgba(0,0,0,0.15)", whiteSpace: "nowrap" }}
        >
          View All Services
          <ArrowRight size={15} color={isDark ? "#000" : "#fff"} />
        </a>
      </div>
    </section>
  );
}
