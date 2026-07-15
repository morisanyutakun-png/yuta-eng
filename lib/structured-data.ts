import { siteConfig } from "@/data/site";
import { homeFaq } from "@/data/home";

type BreadcrumbItem = {
  name: string;
  path: string;
};

const LOGO_URL = new URL("/brand/nobit-mark.svg", siteConfig.url).toString();
const FULL_NAME = `${siteConfig.name} ${siteConfig.division}`;

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: ["ノビットスタディ 中高部", "Nobit Study"],
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
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: FULL_NAME,
    alternateName: ["ノビットスタディ", "Nobit Study", "ノビット 通信添削"],
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: "高校生向け・買い切りの通信添削。教材と答案添削。",
    email: siteConfig.email,
    logo: LOGO_URL,
    image: LOGO_URL,
    founder: {
      "@type": "Person",
      name: siteConfig.author,
      url: new URL("/about", siteConfig.url).toString(),
    },
    knowsAbout: [
      "高校物理",
      "高校化学",
      "高校数学",
      "高校英語 添削",
      "理系科目 記述答案 添削",
      "記述答案の指導",
      "学習管理アプリ",
      "オンライン学習",
      "大学受験 理系",
      "教材開発",
    ],
    areaServed: { "@type": "Country", name: "Japan" },
    audience: [
      { "@type": "EducationalAudience", educationalRole: "student" },
      { "@type": "Audience", audienceType: "保護者" },
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
    jobTitle: "ノビットスタディ 教材開発・添削担当",
    description:
      "名古屋大学 工学部で学んだ理系教育者。高校物理・電磁気を中心に、現象・図・言葉・式を結びつけた構造的理解を育てる教材シリーズを制作。ノビットスタディ 中高部では、自作オリジナル教材・専用アプリ・提出ごとの答案添削で高校生の記述答案力と自立した学びを支える。",
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
    ],
    worksFor: {
      "@type": "EducationalOrganization",
      name: FULL_NAME,
      url: siteConfig.url,
    },
    knowsAbout: [
      "高校物理",
      "電磁気学",
      "物理教育",
      "記述答案 添削",
      "教材制作",
      "学習デザイン",
      "高校数学",
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
      "デジタル通信添削",
      "記述答案 添削",
      "提出ごとの添削",
      "高校生 添削",
      "オリジナル教材",
      "買い切り 通信添削",
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
    name: FULL_NAME,
    url: siteConfig.url,
    description:
      "高校生向けの買い切り通信添削。物理・化学・数学・英語のオリジナル教材を1回10〜20分で解いて答案を提出すると、教材を作った本人が途中式や考え方まで添削し、専用アプリで返却する。解答解説PDF・専用アプリ込みの買い切りで、授業や面談は行わない。",
    serviceType: [
      "デジタル通信添削",
      "記述答案の添削指導",
      "専用学習アプリ",
      "教材提供",
    ],
    provider: {
      "@type": "EducationalOrganization",
      name: FULL_NAME,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Japan",
    },
    audience: [
      { "@type": "EducationalAudience", educationalRole: "student" },
      { "@type": "Audience", audienceType: "保護者" },
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

/**
 * ContactPage schema for /contact. ノビットスタディのお申し込み・相談の窓口。
 */
export function createContactPageJsonLd() {
  const url = new URL("/contact", siteConfig.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `${FULL_NAME} お申し込み・ご相談（開講記念パック割）`,
    url,
    inLanguage: "ja",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "EducationalOrganization",
      name: FULL_NAME,
      url: siteConfig.url,
      email: siteConfig.email,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.email,
          areaServed: "JP",
          availableLanguage: ["ja"],
          description: "お申し込み（開講記念パック割）・受講相談・教材に関するお問い合わせ",
        },
      ],
    },
  };
}
