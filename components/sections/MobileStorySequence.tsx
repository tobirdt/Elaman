import { MobileStoryVisual } from "@/components/motion/MobileStoryVisual";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contactDetails } from "@/lib/content/contact";
import { storyContent } from "@/lib/content/story";

export function MobileStorySequence() {
  return (
    <Container className="relative py-[var(--section-y)]">
      <div className="max-w-2xl">
        <SectionLabel>{storyContent.label}</SectionLabel>
        <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite sm:text-5xl">
          {storyContent.mobileTitle}
        </h2>
        <p className="mt-5 text-base leading-7 text-graphite-muted sm:text-lg sm:leading-8">
          {storyContent.mobileBody}
        </p>
        <div className="mt-7 flex flex-col gap-3 min-[430px]:flex-row">
          <Button href="#contact" className="w-full min-[430px]:w-auto">
            Contact Elaman
          </Button>
          <Button
            href="#capabilities"
            variant="secondary"
            className="w-full min-[430px]:w-auto"
          >
            Capabilities
          </Button>
        </div>
      </div>

      <ol className="mt-10 grid gap-4">
        {storyContent.steps.map((step, index) => (
          <li key={step.id}>
            <article className="rounded-lg border border-line bg-white/78 p-4 shadow-[0_18px_60px_rgba(22,24,29,0.05)] sm:p-5">
              <MobileStoryVisual index={index} />
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-elaman-blue">
                  {step.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em] text-graphite sm:text-3xl">
                  {step.mobileTitle ?? step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-graphite-muted sm:text-base">
                  {step.mobileSummary}
                </p>
              </div>
              <details className="group mt-4">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-sm border border-line bg-porcelain/76 px-4 py-3 text-sm font-semibold text-graphite transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-elaman-blue [&::-webkit-details-marker]:hidden">
                  Key details
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
                      className="rounded-sm border border-line bg-white/72 px-3 py-2 text-sm font-medium text-graphite-muted"
                    >
                      {bullet}
                    </p>
                  ))}
                </div>
              </details>
            </article>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-lg border border-line bg-white/72 p-5 shadow-[0_18px_60px_rgba(22,24,29,0.045)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-elaman-red">
          Direct contact
        </p>
        <div className="mt-4 grid gap-3 min-[430px]:grid-cols-2">
          <a
            href={`tel:${contactDetails.phoneHref}`}
            className="rounded-sm border border-line bg-porcelain/72 px-4 py-3 text-sm font-semibold text-graphite transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-elaman-blue"
          >
            {contactDetails.phone}
          </a>
          <a
            href={contactDetails.emailHref}
            className="rounded-sm border border-line bg-porcelain/72 px-4 py-3 text-sm font-semibold text-graphite transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-elaman-blue"
          >
            {contactDetails.email}
          </a>
        </div>
      </div>
    </Container>
  );
}
