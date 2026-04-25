import { siteConfig } from "@/data/site";
import { homeFaq } from "@/data/home";
import type { BlogPost } from "@/lib/blog";

type ItemListItem = {
  name: string;
  description?: string;
  url: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: ["ルモラ", "Lumora Science Learning Hub"],
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ja",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: ["ルモラ", "Lumora Science Learning Hub"],
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    logo: new URL("/brand/lumora-logo.png", siteConfig.url).toString(),
    founder: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    sameAs: [siteConfig.physicsSchoolUrl, siteConfig.eddivomUrl, siteConfig.itPassUrl],
    subOrganization: [
      {
        "@type": "EducationalOrganization",
        name: "物理の森",
        url: siteConfig.physicsSchoolUrl,
        parentOrganization: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        description:
          "Lumora が運営する、高校物理に特化したオンライン専門塾。",
      },
    ],
  };
}

export function createPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: siteConfig.url,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    knowsAbout: [
      "高校物理",
      "数学",
      "情報",
      "教材作成",
      "LaTeX",
      "学習デザイン",
      "EdTech",
    ],
  };
}

export function createHomePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ja",
    about: [
      "高校物理",
      "数学",
      "情報",
      "教材作成",
      "LaTeX",
      "学習デザイン",
      "EdTech",
    ],
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function createEducationalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Lumora",
    url: siteConfig.url,
    description:
      "理系の学びを深めるための記事と専門サービスをまとめるサイト。",
    serviceType: ["記事の発信", "高校物理 専門塾（物理の森）", "教材作成の支援"],
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Japan",
    },
    audience: [
      { "@type": "EducationalAudience", educationalRole: "student" },
      { "@type": "EducationalAudience", educationalRole: "teacher" },
    ],
  };
}

export function createHomeFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createItemListJsonLd(name: string, items: ItemListItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.url,
      name: item.name,
      description: item.description,
    })),
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

export function createArticleJsonLd(post: BlogPost) {
  const url = new URL(`/blog/${post.slug}`, siteConfig.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    about: post.tags,
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: {
      "@type": "Blog",
      name: `${siteConfig.name} Blog`,
      url: new URL("/blog", siteConfig.url).toString(),
    },
    keywords: post.tags.join(", "),
    inLanguage: "ja",
  };
}
