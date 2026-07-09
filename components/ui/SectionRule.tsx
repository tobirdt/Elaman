type SectionRuleProps = {
  /** Zero-padded section index, e.g. "01". */
  index: string;
  /** Short technical keyword shown at the right end of the rule. */
  keyword: string;
  /** Accent for the keyword — red is reserved for protection semantics. */
  accent?: "ink" | "blue" | "red";
  onDark?: boolean;
  className?: string;
};

const accentClasses = {
  ink: "",
  blue: "text-elaman-blue",
  red: "text-elaman-red",
} as const;

/**
 * Register rule — the title block of a technical drawing. Every top-level
 * section opens with one: a full-width hairline carrying a mono index on the
 * left and a mono keyword on the right.
 */
export function SectionRule({
  index,
  keyword,
  accent = "ink",
  onDark = false,
  className = "",
}: SectionRuleProps) {
  const lineClass = onDark ? "border-[var(--border-on-navy)]" : "border-[var(--border-hairline)]";
  const baseText = onDark ? "text-[var(--color-on-dark-muted)]" : "text-graphite-soft";

  return (
    <div
      className={`flex items-baseline justify-between gap-4 border-t pt-3 ${lineClass} ${className}`}
    >
      <span className={`font-mono-label ${baseText}`}>{index}</span>
      <span
        className={`font-mono-label text-right ${accent === "ink" ? baseText : accentClasses[accent]}`}
      >
        {keyword}
      </span>
    </div>
  );
}
