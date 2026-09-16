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

| Paket                      | Stand                  | Anmerkung                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P1.1 Kontaktseite          | umgesetzt              | `/de/kontakt` ↔ `/en/contact`, ContactPage-Schema, Sitemap, hreflang, eigenes OG-Bild                                                                                                                                                                                                                                                                                                      |
| P1.2 Header und Menü       | umgesetzt              | Unternehmen · Systeme · Kontakt, pfadbasierter Zustand, Scroll-Spy entfernt                                                                                                                                                                                                                                                                                                                |
| P1.3 Footer                | umgesetzt              | drei Spalten auf allen Seiten, Sprachwechsel im Footer                                                                                                                                                                                                                                                                                                                                     |
| P1.4 Startseite            | umgesetzt              | Kontaktabschluss ohne Formular, Rücklinks auf die Startseite                                                                                                                                                                                                                                                                                                                               |
| P1.5 Vorgehen ins Dossier  | umgesetzt              | vier Schritte mit eigenen Texten ersetzen die drei Prinzipien                                                                                                                                                                                                                                                                                                                              |
| P2.1 Systeme-Dossier       | offen                  | braucht M4 (Rohinformation je Bereich)                                                                                                                                                                                                                                                                                                                                                     |
| P2.2 Unternehmens-Dossier  | teilweise              | Prozess integriert; Unternehmensfakten brauchen M5                                                                                                                                                                                                                                                                                                                                         |
| P2.3 Sprachfeinschliff     | umgesetzt bis auf T3   | Profil-Titel braucht Freigabe (M6); Halbgeviertstriche, Telefonformat, Mail-Template, Server-Meldungen, „Legal notice“, 404-Ton erledigt                                                                                                                                                                                                                                                   |
| P2.4 Redaktionelle Prüfung | offen                  | nach P2.1 und P2.2                                                                                                                                                                                                                                                                                                                                                                         |
| P3.1 Bildquellen           | offen                  | braucht M1 und M3; Quellbilder unverändert                                                                                                                                                                                                                                                                                                                                                 |
| P3.2 Icons und Manifest    | umgesetzt              | favicon.ico, PNG-Set, Apple-Icon, maskable, `npm run icons`                                                                                                                                                                                                                                                                                                                                |
| P3.3 Wortmarke             | offen                  | braucht M2 (Vektorlogo)                                                                                                                                                                                                                                                                                                                                                                    |
| P3.4 Layout-Feinschliff    | umgesetzt              | Snap entfernt, Sektionen auf 46rem gedeckelt, Hero ab 1536 px größer, Ledger-Waise, Formular-Legende                                                                                                                                                                                                                                                                                       |
| Motion (neu)               | umgesetzt              | CSS-Scroll-Reveal über `animation-timeline: view()`, ohne JavaScript, mit Fallback und reduced-motion                                                                                                                                                                                                                                                                                      |
| P4.1 EU-Verarbeitung       | umgesetzt              | Region `fra1` über `vercel.json`; `preferredRegion` ist in Next 16 veraltet. Resend-Region bleibt zu prüfen                                                                                                                                                                                                                                                                                |
| P4.2 Impressum             | teilweise              | Telefonformat erledigt, Steuernummer entfernt (§ 5 DDG verlangt sie nicht); Fax braucht M6                                                                                                                                                                                                                                                                                                 |
| P4.3 Datenschutzerklärung  | umgesetzt              | Speicherdauer-Kriterium, Frankfurt, Datum; anwaltliche Prüfung offen                                                                                                                                                                                                                                                                                                                       |
| P4.4 Lizenzdossier         | offen                  | braucht M3                                                                                                                                                                                                                                                                                                                                                                                 |
| P4.5 Anwaltliche Prüfung   | offen                  | M7                                                                                                                                                                                                                                                                                                                                                                                         |
| P5.1 CSP mit Nonce         | bewusst zurückgestellt | Eine Nonce-CSP erzwingt in Next 16 dynamisches Rendern jeder Seite. Damit entfiele das statische Prerendering mit CDN-Cache, das die 100er-Werte trägt, und jede Seitenanfrage liefe als Function. Die Seite rendert keine Nutzereingaben und hat keine Drittskripte; der praktische XSS-Gewinn ist gering. Empfehlung: bei einem späteren Wechsel auf dynamisches Rendern erneut bewerten |
| P5.2 Spam-Schutz           | umgesetzt (Code)       | Herkunftsprüfung, Zeitprüfung, In-Memory-Limit. Vercel-Firewall-Regel muss im Dashboard angelegt werden                                                                                                                                                                                                                                                                                    |
| P5.3 CI                    | umgesetzt              | GitHub Actions mit Lint, Typecheck, Prettier, Unit, Build, Playwright (Chromium und WebKit)                                                                                                                                                                                                                                                                                                |
| P5.4 Tests                 | umgesetzt              | 80 Unit-Tests, 37 E2E-Tests plus 24 Screenshot-Vergleiche in der CI (P10.5), Lighthouse-Budget in der CI (P10.4)                                                                                                                                                                                                                                                                           |
| P5.5 Code-Hygiene          | umgesetzt              | Route-Typen ohne Casts, Turbopack, Fehlerseite lokalisiert, Dependabot (statt Renovate); Sitemap-Datum bleibt manuell                                                                                                                                                                                                                                                                      |
| P5.6 Dokumentation         | umgesetzt              | vier Dokumente, Claude-Skills gespiegelt                                                                                                                                                                                                                                                                                                                                                   |
| P6.1 bis P6.4              | teilweise              | automatisierte Prüfungen erledigt; echte Geräte, Screenreader und securityheaders.com bleiben manuell                                                                                                                                                                                                                                                                                      |
| P6.5 Launch                | offen                  | Merge nach Freigabe, Testanfrage, Search Console, NAP, Resend-Key rotieren                                                                                                                                                                                                                                                                                                                 |

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

