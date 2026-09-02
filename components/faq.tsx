import type { Faq } from "@/lib/seo";

export function FaqSection({ items, name }: { items: Faq[]; name: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-14">
      <h2 id="faq-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
        {name}の数学について、よくある質問
      </h2>
      <dl className="mt-5 divide-y divide-rule border-y border-rule">
        {items.map((f) => (
          <div key={f.q} className="py-4">
            <dt className="flex gap-2.5 text-[0.92rem] font-semibold leading-relaxed text-ink">
              <span aria-hidden="true" className="serif shrink-0 text-navy">
                Q.
              </span>
              <span className="prose-ja">{f.q}</span>
            </dt>
            <dd className="mt-2 flex gap-2.5">
              <span aria-hidden="true" className="serif shrink-0 text-ink-3">
                A.
              </span>
              <span className="prose-ja text-[0.88rem] text-ink-2">{f.a}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
