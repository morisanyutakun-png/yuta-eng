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
    alternateName: "Lumora 学習ハブ",
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
    alternateName: ["ルモラ", "Lumora 学習ハブ"],
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    logo: new URL("/favicon.svg", siteConfig.url).toString(),
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
        alternateName: "高校物理 専門塾 物理の森",
        url: siteConfig.physicsSchoolUrl,
        parentOrganization: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        description:
          "Lumora が運営する高校物理に特化したオンライン専門塾。物理基礎・物理の通年指導、定期テスト対策、共通テスト・国公立二次・私大入試対応。",
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
    name: "Lumora 学習ハブ",
    url: siteConfig.url,
    description:
      "Lumora（ルモラ）が運営する学習ハブ。物理専門塾「物理の森」、教材作成AI、学習支援アプリの公式入口を集約し、ブログで学びを発信する。",
    serviceType: [
      "学習ハブ運営",
      "高校物理 専門塾（物理の森）",
      "教材作成AI 紹介",
      "LaTeX 教材作成",
      "学習支援Webアプリ 紹介",
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
