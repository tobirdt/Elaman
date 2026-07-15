# Elaman GmbH — Content Blueprint

Authoritative content plan for the bilingual single-page website. This document defines **what to say** in each section. It is aligned with the original Elaman positioning, verified company facts, and the institutional design direction in `DESIGN_SYSTEM.md`.

**Status:** Planning reference only. Do not treat draft copy as legally approved. Implement in `lib/content/site.ts` during Implementation Plan **Step 3** (and refine per-section in Steps 4–11).

**Related docs:** `DESIGN_DIRECTION.md` (visual intent) · `DESIGN_SYSTEM.md` (rules) · `IMPLEMENTATION_PLAN.md` (build order)

---

## Source positioning (anchor facts)

Use these as non-negotiable anchors. All section copy should trace back to one or more of them.

| Fact                                                                                                                          | Usage                                |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| 20+ years in communications and security engineering                                                                          | Hero, trust, story step 1            |
| Extensive knowledge of government security and safety requirements of public authorities                                      | Trust, advice capability             |
| Comprehensive security solutions, technical services, high-quality advice, professional training                              | Capabilities overview                |
| Clients: governmental authorities, public authorities, law-enforcement-related organisations, communication service providers | Trust pillars, hero intro            |
| Turnkey project implementation using state-of-the-art technology                                                              | Delivery, story final steps          |
| High-quality after-sales service and in-depth training                                                                        | Delivery, training capability, story |
| Communications domains: network-based, private networks, wireless, cellular, satellite                                        | Systems, story communications step   |
| Original service areas: **Advice**, **Surveillance**, **Protection**, **Contact**                                             | Capabilities map, navigation intent  |

**Brand line (original):** _Your bridge to trust and security._ / _Ihre Brücke zu Vertrauen und Sicherheit._

**Company descriptor (original):** _German Security Solutions_ / _Deutsche Sicherheitslösungen_

---

## 1. English homepage section structure

Single-page scroll at `/en`. Order matches `app/(marketing)/[locale]/page.tsx`.

The approved heritage-modernisation pass condenses the former eight-section programme into the recognisable rhythm of the previous Elaman website. Existing content keys remain available as structured copy sources, but not every key is rendered as a standalone section.

| #   | Section ID    | Component            | Purpose                                                                                                |
| --- | ------------- | -------------------- | ------------------------------------------------------------------------------------------------------ |
| 1   | `#hero`       | `HeroSection`        | Split image/copy introduction with company identity, original tagline, and verified experience copy    |
| 2   | `#experience` | `CapabilityOverview` | Navy company overview followed by the eight-field solution index; `#systems` anchors the index itself  |
| 3   | `#protection` | `ProtectionSection`  | Heritage tiger image band followed by factual countermeasure and protective-infrastructure information |
| 4   | `#contact`    | `ContactSection`     | Munich office image band, factual contact row, and validated inquiry form                              |

**Metadata**

- **Title:** `German Security Solutions | Elaman GmbH`
- **Description:** `Elaman GmbH provides communications and security engineering, technical services, advice, surveillance and protection solutions, professional training, and after-sales support for public authorities and security-sector clients.`

---

## 2. German homepage section structure

Single-page scroll at `/de`. Same order and anchors as English.

| #   | Section ID    | Component            | Purpose                                                                                                |
| --- | ------------- | -------------------- | ------------------------------------------------------------------------------------------------------ |
| 1   | `#hero`       | `HeroSection`        | Geteilter Bild-/Text-Einstieg mit Unternehmensidentität, Original-Tagline und belegter Erfahrung       |
| 2   | `#experience` | `CapabilityOverview` | Dunkelblaue Unternehmensübersicht mit achtteiligem Lösungsindex; `#systems` verankert den Index selbst |
| 3   | `#protection` | `ProtectionSection`  | Historisches Tiger-Bildband mit sachlichen Informationen zu Gegenmaßnahmen und Schutzinfrastruktur     |
| 4   | `#contact`    | `ContactSection`     | Münchner Bürobild, sachliche Kontaktzeile und validiertes Anfrageformular                              |

