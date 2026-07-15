import { useId } from "react";

import { Surface } from "@/components/ui/Surface";
import type { ContentCard } from "@/types/site";

type SystemMapProps = {
  activeIndex: number;
  items: readonly ContentCard[];
  onSelect: (index: number) => void;
};

const BLUE = "var(--color-brand-blue)";
const RED = "var(--color-brand-red)";
const WHITE = "var(--surface-white)";

// Pre-calculated spoke endpoints for 8 systems around a hub
// Hub: cx=380, cy=180, r=22
// Spokes radiate outward with varying lengths
const SPOKES = [
  { x: 380, y: 76, dx: 380, dy: 38 }, // top
  { x: 482, y: 108, dx: 440, dy: 132 }, // top-right
  { x: 524, y: 200, dx: 480, dy: 200 }, // right
  { x: 488, y: 288, dx: 446, dy: 262 }, // bottom-right
  { x: 382, y: 320, dx: 382, dy: 282 }, // bottom
  { x: 272, y: 290, dx: 316, dy: 264 }, // bottom-left
  { x: 230, y: 202, dx: 272, dy: 202 }, // left
  { x: 272, y: 108, dx: 314, dy: 134 }, // top-left
] as const;

export function SystemMap({ activeIndex, items, onSelect }: SystemMapProps) {
  const baseId = useId();

  return (
    <Surface
      className="relative overflow-hidden border border-[var(--border-soft)] bg-white p-5 sm:p-7"
      variant="panel"
    >
      <div className="technical-grid absolute inset-0 opacity-32" aria-hidden="true" />

      {/* Desktop SVG network diagram */}
      <svg
        viewBox="0 0 760 380"
        className="relative z-0 hidden h-56 w-full sm:block"
        fill="none"
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle
          cx="380"
          cy="188"
          r="148"
          stroke={BLUE}
          strokeOpacity="0.08"
          strokeDasharray="4 10"
        />
        <circle
          cx="380"
          cy="188"
          r="96"
          stroke={BLUE}
          strokeOpacity="0.06"
          strokeDasharray="3 8"
        />

        {/* Hub */}
        <circle cx="380" cy="188" r="28" fill={BLUE} fillOpacity="0.08" />
        <circle cx="380" cy="188" r="14" fill={BLUE} fillOpacity="0.78" />
        <circle cx="380" cy="188" r="6" fill={WHITE} />

        {/* Spokes */}
        {SPOKES.map(({ x, y, dx, dy }, i) => {
          const isRed = i === 4; // bottom spoke = protection
          return (
            <g key={i}>
              <line
                x1={dx}
                y1={dy}
                x2={x}
                y2={y}
                stroke={isRed ? RED : BLUE}
                strokeOpacity={isRed ? 0.36 : 0.22}
                strokeWidth={isRed ? 1.5 : 1.2}
                strokeDasharray={isRed ? "4 8" : "3 7"}
              />
              {/* Satellite node */}
              <circle
                cx={x}
                cy={y}
                r="18"
                fill={isRed ? RED : BLUE}
                fillOpacity={isRed ? 0.07 : 0.06}
              />
              <circle cx={x} cy={y} r="7" fill={isRed ? RED : BLUE} fillOpacity="0.6" />
            </g>
          );
        })}

        {/* Cross-links between adjacent nodes */}
        <path
          d="M380 76 C432 76 482 108 482 108"
          stroke={BLUE}
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeDasharray="3 9"
        />
        <path
          d="M230 202 C230 248 272 290 272 290"
          stroke={BLUE}
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeDasharray="3 9"
        />

        {/* Elaman node label */}
        <text
          x="380"
          y="234"
          textAnchor="middle"
          fontSize="9"
          fill={BLUE}
          fillOpacity="0.6"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          ELAMAN
        </text>
      </svg>

      {/* Mobile simplified dots */}
      <div
        className="relative z-10 mb-4 flex items-center gap-1.5 sm:hidden"
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <div key={item.title} className="flex items-center gap-1.5">
            <span
              className={`size-2.5 rounded-full ${i === items.length - 1 ? "bg-elaman-red" : "bg-elaman-blue"} opacity-60`}
            />
            {i < items.length - 1 && <span className="h-px w-4 bg-graphite/12" />}
          </div>
        ))}
      </div>

      <div className="relative z-10 grid gap-2.5 sm:mt-4">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-white/[0.78] transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)]"
          >
            <button
              aria-controls={`${baseId}-panel-${index}`}
              aria-expanded={activeIndex === index}
              className={`group flex min-h-14 w-full items-center justify-between gap-4 rounded-[var(--radius-card)] px-4 py-3 text-left transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elaman-blue ${
                activeIndex === index ? "bg-white text-graphite" : "text-graphite-muted"
              }`}
              id={`${baseId}-button-${index}`}
              onClick={() => onSelect(index)}
              type="button"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className={`size-2 shrink-0 rounded-full ${index === 4 ? "bg-elaman-red" : "bg-elaman-blue"} opacity-70`}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tabular-nums text-graphite-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-snug tracking-[var(--tracking-title)] text-graphite">
                    {item.title}
                  </span>
                </span>
              </span>
              <span
                className={`shrink-0 text-lg leading-none text-elaman-blue transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] group-hover:text-graphite ${
                  activeIndex === index ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              aria-hidden={activeIndex !== index}
              aria-labelledby={`${baseId}-button-${index}`}
              className={`grid transition-[grid-template-rows,opacity] [transition-duration:var(--motion-medium)] [transition-timing-function:var(--motion-ease)] motion-reduce:transition-none ${
                activeIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
              id={`${baseId}-panel-${index}`}
              role="region"
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm leading-6 text-graphite-muted">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Surface>
  );
}
