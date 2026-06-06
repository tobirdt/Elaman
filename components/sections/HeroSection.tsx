import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroSignalVisual } from "@/components/ui/HeroSignalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VisualLayer } from "@/components/motion/VisualLayer";
import { heroContent } from "@/lib/content/hero";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-20 lg:min-h-[calc(100vh-5rem)] lg:pb-16 lg:pt-16 xl:pt-20">
      <VisualLayer>
        <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-elaman-blue/10 bg-elaman-blue/[0.025]" />
        <div className="technical-grid absolute inset-x-0 top-0 h-[38rem] opacity-50" />
      </VisualLayer>

      <Container className="grid items-center gap-9 lg:grid-cols-[0.98fr_1.02fr]">
        <div>
          <SectionLabel>{heroContent.label}</SectionLabel>
          <h1 className="max-w-5xl text-[clamp(2.65rem,12vw,4.35rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-graphite sm:text-[clamp(3.1rem,6.8vw,6.4rem)]">
            {heroContent.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-7 tracking-[-0.01em] text-graphite sm:hidden">
            {heroContent.mobileIntro}
          </p>
          <p className="mt-6 hidden max-w-2xl text-xl leading-8 tracking-[-0.01em] text-graphite sm:block xl:text-2xl xl:leading-9">
            {heroContent.intro}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-graphite-muted sm:hidden">
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
          <dl className="mt-8 grid grid-cols-3 gap-3 xl:mt-10">
            {heroContent.stats.map((stat) => (
              <div key={stat.value} className="border-t border-line pt-4">
                <dt className="text-xl font-semibold tracking-[-0.04em] text-graphite sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[0.68rem] leading-5 text-graphite-muted sm:text-xs">
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
