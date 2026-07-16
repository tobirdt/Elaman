import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ProfileSectionProps = {
  content: LocalizedSiteContent["profile"];
};

export function ProfileSection({ content }: ProfileSectionProps) {
  return (
    <Section id="profile" variant="screen" tone="white" className="flex">
      <Container className="grid flex-1 items-center gap-12 py-[var(--section-y-screen)] lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:gap-20 xl:gap-24">
        <div className="min-w-0 max-w-[42rem]">
          <span className="block h-px w-20 bg-elaman-blue" aria-hidden="true" />
          <h2 className="mt-7 max-w-[18ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
            {content.title}
          </h2>
          <div className="mt-8 grid max-w-[65ch] gap-5 text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] min-w-0 overflow-hidden border border-[var(--border-hairline)] bg-[var(--surface-paper-soft)] lg:aspect-[5/6] lg:max-h-[38rem]">
          <Image
            src="/images/elaman-profile-bridge.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 38vw, 100vw"
            className="object-cover object-[48%_center] saturate-[0.72]"
          />
        </div>
      </Container>
    </Section>
  );
}
