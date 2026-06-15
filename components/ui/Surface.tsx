import { createElement, type ComponentPropsWithoutRef, type ReactNode } from "react";

type SurfaceElement = "article" | "aside" | "div" | "li";
type SurfaceVariant = "panel" | "card" | "glass" | "strongGlass" | "inset";
type SurfaceTone = "neutral" | "blue" | "red";

type SurfaceProps = ComponentPropsWithoutRef<"div"> & {
  as?: SurfaceElement;
  children: ReactNode;
  interactive?: boolean;
  tone?: SurfaceTone;
  variant?: SurfaceVariant;
};

const variantClasses: Record<SurfaceVariant, string> = {
  panel:
    "rounded-[var(--radius-panel)] border border-[var(--border-soft)] bg-[var(--surface-white)] shadow-[var(--shadow-panel)]",
  card:
    "rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-[var(--surface-card)] shadow-[var(--shadow-card)]",
  glass:
    "rounded-[var(--radius-panel)] border border-[var(--border-soft)] bg-[var(--surface-glass)] shadow-[var(--shadow-panel)] backdrop-blur-2xl",
  strongGlass:
    "rounded-[var(--radius-panel)] border border-[var(--border-glass)] bg-[var(--surface-glass-strong)] shadow-[var(--shadow-panel)] backdrop-blur-2xl",
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
      className: `${variantClasses[variant]} ${interactive ? "surface-transition transition hover:-translate-y-1 hover:shadow-[var(--shadow-panel)]" : ""} ${toneClasses[tone]} ${className}`,
    },
    children,
  );
}
