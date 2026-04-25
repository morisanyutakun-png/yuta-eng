import katex from "katex";
import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function renderWithMath(text: string): ReactNode {
  if (!text || !text.includes("$")) return text;
  const parts: ReactNode[] = [];
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const isDisplay = match[1] !== undefined;
    const expr = (match[1] ?? match[2] ?? "").trim();
    const html = katex.renderToString(expr, {
      throwOnError: false,
      output: "html",
      displayMode: isDisplay,
      strict: "ignore",
    });
    parts.push(
      <span
        key={`m-${key++}`}
        className={isDisplay ? "katex-display-inline" : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length ? parts : text;
}

type CalloutVariant = "info" | "tip" | "warn" | "note";

type CalloutProps = {
  variant?: CalloutVariant;
  title?: string;
  label?: string;
  children: ReactNode;
};

function Callout({ variant = "info", title, label, children }: CalloutProps) {
  const variantClass =
    variant === "tip"
      ? "lumora-callout-tip"
      : variant === "warn"
        ? "lumora-callout-warn"
        : variant === "note"
          ? "lumora-callout-note"
          : "";
  const defaultLabel =
    variant === "tip"
      ? "POINT"
      : variant === "warn"
        ? "注意"
        : variant === "note"
          ? "MEMO"
          : "POINT";

  return (
    <aside className={`lumora-callout ${variantClass}`.trim()}>
      <span className="lumora-callout-label">{label ?? defaultLabel}</span>
      {title ? <p className="lumora-callout-title">{renderWithMath(title)}</p> : null}
      {children}
    </aside>
  );
}

type KeyPointsProps = {
  title?: string;
  items?: string[];
};

function KeyPoints({ title = "この記事でわかること", items = [] }: KeyPointsProps) {
  if (!items.length) return null;
  return (
    <section className="lumora-keypoints">
      <p className="lumora-keypoints-title">{title}</p>
      <ul className="lumora-keypoints-list">
        {items.map((item) => (
          <li key={item}>{renderWithMath(item)}</li>
        ))}
      </ul>
    </section>
  );
}

type Step = {
  title: string;
  body: string;
};

type StepBlockProps = {
  steps?: Step[];
};

function StepBlock({ steps = [] }: StepBlockProps) {
  if (!steps.length) return null;
  return (
    <ol className="lumora-stepblock">
      {steps.map((step, index) => (
        <li className="lumora-step" key={step.title}>
          <span className="lumora-step-number">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <p className="lumora-step-title">{renderWithMath(step.title)}</p>
            <p className="lumora-step-body">{renderWithMath(step.body)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

type ComparisonRow = {
  label: string;
  value: string;
};

type ComparisonProps = {
  rows?: ComparisonRow[];
};

function Comparison({ rows = [] }: ComparisonProps) {
  if (!rows.length) return null;
  return (
    <div className="lumora-comparison">
      {rows.map((row) => (
        <div className="lumora-comparison-row" key={row.label}>
          <div className="lumora-comparison-cell">
            <p className="lumora-comparison-label">{renderWithMath(row.label)}</p>
          </div>
          <div className="lumora-comparison-cell">
            <p className="lumora-comparison-value">{renderWithMath(row.value)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

type FaqItem = {
  q: string;
  a: string;
};

type FaqProps = {
  items?: FaqItem[];
};

function Faq({ items = [] }: FaqProps) {
  if (!items.length) return null;
  return (
    <div>
      {items.map((item) => (
        <div className="lumora-faqitem" key={item.q}>
          <p className="lumora-faqitem-q">{renderWithMath(item.q)}</p>
          <p className="lumora-faqitem-a">{renderWithMath(item.a)}</p>
        </div>
      ))}
    </div>
  );
}

type TocProps = {
  items?: { id: string; label: string }[];
  title?: string;
};

function Toc({ items = [], title = "もくじ" }: TocProps) {
  if (!items.length) return null;
  return (
    <nav className="lumora-toc" aria-label="目次">
      <p className="lumora-toc-title">{title}</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

type CtaCardProps = {
  eyebrow?: string;
  title: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

function CtaCard({ eyebrow = "Solvora", title, body, primary, secondary }: CtaCardProps) {
  return (
    <aside className="lumora-cta-card">
      <span className="lumora-cta-card-eyebrow">{eyebrow}</span>
      <p className="lumora-cta-card-title">{renderWithMath(title)}</p>
      <p className="lumora-cta-card-body">{renderWithMath(body)}</p>
      {primary || secondary ? (
        <div className="lumora-cta-card-actions">
          {primary ? <a href={primary.href}>{primary.label}</a> : null}
          {secondary ? <a href={secondary.href}>{secondary.label}</a> : null}
        </div>
      ) : null}
    </aside>
  );
}

type FigureProps = {
  caption?: string;
  children: ReactNode;
};

function Figure({ caption, children }: FigureProps) {
  return (
    <figure className="lumora-figure">
      {children}
      {caption ? (
        <figcaption className="lumora-figure-caption">{renderWithMath(caption)}</figcaption>
      ) : null}
    </figure>
  );
}

type GraphIllustrationProps = {
  variant?:
    | "kinematic"
    | "workflow"
    | "learning-loop"
    | "vt-graph"
    | "centripetal"
    | "shm-projection"
    | "doppler"
    | "em-map"
    | "roadmap"
    | "retrieval";
  caption?: string;
};

function GraphIllustration({ variant = "kinematic", caption }: GraphIllustrationProps) {
  const ARROW_DEEP = "#1f3a6b";
  const ARROW_WARM = "#c89211";

  const svg =
    variant === "vt-graph" ? (
      <svg
        viewBox="0 0 480 280"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="v-tグラフ：等加速度運動の v=v₀+at と台形の面積=変位"
      >
        <defs>
          <marker
            id="vt-arrow"
            markerWidth="12"
            markerHeight="12"
            refX="9"
            refY="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L10 6 L2 10 z" fill="#1a1a1a" />
          </marker>
          <marker
            id="vt-pointer"
            markerWidth="14"
            markerHeight="14"
            refX="11"
            refY="7"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L12 7 L2 12 z" fill={ARROW_WARM} />
          </marker>
        </defs>
        <rect width="480" height="280" fill="#fbf9f4" rx="6" stroke="#d8cfb8" />

        {/* Grid */}
        <g stroke="#e5dfd1" strokeWidth="0.6">
          {[80, 120, 160, 200].map((y) => (
            <line key={`h${y}`} x1="80" y1={y} x2="420" y2={y} />
          ))}
          {[140, 200, 260, 320, 380].map((x) => (
            <line key={`v${x}`} x1={x} y1="60" x2={x} y2="240" />
          ))}
        </g>

        {/* Axes */}
        <line
          x1="80"
          y1="240"
          x2="430"
          y2="240"
          stroke="#1a1a1a"
          strokeWidth="1.6"
          markerEnd="url(#vt-arrow)"
        />
        <line
          x1="80"
          y1="240"
          x2="80"
          y2="50"
          stroke="#1a1a1a"
          strokeWidth="1.6"
          markerEnd="url(#vt-arrow)"
        />
        <text x="46" y="60" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          速度 v
        </text>
        <text x="402" y="262" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          時刻 t
        </text>

        {/* Trapezoid area (v0 to v at time t) */}
        <path
          d="M80 200 L80 200 L380 100 L380 240 L80 240 Z"
          fill={ARROW_DEEP}
          fillOpacity="0.12"
          stroke={ARROW_DEEP}
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* Velocity line v = v0 + at */}
        <line
          x1="80"
          y1="200"
          x2="400"
          y2="90"
          stroke={ARROW_DEEP}
          strokeWidth="2.8"
        />

        {/* v0 marker */}
        <circle cx="80" cy="200" r="4" fill={ARROW_WARM} stroke="#1a1a1a" strokeWidth="1" />
        <text x="40" y="205" fontFamily="serif" fontSize="13" fontWeight="700" fill={ARROW_DEEP}>
          v₀
        </text>

        {/* Final v marker */}
        <circle cx="380" cy="100" r="4" fill={ARROW_WARM} stroke="#1a1a1a" strokeWidth="1" />
        <text x="395" y="98" fontFamily="serif" fontSize="13" fontWeight="700" fill={ARROW_DEEP}>
          v
        </text>

        {/* Slope label */}
        <line
          x1="270"
          y1="140"
          x2="320"
          y2="100"
          stroke={ARROW_WARM}
          strokeWidth="1.3"
          markerEnd="url(#vt-pointer)"
        />
        <text x="325" y="92" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          傾き = 加速度 a
        </text>

        {/* Area label */}
        <text x="200" y="200" fontFamily="serif" fontSize="13" fontWeight="700" fill={ARROW_DEEP} textAnchor="middle">
          面積 = 変位 x
        </text>
        <text x="200" y="220" fontFamily="serif" fontSize="11" fill="#4a4a4a" textAnchor="middle">
          x = v₀t + ½at²
        </text>

        {/* t marker */}
        <line x1="380" y1="240" x2="380" y2="252" stroke="#1a1a1a" strokeWidth="1.2" />
        <text x="380" y="266" fontFamily="serif" fontSize="12" fill="#1a1a1a" textAnchor="middle">
          t
        </text>
      </svg>
    ) : variant === "centripetal" ? (
      <svg
        viewBox="0 0 480 280"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="円運動の向心力：速度ベクトルが接線方向、加速度・力ベクトルが中心向き"
      >
        <defs>
          <marker
            id="cp-vel"
            markerWidth="12"
            markerHeight="12"
            refX="9"
            refY="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L10 6 L2 10 z" fill={ARROW_DEEP} />
          </marker>
          <marker
            id="cp-force"
            markerWidth="12"
            markerHeight="12"
            refX="9"
            refY="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L10 6 L2 10 z" fill={ARROW_WARM} />
          </marker>
        </defs>
        <rect width="480" height="280" fill="#fbf9f4" rx="6" stroke="#d8cfb8" />

        {/* Circle */}
        <circle cx="240" cy="140" r="90" fill="none" stroke={ARROW_DEEP} strokeWidth="1.6" strokeDasharray="2 3" />
        <circle cx="240" cy="140" r="3" fill="#1a1a1a" />
        <text x="246" y="158" fontFamily="serif" fontSize="12" fill="#4a4a4a">
          O
        </text>

        {/* radius */}
        <line x1="240" y1="140" x2="304" y2="76" stroke="#9a8c5a" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="276" y="100" fontFamily="serif" fontSize="12" fontWeight="700" fill="#4a4a4a" transform="rotate(-30 276 100)">
          r
        </text>

        {/* Mass at top-right of circle */}
        <circle cx="304" cy="76" r="8" fill="#fff" stroke="#1a1a1a" strokeWidth="1.6" />

        {/* Velocity vector (tangent) */}
        <line
          x1="304"
          y1="76"
          x2="358"
          y2="130"
          stroke={ARROW_DEEP}
          strokeWidth="2.6"
          markerEnd="url(#cp-vel)"
        />
        <text x="362" y="128" fontFamily="serif" fontSize="14" fontWeight="700" fill={ARROW_DEEP}>
          v
        </text>

        {/* Centripetal force/acceleration (toward center) */}
        <line
          x1="304"
          y1="76"
          x2="252"
          y2="128"
          stroke={ARROW_WARM}
          strokeWidth="2.8"
          markerEnd="url(#cp-force)"
        />
        <text x="226" y="118" fontFamily="serif" fontSize="14" fontWeight="700" fill={ARROW_WARM}>
          F = mv²/r
        </text>

        {/* Second position showing direction change */}
        <circle cx="328" cy="120" r="6" fill="#fff" stroke="#1a1a1a" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="328" y1="120" x2="338" y2="170" stroke={ARROW_DEEP} strokeWidth="1.6" strokeDasharray="3 3" markerEnd="url(#cp-vel)" />

        {/* Title */}
        <text x="240" y="252" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#6b6b6b" letterSpacing="0.16em">
          CIRCULAR MOTION · CENTRIPETAL FORCE
        </text>
      </svg>
    ) : variant === "shm-projection" ? (
      <svg
        viewBox="0 0 480 280"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="単振動：等速円運動を x軸に射影すると x=A sin(ωt+φ) になる"
      >
        <defs>
          <marker
            id="shm-arrow"
            markerWidth="12"
            markerHeight="12"
            refX="9"
            refY="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L10 6 L2 10 z" fill={ARROW_WARM} />
          </marker>
        </defs>
        <rect width="480" height="280" fill="#fbf9f4" rx="6" stroke="#d8cfb8" />

        {/* Circle (left side) */}
        <circle cx="120" cy="140" r="70" fill="none" stroke={ARROW_DEEP} strokeWidth="1.4" strokeDasharray="2 3" />
        <circle cx="120" cy="140" r="3" fill="#1a1a1a" />

        {/* Rotating point */}
        <circle cx="170" cy="91" r="6" fill={ARROW_WARM} stroke="#1a1a1a" strokeWidth="1.2" />
        <line x1="120" y1="140" x2="170" y2="91" stroke="#9a8c5a" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="142" y="115" fontFamily="serif" fontSize="11" fill="#4a4a4a">
          A
        </text>

        {/* Projection line down to x-axis */}
        <line x1="170" y1="91" x2="170" y2="220" stroke={ARROW_WARM} strokeWidth="1.2" strokeDasharray="2 2" />
        <circle cx="170" cy="220" r="5" fill={ARROW_WARM} stroke="#1a1a1a" strokeWidth="1.2" />

        {/* x-axis below circle */}
        <line x1="50" y1="220" x2="200" y2="220" stroke="#1a1a1a" strokeWidth="1.4" />
        <text x="58" y="240" fontFamily="serif" fontSize="11" fill="#4a4a4a">
          -A
        </text>
        <text x="116" y="240" fontFamily="serif" fontSize="11" fill="#4a4a4a">
          0
        </text>
        <text x="186" y="240" fontFamily="serif" fontSize="11" fill="#4a4a4a">
          +A
        </text>

        {/* Sine curve (right side) */}
        <line x1="240" y1="140" x2="450" y2="140" stroke="#1a1a1a" strokeWidth="1.4" markerEnd="url(#shm-arrow)" />
        <line x1="240" y1="60" x2="240" y2="220" stroke="#1a1a1a" strokeWidth="1.4" markerEnd="url(#shm-arrow)" />
        <text x="220" y="68" fontFamily="serif" fontSize="12" fontWeight="700">x</text>
        <text x="442" y="158" fontFamily="serif" fontSize="12" fontWeight="700">t</text>

        <path
          d="M240 140 Q260 70 280 140 T320 140 T360 140 T400 140 T440 140"
          stroke={ARROW_DEEP}
          strokeWidth="2.4"
          fill="none"
        />
        {/* Better sine */}
        <path
          d="M240 140
             C 254 60, 274 60, 290 140
             C 306 220, 326 220, 342 140
             C 358 60, 378 60, 394 140
             C 410 220, 430 220, 442 140"
          stroke={ARROW_DEEP}
          strokeWidth="2.6"
          fill="none"
        />

        {/* Connector arrow */}
        <line x1="200" y1="105" x2="260" y2="80" stroke={ARROW_WARM} strokeWidth="1.4" markerEnd="url(#shm-arrow)" />
        <text x="200" y="78" fontFamily="serif" fontSize="11" fontWeight="700" fill={ARROW_WARM}>
          射影
        </text>

        <text x="335" y="50" textAnchor="middle" fontFamily="serif" fontSize="13" fontWeight="700" fill={ARROW_DEEP}>
          x = A sin(ωt + φ)
        </text>

        <text x="240" y="262" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#6b6b6b" letterSpacing="0.16em">
          UNIFORM CIRCULAR MOTION → SIMPLE HARMONIC MOTION
        </text>
      </svg>
    ) : variant === "doppler" ? (
      <svg
        viewBox="0 0 480 280"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="ドップラー効果：音源が動くと進行方向で波長が縮み、後方で伸びる"
      >
        <defs>
          <marker
            id="dp-arrow"
            markerWidth="12"
            markerHeight="12"
            refX="9"
            refY="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L10 6 L2 10 z" fill={ARROW_WARM} />
          </marker>
        </defs>
        <rect width="480" height="280" fill="#fbf9f4" rx="6" stroke="#d8cfb8" />

        {/* Concentric circles (compressed forward, expanded backward) */}
        <g fill="none" stroke={ARROW_DEEP} strokeWidth="1.4">
          <ellipse cx="200" cy="140" rx="120" ry="120" />
          <ellipse cx="208" cy="140" rx="92" ry="92" />
          <ellipse cx="216" cy="140" rx="66" ry="66" />
          <ellipse cx="224" cy="140" rx="42" ry="42" />
          <ellipse cx="232" cy="140" rx="20" ry="20" />
        </g>

        {/* Source (moving right) */}
        <circle cx="240" cy="140" r="8" fill={ARROW_WARM} stroke="#1a1a1a" strokeWidth="1.4" />
        <line x1="240" y1="140" x2="280" y2="140" stroke={ARROW_WARM} strokeWidth="2.6" markerEnd="url(#dp-arrow)" />
        <text x="284" y="135" fontFamily="serif" fontSize="12" fontWeight="700" fill={ARROW_WARM}>
          v_s
        </text>

        {/* Observer right (高音 / f' up) */}
        <g transform="translate(380 100)">
          <circle r="14" fill="#fff" stroke="#1a1a1a" strokeWidth="1.4" />
          <text textAnchor="middle" y="4" fontFamily="serif" fontSize="11" fontWeight="700" fill="#1a1a1a">
            👂
          </text>
          <text textAnchor="middle" y="32" fontFamily="serif" fontSize="11" fontWeight="700" fill={ARROW_DEEP}>
            {"f' ↑"}
          </text>
        </g>

        {/* Observer left (低音 / f' down) */}
        <g transform="translate(60 180)">
          <circle r="14" fill="#fff" stroke="#1a1a1a" strokeWidth="1.4" />
          <text textAnchor="middle" y="4" fontFamily="serif" fontSize="11" fontWeight="700" fill="#1a1a1a">
            👂
          </text>
          <text textAnchor="middle" y="32" fontFamily="serif" fontSize="11" fontWeight="700" fill={ARROW_DEEP}>
            {"f' ↓"}
          </text>
        </g>

        <text x="380" y="62" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="700" fill="#1a1a1a">
          波長が縮む（前方）
        </text>
        <text x="60" y="232" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="700" fill="#1a1a1a">
          波長が伸びる（後方）
        </text>

        <text x="240" y="262" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#6b6b6b" letterSpacing="0.16em">
          DOPPLER EFFECT · WAVELENGTH SHIFT
        </text>
      </svg>
    ) : variant === "em-map" ? (
      <svg
        viewBox="0 0 480 300"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="高校物理 電磁気の単元構造マップ：静電気→直流回路→磁場→電磁誘導→交流"
      >
        <defs>
          <marker
            id="em-arrow"
            markerWidth="14"
            markerHeight="14"
            refX="11"
            refY="7"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L12 7 L2 12 z" fill={ARROW_DEEP} />
          </marker>
          <linearGradient id="em-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fbf6e8" />
            <stop offset="1" stopColor="#fbf9f4" />
          </linearGradient>
        </defs>
        <rect width="480" height="300" fill="url(#em-bg)" rx="6" stroke="#d8cfb8" />

        {[
          { x: 24, y: 60, label: "①静電気", sub: "E, V, Q" },
          { x: 24, y: 180, label: "②直流回路", sub: "I, R, V" },
          { x: 184, y: 120, label: "③磁場", sub: "B, Φ" },
          { x: 344, y: 60, label: "④電磁誘導", sub: "V=-dΦ/dt" },
          { x: 344, y: 180, label: "⑤交流回路", sub: "Z, X_L, X_C" },
        ].map((node) => (
          <g key={node.label}>
            <rect
              x={node.x}
              y={node.y}
              width="112"
              height="62"
              rx="4"
              fill="#ffffff"
              stroke={ARROW_DEEP}
              strokeWidth="1.4"
            />
            <rect x={node.x} y={node.y} width="112" height="6" fill={ARROW_WARM} />
            <text
              x={node.x + 56}
              y={node.y + 28}
              textAnchor="middle"
              fontFamily="serif"
              fontSize="14"
              fontWeight="700"
              fill="#1a1a1a"
            >
              {node.label}
            </text>
            <text
              x={node.x + 56}
              y={node.y + 48}
              textAnchor="middle"
              fontFamily="serif"
              fontSize="11"
              fill={ARROW_DEEP}
              fontWeight="700"
              letterSpacing="0.06em"
            >
              {node.sub}
            </text>
          </g>
        ))}

        {/* Arrows */}
        <line x1="80" y1="124" x2="80" y2="174" stroke={ARROW_DEEP} strokeWidth="2.6" markerEnd="url(#em-arrow)" />
        <line x1="136" y1="120" x2="180" y2="138" stroke={ARROW_DEEP} strokeWidth="2.6" markerEnd="url(#em-arrow)" />
        <line x1="136" y1="200" x2="180" y2="160" stroke={ARROW_DEEP} strokeWidth="2.6" markerEnd="url(#em-arrow)" />
        <line x1="296" y1="138" x2="340" y2="100" stroke={ARROW_DEEP} strokeWidth="2.6" markerEnd="url(#em-arrow)" />
        <line x1="400" y1="124" x2="400" y2="174" stroke={ARROW_DEEP} strokeWidth="2.6" markerEnd="url(#em-arrow)" />

        <text x="240" y="280" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#6b6b6b" letterSpacing="0.16em">
          ELECTROMAGNETISM · UNIT STRUCTURE MAP
        </text>
      </svg>
    ) : variant === "roadmap" ? (
      <svg
        viewBox="0 0 480 240"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="共通テスト物理対策の月別ロードマップ：11月→12月→直前期"
      >
        <defs>
          <linearGradient id="rm-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fbf6e8" />
            <stop offset="1" stopColor="#fbf9f4" />
          </linearGradient>
        </defs>
        <rect width="480" height="240" fill="url(#rm-bg)" rx="6" stroke="#d8cfb8" />

        {/* Timeline base */}
        <line x1="40" y1="120" x2="440" y2="120" stroke={ARROW_DEEP} strokeWidth="3" />

        {/* Phases */}
        {[
          { x: 80, label: "11月", sub: "過去問5年・誤答ノート", color: ARROW_DEEP },
          { x: 240, label: "12月", sub: "マーク模試形式", color: ARROW_DEEP },
          { x: 400, label: "直前2週間", sub: "解き直し・公式再確認", color: ARROW_WARM },
        ].map((phase) => (
          <g key={phase.label}>
            <circle cx={phase.x} cy="120" r="12" fill={phase.color} stroke="#1a1a1a" strokeWidth="1.4" />
            <text x={phase.x} y="124" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="700" fill="#fff">
              ✓
            </text>
            <text x={phase.x} y="80" textAnchor="middle" fontFamily="serif" fontSize="14" fontWeight="700" fill="#1a1a1a">
              {phase.label}
            </text>
            <text x={phase.x} y="158" textAnchor="middle" fontFamily="serif" fontSize="11" fill={ARROW_DEEP} fontWeight="700">
              {phase.sub}
            </text>
          </g>
        ))}

        <text x="240" y="210" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#6b6b6b" letterSpacing="0.16em">
          COMMON TEST PHYSICS · 3-PHASE ROADMAP
        </text>
      </svg>
    ) : variant === "retrieval" ? (
      <svg
        viewBox="0 0 480 260"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="リトリーバル練習：再読より想起練習が長期記憶を強化する"
      >
        <defs>
          <linearGradient id="rt-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fbf6e8" />
            <stop offset="1" stopColor="#fbf9f4" />
          </linearGradient>
        </defs>
        <rect width="480" height="260" fill="url(#rt-bg)" rx="6" stroke="#d8cfb8" />

        {/* Bars */}
        <text x="120" y="50" textAnchor="middle" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          再読（Re-read）
        </text>
        <rect x="60" y="70" width="120" height="36" fill="#cfd8e8" stroke="#1a1a1a" strokeWidth="1.2" />
        <text x="120" y="93" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="700" fill="#1a1a1a">
          記憶定着 ≈ 30%
        </text>

        <text x="360" y="50" textAnchor="middle" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          想起練習（Retrieval）
        </text>
        <rect x="240" y="70" width="240" height="36" fill={ARROW_WARM} stroke="#1a1a1a" strokeWidth="1.2" />
        <text x="360" y="93" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="700" fill="#1a1a1a">
          記憶定着 ≈ 60%（約2倍）
        </text>

        <text x="240" y="140" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#4a4a4a">
          Roediger &amp; Karpicke (2006) のメタ分析より
        </text>

        {/* Loop diagram */}
        <g transform="translate(60 170)">
          <circle cx="40" cy="20" r="18" fill="#fff" stroke={ARROW_DEEP} strokeWidth="1.4" />
          <text x="40" y="24" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="700" fill="#1a1a1a">学ぶ</text>
          <line x1="60" y1="20" x2="105" y2="20" stroke={ARROW_DEEP} strokeWidth="1.6" />
          <circle cx="125" cy="20" r="18" fill="#fff" stroke={ARROW_DEEP} strokeWidth="1.4" />
          <text x="125" y="24" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="700" fill="#1a1a1a">忘れる</text>
          <line x1="145" y1="20" x2="190" y2="20" stroke={ARROW_DEEP} strokeWidth="1.6" />
          <circle cx="210" cy="20" r="18" fill={ARROW_WARM} stroke="#1a1a1a" strokeWidth="1.4" />
          <text x="210" y="24" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="700" fill="#fff">想起</text>
          <line x1="230" y1="20" x2="275" y2="20" stroke={ARROW_DEEP} strokeWidth="1.6" />
          <circle cx="295" cy="20" r="18" fill="#fff" stroke={ARROW_DEEP} strokeWidth="1.4" />
          <text x="295" y="24" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="700" fill="#1a1a1a">定着</text>
        </g>

        <text x="240" y="244" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#6b6b6b" letterSpacing="0.16em">
          RETRIEVAL PRACTICE · TESTING EFFECT
        </text>
      </svg>
    ) : variant === "workflow" ? (
      <svg
        viewBox="0 0 480 220"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="教材作成のワークフロー：AI下書き → LaTeX整形 → PDF/Web展開"
      >
        <defs>
          <linearGradient id="wf-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fbf6e8" />
            <stop offset="1" stopColor="#fbf9f4" />
          </linearGradient>
          <marker
            id="wf-arrow"
            markerWidth="14"
            markerHeight="14"
            refX="11"
            refY="7"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L12 7 L2 12 z" fill={ARROW_DEEP} />
          </marker>
        </defs>
        <rect width="480" height="220" fill="url(#wf-bg)" rx="6" stroke="#d8cfb8" />

        {[
          { x: 24, label: "下書き", sub: "AI" },
          { x: 184, label: "整える", sub: "LaTeX" },
          { x: 344, label: "届ける", sub: "PDF / Web" },
        ].map((node) => (
          <g key={node.label}>
            <rect
              x={node.x}
              y="62"
              width="112"
              height="96"
              rx="4"
              fill="#ffffff"
              stroke={ARROW_DEEP}
              strokeWidth="1.4"
            />
            <rect x={node.x} y="62" width="112" height="6" fill={ARROW_WARM} />
            <text
              x={node.x + 56}
              y="108"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="18"
              fontWeight="700"
              fill="#1a1a1a"
            >
              {node.label}
            </text>
            <text
              x={node.x + 56}
              y="134"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="12"
              fill={ARROW_DEEP}
              fontWeight="700"
              letterSpacing="0.1em"
            >
              {node.sub}
            </text>
          </g>
        ))}

        {/* Arrows: stop short of next box so marker sits cleanly */}
        <line
          x1="142"
          y1="110"
          x2="172"
          y2="110"
          stroke={ARROW_DEEP}
          strokeWidth="3"
          markerEnd="url(#wf-arrow)"
        />
        <line
          x1="302"
          y1="110"
          x2="332"
          y2="110"
          stroke={ARROW_DEEP}
          strokeWidth="3"
          markerEnd="url(#wf-arrow)"
        />

        <text
          x="240"
          y="190"
          textAnchor="middle"
          fontFamily="serif"
          fontSize="11"
          fill="#6b6b6b"
          letterSpacing="0.16em"
        >
          MATERIAL CREATION FLOW
        </text>
      </svg>
    ) : variant === "learning-loop" ? (
      <svg
        viewBox="0 0 480 280"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="学習ループ：読む → 解く → 戻る → 続ける"
      >
        <defs>
          <linearGradient id="ll-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fbf6e8" />
            <stop offset="1" stopColor="#fbf9f4" />
          </linearGradient>
          <marker
            id="ll-arrow"
            markerWidth="14"
            markerHeight="14"
            refX="11"
            refY="7"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L12 7 L2 12 z" fill={ARROW_WARM} />
          </marker>
        </defs>
        <rect width="480" height="280" fill="url(#ll-bg)" rx="6" stroke="#d8cfb8" />

        {[
          { cx: 120, cy: 90, label: "読む", sub: "READ" },
          { cx: 360, cy: 90, label: "解く", sub: "SOLVE" },
          { cx: 360, cy: 200, label: "戻る", sub: "BACK" },
          { cx: 120, cy: 200, label: "続ける", sub: "CONTINUE" },
        ].map((p) => (
          <g key={p.label}>
            <circle
              cx={p.cx}
              cy={p.cy}
              r="44"
              fill="#ffffff"
              stroke={ARROW_DEEP}
              strokeWidth="1.6"
            />
            <text
              x={p.cx}
              y={p.cy - 4}
              textAnchor="middle"
              fontFamily="serif"
              fontSize="18"
              fontWeight="700"
              fill="#1a1a1a"
            >
              {p.label}
            </text>
            <text
              x={p.cx}
              y={p.cy + 14}
              textAnchor="middle"
              fontFamily="serif"
              fontSize="9"
              fill={ARROW_DEEP}
              fontWeight="700"
              letterSpacing="0.18em"
            >
              {p.sub}
            </text>
          </g>
        ))}

        {/* Top: 読む → 解く */}
        <path
          d="M170 80 Q240 50 308 80"
          stroke={ARROW_WARM}
          strokeWidth="2.6"
          fill="none"
          markerEnd="url(#ll-arrow)"
        />
        {/* Right: 解く → 戻る */}
        <path
          d="M360 138 L360 152"
          stroke={ARROW_WARM}
          strokeWidth="2.6"
          fill="none"
          markerEnd="url(#ll-arrow)"
        />
        {/* Bottom: 戻る → 続ける */}
        <path
          d="M310 210 Q240 240 170 210"
          stroke={ARROW_WARM}
          strokeWidth="2.6"
          fill="none"
          markerEnd="url(#ll-arrow)"
        />
        {/* Left: 続ける → 読む */}
        <path
          d="M120 152 L120 138"
          stroke={ARROW_WARM}
          strokeWidth="2.6"
          fill="none"
          markerEnd="url(#ll-arrow)"
        />

        <text
          x="240"
          y="155"
          textAnchor="middle"
          fontFamily="serif"
          fontSize="10"
          fill="#6b6b6b"
          letterSpacing="0.22em"
        >
          LEARNING LOOP
        </text>
      </svg>
    ) : (
      <svg
        viewBox="0 0 480 260"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="位置-時間グラフ：傾きが速さ、面積が移動距離"
      >
        <defs>
          <marker
            id="kin-arrow"
            markerWidth="12"
            markerHeight="12"
            refX="9"
            refY="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L10 6 L2 10 z" fill="#1a1a1a" />
          </marker>
          <marker
            id="kin-pointer"
            markerWidth="14"
            markerHeight="14"
            refX="11"
            refY="7"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2 2 L12 7 L2 12 z" fill={ARROW_WARM} />
          </marker>
        </defs>
        <rect width="480" height="260" fill="#fbf9f4" rx="6" stroke="#d8cfb8" />

        {/* Grid */}
        <g stroke="#e5dfd1" strokeWidth="0.6">
          {[60, 100, 140, 180].map((y) => (
            <line key={`h${y}`} x1="80" y1={y} x2="430" y2={y} />
          ))}
          {[140, 200, 260, 320, 380].map((x) => (
            <line key={`v${x}`} x1={x} y1="40" x2={x} y2="220" />
          ))}
        </g>

        {/* Axes (with arrowheads, ending well inside frame) */}
        <line
          x1="80"
          y1="220"
          x2="430"
          y2="220"
          stroke="#1a1a1a"
          strokeWidth="1.6"
          markerEnd="url(#kin-arrow)"
        />
        <line
          x1="80"
          y1="220"
          x2="80"
          y2="40"
          stroke="#1a1a1a"
          strokeWidth="1.6"
          markerEnd="url(#kin-arrow)"
        />

        <text x="46" y="50" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          位置 x
        </text>
        <text x="402" y="244" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          時刻 t
        </text>

        {/* Curve area + curve */}
        <path
          d="M80 220 Q180 215 250 160 T400 60 L400 220 L80 220 Z"
          fill={ARROW_DEEP}
          fillOpacity="0.10"
        />
        <path
          d="M80 220 Q180 215 250 160 T400 60"
          stroke={ARROW_DEEP}
          strokeWidth="2.6"
          fill="none"
        />

        {/* Tangent line at point */}
        <line
          x1="210"
          y1="200"
          x2="290"
          y2="120"
          stroke={ARROW_WARM}
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <circle cx="250" cy="160" r="5" fill={ARROW_WARM} stroke="#1a1a1a" strokeWidth="1" />

        {/* Annotations with leader lines */}
        <line
          x1="295"
          y1="118"
          x2="335"
          y2="92"
          stroke={ARROW_WARM}
          strokeWidth="1.3"
          markerEnd="url(#kin-pointer)"
        />
        <text x="338" y="88" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          傾き = 速さ v
        </text>

        <line
          x1="200"
          y1="205"
          x2="180"
          y2="245"
          stroke={ARROW_WARM}
          strokeWidth="1.3"
          markerEnd="url(#kin-pointer)"
        />
        <text x="40" y="252" fontFamily="serif" fontSize="13" fontWeight="700" fill={ARROW_DEEP}>
          面積 = 移動距離
        </text>
      </svg>
    );

  return (
    <figure className="lumora-figure">
      {svg}
      {caption ? <figcaption className="lumora-figure-caption">{caption}</figcaption> : null}
    </figure>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      rel="noreferrer noopener"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-7 overflow-x-auto rounded-[18px] ring-1 ring-[rgba(15,29,74,0.08)]">
      <table className="w-full border-collapse text-[0.92rem] leading-[1.7]" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-[#f1f5f9] text-[#0b1d4a]" {...props} />
  ),
  tbody: (props: ComponentPropsWithoutRef<"tbody">) => (
    <tbody className="divide-y divide-[rgba(15,29,74,0.06)] bg-white" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<"tr">) => <tr {...props} />,
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="px-4 py-3 text-left text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#0b1d4a]"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="px-4 py-3 align-top text-[#334155]" {...props} />
  ),
  img: ({ src, alt, width, height, ...rest }: ComponentPropsWithoutRef<"img">) => {
    if (!src || typeof src !== "string") return null;
    const w = typeof width === "number" ? width : Number(width) || 1200;
    const h = typeof height === "number" ? height : Number(height) || 675;
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={w}
        height={h}
        sizes="(min-width: 768px) 720px, 100vw"
        className="my-7 h-auto w-full rounded-[18px] ring-1 ring-[rgba(15,29,74,0.06)]"
        {...rest}
      />
    );
  },
  Callout,
  KeyPoints,
  StepBlock,
  Comparison,
  Faq,
  Toc,
  CtaCard,
  Figure,
  GraphIllustration,
};