**Metadata**

- **Title:** `Deutsche Sicherheitslösungen | Elaman GmbH`
- **Description:** `Elaman GmbH bietet Kommunikations- und Sicherheitstechnik, technische Dienstleistungen, Beratung, Observation und Schutzlösungen, professionelle Schulungen und After-Sales-Service für Behörden und Sicherheitskunden.`

---

## 3. Navigation labels (EN / DE)

### Main navigation

| Anchor        | English      | Deutsch     | Notes                                                             |
| ------------- | ------------ | ----------- | ----------------------------------------------------------------- |
| `#hero`       | Home         | Start       | Returns to the split company introduction                         |
| `#experience` | Advice       | Beratung    | Company context and integrated advisory approach                  |
| `#systems`    | Surveillance | Observation | Opens the solution-domain index without implying unrestricted use |
| `#protection` | Protection   | Schutz      | Countermeasures and protective infrastructure                     |
| `#contact`    | Contact      | Kontakt     | Munich office and inquiry form                                    |

**Primary nav:** Home · Advice · Surveillance · Protection · Contact
**DE:** Start · Beratung · Observation · Schutz · Kontakt

### Chrome labels

| Key                     | English          | Deutsch               |
| ----------------------- | ---------------- | --------------------- |
| Header CTA              | Contact          | Kontakt               |
| Menu                    | Menu             | Menü                  |
| Home (aria)             | Elaman home      | Elaman Startseite     |
| Language switcher       | Language         | Sprache               |
| Skip link               | Skip to content  | Zum Inhalt springen   |
| Main navigation (aria)  | Main navigation  | Hauptnavigation       |
| Legal navigation (aria) | Legal navigation | Rechtliche Navigation |

---

## 4. Hero copy (EN / DE)

### English

| Field           | Copy                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Label           | `Elaman`                                                                                                                                         |
| Title           | `Your bridge to trust and security.`                                                                                                             |
| Intro (desktop) | `Elaman develops and integrates communications and security technology for public authorities and security organisations.`                       |
| Intro (mobile)  | `German security solutions for public authorities, security-sector clients, and communication service providers.`                                |
| Body (desktop)  | `Our services range from technical advice and system integration through turnkey implementation to professional training and long-term support.` |
| Body (mobile)   | `Communications and security engineering, advice, implementation, training, and support for demanding public-sector environments.`               |
| Primary CTA     | `Contact` → `#contact`                                                                                                                           |
| Secondary CTA   | `View services` → `#capabilities`                                                                                                                |
| Visual label    | `Integrated security systems`                                                                                                                    |
| Visual body     | `Communications, surveillance, protection, and support as connected capability layers.`                                                          |
| Visual badge    | `Munich / DE`                                                                                                                                    |
| Visual steps    | `Advise` · `Implement` · `Support`                                                                                                               |

### Deutsch

| Field           | Copy                                                                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Label           | `Elaman`                                                                                                                                                       |
| Title           | `Ihre Brücke zu Vertrauen und Sicherheit.`                                                                                                                     |
| Intro (desktop) | `Elaman entwickelt und integriert Kommunikations- und Sicherheitstechnik für Behörden und Sicherheitsorganisationen.`                                          |
| Intro (mobile)  | `Deutsche Sicherheitslösungen für Behörden, Sicherheitskunden und Kommunikationsanbieter.`                                                                     |
| Body (desktop)  | `Das Leistungsspektrum reicht von technischer Beratung und Systemintegration über die schlüsselfertige Umsetzung bis zu Schulung und langfristiger Betreuung.` |
| Body (mobile)   | `Kommunikations- und Sicherheitstechnik, Beratung, Implementierung, Schulung und Betreuung für anspruchsvolle Behördenumfelder.`                               |
| Primary CTA     | `Kontakt` → `#contact`                                                                                                                                         |
| Secondary CTA   | `Leistungen ansehen` → `#capabilities`                                                                                                                         |
| Visual label    | `Integrierte Sicherheitssysteme`                                                                                                                               |
| Visual body     | `Kommunikation, Observation, Schutz und Betreuung als verbundene Leistungsebenen.`                                                                             |
| Visual badge    | `München / DE`                                                                                                                                                 |
| Visual steps    | `Beraten` · `Umsetzen` · `Betreuen`                                                                                                                            |

