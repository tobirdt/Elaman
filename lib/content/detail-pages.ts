import type { DetailPageKind, Locale } from "@/lib/i18n";

type DetailMetadata = {
  title: string;
  description: string;
  ogLocale: string;
};

type DetailLink = {
  label: string;
  href: string;
};

type DetailItem = {
  title: string;
  description: string;
};

type DetailBase = {
  kind: DetailPageKind;
  metadata: DetailMetadata;
  eyebrow: string;
  title: string;
  lead: string;
  back: DetailLink;
  contact: DetailLink;
  closing: string;
};

export type CompanyDetailContent = DetailBase & {
  kind: "company";
  heroAlt: string;
  principles: DetailItem[];
  bridge: {
    title: string;
    body: string;
    imageAlt: string;
  };
  management: {
    label: string;
    name: string;
    note: string;
  };
};

export type SystemsDetailContent = DetailBase & {
  kind: "systems";
  heroAlt: string;
  portfolioLabel: string;
  portfolio: DetailItem[];
  approach: {
    label: string;
    title: string;
    paragraphs: string[];
  };
};

export type ProtectionDetailContent = DetailBase & {
  kind: "protection";
  heroAlt: string;
  groups: Array<{
    number: string;
    title: string;
    body: string;
    image: string;
    imageAlt: string;
    items: DetailItem[];
  }>;
};

export type DetailPageContent =
  | CompanyDetailContent
  | SystemsDetailContent
  | ProtectionDetailContent;

