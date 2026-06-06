import type { ContentCard } from "@/types/site";

export const systemsContent = {
  label: "Systems & Technologies",
  title: "Integrated systems across communications, observation, and command.",
  body: "Elaman's current service areas include secure communications, observation systems, GIS, intelligence fusion, and mobile or strategic command and control centers.",
  items: [
    {
      title: "Communications Systems",
      description:
        "Network, private, wireless, cellular, and satellite communications capabilities for demanding security contexts.",
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
      title: "Intelligence Fusion",
      description:
        "Fusion systems that help consolidate operational inputs into actionable information flows.",
    },
    {
      title: "Command & Control Centers",
      description:
        "Mobile and strategic command environments, including special operations vehicle concepts.",
    },
  ] satisfies ContentCard[],
} as const;