## 8. Textrevision nach Holgers Word-Fassung

Grundlage ist `Elaman_Website_Texte_update.docx`, 482 Absätze, beide Sprachen. Holger hat nur die deutsche Fassung bearbeitet; die englischen Abschnitte des Dokuments sind der alte Stand der Ursprungsseite. Deutsch ist damit maßgeblich, Englisch zieht nach.

### Entschieden

| Frage                      | Entscheidung                                                               | Stand                        |
| -------------------------- | -------------------------------------------------------------------------- | ---------------------------- |
| Jahre Erfahrung            | 25+                                                                        | bereits live, beide Sprachen |
| Kundenkreis                | ausschließlich Sicherheitsbehörden und sicherheitsrelevante Organisationen | bereits live, beide Sprachen |
| Zahl der Leistungsbereiche | deutsche Fassung, nicht die acht der englischen                            | fünf, siehe P8.3             |
| Schutzlösungen             | deutsche Fassung                                                           | siehe P8.6                   |

Die englische Dokumentfassung nennt 20+ Jahre, einen dritten Kundenkreis und acht Leistungsbereiche. Nichts davon wird übernommen.

### Stand der Umsetzung

| Paket                        | Stand                   | Ergebnis                                                                                                                                  |
| ---------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| P8.1 Sprachpflege            | umgesetzt               | Sechs Formulierungen übernommen, dazu drei Stellen, die daran anschlossen                                                                 |
| P8.2 Fehler aus dem Dokument | umgesetzt               | Keiner der fünf Fehler ist in den Text gelangt; die Rufnummer bleibt nach DIN 5008                                                        |
| P8.3 Leistungsbereiche       | fünf                    | Entscheidung für die deutsche Startseite. Ob Observation und Auswertung zusammengehen, entscheidet Holger; die Änderung bleibt eine Zeile |
| P8.4 Positionierung          | live, Bestätigung offen | Kommunikations- und Sicherheitstechnik in Vorspann, Seitentitel, Beschreibungen, `description` und `knowsAbout`. Siehe E4 in Abschnitt 10 |
| P8.5 Arbeitsweise            | umgesetzt               | Vier Schritte auf beiden Seiten. Die Startseite nennt nur noch die Namen, die Beschreibungen stehen allein auf der Unternehmensseite      |
| P8.6 Schutzlösungen          | offen                   | Deutscher Text liegt im Dokument vor, ungeprüft von Holger. Siehe E6 und P10.11 in Abschnitt 10                                           |
| P8.7 Impressum               | umgesetzt               | Steuernummer in beiden Sprachen entfernt, USt-IdNr. bleibt                                                                                |

### P8.1 Sprachpflege ohne Entscheidungsbedarf

Sechs Formulierungen aus dem Dokument sind besser als der bisherige Stand und wurden übernommen, die Gedankenstriche dabei entfernt:

| Ort                         | Neu                                                                                                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Systemseite, Vorspann       | "Die folgenden Bereiche beschreiben, was Elaman liefert. Entscheidend ist, wie sie zusammenwirken: Ein Observationssystem nützt wenig, wenn die Auswertung nicht mithält." |
| Startseite, Planung         | "Aus dem Anforderungsprofil entsteht ein Systementwurf: welche Komponenten, welche Schnittstellen, welche Reihenfolge."                                                    |
| Unternehmen, Zusammenarbeit | "Das erspart Übergaben, bei denen Wissen verloren geht, und hält Entscheidungen nachvollziehbar."                                                                          |
| Unternehmen, Betreuung      | Zusatz "über Jahre, nicht über Monate"                                                                                                                                     |
| Systemseite, Funkerfassung  | "Projektbezogen ausgestattete Fahrzeuge, in denen Technik, Arbeitsplätze und Kommunikation als Einheit geplant werden."                                                    |
| Englisch, Projektansatz     | "Requirements first, technology second."                                                                                                                                   |

Drei weitere Stellen zogen nach, weil sie sonst neben den neuen Sätzen abgefallen wären: die Passivwendung "Übergeben wird ein System" auf der Unternehmensseite, der blasse Titel "Einzeln geplant oder als Gesamtsystem aufeinander abgestimmt." über den Leistungsbereichen, und die englischen Entsprechungen aller übernommenen Sätze.

Nicht übernommen wurden die Gedankenstriche, der abgesetzte Punkt in "Sicherheitslösungen. Aus München.", die Passivkonstruktionen ("Die Teams werden geschult", "Bevor Technik ausgewählt wird") und die unscharfe Wendung "Systeme im Bereich der gesamten Sicherheit".

### P8.2 Fehler aus dem Dokument, die nicht in die Seite dürfen

Vier Schreibfehler und ein Formatfehler stehen im Dokument und sind beim Übernehmen zu vermeiden: "Sichertechnologie" statt Sicherheitstechnologie, "wasElaman" ohne Leerzeichen, "ausschliesslich" in Schweizer Schreibweise, "Audio- und Video Auswertesysteme" ohne Durchkopplung, und die Rufnummer als "+49 (0) 89 - 24 20 91 80". Die Null in Klammern gehört nicht in eine internationale Nummer; die Seite schreibt nach DIN 5008 "+49 89 24209180".

### P8.3 Leistungsbereiche, offene Rückfrage

Die deutsche Fassung widerspricht sich selbst: die Startseite nennt fünf Bereiche, die Systemseite vier, weil Holger Observation und Auswertung zu einem Eintrag zusammengefasst hat. Es bleibt bei fünf, weil das der deutschen Startseite und den strukturierten Daten entspricht und "Auswertesysteme" ein eigener, suchbarer Begriff ist. Holger entscheidet, ob das so bleibt oder auf vier zusammengeht; die Änderung ist eine Zeile.

