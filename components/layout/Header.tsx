"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { useEffect, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import type { LocalizedSiteContent } from "@/lib/content/site";
import { sectionPath, type Locale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  content: LocalizedSiteContent["navigation"];
};

export function Header({ locale, content }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = content.main
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;

    function updateHeaderState() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.34;
        const active = sections.reduce<HTMLElement | null>((match, section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= marker && rect.bottom > marker ? section : match;
        }, null);

        setScrolled(window.scrollY > 8);
        setActiveSection(active ? `#${active.id}` : "");
      });
    }

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, [content.main]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    }

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main-content"
        data-native-anchor
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-[var(--radius-control)] focus:border focus:border-elaman-blue focus:bg-[var(--surface-paper)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-graphite"
      >
        {content.skipToContent}
      </a>
      <header
        className={`sticky top-0 z-40 h-[var(--header-h)] border-b bg-[var(--surface-paper)] transition-colors [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] ${
          scrolled ? "border-[var(--border-hairline)]" : "border-transparent"
        }`}
      >
        <Container className="flex h-full items-center justify-between gap-3 lg:gap-5">
          <Link
            href={`/${locale}` as Route}
            className="flex min-h-11 min-w-11 shrink-0 items-center"
            aria-label={content.homeLabel}
          >
            <Image
              src="/brand/elaman-icon.svg"
              alt=""
              width={128}
              height={128}
              loading="eager"
              sizes="(min-width: 1024px) 56px, 48px"
              className="size-12 lg:size-14"
            />
          </Link>

          <div className="ml-auto hidden items-center lg:flex">
            <nav
              aria-label={content.mainNavigationLabel}
              className="flex items-center gap-4 text-sm text-graphite-muted xl:gap-6"
            >
              {content.main.map((item) => (
                <a
                  aria-current={activeSection === item.href ? "location" : undefined}
                  key={item.href}
                  href={sectionPath(locale, item.href)}
                  className={`relative flex min-h-11 items-center transition-colors [transition-duration:var(--motion-fast)] after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-elaman-blue after:transition-transform after:[transition-duration:var(--motion-fast)] after:[transition-timing-function:var(--motion-ease)] hover:text-graphite ${
                    activeSection === item.href
                      ? "text-graphite after:scale-x-100"
                      : "after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <span
              className="mx-4 h-4 w-px bg-[var(--border-hairline)] xl:mx-5"
              aria-hidden="true"
            />
            <LanguageSwitcher locale={locale} label={content.languageSwitcherLabel} />
          </div>

          <div ref={menuRef} className="relative z-50 block shrink-0 lg:hidden">
            <button
              ref={triggerRef}
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={content.menu}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius-control)] px-2 text-sm font-medium text-graphite transition-colors [transition-duration:var(--motion-fast)] hover:text-elaman-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elaman-blue"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              {content.menu}
              <span className="relative size-4" aria-hidden="true">
                <span
                  className={`absolute left-0 top-1 h-px w-4 origin-center bg-current transition-transform [transition-duration:var(--motion-state)] ${
                    menuOpen ? "translate-y-1 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-1 left-0 h-px w-4 origin-center bg-current transition-transform [transition-duration:var(--motion-state)] ${
                    menuOpen ? "-translate-y-1 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
            <div
              aria-hidden={!menuOpen}
              className={`fixed inset-x-0 top-[var(--header-h)] border-y border-[var(--border-hairline)] bg-[var(--surface-paper)] shadow-[var(--shadow-overlay)] transition-[opacity,transform] [transition-duration:var(--motion-state)] [transition-timing-function:var(--motion-ease)] motion-reduce:transition-none ${
                menuOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
              id="mobile-navigation"
              inert={!menuOpen}
            >
              <Container className="py-3">
                <nav aria-label={content.mainNavigationLabel} className="grid text-sm">
                  {content.main.map((item) => (
                    <a
                      aria-current={activeSection === item.href ? "location" : undefined}
                      key={item.href}
                      href={sectionPath(locale, item.href)}
                      className={`flex min-h-12 items-center justify-between border-b border-[var(--border-hairline)] py-3 transition-colors [transition-duration:var(--motion-fast)] hover:text-graphite ${
                        activeSection === item.href
                          ? "text-graphite"
                          : "text-graphite-muted"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                      <span className="text-elaman-blue" aria-hidden="true">
                        ↘
                      </span>
                    </a>
                  ))}
                  {content.legal.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as Route}
                      className="flex min-h-11 items-center py-2 text-sm text-graphite-soft transition-colors [transition-duration:var(--motion-fast)] hover:text-graphite"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="px-2 py-2">
                    <LanguageSwitcher
                      locale={locale}
                      label={content.languageSwitcherLabel}
                    />
                  </div>
                </nav>
              </Container>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
