import Link from "next/link";

import type { BlogPostMeta } from "@/lib/blog";

type ArticleCardProps = {
  post: BlogPostMeta;
};

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="group shine-card h-full rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_70px_-55px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:border-slate-300">
      <Link className="block h-full" href={`/blog/${post.slug}`}>
        <div className="rounded-[1.6rem] bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.28),transparent_34%),linear-gradient(135deg,#0f172a,#1e293b_48%,#0369a1)] p-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              {post.category}
            </span>
            <span className="font-mono text-xs text-sky-100">{post.readingTime}</span>
          </div>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
            Editorial Note
          </p>
        </div>
        <div className="px-2 pb-2 pt-5">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            <time dateTime={post.date}>{post.formattedDate}</time>
          </div>
          <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-slate-950 transition group-hover:text-sky-800">
          {post.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-7 text-sm font-semibold text-slate-950">
            記事を読む <span aria-hidden="true">→</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
