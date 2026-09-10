import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DetailDossier } from "@/components/pages/DetailDossier";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { getDetailPageContent } from "@/lib/content/detail-pages";
import { getLegalPageContent } from "@/lib/content/legal";
import { getSiteContent } from "@/lib/content/site";
import {
  alternateLocale,
  detailPageKindFromSlug,
  detailPageKinds,
  detailPagePath,
  isLocale,
  legalPageKindFromSlug,
  legalPageKinds,
  legalPagePath,
  locales,
  type DetailPageKind,
  type LegalPageKind,
  type Locale,
} from "@/lib/i18n";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/site";
import { detailPageJsonLd, legalPageJsonLd, safeJsonLd } from "@/lib/seo/structured-data";

type DetailPageProps = {
  params: Promise<unknown>;
};

const socialImages: Record<
  DetailPageKind,
  { path: string; width: number; height: number; alt: Record<Locale, string> }
> = {
  company: {
    path: "/images/elaman-company-og.jpg",
    width: 1200,
    height: 630,
    alt: {
      de: "Elaman-Büro in München",
      en: "Elaman office in Munich",
    },
  },
  systems: {
    path: "/images/elaman-systems-og.jpg",
    width: 1200,
    height: 630,
    alt: {
      de: "Elaman – Systeme für Kommunikation, Observation und Auswertung",
      en: "Elaman – systems for communications, observation and analysis",
    },
  },
};

type Resolved =
  | { type: "detail"; locale: Locale; kind: DetailPageKind }
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

  const legalKind = legalPageKindFromSlug(resolved.locale, resolved.slug);

  if (legalKind) {
    return { type: "legal", locale: resolved.locale, kind: legalKind };
  }

  return null;
}

function lastSegment(path: string) {
  return path.split("/").at(-1)!;
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
      slug: [lastSegment(detailPagePath(locale, kind))],
    })),
    ...legalPageKinds.map((kind) => ({
      locale,
      slug: [lastSegment(legalPagePath(locale, kind))],
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
                legal.metaDescription,
                resolved.kind === "imprint",
              ),
            ),
          }}
        />
        <Header
          locale={resolved.locale}
          content={site.navigation}
          alternateLocaleHref={legalPagePath(otherLocale, resolved.kind)}
        />
        <LegalDocument label={legal.label} title={legal.title} blocks={legal.blocks} />
        <Footer
          contact={site.contact}
          locale={resolved.locale}
          navigation={site.navigation}
          footer={site.footer}
        />
      </>
    );
  }

  const content = getDetailPageContent(resolved.locale, resolved.kind);

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
              content.metadata.description,
            ),
          ),
        }}
      />
      <Header
        locale={resolved.locale}
        content={site.navigation}
        alternateLocaleHref={detailPagePath(otherLocale, resolved.kind)}
      />
      <main id="main-content" tabIndex={-1}>
        <DetailDossier content={content} />
      </main>
      <Footer
        contact={site.contact}
        locale={resolved.locale}
        navigation={site.navigation}
        footer={site.footer}
      />
    </>
  );
}
