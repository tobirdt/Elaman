# Elaman GmbH — current content blueprint

Authoritative factual and structural guide for the bilingual production website. Exact approved strings live in `lib/content/site.ts`, `lib/content/detail-pages.ts`, `lib/content/contact-page.ts`, and `lib/content/legal.ts`; this document defines what may be communicated across the five-section homepage, two focused dossier pages, and the contact page. See `AGENTS.md` for audience, purpose, and accessibility goal.

## 1. Positioning

Elaman GmbH is presented as an established Munich-based security-technology company. Its clients are exclusively security authorities and security-related organisations.

The site communicates:

- more than 25 years of experience in security technology and security solutions;
- technical analysis, advice, planning, and system integration;
- turnkey implementation;
- professional training and long-term support;
- covert audio and video observation, audio and video analysis, TSCM, radio monitoring for mobile communications in special-purpose vehicles, training, and technical support;
- direct access to the Munich office.

The public site remains intentionally discreet. Do not name customers, expose operational detail, or turn internal background knowledge into public claims.

German copy must read as original German, not as a line-by-line translation. Prefer direct, active sentences and established technical terminology. Avoid literal English compounds, inflated sales language, and abstract formulations when a precise German verb is available.

### Sentence rhythm (regression guard)

Consistent terminology is required; a consistent _sentence pattern_ is not. Repeating one rhetorical figure across the site is the clearest sign of machine-written copy, and it must not return:

- **No recurring triad.** `A, B und C` enumerations may appear where they list genuine technical elements, but the same three-part figure must not carry consecutive statements. Vary between two-part statements, a colon introducing an asyndetic list, and single-focus sentences.
- **One formula, one place.** A phrase such as `auf Aufgabe, Infrastruktur und Einsatzumfeld abgestimmt` may exist once. It must never appear on both the homepage and a dossier page — a visitor who follows the link one click deeper must not read the same sentence twice.
- **No empty aphorisms.** Headings must state something checkable. `Das System folgt der Aufgabe.` and `Jedes System beginnt mit einer klar definierten Aufgabe.` are examples of what to avoid; `Zuerst die Anforderungen, dann die Technik.` states an actual order of work.
- **No circular definitions.** A description must not open by restating its own term. Name what the system produces instead.
- **No empty intensifiers.** `anspruchsvoll`, `sorgfältig`, `praxisnah`, `geeignet`, and `bewährt` add no information. Delete them or replace them with the concrete fact they were standing in for.
- **Distinct error and call-to-action strings.** Two different failure conditions need two different messages; three sections need three different closing lines.

The same rules apply to English. Additionally, check English for German word order (fronted objects such as _What is possible legally, we establish in advance_) and for `a company for X` constructions. Keep the English register as measured as the German one — colloquialisms such as _we will sort it out_ do not belong in procurement copy.

### Image alt text

The heritage photography is atmospheric, not informative. An empty `alt` marks a picture as decorative so assistive technology skips it, and that is the correct choice whenever the image carries nothing the surrounding copy does not already say. If an alt text would have to explain a metaphor, the image is decorative. Only the Munich office is described factually. The same file must be treated the same way on the homepage and on a dossier page.

The public voice is calm, exact, and assured. It explains what Elaman does without sales pressure, unsupported superlatives, or theatrical security language. Prefer concrete terms such as `Aufgabe`, `Infrastruktur`, `Einsatzumfeld`, `Integration`, and `technische Betreuung`; do not vary terminology merely for effect. English is written independently in the same register and uses British spelling throughout.

Browser and social titles are localised, because the `<title>` is the most heavily weighted search field and a German visitor must find German terms in it:

- DE: `Elaman – Sicherheitstechnik und Sicherheitslösungen, München`
- EN: `Elaman – German Security Solutions, Munich`

`German Security Solutions` remains the English brand descriptor and stays in the signet, the English title, and the organisation data. It is not used as the German homepage title.

## 2. Verified factual anchors

| Fact                                                                            | Approved use                               |
| ------------------------------------------------------------------------------- | ------------------------------------------ |
| 25+ years of experience                                                         | One visible hero stat only                 |
| Security technology and security solutions                                      | Hero, profile, metadata                    |
| Established products combined with current technologies                         | Profile and advice                         |
| Analysis, planning, integration, and turnkey implementation                     | Advice process                             |
| Professional training and long-term support                                     | Advice process and systems ledger          |
| Five approved capability areas                                                  | Systems ledger                             |
| Clients are exclusively security authorities and security-related organisations | Profile and company dossier                |
| Munich office                                                                   | Contact image, details, and footer         |
| Holger Rumscheidt is named as General Manager                                   | Profile link, imprint, and structured data |

Do not add percentages, certifications, awards, project counts, client logos, named authorities, countries, or sovereignty statements without verified stakeholder approval.

## 3. Current information architecture

