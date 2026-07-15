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
    <div
      aria-label={label}
      className="inline-flex min-h-11 items-center gap-1.5 text-xs tracking-[0.06em]"
      role="group"
    >
      <span className="font-semibold text-graphite" aria-current="true">
        {locale.toUpperCase()}
      </span>
      <span className="text-graphite-soft" aria-hidden="true">
        /
      </span>
      <a
        href={`${homePath(nextLocale)}${hash}`}
        hrefLang={nextLocale}
        aria-label={`${label}: ${nextLocale.toUpperCase()}`}
        className="inline-flex min-h-11 items-center text-graphite-soft transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue"
      >
        {nextLocale.toUpperCase()}
      </a>
    </div>
  );
}
