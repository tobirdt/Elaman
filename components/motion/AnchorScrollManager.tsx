"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/i18n";

type AnchorScrollManagerProps = {
  locale: Locale;
};

const locationChangeEvent = "elaman:locationchange";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToHash(hash: string, url: string, replace = false) {
  const id = hash.replace("#", "");
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });

  if (replace) {
    history.replaceState(null, "", url);
  } else {
    history.pushState(null, "", url);
  }

  window.dispatchEvent(new Event(locationChangeEvent));
}

export function AnchorScrollManager({ locale }: AnchorScrollManagerProps) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href*="#"]',
      );

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (!href) {
        return;
      }

      const sameLocalePrefix = `/${locale}#`;
      const hash = href.startsWith(sameLocalePrefix)
        ? href.slice(homePrefixLength(locale))
        : href.startsWith("#")
          ? href
          : href.startsWith("/#")
            ? href.slice(1)
            : null;

      if (!hash || hash === "#") {
        return;
      }

      event.preventDefault();
      scrollToHash(hash, `/${locale}${hash}`);

      anchor.closest("details")?.removeAttribute("open");
    }

    document.addEventListener("click", handleClick);

    if (window.location.hash) {
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash, `/${locale}${window.location.hash}`, true);
      });
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [locale]);

  return null;
}

function homePrefixLength(locale: Locale) {
  return `/${locale}`.length;
}
