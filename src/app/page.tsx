// ============================================================
// Tamim Global — Homepage (Server Component)
// Fetches content server-side, passes to client shell.
// JSON-LD structured data for SEO.
// ============================================================

import { getContent } from "@/lib/content";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const content = await getContent();

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://tamimglobal.com/#tamim",
        name: "Tamim",
        url: "https://tamimglobal.com",
        jobTitle: "Full-Stack Web Designer & Developer",
        worksFor: {
          "@type": "Organization",
          name: "Tamim Global",
          url: "https://tamimglobal.com",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
        sameAs: [
          "https://github.com/tamimglobal",
          "https://linkedin.com/in/tamimglobal",
          "https://twitter.com/tamimglobal",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://tamimglobal.com/#service",
        name: "Tamim Global",
        url: "https://tamimglobal.com",
        description: content.meta.siteDescription,
        provider: { "@id": "https://tamimglobal.com/#tamim" },
        areaServed: "Worldwide",
        serviceType: [
          "Web Design",
          "Web Development",
          "SaaS Development",
          "E-commerce Development",
          "AI Integration",
        ],
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient content={content} />
    </>
  );
}
