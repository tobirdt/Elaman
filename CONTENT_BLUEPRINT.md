# Elaman GmbH — Content Blueprint

Authoritative content plan for the bilingual single-page website. This document defines **what to say** in each section. It is aligned with the original Elaman positioning, verified company facts, and the institutional design direction in `DESIGN_SYSTEM.md`.

**Status:** Planning reference only. Do not treat draft copy as legally approved. Implement in `lib/content/site.ts` during Implementation Plan **Step 3** (and refine per-section in Steps 4–11).

**Related docs:** `DESIGN_DIRECTION.md` (visual intent) · `DESIGN_SYSTEM.md` (rules) · `IMPLEMENTATION_PLAN.md` (build order)

---

## Source positioning (anchor facts)

Use these as non-negotiable anchors. All section copy should trace back to one or more of them.

| Fact | Usage |
|------|--------|
| 20+ years in communications and security engineering | Hero, trust, story step 1 |
| Extensive knowledge of government security and safety requirements of public authorities | Trust, advice capability |
| Comprehensive security solutions, technical services, high-quality advice, professional training | Capabilities overview |
| Clients: governmental authorities, public authorities, law-enforcement-related organisations, communication service providers | Trust pillars, hero intro |
| Turnkey project implementation using state-of-the-art technology | Delivery, story final steps |
| High-quality after-sales service and in-depth training | Delivery, training capability, story |
| Communications domains: network-based, private networks, wireless, cellular, satellite | Systems, story communications step |
| Original service areas: **Advice**, **Surveillance**, **Protection**, **Contact** | Capabilities map, navigation intent |

**Brand line (original):** *Your bridge to trust and security.* / *Ihre Brücke zu Vertrauen und Sicherheit.*

**Company descriptor (original):** *German Security Solutions* / *Deutsche Sicherheitslösungen*

---

## 1. English homepage section structure

Single-page scroll at `/en`. Order matches `app/(marketing)/[locale]/page.tsx`.

| # | Section ID | Component | Purpose |
|---|------------|-----------|---------|
| 1 | `#hero` | `HeroSection` | Company identity, original tagline, audience, primary CTA |
| 2 | `#experience` | `TrustSection` | Experience, public-authority context, client types, trust metrics |
| 3 | `#story` | `ScrollStory` | Sticky lifecycle: experience → advice → surveillance & communications → protection → implementation & support |
| 4 | `#capabilities` | `CapabilityOverview` | Four service pillars mapped to original Advice / Surveillance / Protection / Training & Support |
| 5 | `#systems` | `SystemsSection` | Solution domains and technologies (communications, observation, GIS, command, forensics) |
| 6 | `#protection` | `ProtectionSection` | Countermeasures and protective infrastructure (dark-surface visual treatment; institutional copy) |
| 7 | `#delivery` | `DeliverySection` | Turnkey delivery model: analyse → design → integrate → train → support |
| 8 | `#contact` | `ContactSection` | Munich office, contact details, inquiry form |

**Metadata**

- **Title:** `German Security Solutions | Elaman GmbH`
- **Description:** `Elaman GmbH provides communications and security engineering, technical services, advice, surveillance and protection solutions, professional training, and after-sales support for public authorities and security-sector clients.`

---

## 2. German homepage section structure

Single-page scroll at `/de`. Same order and anchors as English.

| # | Section ID | Component | Purpose |
|---|------------|-----------|---------|
| 1 | `#hero` | `HeroSection` | Unternehmensidentität, Original-Tagline, Zielgruppen, primärer CTA |
| 2 | `#experience` | `TrustSection` | Erfahrung, Behördenkontext, Kundengruppen, Vertrauenskennzahlen |
| 3 | `#story` | `ScrollStory` | Sticky-Ablauf: Erfahrung → Beratung → Observation & Kommunikation → Schutz → Umsetzung & Betreuung |
| 4 | `#capabilities` | `CapabilityOverview` | Vier Leistungssäulen: Beratung / Observation / Schutz / Training & Support |
| 5 | `#systems` | `SystemsSection` | Lösungs- und Technologiebereiche |
| 6 | `#protection` | `ProtectionSection` | Gegenmaßnahmen und Schutzinfrastruktur |
| 7 | `#delivery` | `DeliverySection` | Schlüsselfertiges Umsetzungsmodell |
| 8 | `#contact` | `ContactSection` | Münchner Büro, Kontaktdaten, Anfrageformular |