### P8.4 Positionierung: Kommunikations- und Sicherheitstechnik

Holgers deutsche Unternehmensseite beschreibt Elaman als "Münchner Unternehmen für Kommunikations- und Sicherheitstechnik". Das ist eine Erweiterung gegenüber "Sicherheitstechnik" und zieht sich durch: Vorspann der Unternehmensseite, deutscher Seitentitel, beide Beschreibungen für Suchergebnisse, `description` und `knowsAbout` in den strukturierten Daten. So ist es seit dem 15. September live.

Korrektur nach Auswertung der Änderungsverfolgung: Der Satz auf der Unternehmensseite ist Grundtext des Dokuments, den Holger nicht angefasst hat. Wo er auf der Startseite "Kommunikations- und" vorfand, hat er es zweimal gestrichen (Jahresangabe, Profiltitel), ebenso "Kommunikationsanbieter" beim Kundenkreis. Seine eigenen Eingriffe gehen also in die engere Richtung. Ob die Erweiterung auf der Unternehmensseite und in den Suchtexten stehen bleibt, muss er bestätigen (E4). Ein Rückbau betrifft neun Zeichenketten und dauert eine halbe Stunde.

### P8.5 Arbeitsweise, offene Rückfrage

Das Dokument führt auf der Startseite vier Schritte und auf der Unternehmensseite drei ("Die Aufgabe präzise erfassen", "Komponenten aufeinander abstimmen", "Den Betrieb langfristig begleiten"). Es bleibt bei vier auf beiden Seiten, weil die Startseite nennt und die Unterseite erklärt. Holgers drei Formulierungen sind in die vier Beschreibungen der Unternehmensseite eingearbeitet; die Startseite trägt nur noch die Schrittnamen, damit es die Beschreibungen nicht zweimal gibt.

### P8.6 Schutzlösungen

Korrektur: Die Schutzlösungen-Seite steht im Dokument in beiden Sprachen, auch auf Deutsch vollständig (Vorspann, ECM / Counter-RCIED, Jamming-Systeme, TSCM, geschirmte Räume, Abschluss). Meine erste Lesung hatte nur den Navigationsblock gesehen. Der deutsche Block trägt allerdings keine einzige Änderung von Holger, er ist Grundtext aus einem früheren Entwurf. Was fehlt, ist demnach nicht der Text, sondern seine Freigabe und eine rechtliche Einordnung, weil Störsender und Gegenmaßnahmen ein exportkontrolliertes und behördlich reguliertes Feld sind. Der Weg zur Seite steht in P10.11.

### P8.7 Impressum

Das Dokument trägt die Steuernummer wieder ein. Pflichtangabe nach § 5 DDG ist nur die Umsatzsteuer-Identifikationsnummer. Die Steuernummer ist deshalb in beiden Sprachen entfernt, die USt-IdNr. bleibt. Das Datum der Datenschutzerklärung bleibt beim aktuellen Stand, nicht beim älteren aus dem Dokument.

## 9. Was darüber hinaus noch offen ist

| Paket                    | Inhalt                                                                                                              | Abhängig von |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------ |
| P9.1 Wortmarke im Header | Signet plus Schriftzug auf dem Desktop, Signet allein mobil                                                         | Vektorlogo   |
| P9.2 Systemfoto          | Das Platzfoto hat 1198 Pixel Breite und läuft über die volle Fensterbreite; auf großen Bildschirmen wird es weich   | Original     |
| P9.3 Steinbogen          | Die weiter gefasste Originalaufnahme gibt einen besseren Zuschnitt für das Bildband                                 | Original     |
| P9.4 Bildlizenzen        | `docs/IMAGE_LICENSES.md` mit Quelle, Lizenz, Lizenznehmer und Datum je Bild                                         | Holger       |
| P9.5 Anwaltliche Prüfung | Impressum und Datenschutzerklärung in beiden Sprachen                                                               | Holger       |
| P9.6 Sitemap             | Erledigt in P10.3: Datum je Route in `lib/seo/content-dates.ts`, ein Unit-Test vergleicht es mit dem letzten Commit | –            |
| P9.7 CSP mit Nonce       | Bleibt zurückgestellt, weil sie in Next 16 dynamisches Rendern jeder Seite erzwingt                                 | –            |

### Offen für Holger

Unverändert die Punkte M1 bis M7 aus Phase 0: Hero-Original in hoher Auflösung, Vektorlogo, Lizenznachweise, Rohtexte je Systembereich, freigegebene Unternehmensfakten, Entscheidung zu Profil-Titel, Steuernummer und Fax, Termin für die anwaltliche Prüfung.

### Offen für Tobi (Vercel-Dashboard)

- Firewall-Rate-Limit auf `/api/contact` anlegen.
- Nach dem Merge: Produktions-Testanfrage, Sitemap in der Search Console einreichen, Resend-Key rotieren.

## 10. Erweiterungsplan

Stand: 15. September 2026, nach Merge von Pull Request #16. Grundlage sind der Live-Stand, die drei Bildsendungen, das Word-Dokument mit Holgers Änderungsverfolgung und die Messungen aus den letzten Durchläufen.

### 10.1 Ausgangslage

Die Seite steht. Sechs Routen je Sprache, ein Seitenraster, drei Bausteine, ein Labelstil, Lighthouse mobil 99 bis 100 in allen Kategorien, axe ohne Befund, CI mit Chromium und WebKit. Was jetzt noch kommt, ist keine Reparatur mehr, sondern Ausbau, und der ist an drei Stellen gebunden: an Entscheidungen von Holger, an Material, das nur er liefern kann, und an Arbeit im Vercel-Dashboard, die nur Tobi machen kann.

Drei Befunde aus der zweiten Lesung des Word-Dokuments verändern den Plan:

