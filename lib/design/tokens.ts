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

/** @deprecated Use canonical section modes — resolved automatically in `Section`. */
export const legacySectionModes = {
  hero: "hero-screen",
  band: "content-band",
  compact: "legal-page",
} as const satisfies Record<string, SectionMode>;

export type LegacySectionMode = keyof typeof legacySectionModes;
export type SectionModeInput = SectionMode | LegacySectionMode;

export const surfaceLevels = ["card", "panel", "glass", "dark-panel"] as const;
export type SurfaceLevel = (typeof surfaceLevels)[number];

export function resolveSectionMode(mode: SectionModeInput): SectionMode {
  if (mode in legacySectionModes) {
    return legacySectionModes[mode as LegacySectionMode];
  }

  return mode;
}

export const designTokens = {
  color: {
    canvas: "#ffffff",
    canvasSoft: "#f7f8fa",
    canvasMuted: "#eef1f5",
    line: "#dfe4ea",
    text: {
      primary: "#16181d",
      secondary: "#555d6b",
      tertiary: "#788292",
    },
    brand: {
      blue: "#244074",
      red: "#d83034",
    },
    onDark: "#f7f8fa",
    focus: "rgba(36, 64, 116, 0.48)",
    focusRing: "rgba(36, 64, 116, 0.1)",
    selection: "rgba(36, 64, 116, 0.16)",
    /** Flat aliases — prefer semantic roles above for new code. */
    white: "#ffffff",
    porcelain: "#f7f8fa",
    mist: "#eef1f5",
    graphite: "#16181d",
    muted: "#555d6b",
    soft: "#788292",
    blue: "#244074",
    red: "#d83034",
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
    /** Legacy padding aliases — mirror canonical modes. */
    hero: "clamp(2rem, 5vw, 3rem)",
    screen: "clamp(4rem, 7vw, 6rem)",
    band: "clamp(3.75rem, 6vw, 5.5rem)",
    compact: "clamp(2.75rem, 5vw, 4.25rem)",
  },
  typography: {
    display: "clamp(2.75rem, 7vw, 5.9rem)",
    h1: "clamp(2.6rem, 5.8vw, 5.4rem)",
    h2: "clamp(2.1rem, 4.1vw, 3.75rem)",
    h3: "clamp(1.35rem, 2vw, 1.9rem)",
    lead: "clamp(1rem, 1.35vw, 1.25rem)",
    body: "1rem",
    small: "0.875rem",
    micro: "0.75rem",
  },
  leading: {
    display: "0.94",
    title: "1.04",
    body: "1.65",
  },
  tracking: {
    display: "-0.055em",
    title: "-0.04em",
    label: "0.16em",
  },
  radius: {
    control: "0.5rem",
    card: "0.75rem",
    panel: "0.75rem",
    pill: "999px",
  },
  surface: {
    white: "#ffffff",
    soft: "#f7f8fa",
    card: "rgba(255, 255, 255, 0.84)",
    panel: "#ffffff",
    glass: "rgba(255, 255, 255, 0.72)",
    glassStrong: "rgba(255, 255, 255, 0.88)",
    darkPanel: "#16181d",
  },
  border: {
    soft: "rgba(22, 24, 29, 0.1)",
    strong: "rgba(22, 24, 29, 0.11)",
    glass: "rgba(255, 255, 255, 0.72)",
    accentBlue: "rgba(36, 64, 116, 0.24)",
    accentRed: "rgba(216, 48, 52, 0.24)",
    darkPanel: "rgba(255, 255, 255, 0.1)",
    section: "rgba(22, 24, 29, 0.08)",
  },
  shadow: {
    none: "none",
    card: "0 14px 44px rgba(22, 24, 29, 0.045)",
    panel: "0 24px 80px rgba(22, 24, 29, 0.065)",
    float: "0 34px 110px rgba(22, 24, 29, 0.085)",
    button: "0 16px 42px rgba(22, 24, 29, 0.14)",
  },
  motion: {
    fast: "180ms",
    medium: "300ms",
    slow: "650ms",
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    rise: "0.75rem",
  },
  layout: {
    headerHeight: "4rem",
    headerHeightLg: "5rem",
  },
} as const;

/** @deprecated Use `designTokens.container` */
export const layoutTokens = {
  pageX: designTokens.container.pageX,
  containerPage: designTokens.container.page,
  containerContent: designTokens.container.content,
  containerCopy: designTokens.container.copy,
  containerNarrow: designTokens.container.narrow,
  containerLegal: designTokens.container.legal,
} as const;
