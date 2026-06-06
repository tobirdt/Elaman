import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { Container } from "@/components/ui/Container";
import { contactDetails } from "@/lib/content/contact";
import { legalNavigation } from "@/lib/content/navigation";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-xl">
          <Image
            src="/brand/elaman-logo.png"
            alt="Elaman German Security Solutions"
            width={160}
            height={61}
            className="h-auto w-36"
          />
          <div className="mt-6 h-px w-28 bg-gradient-to-r from-elaman-blue via-elaman-blue to-elaman-red" />
          <p className="mt-5 text-sm leading-6 text-graphite-muted">
            {contactDetails.company} · {contactDetails.footerAddressLines.join(", ")}
          </p>
          <p className="mt-2 text-sm text-graphite-soft">©2026 by Elaman GmbH</p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm text-graphite-muted md:justify-end">
          {legalNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href as Route}
              className="rounded-full border border-line bg-white px-4 py-2 transition hover:border-elaman-blue/24 hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
