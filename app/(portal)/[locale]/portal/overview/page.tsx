import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHeader } from "@/components/layout/PageHeader";
import { SignOutButton } from "@/components/portal/SignOutButton";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { currentSession } from "@/lib/auth/session";
import { getPortalContent } from "@/lib/content/portal";
import { getSiteContent } from "@/lib/content/site";
import {
  alternateLocale,
  defaultLocale,
  isLocale,
  portalOverviewPath,
  portalPath,
  type Locale,
} from "@/lib/i18n";

export const dynamic = "force-dynamic";

type OverviewPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: OverviewPageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const { metadata } = getPortalContent(locale);

  return {
    title: `${metadata.overview.title} — Elaman`,
    description: metadata.overview.description,
    robots: { index: false, follow: false },
  };
}

const termClasses =
  "font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft";

/**
 * The first page behind the sign-in.
 *
 * It is deliberately thin: it names the account and offers the way out. Its
 * job right now is to be the evidence that a session actually carries an
 * identity across requests. Document access and user management land here
 * next, as sections of this band rather than as a second navigation layer.
 *
 * The guard is a plain redirect rather than a proxy rule. A page that reads
 * the session itself cannot be reached by a route that forgot to be listed in
 * a matcher somewhere else.
 */
export default async function PortalOverviewPage({ params }: OverviewPageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const session = await currentSession();

  if (!session) {
    redirect(portalPath(locale));
  }

  const content = getPortalContent(locale);
  const site = getSiteContent(locale);
  const { user } = session;

  const rows: Array<{ term: string; value: string }> = [
    { term: content.overview.account.name, value: user.name },
    { term: content.overview.account.email, value: user.email },
    {
      term: content.overview.account.role,
      value: content.overview.account.roles[user.role],
    },
    ...(user.companyName
      ? [{ term: content.overview.account.company, value: user.companyName }]
      : []),
  ];

  return (
    <>
      <Header
        locale={locale}
        content={site.navigation}
        alternateLocaleHref={portalOverviewPath(alternateLocale(locale))}
      />
      <main id="main-content" tabIndex={-1}>
        <article>
          <PageHeader
            locale={locale}
            current={content.overview.breadcrumb}
            eyebrow={content.overview.eyebrow}
            title={content.overview.title}
            lead={content.overview.lead}
          />

          <Section variant="content-band" tone="white">
            <Container>
              <SectionIntro label={content.overview.account.label} title={user.name} />
              <div className="mt-11 grid gap-10 xl:grid-cols-[minmax(16rem,0.4fr)_minmax(0,0.6fr)] xl:gap-16">
                <dl className="grid self-start border-t border-[var(--border-hairline-strong)]">
                  {rows.map((row) => (
                    <div
                      key={row.term}
                      className="border-b border-[var(--border-hairline)] py-5"
                    >
                      <dt className={termClasses}>{row.term}</dt>
                      <dd className="mt-2 text-[length:var(--type-body)] leading-6 text-graphite">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="self-start">
                  <p className={termClasses}>{content.overview.pending.label}</p>
                  <h3 className="mt-3 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                    {content.overview.pending.title}
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-[length:var(--type-small)] leading-6 text-graphite-muted">
                    {content.overview.pending.body}
                  </p>
                  <div className="mt-8">
                    <SignOutButton label={content.overview.signOut} locale={locale} />
                  </div>
                </div>
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
        alternateLocaleHref={portalOverviewPath(alternateLocale(locale))}
      />
    </>
  );
}