**Metadata**

- **Title:** `Deutsche Sicherheitslösungen | Elaman GmbH`
- **Description:** `Elaman GmbH bietet Kommunikations- und Sicherheitstechnik, technische Dienstleistungen, Beratung, Observation und Schutzlösungen, professionelle Schulungen und After-Sales-Service für Behörden und Sicherheitskunden.`

---

## 3. Navigation labels (EN / DE)

### Main navigation

| Anchor | English | Deutsch | Notes |
|--------|---------|---------|-------|
| `#experience` | Experience | Erfahrung | Trust and authority context — not “About us” startup phrasing |
| `#story` | Approach | Vorgehen | Describes how Elaman works; avoid “Story” / “Ablauf” if it reads like marketing narrative |
| `#capabilities` | Services | Leistungen | Maps to original Advice / Surveillance / Protection framing |
| `#systems` | Solutions | Lösungen | Technology and system domains |
| `#protection` | Protection | Schutz | Countermeasures; optional in nav if space is tight — always reachable via scroll |
| `#contact` | Contact | Kontakt | Original service area name |

**Recommended primary nav (5 items):** Experience · Approach · Services · Solutions · Contact  
**DE:** Erfahrung · Vorgehen · Leistungen · Lösungen · Kontakt

`#protection` and `#delivery` can remain scroll-discoverable or be added to nav in a later pass if stakeholders want full parity with all sections.

### Chrome labels

| Key | English | Deutsch |
|-----|---------|---------|
| Main navigation | Main navigation | Hauptnavigation |
| Header CTA | Contact | Kontakt |
| Menu | Menu | Menü |
| Home (aria) | Elaman home | Elaman Startseite |
| Language switcher | Language | Sprache |

---

## 4. Hero copy (EN / DE)

### English

| Field | Copy |
|-------|------|
| Label | `Elaman GmbH` |
| Title | `Your bridge to trust and security.` |
| Intro (desktop) | `German security solutions for governmental authorities, public authorities, law-enforcement-related organisations, and communication service providers.` |
| Intro (mobile) | `German security solutions for public authorities, security-sector clients, and communication service providers.` |
| Body (desktop) | `For more than 20 years, Elaman has worked in communications and security engineering. We provide comprehensive security solutions, technical services, high-quality advice, turnkey implementation, professional training, and after-sales service.` |
| Body (mobile) | `Communications and security engineering, advice, implementation, training, and support for demanding public-sector environments.` |
| Primary CTA | `Contact` → `#contact` |
| Secondary CTA | `View services` → `#capabilities` |
| Visual label | `Integrated security systems` |
| Visual body | `Communications, surveillance, protection, and support as connected capability layers.` |
| Visual badge | `Munich / DE` |
| Visual steps | `Advise` · `Implement` · `Support` |

### Deutsch

| Field | Copy |
|-------|------|
| Label | `Elaman GmbH` |
| Title | `Ihre Brücke zu Vertrauen und Sicherheit.` |
| Intro (desktop) | `Deutsche Sicherheitslösungen für staatliche und öffentliche Behörden, sicherheitsrelevante Organisationen und Kommunikationsanbieter.` |
| Intro (mobile) | `Deutsche Sicherheitslösungen für Behörden, Sicherheitskunden und Kommunikationsanbieter.` |
| Body (desktop) | `Seit mehr als 20 Jahren ist Elaman in der Kommunikations- und Sicherheitstechnik tätig. Wir bieten umfassende Sicherheitslösungen, technische Dienstleistungen, hochwertige Beratung, schlüsselfertige Implementierung, professionelle Schulungen und After-Sales-Service.` |
| Body (mobile) | `Kommunikations- und Sicherheitstechnik, Beratung, Implementierung, Schulung und Betreuung für anspruchsvolle Behördenumfelder.` |
| Primary CTA | `Kontakt` → `#contact` |
| Secondary CTA | `Leistungen ansehen` → `#capabilities` |
| Visual label | `Integrierte Sicherheitssysteme` |
| Visual body | `Kommunikation, Observation, Schutz und Betreuung als verbundene Leistungsebenen.` |
| Visual badge | `München / DE` |
| Visual steps | `Beraten` · `Umsetzen` · `Betreuen` |

### Hero stats (optional strip — use factual wording only)

