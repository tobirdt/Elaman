# Elaman GmbH — current content blueprint

Authoritative factual and structural guide for the bilingual production website. Exact approved strings live in `lib/content/site.ts`; this document defines what may be communicated and how the current page is organised.

## 1. Positioning

Elaman GmbH is presented as an established German communications and security-engineering company serving professional public-sector and security-related contexts.

The site must communicate:

- long-standing experience in communications and security engineering;
- technical advice and system integration;
- turnkey implementation;
- professional training and long-term support;
- communications, observation, protection, countermeasure, and forensics capabilities;
- direct access to the Munich office.

The public site remains intentionally discreet. Do not name customers, expose operational detail, or turn internal background knowledge into public claims.

## 2. Verified factual anchors

| Fact                                                                             | Approved use                            |
| -------------------------------------------------------------------------------- | --------------------------------------- |
| 20+ years of experience                                                          | One visible hero stat only              |
| Communications and security engineering                                          | Hero, overview, metadata                |
| Technical advice and system integration                                          | Hero and overview                       |
| Turnkey implementation                                                           | Hero body                               |
| Professional training and after-sales support                                    | Hero body and capability ledger         |
| Munich office                                                                    | Contact band and direct contact details |
| Original navigation areas: Advice, Surveillance/Observation, Protection, Contact | Header anchors                          |

Do not add percentages, certifications, awards, project counts, client logos, or sovereignty statements without verified stakeholder approval.

## 3. Current information architecture

| Anchor        | Content responsibility                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `#hero`       | Company name, original bridge tagline, short introduction, service-range paragraph, single 20+ experience fact |
| `#experience` | German/English Security Solutions title and three short company statements                                     |
| `#systems`    | Internal target at the capability ledger                                                                       |
| `#protection` | Protection label, title, short context, and four factual areas                                                 |
| `#contact`    | Munich office, direct contact routes, and inquiry form                                                         |

There is no separate Story, Trust, Systems, Delivery, or Support section in the current product. Their relevant content is consolidated into the four compositions above.

## 4. Hero

Required content:

- `Elaman`
- Original tagline:
  - DE: `Ihre Brücke zu Vertrauen und Sicherheit.`
  - EN: `Your bridge to trust and security.`
- One concise introduction to communications and security technology.
- One concise service-range paragraph.
- One `20+` stat with a locale-appropriate experience label.

Do not repeat the 20+ statement elsewhere on the page.

## 5. Company overview and capability ledger

Title:

- DE: `Elaman — Deutsche Sicherheitslösungen.`
- EN: `Elaman — German Security Solutions.`

The three paragraphs communicate:

1. established products plus current technologies form integrated systems;
2. work starts with precise task analysis and continues beyond commissioning;
3. each solution is aligned with infrastructure, operating environment, and organisational requirements.

Capability labels:

| Sequence | German                      | English                          |
| -------: | --------------------------- | -------------------------------- |
|       01 | Audio- und Videoobservation | Audio and video observation      |
|       02 | Geoinformationssysteme      | Geographical information systems |
|       03 | Technische Gegenüberwachung | Technical counter-surveillance   |
|       04 | Spezialfahrzeuge            | Special-purpose vehicles         |
|       05 | Führungszentralen           | Command and control centres      |
|       06 | Intelligence-Fusion-Systeme | Intelligence fusion systems      |
|       07 | Schulung und Betreuung      | Training & Support               |
|       08 | Datenforensik               | Data forensics                   |

The ledger names capability categories only; it does not expose technical specifications.

## 6. Protection

The protection composition is the principal red semantic moment. It may describe:

- ECM / Counter-RCIED;
- authorised portable, vehicle, and building jamming systems;
- TSCM advice and training;
- structural, mechanical, and electronic concepts for shielded rooms.

Keep authorisation and confidentiality context explicit. Avoid tactical claims and performance promises.

## 7. Contact

Approved public contact facts:

- Elaman GmbH
- Implerstraße 24
- 81371 München / Munich, Germany
- `+49 (0) 89 - 24 20 91 80`
- `info@elaman.de`

The form collects first name, optional last name, optional company, email, message, and a hidden honeypot field. Present it as a standard inquiry, never as a secure or confidential portal.

## 8. Metadata and navigation

- German default: `/de`
- English: `/en`
- Legal routes: `/imprint` and `/private-policy`
- Header anchors: Hero, Advice, Surveillance/Observation, Protection, Contact
- Metadata may state communications/security engineering, technical services, advice, surveillance/observation, protection, training, and support.

## 9. Legal boundary

The imprint and privacy policy are preserved from the supplied source. They require responsible legal review before substantive rewriting. Marketing cleanup must not silently alter legal copy.

## 10. Change protocol

When public copy changes:

1. verify the fact and stakeholder approval;
2. update this blueprint if the factual or structural boundary changes;
3. update both locales in `lib/content/site.ts`;
4. check wrapping on mobile, tablet, and desktop;
5. re-check metadata if positioning changed.
