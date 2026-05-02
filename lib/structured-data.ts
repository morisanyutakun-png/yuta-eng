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

const LOGO_URL = new URL("/brand/solvora-mark.svg", siteConfig.url).toString();

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: ["ソルヴォラ", "Solvora STEM Learning Hub"],
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ja",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
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
    url: new URL("/about", siteConfig.url).toString(),
    image: LOGO_URL,
    jobTitle: "理系教育クリエイター・EdTech 設計者・Eddivom 開発者",
    description:
      "名古屋大学 工学部 電気電子情報系で学び、暗号・セキュリティ分野に関心を持つ理系教育クリエイター。高校物理・電磁気学を中心に、現象・図・言葉・式を結びつけた構造的理解を支える教材制作と、AI×LaTeX を用いた教材作成アプリ Eddivom の開発を行う。",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "名古屋大学",
      alternateName: "Nagoya University",
      department: "工学部 電気電子情報工学科",
      url: "https://www.nagoya-u.ac.jp/",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "応用情報技術者",
        credentialCategory: "国家資格",
        recognizedBy: {
          "@type": "Organization",
          name: "情報処理推進機構（IPA）",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "日商簿記検定 2級",
        credentialCategory: "公的資格",
        recognizedBy: {
          "@type": "Organization",
          name: "日本商工会議所",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "FP（ファイナンシャル・プランニング）技能検定 3級",
        credentialCategory: "国家資格",
        recognizedBy: {
          "@type": "Organization",
          name: "日本 FP 協会 / 金融財政事情研究会",
        },
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    knowsAbout: [
      "高校物理",
      "電磁気学",
      "物理教育",
      "教材制作",
      "LaTeX 組版",
      "AI 教材作成",
      "EdTech 開発",
      "暗号 セキュリティ",
      "システム設計",
      "ネットワーク",
      "データベース",
      "Webアプリケーション開発",
      "Next.js TypeScript",
      "学習デザイン",
      "理系人材育成",
      "STEM教育",
    ],
    sameAs: [
      siteConfig.physicsSchoolUrl,
      siteConfig.eddivomUrl,
      siteConfig.itPassUrl,
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
  const imageUrl1200 = new URL(`/og/${post.slug}-1200.webp`, siteConfig.url).toString();
  const imageUrl640 = new URL(`/og/${post.slug}-640.webp`, siteConfig.url).toString();
  const imagePng = new URL(`/og/${post.slug}.png`, siteConfig.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    articleSection: post.category,
    about: post.tags,
    image: [
      {
        "@type": "ImageObject",
        url: imageUrl1200,
        width: 1200,
        height: 630,
      },
      {
        "@type": "ImageObject",
        url: imageUrl640,
        width: 640,
        height: 336,
      },
      {
        "@type": "ImageObject",
        url: imagePng,
        width: 1200,
        height: 630,
      },
    ],
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: new URL("/about", siteConfig.url).toString(),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
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
    ...(post.educationalLevel
      ? {
          educationalLevel: post.educationalLevel,
          learningResourceType: "Article",
          educationalUse: "Self-Study",
          audience: {
            "@type": "EducationalAudience",
            educationalRole: "student",
          },
        }
      : {}),
    ...(post.timeRequired ? { timeRequired: post.timeRequired } : {}),
  };
}

/**
 * ContactPage schema for /contact. Pairs nicely with the FAQ + Organization
 * schemas already on the page so Google can connect "this contact is for
 * Solvora the EdTech SaaS publisher" rather than guessing from anchor text.
 */
export function createContactPageJsonLd() {
  const url = new URL("/contact", siteConfig.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `${siteConfig.name} お問い合わせ｜EdTech SaaS / 物理講座 外注`,
    url,
    inLanguage: "ja",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.email,
          areaServed: "JP",
          availableLanguage: ["ja"],
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.email,
          areaServed: "JP",
          availableLanguage: ["ja"],
          description:
            "Eddivom などの EdTech SaaS に関する取材・パートナー連携・機能要望",
        },
      ],
    },
  };
}

/**
 * FAQPage JSON-LD built from frontmatter `faq:` items. Returns null when the
 * post has no FAQ block, so the caller can spread the result conditionally.
 */
export function createPostFaqJsonLd(post: BlogPost) {
  if (!post.faq || post.faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/** CollectionPage schema for blog index, tag, category landing pages. */
export function createCollectionPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  itemCount?: number;
}) {
  const url = new URL(input.path, siteConfig.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url,
    inLanguage: "ja",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    ...(typeof input.itemCount === "number"
      ? { numberOfItems: input.itemCount }
      : {}),
  };
}
