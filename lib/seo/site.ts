import type { Metadata } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.elaman.de").replace(
  /\/$/,
  "",
);

export const siteConfig = {
  name: "Elaman GmbH",
  title: "Elaman – German Security Solutions",
  description:
    "Elaman GmbH in Munich supplies and integrates security technology exclusively for security authorities and security-related organisations.",
  url: siteUrl,
  logoPath: "/brand/elaman-logo.png",
  ogImage: {
    // Social platforms render 1200x630; the wordmark alone was 470x180 and
    // came out as a stretched thumbnail or was dropped entirely.
    path: "/images/elaman-home-og.jpg",
    width: 1200,
    height: 630,
    alt: "Elaman GmbH, Munich – German Security Solutions",
  },
  contactOgImage: {
    path: "/images/elaman-contact-og.jpg",
    width: 1200,
    height: 630,
    alt: "Elaman GmbH reception in Munich with the illuminated elaman sign",
  },
} as const;

/**
 * Bump when the icon artwork changes. Browsers cache favicons by URL for a
 * long time and ignore ordinary cache headers, so a new query string is the
 * only reliable way to make an updated tab icon appear for returning
 * visitors.
 */
const iconVersion = "2";

const iconUrl = (path: string) => `${path}?v=${iconVersion}`;

/**
 * Raster only, on purpose: the multi-size ICO carries pixel-snapped 16, 32
 * and 48 px frames drawn for the tab strip, and browsers would otherwise
 * prefer a vector icon and rasterise it themselves, which smears the
 * thirteen-dot signet at tab size.
 */
export const siteIcons: Metadata["icons"] = {
  icon: [
    { url: iconUrl("/favicon.ico"), sizes: "16x16 32x32 48x48" },
    { url: iconUrl("/icon-192.png"), sizes: "192x192", type: "image/png" },
  ],
  apple: [{ url: iconUrl("/apple-touch-icon.png"), sizes: "180x180" }],
};

type PageMetadataOptions = {
  title?: string;
  appendSiteName?: boolean;
  description?: string;
  path?: string;
  locale?: string;
  languages?: Record<string, string>;
  robots?: Metadata["robots"];
  image?: {
    path: string;
    width: number;
    height: number;
    alt: string;
  };
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

function withSiteName(title: string) {
  const suffix = ` | ${siteConfig.name}`;

  return title === siteConfig.name || title.endsWith(suffix)
    ? title
    : `${title}${suffix}`;
}

export function createPageMetadata({
  title,
  appendSiteName = true,
  description = siteConfig.description,
  path = "/",
  locale = "en_GB",
  languages,
  robots = {
    index: true,
    follow: true,
  },
  image = siteConfig.ogImage,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title
    ? appendSiteName
      ? withSiteName(title)
      : title
    : siteConfig.title;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.path);

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    icons: siteIcons,
    alternates: {
      canonical: url,
      languages,
    },
    robots,
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  };
}