### Hero stats (optional strip — use factual wording only)

| Value      | EN label                                         | DE label                                        |
| ---------- | ------------------------------------------------ | ----------------------------------------------- |
| `20+`      | Years in communications and security engineering | Jahre in Kommunikations- und Sicherheitstechnik |
| `Turnkey`  | Project implementation and system integration    | Schlüsselfertige Projektumsetzung               |
| `Training` | Professional training and after-sales service    | Schulungen und After-Sales-Service              |

---

## 5. Trust metrics (EN / DE)

**Section**

|       | English                                                                                        | Deutsch                                                                                               |
| ----- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Label | `Experience`                                                                                   | `Erfahrung`                                                                                           |
| Title | `Experience for work that carries responsibility.`                                             | `Erfahrung für Aufgaben mit Verantwortung.`                                                           |
| Body  | `Our work begins with a precise understanding of the task and continues beyond commissioning.` | `Unsere Arbeit beginnt mit einer genauen Analyse der Aufgabe und endet nicht mit der Inbetriebnahme.` |

**Metrics (replace gimmick values like `B2G` / `360°`)**

| Value          | EN label                                               | DE label                                              |
| -------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| `20+`          | Years of communications and security engineering       | Jahre Kommunikations- und Sicherheitstechnik          |
| `Full service` | Advice, implementation, training and technical support | Beratung, Umsetzung, Schulung und technischer Support |

**Client pillars (audience list — factual, not a client logo wall)**

| English                               | Deutsch                                           |
| ------------------------------------- | ------------------------------------------------- |
| Governmental authorities              | Staatliche Behörden                               |
| Public authorities                    | Öffentliche Behörden                              |
| Law-enforcement-related organisations | Sicherheits- und ordnungsrelevante Organisationen |
| Communication service providers       | Kommunikationsanbieter                            |

---

## 6. Capabilities (EN / DE)

Mapped to original service areas. **Contact** is its own page section (`#contact`); capabilities cover the three technical service pillars plus training/support.

**Section**

|       | English                                                                                                                                    | Deutsch                                                                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Label | `Services`                                                                                                                                 | `Leistungen`                                                                                                                                       |
| Title | `Elaman — German Security Solutions.`                                                                                                      | `Elaman — Deutsche Sicherheitslösungen.`                                                                                                           |
| Body  | `We combine established products and current technologies into integrated systems for demanding communications and security environments.` | `Wir verbinden bewährte Produkte und aktuelle Technologien zu integrierten Systemen für anspruchsvolle Kommunikations- und Sicherheitsumgebungen.` |

**Cards**

### 01 — Advice / Beratung

| EN                                                                                                                                                                                                    | DE                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title:** Advice                                                                                                                                                                                     | **Title:** Beratung                                                                                                                                                                                                             |
| **Description:** High-quality technical advice for selecting and combining products, services, and operational support — based on extensive knowledge of government security and safety requirements. | **Description:** Hochwertige technische Beratung zur Auswahl und Kombination von Produkten, Dienstleistungen und operativer Unterstützung — auf Basis umfassenden Wissens über staatliche Sicherheits- und Schutzanforderungen. |

### 02 — Surveillance / Observation

| EN                                                                                                                                                                                        | DE                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title:** Surveillance                                                                                                                                                                   | **Title:** Observation                                                                                                                                                                                    |
| **Description:** Surveillance-related systems and secure communications for authorised applications — including network-based, private, wireless, cellular, and satellite communications. | **Description:** Observationstechnische Systeme und sichere Kommunikation für autorisierte Anwendungen — einschließlich netzwerk-, privat-, drahtlos-, mobilfunk- und satellitengestützter Kommunikation. |

