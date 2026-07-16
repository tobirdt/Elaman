export const containerSizes = ["page", "content", "copy", "narrow", "legal"] as const;
export type ContainerSize = (typeof containerSizes)[number];

export const sectionModes = ["screen", "content-band", "legal-page"] as const;
export type SectionMode = (typeof sectionModes)[number];

/**
 * TypeScript mirror of the canonical custom properties in app/globals.css.
 * Keep both files synchronized when an approved token changes.
 */
export const designTokens = {
  color: {
    paper: "#ffffff",
    paperSoft: "#f7f8fa",
    graphite: "#16181d",
    graphiteMuted: "#555d6b",
    graphiteSoft: "#667286",
    elamanBlue: "#244074",
    elamanRed: "#d83034",
    navy: "#172033",
    onDark: "#f7f8fa",
    onDarkMuted: "#c7d0dc",
  },
  container: {
    pageX: "clamp(1.25rem, 4vw, 4rem)",
    page: "80rem",
    content: "64rem",
    copy: "42rem",
    narrow: "30rem",
    legal: "56rem",
  },
  section: {
    screen: "calc(100svh - var(--header-h))",
    screenY: "clamp(3rem, 6svh, 5.5rem)",
    contentBand: "clamp(3.75rem, 6vw, 5.5rem)",
    legalPage: "clamp(2.75rem, 5vw, 4.25rem)",
  },
  typography: {
    display: "clamp(3rem, 7.2vw, 6rem)",
    h1: "clamp(2.6rem, 5.8vw, 5.4rem)",
    h2: "clamp(2.1rem, 4.1vw, 3.75rem)",
    h3: "clamp(1.35rem, 2vw, 1.9rem)",
    lead: "clamp(1rem, 1.35vw, 1.25rem)",
    body: "1rem",
    small: "0.875rem",
    micro: "0.75rem",
  },
  leading: {
    display: "0.98",
    title: "1.04",
    body: "1.65",
  },
  tracking: {
    display: "-0.035em",
    title: "-0.04em",
    label: "0.16em",
  },
  radius: {
    control: "0.375rem",
    card: "0.125rem",
    pill: "999px",
  },
  border: {
    hairline: "rgba(22, 24, 29, 0.12)",
    hairlineStrong: "rgba(22, 24, 29, 0.24)",
    accentBlue: "rgba(36, 64, 116, 0.24)",
    onNavy: "rgba(255, 255, 255, 0.14)",
  },
  shadow: {
    overlay: "0 16px 48px rgba(22, 24, 29, 0.12)",
  },
  motion: {
    micro: "120ms",
    fast: "180ms",
    state: "240ms",
    entrance: "600ms",
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    rise: "0.75rem",
  },
  layout: {
    headerHeight: "4rem",
    headerHeightLg: "5rem",
  },
} as const;
