import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import "katex/dist/katex.min.css";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { ArticleCard } from "@/components/article-card";
import { mdxComponents, renderWithMath } from "@/components/mdx-components";
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
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#eef4ff] via-white to-transparent sm:h-80"
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
              <li className="truncate text-[#475569]">{post.category}</li>
            </ol>
          </nav>

          <div className="mx-auto max-w-4xl pb-8 pt-5 sm:py-12 lg:py-14">
            {/* Meta row: category pill + date + reading time */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:gap-x-3 sm:text-[0.74rem] sm:tracking-[0.18em]">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-white shadow-[0_6px_14px_-8px_rgba(15,29,74,0.6)]"
                style={{ background: accent }}
              >
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/80 sm:h-1.5 sm:w-1.5" />
                {post.category}
              </span>
              <time className="text-[#64748b]" dateTime={post.date}>
                {post.formattedDate}
              </time>
              <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
              <span className="text-[#64748b]">{post.readingTime}</span>
            </div>

            {/* Title */}
            <h1 className="mt-3 text-balance text-[clamp(1.32rem,0.95rem+2.1vw,2.5rem)] font-extrabold leading-[1.55] tracking-[-0.005em] text-[#0b1d4a] sm:mt-4 sm:leading-[1.32]">
              {post.title}
            </h1>

            {/* Description in a structured panel for legibility */}
            <div className="relative mt-5 rounded-[16px] bg-[#f8fbff] p-5 ring-1 ring-[rgba(15,29,74,0.08)] sm:mt-7 sm:rounded-[20px] sm:p-5">
              <span
                aria-hidden="true"
                className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-[3px] rounded-r-full"
                style={{ background: accent }}
              />
              <p className="pl-3 text-pretty text-[clamp(0.96rem,0.92rem+0.3vw,1.05rem)] leading-[2.1] tracking-[0.02em] text-[#334155] sm:pl-4 sm:leading-[1.95]">
                {post.description}
              </p>
            </div>

            {/* Tags: horizontal scroll on small screens, wraps on tablet+ */}
            {post.tags.length > 0 ? (
              <div className="-mx-4 mt-5 sm:mx-0 sm:mt-6">
                <ul className="scrollbar-none flex gap-1.5 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:px-0 sm:pb-0">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="shrink-0 rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[0.7rem] font-medium text-[#475569] ring-1 ring-[rgba(15,29,74,0.06)] sm:text-[0.74rem]"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Hero thumbnail — served as static AVIF/WebP from /public/og/ */}
            <div className="relative mt-6 aspect-[1200/630] w-full overflow-hidden rounded-[16px] bg-[#f1f5f9] ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_18px_38px_-28px_rgba(15,29,74,0.4)] sm:mt-10 sm:rounded-[28px] sm:shadow-[0_40px_80px_-50px_rgba(15,29,74,0.35)]">
              <picture>
                <source
                  type="image/avif"
                  srcSet={`/og/${post.slug}-640.avif 640w, /og/${post.slug}-1200.avif 1200w`}
                  sizes="(min-width: 1024px) 896px, 100vw"
                />
                <source
                  type="image/webp"
                  srcSet={`/og/${post.slug}-640.webp 640w, /og/${post.slug}-1200.webp 1200w`}
                  sizes="(min-width: 1024px) 896px, 100vw"
                />
                <img
                  src={`/og/${post.slug}.png`}
                  alt={post.title}
                  width={1200}
                  height={630}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
            </div>
          </div>
        </Container>
      </section>

      {/* ARTICLE BODY */}
      <section className="bg-[#f8fafc]">
        <Container className="px-4 py-8 sm:px-6 sm:py-16 lg:py-20">
          <article className="mx-auto max-w-3xl">
            {post.searchIntent ? (
              <div
                className="rounded-[16px] bg-white p-4 ring-1 ring-[rgba(15,29,74,0.06)] sm:rounded-[22px] sm:p-7"
                style={{ borderLeft: `4px solid ${accent}` }}
              >
                <p
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] sm:text-[0.74rem] sm:tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  この記事はこんな方へ
                </p>
                <p className="mt-2 text-[clamp(0.95rem,0.9rem+0.3vw,0.98rem)] leading-[2.1] tracking-[0.02em] text-[#334155] sm:mt-3 sm:leading-[1.95]">
                  {post.searchIntent}
                </p>
              </div>
            ) : null}

            {post.keyPoints && post.keyPoints.length > 0 ? (
              <section className="mt-5 rounded-[16px] bg-white p-4 ring-1 ring-[rgba(15,29,74,0.06)] sm:mt-6 sm:rounded-[22px] sm:p-8">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold text-white"
                    style={{ background: accent }}
                  >
                    ✓
                  </span>
                  <p
                    className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] sm:text-[0.74rem] sm:tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    この記事でわかること
                  </p>
                </div>
                <ul className="mt-4 grid gap-4 sm:mt-5 sm:gap-3.5">
                  {post.keyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[clamp(0.96rem,0.92rem+0.25vw,0.98rem)] leading-[2.05] tracking-[0.02em] text-[#0b1d4a] sm:gap-3 sm:leading-[1.85]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: accent }}
                      />
                      <span>{renderWithMath(point)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {post.category === "Physics" ? (
              <aside
                className="mt-5 flex flex-col gap-3 overflow-hidden rounded-[16px] p-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-[22px] sm:p-7"
                style={{
                  background:
                    "radial-gradient(circle at 95% 10%, rgba(56,189,248,0.22), transparent 50%), linear-gradient(135deg, #0b1d4a 0%, #1e3a8a 100%)",
                }}
              >
                <div>
                  <p className="inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#bae6fd] sm:text-[0.7rem] sm:tracking-[0.22em]">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
                    Solvora × 物理の森｜物理専門塾
                  </p>
                  <p className="mt-2 text-[clamp(0.96rem,0.9rem+0.4vw,1.15rem)] font-bold leading-[1.55] text-white sm:mt-3">
                    高校物理の受講相談は、物理の森から。
                  </p>
                </div>
                <a
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-[0.86rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:-translate-y-0.5 hover:bg-[#bae6fd] sm:min-h-12 sm:px-6 sm:text-[0.9rem]"
                  href={siteConfig.physicsSchoolUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  物理の森を開く <span aria-hidden="true">↗</span>
                </a>
              </aside>
            ) : null}

            <div className="article-content mt-8 sm:mt-10">
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
            <aside className="mt-10 rounded-[18px] bg-white p-5 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_18px_42px_-32px_rgba(15,29,74,0.4)] sm:mt-14 sm:rounded-[28px] sm:p-9">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#1d4ed8] sm:text-[0.74rem] sm:tracking-[0.24em]">
                Next Step
              </p>
              <p className="mt-2 text-[clamp(1.05rem,0.95rem+0.5vw,1.4rem)] font-extrabold leading-[1.45] tracking-[-0.005em] text-[#0b1d4a] sm:mt-3 sm:leading-[1.5]">
                読んだあとの行き先を、Solvora から選ぶ。
              </p>
              <p className="mt-2 text-[clamp(0.86rem,0.83rem+0.2vw,0.94rem)] leading-[1.85] text-[#475569] sm:mt-3 sm:leading-[1.95]">
                Solvora（学習ハブ）から、物理専門塾「物理の森」、教材作成アプリ Eddivom、IT 学習アプリ IT Pass へ直接遷移できます。
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
                <a
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0b1d4a] px-6 text-[0.9rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a] sm:min-h-12 sm:px-7 sm:text-[0.95rem]"
                  href={siteConfig.physicsSchoolUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  物理の森を開く <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href="/apps"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b1d4a] px-6 text-[0.9rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white sm:min-h-12 sm:px-7 sm:text-[0.95rem]"
                >
                  事業一覧へ
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-[0.9rem] font-semibold text-[#1d4ed8] transition hover:text-[#0b1d4a] sm:min-h-12 sm:text-[0.95rem]"
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
          <Container className="px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.74rem]">
                  Related Articles
                </p>
                <h2 className="mt-2 text-[clamp(1.4rem,1rem+1.8vw,2rem)] font-extrabold leading-[1.32] tracking-[-0.005em] text-[#0b1d4a] sm:mt-3">
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
            <ul className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <li key={relatedPost.slug} className="h-full">
                  <ArticleCard post={relatedPost} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
