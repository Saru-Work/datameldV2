import { clients } from "@/lib/data";
import { site } from "@/lib/site";

const orgId = `${site.url}/#organization`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": orgId,
      name: site.name,
      url: site.url,
      logo: `${site.url}/datameld-logo.png`,
      image: `${site.url}/opengraph-image`,
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      areaServed: "Worldwide",
      knowsAbout: ["Web application development", "Mobile app development", "UI/UX design", "Cloud deployment"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software development services",
        itemListElement: site.services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description, provider: { "@id": orgId } },
        })),
      },
      subjectOf: clients.map((c) => ({ "@type": "CreativeWork", name: `${c.name} — built by DataMeld`, url: c.url })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": orgId },
      inLanguage: "en",
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
