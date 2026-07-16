import Image from "next/image";

import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";

type HeroSectionProps = {
  content: LocalizedSiteContent["hero"];
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <Section id="hero" variant="screen" tone="soft" className="grid lg:grid-cols-2">
      <div className="relative min-h-[clamp(12rem,34svh,24rem)] overflow-hidden bg-[var(--surface-paper-soft)] lg:min-h-full">
        <Image
          src="/images/elaman-advice.png"
          alt=""
          fill
          fetchPriority="high"
          preload
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[48%_center]"
        />
      </div>

      <div className="hero-copy-enter flex items-center border-t border-[var(--border-hairline)] px-[var(--page-x)] py-8 sm:py-10 lg:border-l lg:border-t-0 lg:py-[var(--section-y-screen)]">
        <div className="w-full max-w-[39rem]">
          <h1 className="text-[length:var(--type-display)] font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-graphite">
            {content.label}
          </h1>
          <p className="mt-2 max-w-[24ch] text-balance text-[length:var(--type-h3)] font-normal leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite-muted sm:mt-3">
            {content.title}
          </p>

          <div className="mt-7 flex items-center gap-4 border-t border-[var(--border-hairline-strong)] pt-5 sm:mt-8 sm:gap-5">
            <span className="shrink-0 text-[length:var(--type-h3)] font-semibold leading-none tracking-[var(--tracking-title)] text-elaman-blue">
              {content.stat.value}
            </span>
            <span className="max-w-[21rem] text-[length:var(--type-small)] leading-5 text-graphite-muted">
              {content.stat.label}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
