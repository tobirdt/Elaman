import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LegalBlock } from "@/lib/content/legal";

type LegalDocumentProps = {
  title: string;
  blocks: readonly LegalBlock[];
  label?: string;
};

export function LegalDocument({ title, blocks, label = "Legal" }: LegalDocumentProps) {
  return (
    <main id="main-content" tabIndex={-1}>
      <Section variant="legal-page" tone="white">
        <Container size="legal">
          <SectionHeader
            as="h1"
            label={label}
            labelTone="dark"
            size="h1"
            title={title}
            width="full"
          />
        </Container>
      </Section>
      <Section
        className="border-t border-[var(--border-hairline)]"
        variant="legal-page"
        tone="soft"
      >
        <Container size="legal">
          <div className="rounded-[var(--radius-card)] border border-[var(--border-hairline)] bg-[var(--surface-paper)] p-6 sm:p-9">
            {blocks.map((block, index) => (
              <section
                key={`${block.title ?? "legal-block"}-${index}`}
                className="border-b border-[var(--border-hairline)] py-8 first:pt-0 last:border-b-0 last:pb-0"
              >
                {block.title ? (
                  <h2 className="mb-4 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite [overflow-wrap:anywhere]">
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
