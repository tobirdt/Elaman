import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SectionVariant = "hero" | "screen" | "band" | "compact";
type SectionTone = "white" | "soft" | "plain";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  compact?: boolean;
  tone?: SectionTone;
  variant?: SectionVariant;
  screen?: boolean;
};

const variantClasses: Record<SectionVariant, string> = {
  hero:
    "flex min-h-[calc(100svh-var(--header-h))] items-center py-[var(--section-y-hero)]",
  screen: "screen-section py-[var(--section-y-screen)]",
  band: "py-[var(--section-y-band)]",
  compact: "py-[var(--section-y-compact)]",
};

const toneClasses: Record<SectionTone, string> = {
  white: "bg-white",
  soft: "bg-[var(--surface-soft)]",
  plain: "",
};

export function Section({
  children,
  className = "",
  compact = false,
  tone = "plain",
  variant,
  screen = false,
  ...props
}: SectionProps) {
  const resolvedVariant = variant ?? (screen ? "screen" : compact ? "compact" : "band");

  return (
    <section
      className={`${variantClasses[resolvedVariant]} ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
