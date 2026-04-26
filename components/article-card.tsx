import Link from "next/link";

import { siteConfig } from "@/data/site";
import { getOgVersion, type BlogPostMeta } from "@/lib/blog";

const categoryAccent: Record<string, { fg: string; bg: string }> = {
  Physics: { fg: "#0b1d4a", bg: "#dbeafe" },
  Materials: { fg: "#7c2d12", bg: "#fef3c7" },
  LaTeX: { fg: "#0c4a6e", bg: "#e0f2fe" },
  Education: { fg: "#064e3b", bg: "#d1fae5" },
  Design: { fg: "#581c87", bg: "#ede9fe" },
};

const defaultAccent = { fg: "#0b1d4a", bg: "#e0e7ff" };

type Variant = "featured" | "default";

type ArticleCardProps = {
  post: BlogPostMeta;
  variant?: Variant;
  preload?: boolean;
  imageSizes?: string;
};

type CardImageProps = {
  slug: string;
  title: string;
  preload?: boolean;
  variant: Variant;
};

/**
 * Plain <picture> with statically pre-built AVIF/WebP/PNG variants from
 * /public/og/. Bypasses /_next/image entirely — no optimizer cold start, no
 * runtime conversion, served straight from CDN with the build's Cache-Control.
 */
function CardImage({ slug, title, preload, variant }: CardImageProps) {
  const v = getOgVersion();
  const fileBase = `/og/${slug}`;
  const q = `?v=${v}`;
  const sizes =
    variant === "featured"
      ? "(min-width: 1024px) 60vw, 100vw"
      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${fileBase}-640.avif${q} 640w, ${fileBase}-1200.avif${q} 1200w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${fileBase}-640.webp${q} 640w, ${fileBase}-1200.webp${q} 1200w`}
        sizes={sizes}
      />
      <img
        src={`${fileBase}.png${q}`}
        alt={title}
        width={1200}
        height={630}
        loading={preload ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={preload ? "high" : "auto"}
        itemProp="image"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />
    </picture>
  );
}

/** Author byline with initial avatar — same author across all posts. */
function AuthorByline({
  formattedDate,
  date,
  size = "default",
}: {
  formattedDate: string;
  date: string;
  size?: "default" | "compact";
}) {
  const initial = siteConfig.author?.charAt(0) ?? "S";
  const avatarSize = size === "compact" ? "h-7 w-7 text-[0.72rem]" : "h-8 w-8 text-[0.78rem]";
  const nameSize = size === "compact" ? "text-[0.78rem]" : "text-[0.84rem]";
  const dateSize = size === "compact" ? "text-[0.7rem]" : "text-[0.74rem]";

  return (
    <div
      className="flex items-center gap-2.5"
      itemProp="author"
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="url" content={`${siteConfig.url}/about`} />
      <span
        aria-hidden="true"
        className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#1d4ed8] to-[#38bdf8] font-bold tracking-tight text-white shadow-[0_4px_10px_-4px_rgba(29,78,216,0.55)] ${avatarSize}`}
      >
        {initial}
      </span>
      <div className="flex min-w-0 flex-col leading-tight">
        <span className={`truncate font-semibold tracking-[-0.005em] text-[#0b1d4a] ${nameSize}`} itemProp="name">
          {siteConfig.author}
        </span>
        <time
          dateTime={date}
          className={`tabular-nums text-[#94a3b8] ${dateSize}`}
        >
          {formattedDate}
        </time>
      </div>
    </div>
  );
}

/** Hidden Publisher microdata block — required for Google BlogPosting rich result. */
function PublisherMeta() {
  return (
    <span itemProp="publisher" itemScope itemType="https://schema.org/Organization" style={{ display: "none" }}>
      <meta itemProp="name" content={siteConfig.name} />
      <meta itemProp="url" content={siteConfig.url} />
      <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
        <meta itemProp="url" content={`${siteConfig.url}/brand/solvora-mark.svg`} />
      </span>
    </span>
  );
}

