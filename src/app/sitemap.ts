import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date("2026-11-19"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...servicePages.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: new Date("2026-11-19"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
