import { cn } from "@/lib/utils";

type IntentVariant = "physics" | "materials" | "apps";

type IntentVisualProps = {
  variant: IntentVariant;
  className?: string;
};

export function HeroMeshOverlay({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("hero-mesh-svg absolute inset-0 h-full w-full", className)}
      fill="none"
      viewBox="0 0 1000 1000"
    >
      <defs>
        <linearGradient id="heroMeshGradient" x1="130" x2="850" y1="220" y2="760">
          <stop offset="0%" stopColor="rgba(96,165,250,0.14)" />
          <stop offset="45%" stopColor="rgba(110,231,255,0.48)" />
          <stop offset="100%" stopColor="rgba(251,191,36,0.22)" />
        </linearGradient>
      </defs>

      <path
        className="hero-mesh-path"
        d="M116 292C248 182 396 156 504 212C618 272 706 414 860 396"
        stroke="url(#heroMeshGradient)"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path
        className="hero-mesh-path hero-mesh-path-delay"
        d="M156 664C280 570 418 516 546 560C670 604 770 722 884 694"
        stroke="url(#heroMeshGradient)"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path
        className="hero-mesh-soft"
        d="M226 420C332 388 434 420 522 502C612 590 710 614 796 578"
        stroke="rgba(148,163,184,0.26)"
        strokeLinecap="round"
        strokeWidth="2"
      />

      {[
        { cx: 194, cy: 270, r: 14 },
        { cx: 476, cy: 216, r: 12 },
        { cx: 706, cy: 368, r: 10 },
        { cx: 298, cy: 598, r: 13 },
        { cx: 624, cy: 598, r: 11 },
        { cx: 818, cy: 676, r: 12 },
      ].map((node) => (
        <g className="hero-mesh-node" key={`${node.cx}-${node.cy}`}>
          <circle cx={node.cx} cy={node.cy} fill="rgba(255,255,255,0.24)" r={node.r + 10} />
          <circle cx={node.cx} cy={node.cy} fill="rgba(125,211,252,0.72)" r={node.r} />
          <circle cx={node.cx} cy={node.cy} fill="#fff" r={node.r / 2.6} />
        </g>
      ))}
    </svg>
  );
}

