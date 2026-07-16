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
      title: "Elaman – German Security Solutions",
      description:
        "Elaman GmbH in Munich develops and integrates communications and security technology for observation, counter-surveillance, protection and data forensics.",
      ogLocale: "en_US",
    },
    navigation: {
      main: [
        { label: "Home", href: "#hero" },
        { label: "Profile", href: "#profile" },
        { label: "Advice", href: "#advice" },
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
      stat: {
        value: "20+",
        label: "Years in communications and security engineering",
      },
    },
    profile: {
      label: "Elaman",
      title: "German Security Solutions.",
      paragraphs: [
        "We combine established products and current technologies into integrated systems for demanding communications and security environments.",
        "Each solution is aligned with the project’s infrastructure, operating environment and organisational requirements.",
      ],
      management: {
        label: "Managing Director",
        name: "Holger Rumscheidt",
      },
    },
    advice: {
      title: "From initial analysis to long-term support.",
      intro:
        "Our work begins with a precise understanding of the task and continues beyond commissioning.",
      steps: [
        {
          title: "Analysis & advice",
          description:
            "Technical requirements, infrastructure and the operating environment are assessed together.",
        },
        {
          title: "Planning & integration",
          description:
            "Established products and current technologies are combined into a coordinated system.",
        },
        {
          title: "Turnkey implementation",
          description:
            "Experienced engineers support implementation, commissioning and reliable operation.",
        },
        {
          title: "Training & support",
          description:
            "Professional training and long-term support enable the appropriate use of each solution.",
        },
      ],
    },
    systems: {
      title: "Systems for communications, observation and analysis.",
      intro:
        "The portfolio combines secure communications methods with specialised solutions for public-sector and security-related tasks.",
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
      title: "Elaman – German Security Solutions",
      description:
        "Elaman GmbH in München entwickelt und integriert Kommunikations- und Sicherheitstechnik für Observation, technische Gegenüberwachung, Schutz und Datenforensik.",
      ogLocale: "de_DE",
    },
    navigation: {
      main: [
        { label: "Start", href: "#hero" },
        { label: "Profil", href: "#profile" },
        { label: "Beratung", href: "#advice" },
        { label: "Observation", href: "#systems" },
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
        label: "Jahre Erfahrung in der Kommunikations- und Sicherheitstechnik",
      },
    },
    profile: {
      label: "Elaman",
      title: "Sicherheitstechnik aus Deutschland.",
      paragraphs: [
        "Wir verbinden bewährte Produkte mit aktuellen Technologien und entwickeln daraus integrierte Systeme für anspruchsvolle Kommunikations- und Sicherheitsaufgaben.",
        "Ausgangspunkt sind stets die vorhandene Infrastruktur, das Einsatzumfeld und die organisatorischen Anforderungen des jeweiligen Projekts.",
      ],
      management: {
        label: "Geschäftsführung",
        name: "Holger Rumscheidt",
      },
    },
    advice: {
      title: "Von der Analyse bis zur langfristigen Betreuung.",
      intro:
        "Wir analysieren die Aufgabe sorgfältig und begleiten jedes Projekt über die Inbetriebnahme hinaus.",
      steps: [
        {
          title: "Analyse & Beratung",
          description:
            "Gemeinsam klären wir die technischen Anforderungen, die vorhandene Infrastruktur und das jeweilige Einsatzumfeld.",
        },
        {
          title: "Planung & Integration",
          description:
            "Auf dieser Grundlage wählen wir geeignete Produkte und Technologien aus und führen sie zu einem abgestimmten System zusammen.",
        },
        {
          title: "Schlüsselfertige Umsetzung",
          description:
            "Unsere Ingenieure begleiten die Umsetzung, die Inbetriebnahme und den zuverlässigen Betrieb des Systems.",
        },
        {
          title: "Schulung & Betreuung",
          description:
            "Praxisnahe Schulungen und eine langfristige Betreuung unterstützen den sachgerechten Einsatz im Arbeitsalltag.",
        },
      ],
    },
    systems: {
      title: "Systeme für Kommunikation, Observation und Auswertung.",
      intro:
        "Unser Portfolio umfasst spezialisierte Systeme für Kommunikation, Observation, Führung und Auswertung.",
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
      label: "Schutz und Gegenmaßnahmen",
      title: "Schutz, wo Vertraulichkeit zählt.",
      body: "Elaman plant und integriert technische Gegenmaßnahmen sowie Schutzlösungen für sensible Einsatzbereiche.",
      items: [
        {
          title: "ECM / Counter-RCIED",
          description:
            "Elektronische Gegenmaßnahmen gegen funkgesteuerte Bedrohungen und andere funkbasierte Risiken.",
        },
        {
          title: "Jamming-Systeme",
          description:
            "Mobile, fahrzeuggebundene und stationäre Systeme für behördlich autorisierte Anwendungen.",
        },
        {
          title: "TSCM",
          description:
            "Technische Maßnahmen zur Abwehr unbefugter Überwachung – ergänzt durch Beratung und Schulung für spezialisierte Prüfteams.",
        },
        {
          title: "Geschirmte Räume",
          description:
            "Bauliche, mechanische und elektronische Schutzkonzepte für Räume, in denen vertrauliche Informationen besprochen oder verarbeitet werden.",
        },
      ],
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
        title: "Anfrage senden",
        intro: "Für ein erstes Gespräch genügt eine kurze Beschreibung Ihres Anliegens.",
        fields: {
          firstName: "Vorname",
          lastName: "Nachname",
          company: "Unternehmen",
          email: "E-Mail",
          message: "Nachricht",
          website: "Website",
        },
        submit: "Anfrage senden",
        sending: "Anfrage wird gesendet…",
        success: "Vielen Dank. Ihre Anfrage ist bei uns eingegangen.",
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
            "Ihre Anfrage konnte nicht verarbeitet werden. Bitte versuchen Sie es später erneut.",
          rateLimited:
            "Bitte warten Sie einen Moment, bevor Sie eine weitere Anfrage senden.",
          sendFailed:
            "Ihre Anfrage konnte nicht gesendet werden. Sie erreichen uns auch telefonisch oder per E-Mail.",
          unexpected:
            "Ihre Anfrage konnte nicht gesendet werden. Sie erreichen uns auch telefonisch oder per E-Mail.",
        },
      },
    },
  },
} satisfies Record<Locale, LocalizedSiteContent>;

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}
