import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import type { LocalizedSiteContent } from "@/lib/content/site";

type CapabilityOverviewProps = {
  content: LocalizedSiteContent["capabilities"];
};

export function CapabilityOverview({ content }: CapabilityOverviewProps) {
  return (
    <Section id="capabilities" compact>
      <Container>
        <div className="grid gap-8 [&>*]:min-w-0 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <SectionLabel>{content.label}</SectionLabel>
            <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite md:text-5xl xl:text-6xl">
              {content.title}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-graphite-muted lg:justify-self-end">
            {content.body}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-line bg-white/86 p-5 shadow-[0_20px_72px_rgba(22,24,29,0.05)] transition duration-300 hover:-translate-y-1.5 hover:border-elaman-blue/24 hover:shadow-[0_28px_90px_rgba(22,24,29,0.08)] lg:min-h-72"
            >
              {/* Top accent line, reveals on hover */}
              <div
                className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-0 transition duration-300 group-hover:opacity-100 ${
                  index === 2
                    ? "from-transparent via-elaman-red/50 to-transparent"
                    : "from-transparent via-elaman-blue/40 to-transparent"
                }`}
              />
              <TechnicalMark tone={index === 2 ? "red" : "blue"} />
              <p className="mt-6 text-[0.68rem] font-semibold tracking-[0.14em] text-elaman-red">
                {item.eyebrow}
              </p>
              <h3 className="mt-2.5 text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-graphite">
                {item.title}
              </h3>
              <p className="mt-3.5 text-sm leading-7 text-graphite-muted">
                {item.description}
              </p>
              {/* Bottom rule */}
              <div
                className={`absolute bottom-5 left-5 right-5 h-px ${
                  index === 2
                    ? "bg-gradient-to-r from-transparent via-elaman-red/20 to-transparent"
                    : "bg-gradient-to-r from-elaman-blue/14 via-line to-transparent"
                }`}
              />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
