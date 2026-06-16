import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
        <Section
          className="min-h-[calc(100vh-16rem)]"
          tone="white"
          variant="content-band"
        >
          <Container size="legal">
            <SectionHeader
              as="h1"
              body={
                isGerman
                  ? "Die angeforderte Seite ist nicht verfügbar. Kehren Sie zur Elaman-Startseite zurück oder nutzen Sie den Kontaktbereich."
                  : "The requested page is not available. Return to the Elaman homepage or use the contact path in the navigation."
              }
              label="404"
              labelTone="dark"
              size="h1"
              title={isGerman ? "Seite nicht gefunden." : "Page not found."}
              width="content"
            />
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
        locale={locale}
        navigation={content.navigation}
        footer={content.footer}
      />
    </>
  );
}
