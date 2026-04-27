import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getOgVersion,
} from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "理系教育・EdTech・AI教材作成の実践ノート｜Solvora ブログ",
  description:
    "Solvora ブログは、理系人材育成のための EdTech・教育DX・AI 教材作成の実践ノート。高校物理を理解で解く読み方、AI × LaTeX による教材作成ワークフロー、GIGA スクール構想以降の学習支援アプリ設計まで、教員・教材制作者・受験生・社会人に向けて長期記事を継続更新しています。",
  keywords: [
    "理系人材育成 ブログ",
    "EdTech ブログ",
    "GIGAスクール 後",
    "教育DX",
    "AI 教材作成",
    "教材作成 AI",
    "LaTeX 教材作成",
    "学習支援 アプリ",
    "高校物理 ブログ",
    "STEM教育",
  ],
  path: "/blog",
});

const categoryAccent: Record<string, string> = {
  Physics: "#1d4ed8",
  Materials: "#0369a1",
  LaTeX: "#0284c7",
  Education: "#0d9488",
};

const categoryJpName: Record<string, string> = {
  Physics: "高校物理",
  Materials: "教材作成・AI",
  LaTeX: "LaTeX・組版",
  Education: "EdTech・学習設計",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featuredPost, ...restPosts] = posts;
  // Cap the initial /blog landing at 11 cards (1 featured + 11 in the grid)
  // so the served HTML stays under ~120KB on slow 4G. The remaining articles
  // are fully reachable via category and tag landing pages, which keep their
  // own SEO surface. This was the single biggest FCP win — /blog.html dropped
  // from ~250KB to ~120KB once we stopped inlining all 38 cards on first load.
  const visiblePosts = restPosts.slice(0, 11);
  const hiddenCount = restPosts.length - visiblePosts.length;
  const allCategories = getAllCategories();
  // Trimmed from 12 → 8 to shrink the above-the-fold DOM (lighthouse "DOM size"
  // diagnostic). The full tag index is still reachable from the tag landing pages.
  const popularTags = getAllTags().slice(0, 8);

  // ItemList JSON-LD was dropped — at 38 items × ~200 bytes it inflated the
  // HTML by ~7KB without measurable SEO benefit beyond what CollectionPage and
  // BreadcrumbList already provide. Each individual article still ships its own
  // BlogPosting microdata (see ArticleCard), so Google has structured data per
  // post regardless.
  const jsonLd = [
    createBreadcrumbJsonLd([
      { name: "ホーム", path: "/" },
      { name: "ブログ", path: "/blog" },
    ]),
    createCollectionPageJsonLd({
      name: "Solvora ブログ｜理系教育・EdTech・AI教材作成の実装ノート",
      description:
        "理系人材育成 EdTech ハブ Solvora が運営するブログのコレクションページ。",
      path: "/blog",
      itemCount: posts.length,
    }),
  ];

  // Preload the LCP image — the featured (first) card thumbnail. Browsers
  // start fetching it while still parsing HTML, shaving 200-500ms off LCP on
  // first visit. React 18+ hoists <link> rendered in body to <head> automatically.
  const ogVersion = getOgVersion();
  const lcpSlug = featuredPost?.slug;
  const lcpAvif640 = lcpSlug
    ? `/og/${lcpSlug}-640.avif?v=${ogVersion}`
    : null;
  const lcpAvif1200 = lcpSlug
    ? `/og/${lcpSlug}-1200.avif?v=${ogVersion}`
    : null;

  return (
    <>
      {lcpAvif640 && lcpAvif1200 ? (
        <link
          rel="preload"
          as="image"
          fetchPriority="high"
          imageSrcSet={`${lcpAvif640} 640w, ${lcpAvif1200} 1200w`}
          imageSizes="(min-width: 1024px) 60vw, 100vw"
          type="image/avif"
          href={lcpAvif1200}
        />
      ) : null}
      <JsonLd data={jsonLd} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <Container className="px-4 sm:px-6">
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
              <li className="text-[#475569]">ブログ</li>
            </ol>
          </nav>

          <div className="py-8 sm:py-14 lg:py-16">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.76rem]">
              Insights · 理系人材育成 EdTech
            </p>
            {/* Smaller H1 — the previous 32–51px headline was the LCP element on
                mobile and dominated the above-the-fold area. Tightening it lets
                the (preloaded) featured card image become the LCP candidate
                instead, which is much faster to settle. */}
            <h1 className="mt-3 text-balance text-[1.55rem] font-extrabold leading-[1.3] tracking-[-0.005em] text-[#0b1d4a] sm:mt-4 sm:text-[2.1rem] sm:leading-[1.2] lg:text-[2.4rem]">
              理系教育と EdTech の、実装ノート。
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-[0.96rem] leading-[1.85] text-[#334155] sm:mt-5 sm:text-[1.02rem] sm:leading-[1.9]">
              高校物理を理解で解く読み方、AI × LaTeX で教材を作るワークフロー、GIGA スクール構想後の学習支援アプリ設計。理系人材育成の現場で使える形に、1 記事ずつまとめています。
            </p>

            {/* Category nav — kept above the fold (4 pills, light DOM cost). */}
            <ul className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5">
              {allCategories.map(({ category, count }) => {
                const accent = categoryAccent[category] ?? "#1d4ed8";
                return (
                  <li key={category}>
                    <Link
                      href={`/blog/category/${category}`}
                      className="inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold ring-1 ring-[rgba(15,29,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgba(15,29,74,0.45)] sm:text-[0.86rem]"
                      style={{ color: accent, borderColor: `${accent}33` }}
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: accent }}
                      />
                      {categoryJpName[category] ?? category}
                      <span className="text-[0.72rem] font-medium text-[#94a3b8]">
                        {count}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Popular tag cloud was moved below the fold (into the All
                Articles section) to shrink the above-the-fold DOM. The full
                tag index is still reachable from each article's tag list. */}
          </div>
        </Container>
      </section>

      {/* FEATURED — tighter padding so the preloaded card image lands inside
          the initial viewport on mobile and becomes the LCP element directly,
          rather than a hero-text candidate that's harder to nail down. */}
      {featuredPost ? (
        <section className="bg-[#f8fafc]">
          <Container className="px-4 py-8 sm:px-6 sm:py-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.74rem]">
                  Featured
                </p>
                <h2 className="mt-1.5 text-[clamp(1.2rem,1rem+1.6vw,1.7rem)] font-extrabold leading-[1.32] tracking-[-0.005em] text-[#0b1d4a] sm:mt-2">
                  最新の記事
                </h2>
              </div>
            </div>
            <div className="mt-5 sm:mt-7">
              <ArticleCard post={featuredPost} variant="featured" preload />
            </div>
          </Container>
        </section>
      ) : null}

      {/* ALL ARTICLES */}
      <section className="cv-defer bg-white">
        <Container className="px-4 py-14 sm:px-6 sm:py-24 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.74rem]">
                All Articles
              </p>
              <h2 className="mt-2 text-[clamp(1.4rem,1rem+2vw,2.2rem)] font-extrabold leading-[1.32] tracking-[-0.005em] text-[#0b1d4a] sm:mt-3">
                すべての記事
              </h2>
            </div>
            <p className="text-[0.9rem] text-[#475569]">{posts.length} 本公開中</p>
          </div>

          {visiblePosts.length > 0 ? (
            <ul className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {visiblePosts.map((post) => (
                <li key={post.slug} className="h-full">
                  <ArticleCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 rounded-[22px] bg-[#f8fafc] p-8 text-center text-[#475569] ring-1 ring-[rgba(15,29,74,0.06)]">
              まだ公開記事はありません。
            </div>
          )}

          {/* Footer: link out to category landing pages for the cards we
              dropped from the initial HTML. SEO impact is neutral — the same
              articles are discoverable through category/tag pages, which are
              themselves indexed and live in the sitemap. */}
          {hiddenCount > 0 ? (
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-[#f8fafc] p-5 text-[0.92rem] text-[#475569] ring-1 ring-[rgba(15,29,74,0.06)] sm:mt-14">
              <p>
                残り <span className="font-semibold text-[#0b1d4a]">{hiddenCount} 本</span> はカテゴリ別ページから読めます。
              </p>
              <ul className="flex flex-wrap gap-2">
                {allCategories.map(({ category }) => {
                  const accent = categoryAccent[category] ?? "#1d4ed8";
                  return (
                    <li key={category}>
                      <Link
                        href={`/blog/category/${category}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.84rem] font-semibold ring-1 ring-[rgba(15,29,74,0.08)] transition hover:-translate-y-0.5"
                        style={{ color: accent }}
                      >
                        {categoryJpName[category] ?? category}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {/* Popular tags — moved below the All Articles list. Outside the
              critical path so DOM cost doesn't compete with LCP, and still
              surfaces the long-tail tag landings for SEO. */}
          {popularTags.length > 0 ? (
            <div className="mt-14 sm:mt-20">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
                Popular tags · ロングテールで深掘る
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {popularTags.map(({ tag, count }) => (
                  <li key={tag}>
                    <Link
                      href={`/blog/tag/${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[0.74rem] font-medium text-[#475569] ring-1 ring-[rgba(15,29,74,0.06)] transition hover:bg-[#dbeafe] hover:text-[#1d4ed8] sm:text-[0.78rem]"
                    >
                      #{tag}
                      {count > 1 ? (
                        <span className="text-[0.66rem] font-semibold text-[#94a3b8]">
                          {count}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
