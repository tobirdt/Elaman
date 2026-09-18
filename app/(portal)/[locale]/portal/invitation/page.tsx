import type { Metadata } from "next";
import QRCode from "qrcode";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHeader } from "@/components/layout/PageHeader";
import { InvitationForm } from "@/components/portal/InvitationForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TextLink } from "@/components/ui/TextLink";
import { openInvitation } from "@/lib/auth/login";
import { getPortalContent } from "@/lib/content/portal";
import { getSiteContent } from "@/lib/content/site";
import {
  alternateLocale,
  defaultLocale,
  isLocale,
  portalInvitationPath,
  portalPath,
  type Locale,
} from "@/lib/i18n";

export const dynamic = "force-dynamic";

type InvitationPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function readLocale(params: InvitationPageProps["params"]): Promise<Locale> {
  const { locale } = await params;

  return isLocale(locale) ? locale : defaultLocale;
}

export async function generateMetadata({
  params,
}: InvitationPageProps): Promise<Metadata> {
  const locale = await readLocale(params);
  const { metadata } = getPortalContent(locale);

  return {
    title: `${metadata.invitation.title} — Elaman`,
    description: metadata.invitation.description,
    robots: { index: false, follow: false },
  };
}

/**
 * Splitting the QR code into groups of four makes a long base32 string
 * readable for anyone typing it into a desktop authenticator by hand.
 */
function groupSecret(secret: string): string {
  return (secret.match(/.{1,4}/g) ?? [secret]).join(" ");
}

/**
 * The page an invitation link opens.
 *
 * The QR code is rendered here, on the server, as inline SVG. No image
 * request, no client-side library, and — the reason that matters — the
 * authenticator secret never travels to a third party or sits in a URL that a
 * proxy could log.
 */
export default async function InvitationPage({
  params,
  searchParams,
}: InvitationPageProps) {
  const locale = await readLocale(params);
  const query = await searchParams;
  const rawToken = query.token;
  const token = typeof rawToken === "string" ? rawToken : "";

  const content = getPortalContent(locale);
  const site = getSiteContent(locale);
  const invitation = token ? await openInvitation(token) : null;

  const qrSvg = invitation
    ? await QRCode.toString(invitation.totpUri, {
        type: "svg",
        margin: 0,
        errorCorrectionLevel: "M",
        color: { dark: "#1f2933", light: "#ffffff" },
      })
    : null;

  return (
    <>
      <Header
        locale={locale}
        content={site.navigation}
        alternateLocaleHref={portalInvitationPath(alternateLocale(locale))}
      />
      <main id="main-content" tabIndex={-1}>
        <article>
          <PageHeader
            locale={locale}
            current={content.invitation.breadcrumb}
            eyebrow={content.invitation.eyebrow}
            title={content.invitation.title}
            lead={invitation ? content.invitation.lead : undefined}
          />

          <Section variant="content-band" tone="white">
            <Container>
              {!invitation || !qrSvg ? (
                <div className="max-w-[58ch]">
                  <SectionIntro
                    label={content.invitation.eyebrow}
                    title={content.invitation.invalid.title}
                  />
                  <p className="mt-7 text-[length:var(--type-body)] leading-7 text-graphite-muted">
                    {content.invitation.invalid.body}
                  </p>
                  <p className="mt-7">
                    <TextLink
                      href={portalPath(locale)}
                      label={content.signIn.breadcrumb}
                    />
                  </p>
                </div>
              ) : (
                <>
                  <SectionIntro
                    label={content.invitation.section.label}
                    title={content.invitation.section.title}
                    lead={content.invitation.forAddress.replace(
                      "{email}",
                      invitation.email,
                    )}
                  />
                  <div className="mt-11 grid gap-12 xl:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] xl:gap-16">
                    <div>
                      <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                        {content.invitation.steps.authenticator.title}
                      </h3>
                      <p className="mt-4 max-w-[46ch] text-[length:var(--type-small)] leading-6 text-graphite-muted">
                        {content.invitation.steps.authenticator.body}
                      </p>
                      <div
                        className="mt-7 w-full max-w-56 border border-[var(--border-hairline-strong)] bg-[var(--surface-paper)] p-4 [&>svg]:h-auto [&>svg]:w-full"
                        // The SVG is produced here from a value this request
                        // generated; nothing in it comes from the client.
                        dangerouslySetInnerHTML={{ __html: qrSvg }}
                      />
                      <p className="mt-6 font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft">
                        {content.invitation.steps.authenticator.secretLabel}
                      </p>
                      <p className="mt-2 max-w-56 break-all font-mono text-[length:var(--type-small)] leading-6 text-graphite">
                        {groupSecret(invitation.totpSecret)}
                      </p>
                    </div>

                    <div className="max-w-[34rem]">
                      <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                        {content.invitation.steps.password.title}
                      </h3>
                      <p className="mt-4 max-w-[52ch] text-[length:var(--type-small)] leading-6 text-graphite-muted">
                        {content.invitation.steps.password.body}
                      </p>
                      <div className="mt-7">
                        <InvitationForm
                          content={content.invitation}
                          token={token}
                          signInHref={portalPath(locale)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Container>
          </Section>
        </article>
      </main>
      <Footer
        locale={locale}
        contact={site.contact}
        navigation={site.navigation}
        footer={site.footer}
        alternateLocaleHref={portalInvitationPath(alternateLocale(locale))}
      />
    </>
  );
}
