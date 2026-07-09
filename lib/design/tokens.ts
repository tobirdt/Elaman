export const containerSizes = ["page", "content", "copy", "narrow", "legal"] as const;
export type ContainerSize = (typeof containerSizes)[number];

export const sectionModes = [
  "hero-screen",
  "screen",
  "screen-lite",
  "content-band",
  "legal-page",
] as const;
export type SectionMode = (typeof sectionModes)[number];

/** @deprecated Removed with the primitive rework — use canonical section modes. */
export const legacySectionModes = {
  hero: "hero-screen",
  band: "content-band",
  compact: "legal-page",
} as const satisfies Record<string, SectionMode>;

export type LegacySectionMode = keyof typeof legacySectionModes;
export type SectionModeInput = SectionMode | LegacySectionMode;

export const surfaceLevels = ["card", "raised", "navy", "inset"] as const;
export type SurfaceLevel = (typeof surfaceLevels)[number];

export function resolveSectionMode(mode: SectionModeInput): SectionMode {
  if (mode in legacySectionModes) {
    return legacySectionModes[mode as LegacySectionMode];
  }

  return mode as SectionMode;
}

/**
 * Canonical design tokens — mirrors app/globals.css. Update both together.
 */
export const designTokens = {
  color: {
    paper: "#ffffff",
    paperSoft: "#f7f8fa",
    line: "rgba(22, 24, 29, 0.12)",
    graphite: "#16181d",
    graphiteMuted: "#555d6b",
    graphiteSoft: "#667286",
    elamanBlue: "#244074",
    elamanRed: "#d83034",
    navy: "#172033",
    onDark: "#f7f8fa",
    onDarkMuted: "#c7d0dc",
    action: {
      primary: "#16181d",
      primaryHover: "#244074",
      onPrimary: "#ffffff",
    },
    selection: "rgba(36, 64, 116, 0.16)",
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
    gap: "clamp(2rem, 4vw, 3.5rem)",
    mode: {
      heroScreen: {
        paddingY: "clamp(2rem, 5vw, 3rem)",
        minHeight: "calc(100svh - var(--header-h))",
      },
      screen: {
        paddingY: "clamp(4rem, 7vw, 6rem)",
        minHeight: "calc(100svh - var(--header-h))",
      },
      screenLite: {
        paddingY: "clamp(3.25rem, 6vw, 5rem)",
        minHeight: "clamp(24rem, calc(72svh - var(--header-h)), 40rem)",
      },
      contentBand: {
        paddingY: "clamp(3.75rem, 6vw, 5.5rem)",
      },
      legalPage: {
        paddingY: "clamp(2.75rem, 5vw, 4.25rem)",
      },
    },
  },
  typography: {
    display: "clamp(3rem, 8vw, 6.5rem)",
    h2: "clamp(2rem, 4.5vw, 3.5rem)",
    h3: "clamp(1.25rem, 1.8vw, 1.625rem)",
    numeral: "clamp(2.5rem, 5vw, 4.5rem)",
    lead: "clamp(1rem, 1.35vw, 1.25rem)",
    body: "1rem",
    small: "0.875rem",
    monoLabel: "0.6875rem",
  },
  leading: {
    display: "0.98",
    title: "1.08",
    body: "1.6",
  },
  tracking: {
    display: "-0.04em",
    title: "-0.02em",
    label: "0.1em",
  },
  radius: {
    control: "0.375rem",
    card: "0.125rem",
    pill: "999px",
  },
  surface: {
    paper: "#ffffff",
    paperSoft: "#f7f8fa",
    navy: "#172033",
    raised: "#ffffff",
  },
  border: {
    hairline: "rgba(22, 24, 29, 0.12)",
    hairlineStrong: "rgba(22, 24, 29, 0.24)",
    onNavy: "rgba(255, 255, 255, 0.14)",
    accentBlue: "rgba(36, 64, 116, 0.24)",
    accentRed: "rgba(216, 48, 52, 0.24)",
  },
  shadow: {
    overlay: "0 16px 48px rgba(22, 24, 29, 0.12)",
  },
  motion: {
    micro: "120ms",
    fast: "180ms",
    state: "240ms",
    medium: "300ms",
    slow: "650ms",
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  layout: {
    headerHeight: "4rem",
    headerHeightLg: "5rem",
  },
} as const;
