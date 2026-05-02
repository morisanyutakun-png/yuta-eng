import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  /** Optional. Set when meaningfully revising a post — drives sitemap <lastmod>. */
  updated?: string;
  tags: string[];
  category: string;
  slug: string;
  draft?: boolean;
  /** Pin this post as the top "Featured" article on /blog and HOME, ignoring date order. */
  featured?: boolean;
  coverImage?: string;
  keyPoints?: string[];
  searchIntent?: string;
  /** FAQPage entries for SEO JSON-LD. Mirror the on-page <Faq> component when present. */
  faq?: { q: string; a: string }[];
  /** Educational metadata for LearningResource JSON-LD on tutorial-style articles. */
  educationalLevel?: string;
  /** Estimated active study time, ISO-8601 duration (e.g. "PT15M"). */
  timeRequired?: string;
};

export type BlogPostMeta = BlogFrontmatter & {
  formattedDate: string;
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isFaqArray(value: unknown): value is { q: string; a: string }[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as Record<string, unknown>).q === "string" &&
        typeof (item as Record<string, unknown>).a === "string",
    )
  );
}

function assertFrontmatter(data: Record<string, unknown>, fileName: string): BlogFrontmatter {
  const title = data.title;
  const description = data.description;
  const date = data.date;
  const category = data.category;
  const slug = data.slug;

  if (typeof title !== "string" || title.length === 0) {
    throw new Error(`Missing or invalid "title" in ${fileName}`);
  }

  if (typeof description !== "string" || description.length === 0) {
    throw new Error(`Missing or invalid "description" in ${fileName}`);
  }

  if (typeof date !== "string" || date.length === 0) {
    throw new Error(`Missing or invalid "date" in ${fileName}`);
  }

  if (typeof category !== "string" || category.length === 0) {
    throw new Error(`Missing or invalid "category" in ${fileName}`);
  }

  if (typeof slug !== "string" || slug.length === 0) {
    throw new Error(`Missing or invalid "slug" in ${fileName}`);
  }

  if (!isStringArray(data.tags)) {
    throw new Error(`Missing or invalid "tags" in ${fileName}`);
  }

  return {
    title,
    description,
    date,
    updated:
      typeof data.updated === "string" && data.updated.length > 0
        ? data.updated
        : undefined,
    tags: data.tags,
    category,
    slug,
    draft: typeof data.draft === "boolean" ? data.draft : false,
    featured: typeof data.featured === "boolean" ? data.featured : false,
    coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
    keyPoints: isStringArray(data.keyPoints) ? data.keyPoints : undefined,
    searchIntent: typeof data.searchIntent === "string" ? data.searchIntent : undefined,
    faq: isFaqArray(data.faq) ? data.faq : undefined,
    educationalLevel:
      typeof data.educationalLevel === "string" && data.educationalLevel.length > 0
        ? data.educationalLevel
        : undefined,
    timeRequired:
      typeof data.timeRequired === "string" && data.timeRequired.length > 0
        ? data.timeRequired
        : undefined,
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function estimateReadingTime(content: string) {
  const compactText = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "");
  const minutes = Math.max(1, Math.ceil(compactText.length / 500));

  return `${minutes} min read`;
}

function getBlogFileNames() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"));
}

function readPost(fileName: string): BlogPost {
  const fullPath = path.join(BLOG_DIR, fileName);
  const source = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(source);
  const frontmatter = assertFrontmatter(data, fileName);

  return {
    ...frontmatter,
    content,
    formattedDate: formatDate(frontmatter.date),
    readingTime: estimateReadingTime(content),
  };
}

export function getAllPosts({
  includeDrafts = false,
}: { includeDrafts?: boolean } = {}) {
  // Future-date filtering was removed: it silently hid published articles
  // (e.g. the "考える力を育てる電磁気" textbook post) whenever today's date
  // hadn't yet caught up to the frontmatter date. Use `draft: true` to keep
  // a post unpublished instead.
  return getBlogFileNames()
    .map(readPost)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => {
      // Pinned `featured: true` posts come first, then by date (newest first).
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getLatestPosts(limit = 3) {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string) {
  return getAllPosts({ includeDrafts: true }).find(
    (post) => post.slug === slug && !post.draft,
  );
}

export function getPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

/** Slugify a tag/category for URL safety. Keeps Japanese (URL-encoded by Next). */
export function slugifyTag(tag: string): string {
  return tag.trim();
}

/**
 * Read the build-stamp written by `scripts/precompute-og-cards.mjs` so card
 * thumbnails can be cache-busted across deploys without breaking the
 * `immutable` cache headers (URL changes → fresh cache key).
 */
let cachedOgVersion: string | null = null;
export function getOgVersion(): string {
  if (cachedOgVersion !== null) return cachedOgVersion;
  try {
    const versionPath = path.join(process.cwd(), "public", "og", ".version");
    const v = fs.readFileSync(versionPath, "utf8").trim();
    cachedOgVersion = v.length > 0 ? v : "v1";
  } catch {
    cachedOgVersion = "v1";
  }
  return cachedOgVersion;
}

/** Returns all unique tags with their post counts, sorted desc by count. */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Returns all unique categories with their post counts, sorted desc by count. */
export function getAllCategories(): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3) {
  const currentPost = getPostBySlug(currentSlug);

  if (!currentPost) {
    return [];
  }

  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .filter(
      (post) =>
        post.category === currentPost.category ||
        post.tags.some((tag) => currentPost.tags.includes(tag)),
    )
    .slice(0, limit);
}
