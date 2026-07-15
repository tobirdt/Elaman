import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LocalizedSiteContent } from "@/lib/content/site";

type SystemsSectionProps = {
  content: LocalizedSiteContent["systems"];
};

export function SystemsSection({ content }: SystemsSectionProps) {
  return (
    <Section id="systems" variant="screen" tone="white">
      <Container>
        <div className="grid gap-[var(--section-gap)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <SectionHeader body={content.body} title={content.title} width="copy" />

          <ul className="grid border-y border-[var(--border-hairline-strong)] sm:grid-cols-2">
            {content.items.map((item, index) => (
              <li
                key={item.title}
                className={`flex min-h-16 items-center border-b border-[var(--border-hairline)] py-4 text-base font-medium leading-6 text-graphite last:border-b-0 sm:min-h-20 sm:py-5 ${index % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:pl-8"} ${index >= content.items.length - 2 ? "sm:border-b-0" : ""}`}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
