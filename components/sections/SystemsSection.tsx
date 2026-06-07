import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SystemMap } from "@/components/ui/SystemMap";
import { systemsContent } from "@/lib/content/systems";

export function SystemsSection() {
  return (
    <Section id="systems" compact screen className="bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <SectionLabel>{systemsContent.label}</SectionLabel>
            <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite md:text-5xl xl:text-6xl">
              {systemsContent.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-graphite-muted">
              {systemsContent.body}
            </p>
          </div>
          <SystemMap items={systemsContent.items} />
        </div>
      </Container>
    </Section>
  );
}
