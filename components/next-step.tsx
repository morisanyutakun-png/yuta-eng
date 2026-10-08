import Link from "next/link";

/**
 * 「ここまで読んだら、次にこれをする」を示す枠。
 *
 * 長い案内を読み終えたあとに何も置かないと、読んだだけで終わる。
 * 節の終わりごとに、次の1手を名指しで出す。
 *
 * 押すものは1つだけ太字（btn-primary）にする。並べて同じ強さにすると、
 * どれを押せばよいか決められなくなる。
 */
export function NextStep({
  heading,
  note,
  primary,
  secondary = [],
}: {
  heading: string;
  note?: string;
  primary: { href: string; label: string; external?: boolean };
  secondary?: { href: string; label: string }[];
}) {
  return (
    <div className="mt-9 border border-rule bg-paper-2 px-5 py-5 sm:px-6">
      <p className="text-[0.95rem] font-semibold text-ink">{heading}</p>
      {note && <p className="prose-ja mt-1.5 text-[0.84rem] leading-[1.9] text-ink-2">{note}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        {primary.external ? (
          <a href={primary.href} className="btn btn-primary">
            {primary.label}
          </a>
        ) : (
          <Link href={primary.href} className="btn btn-primary">
            {primary.label}
          </Link>
        )}
        {secondary.map((x) => (
          <Link key={x.href} href={x.href} className="text-[0.85rem] text-navy underline underline-offset-4">
            {x.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
