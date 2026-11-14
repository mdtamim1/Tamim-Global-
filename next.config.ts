import type { NextConfig } from "next";

// ============================================================
// Tamim Global — Next.js Config
// Performance, image optimisation, security headers.
// ============================================================

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  // ---- Image optimisation ----
  images: {
    formats: ["image/avif", "image/webp"],
    // Add external domains here if you host images on a CDN:
    // remotePatterns: [{ protocol: "https", hostname: "cdn.example.com" }],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },

  // ---- Security & performance headers ----
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer policy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unused APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Aggressive cache for static assets
        source: "/(.*)\\.(png|jpg|jpeg|gif|webp|avif|ico|svg|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
