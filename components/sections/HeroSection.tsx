import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroSignalVisual } from "@/components/ui/HeroSignalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VisualLayer } from "@/components/motion/VisualLayer";
import { heroContent } from "@/lib/content/hero";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden py-8 sm:py-10 lg:py-8"
    >
      <VisualLayer>
        <div className="absolute left-1/2 top-0 h-[min(34rem,90vw)] w-[min(34rem,90vw)] -translate-x-1/2 rounded-full border border-elaman-blue/10 bg-elaman-blue/[0.025] lg:h-[42rem] lg:w-[42rem]" />
        <div className="technical-grid absolute inset-x-0 top-0 h-[34rem] opacity-45" />
      </VisualLayer>

      <Container className="grid items-center gap-8 lg:grid-cols-[0.98fr_1.02fr] xl:gap-12">
        <div>
          <SectionLabel>{heroContent.label}</SectionLabel>
          <h1 className="text-balance max-w-[10.5ch] text-[clamp(2.75rem,11vw,4.35rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-graphite sm:max-w-5xl sm:text-[clamp(3.35rem,6.2vw,6.15rem)] sm:leading-[0.92] sm:tracking-[-0.055em]">
            {heroContent.title}
          </h1>
          <p className="mt-5 max-w-[32ch] text-base leading-7 tracking-[-0.01em] text-graphite sm:hidden">
            {heroContent.mobileIntro}
          </p>
          <p className="mt-6 hidden max-w-2xl text-xl leading-8 tracking-[-0.01em] text-graphite sm:block xl:text-2xl xl:leading-9">
            {heroContent.intro}
          </p>
          <p className="mt-4 max-w-[34ch] text-sm leading-7 text-graphite-muted sm:hidden">
            {heroContent.mobileBody}
          </p>
          <p className="mt-4 hidden max-w-2xl text-base leading-7 text-graphite-muted sm:block xl:text-lg xl:leading-8">
            {heroContent.body}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row xl:mt-8">
            <Button href={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
            </Button>
            <Button href={heroContent.secondaryCta.href} variant="secondary">
              {heroContent.secondaryCta.label}
            </Button>
          </div>
          <dl className="mt-7 grid gap-3 sm:grid-cols-3 xl:mt-9">
            {heroContent.stats.map((stat) => (
              <div key={stat.value} className="min-w-0 border-t border-line pt-4">
                <dt className="text-lg font-semibold tracking-[-0.04em] text-graphite sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[0.66rem] leading-5 text-graphite-muted sm:max-w-36 sm:text-xs">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroSignalVisual />
      </Container>
    </section>
  );
}
