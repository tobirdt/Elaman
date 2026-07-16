import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ProtectionSectionProps = {
  content: LocalizedSiteContent["protection"];
};

export function ProtectionSection({ content }: ProtectionSectionProps) {
  return (
    <Section id="protection" variant="screen" tone="white">
      <div className="relative h-[clamp(15rem,34svh,19rem)] overflow-hidden bg-navy">
        <Image
          src="/images/elaman-protection.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy/22" aria-hidden="true" />
      </div>

      <Container className="grid gap-10 py-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16 lg:py-12 xl:gap-20">
        <div className="max-w-[39rem]">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-elaman-red" aria-hidden="true" />
            <p className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft">
              {content.label}
            </p>
          </div>
          <h2 className="mt-5 max-w-[18ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
            {content.title}
          </h2>
          <p className="mt-5 max-w-[58ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
            {content.body}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 sm:gap-x-10 lg:gap-x-12">
          {content.items.map((item) => (
            <article
              key={item.title}
              className="border-t border-[var(--border-hairline-strong)] py-5"
            >
              <h3 className="text-[length:var(--type-body)] font-semibold leading-6 tracking-[-0.01em] text-graphite">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[58ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
