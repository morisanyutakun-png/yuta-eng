import Image from "next/image";
import Link from "next/link";

import type { BlogPostMeta } from "@/lib/blog";

const categoryAccent: Record<string, { fg: string; bg: string }> = {
  Physics: { fg: "#0b1d4a", bg: "#dbeafe" },
  Materials: { fg: "#7c2d12", bg: "#fef3c7" },
  LaTeX: { fg: "#0c4a6e", bg: "#e0f2fe" },
  Education: { fg: "#064e3b", bg: "#d1fae5" },
  Design: { fg: "#581c87", bg: "#ede9fe" },
};

const defaultAccent = { fg: "#0b1d4a", bg: "#e0e7ff" };

// Tiny 8x4 PNG placeholders that match each category's OG image dominant color.
// They paint instantly while the optimized AVIF/WebP loads, eliminating the
// "white flash" that hurts perceived performance and CLS.
const blurByCategory: Record<string, string> = {
  Physics:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAAEUlEQVR4nGOQs+rCihioJwEAd68cQYRlhkoAAAAASUVORK5CYII=",
  Materials:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAAEUlEQVR4nGNgzlyIFTFQTwIAfj4hofgf1LwAAAAASUVORK5CYII=",
  LaTeX:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAAEUlEQVR4nGNgzlyIFTFQTwIAfj4hofgf1LwAAAAASUVORK5CYII=",
  Education:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAAEUlEQVR4nGPgF9fCihioJwEA8RMKAVkTHEUAAAAASUVORK5CYII=",
};
const defaultBlur =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAAEUlEQVR4nGPgl/XCihioJwEA2qIOwUHUx5kAAAAASUVORK5CYII=";

type Variant = "featured" | "default";

type ArticleCardProps = {
  post: BlogPostMeta;
  variant?: Variant;
  preload?: boolean;
  imageSizes?: string;
};

export function ArticleCard({
  post,
  variant = "default",
  preload = false,
  imageSizes,
}: ArticleCardProps) {
  const accent = categoryAccent[post.category] ?? defaultAccent;
  const blurDataURL = blurByCategory[post.category] ?? defaultBlur;
  const href = `/blog/${post.slug}`;

  if (variant === "featured") {
    return (
      <article
        itemScope
        itemType="https://schema.org/BlogPosting"
        className="group relative grid overflow-hidden rounded-[24px] bg-white ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_30px_70px_-50px_rgba(15,29,74,0.4)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_46px_92px_-50px_rgba(15,29,74,0.5)] sm:rounded-[28px] lg:grid-cols-[1.1fr_0.9fr]"
      >
        <Link
          href={href}
          aria-label={post.title}
          className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4ed8]"
        />
        <meta itemProp="datePublished" content={post.date} />
        <meta itemProp="description" content={post.description} />
        <div
          className="relative aspect-[1200/630] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[320px]"
          style={{ backgroundColor: accent.bg }}
        >
          <Image
            src={`/blog/${post.slug}/opengraph-image`}
            alt={post.title}
            fill
            sizes={imageSizes ?? "(min-width: 1024px) 60vw, 100vw"}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
            preload={preload}
            placeholder="blur"
            blurDataURL={blurDataURL}
            quality={preload ? 75 : 70}
            itemProp="image"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0b1d4a]/30 via-transparent to-transparent opacity-50 transition duration-500 group-hover:opacity-30"
          />
          <span
            className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] backdrop-blur-md sm:left-5 sm:top-5"
            style={{ background: `${accent.bg}E6`, color: accent.fg }}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accent.fg }}
            />
            <span itemProp="articleSection">{post.category}</span>
          </span>
        </div>
        <div className="flex flex-col justify-between gap-5 p-6 sm:gap-6 sm:p-9 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] font-medium text-[#64748b]">
              <time dateTime={post.date} className="tabular-nums">
                {post.formattedDate}
              </time>
              <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
              <span>{post.readingTime}</span>
            </div>
            <h3
              itemProp="headline"
              className="mt-4 text-balance text-[clamp(1.2rem,1rem+1.2vw,1.7rem)] font-extrabold leading-[1.32] tracking-[-0.005em] text-[#0b1d4a] transition duration-300 group-hover:text-[#1d4ed8]"
            >
              {post.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-[clamp(0.92rem,0.88rem+0.25vw,1rem)] leading-[1.9] text-[#475569] sm:mt-4">
              {post.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {post.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-[#f1f5f9] px-2.5 py-0.5 text-[0.7rem] font-medium text-[#475569]"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-[#1d4ed8] transition duration-300 group-hover:gap-2.5 group-hover:text-[#0b1d4a]">
              続きを読む
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      itemScope
      itemType="https://schema.org/BlogPosting"
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white ring-1 ring-[rgba(15,29,74,0.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_56px_-36px_rgba(15,29,74,0.4)] hover:ring-[rgba(29,78,216,0.18)]"
    >
      <Link
        href={href}
        aria-label={post.title}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4ed8]"
      />
      <meta itemProp="datePublished" content={post.date} />
      <meta itemProp="description" content={post.description} />
      <div
        className="relative aspect-[1200/630] overflow-hidden"
        style={{ backgroundColor: accent.bg }}
      >
        <Image
          src={`/blog/${post.slug}/opengraph-image`}
          alt={post.title}
          fill
          sizes={imageSizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
          preload={preload}
          placeholder="blur"
          blurDataURL={blurDataURL}
          quality={70}
          itemProp="image"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0b1d4a]/35 to-transparent opacity-70 transition duration-500 group-hover:opacity-40"
        />
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.14em] backdrop-blur-md sm:left-4 sm:top-4 sm:text-[0.7rem]"
          style={{ background: `${accent.bg}E6`, color: accent.fg }}
        >
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5"
            style={{ background: accent.fg }}
          />
          <span itemProp="articleSection">{post.category}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5 sm:gap-3 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.7rem] font-medium text-[#64748b]">
          <time dateTime={post.date} className="tabular-nums">
            {post.formattedDate}
          </time>
          <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3
          itemProp="headline"
          className="text-balance text-[clamp(1rem,0.95rem+0.3vw,1.1rem)] font-bold leading-[1.5] text-[#0b1d4a] transition duration-300 group-hover:text-[#1d4ed8]"
        >
          {post.title}
        </h3>
        <p className="line-clamp-2 text-[clamp(0.84rem,0.82rem+0.2vw,0.92rem)] leading-[1.85] text-[#475569]">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          {post.tags.length > 0 ? (
            <span className="truncate text-[0.72rem] font-medium text-[#94a3b8]">
              #{post.tags[0]}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 text-[0.82rem] font-semibold text-[#1d4ed8] transition duration-300 group-hover:gap-2 group-hover:text-[#0b1d4a]">
            読む
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
