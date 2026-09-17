"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { portalPath, type Locale } from "@/lib/i18n";

/**
 * Signing out is a POST, so it cannot be triggered by loading a link someone
 * else put on a page. That means a button and a little JavaScript rather than
 * an anchor.
 */
export function SignOutButton({ label, locale }: { label: string; locale: Locale }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    if (busy) {
      return;
    }

    setBusy(true);

    try {
      await fetch("/api/portal/logout", { method: "POST" });
    } finally {
      // Navigate either way. If the request failed, the sign-in page will
      // establish the truth; leaving someone on a page that may or may not
      // still be theirs is the worse outcome.
      router.refresh();
      router.replace(portalPath(locale));
    }
  }

  return (
    <Button type="button" variant="secondary" size="md" disabled={busy} onClick={signOut}>
      {label}
    </Button>
  );
}
