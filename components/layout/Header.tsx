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
    <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-white backdrop-blur-xl">
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
            className="h-auto w-32 sm:w-40"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-graphite-muted lg:flex">
          {content.main.map((item) => (
            <a
              key={item.href}
              href={sectionPath(locale, item.href)}
              className="relative py-2 transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-elaman-blue after:transition-transform after:[transition-duration:var(--motion-fast)] after:[transition-timing-function:var(--motion-ease)] hover:text-graphite hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <LanguageSwitcher locale={locale} label={content.languageSwitcherLabel} />
          <Button
            href={sectionPath(locale, "#contact")}
            shape="control"
            size="sm"
            variant="secondary"
            className="min-h-10 px-4"
          >
            {content.cta}
          </Button>
        </div>

        <details className="group relative z-50 block shrink-0 lg:hidden">
          <summary
            aria-label={content.menu}
            className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border-soft)] bg-[var(--surface-glass)] px-4 py-2.5 text-sm font-medium text-graphite shadow-[var(--shadow-card)] backdrop-blur-2xl transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue [&::-webkit-details-marker]:hidden"
          >
            {content.menu}
            <span className="relative size-4" aria-hidden="true">
              <span className="absolute left-0 top-1 h-px w-4 bg-current transition group-open:top-2 group-open:rotate-45" />
              <span className="absolute bottom-1 left-0 h-px w-4 bg-current transition group-open:bottom-[0.45rem] group-open:-rotate-45" />
            </span>
          </summary>
          <div className="absolute right-0 mt-3 w-[calc(100vw-2.5rem)] max-w-[22rem] rounded-[var(--radius-panel)] border border-[var(--border-soft)] bg-white p-2 shadow-[var(--shadow-panel)]">
            <nav className="grid gap-1 text-sm">
              {content.main.map((item) => (
                <a
                  key={item.href}
                  href={sectionPath(locale, item.href)}
                  className="rounded-[var(--radius-control)] px-4 py-3 text-graphite-muted transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-white hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elaman-blue"
                >
                  {item.label}
                </a>
              ))}
              <div className="my-1 h-px bg-line" />
              {content.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className="rounded-[var(--radius-control)] px-4 py-3 text-graphite-muted transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-white hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elaman-blue"
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
