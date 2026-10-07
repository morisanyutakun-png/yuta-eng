/**
 * サイトのしるし。
 *
 * 紺の角版に、年度別の出題数を並べた棒を白抜きで入れてある。
 * このサイトが出しているものは「大学別に、年度を追って並べた数字」なので、
 * 中身をそのまま形にした。表紙の意匠（明朝・紺・細い罫）と同じ調子にそろえる。
 *
 * 実在の大学や団体の記章とは関係のない、このサイト独自のもの。
 *
 * 角版は `currentColor`、棒は `--logo-ink`（既定は白）で描く。
 * 濃い地の上に置くときは角版を白に、棒を紺に入れ替える。
 * 両方を白のままにすると、棒が地に溶けて四角い板にしか見えない。
 */
export function LogoMark({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      style={style}
      fill="none"
      role="presentation"
    >
      <rect width="32" height="32" fill="currentColor" />
      <g fill="var(--logo-ink, #fff)">
        <rect x="6.5" y="18" width="3.5" height="7.5" />
        <rect x="12.5" y="13" width="3.5" height="12.5" />
        <rect x="18.5" y="15.5" width="3.5" height="10" />
        <rect x="24.5" y="9" width="3.5" height="16.5" />
      </g>
      <rect x="6.5" y="6.5" width="12" height="1.6" fill="var(--logo-ink, #fff)" />
    </svg>
  );
}
