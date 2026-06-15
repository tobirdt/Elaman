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
    <Section id="hero" variant="hero" className="relative isolate overflow-hidden">
      <VisualLayer>
        {/* Large ambient circle centered on hero */}
        <div className="absolute left-1/2 top-0 h-[min(38rem,95vw)] w-[min(38rem,95vw)] -translate-x-1/2 rounded-full border border-elaman-blue/8 bg-elaman-blue/[0.02] lg:h-[46rem] lg:w-[46rem]" />
        <div className="absolute left-1/2 top-16 h-[min(22rem,60vw)] w-[min(22rem,60vw)] -translate-x-1/2 rounded-full border border-elaman-blue/6 lg:h-[28rem] lg:w-[28rem]" />
        <div className="technical-grid absolute inset-x-0 top-0 h-[36rem] opacity-40" />
        {/* Corner signal accents */}
        <div className="absolute left-[var(--page-x)] top-0 h-16 w-px bg-gradient-to-b from-elaman-blue/20 to-transparent" />
        <div className="absolute right-[var(--page-x)] top-0 h-16 w-px bg-gradient-to-b from-elaman-red/16 to-transparent" />
      </VisualLayer>

      <Container className="grid items-center gap-[var(--section-gap)] [&>*]:min-w-0 lg:grid-cols-2">
        <div>
          <SectionLabel>{content.label}</SectionLabel>
          <h1 className="text-balance max-w-[10.5ch] text-[length:var(--type-display)] font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-graphite sm:max-w-5xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-[32ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite sm:hidden">
            {content.mobileIntro}
          </p>
          <p className="mt-6 hidden max-w-[var(--container-copy)] text-[length:var(--type-lead)] leading-[var(--leading-body)] text-graphite sm:block">
            {content.intro}
          </p>
          <p className="mt-4 max-w-[34ch] text-sm leading-[var(--leading-body)] text-graphite-muted sm:hidden">
            {content.mobileBody}
          </p>
          <p className="mt-4 hidden max-w-[var(--container-narrow)] text-sm leading-[var(--leading-body)] text-graphite-muted sm:block xl:text-base">
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
          <dl className="mt-8 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-3 xl:mt-10">
            {content.stats.map((stat) => (
              <div key={stat.value} className="min-w-0 border-t border-line pt-4">
                <dt className="text-[length:var(--type-h3)] font-semibold tracking-[var(--tracking-title)] text-graphite">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-[length:var(--type-micro)] leading-5 text-graphite-muted">
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
    </Section>
  );
}
