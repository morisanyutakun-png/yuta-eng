import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/blog";

const SITE_URL = siteConfig.url;

const staticRoutes = [
  {
    path: "",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/apps",
    changeFrequency: "weekly",
    priority: 0.85,
  },
  {
    path: "/blog",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.6,
  },
] satisfies Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map(
    ({ category }) => ({
      url: `${SITE_URL}/blog/category/${category}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.65,
    }),
  );

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map(({ tag }) => ({
    url: `${SITE_URL}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.55,
  }));

  return [...pages, ...blogRoutes, ...categoryRoutes, ...tagRoutes];
}
