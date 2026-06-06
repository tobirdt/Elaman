import type { ComponentPropsWithoutRef, ReactNode } from "react";

type GlassPanelProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export function GlassPanel({ children, className = "", ...props }: GlassPanelProps) {
  return (
    <div className={`glass-surface rounded-lg ${className}`} {...props}>
      {children}
    </div>
  );
}
