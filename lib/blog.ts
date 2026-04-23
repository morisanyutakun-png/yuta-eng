import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  slug: string;
  draft?: boolean;
  coverImage?: string;
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
    tags: data.tags,
    category,
    slug,
    draft: typeof data.draft === "boolean" ? data.draft : false,
    coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
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

export function getAllPosts({ includeDrafts = false } = {}) {
  return getBlogFileNames()
    .map(readPost)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestPosts(limit = 3) {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string) {
  return getAllPosts({ includeDrafts: true }).find((post) => post.slug === slug && !post.draft);
}

export function getPostSlugs() {
  return getAllPosts().map((post) => post.slug);
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
