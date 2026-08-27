"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Route-level boundary for the localised pages. It keeps the site chrome and
 * offers a way out; `global-error.tsx` only takes over if the root layout
 * itself fails.
 */
export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main-content" tabIndex={-1}>
      <Section
        className="min-h-[calc(100svh-var(--header-h)-12rem)]"
        tone="white"
        variant="content-band"
      >
        <Container size="legal">
          <SectionHeader
            as="h1"
            body="Bitte versuchen Sie es erneut. Falls die Störung bleibt, erreichen Sie unser Team in München telefonisch unter +49 (0) 89 24 20 91 80 oder per E-Mail an info@elaman.de."
            label="Fehler"
            labelTone="dark"
            size="h1"
            title="Diese Seite konnte nicht geladen werden."
            width="content"
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Button onClick={reset} type="button">
              Erneut versuchen
            </Button>
            <Button href="/de" variant="secondary">
              Zur Startseite
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
