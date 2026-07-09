type MonoLabelProps = {
  children: string;
  tone?: "blue" | "red" | "ink" | "onDark";
  className?: string;
};

const toneClasses = {
  blue: "text-elaman-blue",
  red: "text-elaman-red",
  ink: "text-graphite-soft",
  onDark: "text-[var(--color-on-dark-muted)]",
} as const;

/** Technical eyebrow label — the mono voice of the design system. */
export function MonoLabel({ children, tone = "blue", className = "" }: MonoLabelProps) {
  return <p className={`font-mono-label ${toneClasses[tone]} ${className}`}>{children}</p>;
}
