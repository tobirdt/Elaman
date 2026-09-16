import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContactPage } from "@/components/pages/ContactPage";
import { DetailDossier } from "@/components/pages/DetailDossier";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { getContactPageContent } from "@/lib/content/contact-page";
import { getDetailPageContent } from "@/lib/content/detail-pages";
import { getLegalPageContent } from "@/lib/content/legal";
import { getSiteContent } from "@/lib/content/site";
import {
  alternateLocale,
  contactPagePath,
  contactPageSlug,
  detailPageKindFromSlug,
  detailPageKinds,
  detailPagePath,
  detailPageSlug,
  isContactPageSlug,
  isLocale,
  legalPageKindFromSlug,
  legalPageKinds,
  legalPagePath,
  legalPageSlug,
  locales,
  type DetailPageKind,
  type LegalPageKind,
  type Locale,
} from "@/lib/i18n";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/site";
import {
  contactPageJsonLd,
  detailPageJsonLd,
  legalPageJsonLd,
  safeJsonLd,
} from "@/lib/seo/structured-data";

type DetailPageProps = {
  params: Promise<unknown>;
};

type SocialImage = {
  path: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

const socialImages: Record<DetailPageKind, SocialImage> = {
  company: {
    path: "/images/elaman-company-og.jpg",
    width: 1200,
    height: 630,
    alt: {
      de: "Elaman-Büro in München",
      en: "Elaman office in Munich",
    },
  },
  solutions: {
    path: "/images/elaman-systems-og.jpg",
    width: 1200,
    height: 630,
    alt: {
      de: "Elaman – Systeme für Kommunikation, Observation und Auswertung",
      en: "Elaman – systems for communications, observation and analysis",
    },
  },
};

const contactSocialImage: SocialImage = {
  path: "/images/elaman-contact-og.jpg",
  width: 1200,
  height: 630,
  alt: {
    de: "Elaman-Büro in München",
    en: "Elaman office in Munich",
  },
};

type Resolved =
  | { type: "detail"; locale: Locale; kind: DetailPageKind }
  | { type: "contact"; locale: Locale }
  | { type: "legal"; locale: Locale; kind: LegalPageKind };

function resolveParams(params: unknown): Resolved | null {
  const resolved = params as { locale?: string; slug?: string[] };

  if (!resolved.locale || !isLocale(resolved.locale) || !resolved.slug) {
    return null;
  }

  const detailKind = detailPageKindFromSlug(resolved.locale, resolved.slug);

  if (detailKind) {
    return { type: "detail", locale: resolved.locale, kind: detailKind };
  }

  if (isContactPageSlug(resolved.locale, resolved.slug)) {
    return { type: "contact", locale: resolved.locale };
  }

  const legalKind = legalPageKindFromSlug(resolved.locale, resolved.slug);

  if (legalKind) {
    return { type: "legal", locale: resolved.locale, kind: legalKind };
  }

  return null;
}

/**
 * Only the parameter combinations produced by `generateStaticParams` resolve.
 * Anything else stops at the router and is served by `app/global-not-found.tsx`,
 * preserving a complete server-rendered 404 document without client JavaScript.
 * Next.js 16.3.4 currently logs an internal `NoFallbackError` for this correct
 * 404 response: https://github.com/vercel/next.js/issues/90537
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...detailPageKinds.map((kind) => ({
      locale,
      slug: [detailPageSlug(locale, kind)],
    })),
    { locale, slug: [contactPageSlug(locale)] },
    ...legalPageKinds.map((kind) => ({
      locale,
      slug: [legalPageSlug(locale, kind)],
    })),
  ]);
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const resolved = resolveParams(await params);

  if (!resolved) {
    return {};
  }

  if (resolved.type === "legal") {
    const legal = getLegalPageContent(resolved.locale, resolved.kind);

    return createPageMetadata({
      title: legal.metaTitle,
      description: legal.metaDescription,
      path: legalPagePath(resolved.locale, resolved.kind),
      locale: resolved.locale === "de" ? "de_DE" : "en_GB",
      languages: {
        de: absoluteUrl(legalPagePath("de", resolved.kind)),
        en: absoluteUrl(legalPagePath("en", resolved.kind)),
        "x-default": absoluteUrl(legalPagePath("de", resolved.kind)),
      },
    });
  }

  if (resolved.type === "contact") {
    const contactPage = getContactPageContent(resolved.locale);

    return createPageMetadata({
      title: contactPage.metadata.title,
      description: contactPage.metadata.description,
      path: contactPagePath(resolved.locale),
      locale: contactPage.metadata.ogLocale,
      languages: {
        de: absoluteUrl(contactPagePath("de")),
        en: absoluteUrl(contactPagePath("en")),
        "x-default": absoluteUrl(contactPagePath("de")),
      },
      image: {
        path: contactSocialImage.path,
        width: contactSocialImage.width,
        height: contactSocialImage.height,
        alt: contactSocialImage.alt[resolved.locale],
      },
    });
  }

  const content = getDetailPageContent(resolved.locale, resolved.kind);
  const socialImage = socialImages[resolved.kind];

  return createPageMetadata({
    title: content.metadata.title,
    description: content.metadata.description,
    path: detailPagePath(resolved.locale, resolved.kind),
    locale: content.metadata.ogLocale,
    languages: {
      de: absoluteUrl(detailPagePath("de", resolved.kind)),
      en: absoluteUrl(detailPagePath("en", resolved.kind)),
      "x-default": absoluteUrl(detailPagePath("de", resolved.kind)),
    },
    image: {
      path: socialImage.path,
      width: socialImage.width,
      height: socialImage.height,
      alt: socialImage.alt[resolved.locale],
    },
  });
}

export default async function DetailPage({ params }: DetailPageProps) {
  const resolved = resolveParams(await params);

  if (!resolved) {
    notFound();
  }

  const site = getSiteContent(resolved.locale);
  const otherLocale = alternateLocale(resolved.locale);

  if (resolved.type === "legal") {
    const legal = getLegalPageContent(resolved.locale, resolved.kind);
    const path = legalPagePath(resolved.locale, resolved.kind);
    const alternateLocaleHref = legalPagePath(otherLocale, resolved.kind);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(
              legalPageJsonLd(
                resolved.locale,
                path,
                legal.metaTitle,
                legal.breadcrumb,
                legal.metaDescription,
                resolved.kind === "imprint",
              ),
            ),
          }}
        />
        <Header
          locale={resolved.locale}
          content={site.navigation}
          alternateLocaleHref={alternateLocaleHref}
        />
        <LegalDocument
          locale={resolved.locale}
          label={legal.label}
          title={legal.title}
          breadcrumb={legal.breadcrumb}
          blocks={legal.blocks}
        />
        <Footer
          alternateLocaleHref={alternateLocaleHref}
          contact={site.contact}
          locale={resolved.locale}
          navigation={site.navigation}
          footer={site.footer}
        />
      </>
    );
  }

  if (resolved.type === "contact") {
    const contactPage = getContactPageContent(resolved.locale);
    const alternateLocaleHref = contactPagePath(otherLocale);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(
              contactPageJsonLd(
                resolved.locale,
                contactPage.metadata.title,
                contactPage.breadcrumb,
                contactPage.metadata.description,
              ),
            ),
          }}
        />
        <Header
          locale={resolved.locale}
          content={site.navigation}
          alternateLocaleHref={alternateLocaleHref}
        />
        <main id="main-content" tabIndex={-1}>
          <ContactPage
            content={contactPage}
            contact={site.contact}
            locale={resolved.locale}
          />
        </main>
        <Footer
          alternateLocaleHref={alternateLocaleHref}
          contact={site.contact}
          locale={resolved.locale}
          navigation={site.navigation}
          footer={site.footer}
        />
      </>
    );
  }

  const content = getDetailPageContent(resolved.locale, resolved.kind);
  const alternateLocaleHref = detailPagePath(otherLocale, resolved.kind);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            detailPageJsonLd(
              resolved.locale,
              resolved.kind,
              content.metadata.title,
              content.breadcrumb,
              content.metadata.description,
            ),
          ),
        }}
      />
      <Header
        locale={resolved.locale}
        content={site.navigation}
        alternateLocaleHref={alternateLocaleHref}
      />
      <main id="main-content" tabIndex={-1}>
        <DetailDossier content={content} locale={resolved.locale} />
      </main>
      <Footer
        alternateLocaleHref={alternateLocaleHref}
        contact={site.contact}
        locale={resolved.locale}
        navigation={site.navigation}
        footer={site.footer}
      />
    </>
  );
}
