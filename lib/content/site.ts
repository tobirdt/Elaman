import type { Route } from "next";

import {
  contactPagePath,
  detailPagePath,
  homePath,
  legalPagePath,
  type Locale,
} from "@/lib/i18n";

type NavigationItem = {
  label: string;
  href: Route;
};

/**
 * Global destinations. Every entry is a real page, so the active state is a
 * plain path comparison; `mobileOnly` marks the home entry that the signet
 * already provides on desktop.
 */
type PrimaryNavigationItem = NavigationItem & {
  mobileOnly?: boolean;
};

type ContentItem = {
  title: string;
  description: string;
};

type ContactFormContent = {
  fields: {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    message: string;
    website: string;
  };
  submit: string;
  sending: string;
  success: string;
  errors: {
    firstNameRequired: string;
    firstNameMax: string;
    lastNameMax: string;
    companyMax: string;
    emailRequired: string;
    emailMax: string;
    messageMin: string;
    messageMax: string;
    payload: string;
    rateLimited: string;
    sendFailed: string;
    unexpected: string;
  };
};

export type LocalizedSiteContent = {
  metadata: {
    title: string;
    description: string;
    ogLocale: string;
  };
  /** Wayfinding strings shared by every page below the homepage. */
  breadcrumb: {
    label: string;
    home: string;
  };
  navigation: {
    main: PrimaryNavigationItem[];
    legal: NavigationItem[];
    menu: string;
    homeLabel: string;
    languageSwitcherLabel: string;
    skipToContent: string;
    mainNavigationLabel: string;
    legalNavigationLabel: string;
  };
  footer: {
    navigationLabel: string;
    columns: {
      navigation: string;
      contact: string;
      legal: string;
    };
    copyright: string;
  };
  notFound: {
    label: string;
    breadcrumb: string;
    title: string;
    body: string;
    cta: string;
  };
  hero: {
    label: string;
    title: string;
    stat: { value: string; label: string };
  };
  profile: {
    label: string;
    title: string;
    paragraphs: string[];
    detailLink: NavigationItem;
  };
  advice: {
    label: string;
    title: string;
    intro: string;
    /** The homepage prints the stage names; the company page explains them. */
    steps: ContentItem[];
    detailLink: NavigationItem;
  };
  systems: {
    label: string;
    title: string;
    intro: string;
    items: Array<{ title: string }>;
    detailLink: NavigationItem;
  };
  contact: {
    company: string;
    /** One sentence for the homepage closing band. */
    closing: string;
    labels: {
      address: string;
      phone: string;
      email: string;
    };
    addressLines: string[];
    footerAddressLines: string[];
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    cta: NavigationItem;
    form: ContactFormContent;
  };
};

