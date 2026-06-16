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
    <Section
      id="capabilities"
      variant="content-band"
      tone="soft"
      className="border-y border-[var(--border-soft)]"
    >
      <Container className="grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div>
          <SectionHeader
            body={content.body}
            label={content.label}
            title={content.title}
            width="copy"
          />
          <div className="mt-8 hidden h-px w-40 bg-gradient-to-r from-elaman-blue/40 via-line to-elaman-red/28 lg:block" />
        </div>

        <div className="grid gap-3.5 md:grid-cols-2">
          {content.items.map((item, index) => (
            <Surface
              as="article"
              interactive
              key={item.title}
              tone={index === 2 ? "red" : "blue"}
              className="group relative overflow-hidden bg-white p-5 sm:p-6 lg:min-h-64"
            >
              <div className="flex items-start justify-between gap-4">
                <TechnicalMark tone={index === 2 ? "red" : "blue"} />
                <p className="text-sm font-semibold tabular-nums text-graphite-soft">
                  {item.eyebrow}
                </p>
              </div>
              <h3 className="mt-7 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                {item.title}
              </h3>
              <p className="mt-3.5 text-sm leading-7 text-graphite-muted">
                {item.description}
              </p>
              <div className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-line to-transparent opacity-0 transition [transition-duration:var(--motion-medium)] [transition-timing-function:var(--motion-ease)] group-hover:opacity-100" />
            </Surface>
          ))}
        </div>
      </Container>
    </Section>
  );
}
