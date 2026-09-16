import type { Route } from "next";

import {
  contactPagePath,
  legalPagePath,
  type DetailPageKind,
  type Locale,
} from "@/lib/i18n";

type DetailMetadata = {
  title: string;
  description: string;
  ogLocale: string;
};

type DetailLink = {
  label: string;
  href: Route;
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
  /** Short name of the page, shown as the last breadcrumb step. */
  breadcrumb: string;
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
 * Only genuinely informative photographs get a factual description. The Munich
 * office is such an image; the atmospheric homepage photographs remain
 * decorative. Keep both uses of the same file consistent.
 */

export type CompanyDetailContent = DetailBase & {
  kind: "company";
  heroAlt: string;
  process: {
    label: string;
    title: string;
    steps: DetailItem[];
  };
  bridge: {
    label: string;
    title: string;
    body: string;
  };
  management: {
    label: string;
    name: string;
    note: string;
    href: Route;
  };
};

export type SolutionsDetailContent = DetailBase & {
  kind: "solutions";
  heroAlt: string;
  portfolioLabel: string;
  portfolioTitle: string;
  portfolio: DetailItem[];
  approach: {
    label: string;
    title: string;
    paragraphs: string[];
  };
};

export type DetailPageContent = CompanyDetailContent | SolutionsDetailContent;

const detailContent = {
  de: {
    company: {
      kind: "company",
      metadata: {
        title: "Unternehmen – Sicherheitslösungen aus München",
        description:
          "Elaman GmbH in München plant und integriert Kommunikations- und Sicherheitssysteme für Sicherheitsbehörden und sicherheitsrelevante Organisationen.",
        ogLocale: "de_DE",
      },
      eyebrow: "Unternehmen",
      title: "Sicherheitslösungen aus München.",
      lead: "Elaman ist ein Münchner Unternehmen für Kommunikations- und Sicherheitstechnik. Für Sicherheitsbehörden und sicherheitsrelevante Organisationen planen wir Systeme, führen Produkte und Komponenten zusammen und bleiben bis in den laufenden Betrieb ansprechbar.",
      breadcrumb: "Unternehmen",
      contact: { label: "Kontakt aufnehmen", href: contactPagePath("de") },
      closing:
        "Rufen Sie an oder schreiben Sie uns, auch wenn noch nicht alles feststeht.",
      heroAlt: "Empfangsbereich des Elaman-Büros in München",
      process: {
        label: "Vorgehen",
        title: "So arbeiten wir.",
        steps: [
          {
            title: "Analyse & Beratung",
            description:
              "Am Anfang steht die Aufgabe: Was soll das System leisten, wo wird es eingesetzt, was ist bereits vorhanden? Daraus entsteht ein Anforderungsprofil, das die Grundlage für alle weiteren Entscheidungen bildet.",
          },
          {
            title: "Planung & Integration",
            description:
              "Aus dem Anforderungsprofil entsteht ein Systementwurf: welche Komponenten, welche Schnittstellen, welche Reihenfolge. Vorhandene Systeme binden wir ein, wo immer das sinnvoll ist.",
          },
          {
            title: "Schlüsselfertige Umsetzung",
            description:
              "Aufbau, Integration und Inbetriebnahme liegen in einer Hand. Wir übergeben ein System, das als Ganzes geprüft ist.",
          },
          {
            title: "Schulung & Betreuung",
            description:
              "Wir schulen die Teams am fertigen System und bleiben danach technischer Ansprechpartner, bei Fragen ebenso wie bei Erweiterungen. Diese Betreuung läuft über Jahre, nicht über Monate.",
          },
        ],
      },
      bridge: {
        label: "Zusammenarbeit",
        title: "Dieselben Ansprechpartner von der Analyse bis zum Betrieb.",
        body: "Wer die Anforderungen aufnimmt, ist später auch bei der Inbetriebnahme dabei. Das erspart Übergaben, bei denen Wissen verloren geht, und hält Entscheidungen nachvollziehbar.",
      },
      management: {
        label: "Geschäftsführung",
        name: "Holger Rumscheidt",
        note: "Rechtliche Angaben zum Unternehmen finden Sie im Impressum.",
        href: legalPagePath("de", "imprint"),
      },
    },
    solutions: {
      kind: "solutions",
      metadata: {
        title: "Lösungen – Observation, Auswertung, Lauschabwehr",
        description:
          "Elaman liefert Systeme für verdeckte Audio- und Videoobservation, Auswertung, Lauschabwehr und Funkerfassung sowie Schulung und Betreuung.",
        ogLocale: "de_DE",
      },
      eyebrow: "Lösungen",
      title: "Systeme für Kommunikation, Observation und Auswertung.",
      lead: "Die folgenden Bereiche beschreiben, was Elaman liefert. Entscheidend ist, wie sie zusammenwirken: Ein Observationssystem nützt wenig, wenn die Auswertung nicht mithält.",
      breadcrumb: "Lösungen",
      contact: { label: "Anforderungen besprechen", href: contactPagePath("de") },
      closing:
        "Wenn Sie wissen, was das System leisten soll, haben wir einen Ausgangspunkt.",
      heroAlt: "",
      portfolioLabel: "Leistungsbereiche",
      portfolioTitle: "Einzeln oder im Gesamtsystem.",
      portfolio: [
        {
          title: "Verdeckte Audio- und Videoobservation",
          description:
            "Systeme zur verdeckten Erfassung und Aufzeichnung von Audio- und Videosignalen.",
        },
        {
          title: "Audio- und Videoauswertesysteme",
          description:
            "Die Technik, die aus Aufzeichnungen verwertbares Material macht: Sichtung, Aufbereitung und Auswertung von Audio- und Videodaten.",
        },
        {
          title: "Lauschabwehr (TSCM)",
          description:
            "Messtechnik und Prüfmittel, mit denen sich unbefugte Überwachung aufspüren lässt.",
        },
        {
          title: "Funkerfassungssysteme für Mobilfunk in Spezialfahrzeugen",
          description:
            "Projektbezogen ausgestattete Fahrzeuge, in denen Technik, Arbeitsplätze und Kommunikation als Einheit geplant werden.",
        },
        {
          title: "Schulung und Betreuung",
          description:
            "Wir weisen Teams am fertigen System ein und bleiben für den technischen Betrieb erreichbar.",
        },
      ],
      approach: {
        label: "Projektansatz",
        title: "Zuerst die Anforderungen, dann die technische Lösung.",
        paragraphs: [
          "Bevor wir Technik auswählen, klären wir, was das System leisten muss, welche Systeme und Produkte bereits vorhanden sind und welche räumlichen und organisatorischen Grenzen gelten.",
          "Danach wählen wir die Komponenten aus, führen sie zu einem Gesamtsystem zusammen und begleiten die Inbetriebnahme.",
        ],
      },
    },
  },
  en: {
    company: {
      kind: "company",
      metadata: {
        title: "Company – security solutions from Munich",
        description:
          "Elaman GmbH in Munich plans and integrates communications and security systems exclusively for security authorities and security-related organisations.",
        ogLocale: "en_GB",
      },
      eyebrow: "Company",
      title: "Security solutions from Munich.",
      lead: "Elaman is a Munich-based communications and security technology company. We plan systems for security authorities and security-related organisations, bring products and components together and remain available through day-to-day operation.",
      breadcrumb: "Company",
      contact: { label: "Discuss a project", href: contactPagePath("en") },
      closing: "Call or email us, even if not every detail has been decided.",
      heroAlt: "Reception area at the Elaman office in Munich",
      process: {
        label: "Approach",
        title: "How we work.",
        steps: [
          {
            title: "Analysis & consulting",
            description:
              "Everything starts with the task: what the system must do, where it will be used and what is already in place. The result is a requirements profile that guides every later decision.",
          },
          {
            title: "Planning & integration",
            description:
              "The requirements profile becomes a system design: which components, which interfaces, in which order. We integrate existing systems wherever that makes sense.",
          },
          {
            title: "Turnkey implementation",
            description:
              "Installation, integration and commissioning stay in one hand. We hand over a system that has been tested as a whole.",
          },
          {
            title: "Training & support",
            description:
              "We train the teams on the finished system and remain the technical point of contact afterwards, for questions as well as for extensions. That support runs over years, not months.",
          },
        ],
      },
      bridge: {
        label: "Working together",
        title: "The same contacts from initial analysis through operation.",
        body: "Whoever takes down the requirements is still there at commissioning. That spares the handovers where knowledge gets lost, and keeps decisions traceable.",
      },
      management: {
        label: "Managing Director",
        name: "Holger Rumscheidt",
        note: "Legal information about the company is available in the legal notice.",
        href: legalPagePath("en", "imprint"),
      },
    },
    solutions: {
      kind: "solutions",
      metadata: {
        title: "Solutions – surveillance, analysis and TSCM",
        description:
          "Elaman supplies systems for covert audio and video surveillance, analysis, TSCM and radio monitoring for mobile communications, as well as training and support.",
        ogLocale: "en_GB",
      },
      eyebrow: "Solutions",
      title: "Systems for communications, observation and analysis.",
      lead: "The areas below describe what Elaman supplies. What matters is how they work together: an observation system is of little use if the analysis cannot keep up.",
      breadcrumb: "Solutions",
      contact: { label: "Discuss requirements", href: contactPagePath("en") },
      closing: "If you know what the system needs to do, we have a starting point.",
      heroAlt: "",
      portfolioLabel: "Areas of expertise",
      portfolioTitle: "Individually or as one system.",
      portfolio: [
        {
          title: "Covert audio and video surveillance",
          description:
            "Systems for the covert capture and recording of audio and video signals.",
        },
        {
          title: "Audio and video analysis systems",
          description:
            "The equipment that turns recordings into usable material: reviewing, processing and analysing audio and video data.",
        },
        {
          title: "Technical surveillance countermeasures (TSCM)",
          description:
            "Measurement and inspection equipment for locating unauthorised surveillance.",
        },
        {
          title:
            "Radio monitoring systems for mobile communications in special-purpose vehicles",
          description:
            "Vehicles fitted out for the specific project, in which technology, workstations and communications are planned as one unit.",
        },
        {
          title: "Training and support",
          description:
            "Training on the finished system and technical support throughout operation.",
        },
      ],
      approach: {
        label: "Project approach",
        title: "Requirements first, technology second.",
        paragraphs: [
          "Before selecting any technology, we establish what the system must do, which systems and products are already in place, and what spatial and organisational limits apply.",
          "We then select the components, bring them together into a complete system and support commissioning.",
        ],
      },
    },
  },
} satisfies Record<Locale, Record<DetailPageKind, DetailPageContent>>;

type DetailContentByKind = {
  company: CompanyDetailContent;
  solutions: SolutionsDetailContent;
};

/**
 * Generic in the kind, so a caller that asks for the company dossier gets the
 * company type rather than the union and does not have to narrow it again.
 */
export function getDetailPageContent<Kind extends DetailPageKind>(
  locale: Locale,
  kind: Kind,
): DetailContentByKind[Kind] {
  return detailContent[locale][kind] as DetailContentByKind[Kind];
}
