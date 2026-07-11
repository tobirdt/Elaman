import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { getSiteContent } from "@/lib/content/site";
import { isLocale, type Locale } from "@/lib/i18n";

export const runtime = "nodejs";

type OpenGraphImageContext = {
  params: Promise<{ locale: string }>;
};

const size = {
  width: 1200,
  height: 630,
};

const signalDots = [
  [0, 22, "#c7d0dc"],
  [52, 22, "#c7d0dc"],
  [104, 22, "#c7d0dc"],
  [156, 22, "#c7d0dc"],
  [26, 74, "#c7d0dc"],
  [78, 74, "#244074"],
  [130, 74, "#c7d0dc"],
  [182, 74, "#d83034"],
  [0, 126, "#c7d0dc"],
  [52, 126, "#c7d0dc"],
  [104, 126, "#c7d0dc"],
  [156, 126, "#c7d0dc"],
  [78, 178, "#c7d0dc"],
  [130, 178, "#c7d0dc"],
] as const;

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : "de";
}

export async function GET(_request: Request, { params }: OpenGraphImageContext) {
  const { locale: localeValue } = await params;
  const content = getSiteContent(resolveLocale(localeValue));
  const logoData = await readFile(
    join(process.cwd(), "public", "brand", "elaman-logo.png"),
    "base64",
  );
  const logoSrc = "data:image/png;base64," + logoData;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f7f8fa",
        color: "#16181d",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", height: 10, width: "100%" }}>
        <div style={{ display: "flex", flex: 4, backgroundColor: "#244074" }} />
        <div style={{ display: "flex", flex: 1, backgroundColor: "#d83034" }} />
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            display: "flex",
            width: 780,
            padding: "72px 70px 64px",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
          }}
        >
          <img src={logoSrc} width={470} height={180} alt="" />
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
            <div
              style={{
                display: "flex",
                color: "#244074",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: 3.5,
                textTransform: "uppercase",
              }}
            >
              {content.hero.visualBadge}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: -2,
              }}
            >
              {content.hero.title}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "74px 64px",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#172033",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              width: 208,
              height: 208,
            }}
          >
            {signalDots.map(([left, top, color], index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  position: "absolute",
                  left,
                  top,
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              color: "#c7d0dc",
              fontSize: 24,
              lineHeight: 1.45,
            }}
          >
            {content.hero.mobileBody}
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
