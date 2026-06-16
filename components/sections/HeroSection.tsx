import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroSignalVisual } from "@/components/ui/HeroSignalVisual";
import { Section } from "@/components/ui/Section";
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
    <Section
      id="hero"
      variant="hero-screen"
      tone="white"
      className="relative isolate overflow-hidden"
    >
      <VisualLayer>
        <div className="absolute left-1/2 top-0 h-[min(34rem,90vw)] w-[min(34rem,90vw)] -translate-x-1/2 rounded-full border border-elaman-blue/8 bg-elaman-blue/[0.018] lg:h-[42rem] lg:w-[42rem]" />
        <div className="absolute left-1/2 top-20 h-[min(20rem,58vw)] w-[min(20rem,58vw)] -translate-x-1/2 rounded-full border border-elaman-blue/6 lg:h-[25rem] lg:w-[25rem]" />
        <div className="technical-grid absolute inset-x-0 top-0 h-[34rem] opacity-25" />
        <div className="absolute left-[var(--page-x)] top-0 h-16 w-px bg-gradient-to-b from-elaman-blue/20 to-transparent" />
        <div className="absolute right-[var(--page-x)] top-0 h-16 w-px bg-gradient-to-b from-elaman-red/16 to-transparent" />
      </VisualLayer>

      <Container className="grid items-center gap-[var(--section-gap)] [&>*]:min-w-0 lg:-mt-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div>
          <SectionLabel>{content.label}</SectionLabel>
          <h1 className="text-balance max-w-[13.5ch] text-[clamp(3rem,5.2vw,4.9rem)] font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-graphite sm:max-w-[15ch]">
            {content.title}
          </h1>
          <p className="mt-5 max-w-[32ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite sm:hidden">
            {content.mobileIntro}
          </p>
          <p className="mt-6 hidden max-w-[var(--container-copy)] text-[length:var(--type-lead)] leading-[var(--leading-body)] text-graphite sm:block">
            {content.intro}
          </p>
          <p className="mt-4 max-w-[34ch] text-sm leading-[var(--leading-body)] text-graphite-muted sm:block 2xl:hidden">
            {content.mobileBody}
          </p>
          <p className="mt-4 hidden max-w-[36rem] text-base leading-[var(--leading-body)] text-graphite-muted 2xl:block">
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

          <HeroSignalVisual
            className="mt-7 lg:hidden"
            label={content.visualLabel}
            body={content.visualBody}
            badge={content.visualBadge}
            size="compact"
            steps={content.visualSteps}
          />

          <dl className="mt-8 grid grid-cols-1 gap-4 border-y border-line/80 py-4 sm:grid-cols-3 xl:mt-10">
            {content.stats.map((stat) => (
              <div key={stat.value} className="min-w-0">
                <dt className="text-lg font-semibold leading-tight tracking-[var(--tracking-title)] text-graphite sm:text-xl">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 max-w-48 text-[length:var(--type-micro)] leading-5 text-graphite-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroSignalVisual
          className="hidden lg:block"
          label={content.visualLabel}
          body={content.visualBody}
          badge={content.visualBadge}
          steps={content.visualSteps}
        />
      </Container>
    </Section>
  );
}