- Das Dokument trägt 205 markierte Änderungen, alle von Holger, alle in den deutschen Blöcken Startseite, Unternehmen und Systeme. Der Schutzlösungen-Block und der gesamte englische Teil sind unberührt. Was dort steht, ist Grundtext eines früheren Entwurfs, nicht Holgers Wort.
- Holgers Eingriffe gehen durchgehend in Richtung weniger: acht Bereiche auf fünf, "Kommunikationsanbieter" gestrichen, "übernehmen unsere eigenen Ingenieure" gestrichen, "Ingenieure" durch "Ansprechpartner" ersetzt, "Kommunikations- und" auf der Startseite zweimal gestrichen. Das ist eine klare Haltung: keine Zusage, die man nicht halten kann. Der Plan folgt ihr.
- Die deutsche Schutzlösungen-Seite existiert als Text. Damit ist eine vierte Seite möglich, sobald Holger den Text prüft und die rechtliche Frage geklärt ist.

Was die Bilder betrifft, bleibt es beim Ergebnis der drei Sendungen: Von dreizehn Motiven sind zwei nutzbar (der weiter gefasste Steinbogen und das Platzfoto in höherer Auflösung, beide noch nicht als Datei da), eines liegt schon als Vektor vor, das vollständige Logo fehlt weiterhin als Vektor, und zehn Stockmotive mit Leuchteffekten, Netzen und Renderings passen nicht zur Seite. Echte Fotos aus dem Unternehmen gibt es nicht. Die Seite ist dafür gebaut und braucht sie nicht.

### 10.2 Entscheidungen

| Nr. | Frage                                                                                            | Empfehlung                                                                                                                                                                                                                                                                         | Wer    |
| --- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| E4  | Bleibt "Kommunikations- und Sicherheitstechnik" auf der Unternehmensseite und in den Suchtexten? | Holger fragen, mit dem Hinweis, dass er es auf der Startseite gestrichen hat. Bei Nein: Rückbau auf "Sicherheitstechnik" in neun Zeichenketten. Bei Ja: bleibt wie live                                                                                                            | Holger |
| E5  | Fünf Leistungsbereiche oder vier?                                                                | Fünf. "Auswertesysteme" ist ein eigener suchbarer Begriff, steht so in den strukturierten Daten und auf Holgers eigener Startseite. Sein zusammengezogener Satz ("samt der Technik, die daraus verwertbares Material macht") wird als Beschreibung des zweiten Bereichs übernommen | Holger |
| E6  | Schutzlösungen als vierte Seite?                                                                 | Ja, wenn Holger den deutschen Text freigibt und der Anwalt die Formulierungen zu Störsendern mitträgt. Bis dahin drei Navigationspunkte                                                                                                                                            | Holger |
| E7  | Besucherzahlen messen?                                                                           | Zuerst nur Search Console, die braucht keine Änderung an der Datenschutzerklärung. Vercel Web Analytics erst, wenn die Zahlen aus der Search Console nicht reichen; das ist cookiefrei, verlangt aber einen Absatz in der Datenschutzerklärung und eine CSP-Freigabe               | Tobi   |
| E8  | Sprachwahl auf der Startadresse nach Browsersprache?                                             | Ja. Heute landet jeder Besucher auf `/de`, auch mit englischem Browser (geprüft am 15.9.). Die Suchmaschinen kennen beide Sprachen über hreflang, für sie ändert sich nichts                                                                                                       | Tobi   |
| E9  | Unternehmensfakten auf die Unternehmensseite (Gründungsjahr, Standort seit)?                     | Nur diese zwei, nur mit Freigabe, als eine Zeile unter dem Vorspann. Teamgröße, Partner und Einsatzräume nicht, das widerspricht der Zurückhaltung, die Holger im Dokument selbst vorgibt                                                                                          | Holger |

### 10.3 Pakete

Gruppe A läuft sofort, ohne Freigabe und ohne Material. Gruppe B wartet auf Antworten aus 10.2. Gruppe C wartet auf Dateien. Gruppe D ist Handarbeit außerhalb des Codes.

#### A. Sofort

| Paket                        | Inhalt                                                                                                                                                                                                                                                   | Aufwand | Abhängig von |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------ |
| P10.1 Sprachwahl auf `/`     | `Accept-Language` auswerten, englische Browser nach `/en`, alle anderen nach `/de`. Weiterleitung bleibt 307, `x-default` bleibt `/de`. Test für beide Fälle                                                                                             | 1 h     | E8           |
| P10.2 AVIF und Bildquellen   | `images.formats` um AVIF ergänzen; heute liefert die Seite auch bei AVIF-Anfrage WebP (geprüft am 15.9.). Brücke von 1,9 MB Quelldatei auf unter 500 KB sRGB neu exportieren, Maße bleiben 2400 px. Repo wird kleiner, Optimierung am Ursprung schneller | 1 h     | –            |
| P10.3 Sitemap-Datum aus Git  | `lastmod` je Route aus dem letzten Commit der zugehörigen Inhaltsdatei ableiten statt von Hand. Fällt im Build auf das heutige Datum zurück, wenn kein Git vorliegt, mit Test                                                                            | 2 h     | –            |
| P10.4 Lighthouse in der CI   | Vier Routen mobil, Schwellen Performance 95, die übrigen 100. Ein Pull Request, der darunter fällt, wird rot. Heute wird Lighthouse nur von Hand gemessen                                                                                                | 2 h     | –            |
| P10.5 Screenshot-Vergleich   | Playwright-Screenshots als Assertion, nur im Chromium-Job der CI, weil dort die Plattform fest ist. Sieben Viewports, beide Sprachen, alle Routen. Lokal bleibt der Vergleich aus                                                                        | 3 h     | –            |
| P10.6 Druckansicht           | Dossiers und Rechtstexte drucken sauber: Kopf- und Fußnavigation weg, Bildband weg, Links mit URL, Seitenumbruch vor Abschnitten. Behörden drucken Angebote und Impressen aus                                                                            | 1 h     | –            |
| P10.7 Zweite Beschreibung    | Beschreibung der Auswertesysteme von "Systeme zur Sichtung und Auswertung" auf Holgers konkreteren Satz. Die aktuelle Fassung öffnet mit dem eigenen Begriff, was der Blueprint verbietet                                                                | 0,5 h   | E5           |
| P10.8 Search Console und NAP | Domain in der Search Console verifizieren (DNS-Eintrag), Sitemap einreichen, Bing Webmaster ebenso, Google-Unternehmensprofil mit Adresse und Telefon exakt wie im Impressum                                                                             | 1 h     | Tobi         |
| P10.9 Dashboard              | Firewall-Rate-Limit auf `/api/contact` (zum Beispiel 10 Anfragen je Minute je IP), Resend-Key rotieren, Produktions-Testanfrage mit Antwort auf die Reply-To-Adresse                                                                                     | 1 h     | Tobi         |

