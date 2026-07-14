type SectionRuleProps = {
  index: string;
  keyword: string;
  accent?: "ink" | "blue" | "red";
  className?: string;
};

const accentClasses = {
  ink: "text-graphite-soft",
  blue: "text-elaman-blue",
  red: "text-elaman-red",
} as const;

export function SectionRule({
  index,
  keyword,
  accent = "ink",
  className = "",
}: SectionRuleProps) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 border-t border-[var(--border-hairline)] pt-3 ${className}`}
    >
      <span className="font-mono-label text-graphite-soft">{index}</span>
      <span className={`font-mono-label text-right ${accentClasses[accent]}`}>
        {keyword}
      </span>
    </div>
  );
}
