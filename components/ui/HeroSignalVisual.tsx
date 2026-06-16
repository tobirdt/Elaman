import { Surface } from "@/components/ui/Surface";

type HeroSignalVisualProps = {
  label: string;
  body: string;
  badge: string;
  className?: string;
  size?: "default" | "compact";
  steps: readonly string[];
};

const BLUE = "var(--color-brand-blue)";
const RED = "var(--color-brand-red)";
const INK = "var(--color-text-primary)";

const MATRIX_DOTS = [
  { x: 92, y: 92, r: 3.8, opacity: 0.22, tone: "ink" },
  { x: 116, y: 72, r: 4.4, opacity: 0.26, tone: "ink" },
  { x: 142, y: 86, r: 3.6, opacity: 0.22, tone: "ink" },
  { x: 104, y: 126, r: 4.8, opacity: 0.28, tone: "ink" },
  { x: 132, y: 122, r: 5.2, opacity: 0.34, tone: "blue" },
  { x: 162, y: 122, r: 4.8, opacity: 0.3, tone: "ink" },
  { x: 86, y: 164, r: 3.5, opacity: 0.18, tone: "ink" },
  { x: 116, y: 166, r: 4.6, opacity: 0.28, tone: "ink" },
  { x: 146, y: 160, r: 5.1, opacity: 0.38, tone: "red" },
  { x: 174, y: 176, r: 3.9, opacity: 0.22, tone: "ink" },
  { x: 104, y: 204, r: 3.6, opacity: 0.18, tone: "ink" },
  { x: 134, y: 208, r: 4.2, opacity: 0.24, tone: "ink" },
  { x: 164, y: 216, r: 3.4, opacity: 0.16, tone: "ink" },
] as const;

const SYSTEM_NODES = [
  { x: 284, y: 84, tone: "blue" },
  { x: 318, y: 148, tone: "blue" },
  { x: 276, y: 214, tone: "red" },
] as const;

export function HeroSignalVisual({
  label,
  body,
  badge,
  className = "",
  size = "default",
  steps,
}: HeroSignalVisualProps) {
  const sizeClass =
    size === "compact"
      ? "min-h-[15rem] sm:min-h-[22rem]"
      : "min-h-[18rem] sm:min-h-[29rem] lg:min-h-[31rem]";

  return (
    <Surface
      className={`relative ${sizeClass} overflow-hidden border border-[var(--border-soft)] bg-white/[0.82] p-5 sm:p-7 ${className}`}
      variant="panel"
    >
      <div className="technical-grid absolute inset-0 opacity-35" aria-hidden="true" />

      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-elaman-blue/24 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-elaman-red/18 to-transparent" />

      <svg
        viewBox="0 0 400 320"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="heroBridgeBlue" x1="76" y1="168" x2="328" y2="90">
            <stop offset="0" stopColor={BLUE} stopOpacity="0.08" />
            <stop offset="0.48" stopColor={BLUE} stopOpacity="0.58" />
            <stop offset="1" stopColor={BLUE} stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="heroBridgeRed" x1="118" y1="188" x2="292" y2="222">
            <stop offset="0" stopColor={RED} stopOpacity="0.04" />
            <stop offset="0.72" stopColor={RED} stopOpacity="0.52" />
            <stop offset="1" stopColor={RED} stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <path
          d="M64 246 H334"
          stroke={INK}
          strokeWidth="1"
          strokeOpacity="0.07"
          strokeDasharray="2 10"
        />
        <path
          d="M68 58 H176 C196 58 210 72 210 92 V242"
          stroke={INK}
          strokeWidth="1"
          strokeOpacity="0.08"
          strokeLinecap="round"
        />
        <path
          d="M206 72 H324 C338 72 348 82 348 96 V230"
          stroke={INK}
          strokeWidth="1"
          strokeOpacity="0.08"
          strokeLinecap="round"
        />

        <path
          d="M132 122 C178 76 225 68 284 84"
          stroke="url(#heroBridgeBlue)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M132 122 C178 76 225 68 284 84"
          stroke={BLUE}
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.18"
          strokeDasharray="4 12"
        />
        <path
          d="M116 166 C170 150 228 142 318 148"
          stroke={BLUE}
          strokeWidth="1"
          strokeOpacity="0.22"
          strokeLinecap="round"
          strokeDasharray="3 10"
        />
        <path
          d="M146 160 C188 204 230 222 276 214"
          stroke="url(#heroBridgeRed)"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M146 160 C188 204 230 222 276 214"
          stroke={RED}
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.16"
          strokeDasharray="4 12"
        />

        <g>
          {MATRIX_DOTS.map((dot) => {
            const fill = dot.tone === "red" ? RED : dot.tone === "blue" ? BLUE : INK;

            return (
              <circle
                key={`${dot.x}-${dot.y}`}
                cx={dot.x}
                cy={dot.y}
                r={dot.r}
                fill={fill}
                fillOpacity={dot.opacity}
              />
            );
          })}
        </g>

        <g>
          {SYSTEM_NODES.map((node) => (
            <g key={`${node.x}-${node.y}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r="13"
                stroke={node.tone === "red" ? RED : BLUE}
                strokeWidth="0.9"
                strokeOpacity={node.tone === "red" ? "0.18" : "0.2"}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r="4.4"
                fill={node.tone === "red" ? RED : BLUE}
                fillOpacity={node.tone === "red" ? "0.56" : "0.52"}
              />
            </g>
          ))}
        </g>

        <g stroke={INK} strokeLinecap="round" strokeOpacity="0.12">
          <path d="M252 104 H306" />
          <path d="M252 118 H286" />
          <path d="M248 170 H326" />
          <path d="M248 184 H300" />
          <path d="M230 232 H304" />
          <path d="M230 246 H280" />
        </g>

        <path
          d="M44 44 H58 M44 44 V58"
          stroke={BLUE}
          strokeWidth="1"
          strokeOpacity="0.16"
          strokeLinecap="round"
        />
        <path
          d="M356 44 H342 M356 44 V58"
          stroke={BLUE}
          strokeWidth="1"
          strokeOpacity="0.14"
          strokeLinecap="round"
        />
        <path
          d="M44 276 H58 M44 276 V262"
          stroke={BLUE}
          strokeWidth="1"
          strokeOpacity="0.14"
          strokeLinecap="round"
        />
        <path
          d="M356 276 H342 M356 276 V262"
          stroke={RED}
          strokeWidth="1"
          strokeOpacity="0.14"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 flex h-full min-h-[15rem] flex-col justify-between gap-5 sm:min-h-[27rem] lg:min-h-[29rem]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-blue">
              {label}
            </p>
            <p className="mt-1.5 max-w-52 text-xs leading-5 text-graphite-muted sm:text-sm sm:leading-6">
              {body}
            </p>
          </div>
          <div className="shrink-0 rounded-[var(--radius-pill)] border border-[var(--border-soft)] bg-[var(--surface-card)] px-3 py-1.5 text-[length:var(--type-micro)] font-medium text-graphite-muted">
            {badge}
          </div>
        </div>

        <div className="flex-1" />

        <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-white/[0.62] sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className="border-t border-[var(--border-soft)] p-3 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0 sm:p-3.5"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`size-1.5 rounded-full ${index === 2 ? "bg-elaman-red/70" : "bg-elaman-blue/70"}`}
                  aria-hidden="true"
                />
                <p className="text-[length:var(--type-micro)] font-semibold tabular-nums text-graphite-soft">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <p className="mt-2 text-xs font-semibold leading-tight text-graphite sm:mt-2.5 sm:text-sm">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Surface>
  );
}
