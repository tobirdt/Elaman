"use client";

import { useEffect, useState } from "react";

import { alternateLocale, homePath, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const [hash, setHash] = useState("");
  const nextLocale = alternateLocale(locale);

  useEffect(() => {
    function syncHash() {
      setHash(window.location.hash);
    }

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  return (
    <a
      href={`${homePath(nextLocale)}${hash}`}
      hrefLang={nextLocale}
      aria-label={`${label}: ${nextLocale.toUpperCase()}`}
      className="rounded-full border border-line bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-graphite-muted transition hover:border-elaman-blue/24 hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
    >
      {nextLocale.toUpperCase()}
    </a>
  );
}
