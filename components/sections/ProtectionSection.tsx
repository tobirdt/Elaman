import Image from "next/image";

import { Container } from "@/components/ui/Container";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ProtectionSectionProps = {
  content: LocalizedSiteContent["protection"];
  tagline: string;
};

export function ProtectionSection({ content, tagline }: ProtectionSectionProps) {
  const columns = [content.items.slice(0, 2), content.items.slice(2)];

  return (
    <section id="protection" className="bg-[var(--surface-paper)]">
      <div className="relative h-56 overflow-hidden bg-navy sm:h-72 lg:h-80">
        <Image
          src="/images/elaman-protection.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy/35" aria-hidden="true" />
        <Container className="relative flex h-full items-center justify-center text-center">
          <h2 className="max-w-[24ch] text-balance text-[clamp(1.75rem,4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--color-on-dark)]">
            Elaman — {tagline}
          </h2>
        </Container>
      </div>

      <Container className="py-[var(--section-y-content-band)]">
        <div className="max-w-[48rem]">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-elaman-red" aria-hidden="true" />
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-graphite-soft">
              {content.label}
            </p>
          </div>
          <h3 className="mt-5 max-w-[18ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
            {content.title}
          </h3>
          <p className="mt-5 max-w-[62ch] text-base leading-7 text-graphite-muted">
            {content.body}
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {columns.map((items, columnIndex) => (
            <div key={columnIndex} className="min-w-0">
              <div className="border-t border-[var(--border-hairline-strong)]">
                {items.map((item) => (
                  <article
                    key={item.title}
                    className="border-b border-[var(--border-hairline)] py-6"
                  >
                    <h4 className="text-lg font-semibold tracking-[-0.02em] text-graphite">
                      {item.title}
                    </h4>
                    <p className="mt-3 max-w-[58ch] text-sm leading-7 text-graphite-muted">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
