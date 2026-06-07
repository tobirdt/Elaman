import type { Metadata } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.elaman.de").replace(
  /\/$/,
  "",
);

export const siteConfig = {
  name: "Elaman GmbH",
  title: "German Security Solutions | Elaman GmbH",
  titleTemplate: "%s | Elaman GmbH",
  description:
    "Elaman GmbH provides German security solutions, communications and security engineering, advice, surveillance, protection, training, and support for public authority and security contexts.",
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
  description?: string;
  path?: string;
  locale?: string;
  languages?: Record<string, string>;
  robots?: Metadata["robots"];
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  locale = "en_US",
  languages,
  robots = {
    index: true,
    follow: true,
  },
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ?? siteConfig.title;
  const openGraphTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(siteConfig.ogImage.path);

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
      title: openGraphTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: siteConfig.ogImage.alt,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description,
      images: [imageUrl],
    },
  };
}
