import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "教育、物理、LaTeX、教材制作、学習支援Webアプリ開発に関する yuta-eng.com のブログ記事一覧です。",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <Container>
      <Section className="pb-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Blog
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.08em] text-slate-950 sm:text-6xl">
              学びの設計を、記事として蓄積する。
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600">
              教育、物理、LaTeX、教材制作、学習支援Webアプリ開発について、
              後から検索しやすく、読み返しやすい形で発信します。
            </p>
          </div>
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-950">Categories</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  key={category}
                >
                  {category}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section className="pt-8">
        {posts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">
            まだ公開記事はありません。`content/blog` に記事を追加すると一覧に表示されます。
          </div>
        )}
      </Section>
    </Container>
  );
}
