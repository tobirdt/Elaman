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
    stat: { value: string; label: string };
  };
  profile: {
    label: string;
    title: string;
    paragraphs: string[];
    management: {
      label: string;
      name: string;
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
      title: "Elaman – German Security Solutions",
      description:
        "Elaman GmbH in Munich develops and integrates communications and security systems for observation, technical counter-surveillance, protection and data forensics.",
      ogLocale: "en_US",
    },
    navigation: {
      main: [
        { label: "Home", href: "#hero" },
        { label: "Company", href: "#profile" },
        { label: "Consulting", href: "#advice" },
        { label: "Systems", href: "#systems" },
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
      stat: {
        value: "20+",
        label: "Years of experience in communications and security engineering",
      },
    },
    profile: {
      label: "Elaman",
      title: "German Security Solutions.",
      paragraphs: [
        "Elaman combines established products with current technologies to create integrated systems for demanding communications and security tasks.",
        "We align every solution with the existing infrastructure, operating environment and organisational requirements of the project.",
      ],
      management: {
        label: "Managing Director",
        name: "Holger Rumscheidt",
      },
      detailLink: {
        label: "Company profile",
        href: "/en/company",
      },
    },
    advice: {
      title: "From initial analysis to long-term support.",
      intro:
        "Our work begins with a clear understanding of the task and does not end at commissioning.",
      steps: [
        {
          title: "Analysis & consulting",
          description:
            "Together, we define the technical requirements, existing infrastructure and conditions of the operating environment.",
        },
        {
          title: "Planning & integration",
          description:
            "We select suitable products and technologies and integrate them into a coordinated system.",
        },
        {
          title: "Turnkey implementation",
          description:
            "Our engineers deliver the coordinated system and support commissioning.",
        },
        {
          title: "Training & support",
          description:
            "We train the responsible teams and provide long-term technical support during operation.",
        },
      ],
    },
    systems: {
      title: "Systems for communications, observation and analysis.",
      intro:
        "Elaman integrates specialised systems for communications, observation, command and analysis into the relevant operational environment.",
      items: [
        { title: "Audio and video observation" },
        { title: "Geographical information systems" },
        { title: "Technical counter-surveillance" },
        { title: "Special-purpose vehicles" },
        { title: "Command and control centres" },
        { title: "Intelligence fusion systems" },
        { title: "Training & support" },
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
      body: "Elaman plans technical countermeasures and protection concepts for sensitive environments and integrates them into existing infrastructure.",
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
        intro:
          "A brief description of the task is all we need for an initial conversation.",
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
            "We could not send your inquiry just now. Please try again or contact us by phone or email.",
          unexpected:
            "We could not send your inquiry just now. Please try again or contact us by phone or email.",
        },
      },
    },
  },
  de: {
    metadata: {
      title: "Elaman – German Security Solutions",
      description:
        "Elaman GmbH in München entwickelt und integriert Kommunikations- und Sicherheitssysteme für Observation, technische Gegenüberwachung, Schutz und Datenforensik.",
      ogLocale: "de_DE",
    },
    navigation: {
      main: [
        { label: "Start", href: "#hero" },
        { label: "Unternehmen", href: "#profile" },
        { label: "Beratung", href: "#advice" },
        { label: "Systeme", href: "#systems" },
        { label: "Schutz", href: "#protection" },
        { label: "Kontakt", href: "#contact" },
      ],
      legal: [
        { label: "Impressum", href: "/imprint" },
        { label: "Datenschutzerklärung", href: "/private-policy" },
      ],
      menu: "Menü",
      homeLabel: "Zur Elaman-Startseite",
      languageSwitcherLabel: "Sprache",
      skipToContent: "Direkt zum Inhalt",
      mainNavigationLabel: "Hauptnavigation",
      legalNavigationLabel: "Rechtliche Hinweise",
    },
    footer: {
      copyright: "©2026 Elaman GmbH",
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
        "Elaman verbindet bewährte Produkte und aktuelle Technologien zu integrierten Systemen für anspruchsvolle Aufgaben in Kommunikation und Sicherheit.",
        "Wir stimmen jede Lösung auf die vorhandene Infrastruktur, das Einsatzumfeld und die organisatorischen Anforderungen des Projekts ab.",
      ],
      management: {
        label: "Geschäftsführung",
        name: "Holger Rumscheidt",
      },
      detailLink: {
        label: "Zum Unternehmensprofil",
        href: "/de/unternehmen",
      },
    },
    advice: {
      title: "Von der Analyse bis zur langfristigen Betreuung.",
      intro:
        "Jedes Projekt beginnt mit einer sorgfältigen Analyse und endet für uns nicht mit der Inbetriebnahme.",
      steps: [
        {
          title: "Analyse & Beratung",
          description:
            "Gemeinsam klären wir die technischen Anforderungen, die vorhandene Infrastruktur und die Bedingungen im Einsatzumfeld.",
        },
        {
          title: "Planung & Integration",
          description:
            "Wir wählen geeignete Produkte und Technologien aus und integrieren sie zu einem abgestimmten System.",
        },
        {
          title: "Schlüsselfertige Umsetzung",
          description:
            "Unsere Ingenieure realisieren das abgestimmte System und begleiten die Inbetriebnahme.",
        },
        {
          title: "Schulung & Betreuung",
          description:
            "Wir schulen die verantwortlichen Teams und begleiten den technischen Betrieb langfristig.",
        },
      ],
    },
    systems: {
      title: "Systeme für Kommunikation, Observation und Auswertung.",
      intro:
        "Elaman integriert spezialisierte Systeme für Kommunikation, Observation, Führung und Auswertung in das jeweilige Einsatzumfeld.",
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
      detailLink: {
        label: "Systeme im Überblick",
        href: "/de/systeme",
      },
    },
    protection: {
      label: "Schutz und Gegenmaßnahmen",
      title: "Schutz, wo Vertraulichkeit zählt.",
      body: "Elaman plant technische Gegenmaßnahmen und Schutzkonzepte für sensible Einsatzbereiche und integriert sie in die vorhandene Infrastruktur.",
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
        intro: "Eine kurze Beschreibung der Aufgabe genügt für den ersten Austausch.",
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
            "Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch beziehungsweise per E-Mail.",
          unexpected:
            "Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch beziehungsweise per E-Mail.",
        },
      },
    },
  },
} satisfies Record<Locale, LocalizedSiteContent>;

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}