export function IntentVisual({ variant, className }: IntentVisualProps) {
  if (variant === "physics") {
    return (
      <svg
        aria-hidden="true"
        className={cn("intent-visual-svg", className)}
        fill="none"
        viewBox="0 0 320 180"
      >
        <rect
          fill="rgba(255,255,255,0.68)"
          height="144"
          rx="26"
          width="280"
          x="20"
          y="18"
        />
        <path
          d="M54 122H266"
          stroke="rgba(14,165,233,0.24)"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M78 134V50"
          stroke="rgba(14,165,233,0.24)"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          className="intent-visual-line"
          d="M78 95C100 95 100 64 122 64C146 64 146 128 170 128C196 128 196 76 224 76C238 76 250 88 260 96"
          stroke="#3b82f6"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <circle cx="122" cy="64" fill="#bfdbfe" r="8" />
        <circle cx="170" cy="128" fill="#7dd3fc" r="8" />
        <path d="M218 52L254 52" stroke="rgba(15,23,42,0.26)" strokeLinecap="round" strokeWidth="4" />
        <path d="M218 68L238 68" stroke="rgba(15,23,42,0.18)" strokeLinecap="round" strokeWidth="4" />
        <rect fill="rgba(59,130,246,0.12)" height="26" rx="13" width="78" x="54" y="26" />
        <text fill="#2563eb" fontSize="12" fontWeight="700" x="76" y="43">
          Physics
        </text>
      </svg>
    );
  }

  if (variant === "materials") {
    return (
      <svg
        aria-hidden="true"
        className={cn("intent-visual-svg", className)}
        fill="none"
        viewBox="0 0 320 180"
      >
        <rect
          fill="rgba(255,255,255,0.7)"
          height="144"
          rx="26"
          width="280"
          x="20"
          y="18"
        />
        <rect fill="rgba(251,191,36,0.14)" height="98" rx="18" width="118" x="42" y="40" />
        <rect fill="#fff" height="74" rx="14" width="92" x="55" y="52" />
        <path d="M72 70H132" stroke="#f59e0b" strokeLinecap="round" strokeWidth="5" />
        <path d="M72 84H118" stroke="rgba(15,23,42,0.2)" strokeLinecap="round" strokeWidth="4" />
        <path d="M72 98H128" stroke="rgba(15,23,42,0.12)" strokeLinecap="round" strokeWidth="4" />
        <path d="M72 112H108" stroke="rgba(15,23,42,0.12)" strokeLinecap="round" strokeWidth="4" />
        <rect fill="rgba(96,165,250,0.12)" height="84" rx="20" width="108" x="176" y="46" />
        <path
          className="intent-visual-line intent-visual-line-warm"
          d="M194 94C212 70 230 70 246 94C260 114 268 116 284 96"
          stroke="#f59e0b"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <circle cx="214" cy="76" fill="#fde68a" r="10" />
        <circle cx="246" cy="68" fill="#bfdbfe" r="8" />
        <circle cx="278" cy="78" fill="#a7f3d0" r="7" />
        <path d="M196 124H260" stroke="rgba(15,23,42,0.16)" strokeLinecap="round" strokeWidth="4" />
        <rect fill="rgba(245,158,11,0.14)" height="26" rx="13" width="94" x="190" y="24" />
        <text fill="#c2410c" fontSize="12" fontWeight="700" x="210" y="41">
          Materials
        </text>
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={cn("intent-visual-svg", className)}
      fill="none"
      viewBox="0 0 320 180"
    >
      <rect
        fill="rgba(255,255,255,0.68)"
        height="144"
        rx="26"
        width="280"
        x="20"
        y="18"
      />
      <rect fill="rgba(59,130,246,0.12)" height="94" rx="24" width="108" x="42" y="44" />
      <rect fill="#fff" height="70" rx="18" width="82" x="55" y="56" />
      <circle cx="96" cy="92" fill="none" r="20" stroke="#3b82f6" strokeWidth="6" />
      <path d="M96 92L110 78" stroke="#3b82f6" strokeLinecap="round" strokeWidth="6" />
      <rect fill="rgba(16,185,129,0.16)" height="94" rx="24" width="108" x="170" y="44" />
      <rect fill="#fff" height="70" rx="18" width="82" x="183" y="56" />
      <path d="M198 108L198 80" stroke="#10b981" strokeLinecap="round" strokeWidth="10" />
      <path d="M224 108L224 68" stroke="#34d399" strokeLinecap="round" strokeWidth="10" />
      <path d="M250 108L250 88" stroke="#5eead4" strokeLinecap="round" strokeWidth="10" />
      <path
        className="intent-visual-line"
        d="M150 92C164 92 170 72 184 72"
        stroke="#93c5fd"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path
        className="intent-visual-line intent-visual-line-delay"
        d="M138 102C154 102 166 122 182 122"
        stroke="#6ee7b7"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <rect fill="rgba(59,130,246,0.14)" height="26" rx="13" width="64" x="42" y="22" />
      <text fill="#2563eb" fontSize="12" fontWeight="700" x="64" y="39">
        Apps
      </text>
    </svg>
  );
}

export function LearningFlowDiagram({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("flow-diagram-svg h-auto w-full", className)}
      fill="none"
      viewBox="0 0 420 250"
    >
      <defs>
        <linearGradient id="flowTrackGradient" x1="48" x2="372" y1="32" y2="206">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="55%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>

      <path
        className="flow-diagram-track"
        d="M84 120C116 56 184 40 242 68C286 88 314 130 328 168"
        stroke="url(#flowTrackGradient)"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <path
        className="flow-diagram-track flow-diagram-track-delay"
        d="M88 142C138 188 206 204 270 182C308 170 336 146 352 120"
        stroke="url(#flowTrackGradient)"
        strokeLinecap="round"
        strokeWidth="4"
      />

      {[
        { cx: 82, cy: 130, fill: "#0ea5e9", label: "Blog" },
        { cx: 210, cy: 66, fill: "#60a5fa", label: "Build" },
        { cx: 336, cy: 166, fill: "#34d399", label: "Apps" },
      ].map((node) => (
        <g className="flow-node" key={node.label}>
          <circle cx={node.cx} cy={node.cy} fill="rgba(255,255,255,0.14)" r="26" />
          <circle cx={node.cx} cy={node.cy} fill={node.fill} r="16" />
          <circle cx={node.cx} cy={node.cy} fill="#fff" r="6" />
        </g>
      ))}

      <g className="flow-card">
        <rect
          fill="rgba(255,255,255,0.08)"
          height="52"
          rx="18"
          width="92"
          x="34"
          y="154"
        />
        <text fill="#e0f2fe" fontSize="13" fontWeight="700" x="54" y="186">
          読む
        </text>
      </g>
      <g className="flow-card flow-card-delay">
        <rect
          fill="rgba(255,255,255,0.08)"
          height="52"
          rx="18"
          width="112"
          x="154"
          y="16"
        />
        <text fill="#dbeafe" fontSize="13" fontWeight="700" x="177" y="48">
          形にする
        </text>
      </g>
      <g className="flow-card">
        <rect
          fill="rgba(255,255,255,0.08)"
          height="52"
          rx="18"
          width="96"
          x="286"
          y="184"
        />
        <text fill="#d1fae5" fontSize="13" fontWeight="700" x="306" y="216">
          使ってみる
        </text>
      </g>
    </svg>
  );
}

