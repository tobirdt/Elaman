import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { resolveSectionMode, type SectionModeInput } from "@/lib/design/tokens";

type SectionTone = "paper" | "navy" | "plain" | "white" | "soft";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  /** @deprecated Use `variant="legal-page"` */
  compact?: boolean;
  modeLayout?: boolean;
  tone?: SectionTone;
  variant?: SectionModeInput;
  /** @deprecated Use `variant="screen"` */
  screen?: boolean;
};

const modeClasses = {
  "hero-screen":
    "section-hero-screen flex min-h-[var(--section-min-hero-screen)] items-center py-[var(--section-y-hero-screen)]",
  screen: "section-screen screen-section py-[var(--section-y-screen)]",
  "screen-lite":
    "section-screen-lite screen-lite-section py-[var(--section-y-screen-lite)]",
  "content-band": "section-content-band py-[var(--section-y-content-band)]",
  "legal-page": "section-legal-page py-[var(--section-y-legal-page)]",
} as const;

const toneClasses: Record<SectionTone, string> = {
  paper: "bg-[var(--surface-paper)]",
  navy: "bg-[var(--surface-navy)] text-[var(--color-on-dark)]",
  plain: "",
  white: "bg-[var(--surface-paper)]",
  soft: "bg-[var(--surface-paper-soft)]",
};

function resolveVariant(
  variant: SectionModeInput | undefined,
  screen: boolean,
  compact: boolean,
): SectionModeInput {
  if (variant) {
    return variant;
  }

  if (screen) {
    return "screen";
  }

  if (compact) {
    return "legal-page";
  }

  return "content-band";
}

export function Section({
  children,
  className = "",
  compact = false,
  modeLayout = true,
  tone = "plain",
  variant,
  screen = false,
  ...props
}: SectionProps) {
  const resolvedMode = resolveSectionMode(resolveVariant(variant, screen, compact));

  return (
    <section
      className={`${modeLayout ? modeClasses[resolvedMode] : ""} ${toneClasses[tone]} ${className}`}
      data-section-mode={resolvedMode}
      {...props}
    >
      {children}
    </section>
  );
}
