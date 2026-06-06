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
      className={`mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] ${toneClasses[tone]}`}
    >
      <span className="h-px w-9 bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}
