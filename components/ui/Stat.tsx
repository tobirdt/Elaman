type StatProps = {
  value: string;
  caption: string;
  onDark?: boolean;
  /** numeral for short figures, h3 for word values that would wrap. */
  size?: "numeral" | "h3";
  className?: string;
};

const valueSizeClasses = {
  numeral: "text-[length:var(--type-numeral)]",
  h3: "text-[length:var(--type-h3)]",
} as const;

/**
 * Oversized editorial numeral with a mono caption — device D3 of the visual
 * signature. Keep to one stat group per viewport.
 */
export function Stat({
  value,
  caption,
  onDark = false,
  size = "numeral",
  className = "",
}: StatProps) {
  return (
    <div className={className}>
      <p
        className={`text-balance font-semibold leading-none tracking-[var(--tracking-title)] ${valueSizeClasses[size]} ${
          onDark ? "text-[var(--color-on-dark)]" : "text-graphite"
        }`}
      >
        {value}
      </p>
      <p
        className={`font-mono-label mt-3 ${
          onDark ? "text-[var(--color-on-dark-muted)]" : "text-graphite-soft"
        }`}
      >
        {caption}
      </p>
    </div>
  );
}
