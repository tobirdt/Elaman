# Elaman GmbH — current content blueprint

Authoritative factual and structural guide for the bilingual production website. Exact approved strings live in `lib/content/site.ts`; this document defines what may be communicated and how the six-section homepage is organised.

## 1. Positioning

Elaman GmbH is presented as an established German communications and security-engineering company serving professional public-sector and security-related contexts.

The site communicates:

- long-standing experience in communications and security engineering;
- technical analysis, advice, planning, and system integration;
- turnkey implementation;
- professional training and long-term support;
- communications, observation, protection, countermeasure, and forensics capabilities;
- direct access to the Munich office.

The public site remains intentionally discreet. Do not name customers, expose operational detail, or turn internal background knowledge into public claims.

The canonical browser and social title in both locales is `Elaman – German Security Solutions`.

## 2. Verified factual anchors

| Fact                                                        | Approved use                       |
| ----------------------------------------------------------- | ---------------------------------- |
| 20+ years of experience                                     | One visible hero stat only         |
| Communications and security engineering                     | Hero, profile, metadata            |
| Established products combined with current technologies     | Profile and advice                 |
| Analysis, planning, integration, and turnkey implementation | Advice process                     |
| Professional training and long-term support                 | Advice process and systems ledger  |
| Eight existing capability areas                             | Systems ledger                     |
| Munich office                                               | Contact image, details, and footer |

Do not add percentages, certifications, awards, project counts, client logos, named authorities, countries, or sovereignty statements without verified stakeholder approval.

## 3. Current information architecture

| Anchor        | Content responsibility                                                                 |
| ------------- | -------------------------------------------------------------------------------------- |
| `#hero`       | Company name, original bridge tagline, short introduction, and the single `20+` fact   |
| `#profile`    | German/English Security Solutions title, technology combination, and project alignment |
| `#advice`     | Four-stage path from analysis and advice to training and long-term support             |
| `#systems`    | Eight capability categories without technical specifications                           |
| `#protection` | Four protection and countermeasure areas with authorisation context                    |
| `#contact`    | Munich office, direct contact routes, and inquiry form                                 |

The footer is a compact legal conclusion outside the six-section viewport rhythm.

## 4. Hero

Required content:

- `Elaman`
- Original tagline:
  - DE: `Ihre Brücke zu Vertrauen und Sicherheit.`
  - EN: `Your bridge to trust and security.`
- One concise introduction to communications and security technology.
- One `20+` stat with a locale-appropriate experience label.

Do not repeat the `20+` statement or add a second service-range paragraph in the hero.

## 5. Profile

Title:

- DE: `Elaman — Deutsche Sicherheitslösungen.`
- EN: `Elaman — German Security Solutions.`

The two statements communicate:

1. established products and current technologies form integrated systems for demanding communications and security environments;
2. each solution is aligned with infrastructure, operating environment, and organisational project requirements.

## 6. Advice

Title:

- DE: `Von der Analyse bis zur langfristigen Betreuung.`
- EN: `From initial analysis to long-term support.`

The ordered process is fixed:

1. Analyse & Beratung / Analysis & advice
2. Planung & Integration / Planning & integration
3. Schlüsselfertige Umsetzung / Turnkey implementation
4. Schulung & Betreuung / Training & support

Descriptions remain concise and non-operational. The process may explain that Elaman assesses technical requirements, combines suitable technologies, accompanies implementation and commissioning, and provides professional training and long-term support.

## 7. Systems

Title:

- DE: `Systeme für Kommunikation, Observation und Auswertung.`
- EN: `Systems for communications, observation and analysis.`

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

The ledger names capability categories only. It does not expose technical specifications, customers, countries, operational scenarios, or performance claims.

## 8. Protection

The protection composition is the principal red semantic moment. It may describe:

- ECM / Counter-RCIED;
- authorised portable, vehicle, and building jamming systems;
- TSCM advice and training;
- structural, mechanical, and electronic concepts for shielded rooms.

Keep authorisation and confidentiality context explicit. Avoid tactical claims and performance promises.

## 9. Contact

Approved public contact facts:

- Elaman GmbH
- Implerstraße 24
- 81371 München / Munich, Germany
- `+49 (0) 89 - 24 20 91 80`
- `info@elaman.de`

The form collects first name, optional last name, optional company, email, message, and a hidden honeypot field. Present it as a standard inquiry, never as a secure or confidential portal.

## 10. Metadata and navigation

- German default: `/de`
- English: `/en`
- Legal routes: `/imprint` and `/private-policy`
- Header anchors: Home, Profile, Advice, Surveillance/Observation, Protection, Contact
- Metadata may state communications/security engineering, technical services, advice, surveillance/observation, protection, training, and support.

## 11. Legal boundary

The imprint and privacy policy are preserved from the supplied source. They require responsible legal review before substantive rewriting. Marketing cleanup must not silently alter legal copy.

## 12. Change protocol

When public copy changes:

1. verify the fact and stakeholder approval;
2. update this blueprint if the factual or structural boundary changes;
3. update both locales in `lib/content/site.ts`;
4. check wrapping on mobile, tablet, short desktop, and wide desktop;
5. re-check metadata if positioning changed.
