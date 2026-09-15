type SectionLabelTone = "blue" | "dark" | "on-dark";

type SectionLabelProps = {
  children: string;
  tone?: SectionLabelTone;
};

const toneClasses: Record<SectionLabelTone, string> = {
  blue: "text-elaman-blue",
  dark: "text-graphite",
  "on-dark": "text-[var(--color-on-dark-muted)]",
};

/**
 * The one way a section names itself. Mono, uppercase, in the house blue,
 * directly above the heading it belongs to. There is no second label
 * treatment: a rule without text, a large grey word, or a heading with no
 * label at all each made the same role look like a different one.
 */
export function SectionLabel({ children, tone = "blue" }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] ${toneClasses[tone]}`}
    >
      {children}
    </p>
  );
}