export function ArticleCard({
  post,
  variant = "default",
  preload = false,
  imageSizes: _imageSizes,
}: ArticleCardProps) {
  const accent = categoryAccent[post.category] ?? defaultAccent;
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
        <meta itemProp="dateModified" content={post.date} />
        <meta itemProp="description" content={post.description} />
        <meta itemProp="mainEntityOfPage" content={`${siteConfig.url}/blog/${post.slug}`} />
        <PublisherMeta />
        <div
          className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[340px]"
          style={{ backgroundColor: accent.bg }}
        >
          <CardImage
            slug={post.slug}
            title={post.title}
            preload={preload}
            variant="featured"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0b1d4a]/20 via-transparent to-transparent opacity-50 transition duration-500 group-hover:opacity-30"
          />
        </div>
        <div className="flex flex-col justify-between gap-6 p-6 sm:gap-7 sm:p-9 lg:p-10">
          <div>
            {/* Eyebrow: category + reading time as text label (editorial) */}
            <p
              className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] sm:text-[0.74rem]"
              style={{ color: accent.fg }}
            >
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5"
                style={{ background: accent.fg }}
              />
              <span itemProp="articleSection">{post.category}</span>
              <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
              <span className="font-semibold normal-case tracking-[0.02em] text-[#64748b]">
                {post.readingTime}
              </span>
            </p>
            <h3
              itemProp="headline"
              className="mt-4 text-balance text-[clamp(1.3rem,1.05rem+1.4vw,1.85rem)] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] transition duration-300 group-hover:text-[#1d4ed8]"
            >
              {post.title}
            </h3>
            <p className="mt-4 line-clamp-3 text-[clamp(0.94rem,0.9rem+0.25vw,1.02rem)] leading-[1.95] text-[#475569]">
              {post.description}
            </p>
          </div>
          {/* Footer: byline + read more */}
          <div className="flex items-center justify-between gap-3 border-t border-[rgba(15,29,74,0.08)] pt-5">
            <AuthorByline formattedDate={post.formattedDate} date={post.date} />
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.88rem] font-semibold text-[#1d4ed8] transition duration-300 group-hover:gap-2.5 group-hover:text-[#0b1d4a]">
              <span className="hidden sm:inline">続きを読む</span>
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
      className="group relative flex h-full flex-col overflow-hidden rounded-[18px] bg-white ring-1 ring-[rgba(15,29,74,0.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_56px_-36px_rgba(15,29,74,0.4)] hover:ring-[rgba(29,78,216,0.18)]"
    >
      <Link
        href={href}
        aria-label={post.title}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4ed8]"
      />
      <meta itemProp="datePublished" content={post.date} />
      <meta itemProp="description" content={post.description} />
      {/* Smaller 16:10 thumbnail — image becomes a supporting detail, not the hero */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ backgroundColor: accent.bg }}
      >
        <CardImage
          slug={post.slug}
          title={post.title}
          preload={preload}
          variant="default"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0b1d4a]/20 to-transparent opacity-60 transition duration-500 group-hover:opacity-30"
        />
      </div>
      {/* Editorial body: eyebrow → headline → excerpt → divider → byline */}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:gap-3.5 sm:p-6">
        <p
          className="flex items-center gap-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] sm:text-[0.7rem]"
          style={{ color: accent.fg }}
        >
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5"
            style={{ background: accent.fg }}
          />
          <span itemProp="articleSection">{post.category}</span>
          <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
          <span className="font-semibold normal-case tracking-[0.02em] text-[#64748b]">
            {post.readingTime}
          </span>
        </p>
        <h3
          itemProp="headline"
          className="text-balance text-[clamp(1.1rem,1rem+0.4vw,1.32rem)] font-extrabold leading-[1.5] tracking-[-0.005em] text-[#0b1d4a] transition duration-300 group-hover:text-[#1d4ed8]"
        >
          {post.title}
        </h3>
        <p className="line-clamp-3 text-[clamp(0.88rem,0.85rem+0.25vw,0.96rem)] leading-[1.9] text-[#475569]">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[rgba(15,29,74,0.08)] pt-4">
          <AuthorByline
            formattedDate={post.formattedDate}
            date={post.date}
            size="compact"
          />
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center text-[0.82rem] font-semibold text-[#1d4ed8] transition duration-300 group-hover:translate-x-0.5 group-hover:text-[#0b1d4a]"
          >
            →
          </span>
        </div>
      </div>
    </article>
  );
}
