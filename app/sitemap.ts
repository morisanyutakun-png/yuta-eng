import type { MetadataRoute } from "next";

import { universities } from "@/lib/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/universities`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...universities.map((u) => ({
      url: `${site.url}/univ/${u.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
