"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";

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
  const [activeSection, setActiveSection] = useState("");
  const primaryNavigation = content.main.filter((item) => item.href !== "#contact");

  useEffect(() => {
    const sections = content.main
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [content.main]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {content.skipLabel}
      </a>
      <header className="sticky top-0 z-40 border-b border-[var(--border-hairline)] bg-[var(--surface-paper)]">
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
            {primaryNavigation.map((item) => (
              <a
                aria-current={activeSection === item.href ? "location" : undefined}
                key={item.href}
                href={sectionPath(locale, item.href)}
                className={`relative flex min-h-11 items-center transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-elaman-blue after:transition-transform after:[transition-duration:var(--motion-fast)] after:[transition-timing-function:var(--motion-ease)] hover:text-graphite ${
                  activeSection === item.href
                    ? "text-graphite after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
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
              className="min-h-11 px-4"
              aria-current={activeSection === "#contact" ? "location" : undefined}
            >
              {content.cta}
            </Button>
          </div>

          <details className="group relative z-50 block shrink-0 lg:hidden">
            <summary
              aria-label={content.menu}
              className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border-hairline)] bg-[var(--surface-paper)] px-4 py-2.5 text-sm font-medium text-graphite transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-[var(--surface-paper-soft)] [&::-webkit-details-marker]:hidden"
            >
              {content.menu}
              <span className="relative size-4" aria-hidden="true">
                <span className="absolute left-0 top-1 h-px w-4 origin-center bg-current transition-transform [transition-duration:var(--motion-state)] group-open:translate-y-1 group-open:rotate-45" />
                <span className="absolute bottom-1 left-0 h-px w-4 origin-center bg-current transition-transform [transition-duration:var(--motion-state)] group-open:-translate-y-1 group-open:-rotate-45" />
              </span>
            </summary>
            <div className="absolute right-0 mt-3 w-[calc(100vw-2.5rem)] max-w-[22rem] translate-y-[-0.5rem] rounded-[var(--radius-card)] border border-[var(--border-hairline)] bg-[var(--surface-paper)] p-2 opacity-0 shadow-[var(--shadow-overlay)] transition-[opacity,transform] [transition-duration:var(--motion-state)] [transition-timing-function:var(--motion-ease)] group-open:translate-y-0 group-open:opacity-100 motion-reduce:transition-none">
              <nav className="grid gap-1 text-sm">
                {content.main.map((item) => (
                  <a
                    key={item.href}
                    href={sectionPath(locale, item.href)}
                    className="rounded-[var(--radius-control)] px-4 py-3 text-graphite-muted transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-[var(--surface-paper-soft)] hover:text-graphite"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="my-1 h-px bg-line" />
                {content.legal.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    className="rounded-[var(--radius-control)] px-4 py-3 text-graphite-muted transition [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] hover:bg-[var(--surface-paper-soft)] hover:text-graphite"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-2 py-2 sm:hidden">
                  <LanguageSwitcher
                    locale={locale}
                    label={content.languageSwitcherLabel}
                  />
                </div>
              </nav>
            </div>
          </details>
        </Container>
      </header>
    </>
  );
}
