import { Surface } from "@/components/ui/Surface";
import type { DeliveryStep } from "@/types/site";

type ProcessRailProps = {
  steps: readonly DeliveryStep[];
};

export function ProcessRail({ steps }: ProcessRailProps) {
  const isLast = (index: number) => index === steps.length - 1;

  return (
    <div className="relative mt-9 sm:mt-11">
      {/* Connector line (desktop) */}
      <div
        className="absolute left-8 right-8 top-6 hidden h-px bg-gradient-to-r from-elaman-blue/28 via-graphite/10 to-elaman-red/28 lg:block"
        aria-hidden="true"
      />
      <div className="grid gap-3.5 [&>*]:min-w-0 lg:grid-cols-5">
        {steps.map((step, index) => (
          <Surface
            as="article"
            key={step.step}
            className="group relative overflow-hidden p-4"
            interactive
            tone={isLast(index) ? "red" : "blue"}
            variant="card"
          >
            {/* Step number badge */}
            <div
              className={`relative z-10 flex size-12 items-center justify-center rounded-[var(--radius-pill)] border text-xs font-semibold shadow-[var(--shadow-card)] ${
                isLast(index)
                  ? "border-elaman-red/24 bg-elaman-red/6 text-elaman-red"
                  : "border-elaman-blue/20 bg-elaman-blue/6 text-elaman-blue"
              }`}
            >
              {step.step}
            </div>
            <h3 className="mt-5 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite lg:mt-8">
              {step.title}
            </h3>
            <p className="mt-2.5 text-sm leading-6 text-graphite-muted">
              {step.description}
            </p>
            {/* Bottom accent */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition [transition-duration:var(--motion-medium)] [transition-timing-function:var(--motion-ease)] group-hover:opacity-100 ${
                isLast(index)
                  ? "bg-gradient-to-r from-transparent via-elaman-red/36 to-transparent"
                  : "bg-gradient-to-r from-transparent via-elaman-blue/32 to-transparent"
              }`}
              aria-hidden="true"
            />
          </Surface>
        ))}
      </div>
    </div>
  );
}