| Anchor     | Content responsibility                                                                 |
| ---------- | -------------------------------------------------------------------------------------- |
| `#hero`    | Company name, approved bridge tagline, and the single `25+` experience fact            |
| `#profile` | German/English Security Solutions title, technology combination, and project alignment |
| `#advice`  | Four-stage path from analysis and advice to training and long-term support             |
| `#systems` | Five capability categories without technical specifications                            |
| `#contact` | Munich office, direct contact routes, and the link to the contact route                |

The footer closes every route with the same three columns — navigation, contact, legal — outside the five-section viewport rhythm.

The site has three reciprocal localised routes beyond the homepage:

| Responsibility                    | German            | English       |
| --------------------------------- | ----------------- | ------------- |
| Company and working approach      | `/de/unternehmen` | `/en/company` |
| Systems and five capability areas | `/de/systeme`     | `/en/systems` |
| Inquiry form and direct contact   | `/de/kontakt`     | `/en/contact` |

These pages add useful context, not new claims. They must not become thin keyword pages, product catalogues, or substitutes for a factual source that is not available.

The global header exposes exactly these three pages plus the locale switch — Unternehmen/Company, Systeme/Systems, Kontakt/Contact — with no in-page anchors; the points-only signet is the desktop Home action, and the mobile menu prepends an explicit Start/Home entry. The footer repeats the same navigation, the contact details, and the legal links on every page (see § 9).

## 4. Hero

Required content:

- `Elaman`
- Approved tagline:
  - DE: `Das Bindeglied zwischen Vertrauen und Sicherheit.`
  - EN: `The link between trust and security.`
- One `25+` stat with a locale-appropriate experience label.

The hero intentionally stays concise. Company positioning and service context begin in the Profile section. Do not repeat the `25+` statement or add a service-range paragraph in the hero.

## 5. Profile

Label and title:

- Label: `Elaman`
- DE title: `Lösungen und Produkte im Bereich der Sicherheitstechnik.`
- EN title: `German Security Solutions.`

The three statements communicate:

1. established products and new technologies form integrated security systems;
2. each solution is aligned with infrastructure, operating environment, and organisational project requirements;
3. Elaman works exclusively for security authorities and security-related organisations. Do not add communications providers or private-market audiences.

The section closes with one factual management reference:

- DE: `Geschäftsführung: Holger Rumscheidt`
- EN: `Managing Director: Holger Rumscheidt`

The name links to the existing imprint. It must not be repeated elsewhere on the homepage or expanded into biographical claims without approved source material.

The Company dossier may repeat the management name once as a factual route to the imprint. Without an approved portrait or biography, its narrative is carried by the Munich office, the four-stage process told in full, and the supplied stone-bridge motif.

## 6. Advice

Title:

- DE: `Von der Analyse bis zur langfristigen Betreuung.`
- EN: `From initial analysis to long-term support.`

The ordered process is fixed:

1. Analyse & Beratung / Analysis & consulting
2. Planung & Integration / Planning & integration
3. Schlüsselfertige Umsetzung / Turnkey implementation
4. Schulung & Betreuung / Training & support

Descriptions remain concise and non-operational. The process may explain that Elaman assesses technical requirements, combines suitable technologies, accompanies implementation and commissioning, and provides professional training and long-term support.

The homepage keeps the short form of these four steps; the Company dossier tells the same four steps at length. The two texts must stay distinct — no sentence may appear in both.

## 7. Systems

Title:

- DE: `Systeme für Kommunikation, Observation und Auswertung.`
- EN: `Systems for communications, observation and analysis.`

The approved capability labels are:

| Sequence | German                                                   | English                                                                        |
| -------: | -------------------------------------------------------- | ------------------------------------------------------------------------------ |
|       01 | Verdeckte Audio- und Videoobservation                    | Covert audio and video surveillance                                            |
|       02 | Audio- und Videoauswertesysteme                          | Audio and video analysis systems                                               |
|       03 | Lauschabwehr (TSCM)                                      | Technical surveillance countermeasures (TSCM)                                  |
|       04 | Funkerfassungssysteme für Mobilfunk in Spezialfahrzeugen | Radio monitoring systems for mobile communications in special-purpose vehicles |
|       05 | Schulung und Betreuung                                   | Training and support                                                           |

The homepage ledger names capability categories only. The Systems dossier may add concise descriptions of each category and the project-specific integration approach. It does not expose technical specifications, customers, countries, operational scenarios, or performance claims.

## 8. Contact

Approved public contact facts:

- Elaman GmbH
- Implerstraße 24
- 81371 München / Munich, Germany
- `+49 89 24209180`
- `info@elaman.de`

The form collects first name, optional last name, optional company, email, message, and a hidden honeypot field. Present it as a standard inquiry, never as a secure or confidential portal.

The contact page (`/de/kontakt` ↔ `/en/contact`) is the only place the form appears. Its content:

