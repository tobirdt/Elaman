import type { ReactNode } from "react";

import { type ContainerSize } from "@/lib/design/tokens";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

const sizeClasses: Record<ContainerSize, string> = {
  page: "max-w-[var(--container-page)]",
  content: "max-w-[var(--container-content)]",
  copy: "max-w-[var(--container-copy)]",
  narrow: "max-w-[var(--container-narrow)]",
  legal: "max-w-[var(--container-legal)]",
};

export function Container({ children, className = "", size = "page" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${sizeClasses[size]} px-[var(--page-x)] ${className}`}
      data-container-size={size}
    >
      {children}
    </div>
  );
}
