import type { ContentCard } from "@/types/site";

export const protectionContent = {
  label: "Protection & Countermeasures",
  title: "Countermeasure expertise for people, data, and restricted spaces.",
  body: "Protection services include ECM, counter-RCIED, convoy protection, technical surveillance countermeasures, and shielded room concepts.",
  items: [
    {
      title: "ECM / Counter-RCIED",
      description:
        "Electronic countermeasure systems designed to disrupt radio signals used as triggers for RCIEDs or wireless surveillance equipment.",
    },
    {
      title: "Convoy & Static Protection",
      description:
        "VIP convoy jamming, manpack systems for bomb disposal teams, and static systems for building deployment.",
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
  ] satisfies ContentCard[],
} as const;
