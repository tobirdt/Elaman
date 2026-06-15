type MobileStoryVisualProps = {
  index: number;
};

const BLUE = "var(--color-brand-blue)";
const RED = "var(--color-brand-red)";
const INK = "var(--color-text-primary)";

const MATRIX_DOTS = [
  { x: 28, y: 24, r: 2.3, tone: "ink", opacity: 0.18 },
  { x: 42, y: 16, r: 2.6, tone: "ink", opacity: 0.24 },
  { x: 56, y: 22, r: 2.2, tone: "ink", opacity: 0.18 },
  { x: 34, y: 40, r: 2.8, tone: "ink", opacity: 0.24 },
  { x: 50, y: 38, r: 3, tone: "blue", opacity: 0.36 },
  { x: 66, y: 42, r: 2.7, tone: "ink", opacity: 0.22 },
  { x: 28, y: 58, r: 2.1, tone: "ink", opacity: 0.14 },
  { x: 44, y: 58, r: 2.7, tone: "red", opacity: 0.34 },
] as const;

const SEGMENTS = [
  { d: "M50 38 C66 28 76 24 90 28", tone: "blue" },
  { d: "M90 28 C104 32 110 42 124 42", tone: "blue" },
  { d: "M124 42 C140 42 150 32 166 28", tone: "blue" },
  { d: "M166 28 C176 30 184 42 192 50", tone: "red" },
  { d: "M192 50 C194 40 196 30 198 22", tone: "blue" },
] as const;

const NODES = [
  { x: 50, y: 38, tone: "blue" },
  { x: 90, y: 28, tone: "blue" },
  { x: 124, y: 42, tone: "blue" },
  { x: 166, y: 28, tone: "blue" },
  { x: 192, y: 50, tone: "red" },
  { x: 198, y: 22, tone: "blue" },
] as const;

export function MobileStoryVisual({ index }: MobileStoryVisualProps) {
  return (
    <div className="relative h-20 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-[var(--surface-card)]">
      <div className="technical-grid absolute inset-0 opacity-28" aria-hidden="true" />

      <svg
        viewBox="0 0 220 80"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M18 68 H202"
          stroke={INK}
          strokeWidth="0.7"
          strokeOpacity="0.07"
          strokeDasharray="2 8"
        />

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

        {SEGMENTS.map((segment, segmentIndex) => {
          const active = segment.tone === "red" ? index >= 4 : index > segmentIndex;

          return (
            <path
              key={segment.d}
              d={segment.d}
              stroke={segment.tone === "red" ? RED : BLUE}
              strokeWidth={segment.tone === "red" ? "1.35" : "1.5"}
              strokeLinecap="round"
              strokeOpacity={active ? "0.48" : "0.12"}
              strokeDasharray={segment.tone === "red" ? "5 10" : "7 12"}
            />
          );
        })}

        {NODES.map((node, nodeIndex) => {
          const active = index >= nodeIndex;
          const current = index === nodeIndex;
          const color = node.tone === "red" ? RED : BLUE;

          return (
            <g key={`${node.x}-${node.y}-${nodeIndex}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={current ? "7" : active ? "5.5" : "4.5"}
                stroke={color}
                strokeWidth="0.7"
                strokeOpacity={current ? "0.24" : active ? "0.14" : "0.08"}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={current ? "3.2" : "2.5"}
                fill={color}
                fillOpacity={active ? "0.58" : "0.18"}
              />
            </g>
          );
        })}

        <path
          d="M14 12 H22 M14 12 V20"
          stroke={BLUE}
          strokeWidth="0.8"
          strokeOpacity="0.14"
          strokeLinecap="round"
        />
        <path
          d="M206 68 H198 M206 68 V60"
          stroke={index >= 4 ? RED : BLUE}
          strokeWidth="0.8"
          strokeOpacity="0.13"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
