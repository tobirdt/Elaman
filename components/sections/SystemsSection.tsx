import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SystemMap } from "@/components/ui/SystemMap";
import type { LocalizedSiteContent } from "@/lib/content/site";

type SystemsSectionProps = {
  content: LocalizedSiteContent["systems"];
};

export function SystemsSection({ content }: SystemsSectionProps) {
  return (
    <Section id="systems" variant="band" tone="white">
      <Container>
        <div className="grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            body={content.body}
            label={content.label}
            title={content.title}
            width="copy"
          />
          <SystemMap items={content.items} />
        </div>
      </Container>
    </Section>
  );
}
