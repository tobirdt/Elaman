import Link from "next/link";
import type { Route } from "next";

import { Container } from "@/components/ui/Container";
import type { LocalizedSiteContent } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n";

type FooterProps = {
  contact: LocalizedSiteContent["contact"];
  navigation: LocalizedSiteContent["navigation"];
  footer: LocalizedSiteContent["footer"];
  locale: Locale;
};

export function Footer({ contact, navigation, footer }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border-hairline)] bg-[var(--surface-paper)]">
      <Container className="py-12 text-center sm:py-14">
        <p className="text-sm font-semibold text-graphite">{contact.company}</p>
        <address className="mt-2 text-xs not-italic leading-5 text-graphite-soft">
          {contact.footerAddressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>

        <nav
          aria-label={navigation.legalNavigationLabel}
          className="mt-6 flex flex-wrap justify-center gap-x-7"
        >
          {navigation.legal.map((item) => (
            <Link
              key={item.href}
              href={item.href as Route}
              className="inline-flex min-h-11 items-center text-xs text-graphite-soft transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="mt-3 text-[length:var(--type-micro)] text-graphite-soft">
          {footer.copyright}
        </p>
      </Container>
    </footer>
  );
}
