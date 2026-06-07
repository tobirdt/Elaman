import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroSignalVisual } from "@/components/ui/HeroSignalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VisualLayer } from "@/components/motion/VisualLayer";
import type { LocalizedSiteContent } from "@/lib/content/site";
import { sectionPath, type Locale } from "@/lib/i18n";

type HeroSectionProps = {
  locale: Locale;
  content: LocalizedSiteContent["hero"];
};

export function HeroSection({ locale, content }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden py-8 sm:py-10 lg:py-8"
    >
      <VisualLayer>
        {/* Large ambient circle centered on hero */}
        <div className="absolute left-1/2 top-0 h-[min(38rem,95vw)] w-[min(38rem,95vw)] -translate-x-1/2 rounded-full border border-elaman-blue/8 bg-elaman-blue/[0.02] lg:h-[46rem] lg:w-[46rem]" />
        <div className="absolute left-1/2 top-16 h-[min(22rem,60vw)] w-[min(22rem,60vw)] -translate-x-1/2 rounded-full border border-elaman-blue/6 lg:h-[28rem] lg:w-[28rem]" />
        <div className="technical-grid absolute inset-x-0 top-0 h-[36rem] opacity-40" />
        {/* Corner signal accents */}
        <div className="absolute left-[var(--page-x)] top-0 h-16 w-px bg-gradient-to-b from-elaman-blue/20 to-transparent" />
        <div className="absolute right-[var(--page-x)] top-0 h-16 w-px bg-gradient-to-b from-elaman-red/16 to-transparent" />
      </VisualLayer>

      <Container className="grid items-center gap-8 [&>*]:min-w-0 lg:grid-cols-[1fr_1fr] xl:gap-14">
        <div>
          <SectionLabel>{content.label}</SectionLabel>
          <h1 className="text-balance max-w-[10.5ch] text-[clamp(2.75rem,11vw,4.35rem)] font-semibold leading-[0.93] tracking-[-0.048em] text-graphite sm:max-w-5xl sm:text-[clamp(3.35rem,6.2vw,5.9rem)] sm:leading-[0.91] sm:tracking-[-0.058em]">
            {content.title}
          </h1>
          <p className="mt-5 max-w-[32ch] text-base leading-7 tracking-[-0.01em] text-graphite sm:hidden">
            {content.mobileIntro}
          </p>
          <p className="mt-6 hidden max-w-xl text-xl leading-8 tracking-[-0.015em] text-graphite sm:block xl:text-2xl xl:leading-9">
            {content.intro}
          </p>
          <p className="mt-4 max-w-[34ch] text-sm leading-7 text-graphite-muted sm:hidden">
            {content.mobileBody}
          </p>
          <p className="mt-4 hidden max-w-lg text-[0.94rem] leading-7 text-graphite-muted sm:block xl:text-base xl:leading-8">
            {content.body}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row xl:mt-8">
            <Button href={sectionPath(locale, content.primaryCta.href)}>
              {content.primaryCta.label}
            </Button>
            <Button
              href={sectionPath(locale, content.secondaryCta.href)}
              variant="secondary"
            >
              {content.secondaryCta.label}
            </Button>
          </div>

          {/* Stats */}
          <dl className="mt-8 grid gap-x-2 gap-y-4 [grid-template-columns:repeat(3,minmax(0,1fr))] xl:mt-10">
            {content.stats.map((stat) => (
              <div key={stat.value} className="min-w-0 border-t border-line pt-4">
                <dt className="text-xl font-semibold tracking-[-0.045em] text-graphite sm:text-[1.6rem]">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-[0.65rem] leading-5 text-graphite-muted sm:text-xs sm:leading-5">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroSignalVisual
          label={content.visualLabel}
          body={content.visualBody}
          badge={content.visualBadge}
          steps={content.visualSteps}
        />
      </Container>
    </section>
  );
}
