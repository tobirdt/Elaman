export type ContactEmailPayload = {
  firstName: string;
  lastName?: string;
  company?: string;
  email: string;
  message: string;
  website?: string;
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
  return value && value.trim().length > 0 ? value : "Not provided";
}

export function createContactEmailContent(
  payload: ContactEmailPayload,
  timestamp = new Date(),
): ContactEmailContent {
  const submittedAt = timestamp.toISOString();
  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(" ");
  const subjectName = fullName || payload.email;
  const subject = `Elaman website inquiry from ${subjectName}`;

  const rows = [
    ["First name", payload.firstName],
    ["Last name", formatOptional(payload.lastName)],
    ["Company", formatOptional(payload.company)],
    ["Email", payload.email],
    ["Timestamp", submittedAt],
    ["Source", "Elaman website contact form"],
  ] as const;

  const text = [
    "Elaman website contact form",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
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
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;background:#f7f8fa;color:#16181d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
      <div style="border:1px solid #dfe4ea;background:#ffffff;border-radius:10px;padding:24px;">
        <p style="margin:0 0 8px;color:#244074;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Elaman GmbH</p>
        <h1 style="margin:0 0 20px;color:#16181d;font-size:24px;line-height:1.2;">Website inquiry</h1>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 24px;">
          ${htmlRows}
        </table>
        <p style="margin:0 0 8px;color:#555d6b;font-size:13px;font-weight:700;">Message</p>
        <div style="white-space:pre-wrap;border:1px solid #dfe4ea;background:#f7f8fa;border-radius:8px;padding:16px;color:#16181d;font-size:14px;line-height:1.65;">${escapeHtml(payload.message)}</div>
      </div>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}
