import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { createPageMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createPageMetadata({
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
});

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <Section className="min-h-[calc(100vh-16rem)] bg-white">
          <Container className="max-w-4xl">
            <SectionLabel tone="dark">404</SectionLabel>
            <h1 className="text-5xl font-semibold leading-[1.03] tracking-[-0.045em] text-graphite md:text-6xl">
              Page not found.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite-muted">
              The requested page is not available. Return to the Elaman homepage or use
              the contact path in the navigation.
            </p>
            <div className="mt-8">
              <Button href="/">Back to homepage</Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
