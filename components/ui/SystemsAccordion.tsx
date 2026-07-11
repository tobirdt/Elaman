"use client";

import { useId } from "react";

import type { ContentCard } from "@/types/site";

type SystemsAccordionProps = {
  activeIndex: number | null;
  items: readonly ContentCard[];
  onSelect: (index: number | null) => void;
  redIndex: number;
};

export function SystemsAccordion({
  activeIndex,
  items,
  onSelect,
  redIndex,
}: SystemsAccordionProps) {
  const baseId = useId();

  return (
    <div>
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        const buttonId = baseId + "-button-" + index;
        const panelId = baseId + "-panel-" + index;

        return (
          <div key={item.title} className="border-t border-[var(--border-hairline)]">
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isActive}
                className={[
                  "group flex min-h-14 w-full items-center justify-between gap-4 py-3.5 text-left transition-colors [transition-duration:var(--motion-fast)]",
                  isActive ? "text-graphite" : "text-graphite-muted hover:text-graphite",
                ].join(" ")}
                id={buttonId}
                onClick={() => onSelect(isActive ? null : index)}
                type="button"
              >
                <span className="flex min-w-0 items-baseline gap-4">
                  <span
                    className={[
                      "font-mono-label",
                      isActive
                        ? index === redIndex
                          ? "text-elaman-red"
                          : "text-elaman-blue"
                        : "",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold leading-snug tracking-[var(--tracking-title)]">
                    {item.title}
                  </span>
                </span>
                <span
                  className={[
                    "shrink-0 text-lg leading-none transition-transform [transition-duration:var(--motion-state)]",
                    isActive && index === redIndex
                      ? "text-elaman-red"
                      : "text-elaman-blue",
                    isActive ? "rotate-45" : "",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div
              aria-hidden={!isActive}
              aria-labelledby={buttonId}
              className={[
                "grid transition-[grid-template-rows,opacity] [transition-duration:var(--motion-expand)] [transition-timing-function:var(--motion-ease)] motion-reduce:transition-none",
                isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
              id={panelId}
              role="region"
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-base leading-7 text-graphite-muted">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="rule-hairline" aria-hidden="true" />
    </div>
  );
}
