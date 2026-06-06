import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  compact?: boolean;
};

export function Section({
  children,
  className = "",
  compact = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={`${compact ? "py-[var(--section-y-compact)]" : "py-[var(--section-y)]"} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
