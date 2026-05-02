import katex from "katex";
import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function renderWithMath(text: string): ReactNode {
  if (!text) return text;
  // Auto-promote bare Unicode physics expressions (no $) to LaTeX so frontmatter
  // descriptions like "T=2π√(m/k)" render as proper math without authors having
  // to wrap them in $...$ themselves.
  const normalized = text.includes("$") ? text : autoLatexize(text);
  if (!normalized.includes("$")) return text;

  const parts: ReactNode[] = [];
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(normalized)) !== null) {
    if (match.index > lastIndex) {
      parts.push(normalized.slice(lastIndex, match.index));
    }
    const isDisplay = match[1] !== undefined;
    const expr = (match[1] ?? match[2] ?? "").trim();
    const html = katex.renderToString(expr, {
      throwOnError: false,
      // `htmlAndMathml` (KaTeX default) doubles HTML size by emitting both a
      // visual HTML tree and a MathML annotation. We render visual-only —
      // 800KB article HTML drops by ~35% on math-heavy physics articles.
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
  if (lastIndex < normalized.length) parts.push(normalized.slice(lastIndex));
  return parts.length ? parts : text;
}

/**
 * Convert bare Unicode physics expressions inside a plain string into $...$
 * LaTeX so renderWithMath() can typeset them. Recognises common patterns:
 *  - T=2π√(m/k)  →  $T = 2\pi\sqrt{m/k}$
 *  - x(t)=A sin(ωt+φ)  →  $x(t) = A\sin(\omega t + \varphi)$
 *  - F=mv²/r  →  $F = mv^2/r$
 * Conservative: only wraps tokens that look unambiguously like math.
 */
function autoLatexize(text: string): string {
  // 1. Simple "X=Y" forms with math glyphs (π, √, ω, φ, ², ³, /, ±, ∓, etc.)
  // 2. Function-call forms: x(t)=A sin(ωt+φ)
  const greekMap: Record<string, string> = {
    π: "\\pi",
    ω: "\\omega",
    φ: "\\varphi",
    θ: "\\theta",
    Δ: "\\Delta",
    α: "\\alpha",
    β: "\\beta",
    ε: "\\varepsilon",
    μ: "\\mu",
    ρ: "\\rho",
    Σ: "\\Sigma",
    Φ: "\\Phi",
    Ψ: "\\Psi",
  };
  const supMap: Record<string, string> = {
    "²": "^2",
    "³": "^3",
    "⁴": "^4",
  };
  // Detect a "math token" by scanning for chunks containing at least one math
  // glyph (π, √, ω, φ, ², ³, ±, ∓) plus optional letters/digits/operators.
  // Stop at Japanese characters, spaces (unless inside parens), comma, period,
  // closing 】、 etc.
  const tokenPattern = /([A-Za-z][A-Za-z0-9_]*\([^)]+\))?\s*=?\s*[A-Za-z0-9π√ω φε∓±⁰-⁹·²³⁴/().,\\^_+\-]*[π√ω φε∓±²³]+[A-Za-z0-9π√ω φε∓±⁰-⁹·²³⁴/().,\\^_+\-]*/gu;

  // Heuristic: split into segments and wrap matched ones in $...$.
  // Simpler approach: find compact patterns and wrap them.
  // We'll do a series of targeted regex replacements for common forms.

  let s = text;

  // Replace √(...) with \sqrt{...}
  s = s.replace(/√\(([^)]+)\)/g, "\\sqrt{$1}");
  // Replace inline √x (single token after) — rare in JP text
  // Skip to keep conservative.

  // Replace × superscript chars with ^N
  s = s.replace(/[²³⁴]/g, (m) => supMap[m] ?? m);

  // Replace bare Greek letters with LaTeX commands (only when surrounded by math context)
  // We do this only inside likely-math tokens, identified below.

  // Identify candidate math tokens: contiguous runs that contain at least one
  // unambiguous math glyph from the set { π, \sqrt, ω, φ, ε, ², ³, ⁴, =, ± }
  // and consist of ASCII letters/digits/operators/Greek/spaces.
  // Wrap each such token with $...$.
  const candidateRe =
    /([A-Za-z][A-Za-z0-9_]*(?:\([^)　-鿿]+\))?\s*=\s*[^、。」』】\n（）぀-ヿ一-鿿]*?(?:\\sqrt\{[^}]+\}|[πωφεμρΣΦΨ]|\^[0-9]|±|∓)[^、。」』】\n（）぀-ヿ一-鿿]*?)(?=[、。」』】\n（）぀-ヿ一-鿿]|$)/gu;

  s = s.replace(candidateRe, (match) => {
    let inner = match;
    // Replace remaining Greek letters with LaTeX commands.
    inner = inner.replace(/[πωφθΔαβεμρΣΦΨ]/g, (g) => `${greekMap[g] ?? g}`);
    // Insert space after \pi, \omega, etc. when followed by a letter/number to
    // avoid \pisqrt-like glue.
    inner = inner.replace(
      /(\\(?:pi|omega|varphi|theta|Delta|alpha|beta|varepsilon|mu|rho|Sigma|Phi|Psi))(?=[A-Za-z])/g,
      "$1 ",
    );
    // Wrap function names so KaTeX renders them upright instead of italic
    // letter-by-letter (e.g. "sin" → "\sin", "cos" → "\cos").
    inner = inner.replace(
      /(?<![A-Za-z\\])(sin|cos|tan|sec|csc|cot|log|ln|exp|max|min)(?![A-Za-z])/g,
      "\\$1 ",
    );
    // Replace · (middle dot) with \cdot and remove stray spaces around it.
    inner = inner.replace(/\s*[·∙⋅]\s*/g, " \\cdot ");
    // Normalize " " spaces inside math.
    return `$${inner.trim()}$`;
  });

  return s;
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
      <p className="lumora-toc-title">{renderWithMath(title)}</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{renderWithMath(item.label)}</a>
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
  image?: string;
  imageAlt?: string;
  imageLayout?: "wide" | "book";
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

