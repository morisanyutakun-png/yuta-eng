import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
  createItemListJsonLd,
} from "@/lib/structured-data";
import { siteConfig } from "@/data/site";

type Params = { tag: string };

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) return {};

  return createPageMetadata({
    title: `${tag} の記事一覧｜Solvora ブログ`,
    description: `${tag} に関する解説記事を Solvora ブログから一覧表示。理系人材育成 EdTech ハブ Solvora が、${tag} に関連する高校物理・教材作成・学習設計の実装ノートを${posts.length}本提供しています。`,
    keywords: [tag, `${tag} 解説`, `${tag} まとめ`, "Solvora ブログ"],
    path: `/blog/tag/${encodeURIComponent(tag)}`,
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  const allTags = getAllTags();
  const otherTags = allTags.filter((t) => t.tag !== tag).slice(0, 12);

  const path = `/blog/tag/${encodeURIComponent(tag)}`;
  const jsonLd = [
    createBreadcrumbJsonLd([
      { name: "ホーム", path: "/" },
      { name: "ブログ", path: "/blog" },
      { name: tag, path },
    ]),
    createCollectionPageJsonLd({
      name: `${tag} の記事一覧 - Solvora`,
      description: `${tag} に関する記事 ${posts.length} 本のまとめ。`,
      path,
      itemCount: posts.length,
    }),
    createItemListJsonLd(
      `${tag} の記事`,
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
              <li className="truncate text-[#475569]">タグ：{tag}</li>
            </ol>
          </nav>

          <div className="py-10 sm:py-14 lg:py-16">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.78rem]">
              Tag · {posts.length} {posts.length === 1 ? "post" : "posts"}
            </p>
            <h1 className="mt-3 text-balance text-[clamp(1.7rem,1.2rem+2vw,2.5rem)] font-extrabold leading-[1.22] tracking-[-0.012em] text-[#0b1d4a]">
              <span className="bg-gradient-to-r from-[#0b1d4a] via-[#1d4ed8] to-[#0ea5e9] bg-clip-text text-transparent">
                #{tag}
              </span>{" "}
              の記事一覧
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.05rem]">
              <strong className="font-bold text-[#0b1d4a]">{tag}</strong> に関連する Solvora ブログの記事を集めました。理系人材育成 EdTech ハブとしての視点で、深掘り解説をお届けします。
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

          {otherTags.length > 0 ? (
            <div className="mt-14 rounded-[20px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.08)] sm:p-8">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#1d4ed8]">
                Explore other tags
              </p>
              <h2 className="mt-2 text-[1.2rem] font-extrabold tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.4rem]">
                関連タグから探す
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {otherTags.map(({ tag: t, count }) => (
                  <li key={t}>
                    <Link
                      href={`/blog/tag/${encodeURIComponent(t)}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#f1f5f9] px-3 py-1.5 text-[0.78rem] font-semibold text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.08)] transition hover:bg-[#dbeafe] hover:text-[#1d4ed8]"
                    >
                      #{t}
                      <span className="text-[0.7rem] font-medium text-[#94a3b8]">
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
