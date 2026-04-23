import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container>
      <section className="grid min-h-[70vh] place-items-center py-14 text-center sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
            404 Not Found
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.08em] text-slate-950 sm:text-5xl lg:text-6xl">
            探しているページが見つかりません。
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
            URLが変更されたか、まだ公開されていないページの可能性があります。
            トップ、Blog、Apps から目的の情報へ戻れます。
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
            <ButtonLink className="w-full sm:w-auto" href="/">
              トップへ戻る
            </ButtonLink>
            <ButtonLink className="w-full sm:w-auto" href="/blog" variant="secondary">
              Blogを見る
            </ButtonLink>
            <Link
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
              href="/apps"
            >
              Appsを見る
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
