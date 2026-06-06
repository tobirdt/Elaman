import type { DeliveryStep } from "@/types/site";

type ProcessRailProps = {
  steps: readonly DeliveryStep[];
};

export function ProcessRail({ steps }: ProcessRailProps) {
  return (
    <div className="relative mt-10 sm:mt-14">
      <div
        className="absolute left-4 right-4 top-7 hidden h-px bg-gradient-to-r from-elaman-blue/30 via-graphite/14 to-elaman-red/30 lg:block"
        aria-hidden="true"
      />
      <div className="grid gap-4 lg:grid-cols-5">
        {steps.map((step) => (
          <article
            key={step.step}
            className="group relative rounded-lg border border-line bg-white/82 p-5 shadow-[0_18px_70px_rgba(22,24,29,0.045)] transition duration-200 hover:-translate-y-1 hover:border-elaman-blue/22"
          >
            <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-line bg-white text-xs font-semibold text-elaman-blue shadow-[0_10px_30px_rgba(22,24,29,0.07)]">
              {step.step}
            </div>
            <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-graphite lg:mt-12">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-graphite-muted">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
