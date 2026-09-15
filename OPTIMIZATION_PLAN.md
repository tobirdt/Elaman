# Elaman Website: Analyse und Optimierungsplan

Stand: 14. September 2026. Analysiert wurde der Live-Stand von www.elaman.de (Commit 27ab022, identisch mit `main` und dem Vercel-Production-Deployment).

## 1. Kurzfassung

Die technische Basis ist sehr gut und muss nicht neu gebaut werden. Lighthouse liefert auf dem Produktionsbuild 97/100/100/100 (Performance, Barrierefreiheit, Best Practices, SEO) mobil und 100 in allen vier Kategorien auf Desktop. Ein vollständiger Axe-Lauf (WCAG 2.0 bis 2.2 AA plus Best Practices) findet auf allen Routen und im geöffneten Mobilmenü keine Verstöße. Auf sieben Viewports von 320 bis 1920 px gibt es keinen horizontalen Überlauf, kein Text unter 12 px und ein CLS von 0.

Das Optimierungspotenzial liegt deshalb nicht im Fundament, sondern in fünf Bereichen:

1. **Navigation und Seitenstruktur.** Das Menü mischt Detailseiten (Unternehmen, Systeme) mit Startseiten-Ankern (Vorgehen, Kontakt). Ziel ist ein Menü aus drei echten Zielen: Unternehmen, Systeme, Kontakt.
2. **Inhaltliche Tiefe.** Das Systeme-Dossier wiederholt die Startseite mit zirkulären Einzeilern. Beide Dossiers brauchen Substanz, damit der zweite Klick etwas bringt.
3. **Bildmaterial und Marke.** Das Hero-Bild ist mit 1920 × 635 px zu klein für die viewporthohe Fläche und wirkt auf Desktop weich. Favicon- und iOS-Icons sind unvollständig, die Wortmarke fehlt im Header, Bildlizenzen sind nicht dokumentiert.
4. **Recht und Datenschutz.** Impressum und Datenschutzerklärung sind ehrlich und im Kern korrekt, es fehlen Details (Speicherdauer der Logs, EU-Verarbeitungsregion für das Formular, Bildrechte) und die anwaltliche Freigabe.
5. **Technische Härtung und Prozess.** Nonce-basierte CSP statt `unsafe-inline`, wirksames Rate-Limiting, CI-Pipeline, Unit-Tests, konsolidierte Dokumentation.

Alles Weitere ist Feinschliff: ein Waisenelement im Systeme-Ledger, eine doppelte Trennlinie im mobilen Kontaktbereich, Leerraum im Hero ab 1440 px, uneinheitliche Telefonnummern, englische Gedankenstriche in deutschen Texten.

## 2. Was bereits gut ist und erhalten bleibt

