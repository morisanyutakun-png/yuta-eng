import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site";
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
} from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
  createItemListJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "理系教育・EdTech・AI教材作成の実践ノート｜Solvora ブログ",
  description:
    "Solvora ブログは、理系人材育成のための EdTech・教育DX・AI 教材作成の実践ノート。高校物理を理解で解く読み方、AI × LaTeX による教材作成ワークフロー、GIGA スクール構想以降の学習支援アプリ設計まで、教員・教材制作者・受験生・社会人に向けて長期記事を継続更新しています。",
  keywords: [
    "理系人材育成 ブログ",
    "EdTech ブログ",
    "GIGAスクール 後",
    "教育DX",
    "AI 教材作成",
    "教材作成 AI",
    "LaTeX 教材作成",
    "学習支援 アプリ",
    "高校物理 ブログ",
    "STEM教育",
  ],
  path: "/blog",
});

const categoryAccent: Record<string, string> = {
  Physics: "#1d4ed8",
  Materials: "#0369a1",
  LaTeX: "#0284c7",
  Education: "#0d9488",
};

const categoryJpName: Record<string, string> = {
  Physics: "高校物理",
  Materials: "教材作成・AI",
  LaTeX: "LaTeX・組版",
  Education: "EdTech・学習設計",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featuredPost, ...restPosts] = posts;
  const allCategories = getAllCategories();
  const popularTags = getAllTags().slice(0, 12);

  const jsonLd = [
    createBreadcrumbJsonLd([
      { name: "ホーム", path: "/" },
      { name: "ブログ", path: "/blog" },
    ]),
    createCollectionPageJsonLd({
      name: "Solvora ブログ｜理系教育・EdTech・AI教材作成の実装ノート",
      description:
        "理系人材育成 EdTech ハブ Solvora が運営するブログのコレクションページ。",
      path: "/blog",
      itemCount: posts.length,
    }),
    createItemListJsonLd(
      "Solvora ブログ記事一覧",
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

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <Container className="px-4 sm:px-6">
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
              <li className="text-[#475569]">ブログ</li>
            </ol>
          </nav>

          <div className="py-12 sm:py-20 lg:py-24">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.78rem]">
              Insights · 理系人材育成 EdTech
            </p>
            <h1 className="mt-4 text-balance text-[2rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.18] lg:text-[3.2rem]">
              理系教育と EdTech の、
              <br className="hidden sm:block" />
              実装ノート。
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
              高校物理を理解で解く読み方、AI × LaTeX で教材を作るワークフロー、GIGA スクール構想後の学習支援アプリ設計、学習科学のエビデンス。理系人材育成の現場で使える形に、1 記事ずつまとめています。
            </p>

            {/* Category nav — links to each category landing page */}
            <div className="mt-10">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
                Browse by category
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                {allCategories.map(({ category, count }) => {
                  const accent = categoryAccent[category] ?? "#1d4ed8";
                  return (
                    <li key={category}>
                      <Link
                        href={`/blog/category/${category}`}
                        className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-[0.84rem] font-semibold ring-1 ring-[rgba(15,29,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgba(15,29,74,0.45)] sm:text-[0.88rem]"
                        style={{ color: accent, borderColor: `${accent}33` }}
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: accent }}
                        />
                        {categoryJpName[category] ?? category}
                        <span className="text-[0.74rem] font-medium text-[#94a3b8]">
                          {count}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Popular tag cloud — links to each tag landing page */}
            {popularTags.length > 0 ? (
              <div className="mt-8">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
                  Popular tags · ロングテールで深掘る
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {popularTags.map(({ tag, count }) => (
                    <li key={tag}>
                      <Link
                        href={`/blog/tag/${encodeURIComponent(tag)}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[0.74rem] font-medium text-[#475569] ring-1 ring-[rgba(15,29,74,0.06)] transition hover:bg-[#dbeafe] hover:text-[#1d4ed8] sm:text-[0.78rem]"
                      >
                        #{tag}
                        {count > 1 ? (
                          <span className="text-[0.66rem] font-semibold text-[#94a3b8]">
                            {count}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* FEATURED */}
      {featuredPost ? (
        <section className="bg-[#f8fafc]">
          <Container className="px-4 py-12 sm:px-6 sm:py-20">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.74rem]">
                  Featured
                </p>
                <h2 className="mt-2 text-[clamp(1.4rem,1rem+2vw,2.2rem)] font-extrabold leading-[1.32] tracking-[-0.005em] text-[#0b1d4a] sm:mt-3">
                  最新の記事
                </h2>
              </div>
            </div>
            <div className="mt-8 sm:mt-10">
              <ArticleCard post={featuredPost} variant="featured" preload />
            </div>
          </Container>
        </section>
      ) : null}

      {/* ALL ARTICLES */}
      <section className="bg-white">
        <Container className="px-4 py-14 sm:px-6 sm:py-24 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.74rem]">
                All Articles
              </p>
              <h2 className="mt-2 text-[clamp(1.4rem,1rem+2vw,2.2rem)] font-extrabold leading-[1.32] tracking-[-0.005em] text-[#0b1d4a] sm:mt-3">
                すべての記事
              </h2>
            </div>
            <p className="text-[0.9rem] text-[#475569]">{posts.length} 本公開中</p>
          </div>

          {restPosts.length > 0 ? (
            <ul className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {restPosts.map((post) => (
                <li key={post.slug} className="h-full">
                  <ArticleCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 rounded-[22px] bg-[#f8fafc] p-8 text-center text-[#475569] ring-1 ring-[rgba(15,29,74,0.06)]">
              まだ公開記事はありません。
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
