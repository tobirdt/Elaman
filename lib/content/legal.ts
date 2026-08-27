import type { Locale } from "@/lib/i18n";

export type LegalBlock = {
  title?: string;
  paragraphs: string[];
};

export type LegalDocumentContent = {
  title: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  blocks: LegalBlock[];
};

export const legalPageKinds = ["imprint", "privacy"] as const;
export type LegalPageKind = (typeof legalPageKinds)[number];

/**
 * Imprint and privacy policy.
 *
 * The privacy policy describes only processing that actually takes place on
 * this site: server access logs at the hosting provider, and the inquiry form
 * delivered through Resend. The site sets no cookies, embeds no third-party
 * services, and loads no external assets — the content security policy in
 * next.config.ts restricts connections to the site's own origin. Any change to
 * that behaviour has to be reflected here before it ships.
 */
const legalContent = {
  de: {
    imprint: {
      title: "Impressum",
      label: "Rechtliches",
      metaTitle: "Impressum",
      metaDescription: "Impressum und Anbieterkennzeichnung der Elaman GmbH, München.",
      blocks: [
        {
          title: "Angaben gemäß § 5 DDG",
          paragraphs: ["Elaman GmbH", "Implerstraße 24", "81371 München", "Deutschland"],
        },
        {
          title: "Vertreten durch",
          paragraphs: ["Geschäftsführer: Holger Rumscheidt"],
        },
        {
          title: "Kontakt",
          paragraphs: [
            "Telefon: +49 (0) 89 24 20 91 80",
            "Telefax: +49 (0) 89 24 20 91 81",
            "E-Mail: info@elaman.de",
          ],
        },
        {
          title: "Registereintrag",
          paragraphs: [
            "Registergericht: Amtsgericht München",
            "Registernummer: HRB 153662",
          ],
        },
        {
          title: "Steuerangaben",
          paragraphs: [
            "Steuernummer: 810 / 20915",
            "Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: DE814086265",
          ],
        },
        {
          title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
          paragraphs: ["Holger Rumscheidt, Implerstraße 24, 81371 München"],
        },
        {
          title: "Haftung für Inhalte",
          paragraphs: [
            "Die Inhalte dieser Website wurden sorgfältig zusammengestellt und beruhen auf den uns derzeit verfügbaren Informationen. Für Vollständigkeit, Richtigkeit und Aktualität können wir gleichwohl keine Haftung übernehmen. Wir behalten uns vor, die bereitgestellten Informationen zu ändern oder zu ergänzen.",
          ],
        },
        {
          title: "Haftung für Links",
          paragraphs: [
            "Für die Inhalte externer Websites, auf die von dieser Website aus verlinkt wird, sind ausschließlich deren Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar. Eine dauerhafte inhaltliche Kontrolle verlinkter Seiten ist ohne konkreten Anlass nicht zumutbar; bei Bekanntwerden von Rechtsverstößen entfernen wir entsprechende Links.",
          ],
        },
      ],
    },
    privacy: {
      title: "Datenschutzerklärung",
      label: "Rechtliches",
      metaTitle: "Datenschutzerklärung",
      metaDescription:
        "Wie die Elaman GmbH personenbezogene Daten auf dieser Website verarbeitet.",
      blocks: [
        {
          title: "Verantwortlicher",
          paragraphs: [
            "Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne des Art. 4 Nr. 7 DSGVO ist:",
            "Elaman GmbH, Implerstraße 24, 81371 München, Deutschland",
            "Telefon: +49 (0) 89 24 20 91 80 · E-Mail: info@elaman.de",
          ],
        },
        {
          title: "Was diese Website nicht tut",
          paragraphs: [
            "Diese Website setzt keine Cookies und verwendet keine Webanalyse, kein Tracking und keine Profilbildung. Es sind keine Dienste Dritter eingebunden — weder Kartendienste noch Schriftarten, Videos oder Social-Media-Elemente, die von externen Servern geladen würden. Alle Schriftarten werden von unserem eigenen Server ausgeliefert.",
            "Technisch ist das durch eine Content Security Policy abgesichert, die Verbindungen ausschließlich zur eigenen Domain zulässt. Es findet daher auch keine Datenübermittlung an Werbenetzwerke statt.",
          ],
        },
        {
          title: "Zugriffsdaten beim Besuch der Website",
          paragraphs: [
            "Beim Aufruf dieser Website übermittelt Ihr Browser technisch notwendige Daten, die in den Protokolldateien unseres Hosting-Dienstleisters erfasst werden: die IP-Adresse des anfragenden Geräts, Datum und Uhrzeit des Zugriffs, die aufgerufene Adresse, der HTTP-Statuscode, die übertragene Datenmenge sowie Angaben zu Browser und Betriebssystem.",
            "Diese Verarbeitung ist erforderlich, um die Website bereitzustellen, ihre Stabilität zu gewährleisten und Angriffe zu erkennen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt im sicheren und störungsfreien Betrieb. Eine Zusammenführung dieser Daten mit anderen Datenquellen oder eine Auswertung zu Werbezwecken findet nicht statt.",
          ],
        },
        {
          title: "Anfrageformular",
          paragraphs: [
            "Wenn Sie das Formular auf dieser Website nutzen, verarbeiten wir die von Ihnen eingegebenen Angaben: Vorname sowie E-Mail-Adresse und Ihre Nachricht als Pflichtfelder, Nachname und Unternehmen als freiwillige Angaben. Wir verwenden diese Daten ausschließlich, um Ihre Anfrage zu bearbeiten und Ihnen zu antworten.",
            "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf den Abschluss oder die Durchführung eines Vertrages gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO mit unserem berechtigten Interesse an der Beantwortung geschäftlicher Anfragen. Die Angabe der Daten ist freiwillig; ohne Vorname, E-Mail-Adresse und Nachricht können wir Ihre Anfrage jedoch nicht beantworten.",
            "Das Formular enthält ein für Sie unsichtbares Feld zur Abwehr automatisierter Einsendungen. Zusätzlich begrenzen wir die Zahl der Einsendungen kurzzeitig anhand eines aus der IP-Adresse abgeleiteten Werts, der nur im Arbeitsspeicher gehalten und nach wenigen Minuten verworfen wird.",
            "Ihre Anfrage wird per E-Mail an unser Postfach übermittelt und dort so lange aufbewahrt, wie es zur Bearbeitung erforderlich ist. Anschließend löschen wir sie, sofern keine handels- oder steuerrechtlichen Aufbewahrungspflichten entgegenstehen.",
          ],
        },
        {
          title: "Auftragsverarbeiter",
          paragraphs: [
            "Für Betrieb und Versand setzen wir Dienstleister ein, die Daten ausschließlich nach unserer Weisung und auf Grundlage eines Vertrages zur Auftragsverarbeitung nach Art. 28 DSGVO verarbeiten:",
            "Hosting und Auslieferung der Website: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.",
            "Versand der Formularnachrichten: Resend (Plus Five Five, Inc.), 2261 Market Street #5039, San Francisco, CA 94114, USA.",
            "Bei diesen Anbietern können personenbezogene Daten in die USA übermittelt werden. Die Übermittlung erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission nach Art. 46 Abs. 2 lit. c DSGVO in Verbindung mit ergänzenden Schutzmaßnahmen beziehungsweise, soweit der Anbieter zertifiziert ist, auf Grundlage des Angemessenheitsbeschlusses zum EU-US Data Privacy Framework nach Art. 45 DSGVO.",
          ],
        },
        {
          title: "Verschlüsselung",
          paragraphs: [
            "Diese Website wird ausschließlich über eine verschlüsselte TLS-Verbindung ausgeliefert. Sie erkennen das an der Adresse „https://“ und am Schlosssymbol Ihres Browsers. Damit sind auch die über das Formular übermittelten Angaben auf dem Transportweg geschützt.",
          ],
        },
        {
          title: "Ihre Rechte",
          paragraphs: [
            "Sie haben das Recht auf Auskunft über die zu Ihrer Person verarbeiteten Daten (Art. 15 DSGVO), auf Berichtigung unrichtiger Daten (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO) sowie auf Datenübertragbarkeit (Art. 20 DSGVO).",
            "Soweit wir Daten auf Grundlage eines berechtigten Interesses verarbeiten, können Sie dieser Verarbeitung nach Art. 21 DSGVO widersprechen. Wenden Sie sich für alle diese Anliegen an die oben genannte Adresse oder an info@elaman.de.",
            "Unabhängig davon steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Für uns zuständig ist das Bayerische Landesamt für Datenschutzaufsicht, Promenade 27, 91522 Ansbach.",
          ],
        },
        {
          title: "Stand dieser Erklärung",
          paragraphs: [
            "August 2026. Ändert sich die Datenverarbeitung auf dieser Website, passen wir diese Erklärung entsprechend an.",
          ],
        },
      ],
    },
  },
  en: {
    imprint: {
      title: "Site notice",
      label: "Legal",
      metaTitle: "Site notice",
      metaDescription: "Legal information about Elaman GmbH, Munich.",
      blocks: [
        {
          title: "Information pursuant to section 5 DDG",
          paragraphs: ["Elaman GmbH", "Implerstraße 24", "81371 Munich", "Germany"],
        },
        {
          title: "Represented by",
          paragraphs: ["Managing Director: Holger Rumscheidt"],
        },
        {
          title: "Contact",
          paragraphs: [
            "Phone: +49 (0) 89 24 20 91 80",
            "Fax: +49 (0) 89 24 20 91 81",
            "Email: info@elaman.de",
          ],
        },
        {
          title: "Commercial register",
          paragraphs: [
            "Registering court: Munich Local Court (Amtsgericht München)",
            "Registration number: HRB 153662",
          ],
        },
        {
          title: "Tax details",
          paragraphs: [
            "Tax number: 810 / 20915",
            "VAT identification number pursuant to section 27 a UStG: DE814086265",
          ],
        },
        {
          title: "Responsible for editorial content under section 18 (2) MStV",
          paragraphs: ["Holger Rumscheidt, Implerstraße 24, 81371 Munich, Germany"],
        },
        {
          title: "Liability for content",
          paragraphs: [
            "The content of this website has been compiled with care on the basis of the information currently available to us. We accept no liability for its completeness, accuracy or timeliness, and we reserve the right to amend or extend the information provided.",
          ],
        },
        {
          title: "Liability for links",
          paragraphs: [
            "The providers of external websites linked from this site are solely responsible for their content. No unlawful content was apparent at the time the links were created. Permanent monitoring of linked pages is not reasonable without specific grounds; we remove links as soon as we become aware of any legal violation.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy policy",
      label: "Legal",
      metaTitle: "Privacy policy",
      metaDescription: "How Elaman GmbH processes personal data on this website.",
      blocks: [
        {
          title: "Controller",
          paragraphs: [
            "The controller for data processing on this website within the meaning of Article 4 (7) GDPR is:",
            "Elaman GmbH, Implerstraße 24, 81371 Munich, Germany",
            "Phone: +49 (0) 89 24 20 91 80 · Email: info@elaman.de",
          ],
        },
        {
          title: "What this website does not do",
          paragraphs: [
            "This website sets no cookies and uses no web analytics, tracking or profiling. No third-party services are embedded — no maps, fonts, videos or social media elements loaded from external servers. All fonts are served from our own server.",
            "This is enforced technically by a content security policy that permits connections to our own domain only. No data is therefore transmitted to advertising networks.",
          ],
        },
        {
          title: "Access data when visiting the website",
          paragraphs: [
            "When you open this website, your browser transmits technically necessary data which is recorded in the log files of our hosting provider: the IP address of the requesting device, the date and time of access, the address requested, the HTTP status code, the volume of data transferred, and details of your browser and operating system.",
            "This processing is necessary to provide the website, keep it stable and detect attacks. The legal basis is Article 6 (1) (f) GDPR; our legitimate interest lies in secure and uninterrupted operation. This data is not combined with other sources and not evaluated for advertising purposes.",
          ],
        },
        {
          title: "Inquiry form",
          paragraphs: [
            "If you use the form on this website, we process the details you enter: first name, email address and your message as mandatory fields, surname and company as optional ones. We use this data solely to handle your inquiry and reply to you.",
            "The legal basis is Article 6 (1) (b) GDPR where the inquiry concerns the conclusion or performance of a contract, and otherwise Article 6 (1) (f) GDPR, our legitimate interest being to answer business inquiries. Providing the data is voluntary; without a first name, email address and message we cannot answer your inquiry.",
            "The form contains a field invisible to you which serves to block automated submissions. We additionally limit the number of submissions for a short period using a value derived from the IP address, which is held in memory only and discarded after a few minutes.",
            "Your inquiry is delivered to our mailbox by email and kept there for as long as handling it requires. We delete it afterwards unless commercial or tax retention obligations apply.",
          ],
        },
        {
          title: "Processors",
          paragraphs: [
            "We use service providers for operation and delivery which process data exclusively on our instructions and under a data processing agreement pursuant to Article 28 GDPR:",
            "Website hosting and delivery: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.",
            "Delivery of form messages: Resend (Plus Five Five, Inc.), 2261 Market Street #5039, San Francisco, CA 94114, USA.",
            "Personal data may be transferred to the USA by these providers. Such transfers take place on the basis of the European Commission's standard contractual clauses pursuant to Article 46 (2) (c) GDPR together with supplementary safeguards or, where the provider is certified, on the basis of the adequacy decision for the EU-US Data Privacy Framework pursuant to Article 45 GDPR.",
          ],
        },
        {
          title: "Encryption",
          paragraphs: [
            "This website is delivered exclusively over an encrypted TLS connection, which you can recognise from the “https://” address and the padlock symbol in your browser. The details you submit through the form are therefore protected in transit.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "You have the right to obtain information about the data we process about you (Article 15 GDPR), to have inaccurate data corrected (Article 16 GDPR), to erasure (Article 17 GDPR), to restriction of processing (Article 18 GDPR) and to data portability (Article 20 GDPR).",
            "Where we process data on the basis of a legitimate interest, you may object to that processing under Article 21 GDPR. Please direct any of these requests to the address above or to info@elaman.de.",
            "You also have the right to lodge a complaint with a supervisory authority. The authority responsible for us is the Bavarian Data Protection Authority (Bayerisches Landesamt für Datenschutzaufsicht), Promenade 27, 91522 Ansbach, Germany.",
          ],
        },
        {
          title: "Status of this policy",
          paragraphs: [
            "August 2026. Should data processing on this website change, we will amend this policy accordingly.",
          ],
        },
      ],
    },
  },
} satisfies Record<Locale, Record<LegalPageKind, LegalDocumentContent>>;

export function getLegalPageContent(locale: Locale, kind: LegalPageKind) {
  return legalContent[locale][kind];
}
