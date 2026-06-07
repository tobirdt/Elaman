import { Container } from "@/components/ui/Container";
import { ProcessRail } from "@/components/ui/ProcessRail";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { deliveryContent } from "@/lib/content/delivery";

export function DeliverySection() {
  return (
    <Section id="delivery" compact screen className="bg-porcelain/70">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>{deliveryContent.label}</SectionLabel>
          <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite md:text-5xl xl:text-6xl">
            {deliveryContent.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-graphite-muted">
            {deliveryContent.body}
          </p>
        </div>
        <ProcessRail steps={deliveryContent.steps} />
      </Container>
    </Section>
  );
}
