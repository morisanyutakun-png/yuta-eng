import type { Metadata } from "next";

import { siteConfig } from "@/data/site";

type MetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  keywords = [],
  path = "/",
  type = "website",
}: MetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(canonicalPath, siteConfig.url).toString();
  const mergedKeywords = Array.from(
    new Set([...keywords, ...siteConfig.keywords]),
  );

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