##### Stand Sprint 1 (15. September 2026)

Pull Request #18, gemerged und auf der Produktion nachgeprüft. Die Sprachwahl liefert für sechs Header die erwartete Weiterleitung, darunter die Grenzfälle `fr,de;q=0.5,en;q=0.7` (englisch, weil Englisch höher gewichtet ist) und `en;q=0,de;q=0.5` (deutsch, weil ein Browser mit `q=0` die Sprache abwählt). Die Brücke kommt als AVIF mit 53 KB statt 79 KB als WebP, ein Drittel weniger. Der Druckblock und die `print:hidden`-Regel stehen im ausgelieferten CSS, die Sitemap trägt ein Datum je Route, hreflang samt `x-default` ist unverändert, alle zwölf Routen antworten mit 200.

| Paket | Stand                                  | Ergebnis und Abweichungen vom Plan                                                                                                                                                                                                                                                                                                                                            |
| ----- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P10.1 | umgesetzt                              | `localeFromAcceptLanguage` in `lib/i18n.ts`, `/` liest den Header und leitet mit 307 weiter. Zehn Unit-Fälle, ein E2E-Test mit vier Headern                                                                                                                                                                                                                                   |
| P10.2 | umgesetzt                              | AVIF vor WebP in `images.formats`. Die Brücke war ein CMYK-Druckexport mit 4:4:4 und 1,9 MB; jetzt sRGB, 220 KB, gleiche 2400 px                                                                                                                                                                                                                                              |
| P10.3 | umgesetzt, anders als geplant          | Kein Git-Datum zur Bauzeit: Vercel klont flach, und ein flacher Klon meldet für jede Datei den Klonrand als letzte Änderung, also jeden Deploy. Stattdessen ein Datum je Route in `lib/seo/content-dates.ts`; `tests/unit/content-dates.test.ts` schlägt fehl, wenn die Inhaltsdatei jünger ist als ihr Datum. Die CI holt dafür die volle Historie                           |
| P10.4 | umgesetzt, Schwelle 90 statt 95        | `scripts/lighthouse-check.mjs`, vier Routen mobil, Median aus drei Läufen, nach der E2E-Suite in der CI. Performance schwankt auf derselben Maschine um zwei bis drei Punkte (Systeme lag bei 94 bis 95), ein echter Rückschritt kostet zehn; die anderen drei Kategorien müssen 100 bleiben. Lokal: 97 / 96 / 95 / 97                                                        |
| P10.5 | umgesetzt, zwei Viewports statt sieben | `tests/e2e/visual.spec.ts`, zwölf Routen bei 390 und 1440 als ganze Seite, Fotos maskiert (JPEG-Dekodierung ist das Einzige, was sich zwischen Chromium-Builds legitim unterscheidet). 24 Baselines, verlustfrei nachkomprimiert auf 2,5 MB statt 5,8 MB; sieben Viewports hätten das Repository um 9 MB je Auffrischung wachsen lassen. Vergleich nur in der CI auf Chromium |
| P10.6 | umgesetzt                              | `@media print` in `globals.css`, `print:hidden` auf Header, Bildband, Abschlussbalken, Fußnavigation und Sprachwechsel. Sichtprüfung Unternehmen und Impressum: Dokument, Adresse, sonst nichts                                                                                                                                                                               |
| P10.7 | umgesetzt                              | Auswertesysteme in beiden Sprachen: die Technik, die aus Aufzeichnungen verwertbares Material macht                                                                                                                                                                                                                                                                           |
| P10.8 | offen                                  | Tobi                                                                                                                                                                                                                                                                                                                                                                          |
| P10.9 | offen                                  | Tobi                                                                                                                                                                                                                                                                                                                                                                          |

#### B. Nach Freigabe

| Paket                       | Inhalt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Aufwand | Abhängig von |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------ |
| P10.11 Schutzlösungen-Seite | Dritte Dossier-Art `protection` in `lib/i18n`, Slugs `schutzloesungen` und `protection`, Inhalte in `lib/content/detail-pages.ts` aus dem Dokument, Passiv und Gedankenstriche bereinigt. Aufbau wie die beiden anderen Dossiers: Seitenkopf, Textband mit den vier Bereichen als nummerierte Liste, Projektansatz, Abschlussbalken. Kein Bildband, bis ein passendes Motiv da ist. Navigation auf vier Punkte in Header, Fußzeile und Mobilmenü. Startseite bekommt einen Teaser nach dem Muster des Systeme-Abschnitts: Label, Titel, vier Namen, ein Link. Sitemap, hreflang, Brotkrume, OG-Bild in Navy mit Text, `knowsAbout` ergänzt, Tests für Header, Brotkrume und Titelbudget | 8 h     | E6, P10.22   |
| P10.12 Bereiche 5 oder 4    | Nur falls Holger vier will: ein Eintrag in beiden Sprachen, strukturierte Daten, Blueprint, E2E-Test der Listenlänge                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 0,5 h   | E5           |
| P10.13 Positionierung       | Nur falls Holger die Erweiterung nicht will: neun Zeichenketten zurück auf "Sicherheitstechnik", Blueprint, Titelbudget-Test                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 0,5 h   | E4           |
| P10.14 Unternehmensfakten   | Gründungsjahr und Standort als eine Zeile unter dem Vorspann der Unternehmensseite, dazu `foundingDate` in den strukturierten Daten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1 h     | E9           |
| P10.15 Web Analytics        | Vercel Web Analytics: Skript, CSP-Freigabe für `/_vercel/insights`, Absatz in beiden Datenschutzerklärungen mit Datum, Blueprint § 10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 2 h     | E7           |

