import type { MetadataRoute } from "next";

import { universities } from "@/lib/data";
import { kanseiPublished } from "@/lib/series";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/universities`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/shindan`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/kansei`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // 近日追加予定の巻はページがないので載せない（ASIN が入ると自動で加わる）
    ...kanseiPublished.map((k) => ({
      url: `${site.url}/kansei/${k.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...universities.map((u) => ({
      url: `${site.url}/univ/${u.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
