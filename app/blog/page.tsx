import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { Container } from "@/components/container";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "高校物理 解説ブログと教材作成AIの実践ノート - Solvora",
  description:
    "高校物理を公式暗記から理解で解くための解説、AI × LaTeX で教材を作るワークフロー、学習支援アプリの設計まで、図と表でわかりやすく整理した実用ブログ。受験生・教員・教材制作者のための長期記事を継続更新中。",
  keywords: [
    "高校物理 ブログ",
    "高校物理 わかりやすい",
    "物理 解説",
    "教材作成 AI",
    "LaTeX 教材作成",
    "学習支援 Webアプリ",
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
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Blog · Solvora
            </p>
            <h1 className="mt-4 text-balance text-[2rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.18] lg:text-[3.2rem]">
              高校物理と教材作成の、
              <br className="hidden sm:block" />
              実践ノート。
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
              公式暗記で止まらないための物理の読み方、AI と LaTeX で教材を作るコツ、学習アプリの設計思想を、1 記事ですぐ使える形にまとめています。
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
