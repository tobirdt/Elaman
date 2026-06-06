import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SystemMap } from "@/components/ui/SystemMap";
import { systemsContent } from "@/lib/content/systems";

export function SystemsSection() {
  return (
    <Section id="systems" className="bg-graphite text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionLabel tone="red">{systemsContent.label}</SectionLabel>
            <h2 className="text-5xl font-semibold leading-[1.03] tracking-[-0.045em] md:text-6xl">
              {systemsContent.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/68">{systemsContent.body}</p>
          </div>
          <SystemMap items={systemsContent.items} />
        </div>
      </Container>
    </Section>
  );
}
