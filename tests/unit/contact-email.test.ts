import { describe, expect, it } from "vitest";

import {
  createContactEmailContent,
  type ContactEmailPayload,
} from "@/lib/email/contact-email";

const timestamp = new Date("2026-03-04T09:30:00.000Z");

function payload(overrides: Partial<ContactEmailPayload> = {}): ContactEmailPayload {
  return {
    firstName: "Anna",
    lastName: "Brandt",
    company: "Behörde für Innere Sicherheit",
    email: "anna.brandt@example.org",
    message: "We would like to discuss a technical evaluation with your team.",
    locale: "de",
    ...overrides,
  };
}

describe("createContactEmailContent", () => {
  it("escapes HTML in the message so injected markup cannot execute", () => {
    const { html } = createContactEmailContent(
      payload({ message: "<script>alert('xss')</script> Please respond." }),
      timestamp,
    );

    expect(html).not.toContain("<script>alert");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;/script&gt;");
    expect(html).toContain("&#39;xss&#39;");
  });

  it("escapes quotes and ampersands in field values", () => {
    const { html } = createContactEmailContent(
      payload({ company: 'Meier & Sons "Security"' }),
      timestamp,
    );

    expect(html).toContain("Meier &amp; Sons &quot;Security&quot;");
    expect(html).not.toContain('Meier & Sons "Security"');
  });

  it("does not escape the plain-text body, which carries no markup", () => {
    const { text } = createContactEmailContent(
      payload({ message: "<script>alert('xss')</script>" }),
      timestamp,
    );

    expect(text).toContain("<script>alert('xss')</script>");
  });

  it("strips line breaks from the subject", () => {
    const { subject } = createContactEmailContent(
      payload({ firstName: "Anna\r\nBcc: victim@example.org", lastName: "Brandt" }),
      timestamp,
    );

    expect(subject).not.toContain("\n");
    expect(subject).not.toContain("\r");
    expect(subject).toContain(
      "Anfrage über elaman.de: Anna Bcc: victim@example.org Brandt",
    );
  });

  it("names the company in the subject when one is given", () => {
    const { subject } = createContactEmailContent(
      payload({ firstName: "Anna", lastName: "Brandt", company: "Stadt Musterhausen" }),
      timestamp,
    );

    expect(subject).toBe("Anfrage über elaman.de: Anna Brandt, Stadt Musterhausen");
  });

  it("falls back to the email address when no name is present", () => {
    const { subject } = createContactEmailContent(
      payload({ firstName: "", lastName: undefined }),
      timestamp,
    );

    expect(subject).toContain("Anfrage über elaman.de: anna.brandt@example.org");
  });

  it("renders missing optional fields as a dash", () => {
    const { text, html } = createContactEmailContent(
      payload({ lastName: undefined, company: undefined }),
      timestamp,
    );

    expect(text).toContain("Nachname: —");
    expect(text).toContain("Unternehmen: —");
    expect(html).toContain("—");
  });

  it("names the inquiry language so the reply can match it", () => {
    const german = createContactEmailContent(payload({ locale: "de" }), timestamp);
    const english = createContactEmailContent(payload({ locale: "en" }), timestamp);
    const fallback = createContactEmailContent(payload({ locale: undefined }), timestamp);

    expect(german.text).toContain("Sprache: Deutsch");
    expect(english.text).toContain("Sprache: Englisch (bitte auf Englisch antworten)");
    expect(fallback.text).toContain("Sprache: Deutsch");
  });

  it("stamps the submission time in the Munich time zone", () => {
    const { text } = createContactEmailContent(payload(), timestamp);

    expect(text).toContain("(Europe/Berlin)");
    expect(text).toContain("Quelle: Anfrageformular auf elaman.de");
  });
});
