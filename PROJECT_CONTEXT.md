# Elaman — Arbeitskontext

Bestandsaufnahme: 10. September 2026. Vor späteren Änderungen den Git- und Deployment-Stand erneut prüfen.

## Arbeitskopie und Live-Stand

- Arbeitsordner: `/Users/toby/Documents/Elaman 2`.
- Repository: https://github.com/tobirdt/Elaman (öffentlich).
- Frischer Clone von `main`; Ausgangscommit: `462d4b952e033c3044b609d423d2fef7d4762e17`.
- Lokaler Arbeitsbranch: `codex/elaman-workspace-setup`.
- Derselbe Commit ist bei der Bestandsaufnahme auf https://www.elaman.de live.
- Die lokale Arbeitskopie enthält danach Holgers freigegebene Textrevision als noch nicht veröffentlichte Änderung: `25+`, engere Zielgruppe, fünf Systembereiche und kein eigener Schutzlösungsbereich.
- Vercel-Projekt: `elaman`, ID `prj_oQRgobA8NAnFffCZKIyCC6SNcaLn`.
- Team: `tobirumscheidt-1382s-projects`, ID `team_ABJQhrM75EFv0Y1WEsFyY3j0`.
- Production-Deployment: `dpl_3jpsUmjbR7jJiveF57ebqY5isxij`, Status `READY`, Git-Branch `main`.
- Domains: `elaman.de` und `www.elaman.de`; kanonische Basis `https://www.elaman.de`, Startweiterleitung nach `/de`.
- Die ältere Kopie unter `/Users/toby/Documents/Firmen/Elaman 2` bleibt unverändert. Sie steht auf `codex/heritage-modern-v2`; ihr vollständiger Änderungsstatus konnte wegen langsamer Dateizugriffe nicht festgestellt werden. Nicht ungeprüft übernehmen oder löschen.

## Zugriff und lokale Einrichtung

Git-Lesezugriff und Vercel-Connector wurden erfolgreich geprüft. GitHub CLI ist nicht angemeldet; Git-Schreibzugriff ist noch nicht nachgewiesen. Vercel CLI meldet einen ungültigen Token; vor einem CLI-Deployment ist eine erneute Anmeldung nötig. Der Connector kann das aktuelle Projekt und Deployment lesen.

`npm ci` installiert den vorhandenen Lockfile-Stand unter Node 24.15.0. Vercel nutzt Node 24.x. `.vercel/project.json` verknüpft die Arbeitskopie mit dem bestehenden Projekt. Die vorhandene lokale Mailkonfiguration wurde aus der älteren Kopie übernommen, `NEXT_PUBLIC_SITE_URL` ergänzt. Alle vier benötigten Variablennamen sind lokal vorhanden; ihre Gültigkeit beim Mailanbieter ist nicht geprüft. Kein frischer Vercel-Env-Pull wegen des ungültigen CLI-Tokens. `.env.local` bleibt ignoriert und hat Dateimodus 600.

Starten: `npm run dev -- --port 3000`, dann http://localhost:3000/de.

Prüfen: `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run build`. Browser: `npx playwright install chromium webkit`, danach `npm run test:e2e` (eigener Devserver auf Port 3001) oder `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 npm run test:e2e` gegen den laufenden Server.

`next-env.d.ts` wird von Next automatisch zwischen `.next/types` und `.next/dev/types` umgestellt. Das ist ein generierter lokaler Unterschied, keine Produktänderung.

## Aufbau

Next.js 16.3.4, React 19, TypeScript, Tailwind 4; App Router mit statisch generierten Marketingseiten. Kein CMS oder Datenbankzugriff im untersuchten Anwendungscode. Der dynamische Server-Endpunkt ist `/api/contact`.

| Bereich                             | Zuständige Dateien                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| Startseite, fünf Abschnitte         | `app/(marketing)/[locale]/page.tsx`, `components/sections/`                           |
| Detail- und Rechtsseiten            | `app/(marketing)/[locale]/[...slug]/page.tsx`                                         |
| Detailkompositionen                 | `components/pages/DetailDossier.tsx`                                                  |
| Deutsche/englische Texte            | `lib/content/site.ts`, `detail-pages.ts`, `legal.ts`                                  |
| Sprache und URL-Zuordnung           | `lib/i18n.ts`                                                                         |
| Kopfzeile, Mobilmenü, Sprachwechsel | `components/layout/`                                                                  |
| Design und Bewegung                 | `app/globals.css`, `lib/design/tokens.ts`                                             |
| Kontaktformular                     | `components/sections/ContactForm.tsx`                                                 |
| Validierung und E-Mail              | `lib/validation/contact.ts`, `lib/email/contact-email.ts`, `app/api/contact/route.ts` |
| SEO und strukturierte Daten         | `lib/seo/`, `app/sitemap.ts`, `app/robots.ts`                                         |
| Globale 404, Header, Redirects      | `app/global-not-found.tsx`, `next.config.ts`                                          |
| Regressionstests                    | `tests/e2e/site.spec.ts`                                                              |

| Deutsch           | Englisch             |
| ----------------- | -------------------- |
| `/de`             | `/en`                |
| `/de/unternehmen` | `/en/company`        |
| `/de/systeme`     | `/en/systems`        |
| `/de/impressum`   | `/en/site-notice`    |
| `/de/datenschutz` | `/en/privacy-policy` |

`/imprint` und `/private-policy` leiten mit 308 auf die deutschen Rechtsseiten um. Unbekannte Routen werden über statisch begrenzte Parameter zur vollständigen globalen 404 geleitet.

