import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { legalNavigation, navigationItems } from "@/lib/content/navigation";

function homeSectionHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/72 backdrop-blur-2xl">
      <Container className="flex h-16 items-center justify-between gap-3 lg:h-20 lg:gap-5">
        <Link href="/" className="flex items-center" aria-label="Elaman home">
          <Image
            src="/brand/elaman-logo.png"
            alt="Elaman German Security Solutions"
            width={188}
            height={72}
            priority
            className="h-auto w-32 sm:w-44"
          />
        </Link>

        <nav className="glass-surface hidden items-center gap-1 rounded-full px-2 py-2 text-sm text-graphite-muted shadow-[0_16px_48px_rgba(22,24,29,0.055)] lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={homeSectionHref(item.href)}
              className="rounded-full px-4 py-2 transition hover:bg-white hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elaman-blue"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:block">
          <Button href="/#contact" variant="secondary" className="px-4 py-2.5">
            Contact
          </Button>
        </div>

        <details className="group relative z-50 block shrink-0 lg:hidden">
          <summary
            aria-label="Open site navigation"
            className="glass-surface flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-graphite transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue [&::-webkit-details-marker]:hidden"
          >
            Menu
            <span className="relative size-4" aria-hidden="true">
              <span className="absolute left-0 top-1 h-px w-4 bg-current transition group-open:top-2 group-open:rotate-45" />
              <span className="absolute bottom-1 left-0 h-px w-4 bg-current transition group-open:bottom-[0.45rem] group-open:-rotate-45" />
            </span>
          </summary>
          <div className="glass-surface absolute right-0 mt-3 w-[min(18rem,calc(100vw-2.5rem))] rounded-lg p-2">
            <nav className="grid gap-1 text-sm">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={homeSectionHref(item.href)}
                  className="rounded-sm px-4 py-3 text-graphite-muted transition hover:bg-white hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elaman-blue"
                >
                  {item.label}
                </a>
              ))}
              <div className="my-1 h-px bg-line" />
              {legalNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className="rounded-sm px-4 py-3 text-graphite-muted transition hover:bg-white hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elaman-blue"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </details>
      </Container>
    </header>
  );
}
