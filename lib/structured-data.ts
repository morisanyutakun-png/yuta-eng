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
    alternateName: ["ソルヴォラ", "Solvora Science Learning Hub"],
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
    alternateName: [
      "ソルヴォラ",
      "Solvora STEM Learning Hub",
      "理系人材育成 EdTech ハブ Solvora",
    ],
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: "理系人材を育てる、学びを設計する EdTech ハブ。",
    email: siteConfig.email,
    logo: new URL("/brand/solvora-mark.svg", siteConfig.url).toString(),
    founder: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    knowsAbout: [
      "理系人材育成",
      "STEM教育",
      "EdTech",
      "GIGAスクール構想",
      "教育DX",
      "AI教材作成",
      "LaTeX教材作成",
      "学習支援アプリ",
      "高校物理",
      "学習科学",
    ],
    areaServed: { "@type": "Country", name: "Japan" },
    sameAs: [siteConfig.physicsSchoolUrl, siteConfig.eddivomUrl, siteConfig.itPassUrl],
    subOrganization: [
      {
        "@type": "EducationalOrganization",
        name: "物理の森",
        alternateName: ["物理の森 オンライン物理塾", "Solvora 物理塾"],
        url: siteConfig.physicsSchoolUrl,
        parentOrganization: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        description:
          "Solvora が運営する物理専門塾オンライン。高校物理（力学・電磁気・波動・熱・原子）を理解で解くための個別カリキュラムを提供する高校物理オンライン塾。",
      },
      {
        "@type": "SoftwareApplication",
        name: "Physics",
        alternateName: ["高校物理アプリ Physics", "Solvora Physics"],
        url: siteConfig.physicsSchoolUrl,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "Solvora が提供する高校物理アプリ。力学・電磁気・波動・熱・原子の各単元を概念解説 → 例題 → 演習の3ステップでスマホから学べる高校物理学習アプリ。",
      },
      {
        "@type": "SoftwareApplication",
        name: "Eddivom",
        alternateName: ["Eddivom LaTeX教材作成", "LaTeX 教材作成 ツール Eddivom"],
        url: siteConfig.eddivomUrl,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "Solvora が公式紹介する LaTeX 教材作成 Web アプリ。AI で問題下書き → LaTeX 整形 → PDF 出力までをワンストップで処理し、教員・塾講師の問題プリント作成を効率化。",
      },
      {
        "@type": "SoftwareApplication",
        name: "IT Pass",
        alternateName: ["ITパスポート アプリ IT Pass", "ITパスポート 学習アプリ"],
        url: siteConfig.itPassUrl,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "Solvora が公式紹介する ITパスポート アプリ。過去問演習・分野別解説・苦手単元復習をスマホから 5〜10 分のスキマ時間で積み上げられる IT パスポート対策学習アプリ。",
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
    name: "Solvora",
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

export type ServiceSchemaInput = {
  name: string;
  alternateName?: string[];
  description: string;
  url: string;
  appCategory?: string;
  audience?: string;
  inLanguage?: string;
};

export function createSoftwareAppJsonLd(input: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    alternateName: input.alternateName,
    description: input.description,
    url: input.url,
    applicationCategory: input.appCategory ?? "EducationalApplication",
    operatingSystem: "Web",
    inLanguage: input.inLanguage ?? "ja",
    isAccessibleForFree: true,
    audience: input.audience
      ? { "@type": "EducationalAudience", educationalRole: input.audience }
      : undefined,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function createEducationalOrganizationJsonLd(input: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: input.name,
    alternateName: input.alternateName,
    description: input.description,
    url: input.url,
    inLanguage: input.inLanguage ?? "ja",
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "Japan" },
    audience: input.audience
      ? { "@type": "EducationalAudience", educationalRole: input.audience }
      : undefined,
  };
}

export function createFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
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
