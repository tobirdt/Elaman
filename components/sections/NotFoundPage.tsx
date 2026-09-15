import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { getSiteContent } from "@/lib/content/site";
import { homePath, type Locale } from "@/lib/i18n";

type NotFoundPageProps = {
  locale?: Locale;
};

export function NotFoundPage({ locale = "de" }: NotFoundPageProps) {
  const content = getSiteContent(locale);
  const notFound = content.notFound;

  return (
    <>
      <Header locale={locale} content={content.navigation} />
      <main id="main-content" tabIndex={-1}>
        {/* The error page is a subpage like any other, so it opens with the
            same band. The way out sits in the band itself; the footer right
            below adds every other destination. */}
        <PageHeader
          locale={locale}
          current={notFound.breadcrumb}
          eyebrow={notFound.label}
          title={notFound.title}
          lead={notFound.body}
          actions={<Button href={homePath(locale)}>{notFound.cta}</Button>}
        />
      </main>
      <Footer
        contact={content.contact}
        locale={locale}
        navigation={content.navigation}
        footer={content.footer}
      />
    </>
  );
}