function CtaCard({
  eyebrow = "Solvora",
  title,
  body,
  image,
  imageAlt,
  imageLayout = "wide",
  primary,
  secondary,
}: CtaCardProps) {
  const isBookImage = imageLayout === "book";

  return (
    <aside className="lumora-cta-card">
      {image ? (
        <div className={`lumora-cta-card-image lumora-cta-card-image-${imageLayout}`}>
          <Image
            src={image}
            alt={imageAlt ?? title}
            width={isBookImage ? 857 : 1536}
            height={isBookImage ? 1328 : 1024}
            sizes={isBookImage ? "(min-width: 768px) 240px, 56vw" : "(min-width: 768px) 640px, 100vw"}
            className="h-auto w-full"
          />
        </div>
      ) : null}
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

type FormulaCardProps = {
  /** Eyebrow label rendered above the equation, e.g. "ドップラー効果の公式". */
  label?: string;
  /**
   * Raw LaTeX expression (no surrounding `$`). Server-rendered into HTML by
   * KaTeX so the formula card prints fully styled in the SSR HTML — no
   * client-side JS or font flash on first paint.
   */
  tex: string;
  /** Optional caption shown below the equation. */
  caption?: string;
};

function FormulaCard({ label = "公式", tex, caption }: FormulaCardProps) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    output: "html",
    displayMode: true,
    strict: "ignore",
  });

  return (
    <aside className="lumora-formula-card" role="figure" aria-label={label}>
      <span className="lumora-formula-card-eyebrow">{label}</span>
      <div
        className="lumora-formula-card-equation"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {caption ? (
        <p className="lumora-formula-card-caption">{renderWithMath(caption)}</p>
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
    | "doppler-oblique"
    | "doppler-reflection"
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
    ) : variant === "doppler-oblique" ? (
      // Strict geometry. S=(100,210), O=(460,210). v_s makes 35° above the
      // horizontal line-of-sight, length 150:
      //   tip T  = (100 + 150·cos35°, 210 − 150·sin35°) = (222.87, 123.96)
      //   foot F = (222.87, 210)             (perpendicular drop onto LoS)
      //   |v_s cosθ| = 150·cos35° = 122.87   (drawn along +x from S to F)
      // Arc of θ is centred at S with radius 38:
      //   start (on LoS):     (100 + 38, 210)              = (138, 210)
      //   end   (on v_s ray): (100 + 38·cos35°, 210 − 38·sin35°)
      //                     = (131.13, 188.20)
      //   sweep-flag = 0  (counter-clockwise in SVG screen-coords → arc goes
      //                    upward from +x ray, which is what we want).
      // θ label sits on the bisector at radius 24, angle 17.5° above +x:
      //   (100 + 24·cos17.5°, 210 − 24·sin17.5°) = (122.89, 202.78)
      //   text-anchor=middle, baseline y=207 ⇒ glyph visually centred at the
      //   bisector point and clearly inside the arc, between the two rays.
      <svg
        viewBox="0 0 540 320"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="斜め方向のドップラー効果：音源 S の速度ベクトル v_s を視線方向 SO に射影すると、有効成分は v_s cosθ になる"
      >
        <defs>
          <marker
            id="dpo-arrow-warm"
            markerWidth="11"
            markerHeight="11"
            refX="9"
            refY="5.5"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M1 1 L10 5.5 L1 10 z" fill={ARROW_WARM} />
          </marker>
          <marker
            id="dpo-arrow-deep"
            markerWidth="11"
            markerHeight="11"
            refX="9"
            refY="5.5"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M1 1 L10 5.5 L1 10 z" fill={ARROW_DEEP} />
          </marker>
        </defs>
        <rect width="540" height="320" fill="#fbf9f4" rx="6" stroke="#d8cfb8" />

        {/* Title — top, centred, well above all geometry */}
        <text x="270" y="26" textAnchor="middle" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          斜め方向のドップラー効果：cosθ 補正
        </text>

        {/* Line of sight S→O */}
        <line x1="100" y1="210" x2="460" y2="210" stroke="#8a8270" strokeWidth="1.2" strokeDasharray="4 4" />
        <text x="362" y="204" fontFamily="serif" fontSize="11" fontWeight="700" fill="#6b6b6b">
          視線方向
        </text>

        {/* Foot-of-perpendicular dashed line: T=(222.87, 123.96) → F=(222.87, 210) */}
        <line x1="222.87" y1="123.96" x2="222.87" y2="210" stroke="#9a8c5a" strokeWidth="1.2" strokeDasharray="2 3" />
        {/* Right-angle marker at F: 8px L pointing into the angle region */}
        <path d="M 214.87 210 L 214.87 202 L 222.87 202" fill="none" stroke="#9a8c5a" strokeWidth="1" />

        {/* v_s cosθ — projection along LoS, ends at (210, 210) so the arrowhead
             sits clear of the right-angle marker at x∈[214.87, 222.87] */}
        <line
          x1="100"
          y1="210"
          x2="210"
          y2="210"
          stroke={ARROW_DEEP}
          strokeWidth="3"
          markerEnd="url(#dpo-arrow-deep)"
        />
        {/* projection label — below the LoS, clear of the θ arc & v_s vector */}
        <text x="155" y="232" textAnchor="middle" fontFamily="serif" fontSize="13" fontWeight="700" fill={ARROW_DEEP}>
          v_s cosθ
        </text>

        {/* v_s — actual velocity vector, 35° above LoS, length 150, tip at T */}
        <line
          x1="100"
          y1="210"
          x2="222.87"
          y2="123.96"
          stroke={ARROW_WARM}
          strokeWidth="3"
          markerEnd="url(#dpo-arrow-warm)"
        />
        {/* v_s label — perpendicular-offset above-left of vector midpoint
             (midpoint ≈ (161.4, 167.0); label at (138, 158) sits ~13px above
             the vector line and clear of the θ arc which never goes above y=188) */}
        <text x="138" y="158" fontFamily="serif" fontSize="13" fontWeight="700" fill={ARROW_WARM}>
          v_s
        </text>

        {/* Angle θ arc at S, radius 38 — start (138,210) on +x, end (131.13,188.20) on v_s ray */}
        <path d="M 138 210 A 38 38 0 0 0 131.13 188.20" fill="none" stroke="#1a1a1a" strokeWidth="1.4" />
        {/* θ label — on the bisector at radius 24, angle 17.5°, inside the arc */}
        <text x="123" y="207" textAnchor="middle" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          θ
        </text>

        {/* Source point S — drawn after lines so it sits on top */}
        <circle cx="100" cy="210" r="6" fill={ARROW_WARM} stroke="#1a1a1a" strokeWidth="1.4" />
        <text x="76" y="216" textAnchor="end" fontFamily="serif" fontSize="12" fontWeight="700" fill="#1a1a1a">
          S
        </text>
        <text x="76" y="232" textAnchor="end" fontFamily="serif" fontSize="10" fontWeight="700" fill={ARROW_WARM}>
          音源
        </text>

        {/* Observer point O */}
        <circle cx="460" cy="210" r="6" fill="#fff" stroke="#1a1a1a" strokeWidth="1.6" />
        <text x="484" y="216" fontFamily="serif" fontSize="12" fontWeight="700" fill="#1a1a1a">
          O
        </text>
        <text x="484" y="232" fontFamily="serif" fontSize="10" fontWeight="700" fill={ARROW_DEEP}>
          観測者
        </text>

        {/* Annotation panel — well below the geometry (y ≥ 262) */}
        <rect x="70" y="262" width="400" height="44" rx="6" fill="#ffffff" stroke="#d8cfb8" strokeWidth="1" />
        <text x="270" y="282" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="700" fill="#1a1a1a">
          視線方向成分 v_s cosθ だけが f′ に効く
        </text>
        <text x="270" y="298" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="700" fill={ARROW_DEEP}>
          f′ = f · V ÷ (V − v_s cosθ)
        </text>
      </svg>
    ) : variant === "doppler-reflection" ? (
      // Two parallel "lanes": outbound (top, warm) at y=130, return (bottom,
      // deep) at y=200. Title at y≈26, outbound badge at y=44–72, outbound
      // endpoint labels at y≈118 (above arrow), source/wall icons at y≈80–192,
      // return endpoint labels at y≈220 (below arrow), return badge at
      // y=240–268, credit at y≈302. No two text rows share a y-range.
      <svg
        viewBox="0 0 540 320"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="反射音のドップラー効果：壁を①観測者、②音源として 2 段階で公式を適用する"
      >
        <defs>
          <marker
            id="dpr-arrow-deep"
            markerWidth="11"
            markerHeight="11"
            refX="9"
            refY="5.5"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M1 1 L10 5.5 L1 10 z" fill={ARROW_DEEP} />
          </marker>
          <marker
            id="dpr-arrow-warm"
            markerWidth="11"
            markerHeight="11"
            refX="9"
            refY="5.5"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M1 1 L10 5.5 L1 10 z" fill={ARROW_WARM} />
          </marker>
        </defs>
        <rect width="540" height="320" fill="#fbf9f4" rx="6" stroke="#d8cfb8" />

        {/* Title (y ≈ 26) */}
        <text x="270" y="26" textAnchor="middle" fontFamily="serif" fontSize="13" fontWeight="700" fill="#1a1a1a">
          反射音のドップラー効果：壁を 2 回使う
        </text>

        {/* Outbound badge (y = 44–72) */}
        <rect x="170" y="44" width="200" height="28" rx="14" fill="#ffffff" stroke={ARROW_WARM} strokeWidth="1.4" />
        <text x="270" y="63" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="700" fill="#1a1a1a">
          ① 音源 → 壁（壁＝観測者）
        </text>

        {/* Source/observer car (left column, y = 152–192) */}
        <rect x="60" y="152" width="78" height="40" rx="6" fill="#ffffff" stroke="#1a1a1a" strokeWidth="1.4" />
        <text x="99" y="170" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="700" fill="#1a1a1a">
          音源
        </text>
        <text x="99" y="186" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="700" fill="#1a1a1a">
          ／観測者
        </text>

        {/* Wall (right column, y = 80–250) */}
        <rect x="412" y="80" width="14" height="170" fill="#cfd8e8" stroke="#1a1a1a" strokeWidth="1.4" />
        <g>
          {[96, 114, 132, 150, 168, 186, 204, 222, 240].map((y) => (
            <line key={`hatch-${y}`} x1="426" y1={y} x2="438" y2={y - 8} stroke="#1a1a1a" strokeWidth="1" />
          ))}
        </g>
        <text x="419" y="74" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="700" fill="#1a1a1a">
          壁
        </text>

        {/* Outbound arrow at y = 130 — between car (y=152) and badge (y=72): clean gap */}
        <line
          x1="142"
          y1="130"
          x2="408"
          y2="130"
          stroke={ARROW_WARM}
          strokeWidth="3"
          markerEnd="url(#dpr-arrow-warm)"
        />
        {/* Outbound endpoint labels (y = 118, above arrow): emit-side and receive-side */}
        <text x="160" y="118" fontFamily="serif" fontSize="11" fontWeight="700" fill={ARROW_WARM}>
          f, v_s
        </text>
        <text x="392" y="118" textAnchor="end" fontFamily="serif" fontSize="11" fontWeight="700" fill={ARROW_WARM}>
          壁が受信 f₁
        </text>

        {/* Return arrow at y = 200 — between car (y=192) and return badge (y=240): clean gap */}
        <line
          x1="408"
          y1="200"
          x2="142"
          y2="200"
          stroke={ARROW_DEEP}
          strokeWidth="3"
          markerEnd="url(#dpr-arrow-deep)"
        />
        {/* Return endpoint labels (y = 220, below arrow) */}
        <text x="392" y="220" textAnchor="end" fontFamily="serif" fontSize="11" fontWeight="700" fill={ARROW_DEEP}>
          壁が再送 f₁
        </text>
        <text x="160" y="220" fontFamily="serif" fontSize="11" fontWeight="700" fill={ARROW_DEEP}>
          観測 f₂
        </text>

        {/* Return badge (y = 240–268) */}
        <rect x="170" y="240" width="200" height="28" rx="14" fill="#ffffff" stroke={ARROW_DEEP} strokeWidth="1.4" />
        <text x="270" y="259" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="700" fill="#1a1a1a">
          ② 壁 → 観測者（壁＝音源）
        </text>

        {/* Caption strip (y ≈ 298) */}
        <text x="270" y="298" textAnchor="middle" fontFamily="serif" fontSize="10" fill="#6b6b6b" letterSpacing="0.18em">
          REFLECTED DOPPLER · TWO-STEP APPLICATION
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
    <div className="article-table-scroll">
      <table {...props} />
    </div>
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
  FormulaCard,
  GraphIllustration,
};