#### C. Nach Material

| Paket                      | Inhalt                                                                                                                                                    | Aufwand | Abhängig von    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------- |
| P10.16 Wortmarke im Header | Signet plus Schriftzug auf dem Desktop, Signet allein mobil, als SVG mit korrekten Abständen zum Punktraster                                              | 2 h     | Vektorlogo (M2) |
| P10.17 Platzfoto           | Original mit mindestens 2400 px Breite in das Bildband der Systemseite, gleicher Ausschnitt, gleiche Entsättigung                                         | 0,5 h   | Original        |
| P10.18 Steinbogen          | Die weiter gefasste Aufnahme mit mehr Himmel in das Bildband der Startseite, neuer Zuschnitt                                                              | 0,5 h   | Original        |
| P10.19 Gecko-Hero          | Das Hero-Bild hat 1920 × 635 px und wird auf Bildschirmen ab 2560 px oder bei doppelter Pixeldichte weich. Original in voller Auflösung, Zuschnitt bleibt | 0,5 h   | Original (M1)   |
| P10.20 Lizenzdossier       | `docs/IMAGE_LICENSES.md` mit Quelle, Lizenz, Lizenznehmer und Datum je Bild                                                                               | 1 h     | Nachweise (M3)  |

#### D. Handarbeit

| Paket                      | Inhalt                                                                                                                                                                                                                                                                                                    | Wer            |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| P10.21 Gerätetest          | Preview auf iPhone Safari, Android Chrome, iPad, Windows Edge und Firefox, macOS Safari. Prüfliste liefere ich, je Gerät zehn Minuten                                                                                                                                                                     | Tobi           |
| P10.22 Anwaltliche Prüfung | Impressum und Datenschutzerklärung wie geplant, dazu neu die Schutzlösungen-Texte: Störsender sind in Deutschland nur für Behörden zulässig, der Vertrieb fällt unter Exportkontrolle. Die Formulierung "ausschließlich für behördlich autorisierte Anwendungen" muss stehen bleiben oder schärfer werden | Holger, Anwalt |
| P10.23 Screenreader        | VoiceOver auf iOS und macOS, NVDA auf Windows, einmal komplett durch alle Routen und das Formular                                                                                                                                                                                                         | Tobi           |
| P10.24 Sicherheitsheader   | securityheaders.com und Mozilla Observatory auf der Produktion, Ergebnis im Plan festhalten                                                                                                                                                                                                               | Tobi           |

### 10.4 Was ich bewusst nicht empfehle

- **Referenzen, Kundenlogos, Fallbeispiele.** Der Kundenkreis sind Sicherheitsbehörden. Wer sie nennt, verliert sie.
- **News, Blog, Aktuelles.** Ohne redaktionelle Kapazität entsteht eine Seite mit einem Eintrag von 2026, die 2028 noch dort steht. Das schadet mehr, als es nützt.
- **Karriere.** Es gibt keine freigegebenen Fakten zu Team und Stellen.
- **Erzeugte oder gestellte Fotos.** Die Seite lebt von vier ruhigen, echten Aufnahmen. Ein Rendering oder ein KI-Bild fällt dieser Zielgruppe sofort auf und beschädigt das Vertrauen, das die Seite aufbauen soll.
- **Die zehn abgelehnten Stockmotive.** Leuchteffekte, Netzdiagramme, Auge im Objektiv, Regler mit englischem Text. Alles auf der Ausschlussliste des Design-Systems, aus gutem Grund.
- **Cookie-Banner.** Es gibt nichts, wozu man einwilligen müsste. Das bleibt mit Search Console so und mit Vercel Web Analytics ebenfalls.
- **Eingangsbestätigung per Mail an den Absender.** Öffnet einen Rückkanal für Missbrauch (fremde Adressen eintragen), verlangt einen weiteren Absatz in der Datenschutzerklärung und bringt dem Absender wenig, der die Bestätigung schon auf der Seite sieht.
- **Acht Leistungsbereiche, Datenforensik, Führungszentralen, Intelligence Fusion.** Holger hat sie im Dokument gestrichen. Sie kommen nicht zurück.
- **Nonce-CSP.** Bleibt zurückgestellt, Begründung in P5.1.

### 10.5 Reihenfolge

| Schritt  | Umfang                                                                               | Voraussetzung                         | Aufwand            |
| -------- | ------------------------------------------------------------------------------------ | ------------------------------------- | ------------------ |
| Sprint 1 | Gruppe A komplett, P10.1 bis P10.7 in einem Pull Request, P10.8 und P10.9 durch Tobi | E8 (kann Tobi sofort entscheiden)     | 10 h plus 2 h Tobi |
| Sprint 2 | P10.11 bis P10.14, je nach Antworten                                                 | E4, E5, E6, E9 von Holger, P10.22     | 2 bis 10 h         |
| Sprint 3 | Gruppe C, sobald Dateien da sind, jedes Paket einzeln                                | Vektorlogo, drei Originale, Nachweise | 5 h                |
| Laufend  | Gruppe D                                                                             | Preview-Links, Prüflisten             | Tobi, Holger       |

