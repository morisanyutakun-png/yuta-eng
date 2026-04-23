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
      title: "Article Not Found",
      description: "指定された記事は見つかりませんでした。",
      path: `/blog/${slug}`,
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.description,
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
    <Container>
      <JsonLd
        data={[
          createArticleJsonLd(post),
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="mx-auto max-w-4xl py-16 sm:py-20">
        <Link
          className="text-sm font-semibold text-sky-800 transition hover:text-slate-950"
          href="/blog"
        >
          ← Blog一覧へ戻る
        </Link>
        <header className="mt-8 overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white shadow-[0_28px_100px_-80px_rgba(15,23,42,0.75)]">
          <div className="bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.3),transparent_34%),linear-gradient(145deg,#0f172a,#111827_58%,#082f49)] p-8 text-white sm:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            <time dateTime={post.date}>{post.formattedDate}</time>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
            <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
            <span>{post.readingTime}</span>
          </div>
            <h1 className="text-balance mt-6 font-serif text-4xl font-semibold leading-tight tracking-[-0.07em] sm:text-6xl">
            {post.title}
          </h1>
            <p className="text-pretty mt-6 text-lg leading-9 text-slate-300">
              {post.description}
            </p>
          </div>
          <div className="p-6 sm:p-8">
          <div className="mt-7 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
            {post.searchIntent ? (
              <div className="mt-6 rounded-2xl bg-sky-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Search Intent
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {post.searchIntent}
                </p>
              </div>
            ) : null}
            {post.keyPoints ? (
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {post.keyPoints.map((point) => (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={point}>
                    <p className="text-sm font-semibold leading-7 text-slate-800">{point}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <div className="article-content mt-10">
          <MDXRemote components={mdxComponents} source={post.content} />
        </div>
      </article>

      <section className="mx-auto max-w-4xl border-t border-slate-200 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
            次に読む
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            関連記事やCTAを後から差し込めるよう、記事末尾の導線を独立したセクションにしています。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/blog" variant="secondary">
              Blog一覧へ戻る
            </ButtonLink>
            <ButtonLink href="/apps">Appsを見る</ButtonLink>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="pb-24">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Related Articles
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
              関連記事
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <ArticleCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