### 03 — Protection / Schutz

| EN                                                                                                                                                                                 | DE                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title:** Protection                                                                                                                                                              | **Title:** Schutz                                                                                                                                                                     |
| **Description:** Protection solutions and countermeasure systems for personnel, facilities, and restricted environments where confidentiality and operational safety are required. | **Description:** Schutzlösungen und Gegenmaßnahmensysteme für Personal, Einrichtungen und geschützte Umgebungen, in denen Vertraulichkeit und operative Sicherheit erforderlich sind. |

### 04 — Training & Support / Schulung und Betreuung

| EN                                                                                                                                                         | DE                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title:** Training & Support                                                                                                                              | **Title:** Schulung und Betreuung                                                                                                                                                      |
| **Description:** In-depth training, technical services, and high-quality after-sales service so client teams can operate and maintain implemented systems. | **Description:** Fundierte Schulungen, technische Dienstleistungen und hochwertiger After-Sales-Service, damit Kundenteams implementierte Systeme sicher bedienen und erhalten können. |

---

## 7. Solutions (EN / DE)

Maps to `SystemsSection` (`#systems`). Drawn from original Elaman technology and solution domains. Keep descriptions factual; avoid implying specific deployments or clients.

**Section**

|       | English                                                                                                              | Deutsch                                                                                                           |
| ----- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Label | `Solutions`                                                                                                          | `Lösungen`                                                                                                        |
| Title | `Systems that work together.`                                                                                        | `Systeme, die zusammenarbeiten.`                                                                                  |
| Body  | `Each solution is aligned with the project’s infrastructure, operating environment and organisational requirements.` | `Jede Lösung wird auf Infrastruktur, Einsatzumgebung und organisatorische Anforderungen des Projekts abgestimmt.` |

**Solution cards**

| #   | EN title                         | EN description                                                                                                | DE title                    | DE description                                                                                            |
| --- | -------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1   | Secure communications            | Network-based, private, wireless, cellular, and satellite communications for demanding security environments. | Sichere Kommunikation       | Netzwerk-, Privat-, Funk-, Mobilfunk- und Satellitenkommunikation für anspruchsvolle Sicherheitsumfelder. |
| 2   | Audio and video observation      | Technical observation equipment and supporting infrastructure for authorised surveillance applications.       | Audio- und Videoobservation | Technische Observationstechnik und unterstützende Infrastruktur für autorisierte Überwachungsanwendungen. |
| 3   | Geographical information systems | GIS-related systems supporting situational awareness and operational planning.                                | Geoinformationssysteme      | GIS-bezogene Systeme zur Lagebildung und operativen Planung.                                              |
| 4   | Technical counter-surveillance   | Counter-surveillance equipment and support for sweep teams in sensitive environments.                         | Technische Gegenüberwachung | Gegenobservationstechnik und Unterstützung für Sweep-Teams in sensiblen Umgebungen.                       |
| 5   | Special-purpose vehicles         | Vehicle-based concepts for specialised operational and communications requirements.                           | Spezialfahrzeuge            | Fahrzeugbasierte Konzepte für spezialisierte Einsatz- und Kommunikationsanforderungen.                    |
| 6   | Command and control centres      | Mobile and fixed command environments for coordinated operations.                                             | Führungszentralen           | Mobile und feste Führungsumgebungen für koordinierte Einsätze.                                            |
| 7   | Intelligence fusion systems      | Systems that consolidate operational inputs for authorised analysis workflows.                                | Intelligence-Fusion-Systeme | Systeme zur zusammenführenden Auswertung operativer Informationen in autorisierten Analyseprozessen.      |
| 8   | Data forensics                   | Forensics-related technical capabilities for authorised investigative contexts.                               | Datenforensik               | Forensikbezogene technische Fähigkeiten für autorisierte Ermittlungsumfelder.                             |

---

