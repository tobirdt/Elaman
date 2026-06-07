import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  compact?: boolean;
  screen?: boolean;
};

export function Section({
  children,
  className = "",
  compact = false,
  screen = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={`${screen ? "screen-section" : ""} ${compact ? "py-[var(--section-y-compact)]" : "py-[var(--section-y)]"} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
