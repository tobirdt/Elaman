import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Surface } from "@/components/ui/Surface";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import type { LocalizedSiteContent } from "@/lib/content/site";

type CapabilityOverviewProps = {
  content: LocalizedSiteContent["capabilities"];
};

export function CapabilityOverview({ content }: CapabilityOverviewProps) {
  return (
    <Section id="capabilities" variant="band">
      <Container>
        <SectionHeader
          body={content.body}
          label={content.label}
          title={content.title}
          width="content"
        />

        <div className="mt-[var(--section-gap)] grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, index) => (
            <Surface
              as="article"
              interactive
              key={item.title}
              tone={index === 2 ? "red" : "blue"}
              className="group relative overflow-hidden p-5 lg:min-h-72"
            >
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-0 transition [transition-duration:var(--motion-medium)] [transition-timing-function:var(--motion-ease)] group-hover:opacity-100 ${
                  index === 2
                    ? "from-transparent via-elaman-red/40 to-transparent"
                    : "from-transparent via-elaman-blue/32 to-transparent"
                }`}
              />
              <TechnicalMark tone={index === 2 ? "red" : "blue"} />
              <p className="mt-6 text-[length:var(--type-micro)] font-semibold tracking-[var(--tracking-label)] text-elaman-red">
                {item.eyebrow}
              </p>
              <h3 className="mt-2.5 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                {item.title}
              </h3>
              <p className="mt-3.5 text-sm leading-7 text-graphite-muted">
                {item.description}
              </p>
              <div
                className={`absolute bottom-5 left-5 right-5 h-px ${
                  index === 2
                    ? "bg-gradient-to-r from-transparent via-elaman-red/20 to-transparent"
                    : "bg-gradient-to-r from-elaman-blue/14 via-line to-transparent"
                }`}
              />
            </Surface>
          ))}
        </div>
      </Container>
    </Section>
  );
}
