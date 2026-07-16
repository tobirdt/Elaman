import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";

type CapabilityOverviewProps = {
  content: LocalizedSiteContent["overview"];
};

export function CapabilityOverview({ content }: CapabilityOverviewProps) {
  return (
    <Section
      id="experience"
      variant="content-band"
      className="bg-navy text-[var(--color-on-dark)]"
    >
      <Container>
        <div className="mx-auto max-w-[54rem] text-center">
          <span className="mx-auto block h-px w-20 bg-elaman-blue" aria-hidden="true" />
          <h2 className="mt-7 text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)]">
            {content.title}
          </h2>
          <div className="mx-auto mt-7 grid max-w-[48rem] gap-4 text-sm leading-7 text-[var(--color-on-dark-muted)]">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div
          id="systems"
          className="mx-auto mt-14 max-w-[var(--container-content)] sm:mt-16"
        >
          <ul className="grid md:grid-flow-col md:grid-cols-2 md:grid-rows-4 md:gap-x-16 lg:gap-x-24">
            {content.items.map((item, index) => (
              <li
                key={item.title}
                className={`grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 border-t border-[var(--border-on-navy)] py-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-5 sm:py-6 ${index === content.items.length - 1 ? "border-b" : ""} ${index === 3 ? "md:border-b" : ""}`}
              >
                <span className="font-mono text-[0.6875rem] leading-6 tracking-[0.12em] text-[var(--color-on-dark-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="min-w-0 break-normal text-pretty text-base font-semibold leading-6 tracking-[-0.01em] text-[var(--color-on-dark)] hyphens-none sm:text-lg sm:leading-7">
                  {item.title}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
