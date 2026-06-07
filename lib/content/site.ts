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
        "Elaman GmbH provides communications and security engineering, advisory, surveillance, protection, training, implementation, and support for public authority and security contexts.",
      ogLocale: "en_US",
    },
    navigation: {
      main: [
        { label: "Experience", href: "#experience" },
        { label: "Story", href: "#story" },
        { label: "Capabilities", href: "#capabilities" },
        { label: "Systems", href: "#systems" },
        { label: "Contact", href: "#contact" },
      ],
      legal: [
        { label: "Imprint", href: "/imprint" },
        { label: "Data Privacy Policy", href: "/private-policy" },
      ],
      cta: "Contact",
      menu: "Menu",
      homeLabel: "Elaman home",
      languageSwitcherLabel: "Language",
    },
    footer: {
      legalNotice: "Imprint",
      privacy: "Data Privacy Policy",
      copyright: "©2026 by Elaman GmbH",
    },
    hero: {
      label: "Elaman GmbH",
      title: "Your bridge to trust and security.",
      mobileIntro:
        "German security solutions for public authorities, security services, and communications service providers.",
      intro:
        "German security solutions for public authorities, law enforcement agencies, ministries, security services, and communications service providers.",
      mobileBody:
        "Advisory, implementation, training, and support for demanding communications and security environments.",
      body: "With more than 20 years of experience in communications and security engineering, Elaman provides technical services, high-quality advice, turnkey implementation, professional training, and after-sales support.",
      primaryCta: { label: "Contact Elaman", href: "#contact" },
      secondaryCta: { label: "Explore capabilities", href: "#capabilities" },
      visualLabel: "Secure Systems",
      visualBody: "Communications, observation, command, and protection layers.",
      visualBadge: "Munich / DE",
      visualSteps: ["Analyze", "Integrate", "Support"],
      stats: [
        { value: "20+", label: "years of security and communications engineering" },
        {
          value: "B2G",
          label: "exclusively for government and public-sector authorities",
        },
        { value: "360°", label: "advisory, implementation, training, and support" },
      ],
    },
    trust: {
      label: "Trust & Experience",
      title: "Built for public-sector security requirements.",
      body: "Elaman combines communications engineering, security technology, discreet advisory work, system integration, professional training, and long-term service for organizations whose operations depend on reliable technical systems.",
      metrics: [
        {
          value: "20+",
          label: "years of communications and security engineering experience",
        },
        {
          value: "B2G",
          label:
            "exclusive focus on government, public authorities, and official security organizations",
        },
        {
          value: "360°",
          label:
            "full-cycle delivery — from advice and integration to training and after-sales support",
        },
      ],
      pillars: [
        "Public authorities and ministries",
        "Law enforcement agencies",
        "Security services",
        "Communications service providers",
      ],
    },
    story: {
      label: "Operational Story",
      title: "From confidential requirements to operational continuity.",
      mobileTitle: "Security work, condensed.",
      body: "A guided view of how Elaman moves from experience and advisory work into communications, surveillance, protection, integration, training, and long-term support.",
      mobileBody:
        "A compact view of the Elaman value chain: advisory work, technical systems, countermeasures, delivery, training, and support.",
      progressLabel: "Story Progress",
      activeLayerLabel: "Active Layer",
      systemFocusLabel: "System focus",
      detailsLabel: "Key details",
      steps: [
        {
          id: "trust",
          eyebrow: "01 / Trust & Experience",
          title: "Experience creates the basis for discreet security work.",
          mobileTitle: "Trust first.",
          description:
            "The foundation is more than 20 years of communications and security engineering for demanding public authority and official security environments.",
          mobileSummary:
            "20+ years of communications and security engineering for public authority and official security contexts.",
          bullets: [
            "Government security requirements",
            "Public authority understanding",
            "Discreet technical advisory work",
          ],
        },
        {
          id: "advice",
          eyebrow: "02 / Advice",
          title: "Requirements become a precise technical architecture.",
          mobileTitle: "Advice becomes architecture.",
          description:
            "Advisory work translates mission context, existing infrastructure, risk, procurement constraints, and operational expectations into a coherent solution concept.",
          mobileSummary:
            "Analysis and consulting translate operational needs into a coherent solution architecture.",
          bullets: ["Analysis", "Consulting", "Solution architecture"],
        },
        {
          id: "communications",
          eyebrow: "03 / Communications",
          title: "Secure communications connect the operational layer.",
          mobileTitle: "Communications connect.",
          description:
            "Network, private, wireless, cellular, and satellite communications are treated as part of the security system rather than isolated channels.",
          mobileSummary:
            "Network, private, wireless, cellular, and satellite communications form the operational connection layer.",
          bullets: ["PSTN / IP", "PABX", "Wireless / cellular", "Satellite"],
        },
        {
          id: "surveillance",
          eyebrow: "04 / Surveillance",
          title: "Observation, GIS, intelligence, and command layers align.",
          mobileTitle: "Surveillance layers align.",
          description:
            "Observation equipment, GIS, intelligence fusion, data forensics, command centers, and special operations vehicles are presented as connected capabilities for authorized workflows.",
          mobileSummary:
            "Observation, GIS, intelligence fusion, data forensics, and command layers work as connected systems.",
          bullets: [
            "Audio / video observation",
            "GIS",
            "Intelligence fusion",
            "Command & control",
          ],
        },
        {
          id: "protection",
          eyebrow: "05 / Protection",
          title: "Countermeasures protect people, data, and restricted spaces.",
          mobileTitle: "Protection is layered.",
          description:
            "ECM, counter-RCIED, jamming, TSCM, and shielded room concepts form a restrained protection layer for personnel, confidential information, and sensitive environments.",
          mobileSummary:
            "ECM, counter-RCIED, jamming, TSCM, and shielded room concepts form layered protection.",
          bullets: ["ECM", "Counter-RCIED", "TSCM", "Shielded rooms"],
        },
        {
          id: "delivery",
          eyebrow: "06 / Delivery",
          title: "Implementation, training, and support keep systems usable.",
          mobileTitle: "Delivery keeps systems operational.",
          description:
            "The final layer brings systems into operation through turnkey implementation, professional training, flawless operation, and after-sales service.",
          mobileSummary:
            "Turnkey implementation, training, support, and after-sales service keep technical systems usable after delivery.",
          bullets: ["Implement", "Train", "Support", "After-sales"],
        },
      ],
    },
    capabilities: {
      label: "Capability Overview",
      title: "A coherent capability system, not isolated products.",
      body: "Elaman's offer is structured around advice, communications and surveillance, protection, and training/support. Each capability is designed to fit into broader mission and infrastructure requirements.",
      items: [
        {
          eyebrow: "01",
          title: "Advice",
          description:
            "Specialized technical guidance for selecting the right combination of products, services, and operational support.",
        },
        {
          eyebrow: "02",
          title: "Surveillance & Communications",
          description:
            "Observation, secure communications, GIS, intelligence, forensics, and command-related systems for authorized applications.",
        },
        {
          eyebrow: "03",
          title: "Protection",
          description:
            "Countermeasure systems and protective infrastructure for personnel, facilities, convoys, and restricted environments.",
        },
        {
          eyebrow: "04",
          title: "Training & Support",
          description:
            "In-depth training and after-sales service so teams can operate high-end technical solutions with confidence.",
        },
      ],
    },
    systems: {
      label: "Systems & Technologies",
      title: "Integrated systems across communications, observation, and command.",
      body: "Elaman combines state-of-the-art products and current technological trends into efficient systems for security contexts where reliability and operational fit matter.",
      items: [
        {
          title: "Secure Communications",
          description:
            "Network, private, wireless, cellular, and satellite communications for demanding security contexts.",
        },
        {
          title: "Audio / Video Observation",
          description:
            "Technical observation equipment and supporting infrastructure for authorized surveillance operations.",
        },
        {
          title: "Geographical Information Systems",
          description:
            "GIS-oriented systems that support situational understanding and operational planning.",
        },
        {
          title: "Counter Surveillance",
          description:
            "Counter-surveillance equipment and sweep-team support for sensitive environments.",
        },
        {
          title: "Special Operations Vehicles",
          description:
            "Vehicle-based concepts for specialized operational and communications requirements.",
        },
        {
          title: "Command & Control Centers",
          description:
            "Mobile and strategic command environments for coordinated security operations.",
        },
        {
          title: "Intelligence Fusion Systems",
          description:
            "Fusion systems that consolidate operational inputs into actionable information flows.",
        },
        {
          title: "Data Forensics",
          description:
            "Forensics-related technical capabilities for authorized investigative contexts.",
        },
      ],
    },
    protection: {
      label: "Protection & Countermeasures",
      title: "Countermeasure expertise for people, data, and restricted spaces.",
      body: "Protection-related services include ECM, counter-RCIED, jamming systems, TSCM, and shielded room concepts for environments where confidentiality and operational safety matter.",
      items: [
        {
          title: "ECM / Counter-RCIED",
          description:
            "Electronic countermeasure systems designed to disrupt radio signals used as triggers for RCIEDs or wireless surveillance equipment.",
        },
        {
          title: "Jamming Systems",
          description:
            "Manpack jammers for bomb disposal teams, VIP convoy jamming, and static systems for building deployment.",
        },
        {
          title: "TSCM",
          description:
            "Technical surveillance countermeasures, professional advice, and training for counter-surveillance and sweep teams.",
        },
        {
          title: "Shielded Rooms",
          description:
            "Structural, mechanical, and electronic protection concepts for restricted rooms and confidential information.",
        },
      ],
    },
    delivery: {
      label: "Delivery Model",
      title: "A clear path from assessment to operational support.",
      body: "The delivery model keeps technical decisions connected to operational requirements, implementation quality, flawless operation, and long-term usability.",
      steps: [
        {
          step: "01",
          title: "Analyze",
          description:
            "Understand mission context, existing infrastructure, risks, and technical constraints.",
        },
        {
          step: "02",
          title: "Design",
          description:
            "Translate requirements into a precise system concept and delivery approach.",
        },
        {
          step: "03",
          title: "Integrate",
          description:
            "Implement turnkey technical systems with attention to reliability and operational fit.",
        },
        {
          step: "04",
          title: "Train",
          description:
            "Prepare client teams to understand, operate, and maintain high-end security solutions.",
        },
        {
          step: "05",
          title: "Support",
          description: "Provide after-sales service and continuity for deployed systems.",
        },
      ],
    },
    contact: {
      company: "Elaman GmbH",
      officeTitle: "The Elaman Office in Munich",
      title: "Contact",
      intro:
        "Direct contact details and a structured inquiry form for Elaman GmbH in Munich.",
      labels: {
        address: "Address",
        phone: "Phone",
        email: "Email",
        fax: "Fax",
      },
      addressLines: ["Implerstr. 24", "81371 Munich", "Germany"],
      footerAddressLines: ["Implerstrasse 24", "81371 Munich, Germany"],
      phone: "+49 (0) 89 - 24 20 91 80",
      phoneHref: "+498924209180",
      fax: "+49 (0) 89 - 24 20 91 81",
      email: "info@elaman.de",
      emailHref: "mailto:info@elaman.de",
      form: {
        label: "Inquiry",
        title: "Send a discreet inquiry",
        intro:
          "Describe your requirement briefly. The responsible team will review your inquiry and respond through a secure channel.",
        fields: {
          firstName: "First name",
          lastName: "Last name",
          company: "Company",
          email: "Email",
          message: "Message",
          website: "Website",
        },
        submit: "Send inquiry",
        sending: "Sending...",
        helper: "The inquiry is validated server-side before secure email delivery.",
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
        "Elaman GmbH bietet Kommunikations- und Sicherheitstechnik, Beratung, Überwachung, Schutz, Training, Implementierung und Support für Behörden- und Sicherheitsumfelder.",
      ogLocale: "de_DE",
    },
    navigation: {
      main: [
        { label: "Erfahrung", href: "#experience" },
        { label: "Ablauf", href: "#story" },
        { label: "Kompetenzen", href: "#capabilities" },
        { label: "Systeme", href: "#systems" },
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
    },
    footer: {
      legalNotice: "Impressum",
      privacy: "Datenschutzerklärung",
      copyright: "©2026 Elaman GmbH",
    },
    hero: {
      label: "Elaman GmbH",
      title: "Ihre Brücke zu Vertrauen und Sicherheit.",
      mobileIntro:
        "Deutsche Sicherheitslösungen für Behörden, Sicherheitsdienste und Kommunikationsanbieter.",
      intro:
        "Deutsche Sicherheitslösungen für Behörden, Strafverfolgungsbehörden, Ministerien, Sicherheitsdienste und Kommunikationsanbieter.",
      mobileBody:
        "Beratung, Implementierung, Training und Support für anspruchsvolle Kommunikations- und Sicherheitsumfelder.",
      body: "Mit mehr als 20 Jahren Erfahrung in Kommunikations- und Sicherheitstechnik bietet Elaman technische Dienstleistungen, hochwertige Beratung, schlüsselfertige Implementierung, professionelle Schulungen und After-Sales-Service.",
      primaryCta: { label: "Elaman kontaktieren", href: "#contact" },
      secondaryCta: { label: "Kompetenzen ansehen", href: "#capabilities" },
      visualLabel: "Sichere Systeme",
      visualBody: "Kommunikation, Observation, Führung und Schutz als Systemebenen.",
      visualBadge: "München / DE",
      visualSteps: ["Analysieren", "Integrieren", "Betreuen"],
      stats: [
        {
          value: "20+",
          label: "Jahre Erfahrung in Sicherheits- und Kommunikationstechnik",
        },
        {
          value: "B2G",
          label: "ausschließlich für Behörden und staatliche Sicherheitsorganisationen",
        },
        { value: "360°", label: "Beratung, Implementierung, Training und Support" },
      ],
    },
    trust: {
      label: "Vertrauen & Erfahrung",
      title: "Entwickelt für Sicherheitsanforderungen im öffentlichen Umfeld.",
      body: "Elaman verbindet Kommunikationstechnik, Sicherheitstechnologie, diskrete Beratung, Systemintegration, professionelle Schulungen und langfristigen Service für Organisationen, deren Arbeit von zuverlässigen technischen Systemen abhängt.",
      metrics: [
        {
          value: "20+",
          label: "Jahre Erfahrung in Kommunikations- und Sicherheitstechnik",
        },
        {
          value: "B2G",
          label:
            "ausschließlicher Fokus auf Behörden, Ministerien und staatliche Sicherheitsorganisationen",
        },
        {
          value: "360°",
          label:
            "vollständiger Leistungszyklus — von Beratung und Integration bis Training und After-Sales",
        },
      ],
      pillars: [
        "Behörden und Ministerien",
        "Strafverfolgungsbehörden",
        "Sicherheitsdienste",
        "Kommunikationsanbieter",
      ],
    },
    story: {
      label: "Operativer Ablauf",
      title: "Von vertraulichen Anforderungen zu verlässlichem Betrieb.",
      mobileTitle: "Sicherheitsarbeit, verdichtet.",
      body: "Eine geführte Darstellung, wie Elaman Erfahrung und Beratung mit Kommunikation, Observation, Schutz, Integration, Training und langfristiger Betreuung verbindet.",
      mobileBody:
        "Eine kompakte Darstellung der Elaman-Wertschöpfung: Beratung, technische Systeme, Schutzmaßnahmen, Umsetzung, Training und Support.",
      progressLabel: "Fortschritt",
      activeLayerLabel: "Aktive Ebene",
      systemFocusLabel: "Systemfokus",
      detailsLabel: "Details",
      steps: [
        {
          id: "trust",
          eyebrow: "01 / Vertrauen & Erfahrung",
          title: "Erfahrung schafft die Grundlage für diskrete Sicherheitsarbeit.",
          mobileTitle: "Vertrauen zuerst.",
          description:
            "Die Grundlage bilden mehr als 20 Jahre Kommunikations- und Sicherheitstechnik für anspruchsvolle Behörden- und Sicherheitsumfelder.",
          mobileSummary:
            "Mehr als 20 Jahre Kommunikations- und Sicherheitstechnik für Behörden und offizielle Sicherheitskontexte.",
          bullets: [
            "Staatliche Sicherheitsanforderungen",
            "Verständnis für Behördenumfelder",
            "Diskrete technische Beratung",
          ],
        },
        {
          id: "advice",
          eyebrow: "02 / Beratung",
          title: "Anforderungen werden zu einer präzisen technischen Architektur.",
          mobileTitle: "Beratung wird Architektur.",
          description:
            "Beratung übersetzt Einsatzkontext, bestehende Infrastruktur, Risiken, Beschaffungsrahmen und operative Erwartungen in ein stimmiges Lösungskonzept.",
          mobileSummary:
            "Analyse und Beratung übersetzen operative Anforderungen in eine klare Lösungsarchitektur.",
          bullets: ["Analyse", "Beratung", "Lösungsarchitektur"],
        },
        {
          id: "communications",
          eyebrow: "03 / Kommunikation",
          title: "Sichere Kommunikation verbindet die operative Ebene.",
          mobileTitle: "Kommunikation verbindet.",
          description:
            "Netzwerkbasierte, private, drahtlose, zellulare und satellitengestützte Kommunikation wird als Teil des Sicherheitssystems betrachtet, nicht als isolierter Kanal.",
          mobileSummary:
            "Netzwerk-, Privat-, Funk-, Mobilfunk- und Satellitenkommunikation bilden die operative Verbindungsebene.",
          bullets: ["PSTN / IP", "PABX", "Funk / Mobilfunk", "Satellit"],
        },
        {
          id: "surveillance",
          eyebrow: "04 / Observation",
          title: "Observation, GIS, Intelligence und Führungslagen greifen ineinander.",
          mobileTitle: "Observation vernetzt sich.",
          description:
            "Observationstechnik, GIS, Intelligence Fusion, Data Forensics, Führungszentren und Spezialfahrzeuge werden als verbundene Fähigkeiten für autorisierte Arbeitsabläufe verstanden.",
          mobileSummary:
            "Observation, GIS, Intelligence Fusion, Data Forensics und Führungszentren bilden zusammenhängende Systemebenen.",
          bullets: [
            "Audio-/Video-Observation",
            "GIS",
            "Intelligence Fusion",
            "Command & Control",
          ],
        },
        {
          id: "protection",
          eyebrow: "05 / Schutz",
          title: "Schutzmaßnahmen sichern Personen, Daten und geschützte Räume.",
          mobileTitle: "Schutz ist mehrschichtig.",
          description:
            "ECM, Counter-RCIED, Jamming, TSCM und geschirmte Räume bilden eine zurückhaltende Schutzebene für Personal, vertrauliche Informationen und sensible Umgebungen.",
          mobileSummary:
            "ECM, Counter-RCIED, Jamming, TSCM und geschirmte Räume bilden mehrschichtigen Schutz.",
          bullets: ["ECM", "Counter-RCIED", "TSCM", "Geschirmte Räume"],
        },
        {
          id: "delivery",
          eyebrow: "06 / Umsetzung",
          title: "Implementierung, Training und Support halten Systeme nutzbar.",
          mobileTitle: "Umsetzung sichert Betrieb.",
          description:
            "Die letzte Ebene überführt Systeme durch schlüsselfertige Implementierung, professionelle Schulungen, verlässlichen Betrieb und After-Sales-Service in die Praxis.",
          mobileSummary:
            "Schlüsselfertige Implementierung, Training, Support und After-Sales-Service halten technische Systeme im Betrieb nutzbar.",
          bullets: ["Implementieren", "Trainieren", "Betreuen", "After-Sales"],
        },
      ],
    },
    capabilities: {
      label: "Kompetenzübersicht",
      title: "Ein zusammenhängendes Kompetenzsystem, keine isolierten Produkte.",
      body: "Das Angebot von Elaman umfasst Beratung, Kommunikation und Observation, Schutz sowie Training und Support. Jede Fähigkeit ist auf übergeordnete Einsatz- und Infrastrukturanforderungen ausgerichtet.",
      items: [
        {
          eyebrow: "01",
          title: "Beratung",
          description:
            "Spezialisierte technische Beratung zur Auswahl der passenden Kombination aus Produkten, Dienstleistungen und operativer Unterstützung.",
        },
        {
          eyebrow: "02",
          title: "Observation & Kommunikation",
          description:
            "Observation, sichere Kommunikation, GIS, Intelligence, Forensik und Führungssysteme für autorisierte Anwendungen.",
        },
        {
          eyebrow: "03",
          title: "Schutz",
          description:
            "Schutz- und Gegenmaßnahmensysteme für Personal, Einrichtungen, Konvois und sensible Umgebungen.",
        },
        {
          eyebrow: "04",
          title: "Training & Support",
          description:
            "Fundierte Schulungen und After-Sales-Service, damit Teams hochwertige technische Lösungen sicher einsetzen können.",
        },
      ],
    },
    systems: {
      label: "Systeme & Technologien",
      title: "Integrierte Systeme für Kommunikation, Observation und Führung.",
      body: "Elaman kombiniert hochwertige Produkte und aktuelle technologische Entwicklungen zu effizienten Systemen für Sicherheitsumfelder, in denen Zuverlässigkeit und operative Passung entscheidend sind.",
      items: [
        {
          title: "Sichere Kommunikation",
          description:
            "Netzwerk-, Privat-, Funk-, Mobilfunk- und Satellitenkommunikation für anspruchsvolle Sicherheitskontexte.",
        },
        {
          title: "Audio-/Video-Observation",
          description:
            "Technische Observationstechnik und unterstützende Infrastruktur für autorisierte Überwachungsanwendungen.",
        },
        {
          title: "Geoinformationssysteme",
          description:
            "GIS-orientierte Systeme zur Lageerfassung, Planung und operativen Entscheidungsunterstützung.",
        },
        {
          title: "Counter Surveillance",
          description:
            "Gegenobservationstechnik und Unterstützung für Sweep-Teams in sensiblen Umgebungen.",
        },
        {
          title: "Spezialfahrzeuge",
          description:
            "Fahrzeugbasierte Konzepte für spezialisierte Einsatz- und Kommunikationsanforderungen.",
        },
        {
          title: "Command & Control Centers",
          description:
            "Mobile und strategische Führungsumgebungen für koordinierte Sicherheitsoperationen.",
        },
        {
          title: "Intelligence Fusion Systeme",
          description:
            "Fusionssysteme, die operative Eingaben in verwertbare Informationsflüsse überführen.",
        },
        {
          title: "Data Forensics",
          description:
            "Forensikbezogene technische Fähigkeiten für autorisierte Ermittlungsumfelder.",
        },
      ],
    },
    protection: {
      label: "Schutz & Gegenmaßnahmen",
      title: "Gegenmaßnahmentechnik für Personen, Daten und geschützte Räume.",
      body: "Schutzbezogene Leistungen umfassen ECM, Counter-RCIED, Jamming-Systeme, TSCM und geschirmte Raumkonzepte für Umgebungen, in denen Vertraulichkeit und operative Sicherheit zählen.",
      items: [
        {
          title: "ECM / Counter-RCIED",
          description:
            "Elektronische Gegenmaßnahmensysteme zur Störung von Funksignalen, die als Auslöser für RCIEDs oder drahtlose Überwachungstechnik genutzt werden könnten.",
        },
        {
          title: "Jamming-Systeme",
          description:
            "Manpack-Jammer für Entschärfungsteams, VIP-Konvoi-Jamming und statische Systeme für Gebäudeeinsätze.",
        },
        {
          title: "TSCM",
          description:
            "Technische Überwachungsgegenmaßnahmen, professionelle Beratung und Schulungen für Counter-Surveillance- und Sweep-Teams.",
        },
        {
          title: "Geschirmte Räume",
          description:
            "Bauliche, mechanische und elektronische Schutzkonzepte für geschützte Räume und vertrauliche Informationen.",
        },
      ],
    },
    delivery: {
      label: "Umsetzungsmodell",
      title: "Ein klarer Weg von der Analyse bis zur Betriebsbetreuung.",
      body: "Das Umsetzungsmodell verbindet technische Entscheidungen mit operativen Anforderungen, Implementierungsqualität, zuverlässigem Betrieb und langfristiger Nutzbarkeit.",
      steps: [
        {
          step: "01",
          title: "Analysieren",
          description:
            "Einsatzkontext, bestehende Infrastruktur, Risiken und technische Rahmenbedingungen verstehen.",
        },
        {
          step: "02",
          title: "Konzipieren",
          description:
            "Anforderungen in ein präzises Systemkonzept und einen belastbaren Umsetzungsansatz übersetzen.",
        },
        {
          step: "03",
          title: "Integrieren",
          description:
            "Schlüsselfertige technische Systeme mit Blick auf Zuverlässigkeit und operative Passung umsetzen.",
        },
        {
          step: "04",
          title: "Schulen",
          description:
            "Teams darauf vorbereiten, hochwertige Sicherheitslösungen zu verstehen, zu bedienen und zu erhalten.",
        },
        {
          step: "05",
          title: "Betreuen",
          description:
            "After-Sales-Service und Kontinuität für implementierte Systeme bereitstellen.",
        },
      ],
    },
    contact: {
      company: "Elaman GmbH",
      officeTitle: "Das Elaman Büro in München",
      title: "Kontakt",
      intro:
        "Direkte Kontaktdaten und ein strukturiertes Anfrageformular für die Elaman GmbH in München.",
      labels: {
        address: "Adresse",
        phone: "Telefon",
        email: "E-Mail",
        fax: "Fax",
      },
      addressLines: ["Implerstr. 24", "81371 München", "Deutschland"],
      footerAddressLines: ["Implerstrasse 24", "81371 München, Deutschland"],
      phone: "+49 (0) 89 - 24 20 91 80",
      phoneHref: "+498924209180",
      fax: "+49 (0) 89 - 24 20 91 81",
      email: "info@elaman.de",
      emailHref: "mailto:info@elaman.de",
      form: {
        label: "Anfrage",
        title: "Diskrete Anfrage senden",
        intro:
          "Beschreiben Sie Ihr Anliegen kurz. Das zuständige Team prüft Ihre Anfrage und meldet sich über einen sicheren Kanal.",
        fields: {
          firstName: "Vorname",
          lastName: "Nachname",
          company: "Unternehmen",
          email: "E-Mail",
          message: "Nachricht",
          website: "Website",
        },
        submit: "Anfrage senden",
        sending: "Wird gesendet...",
        helper:
          "Die Anfrage wird serverseitig geprüft, bevor sie sicher per E-Mail zugestellt wird.",
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
