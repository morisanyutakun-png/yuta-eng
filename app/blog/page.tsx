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
    bg: "bg-[#eef2fb]",
    text: "text-[#1f3a6b]",
    ring: "ring-[#c8d2e8]",
  },
  Materials: {
    bg: "bg-[#fbf3df]",
    text: "text-[#6b4a09]",
    ring: "ring-[#e8d5a8]",
  },
  LaTeX: {
    bg: "bg-[#fbf3df]",
    text: "text-[#6b4a09]",
    ring: "ring-[#e8d5a8]",
  },
  Education: {
    bg: "bg-[#eef4eb]",
    text: "text-[#2f4d18]",
    ring: "ring-[#c8d8be]",
  },
};

const defaultCategoryStyle = {
  bg: "bg-[#f5f1e8]",
  text: "text-[#4a4a4a]",
  ring: "ring-[#d8cfb8]",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <Container className="px-4 sm:px-6">
      <header className="mx-auto mt-8 max-w-3xl text-center sm:mt-14">
        <p className="lumora-kicker">LUMORA · BLOG</p>
        <h1 className="lumora-display mt-5 text-balance text-[1.7rem] leading-[1.55] sm:text-[2.4rem] sm:leading-[1.45]">
          高校物理と教材作成を、<br className="hidden sm:block" />
          <span className="lumora-marker">図と表でわかりやすく</span>。
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty font-serif text-[0.95rem] leading-[2.1] text-[var(--ink-soft)] sm:text-[1rem]">
          公式の暗記で止まらないための物理の読み方、AIで教材を作るときのコツ、学習支援アプリの考え方を、検索でたどり着いた1記事ですぐ使える形にまとめています。
        </p>
        <div className="lumora-rule" />
      </header>

      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-1.5">
        <span className="font-serif text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
          カテゴリ
        </span>
        {categories.map((category) => {
          const style = categoryStyles[category] ?? defaultCategoryStyle;
          return (
            <span
              className={`inline-flex items-center rounded-sm px-3 py-1 font-serif text-xs font-bold tracking-[0.08em] ring-1 ring-inset ${style.bg} ${style.text} ${style.ring}`}
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
                    className="group block bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-40px_rgba(15,23,42,0.4)] sm:p-7"
                    href={`/blog/${post.slug}`}
                    style={{
                      border: "1px solid var(--line)",
                      borderTop: "3px solid var(--accent-deep)",
                      borderRadius: "4px",
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-2 font-serif text-[0.74rem] font-bold tracking-[0.16em] text-[var(--ink-soft)]">
                      <span
                        className={`inline-flex items-center rounded-sm px-2.5 py-1 ring-1 ring-inset ${style.bg} ${style.text} ${style.ring}`}
                      >
                        {post.category}
                      </span>
                      <time className="text-[var(--ink-soft)]" dateTime={post.date}>
                        {post.formattedDate}
                      </time>
                      <span className="text-[var(--ink-soft)] opacity-50">·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="mt-4 font-serif text-[1.1rem] font-bold leading-[1.65] text-[var(--ink)] transition group-hover:text-[var(--accent-deep)] sm:text-[1.3rem]">
                      {post.title}
                    </h2>
                    <p className="mt-3 border-t border-dotted border-[var(--line)] pt-3 text-[0.92rem] leading-[2.05] text-[var(--ink-soft)] sm:text-[0.95rem]">
                      {post.description}
                    </p>
                    {post.keyPoints && post.keyPoints.length > 0 ? (
                      <div
                        className="mt-4 px-4 py-3"
                        style={{
                          background: "#faf6ec",
                          border: "1px solid var(--line)",
                          borderRadius: "3px",
                        }}
                      >
                        <p className="font-serif text-[0.72rem] font-bold tracking-[0.18em] text-[var(--accent-deep)]">
                          記事のポイント
                        </p>
                        <ul className="mt-2 grid gap-1.5">
                          {post.keyPoints.slice(0, 2).map((point) => (
                            <li
                              className="flex gap-2 text-[0.85rem] leading-[1.85] text-[var(--ink)]"
                              key={point}
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.55em] h-[0.4em] w-[0.4em] shrink-0 rotate-45 bg-[var(--accent-warm)]"
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <p className="mt-5 inline-flex items-center gap-1 font-serif text-[0.86rem] font-bold tracking-[0.06em] text-[var(--accent-deep)]">
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
