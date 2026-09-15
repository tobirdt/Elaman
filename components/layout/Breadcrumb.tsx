import Link from "next/link";
import type { Route } from "next";

export type BreadcrumbContent = {
  /** Accessible name of the navigation landmark. */
  label: string;
  /** Label of the homepage step, the only linked step on a two-level site. */
  home: string;
};

type BreadcrumbProps = {
  content: BreadcrumbContent;
  /** Short name of the page the visitor is on. */
  current: string;
  homeHref: Route;
};

/**
 * Two steps, because the site is two levels deep: the homepage and the page
 * the visitor is on. It replaces the former "back to the homepage" link,
 * which said how to leave but never said where the visitor was.
 */
export function Breadcrumb({ content, current, homeHref }: BreadcrumbProps) {
  return (
    <nav aria-label={content.label}>
      <ol className="flex flex-wrap items-center gap-x-2 text-[length:var(--type-small)]">
        <li>
          <Link
            className="inline-flex min-h-11 items-center text-graphite-soft transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue"
            href={homeHref}
          >
            {content.home}
          </Link>
        </li>
        <li aria-hidden="true" className="text-graphite-soft">
          /
        </li>
        <li className="text-graphite-muted">
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
