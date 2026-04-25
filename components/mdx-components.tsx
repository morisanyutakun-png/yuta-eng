import type { ComponentPropsWithoutRef, ReactNode } from "react";

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
      {title ? <p className="lumora-callout-title">{title}</p> : null}
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
          <li key={item}>{item}</li>
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
            <p className="lumora-step-title">{step.title}</p>
            <p className="lumora-step-body">{step.body}</p>
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
            <p className="lumora-comparison-label">{row.label}</p>
          </div>
          <div className="lumora-comparison-cell">
            <p className="lumora-comparison-value">{row.value}</p>
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
          <p className="lumora-faqitem-q">{item.q}</p>
          <p className="lumora-faqitem-a">{item.a}</p>
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

function CtaCard({ eyebrow = "Lumora", title, body, primary, secondary }: CtaCardProps) {
  return (
    <aside className="lumora-cta-card">
      <span className="lumora-cta-card-eyebrow">{eyebrow}</span>
      <p className="lumora-cta-card-title">{title}</p>
      <p className="lumora-cta-card-body">{body}</p>
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
      {caption ? <figcaption className="lumora-figure-caption">{caption}</figcaption> : null}
    </figure>
  );
}

type GraphIllustrationProps = {
  variant?: "kinematic" | "workflow" | "learning-loop";
  caption?: string;
};

function GraphIllustration({ variant = "kinematic", caption }: GraphIllustrationProps) {
  const ARROW_DEEP = "#1f3a6b";
  const ARROW_WARM = "#c89211";

  const svg =
    variant === "workflow" ? (
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
