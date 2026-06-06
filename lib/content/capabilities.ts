import type { ContentCard } from "@/types/site";

export const trustContent = {
  label: "Trust & Experience",
  title: "Built for serious security requirements.",
  body: "Elaman combines technical advisory, system integration, professional training, and after-sales support for organizations whose operations depend on reliable communications and security engineering.",
  metrics: [
    {
      value: "20+",
      label: "years of communications and security engineering experience",
    },
    {
      value: "B2G",
      label: "security focus for public authorities and official organizations",
    },
    {
      value: "Turnkey",
      label: "advice, implementation, training, and after-sales support",
    },
  ],
  pillars: [
    "Government and public authority focus",
    "Turnkey technical implementation",
    "Training for operational teams",
    "Long-term service and support",
  ],
} as const;

export const capabilityOverview = {
  label: "Capability Overview",
  title: "Focused capabilities for complex operational environments.",
  body: "The offering is structured around advice, surveillance, protection, and training/support, with each capability designed to fit into broader mission and infrastructure requirements.",
  items: [
    {
      eyebrow: "01",
      title: "Advice",
      description:
        "Specialized technical guidance for selecting the right combination of products, services, and operational support.",
    },
    {
      eyebrow: "02",
      title: "Surveillance",
      description:
        "Observation, communications, geographic information, and intelligence-related systems for authorized security applications.",
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
  ] satisfies ContentCard[],
} as const;
