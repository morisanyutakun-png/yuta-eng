import fs from "node:fs";
import path from "node:path";

import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  type BlogPostMeta,
} from "@/lib/blog";

const SITE_URL = siteConfig.url;

/**
 * Per-post lastmod: prefer explicit `updated` frontmatter, else `date`.
 * Posts written without `updated` still surface their original publish date,
 * so Google treats unchanged posts as stable instead of "everything changed
 * on every deploy" (which it would penalise by ignoring <lastmod>).
 */
function postLastMod(post: BlogPostMeta): Date {
  return new Date(post.updated ?? post.date);
}

function maxDate(dates: Date[], fallback: Date): Date {
  if (dates.length === 0) return fallback;
  return new Date(Math.max(...dates.map((d) => d.getTime())));
}

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
  const posts = getAllPosts();
  const newestPost = maxDate(posts.map(postLastMod), now);

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      // Home surfaces the latest blog posts → its freshness tracks them.
      lastModified: maxDate(
        [pageMtime("", now), newestPost],
        now,
      ),
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
      url: `${SITE_URL}/apps`,
      lastModified: pageMtime("/apps", now),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: pageMtime("/contact", now),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: newestPost,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: postLastMod(post),
    // Articles rarely change after publish; if they do, bump `updated:`.
    changeFrequency: "monthly",
    priority: post.featured ? 0.85 : 0.75,
  }));

  // Bucket lastmod = newest post within that bucket (real signal, not deploy time).
  const categoryEntries: MetadataRoute.Sitemap = getAllCategories().map(
    ({ category }) => {
      const inBucket = posts.filter((p) => p.category === category);
      return {
        url: `${SITE_URL}/blog/category/${encodeURIComponent(category)}`,
        lastModified: maxDate(inBucket.map(postLastMod), newestPost),
        changeFrequency: "weekly",
        priority: 0.6,
      };
    },
  );

  const tagEntries: MetadataRoute.Sitemap = getAllTags().map(({ tag }) => {
    const inBucket = posts.filter((p) => p.tags.includes(tag));
    return {
      url: `${SITE_URL}/blog/tag/${encodeURIComponent(tag)}`,
      lastModified: maxDate(inBucket.map(postLastMod), newestPost),
      changeFrequency: "weekly",
      priority: 0.5,
    };
  });

  return [
    ...staticEntries,
    ...blogPostEntries,
    ...categoryEntries,
    ...tagEntries,
  ];
}
