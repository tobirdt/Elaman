export type NavigationItem = {
  label: string;
  href: string;
};

export type ContentCard = {
  eyebrow?: string;
  title: string;
  description: string;
};

export type DeliveryStep = {
  step: string;
  title: string;
  description: string;
};

export type StoryStep = {
  id: string;
  eyebrow: string;
  title: string;
  mobileTitle?: string;
  description: string;
  mobileSummary: string;
  bullets: string[];
};
