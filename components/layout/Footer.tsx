import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { Container } from "@/components/ui/Container";
import type { LocalizedSiteContent } from "@/lib/content/site";

type FooterProps = {
  contact: LocalizedSiteContent["contact"];
  navigation: LocalizedSiteContent["navigation"];
  footer: LocalizedSiteContent["footer"];
};

export function Footer({ contact, navigation, footer }: FooterProps) {
  return (
    <footer className="border-t border-line bg-white">
      {/* Top signal accent */}
      <div className="h-[2px] bg-gradient-to-r from-elaman-blue/40 via-elaman-blue/20 to-elaman-red/30" />
      <Container className="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-start">
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
            className="mt-3 block text-sm text-graphite-soft transition hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
          >
            {contact.phone}
          </a>
          <p className="mt-5 text-xs text-graphite-soft">{footer.copyright}</p>
        </div>

        <div className="grid gap-6 min-[480px]:grid-cols-2 md:grid-cols-1 md:text-right">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-2 md:justify-end"
          >
            {navigation.main.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-graphite-soft transition hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <nav
            aria-label="Legal navigation"
            className="flex flex-wrap gap-2 md:justify-end"
          >
            {navigation.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href as Route}
                className="rounded-full border border-line bg-porcelain/60 px-3.5 py-1.5 text-xs font-medium text-graphite-muted transition hover:border-elaman-blue/22 hover:bg-white hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
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
