import type { Metadata } from "next";
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

const categoryStyles: Record<string, { bg: string; text: string; ring: string }> = {
  Physics: {
    bg: "bg-sky-50",
    text: "text-sky-800",
    ring: "ring-sky-200",
  },
  Materials: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    ring: "ring-amber-200",
  },
  LaTeX: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    ring: "ring-amber-200",
  },
  Education: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    ring: "ring-emerald-200",
  },
};

const defaultCategoryStyle = {
  bg: "bg-slate-100",
  text: "text-slate-700",
  ring: "ring-slate-200",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <Container className="px-4 sm:px-6">
      <header className="mx-auto mt-6 max-w-3xl text-center sm:mt-10">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
          Lumora Blog
        </p>
        <h1 className="mt-3 text-balance font-serif text-[1.85rem] font-bold leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[2.4rem] sm:leading-[1.32]">
          高校物理と教材作成を、図と表でわかりやすく。
        </h1>
        <p className="mt-4 text-pretty text-[0.95rem] leading-[1.95] text-slate-600 sm:text-base sm:leading-[2]">
          公式の暗記で止まらないための物理の読み方、AIで教材を作るときのコツ、学習支援アプリの考え方を、検索でたどり着いた1記事ですぐ使える形にまとめています。
        </p>
      </header>

      <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-1.5 sm:mt-8">
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-slate-500">
          カテゴリ
        </span>
        {categories.map((category) => {
          const style = categoryStyles[category] ?? defaultCategoryStyle;
          return (
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${style.bg} ${style.text} ${style.ring}`}
              key={category}
            >
              {category}
            </span>
          );
        })}
      </div>

      <section className="mx-auto mt-8 max-w-3xl pb-16 sm:mt-10 sm:pb-24">
        {posts.length > 0 ? (
          <ul className="grid gap-4 sm:gap-5">
            {posts.map((post) => {
              const style = categoryStyles[post.category] ?? defaultCategoryStyle;
              return (
                <li key={post.slug}>
                  <Link
                    className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_45px_-40px_rgba(15,23,42,0.5)] transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_22px_60px_-44px_rgba(14,165,233,0.5)] sm:rounded-[1.4rem] sm:p-6"
                    href={`/blog/${post.slug}`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] ring-1 ring-inset ${style.bg} ${style.text} ${style.ring}`}
                      >
                        {post.category}
                      </span>
                      <time className="text-slate-500" dateTime={post.date}>
                        {post.formattedDate}
                      </time>
                      <span className="text-slate-400">·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="mt-3 text-[1.1rem] font-bold leading-[1.55] tracking-[-0.01em] text-slate-950 transition group-hover:text-sky-800 sm:text-[1.3rem] sm:leading-[1.5]">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-[0.92rem] leading-[1.85] text-slate-600 sm:text-[0.95rem]">
                      {post.description}
                    </p>
                    {post.keyPoints && post.keyPoints.length > 0 ? (
                      <div className="mt-4 rounded-xl bg-slate-50 px-3.5 py-3">
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                          記事のポイント
                        </p>
                        <ul className="mt-1.5 grid gap-1">
                          {post.keyPoints.slice(0, 2).map((point) => (
                            <li
                              className="flex gap-1.5 text-[0.84rem] leading-[1.7] text-slate-700"
                              key={point}
                            >
                              <span aria-hidden="true" className="text-amber-500">
                                ●
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <p className="mt-4 inline-flex items-center gap-1 text-[0.85rem] font-bold text-sky-800">
                      続きを読む <span aria-hidden="true">→</span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600">
            まだ公開記事はありません。
          </div>
        )}
      </section>
    </Container>
  );
}
