import { Container } from "@/components/ui/Container";
import { ProcessRail } from "@/components/ui/ProcessRail";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { LocalizedSiteContent } from "@/lib/content/site";

type DeliverySectionProps = {
  content: LocalizedSiteContent["delivery"];
};

export function DeliverySection({ content }: DeliverySectionProps) {
  return (
    <Section id="delivery" compact screen className="bg-porcelain/70">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>{content.label}</SectionLabel>
          <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite md:text-5xl xl:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-graphite-muted">{content.body}</p>
        </div>
        <ProcessRail steps={content.steps} />
      </Container>
    </Section>
  );
}
