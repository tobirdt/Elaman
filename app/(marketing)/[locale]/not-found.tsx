"use client";

import { useParams } from "next/navigation";

import { NotFoundPage } from "@/components/sections/NotFoundPage";
import { defaultLocale, isLocale } from "@/lib/i18n";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale && isLocale(params.locale) ? params.locale : defaultLocale;

  return <NotFoundPage locale={locale} />;
}
