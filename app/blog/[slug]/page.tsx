import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { ArticleCard } from "@/components/article-card";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx-components";
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
        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_60px_-50px_rgba(15,23,42,0.5)] sm:rounded-[1.6rem] sm:p-7">
          <div className="flex flex-wrap items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-800">
              {post.category}
            </span>
            <time className="text-slate-500" dateTime={post.date}>
              {post.formattedDate} 公開
            </time>
            <span className="text-slate-400">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-4 text-balance font-serif text-[1.65rem] font-bold leading-[1.4] tracking-[-0.02em] text-slate-950 sm:mt-5 sm:text-[2.1rem] sm:leading-[1.35] lg:text-[2.4rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-pretty text-[0.95rem] leading-[1.95] text-slate-600 sm:text-base sm:leading-[2]">
            {post.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[0.72rem] font-medium text-slate-600"
                key={tag}
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {post.searchIntent ? (
          <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/70 p-4 sm:p-5">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-amber-700">
              この記事はこんな方へ
            </p>
            <p className="mt-2 text-[0.92rem] leading-[1.85] text-amber-950">
              {post.searchIntent}
            </p>
          </div>
        ) : null}

        {post.keyPoints && post.keyPoints.length > 0 ? (
          <section className="mt-5 rounded-2xl border border-sky-100 bg-sky-50/60 p-4 sm:p-5">
            <p className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-sky-800">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-amber-400" />
              この記事でわかること
            </p>
            <ul className="mt-3 grid gap-2.5">
              {post.keyPoints.map((point) => (
                <li
                  className="flex gap-2 text-[0.92rem] leading-[1.75] text-slate-800"
                  key={point}
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-sky-700 text-[0.65rem] font-bold text-white"
                  >
                    ✓
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="article-content mt-7 sm:mt-8">
          <MDXRemote
            components={mdxComponents}
            options={{ mdxOptions: { useDynamicImport: false }, blockJS: false }}
            source={post.content}
          />
        </div>

        <aside className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:rounded-[1.6rem] sm:p-7">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-sky-700">
            次の一歩
          </p>
          <p className="mt-3 text-[1.05rem] font-bold leading-[1.55] tracking-[-0.01em] text-slate-950 sm:text-lg">
            読んだあとは、教材作成や学習アプリへ進めます。
          </p>
          <p className="mt-3 text-[0.92rem] leading-[1.85] text-slate-600">
            Lumora では、ブログ記事で学んだ考え方を、教材作成AIや学習支援アプリへつなげられます。気になるテーマがあれば気軽に相談してください。
          </p>
          <div className="mt-5 grid gap-2.5 sm:flex sm:flex-wrap">
            <ButtonLink className="w-full sm:w-auto" href="/apps">
              アプリを見る
            </ButtonLink>
            <ButtonLink className="w-full sm:w-auto" href="/contact" variant="secondary">
              相談する
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
