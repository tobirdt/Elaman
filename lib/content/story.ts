import type { StoryStep } from "@/types/site";

export const storyContent = {
  label: "Scroll Narrative",
  title: "From trust to operational continuity.",
  mobileTitle: "Security work, condensed.",
  body: "A controlled view of how Elaman moves from experience and advisory work into surveillance, protection, integration, training, and support.",
  mobileBody:
    "A compact view of the Elaman value chain: advisory work, surveillance systems, protection, delivery, training, and support.",
  steps: [
    {
      id: "trust",
      eyebrow: "01 / Trust & Experience",
      title: "A calm foundation for serious security requirements.",
      mobileTitle: "Trust first.",
      description:
        "The story begins with more than 20 years of communications and security engineering experience for demanding public authority environments.",
      mobileSummary:
        "20+ years of communications and security engineering for public authority and official security contexts.",
      bullets: [
        "Government and security focus",
        "Communications engineering",
        "Technical advisory and delivery continuity",
      ],
    },
    {
      id: "advice",
      eyebrow: "02 / Advice",
      title: "Requirements become a precise technical architecture.",
      mobileTitle: "Advice becomes architecture.",
      description:
        "Advisory work translates mission context, risk, infrastructure, and procurement constraints into a coherent solution concept.",
      mobileSummary:
        "Analysis and consulting translate operational needs into a coherent solution architecture.",
      bullets: ["Analysis", "Consulting", "Solution architecture"],
    },
    {
      id: "surveillance",
      eyebrow: "03 / Surveillance",
      title: "Observation, GIS, intelligence, and command layers connect.",
      mobileTitle: "Surveillance layers connect.",
      description:
        "Surveillance capabilities are presented as connected systems rather than isolated products, supporting authorized operational workflows.",
      mobileSummary:
        "Observation, GIS, intelligence fusion, and command layers are treated as connected systems.",
      bullets: ["Observation systems", "GIS", "Intelligence fusion", "Command & control"],
    },
    {
      id: "protection",
      eyebrow: "04 / Protection",
      title: "Countermeasures protect people, data, and restricted spaces.",
      mobileTitle: "Protection is layered.",
      description:
        "Protection layers introduce restrained red countermeasure signals for ECM, counter-RCIED, TSCM, jamming, and shielded environments.",
      mobileSummary:
        "Countermeasure layers cover ECM, counter-RCIED, TSCM, jamming, and shielded environments.",
      bullets: ["ECM", "Counter-RCIED", "TSCM", "Shielded rooms"],
    },
    {
      id: "delivery",
      eyebrow: "05 / Delivery",
      title: "The system resolves into integration, training, and support.",
      mobileTitle: "Delivery keeps systems operational.",
      description:
        "The final state brings the diagram into an operational flow: integrate the solution, train the teams, and support the system after delivery.",
      mobileSummary:
        "Integration, training, support, and after-sales service keep technical systems usable after delivery.",
      bullets: ["Integrate", "Train", "Support", "After-sales"],
    },
  ] satisfies StoryStep[],
} as const;
