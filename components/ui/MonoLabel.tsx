type MonoLabelProps = {
  children: string;
  tone?: "blue" | "red" | "ink";
  className?: string;
};

const toneClasses = {
  blue: "text-elaman-blue",
  red: "text-elaman-red",
  ink: "text-graphite-soft",
} as const;

export function MonoLabel({ children, tone = "blue", className = "" }: MonoLabelProps) {
  return (
    <p className={`font-mono-label ${toneClasses[tone]} ${className}`}>{children}</p>
  );
}
