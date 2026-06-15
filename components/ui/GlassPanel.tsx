import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Surface } from "@/components/ui/Surface";

type GlassPanelProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export function GlassPanel({ children, className = "", ...props }: GlassPanelProps) {
  return (
    <Surface variant="glass" className={className} {...props}>
      {children}
    </Surface>
  );
}