## 8. Sticky lifecycle section (EN / DE)

Maps to `ScrollStory` (`#story`). Six steps aligned with original service logic and delivery facts. Tone: procedural, not dramatic.

**Section header**

|                    | English                                                                            | Deutsch                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Label              | `Approach`                                                                         | `Vorgehen`                                                                     |
| Title              | `From the first requirement to reliable operation.`                                | `Von der ersten Anforderung bis zum verlässlichen Betrieb.`                    |
| Body               | `One team connects advice, system design, protection, implementation and support.` | `Ein Team verbindet Beratung, Systemplanung, Schutz, Umsetzung und Betreuung.` |
| Mobile title       | `How Elaman works`                                                                 | `So arbeitet Elaman`                                                           |
| Progress label     | `Progress`                                                                         | `Fortschritt`                                                                  |
| Active layer label | `Current step`                                                                     | `Aktueller Schritt`                                                            |
| Details label      | `Key points`                                                                       | `Schwerpunkte`                                                                 |

**Steps**

### Step 01 — Experience

|             | English                                                                                                                                                | Deutsch                                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow     | `01 / Experience`                                                                                                                                      | `01 / Erfahrung`                                                                                                                                              |
| Title       | `More than 20 years in communications and security engineering.`                                                                                       | `Mehr als 20 Jahre Kommunikations- und Sicherheitstechnik.`                                                                                                   |
| Description | `Elaman's work is grounded in long-standing experience and extensive knowledge of government security and safety requirements for public authorities.` | `Die Arbeit von Elaman basiert auf langjähriger Erfahrung und umfassendem Wissen über staatliche Sicherheits- und Schutzanforderungen öffentlicher Behörden.` |
| Bullets     | Government security requirements · Public authority contexts · Communications and security engineering                                                 | Staatliche Sicherheitsanforderungen · Behördenumfelder · Kommunikations- und Sicherheitstechnik                                                               |

### Step 02 — Advice

|             | English                                                                                                                                                                        | Deutsch                                                                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow     | `02 / Advice`                                                                                                                                                                  | `02 / Beratung`                                                                                                                                                                               |
| Title       | `Requirements are translated into a coherent technical approach.`                                                                                                              | `Anforderungen werden in einen stimmigen technischen Ansatz überführt.`                                                                                                                       |
| Description | `Advice covers analysis, consulting, and solution design — aligning mission context, existing infrastructure, and procurement constraints with appropriate technical options.` | `Die Beratung umfasst Analyse, Consulting und Lösungskonzeption — unter Abstimmung von Einsatzkontext, bestehender Infrastruktur und Beschaffungsrahmen mit geeigneten technischen Optionen.` |
| Bullets     | Analysis · Consulting · Solution design                                                                                                                                        | Analyse · Beratung · Lösungskonzeption                                                                                                                                                        |

### Step 03 — Surveillance & communications

|             | English                                                                                                                                                                  | Deutsch                                                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow     | `03 / Surveillance & communications`                                                                                                                                     | `03 / Observation & Kommunikation`                                                                                                                                          |
| Title       | `Communications and surveillance systems form the operational layer.`                                                                                                    | `Kommunikations- und Observationssysteme bilden die operative Ebene.`                                                                                                       |
| Description | `Network-based, private, wireless, cellular, and satellite communications are integrated with surveillance-related capabilities as part of a broader security solution.` | `Netzwerk-, Privat-, Funk-, Mobilfunk- und Satellitenkommunikation werden mit observationstechnischen Fähigkeiten als Teil einer umfassenden Sicherheitslösung integriert.` |
| Bullets     | Network / IP · Private networks · Wireless / cellular · Satellite                                                                                                        | Netzwerk / IP · Private Netze · Funk / Mobilfunk · Satellit                                                                                                                 |

### Step 04 — Protection

