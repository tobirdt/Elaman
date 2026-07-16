import Image from "next/image";

import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";

type SystemsSectionProps = {
  content: LocalizedSiteContent["systems"];
};

export function SystemsSection({ content }: SystemsSectionProps) {
  return (
    <Section
      id="systems"
      variant="screen"
      className="grid bg-navy text-[var(--color-on-dark)] lg:grid-cols-[minmax(20rem,0.38fr)_minmax(0,0.62fr)]"
    >
      <div className="relative min-h-[clamp(18rem,42svh,28rem)] overflow-hidden bg-navy lg:min-h-full">
        <Image
          src="/images/elaman-systems-media-mining.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="object-cover object-[52%_43%] saturate-[0.58] contrast-[1.04]"
        />
        <div className="absolute inset-0 bg-navy/38" aria-hidden="true" />
      </div>

      <div className="flex items-center border-t border-[var(--border-on-navy)] px-[var(--page-x)] py-[var(--section-y-screen)] lg:border-l lg:border-t-0">
        <div className="w-full max-w-[48rem]">
          <span className="block h-px w-20 bg-elaman-blue" aria-hidden="true" />
          <h2 className="mt-7 max-w-[21ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-[var(--color-on-dark)]">
            {content.title}
          </h2>
          <p className="mt-5 max-w-[62ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-[var(--color-on-dark-muted)]">
            {content.intro}
          </p>

          <ol className="mt-9 grid sm:grid-cols-2 sm:gap-x-8 lg:mt-10">
            {content.items.map((item, index) => (
              <li
                key={item.title}
                className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-3 border-t border-[var(--border-on-navy)] py-4"
              >
                <span className="font-mono text-[length:var(--type-micro)] tracking-[var(--tracking-label)] text-[var(--color-on-dark-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="min-w-0 text-pretty text-[length:var(--type-body)] font-semibold leading-6 tracking-[-0.01em] text-[var(--color-on-dark)]">
                  {item.title}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
