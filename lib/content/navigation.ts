import type { NavigationItem } from "@/types/site";

export const navigationItems = [
  { label: "Experience", href: "#experience" },
  { label: "Story", href: "#story" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Systems", href: "#systems" },
  { label: "Contact", href: "#contact" },
] satisfies NavigationItem[];

export const legalNavigation = [
  { label: "Imprint", href: "/imprint" },
  { label: "Data Privacy Policy", href: "/private-policy" },
] satisfies NavigationItem[];