|             | English                                                                                                                                                                 | Deutsch                                                                                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow     | `04 / Protection`                                                                                                                                                       | `04 / Schutz`                                                                                                                                                           |
| Title       | `Protection measures for personnel, data, and restricted spaces.`                                                                                                       | `Schutzmaßnahmen für Personal, Daten und geschützte Bereiche.`                                                                                                          |
| Description | `Protection-related services include countermeasure systems and protective infrastructure for environments where confidentiality and operational safety are essential.` | `Schutzbezogene Leistungen umfassen Gegenmaßnahmensysteme und Schutzinfrastruktur für Umgebungen, in denen Vertraulichkeit und operative Sicherheit erforderlich sind.` |
| Bullets     | ECM · Counter-RCIED · TSCM · Shielded rooms                                                                                                                             | ECM · Counter-RCIED · TSCM · Geschirmte Räume                                                                                                                           |

### Step 05 — Turnkey implementation

|             | English                                                                                                                                 | Deutsch                                                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Eyebrow     | `05 / Implementation`                                                                                                                   | `05 / Umsetzung`                                                                                                               |
| Title       | `Projects delivered on a turnkey basis.`                                                                                                | `Projekte schlüsselfertig umgesetzt.`                                                                                          |
| Description | `Elaman implements projects using state-of-the-art technology, with attention to system integration, reliability, and operational fit.` | `Elaman setzt Projekte mit aktueller Technologie um — mit Blick auf Systemintegration, Zuverlässigkeit und operative Eignung.` |
| Bullets     | System integration · Turnkey delivery · Operational readiness                                                                           | Systemintegration · Schlüsselfertige Übergabe · Einsatzbereitschaft                                                            |

### Step 06 — Training & after-sales

|             | English                                                                                                                                        | Deutsch                                                                                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow     | `06 / Training & support`                                                                                                                      | `06 / Schulung & Betreuung`                                                                                                                                                        |
| Title       | `Training and after-sales service sustain long-term usability.`                                                                                | `Schulung und After-Sales-Service sichern langfristige Nutzbarkeit.`                                                                                                               |
| Description | `Professional training and high-quality after-sales service help client teams operate, maintain, and continue to rely on implemented systems.` | `Professionelle Schulungen und hochwertiger After-Sales-Service unterstützen Kundenteams beim Betrieb, bei der Wartung und bei der langfristigen Nutzung implementierter Systeme.` |
| Bullets     | In-depth training · Technical service · After-sales support                                                                                    | Fundierte Schulungen · Technischer Service · After-Sales-Betreuung                                                                                                                 |

---

## 9. Dark operations section (EN / DE)

Maps to `ProtectionSection` (`#protection`). **Visual treatment** may use `surface-dark-panel` for contrast; **copy** stays institutional and legally careful — not tactical, aggressive, or cinematic.

**Section**

|       | English                                                                                              | Deutsch                                                                               |
| ----- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Label | `Protection & countermeasures`                                                                       | `Schutz & Gegenmaßnahmen`                                                             |
| Title | `Protection where confidentiality matters.`                                                          | `Schutz, wo Vertraulichkeit zählt.`                                                   |
| Body  | `Elaman plans countermeasures and protective infrastructure for sensitive operational environments.` | `Elaman plant Gegenmaßnahmen und Schutzinfrastruktur für sensible Einsatzumgebungen.` |

**Cards**

| EN title            | EN description                                                                                      | DE title            | DE description                                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ECM / Counter-RCIED | Electronic countermeasures addressing radio-controlled threats and wireless risks.                  | ECM / Counter-RCIED | Elektronische Gegenmaßnahmen gegen funkgesteuerte Bedrohungen und drahtlose Risiken.                                      |
| Jamming systems     | Portable, vehicle-based and building-based systems for authorised public-sector use.                | Jamming-Systeme     | Tragbare, fahrzeug- und gebäudebasierte Systeme für behördlich autorisierte Einsatzbereiche.                              |
| TSCM                | Technical surveillance countermeasures, advice and training for specialist teams.                   | TSCM                | Technische Überwachungsgegenmaßnahmen, Beratung und Schulung für spezialisierte Prüfteams.                                |
| Shielded rooms      | Structural, mechanical and electronic concepts for rooms where confidential information is handled. | Geschirmte Räume    | Bauliche, mechanische und elektronische Schutzkonzepte für Räume, in denen vertrauliche Informationen verarbeitet werden. |