export function FocusAreaGlyph({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  if (title === "Education / GIGA") {
    return (
      <svg
        aria-hidden="true"
        className={cn("focus-glyph-svg", className)}
        fill="none"
        viewBox="0 0 64 64"
      >
        <rect fill="rgba(59,130,246,0.14)" height="42" rx="14" width="46" x="9" y="11" />
        <path d="M22 24H42" stroke="#3b82f6" strokeLinecap="round" strokeWidth="4" />
        <path d="M22 34H36" stroke="#60a5fa" strokeLinecap="round" strokeWidth="4" />
        <path d="M22 44H30" stroke="#93c5fd" strokeLinecap="round" strokeWidth="4" />
      </svg>
    );
  }

  if (title === "Physics") {
    return (
      <svg
        aria-hidden="true"
        className={cn("focus-glyph-svg", className)}
        fill="none"
        viewBox="0 0 64 64"
      >
        <circle cx="32" cy="32" fill="rgba(14,165,233,0.12)" r="24" />
        <path
          d="M10 32C16 24 23 20 32 20C41 20 48 24 54 32C48 40 41 44 32 44C23 44 16 40 10 32Z"
          stroke="#0ea5e9"
          strokeWidth="3.5"
        />
        <circle cx="32" cy="32" fill="#38bdf8" r="6" />
      </svg>
    );
  }

  if (title === "LaTeX") {
    return (
      <svg
        aria-hidden="true"
        className={cn("focus-glyph-svg", className)}
        fill="none"
        viewBox="0 0 64 64"
      >
        <rect fill="rgba(96,165,250,0.14)" height="46" rx="16" width="46" x="9" y="9" />
        <path d="M18 22H46" stroke="#2563eb" strokeLinecap="round" strokeWidth="4" />
        <path d="M22 32L28 38L42 24" stroke="#60a5fa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        <path d="M18 44H38" stroke="#93c5fd" strokeLinecap="round" strokeWidth="4" />
      </svg>
    );
  }

  if (title === "AI Material Creation") {
    return (
      <svg
        aria-hidden="true"
        className={cn("focus-glyph-svg", className)}
        fill="none"
        viewBox="0 0 64 64"
      >
        <rect fill="rgba(251,191,36,0.16)" height="44" rx="16" width="44" x="10" y="10" />
        <circle cx="24" cy="26" fill="#f59e0b" r="5" />
        <circle cx="40" cy="26" fill="#60a5fa" r="5" />
        <circle cx="32" cy="40" fill="#34d399" r="5" />
        <path
          d="M24 26L32 40L40 26"
          stroke="rgba(15,23,42,0.28)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={cn("focus-glyph-svg", className)}
      fill="none"
      viewBox="0 0 64 64"
    >
      <rect fill="rgba(16,185,129,0.14)" height="44" rx="16" width="44" x="10" y="10" />
      <rect fill="#10b981" height="14" rx="4" width="10" x="18" y="34" />
      <rect fill="#34d399" height="24" rx="4" width="10" x="30" y="24" />
      <rect fill="#93c5fd" height="18" rx="4" width="10" x="42" y="30" />
    </svg>
  );
}
