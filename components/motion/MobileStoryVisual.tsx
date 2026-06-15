type MobileStoryVisualProps = {
  index: number;
};

const BLUE = "var(--color-brand-blue)";
const RED = "var(--color-brand-red)";

// Per-step abstract diagram configs
const STEP_CONFIGS = [
  // 0: Trust — single centered ring
  { rings: 1, redArc: false, gridLines: false, crosshair: false },
  // 1: Advice — rings + crosshair
  { rings: 2, redArc: false, gridLines: false, crosshair: true },
  // 2: Communications — arcs spread
  { rings: 2, redArc: false, gridLines: false, crosshair: true },
  // 3: Surveillance — grid lines appear
  { rings: 2, redArc: false, gridLines: true, crosshair: true },
  // 4: Protection — red arc activates
  { rings: 2, redArc: true, gridLines: true, crosshair: true },
  // 5: Delivery — full composition
  { rings: 3, redArc: true, gridLines: true, crosshair: true },
] as const;

export function MobileStoryVisual({ index }: MobileStoryVisualProps) {
  const cfg = STEP_CONFIGS[index] ?? STEP_CONFIGS[0];

  return (
    <div className="relative h-20 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-[var(--surface-card)]">
      <div className="technical-grid absolute inset-0 opacity-35" aria-hidden="true" />

      <svg
        viewBox="0 0 220 80"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Rings */}
        <circle
          cx="110"
          cy="40"
          r="28"
          stroke={BLUE}
          strokeWidth="0.8"
          strokeOpacity="0.18"
          strokeDasharray="2 6"
        />
        {cfg.rings >= 2 && (
          <circle
            cx="110"
            cy="40"
            r="18"
            stroke={BLUE}
            strokeWidth="0.8"
            strokeOpacity="0.16"
          />
        )}
        {cfg.rings >= 3 && (
          <circle
            cx="110"
            cy="40"
            r="10"
            stroke={BLUE}
            strokeWidth="0.8"
            strokeOpacity="0.14"
            strokeDasharray="1 4"
          />
        )}

        {/* Crosshair */}
        {cfg.crosshair && (
          <>
            <line
              x1="40"
              y1="40"
              x2="180"
              y2="40"
              stroke={BLUE}
              strokeWidth="0.6"
              strokeOpacity="0.10"
            />
            <line
              x1="110"
              y1="8"
              x2="110"
              y2="72"
              stroke={BLUE}
              strokeWidth="0.6"
              strokeOpacity="0.10"
            />
          </>
        )}

        {/* Grid lines */}
        {cfg.gridLines && (
          <>
            <line
              x1="40"
              y1="22"
              x2="180"
              y2="22"
              stroke={BLUE}
              strokeWidth="0.5"
              strokeOpacity="0.07"
              strokeDasharray="2 6"
            />
            <line
              x1="40"
              y1="58"
              x2="180"
              y2="58"
              stroke={BLUE}
              strokeWidth="0.5"
              strokeOpacity="0.07"
              strokeDasharray="2 6"
            />
          </>
        )}

        {/* Blue comms arc */}
        <path
          d="M38 54 C66 34 88 26 110 26 C134 26 152 36 180 18"
          stroke={BLUE}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="6 10"
          strokeOpacity="0.48"
        />

        {/* Red ECM arc */}
        {cfg.redArc && (
          <path
            d="M38 64 C72 54 90 44 110 38 C130 32 154 34 180 44"
            stroke={RED}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="4 9"
            strokeOpacity="0.40"
          />
        )}

        {/* Center node */}
        <circle cx="110" cy="40" r="3.5" fill={BLUE} fillOpacity="0.48" />
        <circle
          cx="110"
          cy="40"
          r="8"
          fill="none"
          stroke={BLUE}
          strokeWidth="0.6"
          strokeOpacity="0.16"
        />

        {/* Signal node on arc */}
        <circle cx="110" cy="26" r="2.5" fill={BLUE} fillOpacity="0.42" />

        {/* Corner marks */}
        <path
          d="M16 12 H24 M16 12 V20"
          stroke={BLUE}
          strokeWidth="0.8"
          strokeOpacity="0.16"
          strokeLinecap="round"
        />
        <path
          d="M204 68 H196 M204 68 V60"
          stroke={cfg.redArc ? RED : BLUE}
          strokeWidth="0.8"
          strokeOpacity="0.14"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
