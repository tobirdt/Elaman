"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
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
    <Button
      href={`${homePath(nextLocale)}${hash}`}
      hrefLang={nextLocale}
      aria-label={`${label}: ${nextLocale.toUpperCase()}`}
      shape="pill"
      size="sm"
      variant="secondary"
      className="uppercase tracking-[0.12em] text-graphite-muted"
    >
      {nextLocale.toUpperCase()}
    </Button>
  );
}
