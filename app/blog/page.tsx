import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "ブログ｜高校物理・教材作成AI・学習アプリの読み物",
  description:
    "Lumora のブログでは、高校物理を理解で乗り越える方法、AIとLaTeXで教材を作るコツ、学習支援Webアプリの考え方を、図と表でわかりやすく整理しています。",
  keywords: [
    "高校物理 ブログ",
    "物理 わかりやすい",
    "教材作成AI",
    "LaTeX 教材作成",
    "学習支援Webアプリ",
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
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              LUMORA · BLOG
            </p>
            <h1 className="mt-4 text-balance text-[2.2rem] font-extrabold leading-[1.2] tracking-[-0.01em] text-[#0b1d4a] sm:text-[3rem] sm:leading-[1.1] lg:text-[3.4rem]">
              高校物理と教材作成を、
              <br className="hidden sm:block" />
              図と表でわかりやすく。
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
              公式の暗記で止まらないための物理の読み方、AIで教材を作るときのコツ、学習支援アプリの考え方を、検索でたどり着いた1記事ですぐ使える形にまとめています。
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
          <Container className="px-6 py-16 sm:py-20">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                  Featured
                </p>
                <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
                  最新の記事
                </h2>
              </div>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group mt-10 grid overflow-hidden rounded-[28px] bg-white ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_40px_80px_-50px_rgba(15,29,74,0.35)] transition hover:-translate-y-1 hover:shadow-[0_44px_90px_-50px_rgba(15,29,74,0.45)] lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="relative aspect-[1200/630] overflow-hidden bg-[#f1f5f9] lg:aspect-auto">
                <Image
                  src={`/blog/${featuredPost.slug}/opengraph-image`}
                  alt={featuredPost.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  priority
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-between gap-6 p-8 sm:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em]">
                    <span style={{ color: categoryAccent[featuredPost.category] ?? "#1d4ed8" }}>
                      {featuredPost.category}
                    </span>
                    <time className="text-[#94a3b8]" dateTime={featuredPost.date}>
                      {featuredPost.formattedDate}
                    </time>
                    <span className="text-[#cbd5e1]">·</span>
                    <span className="text-[#94a3b8]">{featuredPost.readingTime}</span>
                  </div>
                  <h3 className="mt-5 text-balance text-[1.4rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] transition group-hover:text-[#1d4ed8] sm:text-[1.7rem] sm:leading-[1.35]">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-[1.95] text-[#475569] sm:text-[1rem]">
                    {featuredPost.description}
                  </p>
                </div>
                <span className="inline-flex items-center text-[0.95rem] font-semibold text-[#1d4ed8] transition group-hover:text-[#0b1d4a]">
                  続きを読む <span aria-hidden="true" className="ml-1.5">→</span>
                </span>
              </div>
            </Link>
          </Container>
        </section>
      ) : null}

      {/* ALL ARTICLES */}
      <section className="bg-white">
        <Container className="px-6 py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                All Articles
              </p>
              <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
                すべての記事
              </h2>
            </div>
            <p className="text-[0.9rem] text-[#475569]">{posts.length} 本公開中</p>
          </div>

          {restPosts.length > 0 ? (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white ring-1 ring-[rgba(15,29,74,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(15,29,74,0.4)]"
                  >
                    <div className="relative aspect-[1200/630] overflow-hidden bg-[#f1f5f9]">
                      <Image
                        src={`/blog/${post.slug}/opengraph-image`}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div className="flex items-center gap-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em]">
                        <span style={{ color: categoryAccent[post.category] ?? "#1d4ed8" }}>
                          {post.category}
                        </span>
                        <time className="text-[#94a3b8]" dateTime={post.date}>
                          {post.formattedDate}
                        </time>
                      </div>
                      <h3 className="text-[1.05rem] font-bold leading-[1.55] text-[#0b1d4a] transition group-hover:text-[#1d4ed8]">
                        {post.title}
                      </h3>
                      <p className="line-clamp-3 text-[0.88rem] leading-[1.85] text-[#475569]">
                        {post.description}
                      </p>
                      <span className="mt-auto pt-3 text-[0.85rem] font-semibold text-[#1d4ed8] opacity-0 transition group-hover:opacity-100">
                        続きを読む →
                      </span>
                    </div>
                  </Link>
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
