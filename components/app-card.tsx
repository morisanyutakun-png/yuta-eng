import type { AppItem } from "@/data/apps";

import { ButtonLink } from "@/components/button-link";
import { cn } from "@/lib/utils";

type AppCardProps = {
  app: AppItem;
  featured?: boolean;
};

export function AppCard({ app, featured }: AppCardProps) {
  return (
    <article
      className={cn(
        "group shine-card flex h-full flex-col rounded-[2.25rem] border border-slate-200 bg-white p-5 shadow-[0_18px_70px_-50px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_30px_90px_-60px_rgba(15,23,42,0.7)]",
        featured && "bg-gradient-to-br from-white via-sky-50/80 to-amber-50/80",
      )}
    >
      <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <p className="max-w-[12rem] text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
            {app.category}
          </p>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.68rem] font-medium text-slate-200">
            {app.status}
          </span>
        </div>
        <h3 className="mt-10 text-3xl font-semibold tracking-[-0.06em]">
          {app.name}
        </h3>
      </div>

      <p className="mt-5 flex-1 px-1 text-base leading-8 text-slate-600">
        {app.description}
      </p>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          想定ユーザー
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{app.audience}</p>
      </div>

      <ButtonLink className="mt-6 w-full" external href={app.href} variant="secondary">
        {app.ctaLabel}
      </ButtonLink>
    </article>
  );
}
