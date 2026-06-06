import type { DeliveryStep } from "@/types/site";

export const deliveryContent = {
  label: "Delivery Model",
  title: "A clear path from assessment to operational support.",
  body: "The delivery model keeps technical decisions connected to operational requirements, implementation quality, and long-term usability.",
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
  ] satisfies DeliveryStep[],
} as const;
