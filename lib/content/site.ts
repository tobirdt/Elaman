import type { Locale } from "@/lib/i18n";
import type { ContentCard, DeliveryStep, NavigationItem, StoryStep } from "@/types/site";

type ContactFormContent = {
  label: string;
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
  helper: string;
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
  locale: Locale;
  languageName: string;
  metadata: {
    title: string;
    description: string;
    ogLocale: string;
  };
  navigation: {
    main: NavigationItem[];
    legal: NavigationItem[];
    cta: string;
    menu: string;
    homeLabel: string;
    languageSwitcherLabel: string;
    skipToContent: string;
    mainNavigationLabel: string;
    legalNavigationLabel: string;
  };
  footer: {
    legalNotice: string;
    privacy: string;
    copyright: string;
  };
  hero: {
    label: string;
    title: string;
    mobileIntro: string;
    intro: string;
    mobileBody: string;
    body: string;
    primaryCta: NavigationItem;
    secondaryCta: NavigationItem;
    visualLabel: string;
    visualBody: string;
    visualBadge: string;
    visualSteps: string[];
    stats: Array<{ value: string; label: string }>;
  };
  trust: {
    label: string;
    title: string;
    body: string;
    metrics: Array<{ value: string; label: string }>;
    pillars: string[];
  };
  story: {
    label: string;
    title: string;
    mobileTitle: string;
    body: string;
    mobileBody: string;
    progressLabel: string;
    activeLayerLabel: string;
    systemFocusLabel: string;
    detailsLabel: string;
    steps: StoryStep[];
  };
  capabilities: {
    label: string;
    title: string;
    body: string;
    items: ContentCard[];
  };
  systems: {
    label: string;
    title: string;
    body: string;
    items: ContentCard[];
  };
  protection: {
    label: string;
    title: string;
    body: string;
    items: ContentCard[];
  };
  delivery: {
    label: string;
    title: string;
    body: string;
    steps: DeliveryStep[];
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
      fax: string;
    };
    addressLines: string[];
    footerAddressLines: string[];
    phone: string;
    phoneHref: string;
    fax: string;
    email: string;
    emailHref: string;
    form: ContactFormContent;
  };
};

