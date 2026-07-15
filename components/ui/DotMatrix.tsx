import type { Formation } from "@/lib/design/formations";

type DotMatrixProps = {
  formation: Formation;
  pitch?: number;
  dotRadius?: number;
  inkOpacity?: number;
  padding?: number;
  bounds?: { minX: number; maxX: number; minY: number; maxY: number };
  className?: string;
};

export const DOT_COLORS = {
  ink: "var(--color-graphite)",
  "mark-light": "#d2d2d2",
  "mark-mid": "#b1b1b1",
  "mark-dark": "#919191",
  blue: "var(--color-elaman-blue)",
  red: "var(--color-elaman-red)",
} as const;

export function DotMatrix({
  formation,
  pitch = 12,
  dotRadius = 5.5,
  inkOpacity = 0.22,
  padding = 0.75,
  bounds,
  className = "",
}: DotMatrixProps) {
  const xs = formation.dots.map((dot) => dot.x);
  const ys = formation.dots.map((dot) => dot.y);
  const minX = (bounds ? bounds.minX : Math.min(...xs)) - padding;
  const maxX = (bounds ? bounds.maxX : Math.max(...xs)) + padding;
  const minY = (bounds ? bounds.minY : Math.min(...ys)) - padding;
  const maxY = (bounds ? bounds.maxY : Math.max(...ys)) + padding;
  const width = (maxX - minX) * pitch;
  const height = (maxY - minY) * pitch;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {formation.edges?.map(([from, to]) => {
        const start = formation.dots[from];
        const end = formation.dots[to];

        if (!start || !end) {
          return null;
        }

        return (
          <line
            key={`${from}-${to}`}
            x1={(start.x - minX) * pitch}
            y1={(start.y - minY) * pitch}
            x2={(end.x - minX) * pitch}
            y2={(end.y - minY) * pitch}
            stroke={DOT_COLORS.ink}
            strokeOpacity={inkOpacity * 0.7}
            strokeWidth={1}
          />
        );
      })}
      {formation.dots.map((dot, index) => (
        <circle
          key={index}
          cx={(dot.x - minX) * pitch}
          cy={(dot.y - minY) * pitch}
          r={dotRadius}
          fill={dot.tone === "ink" ? DOT_COLORS.ink : DOT_COLORS[dot.tone]}
          fillOpacity={dot.tone === "ink" ? inkOpacity : 1}
        />
      ))}
    </svg>
  );
}
