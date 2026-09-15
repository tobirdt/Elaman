import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { LegalBlock } from "@/lib/content/legal";
import type { Locale } from "@/lib/i18n";

type LegalDocumentProps = {
  locale: Locale;
  title: string;
  breadcrumb: string;
  blocks: readonly LegalBlock[];
  label: string;
};

/**
 * Imprint and privacy policy open with the same band as every other subpage
 * and sit on the same page grid. The document itself keeps a narrower
 * measure for readability, left-aligned under the title rather than centred
 * in a panel of its own.
 */
export function LegalDocument({
  locale,
  title,
  breadcrumb,
  blocks,
  label,
}: LegalDocumentProps) {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader locale={locale} current={breadcrumb} eyebrow={label} title={title} />
      <Section variant="legal-page" tone="white">
        <Container>
          <div className="max-w-[var(--container-legal)]">
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