| Value | EN label | DE label |
|-------|----------|----------|
| `20+` | Years in communications and security engineering | Jahre in Kommunikations- und Sicherheitstechnik |
| `Turnkey` | Project implementation and system integration | Schlüsselfertige Projektumsetzung |
| `Training` | Professional training and after-sales service | Schulungen und After-Sales-Service |

---

## 5. Trust metrics (EN / DE)

**Section**

| | English | Deutsch |
|---|---------|---------|
| Label | `Experience` | `Erfahrung` |
| Title | `Long-standing expertise in institutional security requirements.` | `Langjährige Expertise für anspruchsvolle Sicherheitsanforderungen.` |
| Body | `Elaman combines communications and security engineering with long-standing knowledge of institutional security and safety requirements. We support organisations that rely on reliable technical systems, sound advice, and sustained service.` | `Elaman verbindet Kommunikations- und Sicherheitstechnik mit langjährigem Wissen über institutionelle Sicherheits- und Schutzanforderungen. Wir unterstützen Organisationen, die auf zuverlässige technische Systeme, fundierte Beratung und kontinuierliche Betreuung angewiesen sind.` |

**Metrics (replace gimmick values like `B2G` / `360°`)**

| Value | EN label | DE label |
|-------|----------|----------|
| `20+` | Years of experience in communications and security engineering | Jahre Erfahrung in Kommunikations- und Sicherheitstechnik |
| `Institutional focus` | Experience with public-sector and security-related requirements | Erfahrung mit öffentlichen und sicherheitsrelevanten Anforderungen |
| `Sustained support` | Advice, implementation, training, and after-sales support | Beratung, Umsetzung, Schulung und After-Sales-Service |

**Focus contexts (factual categories — never a client list or logo wall)**

| English | Deutsch |
|---------|---------|
| Public institutions | Öffentliche Institutionen |
| Security-relevant organisations | Sicherheitsrelevante Organisationen |
| Communication service providers | Kommunikationsanbieter |

---

## 6. Capabilities (EN / DE)

Mapped to original service areas. **Contact** is its own page section (`#contact`); capabilities cover the three technical service pillars plus training/support.

**Section**

| | English | Deutsch |
|---|---------|---------|
| Label | `Services` | `Leistungen` |
| Title | `Advice, observation, protection, and sustained support.` | `Beratung, Observation, Schutz und kontinuierliche Betreuung.` |
| Body | `Elaman's services follow the structure established over more than two decades: specialised advice, observation-related systems and communications, protection for sensitive environments, complemented by professional training and after-sales service.` | `Die Leistungen von Elaman folgen der seit über zwei Jahrzehnten etablierten Struktur: spezialisierte Beratung, observationstechnische Systeme und Kommunikation, Schutz für sensible Umgebungen — ergänzt durch professionelle Schulungen und After-Sales-Service.` |

**Cards**

### 01 — Advice / Beratung

| EN | DE |
|----|-----|
| **Title:** Advice | **Title:** Beratung |
| **Description:** Technical advice for selecting and combining systems, services, and operational support — based on long-standing knowledge of institutional security and safety requirements. | **Description:** Technische Beratung zur Auswahl und Kombination von Systemen, Dienstleistungen und operativer Unterstützung — auf Basis langjähriger Kenntnisse institutioneller Sicherheits- und Schutzanforderungen. |

### 02 — Surveillance / Observation

| EN | DE |
|----|-----|
| **Title:** Observation & communications | **Title:** Observation & Kommunikation |
| **Description:** Observation-related systems and communications for authorised applications — including network-based, private, wireless, cellular, and satellite communications. | **Description:** Observationstechnische Systeme und Kommunikation für autorisierte Anwendungen — einschließlich netzwerk-, privat-, drahtlos-, mobilfunk- und satellitengestützter Kommunikation. |

### 03 — Protection / Schutz

| EN | DE |
|----|-----|
| **Title:** Protection | **Title:** Schutz |
| **Description:** Protection-related solutions for personnel, facilities, and sensitive environments where confidentiality and operational reliability matter. | **Description:** Schutzbezogene Lösungen für Personal, Einrichtungen und sensible Umgebungen, in denen Vertraulichkeit und betriebliche Zuverlässigkeit entscheidend sind. |

### 04 — Training & Support / Training & Betreuung

| EN | DE |
|----|-----|
| **Title:** Training & Support | **Title:** Training & Betreuung |
| **Description:** In-depth training, technical services, and sustained after-sales support to help teams operate and maintain implemented systems. | **Description:** Fundierte Schulungen, technische Dienstleistungen und kontinuierliche After-Sales-Betreuung, damit Teams implementierte Systeme sicher bedienen und erhalten können. |

