import Link from "next/link";

import type { BlogPostMeta } from "@/lib/blog";

type ArticleCardProps = {
  post: BlogPostMeta;
};

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="group h-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_70px_-55px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:border-slate-300">
      <Link className="block h-full" href={`/blog/${post.slug}`}>
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <time dateTime={post.date}>{post.formattedDate}</time>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{post.category}</span>
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-slate-950 transition group-hover:text-sky-800">
          {post.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">{post.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
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
      </Link>
    </article>
  );
}
