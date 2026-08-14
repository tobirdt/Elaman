"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactNode,
} from "react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import type { LocalizedSiteContent } from "@/lib/content/site";
import { homePath, sectionPath, type Locale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  content: LocalizedSiteContent["navigation"];
  alternateLocaleHref?: string;
};

type PrimaryNavigationItem = LocalizedSiteContent["navigation"]["main"][number];

type PrimaryNavigationLinkProps = {
  ariaCurrent?: "page" | "location";
  children: ReactNode;
  className: string;
  item: PrimaryNavigationItem;
  locale: Locale;
  mobile?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

function PrimaryNavigationLink({
  ariaCurrent,
  children,
  className,
  item,
  locale,
  mobile = false,
  onClick,
}: PrimaryNavigationLinkProps) {
  const href = sectionPath(locale, item.href);
  const sharedProps = {
    "aria-current": ariaCurrent,
    className,
    "data-mobile-menu-link": mobile || undefined,
    onClick,
  } as const;

  if (item.href.startsWith("#")) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href as Route} {...sharedProps}>
      {children}
    </Link>
  );
}

export function Header({ alternateLocaleHref, locale, content }: HeaderProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = content.main
      .map((item) => document.getElementById(item.section.slice(1)))
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

  function getCurrentState(item: PrimaryNavigationItem): "page" | "location" | undefined {
    if (!item.href.startsWith("#") && pathname === item.href) {
      return "page";
    }

    if (pathname === homePath(locale) && activeSection === item.section) {
      return "location";
    }

    return undefined;
  }

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
            aria-hidden={menuOpen || undefined}
            tabIndex={menuOpen ? -1 : undefined}
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
              {content.main
                .filter((item) => !item.mobileOnly)
                .map((item) => {
                  const current = getCurrentState(item);

                  return (
                    <PrimaryNavigationLink
                      ariaCurrent={current}
                      className={`relative flex min-h-11 items-center transition-colors [transition-duration:var(--motion-fast)] after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-elaman-blue after:transition-transform after:[transition-duration:var(--motion-fast)] after:[transition-timing-function:var(--motion-ease)] hover:text-graphite ${
                        current
                          ? "text-graphite after:scale-x-100"
                          : "after:scale-x-0 hover:after:scale-x-100"
                      }`}
                      item={item}
                      key={item.href}
                      locale={locale}
                    >
                      {item.label}
                    </PrimaryNavigationLink>
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
                  {content.main.map((item, index) => {
                    const current = getCurrentState(item);

                    return (
                      <PrimaryNavigationLink
                        ariaCurrent={current}
                        className={`group grid min-h-14 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-[var(--border-hairline)] py-3 text-[length:var(--type-h3)] font-semibold tracking-[var(--tracking-title)] transition-colors [transition-duration:var(--motion-fast)] hover:text-graphite ${
                          current ? "text-graphite" : "text-graphite-muted"
                        }`}
                        item={item}
                        key={item.href}
                        locale={locale}
                        mobile
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="font-mono text-[length:var(--type-micro)] font-normal tracking-[var(--tracking-label)] text-graphite-soft">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item.label}</span>
                        <span
                          className="text-[length:var(--type-body)] text-elaman-blue transition-transform [transition-duration:var(--motion-fast)] group-hover:translate-x-1 motion-reduce:transform-none"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </PrimaryNavigationLink>
                    );
                  })}
                </nav>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-8">
                  <div className="flex flex-wrap gap-x-6">
                    {content.legal.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href as Route}
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
