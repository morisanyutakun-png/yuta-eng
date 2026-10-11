import { MathText } from "@/lib/render";
import type { Figure, FigureItem, Place } from "@/lib/solutions/types";

/**
 * 解説に添える図。
 *
 * 載せるのは**解くために自分で描いた図**だけで、問題の図は写さない。
 *
 * 座標は数学のまま（$y$ が上向き）で受け取り、ここで上下を反転させて SVG に落とす。
 * 式から座標を出してそのまま書けるようにするための約束で、こうしないと
 * 図と本文の数字がずれる。
 *
 * 文字の重なりは、置いた文字の矩形を覚えておき、次の文字が当たるなら
 * 置き場所を順に試す、という形で避ける。図ごとに手で位置を調整していると、
 * 式を直したときに必ず直し忘れる。
 */

const W = 520; // 図の内部座標。実際の大きさは CSS 側で決める
const PAD = 26;

/** 文字を置く向きの候補。最初に当たらなかったものを使う */
const ORDER: Place[] = [
  "above-right",
  "above-left",
  "below-right",
  "below-left",
  "above",
  "below",
  "right",
  "left",
];

type Box = { x1: number; y1: number; x2: number; y2: number };

/** 読み上げ用。$…$ と **…** を落として地の文にする */
function plain(s: string) {
  return s.replace(/\*\*/g, "").replace(/\$([^$]+)\$/g, "$1").replace(/\\[a-zA-Z]+/g, "");
}

function hit(a: Box, b: Box) {
  return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1);
}

function offset(p: Place, w: number, h: number): [number, number, "start" | "middle" | "end"] {
  const g = 7; // 点から文字までの隙間
  switch (p) {
    case "above":
      return [0, -g - h / 2, "middle"];
    case "below":
      return [0, g + h / 2, "middle"];
    case "left":
      return [-g, 0, "end"];
    case "right":
      return [g, 0, "start"];
    case "above-left":
      return [-g, -g - h / 2, "end"];
    case "above-right":
      return [g, -g - h / 2, "start"];
    case "below-left":
      return [-g, g + h / 2, "end"];
    default:
      return [g, g + h / 2, "start"];
  }
}

