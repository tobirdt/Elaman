import { redirect } from "next/navigation";

import { homePath, defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  redirect(homePath(defaultLocale));
}
