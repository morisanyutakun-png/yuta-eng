import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { ArticleCard } from "@/components/article-card";
import { ButtonLink } from "@/components/button-link";
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

  return createPageMetadata({
    title: post.title,
    description: post.description,
    keywords: [post.category, ...post.tags],
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);

  return (
    <Container className="px-4 sm:px-6">
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

      <nav
        aria-label="パンくずリスト"
        className="mx-auto mt-5 max-w-3xl text-xs leading-5 text-slate-500 sm:mt-6"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link className="hover:text-sky-700" href="/">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link className="hover:text-sky-700" href="/blog">
              ブログ
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="truncate text-slate-700">{post.category}</li>
        </ol>
      </nav>

      <article className="mx-auto max-w-3xl pb-8 pt-4 sm:pt-6 lg:pt-8">
        <header
          className="bg-white p-5 sm:p-8"
          style={{
            border: "1px solid var(--line)",
            borderTop: "4px solid var(--accent-deep)",
            borderRadius: "4px",
            boxShadow: "0 18px 50px -44px rgba(15, 23, 42, 0.4)",
          }}
        >
          <div className="flex flex-wrap items-center gap-2.5 font-serif text-[0.74rem] font-bold tracking-[0.16em] text-[var(--ink-soft)]">
            <span className="rounded-sm bg-[#eef2fb] px-2.5 py-1 text-[var(--accent-deep)]">
              {post.category}
            </span>
            <time className="text-[var(--ink-soft)]" dateTime={post.date}>
              {post.formattedDate} 公開
            </time>
            <span className="text-[var(--ink-soft)] opacity-50">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="lumora-display mt-5 text-balance text-[1.55rem] leading-[1.55] sm:mt-6 sm:text-[2rem] sm:leading-[1.5] lg:text-[2.3rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-pretty font-serif text-[0.96rem] leading-[2.1] text-[var(--ink-soft)] sm:text-[1.02rem]">
            {post.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-dotted border-[var(--line)] pt-4">
            {post.tags.map((tag) => (
              <span
                className="rounded-sm border border-[var(--line)] bg-[#faf6ec] px-2.5 py-1 font-serif text-[0.72rem] font-medium text-[var(--ink-soft)]"
                key={tag}
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {post.searchIntent ? (
          <div
            className="mt-5 p-5"
            style={{
              border: "1px solid var(--line)",
              borderLeft: "4px solid var(--accent-warm)",
              background: "#fbf6e8",
              borderRadius: "3px",
            }}
          >
            <p className="font-serif text-[0.78rem] font-bold tracking-[0.18em] text-[var(--accent-warm)]">
              この記事はこんな方へ
            </p>
            <p className="mt-2 font-serif text-[0.94rem] leading-[2.05] text-[#3a2c0a]">
              {post.searchIntent}
            </p>
          </div>
        ) : null}

        {post.keyPoints && post.keyPoints.length > 0 ? (
          <section
            className="mt-5 p-5"
            style={{
              border: "1px solid var(--line)",
              borderTop: "3px solid var(--accent-deep)",
              background: "#fbf9f4",
              borderRadius: "3px",
            }}
          >
            <p className="flex items-center gap-2 font-serif text-[0.92rem] font-bold tracking-[0.16em] text-[var(--accent-deep)]">
              <span
                aria-hidden="true"
                className="h-[1.2rem] w-[0.9rem]"
                style={{
                  background:
                    "linear-gradient(180deg, var(--accent-deep) 60%, var(--accent-warm) 60%)",
                }}
              />
              この記事でわかること
            </p>
            <ul className="mt-4 grid gap-3">
              {post.keyPoints.map((point) => (
                <li
                  className="flex gap-2.5 text-[0.93rem] leading-[1.95] text-[var(--ink)]"
                  key={point}
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.18rem] grid h-[1.25rem] w-[1.25rem] shrink-0 place-items-center rounded-sm bg-[var(--accent-deep)] text-[0.7rem] font-bold text-white"
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
          <aside
            className="mt-5 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            style={{
              background:
                "radial-gradient(circle at 95% 10%, rgba(200,146,17,0.18), transparent 45%), linear-gradient(135deg, #0f1c3a 0%, #1f3a6b 100%)",
              border: "1px solid #1a2a4d",
              borderRadius: "4px",
            }}
          >
            <div>
              <p className="inline-flex items-center gap-1.5 font-serif text-[0.7rem] font-bold tracking-[0.22em] text-[#f5d68a]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)]" />
                LUMORA × 物理の森｜物理専門塾事業
              </p>
              <p className="mt-2 font-serif text-[1.02rem] font-bold leading-[1.6] text-white sm:text-[1.1rem]">
                高校物理の受講相談は、Lumora が運営する「物理の森」から。
              </p>
            </div>
            <a
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-[var(--accent-warm)] px-5 py-3 font-serif text-[0.9rem] font-bold tracking-[0.06em] text-[#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[#dca424]"
              href={siteConfig.physicsSchoolUrl}
              rel="noreferrer noopener"
              target="_blank"
            >
              物理の森（物理塾）を開く
              <span aria-hidden="true">↗</span>
            </a>
          </aside>
        ) : null}

        <div className="article-content mt-7 sm:mt-8">
          <MDXRemote
            components={mdxComponents}
            options={{ mdxOptions: { useDynamicImport: false }, blockJS: false }}
            source={post.content}
          />
        </div>

        <aside
          className="mt-10 bg-white p-5 sm:p-7"
          style={{
            border: "1px solid var(--line)",
            borderLeft: "4px solid var(--accent-deep)",
            borderRadius: "3px",
          }}
        >
          <p className="lumora-eyebrow">NEXT STEP · 学習ハブの動線</p>
          <p className="lumora-display mt-3 text-[1.1rem] leading-[1.6] sm:text-[1.22rem]">
            読んだあとの行き先を、Lumora から選べます。
          </p>
          <p className="mt-3 text-[0.92rem] leading-[2] text-[var(--ink-soft)]">
            Lumora（学習ハブ）から、物理専門塾「物理の森」、教材作成アプリ Eddivom、IT 学習アプリ IT Pass へ直接遷移できます。
          </p>
          <div className="mt-5 grid gap-2.5 sm:flex sm:flex-wrap">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[var(--accent-deep)] px-6 py-3 font-serif text-[0.92rem] font-bold tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:bg-[#16305c]"
              href={siteConfig.physicsSchoolUrl}
              rel="noreferrer noopener"
              target="_blank"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)]" />
              物理の森（物理塾）を開く
              <span aria-hidden="true" className="text-[#f5d68a]">↗</span>
            </a>
            <ButtonLink className="w-full sm:w-auto" href="/apps" variant="secondary">
              事業一覧
            </ButtonLink>
            <ButtonLink className="w-full sm:w-auto" href="/blog" variant="ghost">
              ブログ一覧へ
            </ButtonLink>
          </div>
        </aside>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="mx-auto max-w-5xl pb-20 sm:pb-24">
          <div className="mb-6 text-center sm:text-left">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
              Related Articles
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-[-0.02em] text-slate-950 sm:text-2xl">
              関連記事
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <ArticleCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