export const siteContent = {
  en: {
    metadata: {
      title: "Elaman – German Security Solutions, Munich",
      description:
        "Elaman GmbH in Munich supplies security technology for covert audio and video surveillance, analysis, TSCM and radio monitoring for mobile communications.",
      ogLocale: "en_GB",
    },
    breadcrumb: {
      label: "Breadcrumb",
      home: "Home",
    },
    navigation: {
      main: [
        { label: "Home", href: homePath("en"), mobileOnly: true },
        { label: "Company", href: detailPagePath("en", "company") },
        { label: "Systems", href: detailPagePath("en", "systems") },
        { label: "Contact", href: contactPagePath("en") },
      ],
      legal: [
        { label: "Legal notice", href: legalPagePath("en", "imprint") },
        { label: "Privacy policy", href: legalPagePath("en", "privacy") },
      ],
      menu: "Menu",
      homeLabel: "Elaman home",
      languageSwitcherLabel: "Language",
      skipToContent: "Skip to content",
      mainNavigationLabel: "Main navigation",
      legalNavigationLabel: "Legal navigation",
    },
    footer: {
      navigationLabel: "Footer navigation",
      columns: {
        navigation: "Navigation",
        contact: "Contact",
        legal: "Legal",
      },
      copyright: "© 2026 Elaman GmbH",
    },
    notFound: {
      label: "404",
      breadcrumb: "Page not found",
      title: "Page not found.",
      body: "This address does not exist on our website. The link may have changed. The homepage will take you to every section and to our contact details.",
      cta: "Go to the Elaman homepage",
    },
    hero: {
      label: "Elaman",
      title: "The link between trust and security.",
      stat: {
        value: "25+",
        label: "Years of experience in security technology and solutions",
      },
    },
    profile: {
      label: "Company",
      title: "German Security Solutions.",
      paragraphs: [
        "Elaman combines established products with new technologies to create integrated security systems.",
        "The operating environment largely determines the final system: the existing infrastructure, organisational requirements and conditions on site.",
        "We work exclusively with security authorities and security-related organisations.",
      ],
      detailLink: {
        label: "Company profile",
        href: detailPagePath("en", "company"),
      },
    },
    advice: {
      label: "Approach",
      title: "From initial analysis to long-term support.",
      intro: "Our work continues beyond commissioning.",
      steps: [
        {
          title: "Analysis & consulting",
          description:
            "We establish what the system must do and the conditions in which it will be used.",
        },
        {
          title: "Planning & integration",
          description:
            "We turn the requirements into a technical solution and coordinate the components and interfaces.",
        },
        {
          title: "Turnkey implementation",
          description: "We handle installation, integration and commissioning.",
        },
        {
          title: "Training & support",
          description:
            "We train the teams on the finished system and remain available throughout operation.",
        },
      ],
      detailLink: {
        label: "How we work",
        href: detailPagePath("en", "company"),
      },
    },
    systems: {
      label: "Systems",
      title: "Systems for communications, observation and analysis.",
      intro:
        "Elaman supplies these systems individually or integrates them into a complete system.",
      items: [
        { title: "Covert audio and video surveillance" },
        { title: "Audio and video analysis systems" },
        { title: "Technical surveillance countermeasures (TSCM)" },
        {
          title:
            "Radio monitoring systems for mobile communications in special-purpose vehicles",
        },
        { title: "Training and support" },
      ],
      detailLink: {
        label: "Systems overview",
        href: detailPagePath("en", "systems"),
      },
    },
    contact: {
      company: "Elaman GmbH",
      closing: "Elaman in Munich. Call, write, or send us your inquiry through the form.",
      labels: {
        address: "Address",
        phone: "Phone",
        email: "Email",
      },
      addressLines: ["Implerstraße 24", "81371 Munich", "Germany"],
      footerAddressLines: ["Implerstraße 24", "81371 Munich, Germany"],
      phone: "+49 89 24209180",
      phoneHref: "+498924209180",
      email: "info@elaman.de",
      emailHref: "mailto:info@elaman.de",
      cta: {
        label: "Send an inquiry",
        href: contactPagePath("en"),
      },
      form: {
        fields: {
          firstName: "First name",
          lastName: "Last name",
          company: "Company",
          email: "Email",
          message: "Message",
          website: "Website",
        },
        submit: "Send inquiry",
        sending: "Sending inquiry…",
        success: "Thank you. We have received your inquiry and will be in touch.",
        errors: {
          firstNameRequired: "Please enter your first name.",
          firstNameMax: "Please shorten the first name to 80 characters or fewer.",
          lastNameMax: "Please shorten the last name to 80 characters or fewer.",
          companyMax: "Please shorten the company name to 120 characters or fewer.",
          emailRequired: "Please enter a valid email address.",
          emailMax: "Please shorten the email address to 254 characters or fewer.",
          messageMin: "Please describe your inquiry in at least 20 characters.",
          messageMax: "Please shorten your message to 4000 characters or fewer.",
          payload:
            "We could not process your inquiry. Please reload the page and try again.",
          rateLimited:
            "Several inquiries were sent in a short period. Please try again in a few minutes.",
          sendFailed:
            "Your inquiry could not be sent. Please try again, or call us and we will take the details directly.",
          unexpected:
            "Something went wrong while processing your inquiry. Please try again, or contact us by phone or email.",
        },
      },
    },
  },
  de: {
    metadata: {
      title: "Elaman – Sicherheitstechnik aus München",
      description:
        "Elaman GmbH in München liefert Sicherheitstechnik für verdeckte Audio- und Videoobservation, Auswertung, Lauschabwehr und Funkerfassung.",
      ogLocale: "de_DE",
    },
    breadcrumb: {
      label: "Navigationspfad",
      home: "Start",
    },
    navigation: {
      main: [
        { label: "Start", href: homePath("de"), mobileOnly: true },
        { label: "Unternehmen", href: detailPagePath("de", "company") },
        { label: "Systeme", href: detailPagePath("de", "systems") },
        { label: "Kontakt", href: contactPagePath("de") },
      ],
      legal: [
        { label: "Impressum", href: legalPagePath("de", "imprint") },
        { label: "Datenschutzerklärung", href: legalPagePath("de", "privacy") },
      ],
      menu: "Menü",
      homeLabel: "Zur Elaman-Startseite",
      languageSwitcherLabel: "Sprache",
      skipToContent: "Direkt zum Inhalt",
      mainNavigationLabel: "Hauptnavigation",
      legalNavigationLabel: "Rechtliche Hinweise",
    },
    footer: {
      navigationLabel: "Navigation im Fußbereich",
      columns: {
        navigation: "Navigation",
        contact: "Kontakt",
        legal: "Rechtliches",
      },
      copyright: "© 2026 Elaman GmbH",
    },
    notFound: {
      label: "404",
      breadcrumb: "Seite nicht gefunden",
      title: "Seite nicht gefunden.",
      body: "Diese Adresse gibt es auf unserer Website nicht. Möglicherweise hat sich der Link geändert. Über die Startseite erreichen Sie alle Bereiche und den direkten Kontakt.",
      cta: "Zur Elaman-Startseite",
    },
    hero: {
      label: "Elaman",
      title: "Das Bindeglied zwischen Vertrauen und Sicherheit.",
      stat: {
        value: "25+",
        label: "Jahre Erfahrung mit Sicherheitstechnik und Sicherheitslösungen",
      },
    },
    profile: {
      label: "Unternehmen",
      title: "Lösungen und Produkte im Bereich der Sicherheitstechnik.",
      paragraphs: [
        "Elaman bringt etablierte Produkte und neue Technologien zu integrierten Sicherheitssystemen zusammen.",
        "Wie ein System am Ende aussieht, entscheidet meist das Einsatzumfeld: die vorhandene Infrastruktur, die organisatorischen Vorgaben und die Bedingungen vor Ort.",
        "Wir arbeiten ausschließlich für Sicherheitsbehörden und sicherheitsrelevante Organisationen.",
      ],
      detailLink: {
        label: "Zum Unternehmensprofil",
        href: detailPagePath("de", "company"),
      },
    },
    advice: {
      label: "Vorgehen",
      title: "Von der Analyse bis zur langfristigen Betreuung.",
      intro: "Ein Projekt endet für uns nicht mit der Inbetriebnahme.",
      steps: [
        {
          title: "Analyse & Beratung",
          description:
            "Wir erfassen, was das System leisten muss und unter welchen Bedingungen es eingesetzt wird.",
        },
        {
          title: "Planung & Integration",
          description:
            "Aus dem Anforderungsprofil entwickeln wir die technische Lösung und stimmen Komponenten und Schnittstellen aufeinander ab.",
        },
        {
          title: "Schlüsselfertige Umsetzung",
          description: "Wir übernehmen Aufbau, Integration und Inbetriebnahme.",
        },
        {
          title: "Schulung & Betreuung",
          description:
            "Wir schulen die Teams am fertigen System und bleiben im laufenden Betrieb erreichbar.",
        },
      ],
      detailLink: {
        label: "So arbeiten wir",
        href: detailPagePath("de", "company"),
      },
    },
    systems: {
      label: "Systeme",
      title: "Systeme für Kommunikation, Observation und Auswertung.",
      intro:
        "Elaman liefert diese Systeme einzeln oder führt sie zu einem Gesamtsystem zusammen.",
      items: [
        { title: "Verdeckte Audio- und Videoobservation" },
        { title: "Audio- und Videoauswertesysteme" },
        { title: "Lauschabwehr (TSCM)" },
        { title: "Funkerfassungssysteme für Mobilfunk in Spezialfahrzeugen" },
        { title: "Schulung und Betreuung" },
      ],
      detailLink: {
        label: "Systeme im Überblick",
        href: detailPagePath("de", "systems"),
      },
    },
    contact: {
      company: "Elaman GmbH",
      closing:
        "Elaman in München. Rufen Sie an, schreiben Sie oder schicken Sie uns Ihre Anfrage über das Formular.",
      labels: {
        address: "Adresse",
        phone: "Telefon",
        email: "E-Mail",
      },
      addressLines: ["Implerstraße 24", "81371 München", "Deutschland"],
      footerAddressLines: ["Implerstraße 24", "81371 München, Deutschland"],
      phone: "+49 89 24209180",
      phoneHref: "+498924209180",
      email: "info@elaman.de",
      emailHref: "mailto:info@elaman.de",
      cta: {
        label: "Anfrage senden",
        href: contactPagePath("de"),
      },
      form: {
        fields: {
          firstName: "Vorname",
          lastName: "Nachname",
          company: "Unternehmen",
          email: "E-Mail",
          message: "Nachricht",
          website: "Website",
        },
        submit: "Anfrage senden",
        sending: "Anfrage wird übermittelt…",
        success:
          "Vielen Dank. Ihre Anfrage ist bei uns eingegangen. Wir melden uns bei Ihnen.",
        errors: {
          firstNameRequired: "Bitte geben Sie Ihren Vornamen ein.",
          firstNameMax: "Bitte kürzen Sie den Vornamen auf höchstens 80 Zeichen.",
          lastNameMax: "Bitte kürzen Sie den Nachnamen auf höchstens 80 Zeichen.",
          companyMax: "Bitte kürzen Sie den Unternehmensnamen auf höchstens 120 Zeichen.",
          emailRequired: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
          emailMax: "Bitte kürzen Sie die E-Mail-Adresse auf höchstens 254 Zeichen.",
          messageMin: "Bitte beschreiben Sie Ihr Anliegen mit mindestens 20 Zeichen.",
          messageMax: "Bitte kürzen Sie Ihre Nachricht auf höchstens 4000 Zeichen.",
          payload:
            "Ihre Anfrage konnte nicht verarbeitet werden. Bitte laden Sie die Seite neu und versuchen Sie es noch einmal.",
          rateLimited:
            "In kurzer Zeit wurden mehrere Anfragen gesendet. Bitte versuchen Sie es in einigen Minuten erneut.",
          sendFailed:
            "Ihre Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut oder rufen Sie uns an, dann klären wir es direkt.",
          unexpected:
            "Bei der Verarbeitung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder wenden Sie sich telefonisch an uns.",
        },
      },
    },
  },
} satisfies Record<Locale, LocalizedSiteContent>;

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}
