import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { Container } from "@/components/container";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";

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

export default function BlogPage() {
  const posts = getAllPosts();
  const [featuredPost, ...restPosts] = posts;
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <Container className="px-6">
          <div className="py-16 sm:py-20 lg:py-24">
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
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                Categories
              </span>
              {categories.map((category) => {
                const accent = categoryAccent[category] ?? "#1d4ed8";
                return (
                  <span
                    key={category}
                    className="inline-flex items-center rounded-full px-3 py-1 text-[0.78rem] font-semibold ring-1"
                    style={{ color: accent, borderColor: accent, boxShadow: `inset 0 0 0 1px ${accent}33` }}
                  >
                    {category}
                  </span>
                );
              })}
            </div>
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
