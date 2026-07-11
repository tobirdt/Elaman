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
    skipLabel: string;
    footerNavigationLabel: string;
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
    contextsLabel: string;
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
        { label: "Experience", href: "#experience" },
        { label: "Approach", href: "#story" },
        { label: "Services", href: "#capabilities" },
        { label: "Solutions", href: "#systems" },
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
      skipLabel: "Skip to content",
      footerNavigationLabel: "Footer navigation",
      legalNavigationLabel: "Legal navigation",
    },
    footer: {
      legalNotice: "Imprint",
      privacy: "Privacy Policy",
      copyright: "©2026 Elaman GmbH",
    },
    hero: {
      label: "Elaman GmbH",
      title: "Your bridge to trust and security.",
      mobileIntro:
        "German security solutions for public authorities, security-sector clients, and communication service providers.",
      intro:
        "German security solutions for governmental authorities, public authorities, law-enforcement-related organisations, and communication service providers.",
      mobileBody:
        "Communications and security engineering, advice, implementation, training, and support for demanding public-sector environments.",
      body: "For more than 20 years, Elaman has worked in communications and security engineering. We provide comprehensive security solutions, technical services, high-quality advice, turnkey implementation, professional training, and after-sales service.",
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
      title: "Long-standing expertise in institutional security requirements.",
      body: "Elaman combines communications and security engineering with long-standing knowledge of institutional security and safety requirements. We support organisations that rely on reliable technical systems, sound advice, and sustained service.",
      metrics: [
        {
          value: "20+",
          label: "Years of experience in communications and security engineering",
        },
        {
          value: "Institutional focus",
          label: "Experience with public-sector and security-related requirements",
        },
        {
          value: "Sustained support",
          label: "Advice, implementation, training, and after-sales support",
        },
      ],
      contextsLabel: "Focus contexts",
      pillars: [
        "Public institutions",
        "Security-relevant organisations",
        "Communication service providers",
      ],
    },
    story: {
      label: "Approach",
      title: "From requirements analysis to implementation and support.",
      mobileTitle: "How Elaman works",
      body: "How Elaman brings together experience, advice, observation and communications, protection, implementation, training, and after-sales support.",
      mobileBody:
        "How Elaman brings together experience, advice, observation and communications, protection, implementation, training, and support.",
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
            "Elaman's work is grounded in long-standing experience and extensive knowledge of institutional security and safety requirements.",
          mobileSummary:
            "Long-standing experience in communications and security engineering for institutional contexts.",
          bullets: [
            "Institutional security requirements",
            "Public-sector contexts",
            "Communications and security engineering",
          ],
        },
        {
          id: "advice",
          eyebrow: "02 / Advice",
          title: "Requirements are translated into a coherent technical approach.",
          mobileTitle: "Requirements become technical approach.",
          description:
            "Advice covers analysis, consulting, and solution design, aligning project context, existing infrastructure, and procurement constraints with appropriate technical options.",
          mobileSummary:
            "Analysis, consulting, and solution design align requirements with appropriate technical options.",
          bullets: ["Analysis", "Consulting", "Solution design"],
        },
        {
          id: "observation-communications",
          eyebrow: "03 / Observation & communications",
          title:
            "Communications and observation systems form a coordinated technical layer.",
          mobileTitle: "Coordinated technical layer.",
          description:
            "Network-based, private, wireless, cellular, and satellite communications are combined with observation-related capabilities as part of an integrated technical system.",
          mobileSummary:
            "Communications domains are combined with authorised observation-related capabilities.",
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
          title: "Protection measures for personnel, information, and sensitive spaces.",
          mobileTitle: "Protection measures.",
          description:
            "Protection-related services combine protective infrastructure and selected technical measures for contexts where confidentiality and reliable operation are essential.",
          mobileSummary:
            "Protective infrastructure and selected technical measures support sensitive environments.",
          bullets: [
            "Protective infrastructure",
            "Sensitive spaces",
            "Confidential information",
          ],
        },
        {
          id: "implementation",
          eyebrow: "05 / Implementation",
          title: "Projects delivered with an integrated implementation approach.",
          mobileTitle: "Structured implementation.",
          description:
            "Elaman implements projects with current technology, focusing on system integration, reliability, and practical fit.",
          mobileSummary:
            "System integration, structured delivery, and operational readiness guide implementation.",
          bullets: ["System integration", "Structured delivery", "Operational readiness"],
        },
        {
          id: "training-support",
          eyebrow: "06 / Training & support",
          title: "Training and after-sales support sustain long-term use.",
          mobileTitle: "Training and support.",
          description:
            "Professional training and after-sales support help teams operate, maintain, and use implemented systems over time.",
          mobileSummary:
            "Training and after-sales support help teams operate and maintain implemented systems.",
          bullets: ["In-depth training", "Technical service", "After-sales support"],
        },
      ],
    },
    capabilities: {
      label: "Services",
      title: "Advice, observation, protection, and sustained support.",
      body: "Elaman's services follow the structure established over more than two decades: specialised advice, observation-related systems and communications, protection for sensitive environments, complemented by professional training and after-sales service.",
      items: [
        {
          eyebrow: "01",
          title: "Advice",
          description:
            "Technical advice for selecting and combining systems, services, and operational support, based on long-standing knowledge of institutional security and safety requirements.",
        },
        {
          eyebrow: "02",
          title: "Observation & communications",
          description:
            "Observation-related systems and communications for authorised applications, including network-based, private, wireless, cellular, and satellite communications.",
        },
        {
          eyebrow: "03",
          title: "Protection",
          description:
            "Protection-related solutions for personnel, facilities, and sensitive environments where confidentiality and operational reliability matter.",
        },
        {
          eyebrow: "04",
          title: "Training & Support",
          description:
            "In-depth training, technical services, and sustained after-sales support to help teams operate and maintain implemented systems.",
        },
      ],
    },
    systems: {
      label: "Solutions",
      title: "Integrated systems across communications, observation, and command.",
      body: "Elaman combines established products and current technology into integrated systems for institutional security and communications requirements.",
      items: [
        {
          title: "Communications systems",
          description:
            "Network-based, private, wireless, cellular, and satellite communications for institutional environments.",
        },
        {
          title: "Technical observation",
          description:
            "Technical observation and supporting infrastructure for authorised applications.",
        },
        {
          title: "Geographical information systems",
          description:
            "GIS-related systems supporting spatial information, coordination, and planning.",
        },
        {
          title: "Technical environment assessment",
          description:
            "Technical capabilities for assessing sensitive environments and maintaining appropriate protective conditions.",
        },
        {
          title: "Mobile system concepts",
          description:
            "Vehicle-based concepts for specialised communications and technical requirements.",
        },
        {
          title: "Coordinated operational environments",
          description:
            "Mobile and fixed environments supporting coordinated decision-making and communications.",
        },
        {
          title: "Information integration",
          description:
            "Systems that bring together authorised information sources for structured analysis workflows.",
        },
        {
          title: "Technical analysis",
          description:
            "Technical capabilities supporting authorised examination and documentation workflows.",
        },
      ],
    },
    protection: {
      label: "Protective environments",
      title: "Protective capabilities for sensitive institutional environments.",
      body: "Elaman combines selected protective infrastructure, technical measures, and advisory support for environments where confidentiality, reliability, and controlled access matter.",
      items: [
        {
          title: "Technical protective measures",
          description:
            "Technical measures for authorised environments with heightened communications and infrastructure protection requirements.",
        },
        {
          title: "Resilient operational infrastructure",
          description:
            "Concepts that help maintain continuity in sensitive technical environments.",
        },
        {
          title: "Technical environment assurance",
          description:
            "Assessment, advice, and training related to the integrity of sensitive spaces and technical environments.",
        },
        {
          title: "Shielded environments",
          description:
            "Structural, mechanical, and electronic protection concepts for sensitive rooms and confidential information.",
        },
      ],
    },
    delivery: {
      label: "Methodology",
      title: "A clear delivery model from analysis to continued support.",
      body: "Elaman connects requirements analysis, system design, integration, training, and continued support to provide reliable, usable systems.",
      steps: [
        {
          step: "01",
          title: "Analyse",
          description: "Understand context, infrastructure, and technical parameters.",
        },
        {
          step: "02",
          title: "Design",
          description: "Develop a system concept and implementation approach.",
        },
        {
          step: "03",
          title: "Integrate",
          description:
            "Combine established and current technology into a coherent system.",
        },
        {
          step: "04",
          title: "Train",
          description:
            "Provide role-appropriate training for operating and maintaining the implemented system.",
        },
        {
          step: "05",
          title: "Support",
          description:
            "Provide technical service and after-sales support throughout the system lifecycle.",
        },
      ],
    },
    contact: {
      company: "Elaman GmbH",
      officeTitle: "Elaman GmbH - Munich",
      title: "Contact",
      intro: "Contact details and an inquiry form for Elaman GmbH in Munich.",
      labels: {
        address: "Address",
        phone: "Phone",
        email: "Email",
        fax: "Fax",
      },
      addressLines: ["Implerstraße 24", "81371 Munich", "Germany"],
      footerAddressLines: ["Implerstrasse 24", "81371 Munich, Germany"],
      phone: "+49 (0) 89 - 24 20 91 80",
      phoneHref: "+498924209180",
      fax: "+49 (0) 89 - 24 20 91 81",
      email: "info@elaman.de",
      emailHref: "mailto:info@elaman.de",
      form: {
        label: "Inquiry",
        title: "Send an inquiry",
        intro:
          "Please describe your requirement briefly. The Elaman team will review your message and respond.",
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
        { label: "Erfahrung", href: "#experience" },
        { label: "Vorgehen", href: "#story" },
        { label: "Leistungen", href: "#capabilities" },
        { label: "Lösungen", href: "#systems" },
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
      skipLabel: "Zum Inhalt springen",
      footerNavigationLabel: "Fußzeilennavigation",
      legalNavigationLabel: "Rechtliche Navigation",
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
        "Deutsche Sicherheitslösungen für Behörden, Sicherheitskunden und Kommunikationsanbieter.",
      intro:
        "Deutsche Sicherheitslösungen für staatliche und öffentliche Behörden, sicherheitsrelevante Organisationen und Kommunikationsanbieter.",
      mobileBody:
        "Kommunikations- und Sicherheitstechnik, Beratung, Implementierung, Schulung und Betreuung für anspruchsvolle Behördenumfelder.",
      body: "Seit mehr als 20 Jahren ist Elaman in der Kommunikations- und Sicherheitstechnik tätig. Wir bieten umfassende Sicherheitslösungen, technische Dienstleistungen, hochwertige Beratung, schlüsselfertige Implementierung, professionelle Schulungen und After-Sales-Service.",
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
      title: "Langjährige Expertise für anspruchsvolle Sicherheitsanforderungen.",
      body: "Elaman verbindet Kommunikations- und Sicherheitstechnik mit langjährigem Wissen über institutionelle Sicherheits- und Schutzanforderungen. Wir unterstützen Organisationen, die auf zuverlässige technische Systeme, fundierte Beratung und kontinuierliche Betreuung angewiesen sind.",
      metrics: [
        {
          value: "20+",
          label: "Jahre Erfahrung in Kommunikations- und Sicherheitstechnik",
        },
        {
          value: "Institutioneller Fokus",
          label: "Erfahrung mit öffentlichen und sicherheitsrelevanten Anforderungen",
        },
        {
          value: "Kontinuierliche Betreuung",
          label: "Beratung, Umsetzung, Schulung und After-Sales-Service",
        },
      ],
      contextsLabel: "Fokusfelder",
      pillars: [
        "Öffentliche Institutionen",
        "Sicherheitsrelevante Organisationen",
        "Kommunikationsanbieter",
      ],
    },
    story: {
      label: "Vorgehen",
      title: "Von der Anforderungsanalyse bis zur Umsetzung und Betreuung.",
      mobileTitle: "So arbeitet Elaman",
      body: "Wie Elaman Erfahrung, Beratung, Observation und Kommunikation, Schutz, Umsetzung, Schulung und After-Sales-Betreuung zusammenführt.",
      mobileBody:
        "Wie Elaman Erfahrung, Beratung, Observation und Kommunikation, Schutz, Umsetzung, Schulung und Betreuung zusammenführt.",
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
            "Die Arbeit von Elaman basiert auf langjähriger Erfahrung und umfassendem Wissen über institutionelle Sicherheits- und Schutzanforderungen.",
          mobileSummary:
            "Langjährige Erfahrung in Kommunikations- und Sicherheitstechnik für institutionelle Kontexte.",
          bullets: [
            "Institutionelle Sicherheitsanforderungen",
            "Öffentliche Kontexte",
            "Kommunikations- und Sicherheitstechnik",
          ],
        },
        {
          id: "advice",
          eyebrow: "02 / Beratung",
          title: "Anforderungen werden in einen stimmigen technischen Ansatz überführt.",
          mobileTitle: "Anforderungen werden Ansatz.",
          description:
            "Die Beratung umfasst Analyse, Consulting und Lösungskonzeption, unter Abstimmung von Anwendungskontext, bestehender Infrastruktur und Beschaffungsrahmen mit geeigneten technischen Optionen.",
          mobileSummary:
            "Analyse, Beratung und Lösungskonzeption stimmen Anforderungen mit technischen Optionen ab.",
          bullets: ["Analyse", "Beratung", "Lösungskonzeption"],
        },
        {
          id: "observation-communications",
          eyebrow: "03 / Observation & Kommunikation",
          title:
            "Kommunikations- und Observationssysteme bilden eine abgestimmte technische Ebene.",
          mobileTitle: "Abgestimmte technische Ebene.",
          description:
            "Netzwerk-, Privat-, Funk-, Mobilfunk- und Satellitenkommunikation werden mit observationstechnischen Fähigkeiten zu einem integrierten technischen System verbunden.",
          mobileSummary:
            "Kommunikationsbereiche werden mit autorisierten observationstechnischen Fähigkeiten integriert.",
          bullets: ["Netzwerk / IP", "Private Netze", "Funk / Mobilfunk", "Satellit"],
        },
        {
          id: "protection",
          eyebrow: "04 / Schutz",
          title: "Schutzmaßnahmen für Personal, Informationen und sensible Bereiche.",
          mobileTitle: "Schutzmaßnahmen.",
          description:
            "Schutzbezogene Leistungen verbinden Schutzinfrastruktur und ausgewählte technische Maßnahmen für Umgebungen, in denen Vertraulichkeit und zuverlässiger Betrieb wesentlich sind.",
          mobileSummary:
            "Schutzinfrastruktur und ausgewählte technische Maßnahmen unterstützen sensible Umgebungen.",
          bullets: [
            "Schutzinfrastruktur",
            "Sensible Bereiche",
            "Vertrauliche Informationen",
          ],
        },
        {
          id: "implementation",
          eyebrow: "05 / Umsetzung",
          title: "Projekte mit einem integrierten Umsetzungsansatz realisiert.",
          mobileTitle: "Strukturierte Umsetzung.",
          description:
            "Elaman setzt Projekte mit aktueller Technologie um, mit Blick auf Systemintegration, Zuverlässigkeit und praktische Eignung.",
          mobileSummary:
            "Systemintegration, strukturierte Umsetzung und Einsatzbereitschaft prägen die Umsetzung.",
          bullets: [
            "Systemintegration",
            "Strukturierte Umsetzung",
            "Einsatzbereitschaft",
          ],
        },
        {
          id: "training-support",
          eyebrow: "06 / Schulung & Betreuung",
          title: "Schulung und After-Sales-Betreuung sichern langfristige Nutzbarkeit.",
          mobileTitle: "Schulung und Betreuung.",
          description:
            "Professionelle Schulungen und After-Sales-Betreuung unterstützen Teams beim Betrieb, bei der Wartung und bei der langfristigen Nutzung implementierter Systeme.",
          mobileSummary:
            "Schulung und After-Sales-Betreuung unterstützen Betrieb und Wartung implementierter Systeme.",
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
      title: "Beratung, Observation, Schutz und kontinuierliche Betreuung.",
      body: "Die Leistungen von Elaman folgen der seit über zwei Jahrzehnten etablierten Struktur: spezialisierte Beratung, observationstechnische Systeme und Kommunikation, Schutz für sensible Umgebungen — ergänzt durch professionelle Schulungen und After-Sales-Service.",
      items: [
        {
          eyebrow: "01",
          title: "Beratung",
          description:
            "Technische Beratung zur Auswahl und Kombination von Systemen, Dienstleistungen und operativer Unterstützung, auf Basis langjähriger Kenntnisse institutioneller Sicherheits- und Schutzanforderungen.",
        },
        {
          eyebrow: "02",
          title: "Observation & Kommunikation",
          description:
            "Observationstechnische Systeme und Kommunikation für autorisierte Anwendungen, einschließlich netzwerk-, privat-, drahtlos-, mobilfunk- und satellitengestützter Kommunikation.",
        },
        {
          eyebrow: "03",
          title: "Schutz",
          description:
            "Schutzbezogene Lösungen für Personal, Einrichtungen und sensible Umgebungen, in denen Vertraulichkeit und betriebliche Zuverlässigkeit entscheidend sind.",
        },
        {
          eyebrow: "04",
          title: "Training & Betreuung",
          description:
            "Fundierte Schulungen, technische Dienstleistungen und kontinuierliche After-Sales-Betreuung, damit Teams implementierte Systeme sicher bedienen und erhalten können.",
        },
      ],
    },
    systems: {
      label: "Lösungen",
      title: "Integrierte Systeme für Kommunikation, Observation und Führung.",
      body: "Elaman kombiniert bewährte Produkte und aktuelle Technologie zu integrierten Systemen für institutionelle Sicherheits- und Kommunikationsanforderungen.",
      items: [
        {
          title: "Kommunikationssysteme",
          description:
            "Netzwerk-, Privat-, Funk-, Mobilfunk- und Satellitenkommunikation für institutionelle Umgebungen.",
        },
        {
          title: "Technische Observation",
          description:
            "Technische Observation und unterstützende Infrastruktur für autorisierte Anwendungen.",
        },
        {
          title: "Geoinformationssysteme",
          description:
            "GIS-bezogene Systeme für räumliche Information, Koordination und Planung.",
        },
        {
          title: "Technische Umfeldanalyse",
          description:
            "Technische Fähigkeiten zur Einschätzung sensibler Umgebungen und zur Aufrechterhaltung geeigneter Schutzbedingungen.",
        },
        {
          title: "Mobile Systemkonzepte",
          description:
            "Fahrzeugbasierte Konzepte für spezialisierte Kommunikations- und technische Anforderungen.",
        },
        {
          title: "Koordinierte Führungsumgebungen",
          description:
            "Mobile und feste Umgebungen zur Unterstützung koordinierter Lage- und Kommunikationsarbeit.",
        },
        {
          title: "Informationsintegration",
          description:
            "Systeme zur Zusammenführung autorisierter Informationsquellen für strukturierte Analyseprozesse.",
        },
        {
          title: "Technische Analyse",
          description:
            "Technische Fähigkeiten zur Unterstützung autorisierter Prüf- und Dokumentationsprozesse.",
        },
      ],
    },
    protection: {
      label: "Schutzumgebungen",
      title: "Schutzfähigkeiten für sensible institutionelle Umgebungen.",
      body: "Elaman verbindet ausgewählte Schutzinfrastruktur, technische Maßnahmen und beratende Begleitung für Umgebungen, in denen Vertraulichkeit, Zuverlässigkeit und kontrollierter Zugang wesentlich sind.",
      items: [
        {
          title: "Technische Schutzmaßnahmen",
          description:
            "Technische Maßnahmen für autorisierte Umgebungen mit erhöhten Anforderungen an Kommunikations- und Infrastrukturschutz.",
        },
        {
          title: "Resiliente Infrastruktur",
          description:
            "Konzepte zur Unterstützung der Kontinuität in sensiblen technischen Umgebungen.",
        },
        {
          title: "Technische Umfeldabsicherung",
          description:
            "Einschätzung, Beratung und Schulung zur Integrität sensibler Räume und technischer Umgebungen.",
        },
        {
          title: "Geschützte Umgebungen",
          description:
            "Bauliche, mechanische und elektronische Schutzkonzepte für sensible Räume und vertrauliche Informationen.",
        },
      ],
    },
    delivery: {
      label: "Methodik",
      title:
        "Ein klares Umsetzungsmodell von der Analyse bis zur kontinuierlichen Betreuung.",
      body: "Elaman verbindet Anforderungsanalyse, Systemkonzeption, Integration, Schulung und kontinuierliche Betreuung für technisch zuverlässige, langfristig nutzbare Systeme.",
      steps: [
        {
          step: "01",
          title: "Analysieren",
          description:
            "Anwendungskontext, Infrastruktur und technische Rahmenbedingungen verstehen.",
        },
        {
          step: "02",
          title: "Konzipieren",
          description: "Systemkonzept und Umsetzungsansatz entwickeln.",
        },
        {
          step: "03",
          title: "Integrieren",
          description:
            "Bewährte und aktuelle Technologie zu einem stimmigen System verbinden.",
        },
        {
          step: "04",
          title: "Schulen",
          description:
            "Rollenbezogene Schulungen für Betrieb und Wartung des implementierten Systems durchführen.",
        },
        {
          step: "05",
          title: "Betreuen",
          description:
            "Technischen Service und After-Sales-Betreuung über den Lebenszyklus des Systems bereitstellen.",
        },
      ],
    },
    contact: {
      company: "Elaman GmbH",
      officeTitle: "Elaman GmbH - München",
      title: "Kontakt",
      intro: "Kontaktdaten und ein Anfrageformular für die Elaman GmbH in München.",
      labels: {
        address: "Adresse",
        phone: "Telefon",
        email: "E-Mail",
        fax: "Fax",
      },
      addressLines: ["Implerstraße 24", "81371 München", "Deutschland"],
      footerAddressLines: ["Implerstrasse 24", "81371 München, Deutschland"],
      phone: "+49 (0) 89 - 24 20 91 80",
      phoneHref: "+498924209180",
      fax: "+49 (0) 89 - 24 20 91 81",
      email: "info@elaman.de",
      emailHref: "mailto:info@elaman.de",
      form: {
        label: "Anfrage",
        title: "Anfrage senden",
        intro:
          "Bitte beschreiben Sie Ihr Anliegen kurz. Das Team von Elaman prüft Ihre Nachricht und meldet sich.",
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
