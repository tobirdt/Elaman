import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { LegalBlock } from "@/lib/content/legal";

type LegalDocumentProps = {
  title: string;
  blocks: readonly LegalBlock[];
  label?: string;
};

export function LegalDocument({ title, blocks, label = "Legal" }: LegalDocumentProps) {
  return (
    <main>
      <Section compact className="bg-white">
        <Container className="max-w-4xl">
          <SectionLabel tone="dark">{label}</SectionLabel>
          <h1 className="text-4xl font-semibold tracking-[-0.045em] text-graphite [overflow-wrap:anywhere] sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Container>
      </Section>
      <Section compact className="border-t border-line bg-porcelain/60">
        <Container className="max-w-4xl">
          <div className="rounded-lg border border-line bg-white p-6 shadow-[0_20px_70px_rgba(22,24,29,0.05)] sm:p-9">
            {blocks.map((block, index) => (
              <section
                key={`${block.title ?? "legal-block"}-${index}`}
                className="border-b border-line py-8 first:pt-0 last:border-b-0 last:pb-0"
              >
                {block.title ? (
                  <h2 className="mb-4 text-xl font-semibold tracking-[-0.02em] text-graphite [overflow-wrap:anywhere]">
                    {block.title}
                  </h2>
                ) : null}
                <div className="space-y-4">
                  {block.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-graphite-muted [overflow-wrap:anywhere]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
