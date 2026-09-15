import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import type { ContactPageContent } from "@/lib/content/contact-page";
import type { LocalizedSiteContent } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n";

type ContactPageProps = {
  content: ContactPageContent;
  contact: LocalizedSiteContent["contact"];
  locale: Locale;
};

const termClasses =
  "font-mono text-[length:var(--type-micro)] font-medium uppercase tracking-[var(--tracking-label)] text-graphite-soft";

const directLinkClasses =
  "inline-flex min-h-11 items-center text-[length:var(--type-body)] text-graphite-muted transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue";

export function ContactPage({ content, contact, locale }: ContactPageProps) {
  return (
    <article>
      <PageHeader
        locale={locale}
        current={content.breadcrumb}
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
      />

      <section className="bg-[var(--surface-paper)]">
        <Container className="reveal-group grid gap-10 py-[var(--section-y-content-band)] xl:grid-cols-[minmax(16rem,0.36fr)_minmax(0,0.64fr)] xl:gap-16">
          <dl className="grid self-start border-t border-[var(--border-hairline-strong)]">
            <div className="border-b border-[var(--border-hairline)] py-5">
              <dt className={termClasses}>{contact.labels.address}</dt>
              <dd className="mt-2 text-[length:var(--type-body)] leading-6 text-graphite-muted">
                <address className="not-italic">
                  <span className="block font-semibold text-graphite">
                    {contact.company}
                  </span>
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </dd>
            </div>
            <div className="border-b border-[var(--border-hairline)] py-5">
              <dt className={termClasses}>{contact.labels.phone}</dt>
              <dd className="mt-1 leading-6">
                <a className={directLinkClasses} href={`tel:${contact.phoneHref}`}>
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div className="border-b border-[var(--border-hairline)] py-5">
              <dt className={termClasses}>{contact.labels.email}</dt>
              <dd className="mt-1 leading-6">
                <a className={directLinkClasses} href={contact.emailHref}>
                  {contact.email}
                </a>
              </dd>
            </div>
          </dl>

          {/* No rule above the form below xl: the details list already ends on
              a hairline, and a second line right under it reads as a seam. */}
          <div className="xl:border-l xl:border-[var(--border-hairline-strong)] xl:pl-16">
            <h2 className="text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
              {content.form.title}
            </h2>
            <p className="mt-3 max-w-[58ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
              {content.form.intro}
            </p>
            <div className="mt-7">
              <ContactForm content={contact.form} locale={locale} />
            </div>
            <p className="mt-7 max-w-[62ch] text-[length:var(--type-small)] leading-6 text-graphite-soft">
              {content.privacy.text}
              <Link
                className="underline decoration-[var(--border-accent-blue)] underline-offset-4 transition-colors [transition-duration:var(--motion-micro)] hover:text-elaman-blue"
                href={content.privacy.href}
              >
                {content.privacy.linkLabel}
              </Link>
              {content.privacy.suffix}
            </p>
          </div>
        </Container>
      </section>
    </article>
  );
}
