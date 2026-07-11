import type { SVGProps } from "react";

type CapabilityMarkProps = Omit<SVGProps<SVGSVGElement>, "children" | "viewBox"> & {
  index: number;
};

const muted = "var(--color-graphite-soft)";

/**
 * Small service-specific signal marks. They stay intentionally diagrammatic:
 * they distinguish the four established pillars without becoming an icon set
 * or a product taxonomy.
 */
export function CapabilityMark({ index, className = "", ...props }: CapabilityMarkProps) {
  const accentClass = index === 2 ? "text-elaman-red" : "text-elaman-blue";

  return (
    <svg
      aria-hidden="true"
      className={"size-9 " + accentClass + " " + className}
      fill="none"
      focusable="false"
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {index === 0 ? (
        <>
          <path d="M4 24h9l6-12h13" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="4" cy="24" r="2.25" fill={muted} />
          <circle cx="19" cy="12" r="2.25" fill="currentColor" />
          <circle cx="32" cy="12" r="2.25" fill={muted} />
        </>
      ) : null}
      {index === 1 ? (
        <>
          <path d="M5 8h10v20h16" stroke="currentColor" strokeWidth="1.25" />
          <path d="M15 18h10V8h6" stroke={muted} strokeWidth="1.25" />
          <circle cx="15" cy="18" r="2.25" fill="currentColor" />
          <circle cx="31" cy="8" r="2.25" fill={muted} />
          <circle cx="31" cy="28" r="2.25" fill={muted} />
        </>
      ) : null}
      {index === 2 ? (
        <>
          <rect
            x="6.5"
            y="6.5"
            width="23"
            height="23"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <path d="M11 18h14M18 11v14" stroke={muted} strokeWidth="1.25" />
          <circle cx="18" cy="18" r="2.75" fill="currentColor" />
        </>
      ) : null}
      {index === 3 ? (
        <>
          <path d="M5 11h8l5 7 5-7h8" stroke="currentColor" strokeWidth="1.25" />
          <path d="M5 25h8l5-7 5 7h8" stroke={muted} strokeWidth="1.25" />
          <circle cx="18" cy="18" r="2.25" fill="currentColor" />
        </>
      ) : null}
    </svg>
  );
}