## Visuelle Orientierung

Die Produktionsseite wurde zu Beginn auf Desktop und Mobilgerät angesehen. Weiß und leichtes Grau, Geist-Typografie, viel Freiraum, dünne Linien und ein blaues Markensignal bestimmen weiterhin die lokale Fassung. Das Punktlogo sitzt in der kompakten fixierten Kopfzeile. Mobile Navigation öffnet ein fokussiertes Modal.

Die lokale Startseite folgt: Chamäleonfoto und Markenbotschaft → Unternehmensprofil mit Steinbrücke → vier Schritte von Analyse bis Betreuung → dunkelblauer Systembereich mit Media-Mining-Bild und fünf Themen → Münchner Büro und Kontaktformular. Desktop arbeitet mit großen, oft zweispaltigen Abschnitten und sanftem Scroll-Snap; mobil stehen Inhalte untereinander. Bewegung ist CSS-basiert und berücksichtigt reduzierte Bewegung.

Die beiden Detailseiten nutzen dieselbe Bildsprache: Unternehmen mit Büro und Systeme mit dunkelblauem Bildbereich. Screenshots unter `output/onboarding/` sind lokale, ignorierte Arbeitsbelege. Erste Ganzseitenaufnahmen enthalten noch nicht geladene Lazy-Images außerhalb des Viewports; dies allein ist kein Bildfehler.

## Kontaktfluss

Formular → clientseitige Validierung → POST `/api/contact` → serverseitige Prüfung → Resend → Erfolgs- oder Fehlermeldung. Schutz umfasst Honeypot, 12-kB-Payloadlimit, begrenztes In-Memory-Ratelimit und HTML-Escaping. Benötigt `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`. Tests prüfen ungültige Eingaben ohne Mailversand; echte Zustellung ist nicht verifiziert.

## Bekannte Abweichungen und nächste Arbeiten

- `AGENTS.md`, README und Release-Dokumentation beschreiben Rechtsseiten teils noch als sprachneutral. Tatsächlich sind sie im Live-Commit bereits lokalisiert; Code und `lib/content/legal.ts` sind für den Iststand maßgeblich. Rechtstexte nicht eigenmächtig bearbeiten.
- Der Abschlusslauf hat die zuvor dokumentierten Dependency-Advisories behoben: `next` und `eslint-config-next` stehen auf 16.3.4, die betroffenen Transitivpakete wurden mit dem Lockfile aktualisiert. `npm audit` und `npm audit --omit=dev` melden keine bekannten Schwachstellen.
- Next.js 16.3.4 protokolliert bei unbekannten Parametern mit `dynamicParams = false` trotz korrekter 404-Antwort einen internen `NoFallbackError`; dies ist als [offener Frameworkfehler](https://github.com/vercel/next.js/issues/90537) bestätigt. Die statische Begrenzung bleibt aktiv, weil sie die vollständige Marken-404 bereits in der Serverantwort und damit auch ohne JavaScript erhält.
- CLI-Anmeldungen vor Push oder CLI-Deployment herstellen. Keine Commits, Pushes oder Veröffentlichungen im Rahmen der Einrichtung.

Vor Produktänderungen weiterhin `AGENTS.md`, Inhalts- und Designdokumentation lesen. Beide Sprachen synchron halten und Änderungen zunächst lokal/als Preview prüfen.

## Verifikation der lokalen Textrevision

- Lint, TypeScript, Prettier, `git diff --check` und Produktionsbuild erfolgreich.
- Vollständige Playwright-Suite gegen den gebauten Produktionsserver: **50 bestanden, 1 planmäßig übersprungen** (Mobilmenü auf Desktop). Abgedeckt sind zehn öffentliche Routen, Chromium, iPhone WebKit hoch/quer, Bildladen im iPhone-Hochformat, schwere Accessibility-Befunde, Overflow, beide entfernten Routen als vollständige 404, Redirects, Metadaten, Header, Formularvalidierung und der neue zweisprachige Inhaltsumfang.
- Manuelle Browserprüfung: deutsche Desktop- und Mobil-Startseite, englische Tablet-Startseite, deutsches Unternehmens- und Systemdossier, mobile Navigation und Sprachwechsel sowie die deutsch/englische Marken-404. Keine Browserfehler, Fehler-Overlays, defekten Bilder, unkontrollierten Textumbrüche oder horizontalen Überläufe festgestellt.
- Lokale Prüfbilder: `output/final-qa-de-desktop.png`, `output/final-qa-de-mobile.png`, `output/final-qa-de-mobile-menu.png`, `output/final-qa-en-tablet.png`, `output/final-qa-de-company-desktop.png` und `output/final-qa-de-systems-desktop.png`.
- Vollständiger Dependency-Audit einschließlich Entwicklungsabhängigkeiten: keine bekannten Schwachstellen.
- Produktions-Smoke-Test: alle zehn öffentlichen Seiten liefern 200, `/` leitet mit 307 nach `/de`, die beiden alten Rechtsadressen mit 308 auf die lokalisierten Ziele und die entfernten Schutzrouten mit 404. Sitemap, Robots-Datei, Security-Header, ungültige Formulardaten und das Elaman-Favicon wurden zusätzlich gegen `next start` geprüft.
- Keine echte E-Mail gesendet und keine Änderungen veröffentlicht.
- Alle lokalen Testserver wurden nach der Prüfung beendet.
