import type { Metadata } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.elaman.de").replace(
  /\/$/,
  "",
);

export const siteConfig = {
  name: "Elaman GmbH",
  title: "Elaman – German Security Solutions",
  description:
    "Elaman GmbH in Munich develops and integrates communications and security technology for demanding professional environments.",
  url: siteUrl,
  logoPath: "/brand/elaman-logo.png",
  iconPath: "/brand/elaman-icon.svg",
  ogImage: {
    path: "/brand/elaman-logo.png",
    width: 470,
    height: 180,
    alt: "Elaman German Security Solutions logo",
  },
} as const;

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
  locale = "en_US",
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
