export type ContactEmailPayload = {
  firstName: string;
  lastName?: string;
  company?: string;
  email: string;
  message: string;
  website?: string;
  /** Language the inquiry was written in, so the reply can match it. */
  locale?: "de" | "en";
};

type ContactEmailContent = {
  subject: string;
  text: string;
  html: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatOptional(value: string | undefined) {
  return value && value.trim().length > 0 ? value : "—";
}

/**
 * Local Munich time, spelled out. The team reads this in a mail client, where
 * a raw UTC ISO string is needlessly hard to place.
 */
function formatSubmittedAt(timestamp: Date) {
  const formatted = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(timestamp);

  return `${formatted} (Europe/Berlin)`;
}

const localeLabels = {
  de: "Deutsch",
  en: "Englisch (bitte auf Englisch antworten)",
} as const;

function formatSubjectValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function createContactEmailContent(
  payload: ContactEmailPayload,
  timestamp = new Date(),
): ContactEmailContent {
  const submittedAt = formatSubmittedAt(timestamp);
  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(" ");
  const subjectName = formatSubjectValue(fullName || payload.email);
  const subjectCompany = payload.company
    ? `, ${formatSubjectValue(payload.company)}`
    : "";
  const subject = `Anfrage über elaman.de: ${subjectName}${subjectCompany}`;

  const rows = [
    ["Vorname", payload.firstName],
    ["Nachname", formatOptional(payload.lastName)],
    ["Unternehmen", formatOptional(payload.company)],
    ["E-Mail", payload.email],
    ["Sprache", localeLabels[payload.locale ?? "de"]],
    ["Eingegangen", submittedAt],
    ["Quelle", "Anfrageformular auf elaman.de"],
  ] as const;

  const text = [
    "Neue Anfrage über elaman.de",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Nachricht:",
    payload.message,
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding:8px 12px;border-bottom:1px solid #dfe4ea;color:#555d6b;font-size:13px;font-weight:600;">${escapeHtml(label)}</th>
          <td style="padding:8px 12px;border-bottom:1px solid #dfe4ea;color:#16181d;font-size:13px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;background:#f7f8fa;color:#16181d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
      <div style="border:1px solid #dfe4ea;background:#ffffff;border-radius:10px;padding:24px;">
        <p style="margin:0 0 8px;color:#244074;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Elaman GmbH</p>
        <h1 style="margin:0 0 20px;color:#16181d;font-size:24px;line-height:1.2;">Neue Anfrage über die Website</h1>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 24px;">
          ${htmlRows}
        </table>
        <p style="margin:0 0 8px;color:#555d6b;font-size:13px;font-weight:700;">Nachricht</p>
        <div style="white-space:pre-wrap;border:1px solid #dfe4ea;background:#f7f8fa;border-radius:8px;padding:16px;color:#16181d;font-size:14px;line-height:1.65;">${escapeHtml(payload.message)}</div>
      </div>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}
