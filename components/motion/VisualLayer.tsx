import type { ReactNode } from "react";

type VisualLayerProps = {
  children: ReactNode;
  className?: string;
};

export function VisualLayer({ children, className = "" }: VisualLayerProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {children}
    </div>
  );
}