Jeder Sprint geht wie bisher: ein Branch, ein Draft-PR, Gate mit Lint, Typen, Format, Unit, Build, Playwright mit axe, Screenshots auf sieben Viewports, Vercel-Preview, Merge nach grüner CI, Prüfung auf der Produktion.

### 10.6 Fragen an Holger

Fünf Fragen, mit einer Zeile beantwortbar:

1. Auf der Unternehmensseite und im Seitentitel steht jetzt "Kommunikations- und Sicherheitstechnik". Auf der Startseite haben Sie "Kommunikations- und" gestrichen. Soll es auf der Unternehmensseite stehen bleiben?
2. Die Startseite nennt fünf Bereiche, Ihre Systemseite vier, weil Observation und Auswertung zusammengezogen sind. Fünf oder vier?
3. Der deutsche Schutzlösungen-Text im Dokument (ECM, Jamming, TSCM, geschirmte Räume) trägt keine Ihrer Änderungen. Soll er so auf die Seite, und wenn ja, wer prüft die Formulierungen zu Störsendern rechtlich?
4. Dürfen Gründungsjahr und "in München seit" auf die Unternehmensseite?
5. Gibt es das Logo mit Schriftzug als Vektordatei (AI, EPS, SVG), das Original des Platzfotos, den weiter gefassten Steinbogen und das Gecko-Original in voller Auflösung? Dazu je Bild: woher, welche Lizenz, auf wen ausgestellt?

### 10.7 Redaktionelle Prüfung (P2.4)

Vollständiger Lesedurchgang beider Sprachen gegen die Regeln in `CONTENT_BLUEPRINT.md`, am 15. September 2026. Der Plan sieht für dieses Paket ausdrücklich einen Bericht statt einer Autoänderung vor; korrigiert wurde deshalb nur, was kein Stilurteil ist, sondern falsch war.

**Korrigiert**

| Befund                                                                                                                                                                                                                                                                                                                                                                                                                              | Warum nicht nur gemeldet                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Der englische Formularhinweis lautete "By submitting the form you agree that we process your details". Das ist eine Einwilligungserklärung, also Art. 6 Abs. 1 lit. a DSGVO. Die Datenschutzerklärung nennt in beiden Sprachen lit. b und lit. f und kennt gar keine Einwilligung; der deutsche Hinweis stellt richtig nur fest, dass verarbeitet wird. Die beiden Sprachfassungen widersprachen sich also über die Rechtsgrundlage | Kein Stil, sondern eine unzutreffende Rechtsaussage. Sie zu entfernen ist enger als sie stehen zu lassen. Zur Bestätigung an den Anwalt, siehe P10.22 |

**Gemeldet, nicht geändert**

| Befund                                                                                                                                                                                                                                                                                                                                                       | Vorschlag                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Doppelung einen Klick tief: Die Startseite sagt "Elaman liefert diese Systeme einzeln oder führt sie zu einem Gesamtsystem zusammen.", die Systemseite überschreibt die Leistungsbereiche mit "Einzeln oder im Gesamtsystem." Die Startseitenfassung ist Holgers, der Untertitel meine Kürzung aus Sprint 1, die genau auf diese Formulierung zugelaufen ist | Der Untertitel ändert sich, nicht die Startseite. Vorschlag: "Die Bereiche im Einzelnen." / "The areas in detail." Das hält auch, falls aus fünf Bereichen vier werden (E5) |
| `profile.title` auf der Startseite trägt mit "im Bereich der Sicherheitstechnik" eine Leerformel, die der Blueprint sonst ausschließt                                                                                                                                                                                                                        | Es ist Holgers eigene Einfügung aus dem Word-Dokument. Bleibt, bis er es anders will. Knapper wäre "Lösungen und Produkte der Sicherheitstechnik."                          |
| Der Vorspann der Systemseite sagt "Entscheidend ist, wie sie zusammenwirken", der Untertitel darunter sagt dasselbe noch einmal                                                                                                                                                                                                                              | Löst sich mit dem Vorschlag oben auf                                                                                                                                        |

**Ohne Befund**: Satzrhythmus (kein wiederkehrender Dreiklang, keine Formel an zwei Orten außer der oben genannten), Fehlermeldungen und Abschlusssätze sind durchgehend verschieden, keine Leerformeln in den Prozess- und Bereichstexten, keine zirkulären Definitionen mehr, englische Fassung ohne deutsche Wortstellung und ohne "a company for X".

### 10.8 Technische Konsistenzprüfung

Ebenfalls am 15. September, außerhalb der Pakete, weil eine Prüfung nur zählt, wenn sie auch das findet, wonach niemand gefragt hat.

