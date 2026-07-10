import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { DeliveryTimeline } from "@/components/ui/DeliveryTimeline";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import type { LocalizedSiteContent } from "@/lib/content/site";

type DeliverySectionProps = {
  content: LocalizedSiteContent["delivery"];
};

export function DeliverySection({ content }: DeliverySectionProps) {
  return (
    <Section id="delivery" variant="content-band" tone="soft">
      <Container>
        <SectionRule index="06" keyword={content.label} />
        <div className="mt-10 lg:mt-14">
          <Reveal>
            <SectionHeader body={content.body} title={content.title} width="copy" />
          </Reveal>
          <DeliveryTimeline steps={content.steps} />
        </div>
      </Container>
    </Section>
  );
}
