type TechnicalMarkProps = {
  tone?: "blue" | "red" | "neutral";
  className?: string;
};

const toneClasses = {
  blue: "border-elaman-blue/24 bg-elaman-blue/[0.055]",
  red: "border-elaman-red/24 bg-elaman-red/[0.055]",
  neutral: "border-graphite/10 bg-white/70",
};

export function TechnicalMark({ tone = "blue", className = "" }: TechnicalMarkProps) {
  return (
    <span
      className={`inline-grid size-11 place-items-center rounded-sm border ${toneClasses[tone]} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="size-5" fill="none">
        <path
          d="M6 16h7.5M18.5 16H26M16 6v7.5M16 18.5V26"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className={
            tone === "red"
              ? "text-elaman-red"
              : tone === "neutral"
                ? "text-graphite-muted"
                : "text-elaman-blue"
          }
        />
        <circle cx="16" cy="16" r="3.25" className="fill-current text-white" />
        <circle
          cx="16"
          cy="16"
          r="2"
          className={
            tone === "red"
              ? "fill-elaman-red"
              : tone === "neutral"
                ? "fill-graphite"
                : "fill-elaman-blue"
          }
        />
      </svg>
    </span>
  );
}
