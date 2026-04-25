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
  const svg =
    variant === "workflow" ? (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="教材作成のワークフロー">
        <defs>
          <linearGradient id="wf-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#e0f2fe" />
            <stop offset="1" stopColor="#fef3c7" />
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill="url(#wf-bg)" rx="20" />
        {[
          { x: 32, label: "下書き", sub: "AI" },
          { x: 156, label: "整える", sub: "LaTeX" },
          { x: 280, label: "届ける", sub: "PDF / Web" },
        ].map((node) => (
          <g key={node.label}>
            <rect x={node.x} y="74" width="92" height="76" rx="14" fill="#ffffff" stroke="#bae6fd" />
            <text x={node.x + 46} y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0b1220">
              {node.label}
            </text>
            <text x={node.x + 46} y="130" textAnchor="middle" fontSize="11" fill="#0369a1" fontWeight="600">
              {node.sub}
            </text>
          </g>
        ))}
        <path d="M124 112 L156 112" stroke="#0ea5e9" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <path d="M248 112 L280 112" stroke="#0ea5e9" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#0ea5e9" />
          </marker>
        </defs>
      </svg>
    ) : variant === "learning-loop" ? (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="読む → 解く → 戻る → 続ける の学習ループ">
        <defs>
          <linearGradient id="ll-bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fef3c7" />
            <stop offset="1" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#ll-bg)" rx="20" />
        {[
          { cx: 100, cy: 80, label: "読む" },
          { cx: 300, cy: 80, label: "解く" },
          { cx: 300, cy: 170, label: "戻る" },
          { cx: 100, cy: 170, label: "続ける" },
        ].map((p) => (
          <g key={p.label}>
            <circle cx={p.cx} cy={p.cy} r="36" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
            <text x={p.cx} y={p.cy + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0b1220">
              {p.label}
            </text>
          </g>
        ))}
        <path
          d="M136 80 Q200 50 264 80"
          stroke="#fbbf24"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrow2)"
        />
        <path
          d="M300 116 Q330 125 300 134"
          stroke="#fbbf24"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrow2)"
        />
        <path
          d="M264 170 Q200 200 136 170"
          stroke="#fbbf24"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrow2)"
        />
        <path
          d="M100 134 Q70 125 100 116"
          stroke="#fbbf24"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrow2)"
        />
        <defs>
          <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#fbbf24" />
          </marker>
        </defs>
      </svg>
    ) : (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="位置-時間グラフの傾きと面積">
        <rect width="400" height="220" fill="#f0f9ff" rx="20" />
        <line x1="60" y1="170" x2="370" y2="170" stroke="#0b1220" strokeWidth="2" />
        <line x1="60" y1="30" x2="60" y2="170" stroke="#0b1220" strokeWidth="2" />
        <text x="32" y="42" fontSize="11" fontWeight="600" fill="#475569">
          位置
        </text>
        <text x="346" y="190" fontSize="11" fontWeight="600" fill="#475569">
          時刻
        </text>
        <path d="M60 170 Q160 165 230 110 T370 30" stroke="#0ea5e9" strokeWidth="3" fill="none" />
        <path d="M60 170 Q160 165 230 110 T370 30 L370 170 L60 170Z" fill="#bae6fd" opacity="0.45" />
        <circle cx="230" cy="110" r="6" fill="#fbbf24" />
        <text x="240" y="100" fontSize="11" fontWeight="700" fill="#0b1220">
          傾き = 速さ
        </text>
        <text x="190" y="150" fontSize="11" fontWeight="700" fill="#0c4a6e">
          面積 = 距離
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