| Befund                                                                                                                                                                                                                                             | Stand                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/globals.css` setzte `scroll-behavior: smooth`, während `DESIGN_SYSTEM.md` § 7 feststellt, die Seite setze keins. Seit dem Wegfall der Anker dient es nur noch dem Sprunglink, den es damit unnötig animiert                                   | korrigiert, der Code entspricht jetzt der Dokumentation                                                                                                                                         |
| `lib/design/tokens.ts` nennt sich Spiegel von `app/globals.css`, neun Werte fehlten: beide Flächenaliasse, die drei Aktionsfarben, Fokusrahmen, Fokusring, Auswahlfarbe, dazu stand unter `section.screen` die `svh`-Variante statt des Grundwerts | korrigiert                                                                                                                                                                                      |
| `--radius-card` hat keinen Verwender mehr, seit die Kästen aus der Komposition verschwunden sind                                                                                                                                                   | bleibt: das Design-System nennt den 2-Pixel-Radius als einen seiner drei, das ist Vokabular und kein toter Code                                                                                 |
| Der Screenshot-Vergleich aus P10.5 ließ die geänderte englische Zeile durch: bei einer Seitenaufnahme über die volle Höhe sind zwei Textzeilen rund 0,3 Prozent der Pixel, die Schwelle stand auf 0,5. Gemessen, nicht vermutet                    | korrigiert: Schwelle auf 0,05 Prozent. Die Gegenprobe mit einer Zwei-Wort-Änderung am Seitentitel schlägt jetzt mit 2520 Pixeln an. Das Kantenglätten trägt weiterhin die Farbtoleranz je Pixel |
| `npm audit --omit=dev`                                                                                                                                                                                                                             | keine Schwachstellen                                                                                                                                                                            |
| Sicherheitsheader auf der Produktion                                                                                                                                                                                                               | alle sechs gesetzt: CSP, HSTS mit zwei Jahren und Preload, `nosniff`, Referrer-Policy, Permissions-Policy, `X-Frame-Options`                                                                    |
| `manifest.webmanifest` zeigt mit `start_url` auf `/de`                                                                                                                                                                                             | richtig, eine installierte Seite läuft nicht über die Weiterleitung                                                                                                                             |
| Nur `/` und `/api/contact` werden dynamisch gerendert, die zwölf Inhaltsrouten bleiben vorgerendert                                                                                                                                                | wie beabsichtigt, die Sprachwahl kostet eine Funktion, sonst nichts                                                                                                                             |

## 11. Menü: Lösungen und der Home-Einstieg

Stand: 16. September 2026. Entschieden von Tobi: volle Umbenennung inklusive Adresse, beide Sprachen, Signet und Wort als ein Link. Die Kollision mit der später geplanten Seite „Schutzlösungen" ist bekannt und bewusst in Kauf genommen, weil „Lösungen" im Menü besser trägt.

### 11.1 Umbenennung

Die Systemseite heißt jetzt Lösungen und Solutions, unter `/de/loesungen` und `/en/solutions`. Der Zeitpunkt war der günstigste, den es geben konnte: die Sitemap liegt noch nicht in der Search Console, die Seite hatte also praktisch keine Indexhistorie. Die alten Adressen leiten dauerhaft weiter (308), nach demselben Muster wie `/imprint`; ohne die Weiterleitung liefen sie in ein 404, weil `dynamicParams = false` nur die generierten Pfade zulässt.

Umbenannt wurde der **Seitenname**, nicht das Wort. Menü, Fußzeile, Kürzel, Brotkrume, Abschnittslabel, der Link von der Startseite und der Seitentitel für Suchergebnisse tragen jetzt Lösungen. „Systeme" als gewöhnliches Substantiv im Fließtext bleibt, wo es steht: „Systeme zur verdeckten Erfassung", „welche Systeme und Produkte bereits vorhanden sind", „Systementwurf". Die Seite heißt Lösungen und liefert Systeme, das ist kein Widerspruch.

Mitgezogen wurde auch der interne Schlüssel: `detailPageKinds`, der Inhaltsschlüssel, der Typ `SolutionsDetailContent`, die Komponente `SolutionsSection`, die Abschnitts-ID und der Eintrag in `content-dates.ts`. Ein Schlüssel `systems` für eine Seite namens Lösungen wäre genau die Drift, die später jemanden Zeit kostet. TypeScript hat dabei jede der 14 Fundstellen benannt, die der erste Durchgang übersehen hatte.

### 11.2 Home-Einstieg

Signet und Wort sind ein Link, nicht zwei nebeneinander. Das Signet allein gab keinen Hinweis darauf, dass es anklickbar ist; zwei benachbarte Links auf dieselbe Seite hätte ein Screenreader als Dopplung vorgelesen. Ab `lg` steht das Wort sichtbar daneben, darunter trägt das Signet stattdessen ein `sr-only`-Label. Damit ist zu jeder Breite genau ein Label ausgezeichnet und der zugängliche Name stimmt mit dem überein, was auf dem Bildschirm steht. Das frühere `aria-label` entfällt.

Die blaue Linie bekommt der Einstieg nicht: sie gehört der Navigation, unter einem Logo sähe sie falsch aus. `aria-current="page"` trägt er auf der Startseite trotzdem, damit Screenreader den Zustand ansagen.

### 11.3 Login

Nicht umgesetzt, bewusst. Geplant ist eine eigene Login-Seite im Elaman-Design mit User-Management dahinter: Administratoren landen im Elaman-Adminportal, Kunden bekommen Zugriff auf nicht öffentliche Inhalte wie Produktkataloge. Das wird als eigenes Projekt aufgesetzt.

Was vorher geklärt sein muss: wer Konten anlegt, wie viele Rollen es gibt, woher die geschützten Inhalte kommen und wo sie liegen, ob Kunden sich selbst registrieren können. Rechtlich zieht es einen neuen Abschnitt in beiden Datenschutzerklärungen nach sich (Kontodaten, Speicherdauer, Auftragsverarbeiter) und damit eine erneute anwaltliche Prüfung. Ein Menüpunkt, der ins Leere zeigt, wurde nicht gebaut: bei einem Unternehmen, das für Sicherheitsbehörden arbeitet, beschädigt ein halbfertiger Login genau die Glaubwürdigkeit, für die die Seite steht.

### 11.4 Weiterhin offen

Der Abschnittstitel auf der Startseite und die `h1` der Unterseite sind in beiden Sprachen derselbe Satz: „Systeme für Kommunikation, Observation und Auswertung." Das verstößt gegen die Blueprint-Regel, dass keine Formulierung einen Klick tiefer wörtlich wiederkehrt. Die Umbenennung hat daran nichts geändert, weil beide Sätze beschreibend sind und nicht den Seitennamen tragen. Vorschlag: die `h1` bleibt, die Startseite bekommt einen eigenen Satz. Das ist Text und wartet auf eine Freigabe.
