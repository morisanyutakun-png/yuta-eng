/** 説明を順番に読まなくても、知りたい項目へ進めるページ内案内。 */
export function PageJumps({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="このページの案内" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((item) => (
        <a key={item.href} href={item.href} className="flex min-h-11 items-center justify-between gap-2 border border-rule bg-white px-3 py-2 text-[0.86rem] font-semibold text-navy transition-colors hover:border-navy hover:bg-paper-2">
          {item.label}<span aria-hidden="true">{item.href.startsWith("#") ? "↓" : "→"}</span>
        </a>
      ))}
    </nav>
  );
}
