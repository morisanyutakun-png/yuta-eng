import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx-components";
import { siteConfig } from "@/data/site";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import { createArticleJsonLd, createBreadcrumbJsonLd } from "@/lib/structured-data";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: "記事が見つかりません",
      description: "指定された記事は見つかりませんでした。",
      path: `/blog/${slug}`,
    });
  }

  const base = createPageMetadata({
    title: post.title,
    description: post.description,
    keywords: [post.category, ...post.tags],
    path: `/blog/${post.slug}`,
    type: "article",
  });

  const ogImageUrl = `/blog/${post.slug}/opengraph-image`;

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      ...base.twitter,
      card: "summary_large_image",
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);

  const categoryAccent: Record<string, string> = {
    Physics: "#1d4ed8",
    Materials: "#0369a1",
    LaTeX: "#0284c7",
    Education: "#0d9488",
  };
  const accent = categoryAccent[post.category] ?? "#1d4ed8";

  return (
    <>
      <JsonLd
        data={[
          createArticleJsonLd(post),
          createBreadcrumbJsonLd([
            { name: "ホーム", path: "/" },
            { name: "ブログ", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* HERO */}
      <section className="relative bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#eef4ff] via-white to-transparent"
        />
        <Container className="relative px-4 sm:px-6">
          <nav aria-label="パンくずリスト" className="pt-6 text-[0.74rem] text-[#94a3b8] sm:pt-10 sm:text-[0.78rem]">
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
              <li className="truncate text-[#475569]">{post.category}</li>
            </ol>
          </nav>

          <div className="mx-auto max-w-4xl py-7 sm:py-12 lg:py-14">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] sm:text-[0.74rem] sm:tracking-[0.18em]">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-white"
                style={{ background: accent }}
              >
                {post.category}
              </span>
              <time className="text-[#64748b]" dateTime={post.date}>
                {post.formattedDate}
              </time>
              <span className="text-[#cbd5e1]">·</span>
              <span className="text-[#64748b]">{post.readingTime}</span>
            </div>
            <h1 className="mt-4 text-balance text-[clamp(1.55rem,1.05rem+2.5vw,2.6rem)] font-extrabold leading-[1.28] tracking-[-0.012em] text-[#0b1d4a]">
              {post.title}
            </h1>
            <p className="mt-5 text-pretty text-[clamp(0.95rem,0.9rem+0.4vw,1.06rem)] leading-[1.9] text-[#475569]">
              {post.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[0.72rem] font-medium text-[#475569] ring-1 ring-[rgba(15,29,74,0.06)] sm:text-[0.74rem]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Hero thumbnail */}
            <div className="relative mt-7 aspect-[1200/630] w-full overflow-hidden rounded-[18px] bg-[#f1f5f9] ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_24px_50px_-36px_rgba(15,29,74,0.35)] sm:mt-10 sm:rounded-[28px] sm:shadow-[0_40px_80px_-50px_rgba(15,29,74,0.35)]">
              <Image
                src={`/blog/${post.slug}/opengraph-image`}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
                preload
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ARTICLE BODY */}
      <section className="bg-[#f8fafc]">
        <Container className="px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <article className="mx-auto max-w-3xl">
            {post.searchIntent ? (
              <div
                className="rounded-[22px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)] sm:p-7"
                style={{ borderLeft: `4px solid ${accent}` }}
              >
                <p
                  className="text-[0.74rem] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  この記事はこんな方へ
                </p>
                <p className="mt-3 text-[0.95rem] leading-[1.95] text-[#334155]">
                  {post.searchIntent}
                </p>
              </div>
            ) : null}

            {post.keyPoints && post.keyPoints.length > 0 ? (
              <section className="mt-6 rounded-[22px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)] sm:p-8">
                <p
                  className="text-[0.74rem] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  この記事でわかること
                </p>
                <ul className="mt-5 grid gap-3.5">
                  {post.keyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[0.94rem] leading-[1.85] text-[#0b1d4a]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.35em] grid h-[1.1rem] w-[1.1rem] shrink-0 place-items-center rounded-full text-[0.65rem] font-bold text-white"
                        style={{ background: accent }}
                      >
                        ✓
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {post.category === "Physics" ? (
              <aside className="mt-6 flex flex-col gap-4 overflow-hidden rounded-[22px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
                style={{
                  background:
                    "radial-gradient(circle at 95% 10%, rgba(56,189,248,0.22), transparent 50%), linear-gradient(135deg, #0b1d4a 0%, #1e3a8a 100%)",
                }}
              >
                <div>
                  <p className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#bae6fd]">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
                    Solvora × 物理の森｜物理専門塾
                  </p>
                  <p className="mt-3 text-[1.05rem] font-bold leading-[1.6] text-white sm:text-[1.15rem]">
                    高校物理の受講相談は、物理の森から。
                  </p>
                </div>
                <a
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.9rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:-translate-y-0.5 hover:bg-[#bae6fd]"
                  href={siteConfig.physicsSchoolUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  物理の森を開く <span aria-hidden="true">↗</span>
                </a>
              </aside>
            ) : null}

            <div className="article-content mt-10">
              <MDXRemote
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    useDynamicImport: false,
                    remarkPlugins: [remarkGfm, remarkMath],
                    rehypePlugins: [[rehypeKatex, { strict: "ignore" }]],
                  },
                  blockJS: false,
                }}
                source={post.content}
              />
            </div>

            {/* Next step CTA */}
            <aside className="mt-14 rounded-[28px] bg-white p-7 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_28px_60px_-40px_rgba(15,29,74,0.4)] sm:p-9">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                Next Step
              </p>
              <p className="mt-3 text-[1.2rem] font-extrabold leading-[1.5] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.4rem]">
                読んだあとの行き先を、Solvora から選ぶ。
              </p>
              <p className="mt-3 text-[0.92rem] leading-[1.95] text-[#475569]">
                Solvora（学習ハブ）から、物理専門塾「物理の森」、教材作成アプリ Eddivom、IT 学習アプリ IT Pass へ直接遷移できます。
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b1d4a] px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
                  href={siteConfig.physicsSchoolUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  物理の森を開く <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href="/apps"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
                >
                  事業一覧へ
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-4 text-[0.95rem] font-semibold text-[#1d4ed8] transition hover:text-[#0b1d4a]"
                >
                  ブログ一覧へ <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </aside>
          </article>
        </Container>
      </section>

      {/* RELATED */}
      {relatedPosts.length > 0 ? (
        <section className="bg-white">
          <Container className="px-6 py-20 sm:py-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                  Related Articles
                </p>
                <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
                  関連記事
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden text-[0.95rem] font-semibold text-[#1d4ed8] hover:text-[#0b1d4a] sm:inline-flex"
              >
                すべて見る <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => {
                const rAccent = categoryAccent[relatedPost.category] ?? "#1d4ed8";
                return (
                  <li key={relatedPost.slug}>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white ring-1 ring-[rgba(15,29,74,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(15,29,74,0.4)]"
                    >
                      <div className="relative aspect-[1200/630] overflow-hidden bg-[#f1f5f9]">
                        <Image
                          src={`/blog/${relatedPost.slug}/opengraph-image`}
                          alt={relatedPost.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <div className="flex items-center gap-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em]">
                          <span style={{ color: rAccent }}>{relatedPost.category}</span>
                          <time className="text-[#94a3b8]" dateTime={relatedPost.date}>
                            {relatedPost.formattedDate}
                          </time>
                        </div>
                        <h3 className="text-[1.05rem] font-bold leading-[1.55] text-[#0b1d4a] transition group-hover:text-[#1d4ed8]">
                          {relatedPost.title}
                        </h3>
                        <p className="line-clamp-3 text-[0.88rem] leading-[1.85] text-[#475569]">
                          {relatedPost.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
