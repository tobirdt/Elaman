import { MobileStoryVisual } from "@/components/motion/MobileStoryVisual";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Surface } from "@/components/ui/Surface";
import type { LocalizedSiteContent } from "@/lib/content/site";
import { sectionPath, type Locale } from "@/lib/i18n";

type MobileStorySequenceProps = {
  locale: Locale;
  story: LocalizedSiteContent["story"];
  contact: LocalizedSiteContent["contact"];
  primaryCta: string;
  secondaryCta: string;
};

export function MobileStorySequence({
  locale,
  story,
  contact,
  primaryCta,
  secondaryCta,
}: MobileStorySequenceProps) {
  return (
    <Container className="relative py-[var(--section-y-compact)]">
      <div>
        <SectionHeader
          body={story.mobileBody}
          label={story.label}
          title={story.mobileTitle}
          width="copy"
        />
        <div className="mt-7 flex flex-col gap-3 min-[430px]:flex-row">
          <Button
            href={sectionPath(locale, "#contact")}
            className="w-full min-[430px]:w-auto"
          >
            {primaryCta}
          </Button>
          <Button
            href={sectionPath(locale, "#capabilities")}
            variant="secondary"
            className="w-full min-[430px]:w-auto"
          >
            {secondaryCta}
          </Button>
        </div>
      </div>

      <ol className="mt-8 grid gap-4">
        {story.steps.map((step, index) => (
          <li key={step.id}>
            <Surface as="article" variant="card" className="p-4 sm:p-5">
              <MobileStoryVisual index={index} />
              <div className="mt-5">
                <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-blue">
                  {step.eyebrow}
                </p>
                <h3 className="mt-3 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                  {step.mobileTitle ?? step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-graphite-muted sm:text-base">
                  {step.mobileSummary}
                </p>
              </div>
              <details className="group mt-4">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-[var(--radius-control)] border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-graphite transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-elaman-blue [&::-webkit-details-marker]:hidden">
                  {story.detailsLabel}
                  <span
                    className="text-lg leading-none text-elaman-blue transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {step.bullets.map((bullet) => (
                    <p
                      key={bullet}
                      className="rounded-[var(--radius-control)] border border-[var(--border-soft)] bg-[var(--surface-glass)] px-3 py-2 text-sm font-medium text-graphite-muted"
                    >
                      {bullet}
                    </p>
                  ))}
                </div>
              </details>
            </Surface>
          </li>
        ))}
      </ol>

      <Surface className="mt-8 p-5">
        <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-red">
          {contact.title}
        </p>
        <div className="mt-4 grid gap-3 min-[430px]:grid-cols-2">
          <a
            href={`tel:${contact.phoneHref}`}
            className="rounded-[var(--radius-control)] border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-graphite transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-elaman-blue"
          >
            {contact.phone}
          </a>
          <a
            href={contact.emailHref}
            className="rounded-[var(--radius-control)] border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-graphite transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-elaman-blue"
          >
            {contact.email}
          </a>
        </div>
      </Surface>
    </Container>
  );
}
