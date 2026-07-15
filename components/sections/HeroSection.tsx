import Image from "next/image";

import type { LocalizedSiteContent } from "@/lib/content/site";

type HeroSectionProps = {
  content: LocalizedSiteContent["hero"];
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="grid min-h-[clamp(34rem,72svh,48rem)] bg-[var(--surface-paper-soft)] md:grid-cols-2"
    >
      <div className="relative min-h-72 overflow-hidden bg-[var(--surface-paper-soft)] sm:min-h-96 md:min-h-full">
        <Image
          src="/images/elaman-advice.png"
          alt=""
          fill
          fetchPriority="high"
          preload
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-[48%_center]"
        />
      </div>

      <div className="hero-copy-enter flex items-center border-l border-[var(--border-hairline)] px-[var(--page-x)] py-14 sm:py-16 lg:py-20">
        <div className="w-full max-w-[39rem]">
          <h1 className="text-[length:var(--type-display)] font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-graphite">
            {content.label}
          </h1>
          <p className="mt-3 text-balance text-[clamp(1.25rem,2.1vw,2rem)] font-normal leading-[1.15] tracking-[-0.03em] text-graphite-muted">
            {content.title}
          </p>

          <div className="mt-9 border-t border-[var(--border-hairline-strong)] pt-7">
            <p className="max-w-[56ch] text-base leading-7 text-graphite-muted">
              {content.intro}
            </p>
            <p className="mt-5 max-w-[60ch] text-sm leading-7 text-graphite-muted">
              {content.body}
            </p>
          </div>

          <div className="mt-9 flex items-baseline gap-4 border-t border-[var(--border-hairline)] pt-5">
            <span className="text-3xl font-semibold tracking-[-0.04em] text-elaman-blue">
              {content.stats[0]?.value}
            </span>
            <span className="max-w-[20rem] text-xs leading-5 text-graphite-muted">
              {content.stats[0]?.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
