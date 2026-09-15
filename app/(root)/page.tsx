import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { homePath, localeFromAcceptLanguage } from "@/lib/i18n";

/**
 * `/` carries no content of its own; it sends the visitor to the homepage in
 * the language their browser asks for, German unless the browser prefers
 * English. Reading the header makes this one route dynamic, which is the
 * point: the choice has to happen per request. Search engines index the
 * localised homepages directly through hreflang and never see this hop.
 */
export default async function RootPage() {
  const acceptLanguage = (await headers()).get("accept-language");

  redirect(homePath(localeFromAcceptLanguage(acceptLanguage)));
}
