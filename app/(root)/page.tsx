import { redirect } from "next/navigation";
import type { Route } from "next";

import { homePath, defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  redirect(homePath(defaultLocale) as Route);
}
