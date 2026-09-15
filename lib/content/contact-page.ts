import type { Route } from "next";

import { legalPagePath, type Locale } from "@/lib/i18n";

type ContactPageMetadata = {
  title: string;
  description: string;
  ogLocale: string;
};

/**
 * The inquiry route. Address, phone and email stay in `lib/content/site.ts`
 * because the homepage, the footer and the structured data read the same
 * facts; only the strings that exist once, on this page, live here.
 */
export type ContactPageContent = {
  metadata: ContactPageMetadata;
  eyebrow: string;
  title: string;
  lead: string;
  /** Short name of the page, shown as the last breadcrumb step. */
  breadcrumb: string;
  /** Titles the band that holds the direct routes and the form. */
  section: {
    label: string;
    title: string;
  };
  form: {
    title: string;
    intro: string;
  };
  privacy: {
    text: string;
    linkLabel: string;
    href: Route;
    suffix: string;
  };
};

const contactPageContent = {
  de: {
    metadata: {
      title: "Kontakt",
      description:
        "Kontakt zur Elaman GmbH in München: Anfrage per Formular, Telefon oder E-Mail an unser Team.",
      ogLocale: "de_DE",
    },
    eyebrow: "Kontakt",
    title: "Sprechen Sie mit uns.",
    lead: "Ihre Anfrage erreicht direkt unser Team in München. Ein paar Sätze zur Aufgabe genügen für den ersten Austausch.",
    breadcrumb: "Kontakt",
    section: {
      label: "Kontaktwege",
      title: "Direkt oder über das Formular.",
    },
    form: {
      title: "Ihr Anliegen",
      intro:
        "Pflichtfelder sind mit * gekennzeichnet. Wir antworten per E-Mail oder rufen zurück, wenn Sie das wünschen.",
    },
    privacy: {
      text: "Mit dem Absenden verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten. Einzelheiten stehen in der ",
      linkLabel: "Datenschutzerklärung",
      href: legalPagePath("de", "privacy"),
      suffix: ".",
    },
  },
  en: {
    metadata: {
      title: "Contact",
      description:
        "Get in touch with the Elaman team in Munich by inquiry form, phone or email.",
      ogLocale: "en_GB",
    },
    eyebrow: "Contact",
    title: "Talk to us.",
    lead: "Your inquiry goes directly to our team in Munich. A brief description of the task is enough for an initial discussion.",
    breadcrumb: "Contact",
    section: {
      label: "Ways to reach us",
      title: "Directly or through the form.",
    },
    form: {
      title: "Your inquiry",
      intro:
        "Required fields are marked with *. We reply by email, or by phone if you prefer.",
    },
    privacy: {
      text: "When you send the form, we process your details in order to answer your inquiry. Details are set out in the ",
      linkLabel: "privacy policy",
      href: legalPagePath("en", "privacy"),
      suffix: ".",
    },
  },
} satisfies Record<Locale, ContactPageContent>;

export function getContactPageContent(locale: Locale): ContactPageContent {
  return contactPageContent[locale];
}
