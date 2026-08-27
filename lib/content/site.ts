import type { Locale } from "@/lib/i18n";

type NavigationItem = {
  label: string;
  href: string;
};

type PrimaryNavigationItem = NavigationItem & {
  section: `#${string}`;
  mobileOnly?: boolean;
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
    copyright: string;
  };
  notFound: {
    label: string;
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
    management: {
      label: string;
      name: string;
      href: string;
    };
    detailLink: NavigationItem;
  };
  advice: {
    title: string;
    intro: string;
    steps: ContentItem[];
  };
  systems: {
    title: string;
    intro: string;
    items: Array<{ title: string }>;
    detailLink: NavigationItem;
  };
  protection: {
    label: string;
    title: string;
    body: string;
    items: ContentItem[];
    detailLink: NavigationItem;
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
      title: "Elaman – German Security Solutions, Munich",
      description:
        "Elaman GmbH in Munich develops and integrates communications and security systems for observation, technical counter-surveillance, protection and data forensics.",
      ogLocale: "en_GB",
    },
    navigation: {
      main: [
        { label: "Home", href: "#hero", section: "#hero", mobileOnly: true },
        { label: "Company", href: "/en/company", section: "#profile" },
        { label: "Systems", href: "/en/systems", section: "#systems" },
        { label: "Protection", href: "/en/protection", section: "#protection" },
        { label: "Approach", href: "#advice", section: "#advice" },
        { label: "Contact", href: "#contact", section: "#contact" },
      ],
      legal: [
        { label: "Site notice", href: "/en/site-notice" },
        { label: "Privacy policy", href: "/en/privacy-policy" },
      ],
      menu: "Menu",
      homeLabel: "Elaman home",
      languageSwitcherLabel: "Language",
      skipToContent: "Skip to content",
      mainNavigationLabel: "Main navigation",
      legalNavigationLabel: "Legal navigation",
    },
    footer: {
      copyright: "© 2026 Elaman GmbH",
    },
    notFound: {
      label: "404",
      title: "Page not found.",
      body: "This address does not exist on our website — the link may have changed. The homepage will take you to every section and to our contact details.",
      cta: "Go to the Elaman homepage",
    },
    hero: {
      label: "Elaman",
      title: "Your bridge to trust and security.",
      stat: {
        value: "20+",
        label: "Years of experience in communications and security engineering",
      },
    },
    profile: {
      label: "Elaman",
      title: "German Security Solutions.",
      paragraphs: [
        "Elaman brings established products together with new technologies to build systems for communications and security.",
        "What a system finally looks like is decided by its setting: the infrastructure already in place, the organisational requirements, the conditions on site.",
        "Our clients are public authorities, security-related organisations and communication service providers.",
      ],
      management: {
        label: "Managing Director",
        name: "Holger Rumscheidt",
        href: "/en/site-notice",
      },
      detailLink: {
        label: "Company profile",
        href: "/en/company",
      },
    },
    advice: {
      title: "From initial analysis to long-term support.",
      intro: "For us, a project does not end at commissioning.",
      steps: [
        {
          title: "Analysis & consulting",
          description:
            "We establish what the system has to achieve and the conditions it will work under.",
        },
        {
          title: "Planning & integration",
          description:
            "The requirements become a system design: which components, which interfaces, in which order.",
        },
        {
          title: "Turnkey implementation",
          description:
            "Assembly, integration and commissioning are handled by our own engineers.",
        },
        {
          title: "Training & support",
          description:
            "The teams are trained on the system; after that we remain available for technical operation.",
        },
      ],
    },
    systems: {
      title: "Systems for communications, observation and analysis.",
      intro:
        "Eight areas that Elaman supplies individually or brings together into a complete system.",
      items: [
        { title: "Audio and video observation" },
        { title: "Geographical information systems" },
        { title: "Technical counter-surveillance" },
        { title: "Special-purpose vehicles" },
        { title: "Command and control centres" },
        { title: "Intelligence fusion systems" },
        { title: "Training and support" },
        { title: "Data forensics" },
      ],
      detailLink: {
        label: "Systems overview",
        href: "/en/systems",
      },
    },
    protection: {
      label: "Protection & Countermeasures",
      title: "Protection where confidentiality matters.",
      body: "Technical countermeasures and physical shielding for places where conversations could be intercepted — planned for the specific room and the infrastructure already in place.",
      items: [
        {
          title: "ECM / Counter-RCIED",
          description:
            "Electronic countermeasures for radio-controlled threats and other wireless risks.",
        },
        {
          title: "Jamming systems",
          description:
            "Portable, vehicle-based and building-based systems for authorised public-sector use.",
        },
        {
          title: "TSCM",
          description:
            "Technical measures against unauthorised surveillance, supported by consulting and training for specialist inspection teams.",
        },
        {
          title: "Shielded rooms",
          description:
            "Structural, mechanical and electronic concepts for rooms where confidential information is handled.",
        },
      ],
      detailLink: {
        label: "View protection solutions",
        href: "/en/protection",
      },
    },
    contact: {
      company: "Elaman GmbH",
      officeTitle: "Elaman in Munich",
      title: "Contact",
      intro: "Your inquiry goes directly to our Munich team.",
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
        title: "Your inquiry",
        intro: "A few sentences about the task are enough to start.",
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
            "Your inquiry could not be sent. Please try again — or call us and we will take the details directly.",
          unexpected:
            "Something went wrong while processing your inquiry. Please try again, or contact us by phone or email.",
        },
      },
    },
  },
  de: {
    metadata: {
      title: "Elaman – Kommunikations- und Sicherheitstechnik, München",
      description:
        "Elaman GmbH in München entwickelt und integriert Kommunikations- und Sicherheitssysteme für Observation, technische Abhörabwehr, Schutz und Datenforensik.",
      ogLocale: "de_DE",
    },
    navigation: {
      main: [
        { label: "Start", href: "#hero", section: "#hero", mobileOnly: true },
        { label: "Unternehmen", href: "/de/unternehmen", section: "#profile" },
        { label: "Systeme", href: "/de/systeme", section: "#systems" },
        {
          label: "Schutzlösungen",
          href: "/de/schutzloesungen",
          section: "#protection",
        },
        { label: "Vorgehen", href: "#advice", section: "#advice" },
        { label: "Kontakt", href: "#contact", section: "#contact" },
      ],
      legal: [
        { label: "Impressum", href: "/de/impressum" },
        { label: "Datenschutzerklärung", href: "/de/datenschutz" },
      ],
      menu: "Menü",
      homeLabel: "Zur Elaman-Startseite",
      languageSwitcherLabel: "Sprache",
      skipToContent: "Direkt zum Inhalt",
      mainNavigationLabel: "Hauptnavigation",
      legalNavigationLabel: "Rechtliche Hinweise",
    },
    footer: {
      copyright: "© 2026 Elaman GmbH",
    },
    notFound: {
      label: "404",
      title: "Seite nicht gefunden.",
      body: "Diese Adresse gibt es auf unserer Website nicht — womöglich hat sich der Link geändert. Über die Startseite erreichen Sie alle Bereiche und den direkten Kontakt.",
      cta: "Zur Elaman-Startseite",
    },
    hero: {
      label: "Elaman",
      title: "Ihre Brücke zu Vertrauen und Sicherheit.",
      stat: {
        value: "20+",
        label: "Jahre Erfahrung mit Kommunikations- und Sicherheitstechnik",
      },
    },
    profile: {
      label: "Elaman",
      title: "Kommunikations- und Sicherheitstechnik aus Deutschland.",
      paragraphs: [
        "Elaman verbindet etablierte Produkte mit neuen Technologien zu Systemen für Kommunikation und Sicherheit.",
        "Wie ein System am Ende aussieht, entscheidet das Einsatzumfeld: die vorhandene Infrastruktur, die organisatorischen Vorgaben, die Bedingungen vor Ort.",
        "Zu unseren Kunden zählen Behörden, sicherheitsrelevante Organisationen und Kommunikationsanbieter.",
      ],
      management: {
        label: "Geschäftsführung",
        name: "Holger Rumscheidt",
        href: "/de/impressum",
      },
      detailLink: {
        label: "Zum Unternehmensprofil",
        href: "/de/unternehmen",
      },
    },
    advice: {
      title: "Von der Analyse bis zur langfristigen Betreuung.",
      intro: "Ein Projekt endet für uns nicht mit der Inbetriebnahme.",
      steps: [
        {
          title: "Analyse & Beratung",
          description:
            "Wir nehmen auf, was das System leisten muss und unter welchen Bedingungen es arbeiten wird.",
        },
        {
          title: "Planung & Integration",
          description:
            "Aus dem Anforderungsprofil entsteht ein Systementwurf: welche Komponenten, welche Schnittstellen, welche Reihenfolge.",
        },
        {
          title: "Schlüsselfertige Umsetzung",
          description:
            "Aufbau, Integration und Inbetriebnahme übernehmen unsere eigenen Ingenieure.",
        },
        {
          title: "Schulung & Betreuung",
          description:
            "Die Teams werden am System geschult; danach bleiben wir für den technischen Betrieb erreichbar.",
        },
      ],
    },
    systems: {
      title: "Systeme für Kommunikation, Observation und Auswertung.",
      intro:
        "Acht Bereiche, die Elaman einzeln liefert oder zu einem Gesamtsystem zusammenführt.",
      items: [
        { title: "Audio- und Videoobservation" },
        { title: "Geoinformationssysteme" },
        { title: "Technische Abhörabwehr" },
        { title: "Spezialfahrzeuge" },
        { title: "Führungszentralen" },
        { title: "Intelligence-Fusion-Systeme" },
        { title: "Schulung und Betreuung" },
        { title: "Datenforensik" },
      ],
      detailLink: {
        label: "Systeme im Überblick",
        href: "/de/systeme",
      },
    },
    protection: {
      label: "Schutz und Gegenmaßnahmen",
      title: "Schutz, wo Vertraulichkeit zählt.",
      body: "Technische Gegenmaßnahmen und baulicher Schutz für Bereiche, in denen mitgehört werden könnte — geplant für den jeweiligen Raum und die vorhandene Infrastruktur.",
      items: [
        {
          title: "ECM / Counter-RCIED",
          description:
            "Elektronische Gegenmaßnahmen zum Schutz vor funkgesteuerten Bedrohungen und weiteren funkbasierten Risiken.",
        },
        {
          title: "Jamming-Systeme",
          description:
            "Mobile, fahrzeuggebundene und stationäre Systeme für behördlich autorisierte Anwendungen.",
        },
        {
          title: "TSCM",
          description:
            "Technische Maßnahmen zur Abwehr unbefugter Überwachung sowie Beratung und Schulung spezialisierter Prüfteams.",
        },
        {
          title: "Geschirmte Räume",
          description:
            "Bauliche, mechanische und elektronische Schutzkonzepte für Räume, in denen vertrauliche Informationen besprochen oder verarbeitet werden.",
        },
      ],
      detailLink: {
        label: "Schutzlösungen im Überblick",
        href: "/de/schutzloesungen",
      },
    },
    contact: {
      company: "Elaman GmbH",
      officeTitle: "Elaman in München",
      title: "Kontakt",
      intro: "Ihre Anfrage erreicht direkt unser Team in München.",
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
        title: "Ihr Anliegen",
        intro: "Ein paar Sätze zur Aufgabe genügen für den ersten Austausch.",
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
            "Ihre Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut — oder rufen Sie uns an, dann klären wir es direkt.",
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
