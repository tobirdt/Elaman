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

/**
 * Alt-text rule for the heritage photography.
 *
 * An empty string marks the image as decorative, so assistive technology skips
 * it. Use it whenever the picture carries no information the surrounding copy
 * does not already state — which is the case for every atmospheric or
 * metaphorical motif. Rule of thumb: if the alt text would have to explain the
 * metaphor ("… as a symbol of reliable cooperation"), the image is decorative.
 *
 * Only genuinely informative photographs get a factual description: the Munich
 * office and the protection-control detail. The homepage treats all of its
 * images as decorative; keep both sides consistent for the same file.
 */

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
    href: string;
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
        title: "Unternehmen – Technik aus München",
        description:
          "Elaman GmbH in München entwickelt und integriert projektspezifische Kommunikations- und Sicherheitstechnik.",
        ogLocale: "de_DE",
      },
      eyebrow: "Unternehmen",
      title: "Technik für Kommunikation und Sicherheit. Aus München.",
      lead: "Elaman ist ein Münchner Unternehmen für Kommunikations- und Sicherheitstechnik. Wir planen Systeme, führen ihre Komponenten zusammen und bleiben bis in den laufenden Betrieb ansprechbar.",
      back: { label: "Zur Übersicht", href: "/de#profile" },
      contact: { label: "Kontakt aufnehmen", href: "/de#contact" },
      closing:
        "Rufen Sie an oder schreiben Sie uns — auch wenn noch nicht alles feststeht.",
      heroAlt: "Empfangsbereich des Elaman-Büros in München",
      principles: [
        {
          title: "Die Aufgabe präzise erfassen",
          description:
            "Noch bevor über Technik gesprochen wird, klären wir, was das System leisten soll und was am Einsatzort bereits vorhanden ist.",
        },
        {
          title: "Komponenten aufeinander abstimmen",
          description:
            "Wir entscheiden über Produkte und Schnittstellen und führen sie zu einem System zusammen, das als Ganzes funktioniert.",
        },
        {
          title: "Den Betrieb langfristig begleiten",
          description:
            "Nach der Inbetriebnahme bleiben Schulung und technische Betreuung Teil der Zusammenarbeit — über Jahre, nicht über Monate.",
        },
      ],
      bridge: {
        title: "Dieselben Ingenieure von der Analyse bis zum Betrieb.",
        body: "Wer die Anforderungen aufgenommen hat, ist später auch bei der Inbetriebnahme dabei. Das erspart Übergaben, bei denen Wissen verloren geht, und hält Entscheidungen nachvollziehbar.",
        imageAlt: "",
      },
      management: {
        label: "Geschäftsführung",
        name: "Holger Rumscheidt",
        note: "Rechtliche Angaben zum Unternehmen finden Sie im Impressum.",
        href: "/de/impressum",
      },
    },
    systems: {
      kind: "systems",
      metadata: {
        title: "Systeme für Kommunikation und Observation",
        description:
          "Elaman entwickelt und integriert Systeme für Kommunikation, Observation, Führung, technische Abhörabwehr und Datenforensik.",
        ogLocale: "de_DE",
      },
      eyebrow: "Systeme",
      title: "Systeme für Kommunikation, Observation und Auswertung.",
      lead: "Die folgenden acht Bereiche beschreiben, womit Elaman arbeitet. Entscheidend ist, wie sie zusammenwirken: Ein Observationssystem nützt wenig, wenn die Auswertung nicht mithält.",
      back: { label: "Zur Übersicht", href: "/de#systems" },
      contact: { label: "Anforderungen besprechen", href: "/de#contact" },
      closing:
        "Wenn Sie wissen, was das System leisten soll, haben wir einen Ausgangspunkt.",
      heroAlt: "",
      portfolioLabel: "Leistungsbereiche",
      portfolio: [
        {
          title: "Audio- und Videoobservation",
          description:
            "Erfassung von Audio- und Videosignalen samt der Technik, die daraus verwertbares Material macht.",
        },
        {
          title: "Geoinformationssysteme",
          description:
            "Positionen und Bewegungen auf einer gemeinsamen Kartengrundlage — Basis für Lagebilder und Einsatzplanung.",
        },
        {
          title: "Technische Abhörabwehr",
          description:
            "Messtechnik und Prüfmittel, mit denen sich unbefugte Überwachung aufspüren lässt.",
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
            "Zusammenführung von Daten aus getrennten Quellen, damit Zusammenhänge sichtbar werden, die einzeln nicht erkennbar sind.",
        },
        {
          title: "Schulung und Betreuung",
          description:
            "Einweisung am fertigen System und technische Betreuung, solange es im Einsatz ist.",
        },
        {
          title: "Datenforensik",
          description:
            "Systeme und Werkzeuge zur Sicherung, Aufbereitung und Analyse digitaler Daten.",
        },
      ],
      approach: {
        label: "Projektansatz",
        title: "Zuerst die Anforderungen, dann die Technik.",
        paragraphs: [
          "Bevor Technik ausgewählt wird, klären wir, was das System leisten muss, welche Anlagen bereits vorhanden sind und welche räumlichen und organisatorischen Grenzen gelten.",
          "Erst danach entscheiden wir über die Komponenten, führen sie zu einem Gesamtsystem zusammen und begleiten die Inbetriebnahme.",
        ],
      },
    },
    protection: {
      kind: "protection",
      metadata: {
        title: "Schutzlösungen und Gegenmaßnahmen",
        description:
          "Elaman plant und integriert technische Gegenmaßnahmen, TSCM und Schutzkonzepte für sensible Einsatzbereiche.",
        ogLocale: "de_DE",
      },
      eyebrow: "Schutzlösungen",
      title: "Schutz, wo Vertraulichkeit zählt.",
      lead: "Schutz lässt sich nicht von der Stange planen. Was wirkt, hängt vom Raum ab, von seiner Umgebung und davon, wofür das System zugelassen ist.",
      back: { label: "Zur Übersicht", href: "/de#protection" },
      contact: { label: "Schutzprojekt besprechen", href: "/de#contact" },
      closing: "Für eine erste Einschätzung reicht ein Telefonat.",
      heroAlt: "",
      groups: [
        {
          number: "01",
          title: "Elektronische Gegenmaßnahmen",
          body: "Systeme, die funkbasierte Risiken begrenzen — geplant und integriert ausschließlich für behördlich autorisierte Anwendungen.",
          image: "/images/elaman-protection-jammer.jpg",
          imageAlt: "Detailaufnahme eines Reglers für ein technisches Schutzsystem",
          items: [
            {
              title: "ECM / Counter-RCIED",
              description:
                "Wir prüfen, welche Frequenzbereiche im Rahmen der Genehmigung abgedeckt werden dürfen, und legen Aufbau und Steuerung entsprechend aus.",
            },
            {
              title: "Jamming-Systeme",
              description:
                "Ob mobil, im Fahrzeug oder fest installiert, entscheidet sich am Einsatzort. Was baulich und rechtlich möglich ist, klären wir vorab.",
            },
          ],
        },
        {
          number: "02",
          title: "Abhörabwehr und geschirmte Bereiche",
          body: "Wo vertrauliche Informationen besprochen oder verarbeitet werden, gehören technische Prüfung und räumlicher Schutz zusammen.",
          image: "/images/elaman-protection-tscm.jpg",
          imageAlt: "",
          items: [
            {
              title: "TSCM",
              description:
                "Eine Prüfung umfasst Messung, Durchsuchung und die Bewertung der Ergebnisse. Auf Wunsch bilden wir Prüfteams aus, die diese Arbeit später selbst übernehmen.",
            },
            {
              title: "Geschirmte Räume",
              description:
                "Ein geschirmter Raum entsteht aus Bauteilen, Türen, Lüftung und Kabelführung, die gemeinsam dichthalten müssen — nachgewiesen durch Messung nach Fertigstellung.",
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
        title: "Company – engineering from Munich",
        description:
          "Elaman GmbH in Munich develops and integrates communications and security systems tailored to each project.",
        ogLocale: "en_GB",
      },
      eyebrow: "Company",
      title: "Engineering for communications and security. From Munich.",
      lead: "Elaman is a Munich-based specialist in communications and security technology. We plan systems, bring their components together and remain available once they are in day-to-day operation.",
      back: { label: "Back to overview", href: "/en#profile" },
      contact: { label: "Discuss a project", href: "/en#contact" },
      closing: "Call or write to us — even if not everything has been decided yet.",
      heroAlt: "Reception area at the Elaman office in Munich",
      principles: [
        {
          title: "Define the task precisely",
          description:
            "Before any technology comes into play, we establish what the system has to do and what is already in place on site.",
        },
        {
          title: "Coordinate the complete system",
          description:
            "We decide on products and interfaces and bring them together into a system that works as a whole.",
        },
        {
          title: "Support long-term operation",
          description:
            "After commissioning, training and technical support stay part of the arrangement — over years, not months.",
        },
      ],
      bridge: {
        title: "The same engineers from analysis through to operation.",
        body: "Whoever takes down the requirements is still there at commissioning. That avoids handovers where knowledge gets lost, and keeps decisions traceable.",
        imageAlt: "",
      },
      management: {
        label: "Managing Director",
        name: "Holger Rumscheidt",
        note: "Legal information about the company is available in the site notice.",
        href: "/en/site-notice",
      },
    },
    systems: {
      kind: "systems",
      metadata: {
        title: "Systems for communications and observation",
        description:
          "Elaman develops and integrates systems for communications, observation, command environments, technical counter-surveillance and data forensics.",
        ogLocale: "en_GB",
      },
      eyebrow: "Systems",
      title: "Systems for communications, observation and analysis.",
      lead: "The eight areas below describe what Elaman works with. What matters is how they work together: an observation system is of little use if the analysis side cannot keep up.",
      back: { label: "Back to overview", href: "/en#systems" },
      contact: { label: "Discuss requirements", href: "/en#contact" },
      closing: "If you know what the system needs to do, we have a starting point.",
      heroAlt: "",
      portfolioLabel: "Areas of expertise",
      portfolio: [
        {
          title: "Audio and video observation",
          description:
            "Capture of audio and video signals, together with the equipment that turns them into usable material.",
        },
        {
          title: "Geographical information systems",
          description:
            "Positions and movements on a shared cartographic basis — the groundwork for situational awareness and operational planning.",
        },
        {
          title: "Technical counter-surveillance",
          description:
            "Measurement and inspection equipment for locating unauthorised surveillance.",
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
            "Data from separate sources brought together so that connections become visible which no single source reveals on its own.",
        },
        {
          title: "Training and support",
          description:
            "Instruction on the finished system, and technical support for as long as it stays in service.",
        },
        {
          title: "Data forensics",
          description:
            "Systems and tools for the acquisition, preparation and analysis of digital data.",
        },
      ],
      approach: {
        label: "Project approach",
        title: "Requirements first, technology second.",
        paragraphs: [
          "Before any technology is chosen, we establish what the system has to achieve, which installations are already in place, and what spatial and organisational limits apply.",
          "Only then do we decide on components, bring them together into a complete system and support commissioning.",
        ],
      },
    },
    protection: {
      kind: "protection",
      metadata: {
        title: "Protection solutions and countermeasures",
        description:
          "Elaman plans and integrates technical countermeasures, TSCM and protection concepts for sensitive environments.",
        ogLocale: "en_GB",
      },
      eyebrow: "Protection solutions",
      title: "Protection where confidentiality matters.",
      lead: "Protection cannot be planned off the shelf. What works depends on the room, on its surroundings and on what the system is authorised for.",
      back: { label: "Back to overview", href: "/en#protection" },
      contact: { label: "Discuss a protection project", href: "/en#contact" },
      closing: "A phone call is enough for an initial assessment.",
      heroAlt: "",
      groups: [
        {
          number: "01",
          title: "Electronic countermeasures",
          body: "Systems that limit radio-based risks — planned and integrated exclusively for officially authorised applications.",
          image: "/images/elaman-protection-jammer.jpg",
          imageAlt: "Close-up of a control dial for a technical protection system",
          items: [
            {
              title: "ECM / Counter-RCIED",
              description:
                "We establish which frequency ranges may be covered within the scope of the authorisation, and design the setup and control accordingly.",
            },
            {
              title: "Jamming systems",
              description:
                "Whether a system is portable, vehicle-mounted or permanently installed is decided on site. We establish in advance what is possible structurally and legally.",
            },
          ],
        },
        {
          number: "02",
          title: "Counter-surveillance and shielded environments",
          body: "Where confidential information is discussed or processed, technical inspection and spatial protection belong together.",
          image: "/images/elaman-protection-tscm.jpg",
          imageAlt: "",
          items: [
            {
              title: "TSCM",
              description:
                "An inspection covers measurement, physical search and assessment of the findings. On request we train inspection teams to carry out this work themselves.",
            },
            {
              title: "Shielded rooms",
              description:
                "A shielded room comes together from panels, doors, ventilation and cable routing that all have to hold — verified by measurement once the work is finished.",
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