const detailContent = {
  de: {
    company: {
      kind: "company",
      metadata: {
        title: "Unternehmen",
        description:
          "Elaman GmbH in München entwickelt und integriert projektspezifische Kommunikations- und Sicherheitstechnik.",
        ogLocale: "de_DE",
      },
      eyebrow: "Unternehmen",
      title: "Technik für Kommunikation und Sicherheit. Aus München.",
      lead: "Elaman verbindet bewährte Produkte und aktuelle Technologien zu Systemen, die auf Aufgabe, Infrastruktur und Einsatzumfeld abgestimmt sind.",
      back: { label: "Zur Übersicht", href: "/de#profile" },
      contact: { label: "Kontakt aufnehmen", href: "/de#contact" },
      closing: "Am Anfang genügt eine kurze Beschreibung der Aufgabe.",
      heroAlt: "Empfangsbereich des Elaman-Büros in München",
      principles: [
        {
          title: "Die Aufgabe präzise erfassen",
          description:
            "Zu Beginn klären wir die technischen Anforderungen, die vorhandene Infrastruktur und das vorgesehene Einsatzumfeld.",
        },
        {
          title: "Komponenten aufeinander abstimmen",
          description:
            "Wir wählen geeignete Produkte und Technologien aus, stimmen sie aufeinander ab und integrieren sie zu einem Gesamtsystem.",
        },
        {
          title: "Den Betrieb langfristig begleiten",
          description:
            "Wir begleiten die Umsetzung und Inbetriebnahme und unterstützen den Betrieb mit Schulung und langfristiger technischer Betreuung.",
        },
      ],
      bridge: {
        title: "Technische Qualität braucht verlässliche Zusammenarbeit.",
        body: "Unsere Ingenieure begleiten ein Projekt von der ersten Analyse bis zum laufenden Betrieb. Zuständigkeiten, Entscheidungen und technische Zusammenhänge bleiben dabei nachvollziehbar.",
        imageAlt:
          "Aus Steinen geformte Brücke als Sinnbild für verlässliche Zusammenarbeit",
      },
      management: {
        label: "Geschäftsführung",
        name: "Holger Rumscheidt",
        note: "Rechtliche Angaben zum Unternehmen finden Sie im Impressum.",
      },
    },
    systems: {
      kind: "systems",
      metadata: {
        title: "Systeme",
        description:
          "Elaman entwickelt und integriert Systeme für Kommunikation, Observation, Führung, technische Gegenüberwachung und Datenforensik.",
        ogLocale: "de_DE",
      },
      eyebrow: "Systeme",
      title: "Systeme für Kommunikation, Observation und Auswertung.",
      lead: "Elaman führt spezialisierte Technik zu Systemen zusammen, die auf Aufgabe, Infrastruktur und Einsatzumfeld abgestimmt sind. Im Mittelpunkt steht das Zusammenspiel aller Komponenten im laufenden Betrieb.",
      back: { label: "Zur Übersicht", href: "/de#systems" },
      contact: { label: "Anforderungen besprechen", href: "/de#contact" },
      closing: "Jedes System beginnt mit einer klar definierten Aufgabe.",
      heroAlt: "Menschen und Bewegungen im öffentlichen Raum aus erhöhter Perspektive",
      portfolioLabel: "Leistungsbereiche",
      portfolio: [
        {
          title: "Audio- und Videoobservation",
          description:
            "Aufeinander abgestimmte Systeme zur Erfassung und strukturierten Weiterverarbeitung von Audio- und Videosignalen.",
        },
        {
          title: "Geoinformationssysteme",
          description:
            "Geoinformationssysteme führen räumliche Informationen zusammen und stellen sie strukturiert für die jeweilige Aufgabe bereit.",
        },
        {
          title: "Technische Gegenüberwachung",
          description:
            "Technische Lösungen und Verfahren zur Erkennung und Abwehr unbefugter Überwachung.",
        },
        {
          title: "Spezialfahrzeuge",
          description:
            "Projektbezogen ausgestattete Fahrzeuge, in denen Technik, Arbeitsplätze und Kommunikation als Einheit geplant werden.",
        },
        {
          title: "Führungszentralen",
          description:
            "Integrierte Arbeitsumgebungen, die Kommunikation, Lageinformationen und technische Systeme zusammenführen.",
        },
        {
          title: "Intelligence-Fusion-Systeme",
          description:
            "Fusion-Systeme führen Informationen aus unterschiedlichen Quellen zusammen und bereiten sie für die weitere Auswertung auf.",
        },
        {
          title: "Schulung und Betreuung",
          description:
            "Praxisnahe Einweisung und langfristige technische Betreuung unterstützen einen fachgerechten Betrieb.",
        },
        {
          title: "Datenforensik",
          description:
            "Systeme und Werkzeuge zur Sicherung, Aufbereitung und Analyse digitaler Daten.",
        },
      ],
      approach: {
        label: "Projektansatz",
        title: "Das System folgt der Aufgabe.",
        paragraphs: [
          "Am Anfang stehen die technischen, organisatorischen und räumlichen Rahmenbedingungen.",
          "Darauf aufbauend wählt Elaman geeignete Komponenten aus, integriert sie zu einem Gesamtsystem und begleitet die Inbetriebnahme.",
        ],
      },
    },
    protection: {
      kind: "protection",
      metadata: {
        title: "Schutzlösungen",
        description:
          "Elaman plant und integriert technische Gegenmaßnahmen, TSCM und Schutzkonzepte für sensible Einsatzbereiche.",
        ogLocale: "de_DE",
      },
      eyebrow: "Schutzlösungen",
      title: "Schutz, wo Vertraulichkeit zählt.",
      lead: "Elaman stimmt technische Gegenmaßnahmen und Schutzkonzepte auf das jeweilige Umfeld, die vorhandene Infrastruktur und den vorgesehenen Einsatz ab.",
      back: { label: "Zur Übersicht", href: "/de#protection" },
      contact: { label: "Schutzprojekt besprechen", href: "/de#contact" },
      closing: "Für eine erste Einschätzung genügt eine kurze Beschreibung der Aufgabe.",
      heroAlt: "Aufmerksamer Blick eines Tigers",
      groups: [
        {
          number: "01",
          title: "Elektronische Gegenmaßnahmen",
          body: "Elaman plant und integriert Systeme zur Begrenzung funkbasierter Risiken ausschließlich für autorisierte Anwendungen.",
          image: "/images/elaman-protection-jammer.jpg",
          imageAlt: "Detailaufnahme eines Reglers für ein technisches Schutzsystem",
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
          ],
        },
        {
          number: "02",
          title: "Gegenüberwachung und geschirmte Bereiche",
          body: "Wo vertrauliche Informationen besprochen oder verarbeitet werden, gehören technische Prüfung und räumlicher Schutz zusammen.",
          image: "/images/elaman-protection-tscm.jpg",
          imageAlt:
            "Kameraobjektiv mit einem Auge als Sinnbild für technische Gegenüberwachung",
          items: [
            {
              title: "TSCM",
              description:
                "Technische Maßnahmen zur Erkennung und Abwehr unbefugter Überwachung sowie Beratung und Schulung spezialisierter Prüfteams.",
            },
            {
              title: "Geschirmte Räume",
              description:
                "Bauliche, mechanische und elektronische Schutzkonzepte für sensible Besprechungs- und Arbeitsbereiche.",
            },
          ],
        },
      ],
    },
  },
  en: {
    company: {
      kind: "company",
      metadata: {
        title: "Company",
        description:
          "Elaman GmbH in Munich develops and integrates communications and security systems tailored to each project.",
        ogLocale: "en_US",
      },
      eyebrow: "Company",
      title: "Engineering for communications and security. From Munich.",
      lead: "Elaman combines established products with current technologies into systems tailored to the task, infrastructure and operating environment.",
      back: { label: "Back to overview", href: "/en#profile" },
      contact: { label: "Discuss a project", href: "/en#contact" },
      closing: "A brief outline is enough to start the conversation.",
      heroAlt: "Reception area at the Elaman office in Munich",
      principles: [
        {
          title: "Define the task precisely",
          description:
            "We begin by clarifying the technical requirements, existing infrastructure and intended operating environment.",
        },
        {
          title: "Coordinate the complete system",
          description:
            "We select suitable products and technologies, coordinate them and integrate them into a coherent system.",
        },
        {
          title: "Support long-term operation",
          description:
            "We support implementation and commissioning, train the responsible teams and provide long-term technical assistance.",
        },
      ],
      bridge: {
        title: "Technical quality depends on reliable collaboration.",
        body: "Our engineers stay with a project from initial analysis through to operation. Responsibilities, decisions and technical dependencies remain clear throughout.",
        imageAlt: "A bridge formed from stones as a symbol of reliable cooperation",
      },
      management: {
        label: "Managing Director",
        name: "Holger Rumscheidt",
        note: "Legal information about the company is available in the imprint.",
      },
    },
    systems: {
      kind: "systems",
      metadata: {
        title: "Systems",
        description:
          "Elaman develops and integrates systems for communications, observation, command environments, technical counter-surveillance and data forensics.",
        ogLocale: "en_US",
      },
      eyebrow: "Systems",
      title: "Systems for communications, observation and analysis.",
      lead: "Elaman integrates specialised technology into systems tailored to the task, infrastructure and operating environment. The focus is on how all components work together in operation.",
      back: { label: "Back to overview", href: "/en#systems" },
      contact: { label: "Discuss requirements", href: "/en#contact" },
      closing: "Every system begins with a clearly defined task.",
      heroAlt: "People and movement in a public space seen from above",
      portfolioLabel: "Areas of expertise",
      portfolio: [
        {
          title: "Audio and video observation",
          description:
            "Integrated systems for capturing and structured processing of audio and video signals.",
        },
        {
          title: "Geographical information systems",
          description:
            "Geographical information systems bring spatial data together and structure it for the task at hand.",
        },
        {
          title: "Technical counter-surveillance",
          description:
            "Technical solutions and procedures for detecting and countering unauthorised surveillance.",
        },
        {
          title: "Special-purpose vehicles",
          description:
            "Project-specific vehicles in which technology, workstations and communications are planned as one system.",
        },
        {
          title: "Command and control centres",
          description:
            "Integrated working environments that bring together communications, situational information and technical systems.",
        },
        {
          title: "Intelligence fusion systems",
          description:
            "Fusion systems bring information from different sources together and prepare it for further analysis.",
        },
        {
          title: "Training and support",
          description:
            "Practical instruction and long-term technical support for day-to-day operation.",
        },
        {
          title: "Data forensics",
          description:
            "Systems and tools for the acquisition, preparation and analysis of digital data.",
        },
      ],
      approach: {
        label: "Project approach",
        title: "The system follows the task.",
        paragraphs: [
          "Technical, organisational and spatial conditions define the starting point.",
          "Elaman then selects suitable components, integrates them into a coordinated system and supports commissioning.",
        ],
      },
    },
    protection: {
      kind: "protection",
      metadata: {
        title: "Protection solutions",
        description:
          "Elaman plans and integrates technical countermeasures, TSCM and protection concepts for sensitive environments.",
        ogLocale: "en_US",
      },
      eyebrow: "Protection solutions",
      title: "Protection where confidentiality matters.",
      lead: "Elaman aligns technical countermeasures and protection concepts with the environment, existing infrastructure and intended application.",
      back: { label: "Back to overview", href: "/en#protection" },
      contact: { label: "Discuss a protection project", href: "/en#contact" },
      closing: "A brief outline of the task is enough for an initial assessment.",
      heroAlt: "The attentive gaze of a tiger",
      groups: [
        {
          number: "01",
          title: "Electronic countermeasures",
          body: "Elaman plans and integrates systems for controlling radio-based risks exclusively for authorised applications.",
          image: "/images/elaman-protection-jammer.jpg",
          imageAlt: "Close-up of a control dial for a technical protection system",
          items: [
            {
              title: "ECM / Counter-RCIED",
              description:
                "Electronic countermeasures addressing radio-controlled threats and other wireless risks.",
            },
            {
              title: "Jamming systems",
              description:
                "Portable, vehicle-based and fixed systems for authorised public-sector applications.",
            },
          ],
        },
        {
          number: "02",
          title: "Counter-surveillance and shielded environments",
          body: "Where confidential information is discussed or processed, technical inspection and spatial protection belong together.",
          image: "/images/elaman-protection-tscm.jpg",
          imageAlt: "Camera lens and eye as a symbol of technical counter-surveillance",
          items: [
            {
              title: "TSCM",
              description:
                "Technical measures for detecting and countering unauthorised surveillance, supported by consulting and training for specialist inspection teams.",
            },
            {
              title: "Shielded rooms",
              description:
                "Structural, mechanical and electronic protection concepts for sensitive meeting and working environments.",
            },
          ],
        },
      ],
    },
  },
} satisfies Record<Locale, Record<DetailPageKind, DetailPageContent>>;

export function getDetailPageContent(
  locale: Locale,
  kind: DetailPageKind,
): DetailPageContent {
  return detailContent[locale][kind];
}
