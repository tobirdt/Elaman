import type { Formation } from "@/lib/design/formations";

type DotMatrixProps = {
  formation: Formation;
  /** SVG user units per grid unit. */
  pitch?: number;
  /** Dot radius in SVG user units. */
  dotRadius?: number;
  /** Opacity of ink dots (blue/red always render solid). */
  inkOpacity?: number;
  /** Extra space around the outermost dots, in grid units. */
  padding?: number;
  /** Fixed drawing bounds in grid units — overrides auto-fit from the dots. */
  bounds?: { minX: number; maxX: number; minY: number; maxY: number };
  className?: string;
  /** Render dots on a dark surface (ink becomes on-dark). */
  onDark?: boolean;
};

export const DOT_COLORS = {
  ink: "var(--color-graphite)",
  inkOnDark: "var(--color-on-dark)",
  blue: "var(--color-elaman-blue)",
  red: "var(--color-elaman-red)",
} as const;

/**
 * Static renderer for a dot formation — server-renderable, decorative
 * (aria-hidden). Animated variants build on the same formation data with
 * their own motion components.
 */
export function DotMatrix({
  formation,
  pitch = 12,
  dotRadius = 5.5,
  inkOpacity = 0.22,
  padding = 0.75,
  bounds,
  className = "",
  onDark = false,
}: DotMatrixProps) {
  const xs = formation.dots.map((dot) => dot.x);
  const ys = formation.dots.map((dot) => dot.y);
  const minX = (bounds ? bounds.minX : Math.min(...xs)) - padding;
  const maxX = (bounds ? bounds.maxX : Math.max(...xs)) + padding;
  const minY = (bounds ? bounds.minY : Math.min(...ys)) - padding;
  const maxY = (bounds ? bounds.maxY : Math.max(...ys)) + padding;
  const width = (maxX - minX) * pitch;
  const height = (maxY - minY) * pitch;
  const inkColor = onDark ? DOT_COLORS.inkOnDark : DOT_COLORS.ink;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {formation.edges?.map(([from, to]) => {
        const a = formation.dots[from];
        const b = formation.dots[to];

        if (!a || !b) {
          return null;
        }

        return (
          <line
            key={`${from}-${to}`}
            x1={(a.x - minX) * pitch}
            y1={(a.y - minY) * pitch}
            x2={(b.x - minX) * pitch}
            y2={(b.y - minY) * pitch}
            stroke={inkColor}
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
          fill={dot.tone === "ink" ? inkColor : DOT_COLORS[dot.tone]}
          fillOpacity={dot.tone === "ink" ? inkOpacity : 1}
        />
      ))}
    </svg>
  );
}
