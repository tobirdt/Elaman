import { createElement, type ComponentPropsWithoutRef, type ReactNode } from "react";

import type { SurfaceLevel } from "@/lib/design/tokens";

type SurfaceElement = "article" | "aside" | "div" | "li";

type SurfaceVariant =
  | SurfaceLevel
  | "strongGlass"
  | "inset"
  | "panel"
  | "card"
  | "glass"
  | "darkPanel";

type SurfaceTone = "neutral" | "blue" | "red";

type SurfaceProps = ComponentPropsWithoutRef<"div"> & {
  as?: SurfaceElement;
  children: ReactNode;
  interactive?: boolean;
  tone?: SurfaceTone;
  variant?: SurfaceVariant;
};

const variantClasses: Record<SurfaceVariant, string> = {
  card: "surface-card",
  panel: "surface-panel",
  glass: "surface-glass",
  "dark-panel": "surface-dark-panel",
  darkPanel: "surface-dark-panel",
  strongGlass: "surface-glass-strong",
  inset:
    "rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-[var(--surface-soft)] shadow-[var(--shadow-none)]",
};

const toneClasses: Record<SurfaceTone, string> = {
  neutral: "",
  blue: "hover:border-[var(--border-accent-blue)]",
  red: "hover:border-[var(--border-accent-red)]",
};

export function Surface({
  as: Element = "div",
  children,
  className = "",
  interactive = false,
  tone = "neutral",
  variant = "card",
  ...props
}: SurfaceProps) {
  return createElement(
    Element,
    {
      ...props,
      className: `${variantClasses[variant]} ${interactive ? "surface-interactive" : ""} ${toneClasses[tone]} ${className}`,
    },
    children,
  );
}
