import Link from "next/link";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import type { LocalizedSiteContent } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n";

type FooterProps = {
  contact: LocalizedSiteContent["contact"];
  navigation: LocalizedSiteContent["navigation"];
  footer: LocalizedSiteContent["footer"];
  locale: Locale;
  alternateLocaleHref?: string;
  snapEnd?: boolean;
};

const columnLabelClasses =
  "font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft";

const linkClasses =
  "inline-flex min-h-11 items-center text-[length:var(--type-small)] text-graphite-muted transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue";

export function Footer({
  alternateLocaleHref,
  contact,
  navigation,
  footer,
  locale,
  snapEnd = false,
}: FooterProps) {
  return (
    <footer
      className="border-t border-[var(--border-hairline)] bg-[var(--surface-paper)]"
      data-scroll-snap-end={snapEnd || undefined}
    >
      <Container className="py-12 sm:py-14">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <nav aria-label={footer.navigationLabel}>
            <p className={columnLabelClasses}>{footer.columns.navigation}</p>
            <ul className="mt-2 grid">
              {navigation.main.map((item) => (
                <li key={item.href}>
                  <Link className={linkClasses} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={columnLabelClasses}>{footer.columns.contact}</p>
            <address className="mt-2 not-italic">
              <span className="block pt-2 text-[length:var(--type-small)] font-semibold text-graphite">
                {contact.company}
              </span>
              {contact.footerAddressLines.map((line) => (
                <span
                  key={line}
                  className="block text-[length:var(--type-small)] leading-6 text-graphite-muted"
                >
                  {line}
                </span>
              ))}
              <span className="mt-1 grid">
                <a className={linkClasses} href={`tel:${contact.phoneHref}`}>
                  {contact.phone}
                </a>
                <a className={linkClasses} href={contact.emailHref}>
                  {contact.email}
                </a>
              </span>
            </address>
          </div>

          <nav aria-label={navigation.legalNavigationLabel}>
            <p className={columnLabelClasses}>{footer.columns.legal}</p>
            <ul className="mt-2 grid">
              {navigation.legal.map((item) => (
                <li key={item.href}>
                  <Link className={linkClasses} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-[var(--border-hairline)] pt-4">
          <p className="text-[length:var(--type-micro)] text-graphite-soft">
            {footer.copyright}
          </p>
          <LanguageSwitcher
            alternateHref={alternateLocaleHref}
            label={navigation.languageSwitcherLabel}
            locale={locale}
          />
        </div>
      </Container>
    </footer>
  );
}
