import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container>
      <section className="grid min-h-[70vh] place-items-center py-20 text-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
            404 Not Found
          </p>
          <h1 className="mt-4 font-serif text-5xl font-semibold tracking-[-0.08em] text-slate-950 sm:text-6xl">
            探しているページが見つかりません。
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600">
            URLが変更されたか、まだ公開されていないページの可能性があります。
            トップ、Blog、Apps から目的の情報へ戻れます。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">トップへ戻る</ButtonLink>
            <ButtonLink href="/blog" variant="secondary">
              Blogを見る
            </ButtonLink>
            <Link
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
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
