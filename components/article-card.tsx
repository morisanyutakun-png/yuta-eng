import Link from "next/link";

import type { BlogPostMeta } from "@/lib/blog";

type ArticleCardProps = {
  post: BlogPostMeta;
};

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="group shine-card h-full rounded-[1.8rem] border border-slate-200 bg-white p-4 shadow-[0_18px_70px_-55px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:border-slate-300 sm:rounded-[2rem]">
      <Link className="block h-full" href={`/blog/${post.slug}`}>
        <div className="rounded-[1.45rem] bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.28),transparent_34%),linear-gradient(135deg,#0f172a,#1e293b_48%,#0369a1)] p-4 text-white sm:rounded-[1.6rem] sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              {post.category}
            </span>
            <span className="font-mono text-xs text-sky-100">{post.readingTime}</span>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100 sm:mt-10">
            Editorial Note
          </p>
        </div>
        <div className="px-1 pb-1 pt-4 sm:px-2 sm:pb-2 sm:pt-5">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            <time dateTime={post.date}>{post.formattedDate}</time>
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-[-0.04em] text-slate-950 transition group-hover:text-sky-800 sm:mt-4 sm:text-xl">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:leading-7">
            {post.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold text-slate-950 sm:mt-7">
            記事を読む <span aria-hidden="true">→</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
