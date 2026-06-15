import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Surface } from "@/components/ui/Surface";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ProtectionSectionProps = {
  content: LocalizedSiteContent["protection"];
};

export function ProtectionSection({ content }: ProtectionSectionProps) {
  return (
    <Section id="protection" variant="band" className="relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elaman-red/32 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-elaman-red/[0.03] blur-3xl"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              body={content.body}
              label={content.label}
              labelTone="red"
              title={content.title}
              width="copy"
            />

            <div className="relative mt-8 hidden h-24 w-24 lg:block" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border border-elaman-red/20" />
              <div className="absolute inset-3 rounded-full border border-elaman-red/14" />
              <div className="absolute inset-6 rounded-full border border-elaman-red/10" />
              <div className="absolute inset-9 rounded-full bg-elaman-red/8" />
              <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-elaman-red/40" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-8 left-5 hidden w-px bg-gradient-to-b from-elaman-red/28 via-line to-elaman-blue/20 sm:block" />
            <div className="grid gap-3">
              {content.items.map((item, index) => (
                <Surface
                  as="article"
                  interactive
                  key={item.title}
                  tone={index === 0 || index === 2 ? "red" : "blue"}
                  className="relative overflow-hidden p-5"
                >
                  <div className="flex gap-4">
                    <TechnicalMark
                      tone={index === 0 || index === 2 ? "red" : "blue"}
                      className="shrink-0"
                    />
                    <div>
                      <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-7 text-graphite-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Surface>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
