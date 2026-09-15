/** Amazon の商品ページへのボタン。既存の BookCta と同じ見た目にそろえる。 */
export function AmazonButton({
  href,
  label = "Amazonで見る",
  size = "md",
  className = "",
}: {
  href: string;
  label?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={href}
      rel="noopener nofollow sponsored"
      target="_blank"
      className={`inline-flex items-center justify-center gap-1.5 rounded-[4px] bg-[#ffa41c] px-5 font-bold text-[#111] transition-colors hover:bg-[#ffb454] ${
        size === "lg" ? "min-h-12 text-[0.95rem]" : "min-h-11 text-[0.88rem]"
      } ${className}`}
    >
      {label}
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M7 13 13 7M8 7h5v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