- Stack: Next.js 16.3.4, React 19, Tailwind 4, TypeScript, keine Animationsbibliothek, keine Drittanbieter-Requests, Fonts selbst gehostet.
- Sicherheit: HSTS mit Preload, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, kein `poweredByHeader`. `npm audit` ohne Befund.
- SEO: lokalisierte Titel und Descriptions, Canonical und hreflang inklusive x-default, Sitemap mit Sprachalternativen, robots.txt, JSON-LD (Organization, WebSite, WebPage, BreadcrumbList, Person), route-spezifische OG-Bilder in 1200 × 630.
- Barrierefreiheit: Skip-Link, sichtbarer Fokus, 44-px-Ziele, semantische Listen für Prozess und Ledger, Mobilmenü mit `inert`, Fokusfalle, Escape und Rückfokus, `prefers-reduced-motion` global respektiert, Formularfehler mit `aria-invalid`, `aria-describedby` und Fokussteuerung.
- Kontaktformular: Client- und Servervalidierung, Honeypot, Payload-Limit, HTML-Escaping, Reply-To, keine vorgetäuschten Erfolge ohne Mailkonfiguration.
- Design: klare Palette aus dem Logo (Graphit, Elaman-Blau #244074, Rot nur für Pflicht und Fehler), Geist als einzige Schrift, ruhige Hairlines, vier Fotos mit festen Rollen. Das wirkt seriös und zeitgemäß und ist die richtige Richtung für den Sektor.
- Sprache: Deutsch ist als Originalsprache geschrieben, Englisch eigenständig in britischer Schreibweise. Keine Superlative, keine erfundenen Zahlen, ein einziger 25+ Wert.

Kontext zum Unternehmen: Elaman GmbH (HRB 153662, Amtsgericht München) liefert Sicherheitstechnik ausschließlich an Behörden und sicherheitsrelevante Organisationen. Das Unternehmen taucht seit Jahren in Presse- und Registerveröffentlichungen auf (unter anderem netzpolitik.org, Handelsregister-Dokumente). Die Website muss deshalb erst recht nüchtern, faktisch und juristisch angreifbar frei bleiben. Die aktuelle Tonlage ist dafür richtig.

## 3. Befunde im Detail

Schweregrad: **A** = spürbar für Besucher oder rechtlich relevant, **B** = Qualität und Professionalität, **C** = Feinschliff.

### 3.1 Navigation und Informationsarchitektur

| Nr. | Befund                                                                                                                                                                                                                                                                                                            | Grad |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| N1  | Desktop-Menü: Unternehmen und Systeme sind Seiten, Vorgehen und Kontakt sind Anker auf der Startseite. Von einem Dossier aus springt "Kontakt" zurück auf die Startseite und scrollt. Das ist für Besucher nicht vorhersehbar und für den Code aufwendig (Scroll-Spy im Header, Anchor-Manager, Snap-Aussetzung). | A    |
| N2  | Es gibt keine Kontaktseite mit eigener URL. Für Behördenkunden, Verlinkungen aus Mails und für Suchmaschinen ("Elaman Kontakt") ist eine eigene Seite Standard.                                                                                                                                                   | A    |
| N3  | Das Vorgehen (vier Schritte) auf der Startseite und die drei Arbeitsprinzipien im Unternehmens-Dossier überschneiden sich inhaltlich. Ein Prozess, an zwei Orten unterschiedlich erzählt.                                                                                                                         | B    |
| N4  | Der Footer enthält nur Adresse und Rechtliches. Auf Dossierseiten fehlt damit unten jede Weiternavigation; der einzige Rückweg ist "Zur Übersicht" oben.                                                                                                                                                          | B    |
| N5  | Die Rücklinks "Zur Übersicht" führen auf `/de#profile` bzw. `/de#systems`, also mitten in die Startseite. Erwartbar wäre "Startseite".                                                                                                                                                                            | C    |
| N6  | Fehlerseite (`error.tsx`) ist nur auf Deutsch, auch unter `/en`.                                                                                                                                                                                                                                                  | C    |

**Zielbild Navigation**

- Header Desktop: Unternehmen · Systeme · Kontakt · DE/EN. Signet bleibt Home.
- Mobilmenü: Start · Unternehmen · Systeme · Kontakt, darunter Rechtliches und Sprache.
- Neue Seite `/de/kontakt` ↔ `/en/contact`: Anfrageformular, Adresse, Telefon, E-Mail, Bürofoto, Hinweis zur Erreichbarkeit. Kein Kartendienst (Datenschutz).
- Startseite: bleibt fünfteilig, der Kontaktabschnitt wird zum kompakten Abschluss (Bürofoto, Direktkontakt, Button "Anfrage senden" zur Kontaktseite). Alternativ bleibt das Formular auf der Startseite und die Kontaktseite bettet dieselbe Komponente ein; das ist die konservativere Variante.
- Vorgehen bleibt als Startseitenabschnitt (mit Anker für interne Links), verschwindet aber aus dem Menü und wird im Unternehmens-Dossier ausführlicher erzählt. Die drei Prinzipien gehen darin auf.
- Footer: drei Spalten (Navigation, Kontakt, Rechtliches) plus Sprachwechsel. Auf allen Seiten gleich.
- Header-Code: Scroll-Spy und Anker-Sonderfälle entfallen, aktiver Zustand ist rein pfadbasiert. Weniger Client-JS, weniger Fehlerquellen.

### 3.2 Inhalte und Sprache

| Nr. | Befund                                                                                                                                                                                                                                                                                                                      | Grad |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| T1  | Systeme-Dossier: Die fünf Beschreibungen sind zirkulär ("Verdeckte Audio- und Videoobservation: Systeme zur verdeckten Erfassung und Aufzeichnung von Audio- und Videosignalen"). Das ist genau das Muster, das `CONTENT_BLUEPRINT.md` selbst verbietet. Die Seite liefert gegenüber der Startseite keine neue Information. | A    |
| T2  | Unternehmens-Dossier bleibt ohne belegbare Fakten (seit wann, wo, Teamgröße, Herstellerpartnerschaften, Einsatzräume). Ohne Freigabe solcher Fakten bleibt es Atmosphäre.                                                                                                                                                   | B    |
| T3  | Profil-Titel DE "Lösungen und Produkte im Bereich der Sicherheitstechnik." enthält die Füllformel "im Bereich der". Vorschlag: "Sicherheitstechnik für Behörden. Aus München." oder "Sicherheitssysteme für Behörden und sicherheitsrelevante Organisationen." Freigabe durch Holger nötig.                                 | B    |
| T4  | "Elaman liefert diese Bereiche einzeln" (Systeme-Intro): Bereiche liefert man nicht. Besser "diese Systeme".                                                                                                                                                                                                                | C    |
| T5  | Typografie: englische Geviertstriche "—" in deutschen Texten (404, Fehlermeldungen, Datenschutzerklärung). Deutsch verwendet den Halbgeviertstrich "–" mit Leerzeichen.                                                                                                                                                     | C    |
| T6  | Telefonnummer in drei Schreibweisen: "+49 (0) 89 - 24 20 91 80" (Kontakt), "+49 (0) 89 24 20 91 80" (Impressum), `tel:+498924209180`. Eine Schreibweise nach DIN 5008, zum Beispiel "+49 89 24209180".                                                                                                                      | C    |
| T7  | Interne Anfrage-Mail ist Englisch ("New Elaman website inquiry"), das Team ist Deutsch. Betreff sollte Firma und Name tragen.                                                                                                                                                                                               | C    |
| T8  | Server-Fehlermeldungen des Formulars sind nur Englisch. Sie erscheinen selten (Client validiert vorher), sollten aber lokalisiert sein.                                                                                                                                                                                     | C    |
| T9  | Englisch: "Site notice" ist verständlich, "Legal notice" ist die gängigere Bezeichnung. "Approach" entfällt mit dem neuen Menü.                                                                                                                                                                                             | C    |
| T10 | 404-Text: "womöglich" ist für den Ton zu umgangssprachlich, "möglicherweise" passt.                                                                                                                                                                                                                                         | C    |
| T11 | `og:image:alt` der Startseite ist auf der deutschen Seite englisch.                                                                                                                                                                                                                                                         | C    |

Was am Text gut ist und bleiben soll: der Bogen "Bindeglied zwischen Vertrauen und Sicherheit", die Klarheit von "Wir arbeiten ausschließlich für Sicherheitsbehörden und sicherheitsrelevante Organisationen", die Prozessbeschreibung, die Kontakttexte ("Ein paar Sätze zur Aufgabe genügen für den ersten Austausch."). Die englischen Texte sind eigenständig formuliert und lesen sich nicht übersetzt.

### 3.3 Corporate Design, Bilder, Marke

| Nr. | Befund                                                                                                                                                                                                                                                                                                                                                                                           | Grad |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| D1  | Hero-Bild `elaman-advice.jpg` ist 1920 × 635 px. Die Fläche ist auf Desktop halbe Breite und volle Höhe (bei 1440 × 900 rund 720 × 820 px). Das Bild wird 1,3-fach, auf Retina 2,6-fach hochskaliert und wirkt weich. Es ist das erste, was jeder Besucher sieht. Lösung: Original in mindestens 2600 px Höhe beschaffen oder die Komposition ändern (Bildhöhe begrenzen, Format 16:9 als Band). | A    |
| D2  | `elaman-systems-media-mining.jpg` (1198 × 1800 px) ist körnig; als WebP bei 1080 px Breite 290 KB, die anderen Bilder liegen bei 26 bis 34 KB. Neu exportieren (entrauscht, sRGB, Qualität 70) oder bessere Quelle.                                                                                                                                                                              | B    |
| D3  | `elaman-profile-bridge.jpg` ist ein CMYK-JPEG mit 2 MB und EXIF-Copyright "styf" (Stockmotiv). Als sRGB neu exportieren (unter 400 KB); Lizenz nachweisen.                                                                                                                                                                                                                                       | B    |
| D4  | Bildrechte sind nirgends dokumentiert (Chamäleon, Brücke, Passanten, Büro). In Deutschland ein reales Abmahnrisiko. Lizenzdossier anlegen (Quelle, Lizenz, Lizenznehmer, Datum).                                                                                                                                                                                                                 | A    |
| D5  | Der Header zeigt nur das Punkt-Signet. Die Wortmarke "elaman" (auf dem Büroschild zu sehen) fehlt, der Firmenname erscheint erst im Hero. Für Wiedererkennung auf Desktop: Signet plus Wortmarke als SVG. Braucht das Vektorlogo vom Kunden; das vorhandene PNG (470 × 180) ist dafür nicht scharf genug. Entscheidung offen, die Design-Dokumentation hatte "nur Signet" freigegeben.           | B    |
| D6  | Favicon nur als SVG. Safari zeigt SVG-Favicons nicht an. `apple-touch-icon` verweist auf das 470 × 180 Logo-PNG, auf iOS erscheint es verzerrt. Manifest mit `display: standalone` ohne PWA-Zweck. Lösung: Icon-Set (favicon.ico, 32/192/512 PNG, apple-touch-icon 180 × 180), Manifest auf `browser` oder entfernen.                                                                            | B    |
| D7  | Passanten-Motiv (Media Mining) ist wörtlich "Überwachung von oben". Für die Zielgruppe verständlich, in der Außenwirkung angreifbar. Optional ein technisches oder abstraktes Motiv prüfen. Entscheidung Holger.                                                                                                                                                                                 | C    |
| D8  | Farbsystem, Typografie und Hairline-Logik sind konsistent und gut. Keine Änderung.                                                                                                                                                                                                                                                                                                               | –    |

### 3.4 Responsive Verhalten und Layout

Geprüft: 320 × 568, 390 × 844, 768 × 1024, 1024 × 768, 1366 × 768, 1440 × 900, 1920 × 1080, jeweils DE und EN, alle Routen, dazu iPhone 15 mit Touch-Emulation. Kein Überlauf, keine abgeschnittenen Texte, Formularfehler-Zustand sauber.

| Nr. | Befund                                                                                                                                                                                                                                          | Grad |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| L1  | Hero ab 1440 px: rechte Hälfte großteils leer, Text wirkt klein für die Fläche; bei 1920 px besonders deutlich. Optionen: Display-Größe an XL erhöhen, Bildanteil 55/45, oder ein drittes ruhiges Element (Einzeiler zur Firma).                | B    |
| L2  | Sektion "Vorgehen" auf großen Displays: `min-height` von einer Viewporthöhe erzeugt sehr viel Leerraum über und unter dem Inhalt. Screen-Höhe nur für Hero erzwingen, übrige Sektionen mit natürlichen Abständen (oder eine Obergrenze setzen). | B    |
| L3  | Scroll-Snap (proximity) auf Desktop: technisch sauber umgesetzt, aber für eine Unternehmensseite ungewöhnlich und von manchen Nutzern als Haken beim Scrollen empfunden. Empfehlung: entfernen, zusammen mit L2. Entscheidung Tobi.             | B    |
| L4  | Systeme-Ledger: fünf Einträge in zwei Spalten ergeben eine Waise (05 allein), im Dossier bleibt eine leere umrandete Zelle stehen. Fünften Eintrag über volle Breite oder Layout 3 + 2.                                                         | C    |
| L5  | Kontakt mobil: zwischen Kontaktdaten und Formular stehen zwei Trennlinien mit Leerraum dazwischen (dl-Rahmen plus Formular-Rahmen). Eine Linie.                                                                                                 | C    |
| L6  | Kontakt bei 1024 px: Bildspalte schmal, Schild nur angeschnitten. Akzeptabel, bei Neuschnitt (D1) mit prüfen.                                                                                                                                   | C    |

### 3.5 Barrierefreiheit

Stand: Axe 0 Verstöße auf allen Routen (Desktop und Mobil, Menü offen), Lighthouse Accessibility 100. Damit ist WCAG 2.2 AA in den automatisiert prüfbaren Kriterien erfüllt. Offen bleiben manuelle Kriterien:

| Nr. | Befund                                                                                                                                                                                                                                                                                                                                                      | Grad |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| A1  | Pflichtfelder sind nur mit Sternchen (aria-hidden) markiert. Eine Legende "\* Pflichtfeld" über dem Formular fehlt.                                                                                                                                                                                                                                         | C    |
| A2  | Nach fehlgeschlagener Absendung wird das erste Fehlerfeld fokussiert (gut). Eine Fehlerzusammenfassung am Formularanfang wäre Best Practice bei mehreren Fehlern.                                                                                                                                                                                           | C    |
| A3  | Manuelle Tests fehlen: VoiceOver (iOS/macOS), NVDA (Windows), 200 % Zoom, 400 % Zoom bei 320 px (Reflow), Windows-Kontrastmodus. In die Testmatrix aufnehmen.                                                                                                                                                                                               | B    |
| A4  | Rechtlich: Das Barrierefreiheitsstärkungsgesetz (seit 28. Juni 2025) gilt für Verbraucherangebote. Elaman richtet sich ausschließlich an Behörden und Organisationen und fällt nicht darunter. WCAG 2.2 AA bleibt trotzdem der Anspruch, weil Behördenkunden das erwarten. Eine freiwillige "Erklärung zur Barrierefreiheit" ist möglich, aber nicht nötig. | –    |

### 3.6 Recht und Datenschutz (Deutschland)

| Nr. | Befund                                                                                                                                                                                                                                                                                                                                                                                  | Grad |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| R1  | Impressum: § 5 DDG, Vertretung, Kontakt, Registergericht und HRB 153662, USt-IdNr., § 18 Abs. 2 MStV vorhanden. HRB stimmt mit öffentlichen Registerdaten überein. Die Steuernummer ist keine Pflichtangabe und sollte aus Gründen des Identitätsschutzes entfallen (USt-IdNr. genügt). Fax nur behalten, wenn der Anschluss existiert. Streitschlichtungshinweise entfallen (nur B2C). | B    |
| R2  | Datenschutzerklärung beschreibt nur reale Verarbeitung, keine Cookies, keine Drittdienste; damit kein Consent-Banner nötig. Das ist korrekt und ein Vorteil. Es fehlen: Speicherdauer beziehungsweise Kriterien für Server-Logs (Art. 13 Abs. 2 lit. a DSGVO), konkrete Übermittlungsgrundlage je Anbieter (Vercel ist DPF-zertifiziert, Resend prüfen), Datum aktualisieren.           | A    |
| R3  | Das Kontaktformular wird als Serverless Function ausgeführt; ohne Konfiguration läuft sie in den USA (Vercel Standardregion). Mit `preferredRegion = "fra1"` wird die Anfrage in Frankfurt verarbeitet. Resend-Region (EU) prüfen. Danach in der Datenschutzerklärung nachziehen.                                                                                                       | A    |
| R4  | Bildrechte: siehe D4.                                                                                                                                                                                                                                                                                                                                                                   | A    |
| R5  | Anwaltliche Freigabe von Impressum und Datenschutzerklärung steht seit Monaten aus (in allen Projektdokumenten vermerkt). Vor den Textänderungen aus diesem Plan einholen, damit nur einmal geprüft wird.                                                                                                                                                                               | A    |
| R6  | Kein Kartendienst, keine Fonts von Google-Servern, keine Analytics: alles korrekt. Falls später Reichweitenmessung gewünscht ist, Vercel Web Analytics (cookielos) einsetzen und die Erklärung ergänzen.                                                                                                                                                                                | –    |

### 3.7 Technik, Code, Sicherheit

| Nr. | Befund                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Grad |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| K1  | CSP erlaubt `script-src 'unsafe-inline'`. Damit ist der XSS-Schutz der CSP praktisch aufgehoben. Nonce-basierte CSP mit `strict-dynamic` über Next-Middleware ist mit App Router Standard und für eine Sicherheitsfirma ein sichtbares Qualitätsmerkmal (A+ bei securityheaders.com).                                                                                                                                                                     | A    |
| K2  | Rate-Limit liegt im Prozessspeicher. Auf Vercel hat jede Function-Instanz ihren eigenen Speicher, der Schutz greift kaum. Optionen ohne Drittanbieter: Vercel Firewall Rate-Limiting auf `/api/contact`, zusätzlich Origin-Prüfung und Mindestzeit zwischen Seitenaufruf und Absenden (Zeitstempel-Feld). Keine Captchas von Drittanbietern (Datenschutz).                                                                                                | B    |
| K3  | Keine CI. Es gibt kein `.github/workflows`. Lint, Typecheck, Prettier, Build und Playwright laufen nur lokal. Vercel baut Previews, prüft aber keine Tests.                                                                                                                                                                                                                                                                                               | A    |
| K4  | Keine Unit-Tests für Validierung, E-Mail-Escaping und i18n-Pfade. Playwright deckt Routen und Interaktion ab, aber keine visuelle Regression.                                                                                                                                                                                                                                                                                                             | B    |
| K5  | Header: Scroll-Spy per Scroll-Listener und `getBoundingClientRect`. Entfällt mit der neuen Navigation; falls Anker bleiben, IntersectionObserver.                                                                                                                                                                                                                                                                                                         | C    |
| K6  | `typedRoutes` ist aktiv, aber Inhalte tragen Pfade als Strings mit `as Route` Casts. Pfade über die i18n-Helfer erzeugen, Casts entfernen.                                                                                                                                                                                                                                                                                                                | C    |
| K7  | Build und Dev laufen mit `--webpack`; Turbopack ist in Next 16 Standard und schneller. Grund prüfen, sonst umstellen.                                                                                                                                                                                                                                                                                                                                     | C    |
| K8  | Bildquellen: CMYK, 2 MB, Körnung (siehe D2, D3). Quelldateien bereinigen, damit Repository und Bildoptimierung sauber bleiben.                                                                                                                                                                                                                                                                                                                            | B    |
| K9  | Dokumentation: sieben Markdown-Dateien mit rund 60 KB, teils widersprüchlich (AGENTS.md nennt die Rechtsseiten sprachneutral, sie sind lokalisiert; IMPLEMENTATION_PLAN.md beschreibt einen "nicht committeten" Stand, der längst live ist; PROJECT_CONTEXT.md enthält lokale Mac-Pfade). Auf README, AGENTS.md, CONTENT_BLUEPRINT.md und DESIGN_SYSTEM.md konsolidieren, Rest entfernen. Codex-Skills unter `.agents/skills` als Claude-Skills spiegeln. | B    |
| K10 | Fehlerseite `error.tsx` nicht lokalisiert (siehe N6). `global-error.tsx` mit Inline-Styles ist als Notfallseite in Ordnung.                                                                                                                                                                                                                                                                                                                               | C    |
| K11 | Sitemap-`lastmod` ist ein manuell gepflegtes Datum. Aus dem Git-Datum der Inhaltsdateien ableiten.                                                                                                                                                                                                                                                                                                                                                        | C    |
| K12 | Dependency-Updates: Renovate oder Dependabot aktivieren, wöchentlich. Next 16.3.4 protokolliert bei 404 einen bekannten `NoFallbackError` (Framework-Bug), Update beobachten.                                                                                                                                                                                                                                                                             | C    |

### 3.8 SEO und Auffindbarkeit

Technisch ist alles Wesentliche vorhanden. Offen:

| Nr. | Befund                                                                                                                                                                                                                                  | Grad |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| S1  | NAP-Konsistenz (Name, Adresse, Telefon) außerhalb der Website: Branchenverzeichnisse führen teils noch die alte Adresse Baierbrunner Straße 15. Google Business Profile, Bing Places, LinkedIn und Kompass auf Implerstraße 24 bringen. | B    |
| S2  | Search Console: Sitemap nach dem nächsten Deployment einreichen, alte Wix-URLs auf Weiterleitungen prüfen (bisher nur `/imprint` und `/private-policy`).                                                                                | B    |
| S3  | `sameAs` im Organization-Schema (LinkedIn) ergänzen.                                                                                                                                                                                    | C    |
| S4  | Kontaktseite mit eigener URL (N2) deckt die Suche "Elaman Kontakt" ab.                                                                                                                                                                  | –    |

## 4. Umsetzungsplan

Sechs Phasen. Innerhalb einer Phase können Pakete parallel laufen, Phasen bauen aufeinander auf. Aufwand ist grob in Arbeitsstunden eines Sub-Agenten plus Review geschätzt.

### Phase 0: Entscheidungen und Material (blockiert Phase 1 bis 3 teilweise)

Von Tobi:

- E1 Kontaktseite mit Formular, Startseite mit kompaktem Kontaktabschluss (empfohlen) oder Formular an beiden Stellen.
- E2 Scroll-Snap und Viewport-Sektionen entfernen (empfohlen) oder behalten.
- E3 Wortmarke im Header ja/nein.

Von Holger:

- M1 Hero-Originalbild (Chamäleon) in hoher Auflösung, mindestens 2600 px Höhe.
- M2 Vektorlogo (SVG, EPS oder AI) mit Signet und Wortmarke.
- M3 Lizenznachweise für alle vier Fotos.
- M4 Je Systembereich drei bis vier Sätze Rohinformation (was wird geliefert, wie integriert, was bekommt der Kunde), ohne operative Details.
- M5 Unternehmensfakten mit Freigabe: Gründungsjahr, Standort seit, Teamgröße, Herstellerpartnerschaften, Einsatzräume (nur was öffentlich sein darf).
- M6 Freigabe Profil-Titel (T3), Entscheidung Steuernummer und Fax im Impressum.
- M7 Anwaltliche Prüfung terminieren (R5), idealerweise nach Phase 4.

### Phase 1: Struktur und Navigation (Aufwand 8 bis 10 h)

| Paket                                  | Inhalt                                                                                                                                                  | Abhängig von |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| P1.1 Kontaktseite                      | Route `/de/kontakt` und `/en/contact`, Inhalte in `lib/content`, Metadaten, hreflang, Sitemap, JSON-LD (ContactPage), Formular als geteilte Komponente. | E1           |
| P1.2 Header und Menü                   | Drei Ziele plus Sprache, aktiver Zustand pfadbasiert, Scroll-Spy und Anker-Sonderfälle entfernen, Mobilmenü anpassen, Tests aktualisieren.              | P1.1         |
| P1.3 Footer                            | Drei Spalten (Navigation, Kontakt, Rechtliches) plus Sprachwechsel, auf allen Seiten.                                                                   | P1.1         |
| P1.4 Startseite                        | Kontaktabschluss kompakt, Rücklinks der Dossiers auf Startseite, Anker nur noch für interne Links.                                                      | E1, E2       |
| P1.5 Vorgehen ins Unternehmens-Dossier | Vier Schritte ersetzen die drei Prinzipien, Texte zusammenführen, Blueprint aktualisieren.                                                              | –            |

### Phase 2: Inhalte und Sprache (Aufwand 6 bis 8 h plus Freigaben)

| Paket                      | Inhalt                                                                                                                                                                                                | Abhängig von  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| P2.1 Systeme-Dossier       | Fünf Bereiche mit substanziellen Beschreibungen, DE und EN eigenständig, keine zirkulären Definitionen, Blueprint-Regeln einhalten.                                                                   | M4            |
| P2.2 Unternehmens-Dossier  | Freigegebene Fakten einarbeiten, Prozess integrieren (P1.5).                                                                                                                                          | M5            |
| P2.3 Sprachfeinschliff     | T3 bis T11: Profil-Titel, Systeme-Intro, Halbgeviertstriche, Telefonnummer nach DIN 5008, Mail-Template auf Deutsch, Server-Fehlermeldungen lokalisiert, "Legal notice", 404-Ton, OG-Alt lokalisiert. | M6            |
| P2.4 Redaktionelle Prüfung | Kompletter Lesedurchgang DE und EN gegen Blueprint-Regeln (Rhythmus, Wiederholungen, Füllwörter). Bericht statt Autoänderung.                                                                         | P2.1 bis P2.3 |

### Phase 3: Design, Bild, Marke (Aufwand 8 bis 10 h)

| Paket                   | Inhalt                                                                                                                                                        | Abhängig von |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| P3.1 Bildquellen        | Hero in hoher Auflösung einbauen, Media Mining neu exportieren, Brücke als sRGB, alle Quellen unter 500 KB, Crops und `sizes` prüfen.                         | M1, M3       |
| P3.2 Icons und Manifest | favicon.ico, PNG 32/192/512, apple-touch-icon 180, Manifest bereinigen, Metadaten in `app/(marketing)/[locale]/layout.tsx`.                                   | M2           |
| P3.3 Wortmarke          | Signet plus Wortmarke im Header (Desktop), Signet allein mobil.                                                                                               | E3, M2       |
| P3.4 Layout-Feinschliff | L1 Hero ab 1440 px, L2/L3 Sektionshöhen und Snap, L4 Ledger-Waise, L5 doppelte Linie, Formular-Legende (A1). Screenshots auf sieben Viewports vorher/nachher. | E2           |

### Phase 4: Recht und Datenschutz (Aufwand 3 bis 4 h plus Anwalt)

| Paket                     | Inhalt                                                                                                    | Abhängig von   |
| ------------------------- | --------------------------------------------------------------------------------------------------------- | -------------- |
| P4.1 EU-Verarbeitung      | `preferredRegion = "fra1"` für `/api/contact`, Resend-Region prüfen, Vercel-Logs-Retention dokumentieren. | –              |
| P4.2 Impressum            | Steuernummer entfernen (nach M6), Fax klären, Telefonformat.                                              | M6             |
| P4.3 Datenschutzerklärung | Speicherdauer Logs, Übermittlungsgrundlage je Anbieter, Kontaktseite erwähnen, Datum. EN nachziehen.      | P4.1           |
| P4.4 Lizenzdossier        | `docs/IMAGE_LICENSES.md` mit Quelle, Lizenz, Lizenznehmer, Datum je Bild.                                 | M3             |
| P4.5 Anwaltliche Prüfung  | Beide Dokumente in beiden Sprachen, Rückmeldungen einarbeiten.                                            | M7, P4.2, P4.3 |

### Phase 5: Technik und Prozess (Aufwand 10 bis 12 h, weitgehend parallel zu Phase 1 bis 4)

| Paket              | Inhalt                                                                                                                                                                                                      | Abhängig von      |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| P5.1 CSP mit Nonce | Middleware erzeugt Nonce pro Request, `strict-dynamic`, `unsafe-inline` nur noch für Styles, JSON-LD-Skripte mit Nonce, Tests auf Header.                                                                   | –                 |
| P5.2 Spam-Schutz   | Vercel Firewall Rate-Limit auf `/api/contact`, Origin-Prüfung, Zeitstempel-Feld gegen Sofort-Submits, In-Memory-Limit als zweite Linie behalten.                                                            | –                 |
| P5.3 CI            | GitHub Actions: Lint, Typecheck, Prettier, Build, Playwright (Chromium und WebKit) auf jedem PR; Node 24 wie auf Vercel.                                                                                    | –                 |
| P5.4 Tests         | Vitest für Validierung, Escaping, i18n-Pfade, Sitemap; Playwright-Screenshots auf sieben Viewports als visuelle Regression.                                                                                 | P5.3              |
| P5.5 Code-Hygiene  | K6 Route-Typen ohne Casts, K7 Turbopack, K10 Fehlerseite lokalisieren, K11 Sitemap-Datum, K12 Renovate.                                                                                                     | –                 |
| P5.6 Dokumentation | Konsolidieren auf README, AGENTS.md, CONTENT_BLUEPRINT.md, DESIGN_SYSTEM.md; PROJECT_CONTEXT.md, IMPLEMENTATION_PLAN.md, DESIGN_DIRECTION.md, PRODUCT.md einarbeiten und entfernen; Claude-Skills spiegeln. | Ende aller Phasen |

### Phase 6: Qualitätssicherung und Launch (Aufwand 4 bis 6 h)

| Paket                  | Inhalt                                                                                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P6.1 Gerätetest        | Vercel-Preview auf echten Geräten: iPhone (Safari), Android (Chrome), iPad, Windows (Edge, Firefox), macOS (Safari). Sieben Viewports per Screenshot.            |
| P6.2 Assistive Technik | VoiceOver iOS und macOS, NVDA, Tastatur komplett, 200 % und 400 % Zoom, Kontrastmodus.                                                                           |
| P6.3 Performance       | Lighthouse mobil und desktop auf allen Routen, Ziel weiterhin 95+ überall, LCP unter 2,5 s auf Mobil.                                                            |
| P6.4 Sicherheit        | securityheaders.com A+, Mozilla Observatory, `npm audit`, Formular-Missbrauchstest.                                                                              |
| P6.5 Launch            | Merge nach `main`, Produktions-Testanfrage mit Reply-To-Prüfung, Search Console Sitemap, NAP-Verzeichnisse (S1), Resend-Key rotieren (steht seit Monaten offen). |

## 5. Orchestrierung der Umsetzung

- **Lead (Claude Fable):** Briefing je Paket mit klaren Abnahmekriterien, Review jedes Diffs gegen Blueprint, Design-System und diesen Plan, Freigabe-Gate vor jedem Merge.
- **Umsetzung (Claude Opus, je Paket ein Sub-Agent):** eigenständige Umsetzung inklusive Tests und Screenshots. Pakete ohne Abhängigkeit laufen parallel (Phase 5 neben Phase 1).
- **Mechanische Pakete (Claude Sonnet):** Icon-Set, Bildexporte, Dokumentations-Konsolidierung, Renovate-Konfiguration.
- **Arbeitsweise:** Ein Feature-Branch je Phase, ein Draft-PR, Vercel-Preview pro Push. Gate für jeden Push: `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run build`, `npm run test:e2e`, Screenshots auf 320/390/768/1024/1366/1440/1920 in DE und EN.
- **Freigaben durch Holger:** nur bei Texten und Bildern (Phase 2 und 3) und beim Impressum (Phase 4). Alles andere ist technische Umsetzung ohne Rückfrage.
- **Reihenfolge, wenn Material fehlt:** Phase 5 und Phase 1 (mit E1/E2) sofort, Phase 3.2 und 3.4 sofort, Phase 2 und 3.1 sobald M1 bis M5 vorliegen, Phase 4 sobald M6 vorliegt.

## 6. Abnahmekriterien für den Abschluss

- Menü zeigt Unternehmen, Systeme, Kontakt; jede Menüseite hat eine eigene URL in beiden Sprachen mit reziproken hreflang-Links.
- Beide Dossiers liefern Informationen, die auf der Startseite nicht stehen; keine zirkuläre Definition, kein wiederholter Satz zwischen Startseite und Dossier.
- Hero-Bild ist auf 1440 × 900 und Retina scharf; kein Quellbild über 500 KB; alle Bildlizenzen dokumentiert.
- Vollständiges Icon-Set, Wortmarke gemäß Entscheidung.
- Impressum und Datenschutzerklärung anwaltlich freigegeben; Formularverarbeitung in der EU-Region.
- CSP ohne `unsafe-inline` für Skripte; securityheaders.com A+.
- CI grün auf jedem PR; Unit- und E2E-Tests inklusive visueller Regression.
- Lighthouse 95+ in allen Kategorien mobil und desktop auf allen Routen; Axe ohne Verstöße; manuelle Screenreader-Prüfung dokumentiert.
- Dokumentation auf vier Dateien konsolidiert und widerspruchsfrei.

## 7. Umsetzungsstand

Stand: 15. September 2026, Branch `claude/elaman-website-setup-qw1gom`, Pull Request #3. Alle umgesetzten Pakete haben Lint, Typecheck, Prettier, Build, 62 Unit-Tests und 31 Playwright-Tests (Chromium) auf dem Produktionsbuild bestanden. Axe meldet auf allen Routen keine Verstöße. Lighthouse nach den Änderungen: Startseite mobil 99/100/100/100, Kontaktseite mobil 96/100/100/100, Systeme-Dossier mobil 99/100/100/100, Startseite Desktop 100 in allen Kategorien.

| Paket                      | Stand                                 | Anmerkung                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P1.1 Kontaktseite          | umgesetzt                             | `/de/kontakt` ↔ `/en/contact`, ContactPage-Schema, Sitemap, hreflang, eigenes OG-Bild                                                                                                                                                                                                                                                                                                      |
| P1.2 Header und Menü       | umgesetzt                             | Unternehmen · Systeme · Kontakt, pfadbasierter Zustand, Scroll-Spy entfernt                                                                                                                                                                                                                                                                                                                |
| P1.3 Footer                | umgesetzt                             | drei Spalten auf allen Seiten, Sprachwechsel im Footer                                                                                                                                                                                                                                                                                                                                     |
| P1.4 Startseite            | umgesetzt                             | Kontaktabschluss ohne Formular, Rücklinks auf die Startseite                                                                                                                                                                                                                                                                                                                               |
| P1.5 Vorgehen ins Dossier  | umgesetzt                             | vier Schritte mit eigenen Texten ersetzen die drei Prinzipien                                                                                                                                                                                                                                                                                                                              |
| P2.1 Systeme-Dossier       | offen                                 | braucht M4 (Rohinformation je Bereich)                                                                                                                                                                                                                                                                                                                                                     |
| P2.2 Unternehmens-Dossier  | teilweise                             | Prozess integriert; Unternehmensfakten brauchen M5                                                                                                                                                                                                                                                                                                                                         |
| P2.3 Sprachfeinschliff     | umgesetzt bis auf T3                  | Profil-Titel braucht Freigabe (M6); Halbgeviertstriche, Telefonformat, Mail-Template, Server-Meldungen, „Legal notice“, 404-Ton erledigt                                                                                                                                                                                                                                                   |
| P2.4 Redaktionelle Prüfung | offen                                 | nach P2.1 und P2.2                                                                                                                                                                                                                                                                                                                                                                         |
| P3.1 Bildquellen           | offen                                 | braucht M1 und M3; Quellbilder unverändert                                                                                                                                                                                                                                                                                                                                                 |
| P3.2 Icons und Manifest    | umgesetzt                             | favicon.ico, PNG-Set, Apple-Icon, maskable, `npm run icons`                                                                                                                                                                                                                                                                                                                                |
| P3.3 Wortmarke             | offen                                 | braucht M2 (Vektorlogo)                                                                                                                                                                                                                                                                                                                                                                    |
| P3.4 Layout-Feinschliff    | umgesetzt                             | Snap entfernt, Sektionen auf 46rem gedeckelt, Hero ab 1536 px größer, Ledger-Waise, Formular-Legende                                                                                                                                                                                                                                                                                       |
| Motion (neu)               | umgesetzt                             | CSS-Scroll-Reveal über `animation-timeline: view()`, ohne JavaScript, mit Fallback und reduced-motion                                                                                                                                                                                                                                                                                      |
| P4.1 EU-Verarbeitung       | umgesetzt                             | Region `fra1` über `vercel.json`; `preferredRegion` ist in Next 16 veraltet. Resend-Region bleibt zu prüfen                                                                                                                                                                                                                                                                                |
| P4.2 Impressum             | teilweise                             | Telefonformat erledigt; Steuernummer und Fax brauchen M6                                                                                                                                                                                                                                                                                                                                   |
| P4.3 Datenschutzerklärung  | umgesetzt                             | Speicherdauer-Kriterium, Frankfurt, Datum; anwaltliche Prüfung offen                                                                                                                                                                                                                                                                                                                       |
| P4.4 Lizenzdossier         | offen                                 | braucht M3                                                                                                                                                                                                                                                                                                                                                                                 |
| P4.5 Anwaltliche Prüfung   | offen                                 | M7                                                                                                                                                                                                                                                                                                                                                                                         |
| P5.1 CSP mit Nonce         | bewusst zurückgestellt                | Eine Nonce-CSP erzwingt in Next 16 dynamisches Rendern jeder Seite. Damit entfiele das statische Prerendering mit CDN-Cache, das die 100er-Werte trägt, und jede Seitenanfrage liefe als Function. Die Seite rendert keine Nutzereingaben und hat keine Drittskripte; der praktische XSS-Gewinn ist gering. Empfehlung: bei einem späteren Wechsel auf dynamisches Rendern erneut bewerten |
| P5.2 Spam-Schutz           | umgesetzt (Code)                      | Herkunftsprüfung, Zeitprüfung, In-Memory-Limit. Vercel-Firewall-Regel muss im Dashboard angelegt werden                                                                                                                                                                                                                                                                                    |
| P5.3 CI                    | umgesetzt                             | GitHub Actions mit Lint, Typecheck, Prettier, Unit, Build, Playwright (Chromium und WebKit)                                                                                                                                                                                                                                                                                                |
| P5.4 Tests                 | umgesetzt bis auf visuelle Regression | 62 Unit-Tests, 31 E2E-Tests; Screenshot-Vergleich bewusst nicht als Assertion (Plattformabhängigkeit), Screenshots bleiben Teil des manuellen Gates                                                                                                                                                                                                                                        |
| P5.5 Code-Hygiene          | umgesetzt                             | Route-Typen ohne Casts, Turbopack, Fehlerseite lokalisiert, Dependabot (statt Renovate); Sitemap-Datum bleibt manuell                                                                                                                                                                                                                                                                      |
| P5.6 Dokumentation         | umgesetzt                             | vier Dokumente, Claude-Skills gespiegelt                                                                                                                                                                                                                                                                                                                                                   |
| P6.1 bis P6.4              | teilweise                             | automatisierte Prüfungen erledigt; echte Geräte, Screenreader und securityheaders.com bleiben manuell                                                                                                                                                                                                                                                                                      |
| P6.5 Launch                | offen                                 | Merge nach Freigabe, Testanfrage, Search Console, NAP, Resend-Key rotieren                                                                                                                                                                                                                                                                                                                 |

### Nachtrag: Seitenebenen und Titel

Nach dem ersten Durchlauf fiel auf, dass die Unterseiten schwer als solche zu erkennen waren. Die Messung bestätigte es: sechs Seiten, vier verschiedene linke Kanten der Überschrift, vier verschiedene Einstiegshöhen, drei Schriftgrößen für dieselbe Ebene, und die Rechtstexte trugen mit 84 Pixeln die größte Überschrift der Website.

| Paket                  | Status    | Ergebnis                                                                                                                                                                                                                |
| ---------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gemeinsamer Seitenkopf | umgesetzt | `PageHeader` für Unternehmen, Systeme, Kontakt, Impressum, Datenschutz und 404: weiß, auf dem Seitenraster, Brotkrume, Kürzel, Titel auf einer Stufe, Vorspann. Volle Bildschirmhöhe gehört jetzt allein der Startseite |
| Bildband               | umgesetzt | `MediaBand` ersetzt die gespiegelten Hero-Splits; Navy ist Akzent statt Seitenfläche, die Lesereihenfolge auf dem Handy ist überall gleich                                                                              |
| Brotkrume              | umgesetzt | Zwei Stufen auf jeder Unterseite, dazu `BreadcrumbList` auch für die Rechtstexte                                                                                                                                        |
| Rechtstexte            | umgesetzt | Gleiches Raster wie alle Unterseiten, Kasten entfernt                                                                                                                                                                   |
| Kontaktseite           | umgesetzt | Ohne Foto; das Büroblid trug vorher Startseite, Unternehmen und Kontakt zugleich                                                                                                                                        |
| Seitentitel            | umgesetzt | Alle unter 60 Zeichen, Suffix auf `Elaman` gekürzt, Budget als Unit-Test                                                                                                                                                |
| Motion (Korrektur)     | umgesetzt | Der Scroll-Reveal bewegt nur noch `transform`. Ein Fade auf einer Scroll-Timeline parkt halb sichtbare Blöcke bei reduzierter Deckkraft und fiel damit unter die Kontrastschwelle                                       |

### Nachtrag: Raster unterhalb der Seitenköpfe

Nach dem Seitenkopf blieb der Bereich darunter unruhig. Die Messung bei 1440 zeigte sechs verschiedene linke Kanten für Überschriften, bei 1024 allein auf der Systemseite vier.

| Paket               | Status    | Ergebnis                                                                                                                                            |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eine linke Kante    | umgesetzt | `SectionIntro` öffnet jeden Abschnitt auf dem Seitenraster. Bei 768, 1024 und 1280 liefert jede Seite genau eine Kante für ihre `h2`                |
| Bausteine           | umgesetzt | Textband, Bildband, Abschlussbalken. Die gespiegelten Splits und die Sidebar-Labels sind weg, die Startseite behält den Hero als einzigen Split     |
| Ein Labelstil       | umgesetzt | Mono, versal, blau, direkt über der Überschrift. Blaue Linie ohne Text und graues "Elaman" entfallen                                                |
| Überschriftenebenen | umgesetzt | `h1` Seite, `h2` Abschnitt, `h3` Eintrag. Die fünf Systembereiche waren `h2` auf Abschnittsebene, ihr Abschnitt hatte gar keine Überschrift         |
| Senkrechtes Raster  | umgesetzt | Feste Abstände statt zentrierter Mindesthöhen. Die Schwankung von 54 bis 281 Pixeln auf der Startseite ist weg, die Seite ist rund 570 Pixel kürzer |
| Systemliste         | umgesetzt | Einspaltig, keine Kreuz-Lesart, keine Waise                                                                                                         |
| Doppelungen         | umgesetzt | Startseite nennt, Unterseite erklärt. Kontaktdaten stehen auf Startseite und Dossiers nur noch im Fußbereich                                        |
| Brückenbild         | umgesetzt | Der Steinbogen steht nur noch auf der Startseite, die Zusammenarbeit wird ein Textband                                                              |

### Offen für Holger

Unverändert die Punkte M1 bis M7 aus Phase 0: Hero-Original in hoher Auflösung, Vektorlogo, Lizenznachweise, Rohtexte je Systembereich, freigegebene Unternehmensfakten, Entscheidung zu Profil-Titel, Steuernummer und Fax, Termin für die anwaltliche Prüfung.

### Offen für Tobi (Vercel-Dashboard)

- Firewall-Rate-Limit auf `/api/contact` anlegen.
- Nach dem Merge: Produktions-Testanfrage, Sitemap in der Search Console einreichen, Resend-Key rotieren.