export const siteContent = {
  en: {
    locale: "en",
    languageName: "English",
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
      cta: "Contact",
      menu: "Menu",
      homeLabel: "Elaman home",
      languageSwitcherLabel: "Language",
      skipToContent: "Skip to content",
      mainNavigationLabel: "Main navigation",
      legalNavigationLabel: "Legal navigation",
    },
    footer: {
      legalNotice: "Imprint",
      privacy: "Privacy Policy",
      copyright: "©2026 Elaman GmbH",
    },
    hero: {
      label: "Elaman",
      title: "Your bridge to trust and security.",
      mobileIntro:
        "German security solutions for public authorities, security-sector clients, and communication service providers.",
      intro:
        "Elaman develops and integrates communications and security technology for public authorities and security organisations.",
      mobileBody:
        "Communications and security engineering, advice, implementation, training, and support for demanding public-sector environments.",
      body: "Our services range from technical advice and system integration through turnkey implementation to professional training and long-term support.",
      primaryCta: { label: "Contact", href: "#contact" },
      secondaryCta: { label: "View services", href: "#capabilities" },
      visualLabel: "Integrated security systems",
      visualBody:
        "Communications, surveillance, protection, and support as connected capability layers.",
      visualBadge: "Munich / DE",
      visualSteps: ["Advise", "Implement", "Support"],
      stats: [
        {
          value: "20+",
          label: "Years in communications and security engineering",
        },
        { value: "Turnkey", label: "Project implementation and system integration" },
        { value: "Training", label: "Professional training and after-sales service" },
      ],
    },
    trust: {
      label: "Experience",
      title: "Experience for work that carries responsibility.",
      body: "Our work begins with a precise understanding of the task and continues beyond commissioning.",
      metrics: [
        {
          value: "20+",
          label: "Years of communications and security engineering",
        },
        {
          value: "Full service",
          label: "Advice, implementation, training and technical support",
        },
      ],
      pillars: [
        "Governmental authorities",
        "Public authorities",
        "Law-enforcement-related organisations",
        "Communication service providers",
      ],
    },
    story: {
      label: "Approach",
      title: "From the first requirement to reliable operation.",
      mobileTitle: "How Elaman works",
      body: "How Elaman connects experience, advice, surveillance and communications, protection, turnkey implementation, training, and after-sales service.",
      mobileBody:
        "One team connects advice, system design, protection, implementation and support.",
      progressLabel: "Progress",
      activeLayerLabel: "Current step",
      systemFocusLabel: "Key points",
      detailsLabel: "Key points",
      steps: [
        {
          id: "experience",
          eyebrow: "01 / Experience",
          title: "More than 20 years in communications and security engineering.",
          mobileTitle: "20+ years of experience.",
          description:
            "Elaman's work is grounded in long-standing experience and extensive knowledge of government security and safety requirements for public authorities.",
          mobileSummary:
            "Long-standing experience in communications and security engineering for public authority contexts.",
          bullets: [
            "Government security requirements",
            "Public authority contexts",
            "Communications and security engineering",
          ],
        },
        {
          id: "advice",
          eyebrow: "02 / Advice",
          title: "Requirements are translated into a coherent technical approach.",
          mobileTitle: "Understand the requirement",
          description:
            "Advice covers analysis, consulting, and solution design, aligning mission context, existing infrastructure, and procurement constraints with appropriate technical options.",
          mobileSummary:
            "We clarify the operational context, existing infrastructure and technical constraints before proposing a solution.",
          bullets: ["Analysis", "Consulting", "Solution design"],
        },
        {
          id: "surveillance-communications",
          eyebrow: "03 / Surveillance & communications",
          title: "Communications and surveillance systems form the operational layer.",
          mobileTitle: "Design the system",
          description:
            "Network-based, private, wireless, cellular, and satellite communications are integrated with surveillance-related capabilities as part of a broader security solution.",
          mobileSummary:
            "Communications and authorised observation capabilities are planned as one coherent system.",
          bullets: [
            "Network / IP",
            "Private networks",
            "Wireless / cellular",
            "Satellite",
          ],
        },
        {
          id: "protection",
          eyebrow: "04 / Protection",
          title: "Protection measures for personnel, data, and restricted spaces.",
          mobileTitle: "Protect what matters",
          description:
            "Protection-related services include countermeasure systems and protective infrastructure for environments where confidentiality and operational safety are essential.",
          mobileSummary:
            "Countermeasures and protective infrastructure are matched to the people, data and spaces involved.",
          bullets: ["ECM", "Counter-RCIED", "TSCM", "Shielded rooms"],
        },
        {
          id: "implementation",
          eyebrow: "05 / Implementation",
          title: "Projects delivered on a turnkey basis.",
          mobileTitle: "Turnkey implementation.",
          description:
            "Elaman implements projects using state-of-the-art technology, with attention to system integration, reliability, and operational fit.",
          mobileSummary:
            "System integration, turnkey delivery, and operational readiness guide implementation.",
          bullets: ["System integration", "Turnkey delivery", "Operational readiness"],
        },
        {
          id: "training-support",
          eyebrow: "06 / Training & support",
          title: "Training and after-sales service sustain long-term usability.",
          mobileTitle: "Stay operational",
          description:
            "Professional training and high-quality after-sales service help client teams operate, maintain, and continue to rely on implemented systems.",
          mobileSummary:
            "Training and technical support help client teams use and maintain the delivered systems with confidence.",
          bullets: ["In-depth training", "Technical service", "After-sales support"],
        },
      ],
    },
    capabilities: {
      label: "Services",
      title: "Elaman — German Security Solutions.",
      body: "We combine established products and current technologies into integrated systems for demanding communications and security environments.",
      items: [
        {
          eyebrow: "01",
          title: "Advice",
          description:
            "Technical analysis and practical recommendations shaped by the operational context and public-sector requirements.",
        },
        {
          eyebrow: "02",
          title: "Surveillance",
          description:
            "Secure communications and observation systems for authorised use across network, radio, cellular and satellite environments.",
        },
        {
          eyebrow: "03",
          title: "Protection",
          description:
            "Countermeasures and protective infrastructure for personnel, facilities and confidential environments.",
        },
        {
          eyebrow: "04",
          title: "Training & Support",
          description:
            "Clear handover, practical training and technical support throughout the system lifecycle.",
        },
      ],
    },
    systems: {
      label: "Solutions",
      title: "Systems that work together.",
      body: "Each solution is aligned with the project’s infrastructure, operating environment and organisational requirements.",
      items: [
        {
          title: "Secure communications",
          description:
            "Network-based, private, wireless, cellular, and satellite communications for demanding security environments.",
        },
        {
          title: "Audio and video observation",
          description:
            "Technical observation equipment and supporting infrastructure for authorised surveillance applications.",
        },
        {
          title: "Geographical information systems",
          description:
            "GIS-related systems supporting situational awareness and operational planning.",
        },
        {
          title: "Technical counter-surveillance",
          description:
            "Counter-surveillance equipment and sweep-team support for sensitive environments.",
        },
        {
          title: "Special-purpose vehicles",
          description:
            "Vehicle-based concepts for specialised operational and communications requirements.",
        },
        {
          title: "Command and control centres",
          description:
            "Mobile and fixed command environments for coordinated operations.",
        },
        {
          title: "Intelligence fusion systems",
          description:
            "Systems that consolidate operational inputs for authorised analysis workflows.",
        },
        {
          title: "Data forensics",
          description:
            "Forensics-related technical capabilities for authorised investigative contexts.",
        },
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
    delivery: {
      label: "Methodology",
      title: "Clear responsibility from briefing to support.",
      body: "A transparent process keeps technical decisions, implementation and handover connected.",
      steps: [
        {
          step: "01",
          title: "Analyse",
          description: "Clarify the task, infrastructure and constraints.",
        },
        {
          step: "02",
          title: "Design",
          description: "Turn requirements into a workable system concept.",
        },
        {
          step: "03",
          title: "Integrate",
          description: "Integrate the components and prepare the system for use.",
        },
        {
          step: "04",
          title: "Train",
          description: "Give client teams the knowledge they need.",
        },
        {
          step: "05",
          title: "Support",
          description: "Remain available for service and technical support.",
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
        fax: "Fax",
      },
      addressLines: ["Implerstraße 24", "81371 Munich", "Germany"],
      footerAddressLines: ["Implerstraße 24", "81371 Munich, Germany"],
      phone: "+49 (0) 89 - 24 20 91 80",
      phoneHref: "+498924209180",
      fax: "+49 (0) 89 - 24 20 91 81",
      email: "info@elaman.de",
      emailHref: "mailto:info@elaman.de",
      form: {
        label: "Inquiry",
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
        helper: "Your inquiry is validated before email delivery.",
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
    locale: "de",
    languageName: "Deutsch",
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
      cta: "Kontakt",
      menu: "Menü",
      homeLabel: "Elaman Startseite",
      languageSwitcherLabel: "Sprache",
      skipToContent: "Zum Inhalt springen",
      mainNavigationLabel: "Hauptnavigation",
      legalNavigationLabel: "Rechtliche Navigation",
    },
    footer: {
      legalNotice: "Impressum",
      privacy: "Datenschutzerklärung",
      copyright: "©2026 Elaman GmbH",
    },
    hero: {
      label: "Elaman",
      title: "Ihre Brücke zu Vertrauen und Sicherheit.",
      mobileIntro:
        "Deutsche Sicherheitslösungen für Behörden, Sicherheitskunden und Kommunikationsanbieter.",
      intro:
        "Elaman entwickelt und integriert Kommunikations- und Sicherheitstechnik für Behörden und Sicherheitsorganisationen.",
      mobileBody:
        "Kommunikations- und Sicherheitstechnik, Beratung, Implementierung, Schulung und Betreuung für anspruchsvolle Behördenumfelder.",
      body: "Das Leistungsspektrum reicht von technischer Beratung und Systemintegration über die schlüsselfertige Umsetzung bis zu Schulung und langfristiger Betreuung.",
      primaryCta: { label: "Kontakt", href: "#contact" },
      secondaryCta: { label: "Leistungen ansehen", href: "#capabilities" },
      visualLabel: "Integrierte Sicherheitssysteme",
      visualBody:
        "Kommunikation, Observation, Schutz und Betreuung als verbundene Leistungsebenen.",
      visualBadge: "München / DE",
      visualSteps: ["Beraten", "Umsetzen", "Betreuen"],
      stats: [
        {
          value: "20+",
          label: "Jahre in Kommunikations- und Sicherheitstechnik",
        },
        {
          value: "Schlüsselfertig",
          label: "Projektumsetzung und Systemintegration",
        },
        { value: "Schulung", label: "Schulungen und After-Sales-Service" },
      ],
    },
    trust: {
      label: "Erfahrung",
      title: "Erfahrung für Aufgaben mit Verantwortung.",
      body: "Unsere Arbeit beginnt mit einer genauen Analyse der Aufgabe und endet nicht mit der Inbetriebnahme.",
      metrics: [
        {
          value: "20+",
          label: "Jahre Kommunikations- und Sicherheitstechnik",
        },
        {
          value: "Vollservice",
          label: "Beratung, Umsetzung, Schulung und technischer Support",
        },
      ],
      pillars: [
        "Staatliche Behörden",
        "Öffentliche Behörden",
        "Sicherheits- und ordnungsrelevante Organisationen",
        "Kommunikationsanbieter",
      ],
    },
    story: {
      label: "Vorgehen",
      title: "Von der ersten Anforderung bis zum verlässlichen Betrieb.",
      mobileTitle: "So arbeitet Elaman",
      body: "Wie Elaman Erfahrung, Beratung, Observation und Kommunikation, Schutz, schlüsselfertige Umsetzung, Schulung und After-Sales-Service zusammenführt.",
      mobileBody:
        "Ein Team verbindet Beratung, Systemplanung, Schutz, Umsetzung und Betreuung.",
      progressLabel: "Fortschritt",
      activeLayerLabel: "Aktueller Schritt",
      systemFocusLabel: "Schwerpunkte",
      detailsLabel: "Schwerpunkte",
      steps: [
        {
          id: "experience",
          eyebrow: "01 / Erfahrung",
          title: "Mehr als 20 Jahre Kommunikations- und Sicherheitstechnik.",
          mobileTitle: "Mehr als 20 Jahre Erfahrung.",
          description:
            "Die Arbeit von Elaman basiert auf langjähriger Erfahrung und umfassendem Wissen über staatliche Sicherheits- und Schutzanforderungen öffentlicher Behörden.",
          mobileSummary:
            "Langjährige Erfahrung in Kommunikations- und Sicherheitstechnik für Behördenumfelder.",
          bullets: [
            "Staatliche Sicherheitsanforderungen",
            "Behördenumfelder",
            "Kommunikations- und Sicherheitstechnik",
          ],
        },
        {
          id: "advice",
          eyebrow: "02 / Beratung",
          title: "Anforderungen werden in einen stimmigen technischen Ansatz überführt.",
          mobileTitle: "Anforderung verstehen",
          description:
            "Die Beratung umfasst Analyse, Consulting und Lösungskonzeption, unter Abstimmung von Einsatzkontext, bestehender Infrastruktur und Beschaffungsrahmen mit geeigneten technischen Optionen.",
          mobileSummary:
            "Wir klären Einsatzkontext, vorhandene Infrastruktur und technische Grenzen, bevor wir eine Lösung vorschlagen.",
          bullets: ["Analyse", "Beratung", "Lösungskonzeption"],
        },
        {
          id: "surveillance-communications",
          eyebrow: "03 / Observation & Kommunikation",
          title: "Kommunikations- und Observationssysteme bilden die operative Ebene.",
          mobileTitle: "System planen",
          description:
            "Netzwerk-, Privat-, Funk-, Mobilfunk- und Satellitenkommunikation werden mit observationstechnischen Fähigkeiten als Teil einer umfassenden Sicherheitslösung integriert.",
          mobileSummary:
            "Kommunikation und autorisierte Observation werden als zusammenhängendes System geplant.",
          bullets: ["Netzwerk / IP", "Private Netze", "Funk / Mobilfunk", "Satellit"],
        },
        {
          id: "protection",
          eyebrow: "04 / Schutz",
          title: "Schutzmaßnahmen sichern Personen, Daten und geschützte Räume.",
          mobileTitle: "Werte schützen",
          description:
            "Schutzbezogene Leistungen umfassen Gegenmaßnahmensysteme und Schutzinfrastruktur für Umgebungen, in denen Vertraulichkeit und operative Sicherheit erforderlich sind.",
          mobileSummary:
            "Gegenmaßnahmen und Schutzinfrastruktur richten sich nach den beteiligten Personen, Daten und Räumen.",
          bullets: ["ECM", "Counter-RCIED", "TSCM", "Geschirmte Räume"],
        },
        {
          id: "implementation",
          eyebrow: "05 / Umsetzung",
          title: "Projekte schlüsselfertig umgesetzt.",
          mobileTitle: "Schlüsselfertige Umsetzung.",
          description:
            "Elaman setzt Projekte mit aktueller Technologie um, mit Blick auf Systemintegration, Zuverlässigkeit und operative Eignung.",
          mobileSummary:
            "Systemintegration, schlüsselfertige Übergabe und Einsatzbereitschaft prägen die Umsetzung.",
          bullets: [
            "Systemintegration",
            "Schlüsselfertige Übergabe",
            "Einsatzbereitschaft",
          ],
        },
        {
          id: "training-support",
          eyebrow: "06 / Schulung & Betreuung",
          title: "Schulung und After-Sales-Service sichern langfristige Nutzbarkeit.",
          mobileTitle: "Betrieb sichern",
          description:
            "Professionelle Schulungen und hochwertiger After-Sales-Service unterstützen Kundenteams beim Betrieb, bei der Wartung und bei der langfristigen Nutzung implementierter Systeme.",
          mobileSummary:
            "Schulung und technischer Support helfen Kundenteams, die übergebenen Systeme sicher zu nutzen und zu erhalten.",
          bullets: [
            "Fundierte Schulungen",
            "Technischer Service",
            "After-Sales-Betreuung",
          ],
        },
      ],
    },
    capabilities: {
      label: "Leistungen",
      title: "Elaman — Deutsche Sicherheitslösungen.",
      body: "Wir verbinden bewährte Produkte und aktuelle Technologien zu integrierten Systemen für anspruchsvolle Kommunikations- und Sicherheitsumgebungen.",
      items: [
        {
          eyebrow: "01",
          title: "Beratung",
          description:
            "Technische Analyse und praxistaugliche Empfehlungen, abgestimmt auf Einsatzkontext und Behördenanforderungen.",
        },
        {
          eyebrow: "02",
          title: "Observation & Kommunikation",
          description:
            "Sichere Kommunikation und Observation für autorisierte Anwendungen in Netzwerk-, Funk-, Mobilfunk- und Satellitenumgebungen.",
        },
        {
          eyebrow: "03",
          title: "Schutz",
          description:
            "Gegenmaßnahmen und Schutzinfrastruktur für Personal, Einrichtungen und vertrauliche Umgebungen.",
        },
        {
          eyebrow: "04",
          title: "Schulung und Betreuung",
          description:
            "Saubere Übergabe, praxisnahe Schulung und technischer Support über den gesamten Lebenszyklus.",
        },
      ],
    },
    systems: {
      label: "Lösungen",
      title: "Systeme, die zusammenarbeiten.",
      body: "Jede Lösung wird auf Infrastruktur, Einsatzumgebung und organisatorische Anforderungen des Projekts abgestimmt.",
      items: [
        {
          title: "Sichere Kommunikation",
          description:
            "Netzwerk-, Privat-, Funk-, Mobilfunk- und Satellitenkommunikation für anspruchsvolle Sicherheitsumfelder.",
        },
        {
          title: "Audio- und Videoobservation",
          description:
            "Technische Observationstechnik und unterstützende Infrastruktur für autorisierte Überwachungsanwendungen.",
        },
        {
          title: "Geoinformationssysteme",
          description: "GIS-bezogene Systeme zur Lagebildung und operativen Planung.",
        },
        {
          title: "Technische Gegenüberwachung",
          description:
            "Gegenobservationstechnik und Unterstützung für Sweep-Teams in sensiblen Umgebungen.",
        },
        {
          title: "Spezialfahrzeuge",
          description:
            "Fahrzeugbasierte Konzepte für spezialisierte Einsatz- und Kommunikationsanforderungen.",
        },
        {
          title: "Führungszentralen",
          description: "Mobile und feste Führungsumgebungen für koordinierte Einsätze.",
        },
        {
          title: "Intelligence-Fusion-Systeme",
          description:
            "Systeme zur zusammenführenden Auswertung operativer Informationen in autorisierten Analyseprozessen.",
        },
        {
          title: "Datenforensik",
          description:
            "Forensikbezogene technische Fähigkeiten für autorisierte Ermittlungsumfelder.",
        },
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
    delivery: {
      label: "Methodik",
      title: "Klare Verantwortung vom Gespräch bis zur Betreuung.",
      body: "Ein transparenter Ablauf hält technische Entscheidungen, Umsetzung und Übergabe zusammen.",
      steps: [
        {
          step: "01",
          title: "Analysieren",
          description: "Aufgabe, Infrastruktur und Rahmenbedingungen klären.",
        },
        {
          step: "02",
          title: "Konzipieren",
          description: "Anforderungen in ein tragfähiges Systemkonzept übersetzen.",
        },
        {
          step: "03",
          title: "Integrieren",
          description: "Komponenten integrieren und das System einsatzbereit übergeben.",
        },
        {
          step: "04",
          title: "Schulen",
          description: "Kundenteams das nötige Wissen vermitteln.",
        },
        {
          step: "05",
          title: "Betreuen",
          description: "Für Service und technische Fragen ansprechbar bleiben.",
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
        fax: "Fax",
      },
      addressLines: ["Implerstraße 24", "81371 München", "Deutschland"],
      footerAddressLines: ["Implerstraße 24", "81371 München, Deutschland"],
      phone: "+49 (0) 89 - 24 20 91 80",
      phoneHref: "+498924209180",
      fax: "+49 (0) 89 - 24 20 91 81",
      email: "info@elaman.de",
      emailHref: "mailto:info@elaman.de",
      form: {
        label: "Anfrage",
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
        helper: "Ihre Anfrage wird vor der E-Mail-Zustellung serverseitig geprüft.",
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
