import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { Container } from "@/components/ui/Container";
import type { LocalizedSiteContent } from "@/lib/content/site";
import { sectionPath, type Locale } from "@/lib/i18n";

type FooterProps = {
  contact: LocalizedSiteContent["contact"];
  navigation: LocalizedSiteContent["navigation"];
  footer: LocalizedSiteContent["footer"];
  locale: Locale;
};

export function Footer({ contact, navigation, footer, locale }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border-hairline)] bg-[var(--surface-paper)]">
      <div className="grid h-px grid-cols-[3fr_1fr]" aria-hidden="true">
        <span className="bg-elaman-blue/40" />
        <span className="bg-elaman-red/40" />
      </div>
      <Container className="grid gap-10 py-[var(--section-y-compact)] md:grid-cols-2 md:items-start">
        <div className="max-w-sm">
          <Image
            src="/brand/elaman-logo.png"
            alt="Elaman German Security Solutions"
            width={160}
            height={61}
            className="h-auto w-36"
          />
          <p className="mt-5 text-sm leading-6 text-graphite-muted">{contact.company}</p>
          <address className="mt-1 not-italic text-sm leading-6 text-graphite-soft">
            {contact.footerAddressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={`tel:${contact.phoneHref}`}
            className="mt-3 inline-flex min-h-11 items-center text-sm text-graphite-soft transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:text-graphite"
          >
            {contact.phone}
          </a>
          <p className="mt-5 text-xs text-graphite-soft">{footer.copyright}</p>
        </div>

        <div className="grid gap-6 min-[480px]:grid-cols-2 md:grid-cols-1 md:justify-self-end md:text-right">
          <nav
            aria-label={navigation.footerNavigationLabel}
            className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end"
          >
            {navigation.main.map((item) => (
              <a
                key={item.href}
                href={sectionPath(locale, item.href)}
                className="inline-flex min-h-11 items-center text-sm text-graphite-soft transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:text-graphite"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <nav
            aria-label={navigation.legalNavigationLabel}
            className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end"
          >
            {navigation.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href as Route}
                className="inline-flex min-h-11 items-center border-b border-[var(--border-hairline)] text-xs font-medium text-graphite-muted transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:border-[var(--border-accent-blue)] hover:text-graphite"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
