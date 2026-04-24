import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { StaggerReveal } from "@/components/stagger-reveal";
import { seoClusters } from "@/data/seo";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "高校物理・教材制作・学習アプリの記事一覧",
  description:
    "高校物理の学び直し、LaTeXを使った教材作成、学習支援Webアプリ、教育ICTの考え方がわかるブログ記事一覧です。何が学べるか、次にどう進めるかが見える記事をまとめています。",
  keywords: [
    "高校物理 ブログ",
    "物理教材 作り方",
    "LaTeX 教材作成",
    "学習支援Webアプリ 設計",
    "教育ICT 記事",
  ],
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <Container>
      <Section className="pb-10">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_35px_120px_-85px_rgba(15,23,42,0.95)] sm:rounded-[3rem] sm:p-10 lg:p-12">
          <div className="absolute right-[-10rem] top-[-10rem] hidden h-96 w-96 rounded-full bg-sky-400/30 blur-3xl sm:block" />
          <div className="absolute bottom-[-12rem] left-[-8rem] hidden h-96 w-96 rounded-full bg-amber-300/20 blur-3xl sm:block" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.44fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">
                Editorial Hub
              </p>
              <h1 className="text-balance mt-4 font-serif text-4xl font-semibold leading-tight tracking-[-0.08em] sm:text-5xl lg:text-6xl">
                高校物理・教材制作・学習アプリの記事をまとめる。
              </h1>
              <p className="text-pretty mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:mt-6 sm:text-lg sm:leading-9">
                高校物理をどう学び直すか、教材をどう作るか、学習支援Webアプリをどう設計するか。
                検索してきたテーマごとに、考え方と次の一歩が分かる記事を整理しています。
              </p>
            </div>
            <aside className="rounded-[1.7rem] border border-white/10 bg-white/[0.08] p-5 backdrop-blur sm:rounded-[2rem] sm:p-6">
              <p className="text-sm font-semibold text-white">主なテーマ</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200"
                    key={category}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </Section>

      <Section
        className="pt-8"
        description="各記事は、検索で来た人が『どんな悩みに答える記事か』を判断しやすいように整理しています。"
        eyebrow="Topic Guide"
        title="知りたいことから記事を選ぶ"
      >
        <StaggerReveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {seoClusters.map((cluster) => (
            <article className="rounded-[1.7rem] border border-slate-200 bg-white p-4 sm:rounded-[2rem] sm:p-5" key={cluster.primary}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                {cluster.label}
              </p>
              <h2 className="mt-3 text-lg font-semibold tracking-[-0.04em] text-slate-950 sm:text-xl">
                {cluster.primary}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{cluster.intent}</p>
            </article>
          ))}
        </StaggerReveal>
      </Section>

      <Section
        className="pt-8"
        description="一覧から読んでも、記事詳細に入ってからでも、何が分かる記事かを把握しやすいようにしています。"
        eyebrow="Articles"
        title="記事一覧"
      >
        {posts.length > 0 ? (
          <StaggerReveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </StaggerReveal>
        ) : (
          <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 text-slate-600 sm:rounded-[2rem] sm:p-8">
            まだ公開記事はありません。`content/blog` に記事を追加すると一覧に表示されます。
          </div>
        )}
      </Section>
    </Container>
  );
}
