import fs from "node:fs";
import path from "node:path";

import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";

const SITE_URL = siteConfig.url;

/**
 * Static-route lastmod: file mtime of the corresponding page.tsx. This
 * actually changes only when the page is edited, so Google gets a real
 * signal instead of `new Date()` on every deploy.
 */
function pageMtime(routePath: string, fallback: Date): Date {
  const rel = routePath === "" ? "page.tsx" : `${routePath.slice(1)}/page.tsx`;
  const abs = path.join(process.cwd(), "app", rel);
  try {
    return fs.statSync(abs).mtime;
  } catch {
    return fallback;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: pageMtime("", now),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: pageMtime("/about", now),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/order`,
      lastModified: pageMtime("/order", now),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: pageMtime("/contact", now),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/legal/tokushoho`,
      lastModified: pageMtime("/legal/tokushoho", now),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/legal/privacy`,
      lastModified: pageMtime("/legal/privacy", now),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/legal/refund`,
      lastModified: pageMtime("/legal/refund", now),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
