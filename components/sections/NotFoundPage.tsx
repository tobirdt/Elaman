import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getSiteContent } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n";

type NotFoundPageProps = {
  locale?: Locale;
};

export function NotFoundPage({ locale = "en" }: NotFoundPageProps) {
  const content = getSiteContent(locale);
  const isGerman = locale === "de";

  return (
    <>
      <Header locale={locale} content={content.navigation} />
      <main>
        <Section className="min-h-[calc(100vh-16rem)] bg-white">
          <Container className="max-w-4xl">
            <SectionLabel tone="dark">404</SectionLabel>
            <h1 className="text-5xl font-semibold leading-[1.03] tracking-[-0.045em] text-graphite md:text-6xl">
              {isGerman ? "Seite nicht gefunden." : "Page not found."}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite-muted">
              {isGerman
                ? "Die angeforderte Seite ist nicht verfügbar. Kehren Sie zur Elaman-Startseite zurück oder nutzen Sie den Kontaktbereich."
                : "The requested page is not available. Return to the Elaman homepage or use the contact path in the navigation."}
            </p>
            <div className="mt-8">
              <Button href={`/${locale}`}>
                {isGerman ? "Zur Startseite" : "Back to homepage"}
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer
        contact={content.contact}
        navigation={content.navigation}
        footer={content.footer}
      />
    </>
  );
}
