"use client";

import { useParams } from "next/navigation";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { getErrorContent } from "@/lib/content/error";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Route-level boundary for the localised pages. It keeps the site chrome and
 * offers a way out; `global-error.tsx` only takes over if the root layout
 * itself fails.
 *
 * The locale comes from the route params rather than a server prop: an error
 * boundary is a Client Component, and the segment that would have passed the
 * locale down is exactly the one that failed to render.
 */
export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const rawLocale = params?.locale;
  const locale =
    typeof rawLocale === "string" && isLocale(rawLocale) ? rawLocale : defaultLocale;
  const content = getErrorContent(locale);

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader
        locale={locale}
        current={content.breadcrumb}
        eyebrow={content.label}
        title={content.title}
        lead={content.body}
        actions={
          <div className="flex flex-wrap gap-4">
            <Button onClick={reset} type="button">
              {content.retry}
            </Button>
            <Button href={content.homeHref} variant="secondary">
              {content.home}
            </Button>
          </div>
        }
      />
    </main>
  );
}
