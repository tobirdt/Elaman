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
    title: string;
    body: string;
    imageAlt: string;
  };
  management: {
    label: string;
    name: string;
    note: string;
    href: Route;
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

export type DetailPageContent = CompanyDetailContent | SystemsDetailContent;

const detailContent = {
  de: {
    company: {
      kind: "company",
      metadata: {
        title: "Unternehmen – Sicherheitslösungen aus München",
        description:
          "Elaman GmbH in München plant und integriert Sicherheitssysteme für Sicherheitsbehörden und sicherheitsrelevante Organisationen.",
        ogLocale: "de_DE",
      },
      eyebrow: "Unternehmen",
      title: "Sicherheitslösungen aus München.",
      lead: "Elaman ist ein Münchner Unternehmen für Sicherheitstechnik. Für Sicherheitsbehörden und sicherheitsrelevante Organisationen planen wir Systeme, führen Produkte und Komponenten zusammen und bleiben bis in den laufenden Betrieb ansprechbar.",
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
              "Auf dieser Basis wählen wir Produkte und Komponenten aus und legen die Schnittstellen fest. Vorhandene Systeme werden eingebunden, wo immer das sinnvoll ist.",
          },
          {
            title: "Schlüsselfertige Umsetzung",
            description:
              "Aufbau, Integration und Inbetriebnahme liegen in einer Hand. Übergeben wird ein System, das als Ganzes geprüft ist.",
          },
          {
            title: "Schulung & Betreuung",
            description:
              "Wir schulen die Teams am fertigen System. Im laufenden Betrieb bleiben wir technischer Ansprechpartner, bei Fragen ebenso wie bei Erweiterungen.",
          },
        ],
      },
      bridge: {
        title: "Dieselben Ansprechpartner von der Analyse bis zum Betrieb.",
        body: "Wer die Anforderungen aufnimmt, begleitet das Projekt auch bei der Inbetriebnahme. So gehen bei Übergaben keine Informationen verloren und Entscheidungen bleiben nachvollziehbar.",
        imageAlt: "",
      },
      management: {
        label: "Geschäftsführung",
        name: "Holger Rumscheidt",
        note: "Rechtliche Angaben zum Unternehmen finden Sie im Impressum.",
        href: legalPagePath("de", "imprint"),
      },
    },
    systems: {
      kind: "systems",
      metadata: {
        title: "Systeme – Observation, Auswertung, Lauschabwehr",
        description:
          "Elaman liefert Systeme für verdeckte Audio- und Videoobservation, Auswertung, Lauschabwehr und Funkerfassung sowie Schulung und Betreuung.",
        ogLocale: "de_DE",
      },
      eyebrow: "Systeme",
      title: "Systeme für Kommunikation, Observation und Auswertung.",
      lead: "Die folgenden Bereiche zeigen, was Elaman liefert. Wir planen sie einzeln oder stimmen sie als Gesamtsystem aufeinander ab.",
      breadcrumb: "Systeme",
      contact: { label: "Anforderungen besprechen", href: contactPagePath("de") },
      closing:
        "Wenn Sie wissen, was das System leisten soll, haben wir einen Ausgangspunkt.",
      heroAlt: "",
      portfolioLabel: "Leistungsbereiche",
      portfolio: [
        {
          title: "Verdeckte Audio- und Videoobservation",
          description:
            "Systeme zur verdeckten Erfassung und Aufzeichnung von Audio- und Videosignalen.",
        },
        {
          title: "Audio- und Videoauswertesysteme",
          description:
            "Systeme zur Sichtung und Auswertung aufgezeichneter Audio- und Videodaten.",
        },
        {
          title: "Lauschabwehr (TSCM)",
          description:
            "Messtechnik und Prüfmittel, mit denen sich unbefugte Überwachung aufspüren lässt.",
        },
        {
          title: "Funkerfassungssysteme für Mobilfunk in Spezialfahrzeugen",
          description:
            "Die Technik wird in Fahrzeuge integriert, die für das jeweilige Projekt ausgestattet werden.",
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
          "Elaman GmbH in Munich plans and integrates security systems exclusively for security authorities and security-related organisations.",
        ogLocale: "en_GB",
      },
      eyebrow: "Company",
      title: "Security solutions from Munich.",
      lead: "Elaman is a Munich-based security technology company. We plan systems for security authorities and security-related organisations, bring products and components together and remain available through day-to-day operation.",
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
              "On that basis we select products and components and define the interfaces. Existing systems are integrated wherever that makes sense.",
          },
          {
            title: "Turnkey implementation",
            description:
              "Installation, integration and commissioning stay in one hand. What we hand over is a system that has been tested as a whole.",
          },
          {
            title: "Training & support",
            description:
              "We train the teams on the finished system. During operation we remain the technical point of contact, for questions as well as for extensions.",
          },
        ],
      },
      bridge: {
        title: "The same contacts from initial analysis through operation.",
        body: "The people who define the requirements also support commissioning. This prevents information from being lost during handovers and keeps decisions traceable.",
        imageAlt: "",
      },
      management: {
        label: "Managing Director",
        name: "Holger Rumscheidt",
        note: "Legal information about the company is available in the legal notice.",
        href: legalPagePath("en", "imprint"),
      },
    },
    systems: {
      kind: "systems",
      metadata: {
        title: "Systems – surveillance, analysis and TSCM",
        description:
          "Elaman supplies systems for covert audio and video surveillance, analysis, TSCM and radio monitoring for mobile communications, as well as training and support.",
        ogLocale: "en_GB",
      },
      eyebrow: "Systems",
      title: "Systems for communications, observation and analysis.",
      lead: "The following areas show what Elaman supplies. We plan them individually or coordinate them as part of a complete system.",
      breadcrumb: "Systems",
      contact: { label: "Discuss requirements", href: contactPagePath("en") },
      closing: "If you know what the system needs to do, we have a starting point.",
      heroAlt: "",
      portfolioLabel: "Areas of expertise",
      portfolio: [
        {
          title: "Covert audio and video surveillance",
          description:
            "Systems for the covert capture and recording of audio and video signals.",
        },
        {
          title: "Audio and video analysis systems",
          description:
            "Systems for reviewing and analysing recorded audio and video material.",
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
            "The equipment is integrated into vehicles configured for the specific project.",
        },
        {
          title: "Training and support",
          description:
            "Training on the finished system and technical support throughout operation.",
        },
      ],
      approach: {
        label: "Project approach",
        title: "Requirements first, then the technical solution.",
        paragraphs: [
          "Before selecting any technology, we establish what the system must do, which systems and products are already in place, and what spatial and organisational limits apply.",
          "We then select the components, bring them together into a complete system and support commissioning.",
        ],
      },
    },
  },
} satisfies Record<Locale, Record<DetailPageKind, DetailPageContent>>;

export function getDetailPageContent(
  locale: Locale,
  kind: DetailPageKind,
): DetailPageContent {
  return detailContent[locale][kind];
}
