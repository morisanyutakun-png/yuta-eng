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
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ja",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    founder: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    subOrganization: [
      {
        "@type": "EducationalOrganization",
        name: "Lumora Physics（物理専門塾）",
        url: siteConfig.physicsSchoolUrl,
        description:
          "高校物理に特化したオンライン専門塾。物理基礎・物理の通年指導、定期テスト対策、共通テスト・国公立二次・私大入試対応。",
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
      "物理 苦手克服",
      "教育ICT",
      "教育DX",
      "GIGAスクール",
      "EdTech",
      "教材作成AI",
      "生成AI教材作成",
      "物理教材",
      "LaTeX教材作成",
      "教材制作",
      "学習支援Webアプリ",
      "個別最適な学び",
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
      "高校物理 わかりやすい",
      "教材作成AI",
      "生成AI教材作成",
      "教育DX",
      "GIGAスクール",
      "EdTech",
      "教育ICT",
      "物理教材",
      "LaTeX教材作成",
      "学習支援Webアプリ",
      "個別最適な学び",
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
    name: "Lumora EdTech 学習スタジオ",
    url: siteConfig.url,
    description:
      "高校物理の概念理解、AI・LaTeX による教材作成、学習支援Webアプリ設計をひとつの動線でつなぐ EdTech 学習スタジオ。",
    serviceType: [
      "高校物理 学習支援",
      "教材作成AI",
      "LaTeX 教材作成",
      "学習支援Webアプリ設計",
      "教育DX コンテンツ設計",
    ],
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
      {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
      {
        "@type": "EducationalAudience",
        educationalRole: "teacher",
      },
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
