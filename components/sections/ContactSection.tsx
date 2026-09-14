import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ContactSectionProps = {
  content: LocalizedSiteContent["contact"];
};

/**
 * The homepage close. The inquiry form itself lives on the contact route, so
 * this section states where Elaman is, how to reach the office directly and
 * leads to the form with one primary action. The office photograph carries no
 * caption any more: the opening sentence names Munich, and the same line twice
 * in one view is exactly the repetition the content blueprint rules out.
 */
export function ContactSection({ content }: ContactSectionProps) {
  return (
    <Section
      id="contact"
      variant="screen"
      tone="white"
      className="grid lg:grid-cols-[minmax(20rem,0.38fr)_minmax(0,0.62fr)]"
    >
      <div className="relative min-h-[clamp(18rem,42svh,28rem)] overflow-hidden bg-navy lg:min-h-full">
        <Image
          src="/images/elaman-munich-office.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="object-cover object-[68%_center] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-navy/32" aria-hidden="true" />
      </div>

      <div className="flex items-center border-t border-[var(--border-hairline)] py-[var(--section-y-screen)] pl-[var(--page-x-left)] pr-[var(--page-x-right)] lg:border-l lg:border-t-0">
        <div className="w-full max-w-[46rem]">
          <h2 className="text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
            {content.title}
          </h2>
          <p className="mt-6 max-w-[54ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
            {content.intro}
          </p>

          <dl className="mt-9 grid border-y border-[var(--border-hairline)] sm:grid-cols-3">
            <div className="border-b border-[var(--border-hairline)] py-4 sm:border-b-0 sm:border-r sm:pr-5">
              <dt className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft">
                {content.labels.address}
              </dt>
              <dd className="mt-2 text-[length:var(--type-body)] leading-6 text-graphite-muted">
                <address className="not-italic">
                  {content.addressLines.join(", ")}
                </address>
              </dd>
            </div>
            <div className="border-b border-[var(--border-hairline)] py-4 sm:border-b-0 sm:border-r sm:px-5">
              <dt className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft">
                {content.labels.phone}
              </dt>
              <dd className="mt-2 leading-6">
                <a
                  href={`tel:${content.phoneHref}`}
                  className="inline-flex min-h-11 items-center text-[length:var(--type-body)] text-graphite-muted transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue"
                >
                  {content.phone}
                </a>
              </dd>
            </div>
            <div className="py-4 sm:pl-5">
              <dt className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft">
                {content.labels.email}
              </dt>
              <dd className="mt-2 leading-6">
                <a
                  href={content.emailHref}
                  className="inline-flex min-h-11 items-center text-[length:var(--type-body)] text-graphite-muted transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue"
                >
                  {content.email}
                </a>
              </dd>
            </div>
          </dl>

          <Button className="mt-9" href={content.cta.href} size="lg">
            {content.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
