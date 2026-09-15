"use client";

/**
 * Last-resort boundary. It has to render its own <html>/<body> because it
 * replaces the root layout when that layout itself fails. Without this file a
 * production error shows Next's unstyled default screen.
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#16181d",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <main style={{ maxWidth: "34rem", padding: "2rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.6875rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#667286",
            }}
          >
            Elaman GmbH
          </p>
          <h1
            style={{
              margin: "1.25rem 0 0",
              fontSize: "1.9rem",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Diese Seite konnte nicht geladen werden.
          </h1>
          <p style={{ margin: "1.25rem 0 0", lineHeight: 1.65, color: "#555d6b" }}>
            Bitte laden Sie die Seite neu. Falls das Problem bestehen bleibt, erreichen
            Sie uns unter +49 89 24209180 oder info@elaman.de.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              minHeight: "2.75rem",
              padding: "0 1.25rem",
              border: "1px solid #16181d",
              borderRadius: "0.375rem",
              background: "#16181d",
              color: "#ffffff",
              font: "inherit",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Seite neu laden
          </button>
        </main>
      </body>
    </html>
  );
}
