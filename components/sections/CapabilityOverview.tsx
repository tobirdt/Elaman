import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";

type CapabilityOverviewProps = {
  content: LocalizedSiteContent["capabilities"];
  systems: LocalizedSiteContent["systems"];
  trust: LocalizedSiteContent["trust"];
};

export function CapabilityOverview({ content, systems, trust }: CapabilityOverviewProps) {
  const portfolioItems = [
    systems.items[1],
    systems.items[2],
    systems.items[3],
    systems.items[4],
    systems.items[5],
    systems.items[6],
    content.items[3],
    systems.items[7],
  ].filter(Boolean);

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
            <p>{content.body}</p>
            <p>{trust.body}</p>
            <p>{systems.body}</p>
          </div>
        </div>

        <div
          id="systems"
          className="mt-14 border-t border-[var(--border-on-navy)] sm:mt-16"
        >
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {portfolioItems.map((item, index) => (
              <li
                key={item.title}
                className={`flex min-h-40 min-w-0 flex-col justify-between gap-8 border-b border-[var(--border-on-navy)] px-4 py-6 sm:min-h-48 sm:px-6 sm:py-7 ${index % 2 !== 0 ? "border-l" : ""} lg:border-l ${index % 4 === 0 ? "lg:border-l-0" : ""}`}
              >
                <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-[var(--color-on-dark-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="max-w-[15ch] break-words text-pretty text-sm font-semibold leading-5 tracking-[-0.01em] text-[var(--color-on-dark)] [hyphens:auto] sm:text-base sm:leading-6">
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
