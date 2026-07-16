import Image from "next/image";

import { ContactForm } from "@/components/sections/ContactForm";
import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";

type ContactSectionProps = {
  content: LocalizedSiteContent["contact"];
};

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
        <div className="absolute inset-0 bg-navy/42" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 px-[var(--page-x)] py-8 text-[var(--color-on-dark)] sm:py-10 lg:py-12">
          <p className="max-w-[18ch] text-balance text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)]">
            {content.officeTitle}
          </p>
        </div>
      </div>

      <div className="flex items-center border-t border-[var(--border-hairline)] px-[var(--page-x)] py-[var(--section-y-screen)] lg:border-l lg:border-t-0">
        <div className="w-full max-w-[64rem] xl:grid xl:grid-cols-[minmax(13rem,0.34fr)_minmax(0,0.66fr)] xl:gap-10">
          <div>
            <h2 className="text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.title}
            </h2>
            <p className="mt-4 max-w-[54ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
              {content.intro}
            </p>

            <dl className="mt-7 grid border-y border-[var(--border-hairline)] sm:grid-cols-3 xl:block">
              <div className="border-b border-[var(--border-hairline)] py-4 sm:border-b-0 sm:border-r sm:pr-5 xl:border-b xl:border-r-0 xl:pr-0">
                <dt className="font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft">
                  {content.labels.address}
                </dt>
                <dd className="mt-2 text-[length:var(--type-body)] leading-6 text-graphite-muted">
                  <address className="not-italic">
                    {content.addressLines.join(", ")}
                  </address>
                </dd>
              </div>
              <div className="border-b border-[var(--border-hairline)] py-4 sm:border-b-0 sm:border-r sm:px-5 xl:border-b xl:border-r-0 xl:px-0">
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
              <div className="py-4 sm:pl-5 xl:pl-0">
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
          </div>

          <div className="mt-8 border-t border-[var(--border-hairline-strong)] pt-7 xl:mt-0 xl:border-l xl:border-t-0 xl:pl-10 xl:pt-0">
            <h3 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.form.title}
            </h3>
            <p className="mt-3 max-w-[54ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
              {content.form.intro}
            </p>
            <div className="mt-6">
              <ContactForm content={content.form} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
