import { LineDraw } from "@/components/motion/LineDraw";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { ProtectionPerimeter } from "@/components/ui/ProtectionPerimeter";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ProtectionSectionProps = {
  content: LocalizedSiteContent["protection"];
};

export function ProtectionSection({ content }: ProtectionSectionProps) {
  return (
    <Section id="protection" variant="screen-lite" tone="navy">
      <Container>
        <LineDraw accent="red" onDark />
        <div className="flex items-baseline justify-between gap-4 pt-3">
          <span className="font-mono-label text-elaman-red">05</span>
          <span className="font-mono-label text-[var(--color-on-dark-muted)]">
            {content.label}
          </span>
        </div>

        <div className="mt-10 grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:mt-14 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <SectionHeader onDark body={content.body} title={content.title} width="copy" />
            </Reveal>
            <ProtectionPerimeter className="mt-10 hidden h-40 w-40 lg:block" />
          </div>

          <RevealGroup className="border-t border-[var(--border-on-navy)]" stagger={0.09}>
            {content.items.map((item, index) => (
              <RevealItem key={item.title}>
                <article className="group border-b border-[var(--border-on-navy)] py-6 transition-colors [transition-duration:var(--motion-fast)]">
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono-label ${
                        index === 0 || index === 2
                          ? "text-elaman-red"
                          : "text-[var(--color-on-dark-muted)]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-[var(--color-on-dark)]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 pl-10 text-sm leading-7 text-[var(--color-on-dark-muted)]">
                    {item.description}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
