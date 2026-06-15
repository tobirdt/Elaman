import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { resolveSectionMode, type SectionModeInput } from "@/lib/design/tokens";

type SectionTone = "white" | "soft" | "plain";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  /** @deprecated Use `variant="legal-page"` */
  compact?: boolean;
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
  white: "bg-[var(--surface-white)]",
  soft: "bg-[var(--surface-soft)]",
  plain: "",
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
  tone = "plain",
  variant,
  screen = false,
  ...props
}: SectionProps) {
  const resolvedMode = resolveSectionMode(resolveVariant(variant, screen, compact));

  return (
    <section
      className={`${modeClasses[resolvedMode]} ${toneClasses[tone]} ${className}`}
      data-section-mode={resolvedMode}
      {...props}
    >
      {children}
    </section>
  );
}
