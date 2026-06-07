import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import { capabilityOverview } from "@/lib/content/capabilities";

export function CapabilityOverview() {
  return (
    <Section id="capabilities" compact screen>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <SectionLabel>{capabilityOverview.label}</SectionLabel>
            <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite md:text-5xl xl:text-6xl">
              {capabilityOverview.title}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-graphite-muted lg:justify-self-end">
            {capabilityOverview.body}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {capabilityOverview.items.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-lg border border-line bg-white/84 p-5 shadow-[0_24px_80px_rgba(22,24,29,0.04)] transition duration-200 hover:-translate-y-1 hover:border-elaman-blue/22 lg:min-h-72"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elaman-blue/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              <TechnicalMark tone={index === 2 ? "red" : "blue"} />
              <p className="mt-8 text-xs font-semibold text-elaman-red">{item.eyebrow}</p>
              <h3 className="mt-3 text-[1.45rem] font-semibold tracking-[-0.03em] text-graphite">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-graphite-muted">
                {item.description}
              </p>
              <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-elaman-blue/18 via-line to-elaman-red/18" />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