**Delivery model** (companion section `#delivery` — include here for planning continuity)

| Step | EN                                                                                   | DE                                                                                          |
| ---- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| 01   | **Analyse** — Understand mission context, infrastructure, and technical constraints. | **Analysieren** — Einsatzkontext, Infrastruktur und technische Rahmenbedingungen verstehen. |
| 02   | **Design** — Develop a system concept and delivery approach.                         | **Konzipieren** — Systemkonzept und Umsetzungsansatz entwickeln.                            |
| 03   | **Integrate** — Turnkey implementation with state-of-the-art technology.             | **Integrieren** — Schlüsselfertige Umsetzung mit aktueller Technologie.                     |
| 04   | **Train** — In-depth training for client teams.                                      | **Schulen** — Fundierte Schulungen für Kundenteams.                                         |
| 05   | **Support** — After-sales service and ongoing technical support.                     | **Betreuen** — After-Sales-Service und fortlaufende technische Betreuung.                   |

---

## 10. Contact CTA (EN / DE)

Maps to `ContactSection` (`#contact`). Factual details only — sourced from imprint.

**Section**

|              | English                                             | Deutsch                                              |
| ------------ | --------------------------------------------------- | ---------------------------------------------------- |
| Office title | `The Elaman Office in Munich`                       | `Das Elaman-Büro in München`                         |
| Title        | `Contact`                                           | `Kontakt`                                            |
| Intro        | `Your inquiry goes directly to our team in Munich.` | `Ihre Anfrage geht direkt an unser Team in München.` |

**Contact details (both locales — address formatting may differ)**

| Field   | Value                                  |
| ------- | -------------------------------------- |
| Address | Implerstraße 24, 81371 Munich, Germany |
| Phone   | +49 (0) 89 - 24 20 91 80               |
| Fax     | +49 (0) 89 - 24 20 91 81               |
| Email   | info@elaman.de                         |

**Form**

|            | English                                                  | Deutsch                                                             |
| ---------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| Label      | `Inquiry`                                                | `Anfrage`                                                           |
| Title      | `Send an inquiry`                                        | `Anfrage senden`                                                    |
| Intro      | `A short outline is enough for an initial conversation.` | `Für ein erstes Gespräch genügt eine kurze Einordnung.`             |
| Submit     | `Send inquiry`                                           | `Anfrage senden`                                                    |
| Helper     | `Your inquiry is validated before email delivery.`       | `Ihre Anfrage wird vor der E-Mail-Zustellung serverseitig geprüft.` |
| Success    | `Thank you. Your inquiry has been sent.`                 | `Vielen Dank. Ihre Anfrage wurde gesendet.`                         |
| Rate limit | `Too many requests. Please try again later.`             | `Zu viele Anfragen. Bitte versuchen Sie es später erneut.`          |

**Avoid in contact copy:** “secure channel”, “encrypted response”, “discreet hotline”, or any promise of classified handling unless operationally true and legally cleared.

---

## 11. Footer / legal link labels (EN / DE)

| Key             | English           | Deutsch              | Route (interim)                                    |
| --------------- | ----------------- | -------------------- | -------------------------------------------------- |
| Legal — imprint | Imprint           | Impressum            | `/imprint` → target `/en/imprint`, `/de/impressum` |
| Legal — privacy | Privacy Policy    | Datenschutzerklärung | `/private-policy` → target locale-prefixed routes  |
| Copyright       | ©2026 Elaman GmbH | ©2026 Elaman GmbH    | —                                                  |

**Footer company block**

| EN                                     | DE                                          |
| -------------------------------------- | ------------------------------------------- |
| Elaman GmbH                            | Elaman GmbH                                 |
| Implerstraße 24, 81371 Munich, Germany | Implerstraße 24, 81371 München, Deutschland |

