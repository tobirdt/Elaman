import type { DeliveryStep } from "@/types/site";

type ProcessRailProps = {
  steps: readonly DeliveryStep[];
};

export function ProcessRail({ steps }: ProcessRailProps) {
  return (
    <ol className="mt-8 grid gap-px overflow-hidden border-y border-[var(--border-hairline-strong)] bg-[var(--border-hairline)] sm:grid-cols-2 md:mt-10 lg:grid-cols-3 xl:grid-cols-5">
      {steps.map((step, index) => (
        <li
          key={step.step}
          className="grid grid-cols-[2rem_6.5rem_minmax(0,1fr)] gap-3 bg-[var(--surface-soft)] px-1 py-5 sm:block sm:min-h-52 sm:px-6 sm:py-7 sm:last:col-span-2 lg:last:col-span-2 xl:last:col-span-1"
        >
          <span
            className={`font-mono text-xs font-medium tabular-nums ${index === 0 ? "text-elaman-blue" : "text-graphite-soft"}`}
          >
            {step.step}
          </span>
          <h3 className="text-base font-semibold tracking-[-0.03em] text-graphite sm:mt-8 sm:text-xl">
            {step.title}
          </h3>
          <p className="text-pretty text-xs leading-5 text-graphite-muted sm:mt-3 sm:text-sm sm:leading-6">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
