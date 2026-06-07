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
          <article
            key={step.step}
            className="group relative overflow-hidden rounded-xl border border-line bg-white/84 p-4 shadow-[0_16px_60px_rgba(22,24,29,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-elaman-blue/22 hover:shadow-[0_24px_76px_rgba(22,24,29,0.07)]"
          >
            {/* Step number badge */}
            <div
              className={`relative z-10 flex size-12 items-center justify-center rounded-full border text-xs font-semibold shadow-[0_8px_24px_rgba(22,24,29,0.07)] ${
                isLast(index)
                  ? "border-elaman-red/24 bg-elaman-red/6 text-elaman-red"
                  : "border-elaman-blue/20 bg-elaman-blue/6 text-elaman-blue"
              }`}
            >
              {step.step}
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-graphite lg:mt-8">
              {step.title}
            </h3>
            <p className="mt-2.5 text-sm leading-6 text-graphite-muted">
              {step.description}
            </p>
            {/* Bottom accent */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition duration-300 group-hover:opacity-100 ${
                isLast(index)
                  ? "bg-gradient-to-r from-transparent via-elaman-red/36 to-transparent"
                  : "bg-gradient-to-r from-transparent via-elaman-blue/32 to-transparent"
              }`}
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </div>
  );
}
