import Image from "next/image";

import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";

type HeroSectionProps = {
  content: LocalizedSiteContent["hero"];
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <Section id="hero" variant="screen" tone="soft" className="grid lg:grid-cols-2">
      <div className="relative min-h-[clamp(15rem,38svh,24rem)] overflow-hidden bg-[var(--surface-paper-soft)] lg:min-h-full">
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

      <div className="hero-copy-enter flex items-center border-t border-[var(--border-hairline)] px-[var(--page-x)] py-[var(--section-y-screen)] lg:border-l lg:border-t-0">
        <div className="w-full max-w-[39rem]">
          <h1 className="text-[length:var(--type-display)] font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-graphite">
            {content.label}
          </h1>
          <p className="mt-3 max-w-[24ch] text-balance text-[length:var(--type-h3)] font-normal leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite-muted">
            {content.title}
          </p>

          <div className="mt-8 border-t border-[var(--border-hairline-strong)] pt-7 sm:mt-9">
            <p className="max-w-[56ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
              {content.intro}
            </p>
          </div>

          <div className="mt-8 flex items-baseline gap-4 border-t border-[var(--border-hairline)] pt-5 sm:mt-9">
            <span className="text-[length:var(--type-h3)] font-semibold tracking-[var(--tracking-title)] text-elaman-blue">
              {content.stat.value}
            </span>
            <span className="max-w-[21rem] text-[length:var(--type-small)] leading-6 text-graphite-muted">
              {content.stat.label}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
