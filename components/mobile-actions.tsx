/** 長い本文を読み切らなくても、目的の操作へ移れるモバイル用導線。 */
export function MobileActions({ primary, secondary }: {
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <nav aria-label="すぐに移動" className="mobile-actions fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-rule bg-white px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] sm:hidden">
      <a href={secondary.href} className="btn px-2">{secondary.label}</a>
      <a href={primary.href} className="btn btn-primary px-2">{primary.label}</a>
    </nav>
  );
}
