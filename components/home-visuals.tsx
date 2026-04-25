import { cn } from "@/lib/utils";

type IntentVariant = "physics" | "materials" | "apps";
type ActionVariant = "read" | "build" | "use";

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

export function ActionCardVisual({
  variant,
  className,
}: {
  variant: ActionVariant;
  className?: string;
}) {
  if (variant === "read") {
    return (
      <svg
        aria-hidden="true"
        className={cn("action-visual-svg", className)}
        fill="none"
        viewBox="0 0 320 190"
      >
        <rect fill="rgba(255,255,255,0.76)" height="148" rx="30" width="284" x="18" y="18" />
        <rect fill="rgba(59,130,246,0.12)" height="102" rx="24" width="126" x="34" y="42" />
        <path d="M92 54C106 54 118 66 118 82V130H70V82C70 66 78 54 92 54Z" fill="#fff" />
        <path d="M92 54C106 54 118 66 118 82V130H70V82C70 66 78 54 92 54Z" stroke="rgba(59,130,246,0.16)" strokeWidth="2" />
        <path d="M86 78H102" stroke="#3b82f6" strokeLinecap="round" strokeWidth="4" />
        <path d="M84 94H104" stroke="rgba(15,23,42,0.24)" strokeLinecap="round" strokeWidth="4" />
        <path d="M84 108H100" stroke="rgba(15,23,42,0.16)" strokeLinecap="round" strokeWidth="4" />
        <rect fill="rgba(14,165,233,0.14)" height="94" rx="22" width="120" x="174" y="48" />
        <path d="M198 66H268" stroke="rgba(255,255,255,0.9)" strokeLinecap="round" strokeWidth="5" />
        <path d="M198 84H250" stroke="rgba(255,255,255,0.74)" strokeLinecap="round" strokeWidth="4" />
        <path d="M198 100H258" stroke="rgba(255,255,255,0.54)" strokeLinecap="round" strokeWidth="4" />
        <path className="action-visual-signal" d="M186 126C210 96 238 92 282 114" stroke="#0ea5e9" strokeLinecap="round" strokeWidth="4" />
        <rect fill="rgba(59,130,246,0.14)" height="26" rx="13" width="66" x="34" y="20" />
        <text fill="#2563eb" fontSize="12" fontWeight="700" x="56" y="37">
          Read
        </text>
      </svg>
    );
  }

  if (variant === "build") {
    return (
      <svg
        aria-hidden="true"
        className={cn("action-visual-svg", className)}
        fill="none"
        viewBox="0 0 320 190"
      >
        <rect fill="rgba(255,255,255,0.76)" height="148" rx="30" width="284" x="18" y="18" />
        <rect fill="rgba(251,191,36,0.12)" height="104" rx="24" width="130" x="34" y="40" />
        <rect fill="#fff" height="76" rx="18" width="94" x="52" y="54" />
        <path d="M68 72H130" stroke="#f59e0b" strokeLinecap="round" strokeWidth="5" />
        <path d="M68 88H116" stroke="rgba(15,23,42,0.2)" strokeLinecap="round" strokeWidth="4" />
        <path d="M68 102H126" stroke="rgba(15,23,42,0.12)" strokeLinecap="round" strokeWidth="4" />
        <circle cx="202" cy="90" fill="#fde68a" r="13" />
        <circle cx="244" cy="74" fill="#93c5fd" r="10" />
        <circle cx="270" cy="112" fill="#86efac" r="9" />
        <path className="action-visual-signal action-visual-signal-warm" d="M202 90L244 74L270 112" stroke="rgba(15,23,42,0.34)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
        <path className="action-visual-signal" d="M188 132C208 116 230 118 282 132" stroke="#f59e0b" strokeLinecap="round" strokeWidth="4" />
        <rect fill="rgba(245,158,11,0.16)" height="26" rx="13" width="74" x="34" y="20" />
        <text fill="#b45309" fontSize="12" fontWeight="700" x="54" y="37">
          Build
        </text>
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={cn("action-visual-svg", className)}
      fill="none"
      viewBox="0 0 320 190"
    >
      <rect fill="rgba(255,255,255,0.76)" height="148" rx="30" width="284" x="18" y="18" />
      <rect fill="rgba(59,130,246,0.12)" height="96" rx="24" width="112" x="34" y="46" />
      <rect fill="#fff" height="70" rx="18" width="86" x="47" y="58" />
      <circle cx="90" cy="93" fill="none" r="20" stroke="#3b82f6" strokeWidth="6" />
      <path d="M90 93L106 80" stroke="#3b82f6" strokeLinecap="round" strokeWidth="6" />
      <rect fill="rgba(16,185,129,0.14)" height="96" rx="24" width="120" x="162" y="46" />
      <rect fill="#fff" height="70" rx="18" width="92" x="176" y="58" />
      <path d="M192 110V88" stroke="#10b981" strokeLinecap="round" strokeWidth="10" />
      <path d="M220 110V76" stroke="#34d399" strokeLinecap="round" strokeWidth="10" />
      <path d="M248 110V96" stroke="#93c5fd" strokeLinecap="round" strokeWidth="10" />
      <path className="action-visual-signal" d="M142 95C154 95 166 78 178 78" stroke="#60a5fa" strokeLinecap="round" strokeWidth="3" />
      <path className="action-visual-signal action-visual-signal-delay" d="M138 108C154 108 164 122 178 122" stroke="#6ee7b7" strokeLinecap="round" strokeWidth="3" />
      <rect fill="rgba(59,130,246,0.14)" height="26" rx="13" width="56" x="34" y="20" />
      <text fill="#2563eb" fontSize="12" fontWeight="700" x="54" y="37">
        Use
      </text>
    </svg>
  );
}

export function TopicClusterVisual({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const palettes = [
    { primary: "#38bdf8", soft: "rgba(56,189,248,0.18)", accent: "#93c5fd" },
    { primary: "#f59e0b", soft: "rgba(245,158,11,0.18)", accent: "#fde68a" },
    { primary: "#10b981", soft: "rgba(16,185,129,0.18)", accent: "#86efac" },
  ];
  const palette = palettes[index % palettes.length];

  return (
    <svg
      aria-hidden="true"
      className={cn("topic-visual-svg", className)}
      fill="none"
      viewBox="0 0 320 176"
    >
      <rect fill="rgba(255,255,255,0.74)" height="144" rx="28" width="284" x="18" y="16" />
      <circle cx="160" cy="88" fill={palette.soft} r="34" />
      <circle cx="160" cy="88" fill={palette.primary} r="14" />
      <circle cx="160" cy="88" fill="#fff" r="5" />
      {[
        { x: 76, y: 52, w: 72 },
        { x: 214, y: 42, w: 54 },
        { x: 222, y: 128, w: 58 },
        { x: 56, y: 122, w: 70 },
      ].map((chip, chipIndex) => (
        <g className="topic-chip" key={`${chip.x}-${chip.y}`}>
          <rect
            fill="rgba(255,255,255,0.9)"
            height="28"
            rx="14"
            width={chip.w}
            x={chip.x}
            y={chip.y}
          />
          <rect
            fill={chipIndex % 2 === 0 ? palette.soft : "rgba(15,23,42,0.08)"}
            height="8"
            rx="4"
            width={chip.w - 24}
            x={chip.x + 12}
            y={chip.y + 10}
          />
        </g>
      ))}
      <path className="topic-track" d="M148 78L104 64" stroke={palette.primary} strokeLinecap="round" strokeWidth="3.5" />
      <path className="topic-track topic-track-delay" d="M174 76L228 56" stroke={palette.primary} strokeLinecap="round" strokeWidth="3.5" />
      <path className="topic-track" d="M176 98L230 128" stroke={palette.primary} strokeLinecap="round" strokeWidth="3.5" />
      <path className="topic-track topic-track-delay" d="M146 102L108 126" stroke={palette.primary} strokeLinecap="round" strokeWidth="3.5" />
      <rect fill={palette.soft} height="24" rx="12" width="88" x="30" y="20" />
      <text fill={palette.primary} fontSize="12" fontWeight="700" x="52" y="36">
        Topic Map
      </text>
    </svg>
  );
}

export function DesignBoardVisual({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("design-board-svg h-auto w-full", className)}
      fill="none"
      viewBox="0 0 520 260"
    >
      <defs>
        <linearGradient id="designBoardGradient" x1="82" x2="432" y1="52" y2="202">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <path className="design-board-track" d="M120 160C180 98 252 72 316 100C364 120 394 164 416 196" stroke="url(#designBoardGradient)" strokeLinecap="round" strokeWidth="6" />
      <path className="design-board-track design-board-track-delay" d="M112 172C176 214 256 220 330 192C370 176 402 146 424 110" stroke="url(#designBoardGradient)" strokeLinecap="round" strokeWidth="4" />
      <g className="design-board-card">
        <rect fill="rgba(255,255,255,0.92)" height="86" rx="26" width="112" x="40" y="54" />
        <path d="M62 82H126" stroke="#3b82f6" strokeLinecap="round" strokeWidth="6" />
        <path d="M62 102H112" stroke="rgba(15,23,42,0.18)" strokeLinecap="round" strokeWidth="5" />
      </g>
      <g className="design-board-card design-board-card-delay">
        <rect fill="rgba(255,255,255,0.9)" height="94" rx="30" width="124" x="196" y="28" />
        <rect fill="rgba(96,165,250,0.18)" height="50" rx="18" width="84" x="216" y="50" />
        <path d="M236 74L256 92L286 60" stroke="#2563eb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
      </g>
      <g className="design-board-card">
        <rect fill="rgba(255,255,255,0.92)" height="86" rx="26" width="112" x="368" y="110" />
        <path d="M390 170V140" stroke="#10b981" strokeLinecap="round" strokeWidth="10" />
        <path d="M418 170V128" stroke="#34d399" strokeLinecap="round" strokeWidth="10" />
        <path d="M446 170V148" stroke="#93c5fd" strokeLinecap="round" strokeWidth="10" />
      </g>
      <g className="design-board-core">
        <rect fill="rgba(59,130,246,0.26)" height="92" rx="28" width="92" x="214" y="120" />
        <rect fill="rgba(255,255,255,0.94)" height="56" rx="18" width="56" x="232" y="138" />
        <path d="M246 152H274" stroke="#3b82f6" strokeLinecap="round" strokeWidth="5" />
        <path d="M246 166H270" stroke="#60a5fa" strokeLinecap="round" strokeWidth="5" />
      </g>
    </svg>
  );
}

export function AppCardVisual({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  if (name === "IT Pass") {
    return (
      <svg
        aria-hidden="true"
        className={cn("app-visual-svg", className)}
        fill="none"
        viewBox="0 0 320 170"
      >
        <rect fill="rgba(255,255,255,0.08)" height="128" rx="26" width="280" x="20" y="20" />
        <rect fill="rgba(255,255,255,0.9)" height="80" rx="20" width="92" x="40" y="42" />
        <path d="M60 68H110" stroke="#f59e0b" strokeLinecap="round" strokeWidth="6" />
        <path d="M60 88H100" stroke="rgba(15,23,42,0.16)" strokeLinecap="round" strokeWidth="5" />
        <path d="M60 106H92" stroke="rgba(15,23,42,0.1)" strokeLinecap="round" strokeWidth="5" />
        <rect fill="rgba(245,158,11,0.18)" height="84" rx="22" width="124" x="154" y="40" />
        <path d="M178 104V76" stroke="#f59e0b" strokeLinecap="round" strokeWidth="12" />
        <path d="M210 104V66" stroke="#fbbf24" strokeLinecap="round" strokeWidth="12" />
        <path d="M242 104V86" stroke="#fde68a" strokeLinecap="round" strokeWidth="12" />
      </svg>
    );
  }

  if (name === "Physics") {
    return (
      <svg
        aria-hidden="true"
        className={cn("app-visual-svg", className)}
        fill="none"
        viewBox="0 0 320 170"
      >
        <rect fill="rgba(255,255,255,0.08)" height="128" rx="26" width="280" x="20" y="20" />
        <rect fill="rgba(255,255,255,0.92)" height="82" rx="22" width="108" x="38" y="42" />
        <path d="M60 102H124" stroke="rgba(59,130,246,0.24)" strokeLinecap="round" strokeWidth="3" />
        <path d="M74 112V58" stroke="rgba(59,130,246,0.24)" strokeLinecap="round" strokeWidth="3" />
        <path className="app-visual-signal" d="M74 92C92 92 94 70 112 70C132 70 130 114 150 114" stroke="#3b82f6" strokeLinecap="round" strokeWidth="4.5" />
        <circle cx="112" cy="70" fill="#93c5fd" r="8" />
        <circle cx="132" cy="108" fill="#7dd3fc" r="8" />
        <rect fill="rgba(125,211,252,0.18)" height="82" rx="22" width="112" x="170" y="42" />
        <path d="M194 84L222 56L250 84L222 112Z" stroke="#60a5fa" strokeLinejoin="round" strokeWidth="4" />
        <path d="M222 56V112" stroke="#bfdbfe" strokeWidth="3" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={cn("app-visual-svg", className)}
      fill="none"
      viewBox="0 0 320 170"
    >
      <rect fill="rgba(255,255,255,0.08)" height="128" rx="26" width="280" x="20" y="20" />
      <rect fill="rgba(255,255,255,0.92)" height="78" rx="22" width="112" x="38" y="46" />
      <path d="M58 70H130" stroke="rgba(15,23,42,0.14)" strokeLinecap="round" strokeWidth="5" />
      <rect fill="rgba(251,191,36,0.18)" height="10" rx="5" width="46" x="58" y="88" />
      <rect fill="rgba(147,197,253,0.22)" height="10" rx="5" width="58" x="58" y="104" />
      <rect fill="rgba(59,130,246,0.2)" height="86" rx="24" width="118" x="164" y="40" />
      <rect fill="rgba(255,255,255,0.94)" height="46" rx="16" width="56" x="195" y="60" />
      <path d="M210 74H236" stroke="#3b82f6" strokeLinecap="round" strokeWidth="5" />
      <path d="M210 88H230" stroke="#60a5fa" strokeLinecap="round" strokeWidth="5" />
      <path className="app-visual-signal" d="M150 92C164 92 172 76 182 76" stroke="#7dd3fc" strokeLinecap="round" strokeWidth="3.5" />
    </svg>
  );
}

export function ArticleTeaserVisual({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  const isPhysics = category.toLowerCase().includes("physics");
  const isAi =
    category.toLowerCase().includes("ai") ||
    category.toLowerCase().includes("latex") ||
    category.toLowerCase().includes("material");

  if (isPhysics) {
    return (
      <svg
        aria-hidden="true"
        className={cn("article-visual-svg", className)}
        fill="none"
        viewBox="0 0 320 170"
      >
        <rect fill="rgba(255,255,255,0.14)" height="126" rx="28" width="280" x="20" y="22" />
        <rect fill="rgba(255,255,255,0.9)" height="84" rx="22" width="120" x="36" y="42" />
        <path d="M60 106H132" stroke="rgba(147,197,253,0.26)" strokeLinecap="round" strokeWidth="3" />
        <path d="M76 116V58" stroke="rgba(147,197,253,0.26)" strokeLinecap="round" strokeWidth="3" />
        <path className="article-visual-signal" d="M76 94C94 94 96 70 114 70C136 70 134 116 156 116" stroke="#7dd3fc" strokeLinecap="round" strokeWidth="4.5" />
        <circle cx="114" cy="70" fill="#93c5fd" r="8" />
        <circle cx="136" cy="110" fill="#bfdbfe" r="8" />
        <rect fill="rgba(56,189,248,0.16)" height="84" rx="24" width="112" x="172" y="42" />
        <path d="M198 74L214 58L240 58L256 74" stroke="#38bdf8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        <path d="M214 58V102" stroke="#7dd3fc" strokeWidth="3" />
        <path d="M240 58V102" stroke="#7dd3fc" strokeWidth="3" />
      </svg>
    );
  }

  if (isAi) {
    return (
      <svg
        aria-hidden="true"
        className={cn("article-visual-svg", className)}
        fill="none"
        viewBox="0 0 320 170"
      >
        <rect fill="rgba(255,255,255,0.14)" height="126" rx="28" width="280" x="20" y="22" />
        <rect fill="rgba(255,255,255,0.92)" height="82" rx="22" width="118" x="36" y="44" />
        <path d="M58 68H132" stroke="#fbbf24" strokeLinecap="round" strokeWidth="5" />
        <path d="M58 86H118" stroke="rgba(255,255,255,0.45)" strokeLinecap="round" strokeWidth="4" />
        <path d="M58 100H126" stroke="rgba(255,255,255,0.28)" strokeLinecap="round" strokeWidth="4" />
        <circle cx="204" cy="84" fill="#f59e0b" r="12" />
        <circle cx="244" cy="68" fill="#93c5fd" r="9" />
        <circle cx="266" cy="108" fill="#6ee7b7" r="8" />
        <path className="article-visual-signal article-visual-signal-warm" d="M204 84L244 68L266 108" stroke="rgba(255,255,255,0.62)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={cn("article-visual-svg", className)}
      fill="none"
      viewBox="0 0 320 170"
    >
      <rect fill="rgba(255,255,255,0.14)" height="126" rx="28" width="280" x="20" y="22" />
      <rect fill="rgba(255,255,255,0.92)" height="82" rx="22" width="104" x="40" y="44" />
      <circle cx="92" cy="84" fill="none" r="22" stroke="#7dd3fc" strokeWidth="7" />
      <path d="M92 84L108 72" stroke="#7dd3fc" strokeLinecap="round" strokeWidth="6" />
      <rect fill="rgba(167,243,208,0.18)" height="82" rx="22" width="112" x="168" y="44" />
      <path d="M190 108V82" stroke="#34d399" strokeLinecap="round" strokeWidth="12" />
      <path d="M220 108V70" stroke="#6ee7b7" strokeLinecap="round" strokeWidth="12" />
      <path d="M250 108V90" stroke="#93c5fd" strokeLinecap="round" strokeWidth="12" />
    </svg>
  );
}

export function FinalCtaVisual({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("final-visual-svg h-auto w-full", className)}
      fill="none"
      viewBox="0 0 420 260"
    >
      <defs>
        <linearGradient id="finalVisualGradient" x1="72" x2="354" y1="50" y2="214">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="48%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <circle cx="212" cy="132" fill="rgba(255,255,255,0.12)" r="58" />
      <circle className="final-visual-core" cx="212" cy="132" fill="rgba(255,255,255,0.24)" r="34" />
      <rect fill="rgba(255,255,255,0.92)" height="56" rx="18" width="56" x="184" y="104" />
      <path d="M198 120H226" stroke="#3b82f6" strokeLinecap="round" strokeWidth="5" />
      <path d="M198 136H222" stroke="#7dd3fc" strokeLinecap="round" strokeWidth="5" />
      {[
        { x: 64, y: 64, w: 88, label: "Physics" },
        { x: 276, y: 48, w: 84, label: "Materials" },
        { x: 290, y: 190, w: 72, label: "Apps" },
        { x: 56, y: 192, w: 70, label: "Blog" },
      ].map((chip, index) => (
        <g className="final-visual-chip" key={chip.label} style={{ animationDelay: `${index * -0.9}s` }}>
          <rect fill="rgba(255,255,255,0.16)" height="34" rx="17" width={chip.w} x={chip.x} y={chip.y} />
          <text fill="#e0f2fe" fontSize="12" fontWeight="700" x={chip.x + 18} y={chip.y + 22}>
            {chip.label}
          </text>
        </g>
      ))}
      <path className="final-visual-orbit" d="M212 132C162 86 120 82 108 82" stroke="url(#finalVisualGradient)" strokeLinecap="round" strokeWidth="4" />
      <path className="final-visual-orbit final-visual-orbit-delay" d="M212 132C256 86 302 72 320 66" stroke="url(#finalVisualGradient)" strokeLinecap="round" strokeWidth="4" />
      <path className="final-visual-orbit" d="M212 132C266 154 292 192 302 206" stroke="url(#finalVisualGradient)" strokeLinecap="round" strokeWidth="4" />
      <path className="final-visual-orbit final-visual-orbit-delay" d="M212 132C166 162 128 192 112 206" stroke="url(#finalVisualGradient)" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}
