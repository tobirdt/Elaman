"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import type { LocalizedSiteContent } from "@/lib/content/site";
import { homePath, type Locale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  content: LocalizedSiteContent["navigation"];
  alternateLocaleHref?: string;
  /**
   * Replaces the portal entry, which otherwise says "Login".
   *
   * Only the portal's own pages pass it, and only because they are dynamic:
   * the public pages are prerendered and cannot know whether anyone is signed
   * in. Saying "Login" there stays correct behaviour — the sign-in page sends
   * a signed-in visitor straight to the overview — but inside the portal the
   * word would be plainly wrong, so there it is replaced.
   */
  portalEntry?: { label: string; href: Route };
};

export function Header({
  alternateLocaleHref,
  locale,
  content,
  portalEntry,
}: HeaderProps) {
  const portal = portalEntry ?? content.portal;
  // One list for both menus. The portal is held separately in the content so
  // the signed-in pages can replace it, but it is rendered as what it is: an
  // entry in the same row, in the same type, with the same underline.
  const entries = [...content.main, portal];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    function updateHairline() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    }

    updateHairline();
    window.addEventListener("scroll", updateHairline, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHairline);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.documentElement.style.overflow;
    const backgroundState = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    ).map((element) => ({
      ariaHidden: element.getAttribute("aria-hidden"),
      element,
      inert: element.inert,
    }));

    document.documentElement.style.overflow = "hidden";
    backgroundState.forEach(({ element }) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>("[data-mobile-menu-link]")?.focus();
    });

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    }

    function trapFocus(event: KeyboardEvent) {
      if (event.key !== "Tab" || !menuRef.current) {
        return;
      }

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("inert"));

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable.at(-1)!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("keydown", trapFocus);
    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      backgroundState.forEach(({ ariaHidden, element, inert }) => {
        element.inert = inert;

        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("keydown", trapFocus);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [menuOpen]);

  /**
   * Every global destination is a page of its own, so the current state is the
   * current path — no scroll observation, no anchor mapping.
   */
  function isCurrentPage(href: string) {
    return pathname === href;
  }

  return (
    <>
      <a
        href="#main-content"
        data-native-anchor
        className="sr-only print:hidden focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-[var(--radius-control)] focus:border focus:border-elaman-blue focus:bg-[var(--surface-paper)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-graphite"
      >
        {content.skipToContent}
      </a>
      <header
        className={`sticky top-0 z-40 h-[var(--header-h)] print:hidden border-b bg-[var(--surface-paper)] transition-colors [transition-duration:var(--motion-fast)] [transition-timing-function:var(--motion-ease)] ${
          scrolled ? "border-[var(--border-hairline)]" : "border-transparent"
        }`}
      >
        <Container className="flex h-full items-center justify-between gap-3 lg:gap-5">
          {/*
            The mark, and a second way to the homepage. The named entry that
            carries the current-page rule is the first one in the navigation
            on the right, so the signet needs no visible word of its own —
            only a name for anything that cannot see it.
          */}
          <Link
            href={homePath(locale)}
            className="flex min-h-11 min-w-11 shrink-0 items-center"
            aria-hidden={menuOpen || undefined}
            tabIndex={menuOpen ? -1 : undefined}
          >
            <Image
              src="/brand/elaman-icon.svg"
              alt=""
              width={128}
              height={128}
              loading="eager"
              sizes="(min-width: 1024px) 52px, 44px"
              className="size-11 lg:size-13"
            />
            <span className="sr-only">{content.homeLabel}</span>
          </Link>

          <div className="ml-auto hidden items-center lg:flex">
            <nav
              aria-label={content.mainNavigationLabel}
              className="flex items-center gap-4 text-sm text-graphite-muted xl:gap-6"
            >
              {entries.map((item) => {
                const current = isCurrentPage(item.href);

                return (
                  <Link
                    aria-current={current ? "page" : undefined}
                    className={`relative flex min-h-11 items-center transition-colors [transition-duration:var(--motion-fast)] after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-elaman-blue after:transition-transform after:[transition-duration:var(--motion-fast)] after:[transition-timing-function:var(--motion-ease)] hover:text-graphite ${
                      current
                        ? "text-graphite after:scale-x-100"
                        : "after:scale-x-0 hover:after:scale-x-100"
                    }`}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <span
              className="mx-4 h-4 w-px bg-[var(--border-hairline)] xl:mx-5"
              aria-hidden="true"
            />
            <LanguageSwitcher
              locale={locale}
              label={content.languageSwitcherLabel}
              alternateHref={alternateLocaleHref}
            />
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
              aria-label={content.mainNavigationLabel}
              aria-modal={menuOpen || undefined}
              className={`fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto overscroll-contain border-t border-[var(--border-hairline)] bg-[var(--surface-paper)] shadow-[var(--shadow-overlay)] transition-[opacity,transform] [transition-duration:var(--motion-state)] [transition-timing-function:var(--motion-ease)] motion-reduce:transition-none ${
                menuOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
              id="mobile-navigation"
              inert={!menuOpen}
              role="dialog"
            >
              <Container className="flex min-h-full flex-col py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-8">
                <nav aria-label={content.mainNavigationLabel} className="grid">
                  {entries.map((item, index) => {
                    const current = isCurrentPage(item.href);

                    return (
                      <Link
                        aria-current={current ? "page" : undefined}
                        className={`group grid min-h-14 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-[var(--border-hairline)] py-3 text-[length:var(--type-h3)] font-semibold tracking-[var(--tracking-title)] transition-colors [transition-duration:var(--motion-fast)] hover:text-graphite ${
                          current ? "text-graphite" : "text-graphite-muted"
                        }`}
                        data-mobile-menu-link
                        href={item.href}
                        key={item.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono text-[length:var(--type-micro)] font-normal tracking-[var(--tracking-label)] text-graphite-soft"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item.label}</span>
                        <span
                          className="text-[length:var(--type-body)] text-elaman-blue transition-transform [transition-duration:var(--motion-fast)] group-hover:translate-x-1 motion-reduce:transform-none"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-8">
                  <div className="flex flex-wrap gap-x-6">
                    {content.legal.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex min-h-11 items-center text-sm text-graphite-soft transition-colors [transition-duration:var(--motion-fast)] hover:text-graphite"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <LanguageSwitcher
                      locale={locale}
                      label={content.languageSwitcherLabel}
                      alternateHref={alternateLocaleHref}
                    />
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
