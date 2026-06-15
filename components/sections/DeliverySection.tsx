import { Container } from "@/components/ui/Container";
import { ProcessRail } from "@/components/ui/ProcessRail";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LocalizedSiteContent } from "@/lib/content/site";

type DeliverySectionProps = {
  content: LocalizedSiteContent["delivery"];
};

export function DeliverySection({ content }: DeliverySectionProps) {
  return (
    <Section id="delivery" variant="band" tone="soft">
      <Container>
        <SectionHeader
          body={content.body}
          label={content.label}
          title={content.title}
          width="content"
        />
        <ProcessRail steps={content.steps} />
      </Container>
    </Section>
  );
}