export function FigureView({ fig }: { fig: Figure }) {
  const [x0, x1, y0, y1] = fig.view;
  const h = Math.round(((y1 - y0) / (x1 - x0)) * (W - PAD * 2)) + PAD * 2;
  const H = Math.min(Math.max(h, 180), 460);

  const sx = (x: number) => PAD + ((x - x0) / (x1 - x0)) * (W - PAD * 2);
  // 数学の座標は上向き、SVG は下向きなので、ここで反転させる
  const sy = (y: number) => H - PAD - ((y - y0) / (y1 - y0)) * (H - PAD * 2);

  const path = (pts: [number, number][]) =>
    pts.map(([x, y], i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join("");

  const sample = (f: (t: number) => [number, number], from: number, to: number, n = 160) =>
    Array.from({ length: n + 1 }, (_, i) => f(from + ((to - from) * i) / n))
      .filter(([px, py]) => Number.isFinite(px) && Number.isFinite(py))
      .map(([px, py]) => [px, py] as [number, number]);

  // 置いた文字の矩形。次の文字はこれを避ける
  const placed: Box[] = [];
  const labels: { x: number; y: number; anchor: "start" | "middle" | "end"; text: string }[] = [];

  const put = (at: [number, number], text: string, want?: Place) => {
    const cx = sx(at[0]);
    const cy = sy(at[1]);
    const w = text.length * 7.4 + 4;
    const fh = 14;
    for (const p of want ? [want, ...ORDER] : ORDER) {
      const [dx, dy, anchor] = offset(p, w, fh);
      const tx = cx + dx;
      const ty = cy + dy;
      const bx = anchor === "end" ? tx - w : anchor === "middle" ? tx - w / 2 : tx;
      const box: Box = { x1: bx, y1: ty - fh / 2, x2: bx + w, y2: ty + fh / 2 };
      const outside = box.x1 < 2 || box.x2 > W - 2 || box.y1 < 2 || box.y2 > H - 2;
      if (!outside && !placed.some((q) => hit(q, box))) {
        placed.push(box);
        labels.push({ x: tx, y: ty + 4, anchor, text });
        return;
      }
    }
    // どこにも置けないときは点の右上に重ねる。隠すより見えているほうがよい
    labels.push({ x: cx + 7, y: cy - 7, anchor: "start", text });
  };

  const draw = (it: FigureItem, i: number) => {
    const line = it.k === "curve" || it.k === "param" || it.k === "seg";
    const stroke = line && it.faint ? "#9aa1a9" : "#1b3a63";
    const dash = line && it.dash ? "4 3" : undefined;
    switch (it.k) {
      case "curve":
        return (
          <path
            key={i}
            d={path(sample((t) => [t, it.f(t)], it.from, it.to))}
            fill="none"
            stroke={stroke}
            strokeWidth={it.faint ? 1 : 1.6}
            strokeDasharray={dash}
          />
        );
      case "param":
        return (
          <path
            key={i}
            d={path(sample(it.f, it.from, it.to))}
            fill="none"
            stroke={stroke}
            strokeWidth={it.faint ? 1 : 1.6}
            strokeDasharray={dash}
          />
        );
      case "seg":
        return (
          <path
            key={i}
            d={path([it.a, it.b])}
            fill="none"
            stroke={stroke}
            strokeWidth={it.faint ? 1 : 1.4}
            strokeDasharray={dash}
          />
        );
      case "fill":
        return <path key={i} d={`${path(it.pts)}Z`} fill="#1b3a63" fillOpacity={0.1} stroke="none" />;
      case "fillBetween": {
        const up = sample((t) => [t, it.top(t)], it.from, it.to);
        const dn = sample((t) => [t, it.bottom(t)], it.from, it.to).reverse();
        return <path key={i} d={`${path([...up, ...dn])}Z`} fill="#1b3a63" fillOpacity={0.1} stroke="none" />;
      }
      case "dot":
        return <circle key={i} cx={sx(it.at[0])} cy={sy(it.at[1])} r={2.6} fill="#1b3a63" />;
      default:
        return null;
    }
  };

  // 文字は最後にまとめて置く。線より手前に出す
  for (const it of fig.items) {
    if ((it.k === "dot" || it.k === "text") && it.label) put(it.at, it.label, it.place);
  }

  const ticks = (from: number, to: number, step?: number) =>
    step ? Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step) : [];

  return (
    <figure className="my-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={plain(fig.caption)}
        className="w-full border border-rule bg-white"
      >
        {/* 目盛り */}
        {ticks(Math.ceil(x0), x1, fig.step?.x).map((v) =>
          v === 0 ? null : (
            <line key={`gx${v}`} x1={sx(v)} y1={PAD / 2} x2={sx(v)} y2={H - PAD / 2} stroke="#eef0f2" strokeWidth={1} />
          ),
        )}
        {ticks(Math.ceil(y0), y1, fig.step?.y).map((v) =>
          v === 0 ? null : (
            <line key={`gy${v}`} x1={PAD / 2} y1={sy(v)} x2={W - PAD / 2} y2={sy(v)} stroke="#eef0f2" strokeWidth={1} />
          ),
        )}

        {/* 軸。範囲に 0 が入っているときだけ引く */}
        {y0 <= 0 && y1 >= 0 && (
          <line x1={PAD / 2} y1={sy(0)} x2={W - PAD / 2} y2={sy(0)} stroke="#666d76" strokeWidth={1} />
        )}
        {x0 <= 0 && x1 >= 0 && (
          <line x1={sx(0)} y1={PAD / 2} x2={sx(0)} y2={H - PAD / 2} stroke="#666d76" strokeWidth={1} />
        )}

        {fig.items.map(draw)}

        {labels.map((l, i) => (
          <text
            key={i}
            x={l.x}
            y={l.y}
            textAnchor={l.anchor}
            className="fill-ink"
            style={{ fontSize: 12.5, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            {l.text}
          </text>
        ))}
      </svg>
      <figcaption className="prose-ja mt-1.5 text-[0.8rem] leading-relaxed text-ink-3">
        <MathText>{fig.caption}</MathText>
      </figcaption>
    </figure>
  );
}