---

## 12. Notes on claims to avoid

### Marketing language

| Avoid                                        | Use instead                                                   |
| -------------------------------------------- | ------------------------------------------------------------- |
| `360°`, `B2G`, `end-to-end platform`         | Full service; advice through after-sales support              |
| Unlock, supercharge, game-changing, next-gen | Implement, support, advise                                    |
| Best-in-class, world-leading, unmatched      | Established, comprehensive, high-quality (only where factual) |
| AI-powered, cutting-edge (repeated)          | State-of-the-art (once, tied to turnkey implementation fact)  |

### Unverified or risky claims

| Avoid                                                   | Why                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------ |
| “Exclusive” or “only” government focus                  | Unless legally verified across all business lines                        |
| Named agencies, ministries, or operations               | No client logos or references without written permission                 |
| Specific threat defeat guarantees                       | Countermeasure copy must stay capability-oriented, not outcome-promising |
| “Secure channel” for email inquiries                    | Standard business email unless a classified process exists               |
| Invented statistics (project counts, countries, uptime) | Use only verifiable facts (20+ years, service areas, domains)            |
| “Discreet” / “classified” overuse                       | Implies capabilities or processes not stated on the public site          |

### Surveillance and protection copy

| Avoid                                        | Use instead                                                     |
| -------------------------------------------- | --------------------------------------------------------------- |
| Cinematic “operations” framing               | Authorised applications, public-authority requirements          |
| Aggressive verbs (neutralise, destroy, hunt) | Support, protect, counter, secure                               |
| Broad “intelligence” claims                  | Intelligence fusion systems — for authorised analysis workflows |
| Implying unrestricted surveillance           | Always qualify: authorised applications, authorised contexts    |

### Legal and compliance

- Privacy policy must match actual data processing (contact form, hosting, analytics if added).
- German Impressum and English imprint must stay consistent with `lib/content/legal.ts`.
- English privacy policy requires counsel review before publication.
- Do not state certifications (ISO, etc.) unless documented and approved.

### Content drift watchlist (current draft vs blueprint)

| Current element                    | Issue                                 | Blueprint direction                                                |
| ---------------------------------- | ------------------------------------- | ------------------------------------------------------------------ |
| Hero stats `B2G`, `360°`           | Marketing shorthand, not source facts | Factual labels: 20+ years, turnkey, training & support             |
| Nav label “Story” / “Ablauf”       | Sounds like brand narrative           | “Approach” / “Vorgehen”                                            |
| “Operational Story”                | Generic SaaS lifecycle                | “Approach” — procedural wording                                    |
| “Send a discreet inquiry”          | Overpromises handling                 | “Send an inquiry”                                                  |
| “Respond through a secure channel” | Likely inaccurate for web form        | “Review and respond”                                               |
| “Exclusively for government”       | Strong legal claim                    | “Focus on governmental authorities and public-sector requirements” |

---

## Implementation reference

| Blueprint section            | `LocalizedSiteContent` key   | Component            |
| ---------------------------- | ---------------------------- | -------------------- |
| Hero                         | `hero`                       | `HeroSection`        |
| Trust                        | `trust`                      | `TrustSection`       |
| Sticky lifecycle             | `story`                      | `ScrollStory`        |
| Capabilities                 | `capabilities`               | `CapabilityOverview` |
| Solutions                    | `systems`                    | `SystemsSection`     |
| Dark operations / protection | `protection`                 | `ProtectionSection`  |
| Delivery                     | `delivery`                   | `DeliverySection`    |
| Contact                      | `contact`                    | `ContactSection`     |
| Navigation                   | `navigation`                 | `Header`, `Footer`   |
| Footer legal                 | `navigation.legal`, `footer` | `Footer`             |

When applying this blueprint, update **English and German together** in `lib/content/site.ts` and adjust navigation hrefs only if section IDs change (currently stable).
