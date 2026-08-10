import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DetailDossier } from "@/components/pages/DetailDossier";
import { getDetailPageContent } from "@/lib/content/detail-pages";
import { getSiteContent } from "@/lib/content/site";
import {
  alternateLocale,
  detailPageKindFromSlug,
  detailPageKinds,
  detailPagePath,
  isLocale,
  locales,
  type DetailPageKind,
  type Locale,
} from "@/lib/i18n";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/site";
import { detailPageJsonLd, safeJsonLd } from "@/lib/seo/structured-data";

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
  protection: {
    path: "/images/elaman-protection-og.png",
    width: 1200,
    height: 630,
    alt: {
      de: "Elaman – Schutzlösungen",
      en: "Elaman – protection solutions",
    },
  },
};

function resolveParams(params: unknown) {
  const resolved = params as { locale?: string; slug?: string[] };

  if (!resolved.locale || !isLocale(resolved.locale) || !resolved.slug) {
    return null;
  }

  const kind = detailPageKindFromSlug(resolved.locale, resolved.slug);

  if (!kind) {
    return null;
  }

  return { locale: resolved.locale, kind };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    detailPageKinds.map((kind) => ({
      locale,
      slug: [detailPagePath(locale, kind).split("/").at(-1)!],
    })),
  );
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const resolved = resolveParams(await params);

  if (!resolved) {
    return {};
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

  const content = getDetailPageContent(resolved.locale, resolved.kind);
  const site = getSiteContent(resolved.locale);
  const otherLocale = alternateLocale(resolved.locale);

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
