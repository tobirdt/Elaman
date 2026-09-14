import { homePath, type Locale } from "@/lib/i18n";

export type ErrorBoundaryContent = {
  label: string;
  title: string;
  body: string;
  retry: string;
  home: string;
  homeHref: string;
};

/**
 * Copy for the localised route error boundary. It stays here rather than in
 * `lib/content/site.ts` because the boundary is a utility surface, not part of
 * the marketing narrative — and because a failure inside the site content must
 * never be able to take the recovery screen down with it.
 */
const errorContent: Record<Locale, Omit<ErrorBoundaryContent, "homeHref">> = {
  de: {
    label: "Fehler",
    title: "Diese Seite konnte nicht geladen werden.",
    body: "Bitte versuchen Sie es erneut. Falls die Störung bleibt, erreichen Sie unser Team in München telefonisch unter +49 89 24209180 oder per E-Mail an info@elaman.de.",
    retry: "Erneut versuchen",
    home: "Zur Startseite",
  },
  en: {
    label: "Error",
    title: "This page could not be loaded.",
    body: "Please try again. If the problem persists, you can reach our team in Munich by phone on +49 89 24209180 or by email at info@elaman.de.",
    retry: "Try again",
    home: "Go to the homepage",
  },
};

export function getErrorContent(locale: Locale): ErrorBoundaryContent {
  return { ...errorContent[locale], homeHref: homePath(locale) };
}
