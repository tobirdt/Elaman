type SectionLabelProps = {
  children: string;
  tone?: "blue" | "red" | "dark";
};

const toneClasses = {
  blue: "text-elaman-blue",
  red: "text-elaman-red",
  dark: "text-graphite",
};

export function SectionLabel({ children, tone = "blue" }: SectionLabelProps) {
  return (
    <p
      className={`mb-5 flex items-center gap-3 font-mono text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] ${toneClasses[tone]}`}
    >
      <span className="h-px w-8 bg-current sm:w-9" aria-hidden="true" />
      {children}
    </p>
  );
}