---

## 7. Solutions (EN / DE)

Maps to `SystemsSection` (`#systems`). Drawn from original Elaman technology and solution domains. Keep descriptions factual; avoid implying specific deployments or clients.

**Section**

| | English | Deutsch |
|---|---------|---------|
| Label | `Solutions` | `Lösungen` |
| Title | `Integrated systems for communications, observation, and command.` | `Integrierte Systeme für Kommunikation, Observation und Führung.` |
| Body | `Elaman combines established products and current technology into integrated systems for institutional security and communications requirements.` | `Elaman kombiniert bewährte Produkte und aktuelle Technologie zu integrierten Systemen für institutionelle Sicherheits- und Kommunikationsanforderungen.` |

**Solution cards**

| # | EN title | EN description | DE title | DE description |
|---|----------|----------------|----------|----------------|
| 1 | Communications systems | Network-based, private, wireless, cellular, and satellite communications for institutional environments. | Kommunikationssysteme | Netzwerk-, Privat-, Funk-, Mobilfunk- und Satellitenkommunikation für institutionelle Umgebungen. |
| 2 | Technical observation | Technical observation and supporting infrastructure for authorised applications. | Technische Observation | Technische Observation und unterstützende Infrastruktur für autorisierte Anwendungen. |
| 3 | Geographical information systems | GIS-related systems supporting spatial information, coordination, and planning. | Geoinformationssysteme | GIS-bezogene Systeme für räumliche Information, Koordination und Planung. |
| 4 | Technical environment assessment | Technical capabilities for assessing sensitive environments and maintaining appropriate protective conditions. | Technische Umfeldanalyse | Technische Fähigkeiten zur Einschätzung sensibler Umgebungen und zur Aufrechterhaltung geeigneter Schutzbedingungen. |
| 5 | Mobile system concepts | Vehicle-based concepts for specialised communications and technical requirements. | Mobile Systemkonzepte | Fahrzeugbasierte Konzepte für spezialisierte Kommunikations- und technische Anforderungen. |
| 6 | Coordinated operational environments | Mobile and fixed environments supporting coordinated decision-making and communications. | Koordinierte Führungsumgebungen | Mobile und feste Umgebungen zur Unterstützung koordinierter Lage- und Kommunikationsarbeit. |
| 7 | Information integration | Systems that bring together authorised information sources for structured analysis workflows. | Informationsintegration | Systeme zur Zusammenführung autorisierter Informationsquellen für strukturierte Analyseprozesse. |
| 8 | Technical analysis | Technical capabilities supporting authorised examination and documentation workflows. | Technische Analyse | Technische Fähigkeiten zur Unterstützung autorisierter Prüf- und Dokumentationsprozesse. |

---

## 8. Sticky lifecycle section (EN / DE)

Maps to `ScrollStory` (`#story`). Six steps aligned with original service logic and delivery facts. Tone: procedural, not dramatic.

**Section header**

| | English | Deutsch |
|---|---------|---------|
| Label | `Approach` | `Vorgehen` |
| Title | `From requirements analysis to implementation and support.` | `Von der Anforderungsanalyse bis zur Umsetzung und Betreuung.` |
| Body | `How Elaman brings together experience, advice, observation and communications, protection, implementation, training, and after-sales support.` | `Wie Elaman Erfahrung, Beratung, Observation und Kommunikation, Schutz, Umsetzung, Schulung und After-Sales-Betreuung zusammenführt.` |
| Mobile title | `How Elaman works` | `So arbeitet Elaman` |
| Progress label | `Progress` | `Fortschritt` |
| Active layer label | `Current step` | `Aktueller Schritt` |
| Details label | `Key points` | `Schwerpunkte` |

**Steps**

### Step 01 — Experience

| | English | Deutsch |
|---|---------|---------|
| Eyebrow | `01 / Experience` | `01 / Erfahrung` |
| Title | `More than 20 years in communications and security engineering.` | `Mehr als 20 Jahre Kommunikations- und Sicherheitstechnik.` |
| Description | `Elaman's work is grounded in long-standing experience and extensive knowledge of institutional security and safety requirements.` | `Die Arbeit von Elaman basiert auf langjähriger Erfahrung und umfassendem Wissen über institutionelle Sicherheits- und Schutzanforderungen.` |
| Bullets | Institutional security requirements · Public-sector contexts · Communications and security engineering | Institutionelle Sicherheitsanforderungen · Öffentliche Kontexte · Kommunikations- und Sicherheitstechnik |

