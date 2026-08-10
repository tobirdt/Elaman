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
      lead: "Elaman verbindet bewährte Produkte mit aktuellen Technologien und entwickelt daraus abgestimmte Systeme für anspruchsvolle Aufgaben.",
      back: { label: "Zur Übersicht", href: "/de#profile" },
      contact: { label: "Kontakt aufnehmen", href: "/de#contact" },
      closing: "Sie möchten eine Aufgabe mit uns einordnen?",
      heroAlt: "Empfangsbereich des Elaman-Büros in München",
      principles: [
        {
          title: "Die Aufgabe verstehen",
          description:
            "Am Anfang stehen die technischen Anforderungen, die vorhandene Infrastruktur und das Umfeld, in dem das System eingesetzt werden soll.",
        },
        {
          title: "Systeme zusammenführen",
          description:
            "Geeignete Produkte und Technologien werden ausgewählt, aufeinander abgestimmt und in eine schlüssige Gesamtlösung integriert.",
        },
        {
          title: "Im Betrieb begleiten",
          description:
            "Elaman begleitet die Umsetzung und Inbetriebnahme ebenso wie die Schulung und die langfristige technische Betreuung.",
        },
      ],
      bridge: {
        title: "Verlässliche Zusammenarbeit ist Teil der Lösung.",
        body: "Unsere Ingenieure begleiten Projekte von der ersten Einordnung bis zum zuverlässigen Betrieb. Dabei bleiben Zuständigkeiten, Entscheidungen und technische Zusammenhänge nachvollziehbar.",
        imageAlt:
          "Aus Steinen geformte Brücke als Sinnbild für verlässliche Zusammenarbeit",
      },
      management: {
        label: "Geschäftsführung",
        name: "Holger Rumscheidt",
        note: "Die rechtlichen Unternehmensangaben finden Sie im Impressum.",
      },
    },
    systems: {
      kind: "systems",
      metadata: {
        title: "Systeme",
        description:
          "Systeme von Elaman für Kommunikation, Observation, Führung, technische Gegenüberwachung und Datenforensik.",
        ogLocale: "de_DE",
      },
      eyebrow: "Systeme",
      title: "Systeme für Kommunikation, Observation und Auswertung.",
      lead: "Das Portfolio verbindet spezialisierte Technik mit einer projektbezogenen Integration. Entscheidend ist nicht das einzelne Produkt, sondern das verlässliche Zusammenspiel im vorgesehenen Umfeld.",
      back: { label: "Zur Übersicht", href: "/de#systems" },
      contact: { label: "Projekt anfragen", href: "/de#contact" },
      closing: "Sprechen wir über die Anforderungen Ihres Projekts.",
      heroAlt: "Menschen und Bewegungen im öffentlichen Raum aus erhöhter Perspektive",
      portfolioLabel: "Leistungsbereiche",
      portfolio: [
        {
          title: "Audio- und Videoobservation",
          description:
            "Abgestimmte Systeme zur Erfassung und sachgerechten Weiterverarbeitung von Audio- und Videosignalen.",
        },
        {
          title: "Geoinformationssysteme",
          description:
            "Räumliche Informationen werden in geeigneten Systemen zusammengeführt und für die jeweilige Aufgabe strukturiert bereitgestellt.",
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
            "Informationen aus unterschiedlichen Quellen werden strukturiert zusammengeführt und für die weitere Auswertung bereitgestellt.",
        },
        {
          title: "Schulung und Betreuung",
          description:
            "Praxisnahe Einweisung und langfristige Unterstützung für einen sachgerechten und verlässlichen Betrieb.",
        },
        {
          title: "Datenforensik",
          description:
            "Systeme und Werkzeuge zur sachgerechten Sicherung, Aufbereitung und Auswertung digitaler Daten.",
        },
      ],
      approach: {
        label: "Projektansatz",
        title: "Projektbezogen statt von der Stange.",
        paragraphs: [
          "Jedes Projekt beginnt mit einer genauen Betrachtung der technischen und organisatorischen Rahmenbedingungen.",
          "Darauf aufbauend führt Elaman geeignete Komponenten zu einem abgestimmten System zusammen und begleitet dessen Inbetriebnahme.",
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
      lead: "Technische Gegenmaßnahmen und Schutzkonzepte werden auf das jeweilige Umfeld, die vorhandene Infrastruktur und den vorgesehenen Einsatz abgestimmt.",
      back: { label: "Zur Übersicht", href: "/de#protection" },
      contact: { label: "Vertrauliche Anfrage stellen", href: "/de#contact" },
      closing: "Für eine erste Einordnung genügt eine kurze Beschreibung.",
      heroAlt: "Aufmerksamer Blick eines Tigers",
      groups: [
        {
          number: "01",
          title: "Elektronische Gegenmaßnahmen",
          body: "Systeme zur kontrollierten Begrenzung funkbasierter Risiken werden ausschließlich für autorisierte Anwendungen geplant und integriert.",
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
          body: "Wo vertrauliche Informationen besprochen oder verarbeitet werden, müssen technische Prüfung und räumlicher Schutz zusammengedacht werden.",
          image: "/images/elaman-protection-tscm.jpg",
          imageAlt:
            "Kameraobjektiv mit einem Auge als Sinnbild für technische Gegenüberwachung",
          items: [
            {
              title: "TSCM",
              description:
                "Technische Maßnahmen zur Abwehr unbefugter Überwachung, ergänzt durch Beratung und Schulung für spezialisierte Prüfteams.",
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
          "Elaman GmbH in Munich develops and integrates project-specific communications and security technology.",
        ogLocale: "en_US",
      },
      eyebrow: "Company",
      title: "Technology for communications and security. From Munich.",
      lead: "Elaman combines established products with current technologies to create coordinated systems for demanding professional tasks.",
      back: { label: "Back to overview", href: "/en#profile" },
      contact: { label: "Contact us", href: "/en#contact" },
      closing: "Would you like to discuss a task with us?",
      heroAlt: "Reception area at the Elaman office in Munich",
      principles: [
        {
          title: "Understand the task",
          description:
            "Every project starts with its technical requirements, existing infrastructure and intended operating environment.",
        },
        {
          title: "Integrate the system",
          description:
            "Suitable products and technologies are selected, coordinated and integrated into a coherent overall solution.",
        },
        {
          title: "Support operations",
          description:
            "Elaman supports implementation and commissioning as well as training and long-term technical assistance.",
        },
      ],
      bridge: {
        title: "Reliable cooperation is part of the solution.",
        body: "Our engineers support projects from the initial assessment through to reliable operation. Responsibilities, decisions and technical relationships remain clear throughout.",
        imageAlt: "A bridge formed from stones as a symbol of reliable cooperation",
      },
      management: {
        label: "Managing Director",
        name: "Holger Rumscheidt",
        note: "Legal company information is available in the imprint.",
      },
    },
    systems: {
      kind: "systems",
      metadata: {
        title: "Systems",
        description:
          "Elaman systems for communications, observation, command environments, technical counter-surveillance and data forensics.",
        ogLocale: "en_US",
      },
      eyebrow: "Systems",
      title: "Systems for communications, observation and analysis.",
      lead: "The portfolio combines specialised technology with project-specific integration. What matters is not the individual product, but reliable interaction within its intended environment.",
      back: { label: "Back to overview", href: "/en#systems" },
      contact: { label: "Discuss a project", href: "/en#contact" },
      closing: "Let us discuss the requirements of your project.",
      heroAlt: "People and movement in a public space seen from above",
      portfolioLabel: "Areas of expertise",
      portfolio: [
        {
          title: "Audio and video observation",
          description:
            "Coordinated systems for capturing and appropriately processing audio and video signals.",
        },
        {
          title: "Geographical information systems",
          description:
            "Spatial information is combined in suitable systems and structured for the task at hand.",
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
            "Information from different sources is structured, combined and made available for further analysis.",
        },
        {
          title: "Training and support",
          description:
            "Practical instruction and long-term support for appropriate and reliable operation.",
        },
        {
          title: "Data forensics",
          description:
            "Systems and tools for the appropriate acquisition, preparation and analysis of digital data.",
        },
      ],
      approach: {
        label: "Project approach",
        title: "Project-specific by design.",
        paragraphs: [
          "Every project begins with a close assessment of its technical and organisational conditions.",
          "Elaman then brings suitable components together into a coordinated system and supports its commissioning.",
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
      lead: "Technical countermeasures and protection concepts are aligned with the environment, existing infrastructure and intended application.",
      back: { label: "Back to overview", href: "/en#protection" },
      contact: { label: "Make a confidential inquiry", href: "/en#contact" },
      closing: "A short outline is enough for an initial assessment.",
      heroAlt: "The attentive gaze of a tiger",
      groups: [
        {
          number: "01",
          title: "Electronic countermeasures",
          body: "Systems for controlling radio-based risks are planned and integrated exclusively for authorised applications.",
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
          body: "Where confidential information is discussed or processed, technical inspection and spatial protection need to be considered together.",
          image: "/images/elaman-protection-tscm.jpg",
          imageAlt: "Camera lens and eye as a symbol of technical counter-surveillance",
          items: [
            {
              title: "TSCM",
              description:
                "Technical measures against unauthorised surveillance, complemented by advice and training for specialist inspection teams.",
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
