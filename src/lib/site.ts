// Single source of truth for SEO metadata. Set NEXT_PUBLIC_SITE_URL to the
// production domain (defaults to https://datameld.org); on Vercel the production
// domain is picked up automatically.
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);

export const site = {
  url: (fromEnv ?? "https://datameld.org").replace(/\/$/, ""),
  name: "DataMeld",
  title: "DataMeld — Web & Mobile App Development Company in Sri Lanka",
  shortTitle: "DataMeld",
  description:
    "DataMeld is a Jaffna, Sri Lanka based software studio that designs and builds custom web applications and mobile apps for startups and enterprises worldwide.",
  tagline: "We engineer software businesses run on.",
  email: "saruatwork@gmail.com",
  locale: "en_US",
  address: {
    locality: "Jaffna",
    region: "Northern Province",
    country: "LK",
    countryName: "Sri Lanka",
  },
  keywords: [
    "web app development",
    "mobile app development",
    "custom software development",
    "software company Sri Lanka",
    "web development Jaffna",
    "app developers Sri Lanka",
    "Next.js development",
    "React development",
    "startup MVP development",
    "UI/UX design",
    "DataMeld",
  ],
  services: [
    {
      name: "Web application development",
      description: "Custom web apps, dashboards, SaaS platforms and marketing websites built with modern frameworks.",
    },
    {
      name: "Mobile app development",
      description: "iOS and Android apps designed, built, launched and maintained for growing businesses.",
    },
  ],
} as const;
