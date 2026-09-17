import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHeader } from "@/components/layout/PageHeader";
import { SignInForm } from "@/components/portal/SignInForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TextLink } from "@/components/ui/TextLink";
import { currentSession } from "@/lib/auth/session";
import { getPortalContent } from "@/lib/content/portal";
import { getSiteContent } from "@/lib/content/site";
import {
  alternateLocale,
  contactPagePath,
  defaultLocale,
  isLocale,
  portalOverviewPath,
  portalPath,
  type Locale,
} from "@/lib/i18n";

/** Reads the session cookie, so it can never be prerendered. */
export const dynamic = "force-dynamic";

type PortalPageProps = {
  params: Promise<{ locale: string }>;
};

async function readLocale(params: PortalPageProps["params"]): Promise<Locale> {
  const { locale } = await params;

  return isLocale(locale) ? locale : defaultLocale;
}

export async function generateMetadata({ params }: PortalPageProps): Promise<Metadata> {
  const locale = await readLocale(params);
  const { metadata } = getPortalContent(locale);

  return {
    title: `${metadata.signIn.title} — Elaman`,
    description: metadata.signIn.description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: portalPath(locale),
      languages: {
        de: portalPath("de"),
        en: portalPath("en"),
      },
    },
  };
}

/**
 * The sign-in page.
 *
 * It looks like every other subpage: the same `PageHeader`, the same left
 * edge, the same title step. Someone arriving here from the public site should
 * recognise where they are, and a portal that announced itself with a
 * different geometry would read as a different product.
 *
 * Someone who already has a session is sent on rather than shown a form they
 * do not need.
 */
export default async function PortalSignInPage({ params }: PortalPageProps) {
  const locale = await readLocale(params);
  const session = await currentSession();

  if (session) {
    redirect(portalOverviewPath(locale));
  }

  const content = getPortalContent(locale);
  const site = getSiteContent(locale);

  return (
    <>
      <Header
        locale={locale}
        content={site.navigation}
        alternateLocaleHref={portalPath(alternateLocale(locale))}
      />
      <main id="main-content" tabIndex={-1}>
        <article>
          <PageHeader
            locale={locale}
            current={content.signIn.breadcrumb}
            eyebrow={content.signIn.eyebrow}
            title={content.signIn.title}
            lead={content.signIn.lead}
          />

          <Section variant="content-band" tone="white">
            <Container>
              <SectionIntro
                label={content.signIn.section.label}
                title={content.signIn.section.title}
              />
              <div className="mt-11 grid gap-10 xl:grid-cols-[minmax(0,0.55fr)_minmax(14rem,0.45fr)] xl:gap-16">
                <div className="max-w-[34rem]">
                  <SignInForm content={content.signIn} locale={locale} />
                </div>

                <aside className="self-start border-t border-[var(--border-hairline-strong)] pt-5">
                  <p className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft">
                    {content.signIn.access.label}
                  </p>
                  <h3 className="mt-3 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                    {content.signIn.access.title}
                  </h3>
                  <p className="mt-4 max-w-[42ch] text-[length:var(--type-small)] leading-6 text-graphite-muted">
                    {content.signIn.access.body}
                  </p>
                  <p className="mt-5">
                    <TextLink
                      href={contactPagePath(locale)}
                      label={content.signIn.access.contactLabel}
                    />
                  </p>
                </aside>
              </div>
            </Container>
          </Section>
        </article>
      </main>
      <Footer
        locale={locale}
        contact={site.contact}
        navigation={site.navigation}
        footer={site.footer}
        alternateLocaleHref={portalPath(alternateLocale(locale))}
      />
    </>
  );
}
