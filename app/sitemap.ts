import type { MetadataRoute } from "next";

import { universities } from "@/lib/data";
import { kanseiPublished } from "@/lib/series";
import { hasSolutions, published, questionPath, setPath } from "@/lib/solutions";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/universities`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/books`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/shindan`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/kansei`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // 近日追加予定の巻はページがないので載せない（ASIN が入ると自動で加わる）
    ...kanseiPublished.map((k) => ({
      url: `${site.url}/kansei/${k.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // 解答解説は「公開済み」のものだけ。書きかけ・原典未確認のものは載せない
    ...(hasSolutions
      ? [{ url: `${site.url}/kaisetsu`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 }]
      : []),
    ...[...new Set(published.map((s) => s.slug))].map((slug) => ({
      url: `${site.url}/kaisetsu/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...published.flatMap((s) => [
      { url: `${site.url}${setPath(s)}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
      ...s.questions.map((q) => ({
        url: `${site.url}${questionPath(s, q.no)}`,
        lastModified: new Date(q.updated),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ]),
    ...universities.map((u) => ({
      url: `${site.url}/univ/${u.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
