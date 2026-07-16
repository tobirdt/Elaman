import type { Locale } from "@/lib/i18n";

type NavigationItem = {
  label: string;
  href: string;
};

type ContentItem = {
  title: string;
  description: string;
};

type ContactFormContent = {
  title: string;
  intro: string;
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
  navigation: {
    main: NavigationItem[];
    legal: NavigationItem[];
    menu: string;
    homeLabel: string;
    languageSwitcherLabel: string;
    skipToContent: string;
    mainNavigationLabel: string;
    legalNavigationLabel: string;
  };
  footer: {
    copyright: string;
  };
  hero: {
    label: string;
    title: string;
    intro: string;
    body: string;
    stat: { value: string; label: string };
  };
  overview: {
    title: string;
    paragraphs: string[];
    items: Array<{ title: string }>;
  };
  protection: {
    label: string;
    title: string;
    body: string;
    items: ContentItem[];
  };
  contact: {
    company: string;
    officeTitle: string;
    title: string;
    intro: string;
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
    form: ContactFormContent;
  };
};

export const siteContent = {
  en: {
    metadata: {
      title: "German Security Solutions | Elaman GmbH",
      description:
        "Elaman GmbH provides communications and security engineering, technical services, advice, surveillance and protection solutions, professional training, and after-sales support for public authorities and security-sector clients.",
      ogLocale: "en_US",
    },
    navigation: {
      main: [
        { label: "Home", href: "#hero" },
        { label: "Advice", href: "#experience" },
        { label: "Surveillance", href: "#systems" },
        { label: "Protection", href: "#protection" },
        { label: "Contact", href: "#contact" },
      ],
      legal: [
        { label: "Imprint", href: "/imprint" },
        { label: "Privacy Policy", href: "/private-policy" },
      ],
      menu: "Menu",
      homeLabel: "Elaman home",
      languageSwitcherLabel: "Language",
      skipToContent: "Skip to content",
      mainNavigationLabel: "Main navigation",
      legalNavigationLabel: "Legal navigation",
    },
    footer: {
      copyright: "©2026 Elaman GmbH",
    },
    hero: {
      label: "Elaman",
      title: "Your bridge to trust and security.",
      intro:
        "Elaman develops and integrates communications and security technology for public authorities and security organisations.",
      body: "Our services range from technical advice and system integration through turnkey implementation to professional training and long-term support.",
      stat: {
        value: "20+",
        label: "Years in communications and security engineering",
      },
    },
    overview: {
      title: "Elaman — German Security Solutions.",
      paragraphs: [
        "We combine established products and current technologies into integrated systems for demanding communications and security environments.",
        "Our work begins with a precise understanding of the task and continues beyond commissioning.",
        "Each solution is aligned with the project’s infrastructure, operating environment and organisational requirements.",
      ],
      items: [
        { title: "Audio and video observation" },
        { title: "Geographical information systems" },
        { title: "Technical counter-surveillance" },
        { title: "Special-purpose vehicles" },
        { title: "Command and control centres" },
        { title: "Intelligence fusion systems" },
        { title: "Training & Support" },
        { title: "Data forensics" },
      ],
    },
    protection: {
      label: "Protection & Countermeasures",
      title: "Protection where confidentiality matters.",
      body: "Elaman plans countermeasures and protective infrastructure for sensitive operational environments.",
      items: [
        {
          title: "ECM / Counter-RCIED",
          description:
            "Electronic countermeasures addressing radio-controlled threats and wireless risks.",
        },
        {
          title: "Jamming systems",
          description:
            "Portable, vehicle-based and building-based systems for authorised public-sector use.",
        },
        {
          title: "TSCM",
          description:
            "Technical surveillance countermeasures, advice and training for specialist teams.",
        },
        {
          title: "Shielded rooms",
          description:
            "Structural, mechanical and electronic concepts for rooms where confidential information is handled.",
        },
      ],
    },
    contact: {
      company: "Elaman GmbH",
      officeTitle: "The Elaman Office in Munich",
      title: "Contact",
      intro: "Your inquiry goes directly to our team in Munich.",
      labels: {
        address: "Address",
        phone: "Phone",
        email: "Email",
      },
      addressLines: ["Implerstraße 24", "81371 Munich", "Germany"],
      footerAddressLines: ["Implerstraße 24", "81371 Munich, Germany"],
      phone: "+49 (0) 89 - 24 20 91 80",
      phoneHref: "+498924209180",
      email: "info@elaman.de",
      emailHref: "mailto:info@elaman.de",
      form: {
        title: "Send an inquiry",
        intro: "A short outline is enough for an initial conversation.",
        fields: {
          firstName: "First name",
          lastName: "Last name",
          company: "Company",
          email: "Email",
          message: "Message",
          website: "Website",
        },
        submit: "Send inquiry",
        sending: "Sending…",
        success: "Thank you. Your inquiry has been sent.",
        errors: {
          firstNameRequired: "First name is required.",
          firstNameMax: "First name must be 80 characters or fewer.",
          lastNameMax: "Last name must be 80 characters or fewer.",
          companyMax: "Company must be 120 characters or fewer.",
          emailRequired: "Enter a valid email address.",
          emailMax: "Email must be 254 characters or fewer.",
          messageMin: "Message must be at least 20 characters.",
          messageMax: "Message must be 4000 characters or fewer.",
          payload: "The message could not be prepared. Please try again later.",
          rateLimited: "Too many requests. Please try again later.",
          sendFailed:
            "The message could not be sent. Please use phone or email directly.",
          unexpected:
            "The message could not be sent. Please use phone or email directly.",
        },
      },
    },
  },
  de: {
    metadata: {
      title: "Deutsche Sicherheitslösungen | Elaman GmbH",
      description:
        "Elaman GmbH bietet Kommunikations- und Sicherheitstechnik, technische Dienstleistungen, Beratung, Observation und Schutzlösungen, professionelle Schulungen und After-Sales-Service für Behörden und Sicherheitskunden.",
      ogLocale: "de_DE",
    },
    navigation: {
      main: [
        { label: "Start", href: "#hero" },
        { label: "Beratung", href: "#experience" },
        { label: "Observation", href: "#systems" },
        { label: "Schutz", href: "#protection" },
        { label: "Kontakt", href: "#contact" },
      ],
      legal: [
        { label: "Impressum", href: "/imprint" },
        { label: "Datenschutzerklärung", href: "/private-policy" },
      ],
      menu: "Menü",
      homeLabel: "Elaman Startseite",
      languageSwitcherLabel: "Sprache",
      skipToContent: "Zum Inhalt springen",
      mainNavigationLabel: "Hauptnavigation",
      legalNavigationLabel: "Rechtliche Navigation",
    },
    footer: {
      copyright: "©2026 Elaman GmbH",
    },
    hero: {
      label: "Elaman",
      title: "Ihre Brücke zu Vertrauen und Sicherheit.",
      intro:
        "Elaman entwickelt und integriert Kommunikations- und Sicherheitstechnik für Behörden und Sicherheitsorganisationen.",
      body: "Das Leistungsspektrum reicht von technischer Beratung und Systemintegration über die schlüsselfertige Umsetzung bis zu Schulung und langfristiger Betreuung.",
      stat: {
        value: "20+",
        label: "Jahre in Kommunikations- und Sicherheitstechnik",
      },
    },
    overview: {
      title: "Elaman — Deutsche Sicherheitslösungen.",
      paragraphs: [
        "Wir verbinden bewährte Produkte und aktuelle Technologien zu integrierten Systemen für anspruchsvolle Kommunikations- und Sicherheitsumgebungen.",
        "Unsere Arbeit beginnt mit einer genauen Analyse der Aufgabe und endet nicht mit der Inbetriebnahme.",
        "Jede Lösung wird auf Infrastruktur, Einsatzumgebung und organisatorische Anforderungen des Projekts abgestimmt.",
      ],
      items: [
        { title: "Audio- und Videoobservation" },
        { title: "Geoinformationssysteme" },
        { title: "Technische Gegenüberwachung" },
        { title: "Spezialfahrzeuge" },
        { title: "Führungszentralen" },
        { title: "Intelligence-Fusion-Systeme" },
        { title: "Schulung und Betreuung" },
        { title: "Datenforensik" },
      ],
    },
    protection: {
      label: "Schutz & Gegenmaßnahmen",
      title: "Schutz, wo Vertraulichkeit zählt.",
      body: "Elaman plant Gegenmaßnahmen und Schutzinfrastruktur für sensible Einsatzumgebungen.",
      items: [
        {
          title: "ECM / Counter-RCIED",
          description:
            "Elektronische Gegenmaßnahmen gegen funkgesteuerte Bedrohungen und drahtlose Risiken.",
        },
        {
          title: "Jamming-Systeme",
          description:
            "Tragbare, fahrzeug- und gebäudebasierte Systeme für behördlich autorisierte Einsatzbereiche.",
        },
        {
          title: "TSCM",
          description:
            "Technische Überwachungsgegenmaßnahmen, Beratung und Schulung für spezialisierte Prüfteams.",
        },
        {
          title: "Geschirmte Räume",
          description:
            "Bauliche, mechanische und elektronische Schutzkonzepte für Räume, in denen vertrauliche Informationen verarbeitet werden.",
        },
      ],
    },
    contact: {
      company: "Elaman GmbH",
      officeTitle: "Das Elaman-Büro in München",
      title: "Kontakt",
      intro: "Ihre Anfrage geht direkt an unser Team in München.",
      labels: {
        address: "Adresse",
        phone: "Telefon",
        email: "E-Mail",
      },
      addressLines: ["Implerstraße 24", "81371 München", "Deutschland"],
      footerAddressLines: ["Implerstraße 24", "81371 München, Deutschland"],
      phone: "+49 (0) 89 - 24 20 91 80",
      phoneHref: "+498924209180",
      email: "info@elaman.de",
      emailHref: "mailto:info@elaman.de",
      form: {
        title: "Anfrage senden",
        intro: "Für ein erstes Gespräch genügt eine kurze Einordnung.",
        fields: {
          firstName: "Vorname",
          lastName: "Nachname",
          company: "Unternehmen",
          email: "E-Mail",
          message: "Nachricht",
          website: "Website",
        },
        submit: "Anfrage senden",
        sending: "Wird gesendet…",
        success: "Vielen Dank. Ihre Anfrage wurde gesendet.",
        errors: {
          firstNameRequired: "Bitte geben Sie Ihren Vornamen ein.",
          firstNameMax: "Der Vorname darf maximal 80 Zeichen enthalten.",
          lastNameMax: "Der Nachname darf maximal 80 Zeichen enthalten.",
          companyMax: "Das Unternehmen darf maximal 120 Zeichen enthalten.",
          emailRequired: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
          emailMax: "Die E-Mail-Adresse darf maximal 254 Zeichen enthalten.",
          messageMin: "Die Nachricht muss mindestens 20 Zeichen enthalten.",
          messageMax: "Die Nachricht darf maximal 4000 Zeichen enthalten.",
          payload:
            "Die Anfrage konnte nicht vorbereitet werden. Bitte versuchen Sie es später erneut.",
          rateLimited: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
          sendFailed:
            "Die Nachricht konnte nicht gesendet werden. Bitte nutzen Sie Telefon oder E-Mail direkt.",
          unexpected:
            "Die Nachricht konnte nicht gesendet werden. Bitte nutzen Sie Telefon oder E-Mail direkt.",
        },
      },
    },
  },
} satisfies Record<Locale, LocalizedSiteContent>;

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}
