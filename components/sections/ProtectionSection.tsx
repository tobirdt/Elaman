import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ProtectionSectionProps = {
  content: LocalizedSiteContent["protection"];
};

export function ProtectionSection({ content }: ProtectionSectionProps) {
  return (
    <Section id="protection" compact screen className="relative overflow-hidden">
      {/* Top red accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elaman-red/36 to-transparent"
        aria-hidden="true"
      />
      {/* Subtle red ambient glow */}
      <div
        className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-elaman-red/[0.03] blur-3xl"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionLabel tone="red">{content.label}</SectionLabel>
            <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite md:text-5xl xl:text-6xl">
              {content.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-graphite-muted">{content.body}</p>

            {/* Protection visual accent — concentric shield rings */}
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
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-xl border border-line bg-white/84 p-5 shadow-[0_16px_64px_rgba(22,24,29,0.04)] transition duration-200 hover:-translate-y-1 hover:border-elaman-red/20"
                >
                  <div className="flex gap-4">
                    <TechnicalMark
                      tone={index === 0 || index === 2 ? "red" : "blue"}
                      className="shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-graphite sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-7 text-graphite-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
