"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/i18n";

type AnchorScrollManagerProps = {
  locale: Locale;
};

let finishPendingAnchorScroll: (() => void) | null = null;
const initialAnchorSettleMs = 120;

function scrollToHash(hash: string, url: string, replace = false) {
  const id = hash.replace("#", "");
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  finishPendingAnchorScroll?.();
  document.documentElement.setAttribute("data-anchor-scrolling", "");

  let timeout = 0;
  let settled = false;
  const startedAt = performance.now();

  function handleScrollEnd() {
    if (performance.now() - startedAt < 200) {
      return;
    }

    finish();
  }

  function finish() {
    if (settled) {
      return;
    }

    settled = true;
    window.clearTimeout(timeout);
    window.removeEventListener("scrollend", handleScrollEnd);
    document.documentElement.removeAttribute("data-anchor-scrolling");
    finishPendingAnchorScroll = null;
  }

  finishPendingAnchorScroll = finish;

  if (behavior === "smooth") {
    window.addEventListener("scrollend", handleScrollEnd);
    timeout = window.setTimeout(finish, 1400);
  }

  target.scrollIntoView({ behavior, block: "start" });

  if (behavior === "auto") {
    requestAnimationFrame(() => requestAnimationFrame(finish));
  }

  const oldUrl = window.location.href;
  const nextUrl = new URL(url, window.location.origin).href;

  if (oldUrl !== nextUrl) {
    if (replace) {
      history.replaceState(null, "", url);
    } else {
      history.pushState(null, "", url);
    }

    window.dispatchEvent(
      new HashChangeEvent("hashchange", { oldURL: oldUrl, newURL: nextUrl }),
    );
  }
}

export function AnchorScrollManager({ locale }: AnchorScrollManagerProps) {
  useEffect(() => {
    let initialAnchorTimer = 0;

    function handleClick(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href*="#"]',
      );

      if (!anchor) {
        return;
      }

      if (anchor.hasAttribute("data-native-anchor")) {
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
      document.documentElement.setAttribute("data-anchor-scrolling", "");
      initialAnchorTimer = window.setTimeout(() => {
        scrollToHash(window.location.hash, `/${locale}${window.location.hash}`, true);
      }, initialAnchorSettleMs);
    }

    return () => {
      window.clearTimeout(initialAnchorTimer);
      document.removeEventListener("click", handleClick);
      finishPendingAnchorScroll?.();
      document.documentElement.removeAttribute("data-anchor-scrolling");
    };
  }, [locale]);

  return null;
}

function homePrefixLength(locale: Locale) {
  return `/${locale}`.length;
}
