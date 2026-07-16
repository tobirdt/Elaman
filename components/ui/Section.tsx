import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { SectionMode } from "@/lib/design/tokens";

type SectionTone = "white" | "soft" | "plain";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  tone?: SectionTone;
  variant?: SectionMode;
};

const modeClasses = {
  screen: "section-screen min-h-[var(--section-screen-min)]",
  "content-band": "section-content-band py-[var(--section-y-content-band)]",
  "legal-page": "section-legal-page py-[var(--section-y-legal-page)]",
} as const;

const toneClasses: Record<SectionTone, string> = {
  white: "bg-[var(--surface-paper)]",
  soft: "bg-[var(--surface-paper-soft)]",
  plain: "",
};

export function Section({
  children,
  className = "",
  tone = "plain",
  variant = "content-band",
  ...props
}: SectionProps) {
  return (
    <section
      className={`${modeClasses[variant]} ${toneClasses[tone]} ${className}`}
      data-section-mode={variant}
      {...props}
    >
      {children}
    </section>
  );
}