- Eyebrow `Kontakt` / `Contact`; title DE `Sprechen Sie mit uns.`, EN `Talk to us.`; a one-sentence lead naming the Munich team and inviting a short description of the task.
- A hero split with the Munich office photograph (factual alt text), matching the Company dossier's hero image and role.
- A ruled `dl` of the direct contact facts (address, phone, email) beside the form, form title `Ihr Anliegen` / `Your inquiry`, and a note that required fields are marked with `*`.
- A short privacy note below the form linking to the localised privacy policy — no separate consent checkbox, no map service.

The homepage contact section repeats none of that copy: it names the office, lists the direct routes as a ruled `dl`, and leads to the contact page with one primary action (`Anfrage senden` / `Send an inquiry`). It contains no form.

## 9. Metadata and navigation

Every page below the homepage names its own breadcrumb step, in `breadcrumb` next to its other strings. It is the page's short name, not its title: `Systeme`, `Kontakt`, `Datenschutz`, `Seite nicht gefunden`. The first step, `Start` / `Home`, and the landmark label live once in `lib/content/site.ts`. The rendered trail and the `BreadcrumbList` structured data read the same strings.

Document titles carry a budget of 60 characters including the ` | Elaman` suffix, which `tests/unit/page-content.test.ts` enforces. A browser tab shows roughly twenty characters and a search result about sixty, so anything longer is cut where nobody chose to cut it. The suffix is the short brand: the legal form belongs in the imprint and in the structured data, not in every tab. The homepage sets its title outright and takes no suffix.

- German default: `/de`
- English: `/en`
- Localised dossier pairs: `/de/unternehmen` ↔ `/en/company` and `/de/systeme` ↔ `/en/systems`
- Localised contact route: `/de/kontakt` ↔ `/en/contact`
- Legal routes are localised: `/de/impressum` ↔ `/en/site-notice` and `/de/datenschutz` ↔ `/en/privacy-policy`. The retired `/imprint` and `/private-policy` paths redirect permanently to the German documents.
- Global header navigation:
  - Desktop DE: Unternehmen, Systeme, Kontakt
  - Desktop EN: Company, Systems, Contact
  - Mobile prepends Start / Home; the points-only signet remains the desktop home action.
  - Every entry opens a page of its own; the menu carries no anchors.
- The active rule represents the current page and is matched on the exact path.
- The footer is identical on every route: Navigation (Start, Unternehmen, Systeme, Kontakt), Kontakt (address, phone, email), Rechtliches (Impressum, Datenschutzerklärung), plus copyright and the locale switch.
- Metadata may state security technology, technical services, advice, surveillance/observation, analysis, TSCM, radio monitoring for mobile communications, training, and support.
- The company may be associated with the alternate brand spellings `Elaman` and `ELAMAN` in organisation data.
- Holger Rumscheidt may be associated with Elaman through the factual management reference in Profile, the supplied imprint, and the corresponding entity relationship. Do not create a biographical profile without approved source material.
- Broad technical vocabulary may appear in localised descriptions and structured data only where it matches visible homepage content.
- Do not use hidden keyword lists, duplicate or doorway search pages, repetitive keyword variants, or thin person-profile pages. Search language must remain useful, natural copy.

## 10. Legal boundary

Both legal documents exist in German and English and are reachable from the footer in the reader's own language.

The privacy policy describes only processing that actually happens: access logs at the hosting provider and the inquiry form delivered through Resend. It previously declared Google Analytics, Google Maps, cookies and Flash storage that the site never used, and cited the EU-US Privacy Shield, invalid since 2020. Those sections were removed and the contact-form processing that Article 13 GDPR requires was added.

Retention is stated by criterion, not by a fixed period: access logs are kept only as long as secure operation requires and are deleted afterwards, extended only to investigate a specific security incident; form submissions are forwarded to the team's mailbox by email and kept there only as long as handling the inquiry requires, unless a commercial or tax retention duty applies. The form's processing runs through the hosting provider's data centre in Frankfurt am Main, which the policy names explicitly. The document is dated September 2026 and must be re-dated whenever it changes.

If the site ever gains analytics, an embed, a cookie or a new processor, this document has to be updated in the same change. Named processors (currently Vercel for hosting and Resend for form-message delivery) must match the actual deployment.

**Still required before launch: sign-off by legal counsel.** The rewrite improves factual accuracy over the previous text but is not a substitute for review, and the imprint's tax and register details should be confirmed against current records.

## 11. Change protocol

When public copy changes:

1. verify the fact and stakeholder approval;
2. update this blueprint if the factual or structural boundary changes;
3. update both locales in `lib/content/site.ts` or `lib/content/detail-pages.ts` as appropriate;
4. check wrapping on mobile, tablet, short desktop, and wide desktop;
5. re-check metadata if positioning changed.