### Step 02 — Advice

| | English | Deutsch |
|---|---------|---------|
| Eyebrow | `02 / Advice` | `02 / Beratung` |
| Title | `Requirements are translated into a coherent technical approach.` | `Anforderungen werden in einen stimmigen technischen Ansatz überführt.` |
| Description | `Advice covers analysis, consulting, and solution design — aligning project context, existing infrastructure, and procurement constraints with appropriate technical options.` | `Die Beratung umfasst Analyse, Consulting und Lösungskonzeption — unter Abstimmung von Anwendungskontext, bestehender Infrastruktur und Beschaffungsrahmen mit geeigneten technischen Optionen.` |
| Bullets | Analysis · Consulting · Solution design | Analyse · Beratung · Lösungskonzeption |

### Step 03 — Observation & communications

| | English | Deutsch |
|---|---------|---------|
| Eyebrow | `03 / Observation & communications` | `03 / Observation & Kommunikation` |
| Title | `Communications and observation systems form a coordinated technical layer.` | `Kommunikations- und Observationssysteme bilden eine abgestimmte technische Ebene.` |
| Description | `Network-based, private, wireless, cellular, and satellite communications are combined with observation-related capabilities as part of an integrated technical system.` | `Netzwerk-, Privat-, Funk-, Mobilfunk- und Satellitenkommunikation werden mit observationstechnischen Fähigkeiten zu einem integrierten technischen System verbunden.` |
| Bullets | Network / IP · Private networks · Wireless / cellular · Satellite | Netzwerk / IP · Private Netze · Funk / Mobilfunk · Satellit |

### Step 04 — Protection

| | English | Deutsch |
|---|---------|---------|
| Eyebrow | `04 / Protection` | `04 / Schutz` |
| Title | `Protection measures for personnel, information, and sensitive spaces.` | `Schutzmaßnahmen für Personal, Informationen und sensible Bereiche.` |
| Description | `Protection-related services combine protective infrastructure and selected technical measures for contexts where confidentiality and reliable operation are essential.` | `Schutzbezogene Leistungen verbinden Schutzinfrastruktur und ausgewählte technische Maßnahmen für Umgebungen, in denen Vertraulichkeit und zuverlässiger Betrieb wesentlich sind.` |
| Bullets | Protective infrastructure · Sensitive spaces · Confidential information | Schutzinfrastruktur · Sensible Bereiche · Vertrauliche Informationen |

### Step 05 — Turnkey implementation

| | English | Deutsch |
|---|---------|---------|
| Eyebrow | `05 / Implementation` | `05 / Umsetzung` |
| Title | `Projects delivered with an integrated implementation approach.` | `Projekte mit einem integrierten Umsetzungsansatz realisiert.` |
| Description | `Elaman implements projects with current technology, focusing on system integration, reliability, and practical fit.` | `Elaman setzt Projekte mit aktueller Technologie um — mit Blick auf Systemintegration, Zuverlässigkeit und praktische Eignung.` |
| Bullets | System integration · Structured delivery · Operational readiness | Systemintegration · Strukturierte Umsetzung · Einsatzbereitschaft |

### Step 06 — Training & after-sales

| | English | Deutsch |
|---|---------|---------|
| Eyebrow | `06 / Training & support` | `06 / Schulung & Betreuung` |
| Title | `Training and after-sales support sustain long-term use.` | `Schulung und After-Sales-Betreuung sichern langfristige Nutzbarkeit.` |
| Description | `Professional training and after-sales support help teams operate, maintain, and use implemented systems over time.` | `Professionelle Schulungen und After-Sales-Betreuung unterstützen Teams beim Betrieb, bei der Wartung und bei der langfristigen Nutzung implementierter Systeme.` |
| Bullets | In-depth training · Technical service · After-sales support | Fundierte Schulungen · Technischer Service · After-Sales-Betreuung |

---

## 9. Dark operations section (EN / DE)

Maps to `ProtectionSection` (`#protection`). **Visual treatment** may use `surface-dark-panel` for contrast; **copy** stays institutional and legally careful — not tactical, aggressive, or cinematic.

**Section**

