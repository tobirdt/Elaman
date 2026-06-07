import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { LocalizedSiteContent } from "@/lib/content/site";
import { sectionPath, type Locale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  content: LocalizedSiteContent["navigation"];
};

export function Header({ locale, content }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-graphite/[0.07] bg-white/76 shadow-[0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl">
      <Container className="flex h-16 items-center justify-between gap-3 lg:h-20 lg:gap-5">
        <Link
          href={`/${locale}` as Route}
          className="flex items-center"
          aria-label={content.homeLabel}
        >
          <Image
            src="/brand/elaman-logo.png"
            alt="Elaman German Security Solutions"
            width={188}
            height={72}
            priority
            className="h-auto w-32 sm:w-44"
          />
        </Link>

        <nav className="glass-surface hidden items-center gap-0.5 rounded-full px-1.5 py-1.5 text-sm text-graphite-muted shadow-[0_12px_40px_rgba(22,24,29,0.06)] lg:flex">
          {content.main.map((item) => (
            <a
              key={item.href}
              href={sectionPath(locale, item.href)}
              className="rounded-full px-3.5 py-2 transition duration-150 hover:bg-white hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elaman-blue"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <LanguageSwitcher locale={locale} label={content.languageSwitcherLabel} />
          <Button
            href={sectionPath(locale, "#contact")}
            variant="secondary"
            className="px-4 py-2.5"
          >
            {content.cta}
          </Button>
        </div>

        <details className="group relative z-50 block shrink-0 lg:hidden">
          <summary
            aria-label="Open site navigation"
            className="glass-surface flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-graphite transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue [&::-webkit-details-marker]:hidden"
          >
            {content.menu}
            <span className="relative size-4" aria-hidden="true">
              <span className="absolute left-0 top-1 h-px w-4 bg-current transition group-open:top-2 group-open:rotate-45" />
              <span className="absolute bottom-1 left-0 h-px w-4 bg-current transition group-open:bottom-[0.45rem] group-open:-rotate-45" />
            </span>
          </summary>
          <div className="glass-surface absolute right-0 mt-3 w-[min(18rem,calc(100vw-2.5rem))] rounded-lg p-2">
            <nav className="grid gap-1 text-sm">
              {content.main.map((item) => (
                <a
                  key={item.href}
                  href={sectionPath(locale, item.href)}
                  className="rounded-sm px-4 py-3 text-graphite-muted transition hover:bg-white hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elaman-blue"
                >
                  {item.label}
                </a>
              ))}
              <div className="my-1 h-px bg-line" />
              {content.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className="rounded-sm px-4 py-3 text-graphite-muted transition hover:bg-white hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elaman-blue"
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-2 py-2 sm:hidden">
                <LanguageSwitcher locale={locale} label={content.languageSwitcherLabel} />
              </div>
            </nav>
          </div>
        </details>
      </Container>
    </header>
  );
}
