export const designTokens = {
  color: {
    white: "#ffffff",
    porcelain: "#f7f8fa",
    mist: "#eef1f5",
    line: "#dfe4ea",
    graphite: "#16181d",
    graphiteMuted: "#555d6b",
    graphiteSoft: "#788292",
    elamanBlue: "#244074",
    elamanRed: "#d83034",
  },
  spacing: {
    pageX: "clamp(1.25rem, 4vw, 4rem)",
    sectionY: "clamp(5rem, 10vw, 9rem)",
    sectionYCompact: "clamp(3.5rem, 7vw, 6rem)",
  },
  radius: {
    xs: "0.375rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
  },
  typography: {
    display: "clamp(3.4rem, 8vw, 7.7rem)",
    h1: "clamp(3rem, 6vw, 6rem)",
    h2: "clamp(2.1rem, 4vw, 4.1rem)",
    h3: "clamp(1.25rem, 2vw, 1.65rem)",
    body: "1rem",
    lead: "clamp(1.15rem, 1.7vw, 1.45rem)",
    small: "0.875rem",
  },
  glass: {
    background: "rgba(255, 255, 255, 0.74)",
    border: "rgba(22, 24, 29, 0.1)",
    shadow: "0 24px 80px rgba(22, 24, 29, 0.08)",
  },
} as const;