| | English | Deutsch |
|---|---------|---------|
| Label | `Protective environments` | `Schutzumgebungen` |
| Title | `Protective capabilities for sensitive institutional environments.` | `Schutzfähigkeiten für sensible institutionelle Umgebungen.` |
| Body | `Elaman combines selected protective infrastructure, technical measures, and advisory support for environments where confidentiality, reliability, and controlled access matter.` | `Elaman verbindet ausgewählte Schutzinfrastruktur, technische Maßnahmen und beratende Begleitung für Umgebungen, in denen Vertraulichkeit, Zuverlässigkeit und kontrollierter Zugang wesentlich sind.` |

**Cards**

| EN title | EN description | DE title | DE description |
|----------|----------------|----------|----------------|
| Technical protective measures | Technical measures for authorised environments with heightened communications and infrastructure protection requirements. | Technische Schutzmaßnahmen | Technische Maßnahmen für autorisierte Umgebungen mit erhöhten Anforderungen an Kommunikations- und Infrastrukturschutz. |
| Resilient operational infrastructure | Concepts that help maintain continuity in sensitive technical environments. | Resiliente Infrastruktur | Konzepte zur Unterstützung der Kontinuität in sensiblen technischen Umgebungen. |
| Technical environment assurance | Assessment, advice, and training related to the integrity of sensitive spaces and technical environments. | Technische Umfeldabsicherung | Einschätzung, Beratung und Schulung zur Integrität sensibler Räume und technischer Umgebungen. |
| Shielded environments | Structural, mechanical, and electronic protection concepts for sensitive rooms and confidential information. | Geschützte Umgebungen | Bauliche, mechanische und elektronische Schutzkonzepte für sensible Räume und vertrauliche Informationen. |

**Delivery model** (companion section `#delivery` — include here for planning continuity)

| Step | EN | DE |
|------|----|----|
| 01 | **Analyse** — Understand context, infrastructure, and technical parameters. | **Analysieren** — Anwendungskontext, Infrastruktur und technische Rahmenbedingungen verstehen. |
| 02 | **Design** — Develop a system concept and implementation approach. | **Konzipieren** — Systemkonzept und Umsetzungsansatz entwickeln. |
| 03 | **Integrate** — Combine established and current technology into a coherent system. | **Integrieren** — Bewährte und aktuelle Technologie zu einem stimmigen System verbinden. |
| 04 | **Train** — Provide role-appropriate training for operating and maintaining the implemented system. | **Schulen** — Rollenbezogene Schulungen für Betrieb und Wartung des implementierten Systems durchführen. |
| 05 | **Support** — Provide technical service and after-sales support throughout the system lifecycle. | **Betreuen** — Technischen Service und After-Sales-Betreuung über den Lebenszyklus des Systems bereitstellen. |

---

## 10. Contact CTA (EN / DE)

Maps to `ContactSection` (`#contact`). Factual details only — sourced from imprint.

**Section**

| | English | Deutsch |
|---|---------|---------|
| Office title | `Elaman GmbH — Munich` | `Elaman GmbH — München` |
| Office image alt | `Reception area at Elaman GmbH in Munich.` | `Empfangsbereich der Elaman GmbH in München.` |
| Title | `Contact` | `Kontakt` |
| Intro | `Contact details and an inquiry form for Elaman GmbH in Munich.` | `Kontaktdaten und ein Anfrageformular für die Elaman GmbH in München.` |

**Contact details (both locales — address formatting may differ)**

| Field | Value |
|-------|-------|
| Address | Implerstraße 24, 81371 Munich, Germany |
| Phone | +49 (0) 89 - 24 20 91 80 |
| Fax | +49 (0) 89 - 24 20 91 81 |
| Email | info@elaman.de |

**Form**

| | English | Deutsch |
|---|---------|---------|
| Label | `Inquiry` | `Anfrage` |
| Title | `Send an inquiry` | `Anfrage senden` |
| Intro | `Please describe your requirement briefly. The Elaman team will review your message and respond.` | `Bitte beschreiben Sie Ihr Anliegen kurz. Das Team von Elaman prüft Ihre Nachricht und meldet sich.` |
| Submit | `Send inquiry` | `Anfrage senden` |
| Helper | `Your inquiry is validated before email delivery.` | `Ihre Anfrage wird vor der E-Mail-Zustellung serverseitig geprüft.` |
| Success | `Thank you. Your inquiry has been sent.` | `Vielen Dank. Ihre Anfrage wurde gesendet.` |
| Rate limit | `Please wait a moment before sending another inquiry.` | `Bitte warten Sie einen Moment, bevor Sie eine weitere Anfrage senden.` |

