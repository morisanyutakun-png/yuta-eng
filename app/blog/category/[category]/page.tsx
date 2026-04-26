import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { getAllCategories, getPostsByCategory } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
  createItemListJsonLd,
} from "@/lib/structured-data";
import { siteConfig } from "@/data/site";

type Params = { category: string };

const categoryTitle: Record<string, { jp: string; lead: string; keywords: string[] }> = {
  Physics: {
    jp: "高校物理",
    lead: "力学・電磁気・波動・熱・原子の解説と公式導出。物理を理解で解くための深掘り記事。",
    keywords: ["高校物理 ブログ", "物理 解説 公式導出", "物理 受験対策"],
  },
  Materials: {
    jp: "教材作成・AI",
    lead: "AI × LaTeX で教材を作るワークフロー、生成 AI による問題作成、教材設計の実践ノート。",
    keywords: ["教材作成 AI", "AI 教材作成", "問題プリント 自動生成"],
  },
  LaTeX: {
    jp: "LaTeX・組版",
    lead: "LaTeX で物理・数学の数式を綺麗に書くためのチートシート、Overleaf 使い方、Web 展開ワークフロー。",
    keywords: ["LaTeX 教材作成", "LaTeX 数式 物理", "Overleaf 使い方"],
  },
  Education: {
    jp: "EdTech・学習設計",
    lead: "GIGA スクール構想以降の学習支援アプリ設計、個別最適な学び、想起練習などの学習科学。",
    keywords: ["EdTech ブログ", "GIGAスクール 後", "個別最適な学び", "学習科学"],
  },
};

export function generateStaticParams() {
  return getAllCategories().map(({ category }) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  if (posts.length === 0) return {};
  const meta = categoryTitle[category];
  const jp = meta?.jp ?? category;

  return createPageMetadata({
    title: `${jp}（${category}）カテゴリの記事一覧｜Solvora ブログ`,
    description: `${jp} に関する Solvora ブログの記事 ${posts.length} 本を一覧表示。${meta?.lead ?? ""}`,
    keywords: [
      `${category} カテゴリ`,
      `${jp} ブログ`,
      `${jp} 解説`,
      ...(meta?.keywords ?? []),
    ],
    path: `/blog/category/${category}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  if (posts.length === 0) notFound();

  const meta = categoryTitle[category];
  const jp = meta?.jp ?? category;
  const lead = meta?.lead ?? "";
  const allCategories = getAllCategories().filter((c) => c.category !== category);

  const path = `/blog/category/${category}`;
  const jsonLd = [
    createBreadcrumbJsonLd([
      { name: "ホーム", path: "/" },
      { name: "ブログ", path: "/blog" },
      { name: `カテゴリ：${jp}`, path },
    ]),
    createCollectionPageJsonLd({
      name: `${jp}（${category}）カテゴリの記事一覧 - Solvora`,
      description: lead || `${jp} に関する記事 ${posts.length} 本のまとめ。`,
      path,
      itemCount: posts.length,
    }),
    createItemListJsonLd(
      `${category} category posts`,
      posts.map((post) => ({
        name: post.title,
        description: post.description,
        url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
      })),
    ),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#eef4ff] via-white to-transparent"
        />
        <Container className="relative px-4 sm:px-6">
          <nav
            aria-label="パンくずリスト"
            className="pt-4 text-[0.72rem] text-[#94a3b8] sm:pt-10 sm:text-[0.78rem]"
          >
            <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <li>
                <Link className="transition hover:text-[#1d4ed8]" href="/">
                  ホーム
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li>
                <Link className="transition hover:text-[#1d4ed8]" href="/blog">
                  ブログ
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="truncate text-[#475569]">カテゴリ：{jp}</li>
            </ol>
          </nav>

          <div className="py-10 sm:py-14 lg:py-16">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.78rem]">
              Category · {category} · {posts.length} {posts.length === 1 ? "post" : "posts"}
            </p>
            <h1 className="mt-3 text-balance text-[clamp(1.8rem,1.3rem+2.2vw,2.7rem)] font-extrabold leading-[1.2] tracking-[-0.012em] text-[#0b1d4a]">
              <span className="bg-gradient-to-r from-[#0b1d4a] via-[#1d4ed8] to-[#0ea5e9] bg-clip-text text-transparent">
                {jp}
              </span>{" "}
              カテゴリの記事
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.05rem]">
              {lead}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#f8fafc]">
        <Container className="px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <li key={post.slug} className="h-full">
                <ArticleCard post={post} preload={idx === 0} />
              </li>
            ))}
          </ul>

          {allCategories.length > 0 ? (
            <div className="mt-14 rounded-[20px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.08)] sm:p-8">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#1d4ed8]">
                Other categories
              </p>
              <h2 className="mt-2 text-[1.2rem] font-extrabold tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.4rem]">
                他のカテゴリも読む
              </h2>
              <ul className="mt-5 flex flex-wrap gap-3">
                {allCategories.map(({ category: c, count }) => (
                  <li key={c}>
                    <Link
                      href={`/blog/category/${c}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#f1f5f9] px-4 py-2 text-[0.86rem] font-semibold text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.08)] transition hover:bg-[#dbeafe] hover:text-[#1d4ed8]"
                    >
                      {categoryTitle[c]?.jp ?? c}
                      <span className="text-[0.74rem] font-medium text-[#94a3b8]">
                        {count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[#0b1d4a] bg-white px-6 py-3 text-[0.92rem] font-semibold text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
            >
              すべての記事を見る <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
