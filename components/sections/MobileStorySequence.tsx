import { MobileStoryVisual } from "@/components/motion/MobileStoryVisual";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionRule } from "@/components/ui/SectionRule";
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
  const redIndex = story.steps.findIndex((step) => step.id === "protection");

  return (
    <Container className="relative py-[var(--section-y-compact)]">
      <SectionRule index="02" keyword={story.label} />

      <div className="mt-8">
        <SectionHeader body={story.mobileBody} title={story.mobileTitle} width="copy" />
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

      <ol className="mt-10">
        {story.steps.map((step, index) => (
          <li key={step.id} className="border-t border-[var(--border-hairline)] py-7">
            <article>
              <MobileStoryVisual index={index} />
              <div className="mt-5">
                <p
                  className={`font-mono-label ${
                    index === redIndex ? "text-elaman-red" : "text-elaman-blue"
                  }`}
                >
                  {step.eyebrow}
                </p>
                <h3 className="mt-3 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                  {step.mobileTitle ?? step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-graphite-muted sm:text-base">
                  {step.mobileSummary}
                </p>
              </div>
              <details className="group mt-5">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-[var(--radius-control)] border border-[var(--border-hairline)] bg-[var(--surface-paper-soft)] px-4 py-3 text-sm font-semibold text-graphite transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-[var(--surface-paper)] [&::-webkit-details-marker]:hidden">
                  {story.detailsLabel}
                  <span
                    className="text-lg leading-none text-elaman-blue transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <ul className="mt-4">
                  {step.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bullet}
                      className="flex items-baseline gap-4 border-t border-[var(--border-hairline)] py-2.5"
                    >
                      <span className="font-mono-label shrink-0 text-graphite-soft">
                        {String(bulletIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium text-graphite-muted">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            </article>
          </li>
        ))}
      </ol>

      <div className="border-t border-[var(--border-hairline)] pt-6">
        <p className="font-mono-label text-elaman-red">{contact.title}</p>
        <div className="mt-4 grid gap-3 min-[430px]:grid-cols-2">
          <a
            href={`tel:${contact.phoneHref}`}
            className="rounded-[var(--radius-control)] border border-[var(--border-hairline)] px-4 py-3 text-sm font-semibold text-graphite transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:border-[var(--border-accent-blue)]"
          >
            {contact.phone}
          </a>
          <a
            href={contact.emailHref}
            className="rounded-[var(--radius-control)] border border-[var(--border-hairline)] px-4 py-3 text-sm font-semibold text-graphite transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:border-[var(--border-accent-blue)]"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </Container>
  );
}