**Avoid in contact copy:** “secure channel”, “encrypted response”, “discreet hotline”, or any promise of classified handling unless operationally true and legally cleared.

---

## 11. Footer / legal link labels (EN / DE)

| Key | English | Deutsch | Route (interim) |
|-----|---------|---------|-----------------|
| Legal — imprint | Imprint | Impressum | `/imprint` → target `/en/imprint`, `/de/impressum` |
| Legal — privacy | Privacy Policy | Datenschutzerklärung | `/private-policy` → target locale-prefixed routes |
| Copyright | ©2026 Elaman GmbH | ©2026 Elaman GmbH | — |

**Footer company block**

| EN | DE |
|----|-----|
| Elaman GmbH | Elaman GmbH |
| Implerstrasse 24, 81371 Munich, Germany | Implerstrasse 24, 81371 München, Deutschland |

---

## 12. Notes on claims to avoid

### Marketing language

| Avoid | Use instead |
|-------|-------------|
| `360°`, `B2G`, `end-to-end platform` | Full service; advice through after-sales support |
| Unlock, supercharge, game-changing, next-gen | Implement, support, advise |
| Best-in-class, world-leading, unmatched | Established, comprehensive, high-quality (only where factual) |
| AI-powered, cutting-edge (repeated) | State-of-the-art (once, tied to turnkey implementation fact) |

### Unverified or risky claims

| Avoid | Why |
|-------|-----|
| “Exclusive” or “only” government focus | Unless legally verified across all business lines |
| Named agencies, ministries, or operations | No client logos or references without written permission |
| Specific threat defeat guarantees | Countermeasure copy must stay capability-oriented, not outcome-promising |
| “Secure channel” for email inquiries | Standard business email unless a classified process exists |
| Invented statistics (project counts, countries, uptime) | Use only verifiable facts (20+ years, service areas, domains) |
| “Discreet” / “classified” overuse | Implies capabilities or processes not stated on the public site |

### Surveillance and protection copy

| Avoid | Use instead |
|-------|-------------|
| Cinematic “operations” framing | Authorised applications, public-authority requirements |
| Aggressive verbs (neutralise, destroy, hunt) | Support, protect, counter, secure |
| Broad “intelligence” claims | Intelligence fusion systems — for authorised analysis workflows |
| Implying unrestricted surveillance | Always qualify: authorised applications, authorised contexts |

### Legal and compliance

- Privacy policy must match actual data processing (contact form, hosting, analytics if added).
- German Impressum and English imprint must stay consistent with `lib/content/legal.ts`.
- English privacy policy requires counsel review before publication.
- Do not state certifications (ISO, etc.) unless documented and approved.

### Content drift watchlist (current draft vs blueprint)

| Current element | Issue | Blueprint direction |
|-----------------|-------|---------------------|
| Hero stats `B2G`, `360°` | Marketing shorthand, not source facts | Factual labels: 20+ years, turnkey, training & support |
| Nav label “Story” / “Ablauf” | Sounds like brand narrative | “Approach” / “Vorgehen” |
| “Operational Story” | Generic SaaS lifecycle | “Approach” — procedural wording |
| “Send a discreet inquiry” | Overpromises handling | “Send an inquiry” |
| “Respond through a secure channel” | Likely inaccurate for web form | “Review and respond” |
| “Exclusively for government” | Strong legal claim | “Focus on governmental authorities and public-sector requirements” |

---

## Implementation reference

| Blueprint section | `LocalizedSiteContent` key | Component |
|-------------------|------------------------------|-----------|
| Hero | `hero` | `HeroSection` |
| Trust | `trust` | `TrustSection` |
| Sticky lifecycle | `story` | `ScrollStory` |
| Capabilities | `capabilities` | `CapabilityOverview` |
| Solutions | `systems` | `SystemsSection` |
| Dark operations / protection | `protection` | `ProtectionSection` |
| Delivery | `delivery` | `DeliverySection` |
| Contact | `contact` | `ContactSection` |
| Navigation | `navigation` | `Header`, `Footer` |
| Footer legal | `navigation.legal`, `footer` | `Footer` |

When applying this blueprint, update **English and German together** in `lib/content/site.ts` and adjust navigation hrefs only if section IDs change (currently stable).
