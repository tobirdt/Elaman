import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechnicalMark } from "@/components/ui/TechnicalMark";
import { protectionContent } from "@/lib/content/protection";

export function ProtectionSection() {
  return (
    <Section id="protection" compact screen className="relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elaman-red/30 to-transparent"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionLabel>{protectionContent.label}</SectionLabel>
            <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-graphite md:text-5xl xl:text-6xl">
              {protectionContent.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-graphite-muted">
              {protectionContent.body}
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-y-8 left-5 hidden w-px bg-gradient-to-b from-elaman-red/30 via-line to-elaman-blue/24 sm:block" />
            <div className="grid gap-4">
              {protectionContent.items.map((item, index) => (
                <article
                  key={item.title}
                  className="relative rounded-lg border border-line bg-white/82 p-5 shadow-[0_18px_70px_rgba(22,24,29,0.045)] transition duration-200 hover:-translate-y-1 hover:border-elaman-red/24"
                >
                  <div className="flex gap-5">
                    <TechnicalMark
                      tone={index === 0 ? "red" : "blue"}
                      className="shrink-0"
                    />
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-graphite">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-graphite-muted">
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
