# Elaman Website Audit

Stand: 14. Juli 2026  
Scope: read-only Audit des lokalen Checkouts bei 1280 × 900 und 375 × 812, jeweils `/en` und `/de`, ergänzt um `/imprint`, `/private-policy`, 404, Interaktions-, Motion-, Reduced-Motion-, Konsolen- und Source-Audit.

## Kurzfazit

Der lokale Checkout ist **nicht auf dem im Auftrag beschriebenen Precision-Dossier-Stand**. Die aktualisierten Dokumente verlangen DotMatrix-Formationen, Geist/Geist Mono, 2px-Radien, flache Hairline-Surfaces und zentralisierte Motion-Presets; ausgeliefert werden weiterhin Jost, Technical-Grid-/Bridge-SVGs, Glass-/Panel-Surfaces, 12px-Kartenradien, Schatten und Gradient-Blobs. Die kanonisch genannten Dateien `lib/design/formations.ts` und `lib/motion/presets.ts` sowie `DotMatrix`, `SectionRule`, `MonoLabel` und `Stat` fehlen vollständig.

Zusätzlich gibt es einen release-blockierenden Reduced-Motion-Fehler: Bei `prefers-reduced-motion: reduce` hydratisiert `MotionReveal` mit einer anderen DOM-Struktur als auf dem Server. React patcht die initialen Framer-Styles nicht; sechs Hauptsektionen bleiben praktisch unsichtbar (`opacity: 0.001`, `translateY(8px)`).

Die vier Haupt-URLs haben bei normaler Motion keine Laufzeitfehler und bei 375px keinen horizontalen Overflow. Das mobile Menü, die Legal-Seiten, der Footer und die 404-Auslieferung bestätigen jedoch die bekannten offenen Baustellen.

## Methodik und Evidenz

- Dev-Server: `npm run dev`, Port 3000, Aufruf über `http://localhost:3000`.
- Browser: Playwright/Chromium, 1280 × 900 und 375 × 812.
- Routen: `/en`, `/de`, `/imprint`, `/private-policy`, `/en/does-not-exist`, `/de/fehlt`, `/fr`.
- Interaktionen: Scroll-Story mit sechs Scrollpositionen, Accordion, Hover, Formularvalidierung, Mobile-Menü, Escape und Outside-Click.
- Reduced Motion: Browser-Mediaemulation `reduce` und erneutes Hydrieren.
- Kontrastberechnung: WCAG relative luminance.
- Guidelines: Vercel Web Interface Guidelines sowie die projektspezifischen Skills `elaman-design-law` und `motion-system`.
- Screenshot-Artefakte: `output/playwright/audit/`. Bei Sektionen hinter `MotionReveal` tragen diagnostische Aufnahmen den Suffix `-diagnostic`; dort wurde ausschließlich im Browser temporär `opacity: 1` gesetzt, weil Playwright-Element-Screenshots sprunghaft scrollen und damit den `whileInView`-Trigger überspringen. Der Repo-Code wurde nicht verändert.
- Font-Einschränkung: Die lokale Testumgebung konnte Google Fonts nicht laden. Für Screenshots wurde Jost durch einen metrisch ähnlichen lokalen Fallback ersetzt. Die gemessenen Zeilenanzahlen sind belastbar für Breite/Höhe, exakte Glyphenmetriken müssen nach der Font-Migration mit den echten Produktionsfonts erneut geprüft werden.

## Kritisch

### C-01 — Reduced Motion macht sechs Hauptsektionen unsichtbar

**Evidenz:** `components/motion/MotionReveal.tsx:19-30`, `components/motion/useReducedMotionPreference.ts:3-6`, `app/(marketing)/[locale]/page.tsx:68-86`.

`MotionReveal` liefert serverseitig einen `motion.div` mit `opacity: 0.001`; clientseitig liefert es bei Reduced Motion einen normalen `div`. Playwright reproduziert eine React-Hydration-Warnung und sechs Wrapper, die nach 700ms weiterhin `opacity: 0.001` und `translateY(8px)` haben. Screenshot: `output/playwright/audit/en-1280-reduced-motion-experience.png`.

**Auswirkung:** Experience, Services, Solutions, Protection, Delivery und Contact sind für Nutzer mit Reduced Motion visuell nicht erreichbar. Nachgelagerte `useId()`-Werte des Accordions unterscheiden sich ebenfalls zwischen Server und Client.

**Fix:** Die DOM-Struktur nie aufgrund eines Client-Media-Queries austauschen. Immer denselben `motion.div` rendern; bei Reduced Motion `initial={false}` und Transition-Dauer `0` verwenden. Anschließend SSR/Hydration mit emulierter Reduced Motion in Playwright testen.

### C-02 — Ausgelieferter Code und Precision-Dossier-System sind zwei verschiedene Systeme

**Evidenz:** `components/layout/RootDocument.tsx:1-10`, `app/globals.css:3-20`, `app/globals.css:58-102`, `app/globals.css:119-131`, `lib/design/tokens.ts:20-157`, `DESIGN_SYSTEM.md:5`.

Der Code lädt Jost, definiert alte Aliase und Glass-Surfaces, verwendet 12px-Kartenradien, vier Schattenstufen und drei Body-Gradienten. Die im Designsystem als kanonisch benannten Dateien und Komponenten fehlen:

- `lib/design/formations.ts`
- `lib/motion/presets.ts`
- `components/ui/DotMatrix.tsx`
- `components/ui/SectionRule.tsx`
- `components/ui/MonoLabel.tsx`
- `components/ui/Stat.tsx`

**Auswirkung:** Ein visueller Feinschliff auf dem aktuellen Stand würde das falsche System optimieren. Die One-Accent-Regel, Formation Machine, Mono-Typografie und Dossier-Register sind strukturell nicht implementiert.

**Fix:** Zuerst klären, warum der Commit „Revamp visual design into a precision dossier aesthetic“ im Checkout nicht enthalten ist, und den korrekten Implementierungsstand wiederherstellen/rebasen. Erst danach Einzelbefunde dieses Audits abarbeiten; keine Parallelmigration über weitere Transitional Aliases beginnen.

## Hoch

### H-01 — Die Scroll-Story ist keine Formation Machine; Rot ist schon in Step 01 sichtbar

**Evidenz:** `components/motion/StickyStoryStage.tsx:21-47`, `components/motion/StickyStoryStage.tsx:74-85`, `components/motion/StickyStoryStage.tsx:129-185`, `components/motion/StickyStoryStage.tsx:313-316`, `components/sections/ScrollStory.tsx:21-24`.

Die Story animiert eine alte Bridge-Kurve, lokale Punktarrays und ein Technical Grid. Sie morpht nicht `field → columns → chain → perimeter → block → diamond`. Ein roter Matrixpunkt und ein roter Stage-Node werden bereits im ersten Zustand gezeichnet; der rote Progress-Pfad schaltet dagegen erst ab `activeIndex >= 4`, also Step 05, ein. Das widerspricht sowohl der Protection-Semantik als auch dem gewünschten Eintritt ab Step 04.

**Fix:** Alle lokalen Arrays und Bridge-Pfade durch identitätsstabile Dots aus `lib/design/formations.ts` ersetzen. Step 01–03 ohne Rot, Step 04–06 mit maximal einem roten Protection-Punkt. Desktop morphend, Mobile statische Snapshots derselben Daten.

### H-02 — One-Accent-Regel wird in fast jeder Schlüsselkomposition verletzt

**Evidenz:** `components/ui/HeroSignalVisual.tsx:53-59`, `components/ui/HeroSignalVisual.tsx:235-246`, `components/sections/TrustSection.tsx:28-53`, `components/ui/SystemMap.tsx:65-94`, `components/sections/ProtectionSection.tsx:18-57`.

Hero, Trust, SystemMap und Protection verteilen mehrere blaue und rote Punkte, Linien und Kacheln. Rot fungiert teils als Dekoration und nicht ausschließlich als Protection-Semantik.

**Fix:** Pro visueller Komposition genau einen blauen Signalpunkt und maximal einen roten Protection-Punkt. Alle weiteren Punkte in niedrig-opakem Graphite/On-Dark. Akzentlinien nicht zusätzlich blau-rot graduieren.

### H-03 — Motion-Architektur weicht vom verbindlichen System ab

**Evidenz:** `components/sections/HeroSection.tsx:1-17`, `components/sections/DesktopScrollStory.tsx:23-28`, `components/sections/DesktopScrollStory.tsx:117-123`, `components/motion/StoryProgress.tsx:31-52`, `components/motion/StickyStoryStage.tsx:161-219`, `components/ui/SystemMap.tsx:185-201`.

Es gibt nur **ein** `useScroll`-System (alte Desktop-Story); der Hero-Exit-Scrub fehlt. Der Hero besitzt keine Entrance-Sequenz. Timings sind lokal verteilt statt aus `lib/motion/presets.ts` zu kommen. Außerdem werden `width`, `grid-template-rows`, SVG-`r` und `pathLength` animiert, obwohl das System transform/opacity-only verlangt.

**Fix:** Exakt zwei Scroll-Scrubs implementieren: Hero-Exit und Formation Machine. Presets zentralisieren; Reveals 380–600ms, State 240–320ms, Micro 120–180ms. Progress über `scaleX`, Disclosures ohne `grid-template-rows`, Dot-Morphs über compositor-freundliche Transform-/Opacity-Strategien.

### H-04 — Header hat keinen Scrollzustand und behält verbotenen Blur

**Evidenz:** `components/layout/Header.tsx:16-19`.

Top und gescrollt sind identisch: permanenter 1px-Border, weißer Hintergrund, kein Schatten, `backdrop-filter: blur(24px)`. Das gewünschte Border-/Shadow-Verhalten beim Scrollen fehlt; Blur ist eine Altlast des Glass-Systems.

**Fix:** Kleinen clientseitigen Scrollzustand einführen. Oben flach/ruhig, nach Scroll klarer Hairline-Zustand und ausschließlich der zugelassene Overlay-Schatten, falls tatsächlich über Inhalt gelegt. Kein `backdrop-blur`.

### H-05 — Mobile-Menü erfüllt grundlegende Dialog-/Disclosure-Interaktion nicht

**Evidenz:** `components/layout/Header.tsx:53-90`, `components/motion/AnchorScrollManager.tsx:58-62`.

Playwright bestätigt: `Escape` lässt `<details open>` bestehen; Outside-Click ebenfalls. Hintergrund bleibt scrollbar und interaktiv, es gibt keine Entrance-/Exit-Animation und keine Fokusführung. Die visuelle Oberfläche ist weiterhin Glass/Pill/Shadow.

**Fix:** Kontrolliertes Menü mit Button (`aria-expanded`, `aria-controls`) und Panel aufbauen; Escape, Outside-Click, Fokus-Rückgabe, Scroll-Lock und optional Focus Trap ergänzen. Animation ausschließlich opacity/transform im State-Tier 240–320ms; Reduced Motion auf 0ms.

### H-06 — Legal-Seiten sind komplett im alten Surface-System

**Evidenz:** `components/sections/LegalDocument.tsx:15-55`, `components/ui/Surface.tsx:26-35`, `app/(legal)/imprint/page.tsx:18-28`, `app/(legal)/private-policy/page.tsx:19-33`.

Imprint und Datenschutzerklärung verwenden große alte SectionHeader-Heroes und ein schwebendes Panel mit altem Radius/Schatten. SectionRule, MonoLabel, Papierregister und 2px-Radius fehlen. Sie erben außerdem Jost sowie den alten Header/Footer.

**Fix:** Legal-Template auf flaches Paper/Paper-Soft, 1px-Register, 2px-Panels, Geist/Geist Mono und denselben Header/Footer-Vertrag wie der One-Pager umstellen. Inhalt und Rechtscopy unverändert lassen.

### H-07 — Custom NotFoundPage wird für reale 404-URLs nicht ausgeliefert

**Evidenz:** `app/(marketing)/[locale]/layout.tsx:37-45`, `app/(marketing)/[locale]/not-found.tsx:1-4`, `app/(root)/not-found.tsx:14-15`, `components/sections/NotFoundPage.tsx:18-55`.

`/en/does-not-exist`, `/de/fehlt` und `/fr` liefern die ungestylte Next-Standardseite „404: This page could not be found.“ ohne Header, Main oder lokalisierte Inhalte. Der vorhandene `NotFoundPage` ist in diesen Fällen effektiv nicht erreichbar; beim ungültigen Locale wird bereits im Root-Layout vor dessen `RootDocument` `notFound()` ausgelöst.

**Fix:** 404-Grenze so platzieren, dass ein gültiges Root-Dokument immer vorhanden ist. Locale aus dem Pfad ableiten, EN/DE korrekt ausgeben und den Custom-404 im Precision-Dossier-Stil integrieren. Alle drei oben genannten Routen in Playwright abdecken.

### H-08 — Protection-Rot verfehlt WCAG AA auf Navy

**Evidenz:** `app/globals.css:12-15`, `app/globals.css:68-70`, `components/sections/ProtectionSection.tsx:32-33`.

`#d83034` auf `#172033` erreicht nur **3,40:1** und scheitert für den kleinen uppercase Protection-Labeltext. Das bereits dokumentierte `red-on-dark` `#ff6b6f` würde **5,88:1** erreichen, existiert im aktuellen CSS aber nicht.

**Fix:** `--color-elaman-red-on-dark` kanonisch in CSS und TS spiegeln und für kleine Texte/Regeln auf Navy verwenden. Brand-Red nur dort einsetzen, wo Größe/Fläche die WCAG-Anforderung erfüllt.

### H-09 — Altlasten sind breit aktiv; der Transitional-Alias-Block ist nicht annähernd leerbar

**Evidenz:** `app/globals.css:14-20`, `app/globals.css:45-102`, `app/globals.css:164-235`, `components/ui/Surface.tsx:7-35`.

Gezählte Treffer in `app/`, `components/`, `lib/`:

| Muster                  | Treffer | Dateien |
| ----------------------- | ------: | ------: |
| `surface-glass`         |      16 |       5 |
| `strongGlass`           |       4 |       3 |
| `darkPanel`             |       4 |       2 |
| `technical-grid`        |       9 |       9 |
| `--color-brand-blue`    |       9 |       6 |
| `--border-soft`         |      32 |      14 |
| `--type-micro`          |      15 |      11 |
| `--type-h1`             |       2 |       2 |
| `focus-visible:outline` |      14 |       6 |
| rohes `bg-white`        |      22 |      10 |

**Fix:** Nach Wiederherstellung des richtigen Designstands konsumierende Komponenten zuerst auf kanonische Primitives/Tokens migrieren, dann Aliasdefinitionen entfernen. CI, Brandfarben und Fontfamilien nicht verändern.

## Mittel

### M-01 — Sektionen sind sauber ausgerichtet, aber kompositorisch zu uniform und SaaS-kartenlastig

**Evidenz:** `components/sections/CapabilityOverview.tsx:18-52`, `components/sections/TrustSection.tsx:17-53`, `components/ui/ProcessRail.tsx:15-49`, `app/globals.css:83-87`.

Experience, Services, Delivery und Protection wiederholen große Headline links plus gleichförmige Karten rechts/unten. Schatten, 12px-Radien, Icon-Kacheln und weiche Panels erzeugen den alten SaaS-Rhythmus. Auf Mobile wird dieser Effekt durch lange Kartenstapel verstärkt; der Hero ist mit Visual und vertikalen Stats rund 1.400px hoch.

**Fix:** SectionRule als konstanten Registerstart verwenden, danach die interne Komposition pro Inhalt variieren. Stats als große Ziffern statt Icon-Kacheln, Hairlines statt Kartenboxen, 2px-Radius und bewusstere Wechsel zwischen dichter und offener Sektion.

### M-02 — Deutsche Display-Überschriften brauchen eine eigene Umbruchprüfung

**Evidenz:** `components/ui/SectionHeader.tsx:31-59`, `app/globals.css:45-57`, `app/globals.css:285-288`.

Gemessen bei 1280px: Experience EN 3 Zeilen, DE 5 Zeilen; das lange „Sicherheitsanforderungen“ wird im Audit-Fallback mitten im Wort geteilt. Bei 375px liegen mehrere deutsche H2 bei vier bis fünf Zeilen. Es gibt keinen horizontalen Overflow, aber die Hierarchie verliert Tempo und erzeugt unruhige Einzelzeilen.

**Fix:** Nach Geist-Migration erneut messen. Für DE `hyphens: auto` mit korrektem `lang`, angepasste `max-width`/`clamp()`-Stufe oder section-spezifische Spaltenbreite verwenden; keine manuellen `<br>` und keine Fontabweichung.

### M-03 — Mono-Label-Hierarchie existiert nur optisch, nicht typografisch

**Evidenz:** `components/layout/RootDocument.tsx:1-10`, `components/ui/SectionLabel.tsx:12-19`, `app/globals.css:20`, `app/globals.css:51-57`.

Alle Labels laufen in Jost/Sans, obwohl sie visuell als technische Eyebrows auftreten. `SectionLabel` ersetzt weder `MonoLabel` noch `SectionRule`; Zähler und Metadaten sind dadurch inkonsistent.

**Fix:** Geist und Geist Mono in `RootDocument` laden; alle Eyebrows/Zähler auf `MonoLabel`, Top-Level-Anfänge auf `SectionRule` migrieren. Mono sparsam und nur für technische Metadaten verwenden.

### M-04 — Uniforme Reveals sind generisch; Hero und Formularzustände bleiben statisch

**Evidenz:** `components/motion/MotionReveal.tsx:14-30`, `app/(marketing)/[locale]/page.tsx:68-86`, `components/sections/ContactForm.tsx:282-304`.

Jede nachgelagerte Sektion erhält denselben 8px-Fade bei 380ms. Der Hero besitzt keine orchestrierte Entrance-Sequenz; Loading/Success/Error des Formulars wechseln ohne Motion, und Success ist nur ein Absatz.

**Fix:** Reveals auf wenige bewusst unterschiedliche, presetbasierte Muster reduzieren. Hero in klarer Reihenfolge Label → Headline → Copy/Actions → Visual staffeln. Formularstatus als kompakte State-Komposition mit opacity/transform, Fokusführung und Reduced-Motion-Zweig ausgeben.

### M-05 — Explizites Smooth-Scrolling ignoriert Reduced Motion

**Evidenz:** `components/motion/AnchorScrollManager.tsx:11-20`, `app/globals.css:337-345`.

Der JS-Aufruf erzwingt `behavior: "smooth"`; die globale Reduced-Motion-CSS-Regel garantiert nicht, dass dieses explizite Verhalten aufgehoben wird.

**Fix:** Vor dem Scrollen `matchMedia('(prefers-reduced-motion: reduce)')` prüfen und in diesem Fall `behavior: 'auto'` verwenden. Dieselbe Entscheidung aus dem Motion-System beziehen.

### M-06 — Formular ist semantisch ordentlich, aber Status-/Fehler-UX bleibt unfertig

**Evidenz:** `components/sections/ContactForm.tsx:75-85`, `components/sections/ContactForm.tsx:106-155`, `components/sections/ContactForm.tsx:282-304`.

Positiv: Leerer Submit fokussiert korrekt `#firstName`; `aria-invalid`, `aria-describedby`, Autocomplete und `aria-live="polite"` sind vorhanden. Offen: Success/Error erhalten keinen Fokus, Loading ist nur Buttontext, Success ist ein einfacher Textabsatz und Zustandswechsel sind visuell ungerichtet.

**Fix:** Statuscontainer mit `role="status"`, `tabIndex={-1}` und gezieltem Fokus nach Erfolg/Formfehler verwenden; klarer Success-State mit nächster Handlung. Motion im State-Tier, Reduced Motion 0ms.

### M-07 — Fokus-System ist weiterhin komponentweise dupliziert

**Evidenz:** `components/ui/Button.tsx:27-28`, `components/layout/Header.tsx:20-33`, `components/ui/SystemMap.tsx:150-180`, `app/globals.css:290-308`.

Es gibt 14 `focus-visible:outline`-Treffer in sechs Dateien. Gleichzeitig existiert im aktuellen `globals.css` kein allgemeiner `:focus-visible`-Selektor; Formfelder setzen `outline: none` und bauen ein separates `:focus`-Box-Shadow-System.

**Fix:** Einen globalen 2px-Elaman-Blue-Focusring definieren, Formfelder einbeziehen und lokale Outline-Klassen entfernen. Keine unterschiedlichen Ringfarben oder Schatten je Primitive.

### M-08 — Skip-Link fehlt

**Evidenz:** `components/layout/RootDocument.tsx:17-26`, `components/layout/Header.tsx:16-92`.

Die Seiten besitzen keinen „Zum Inhalt“-Link vor der sticky Navigation.

**Fix:** Als erstes fokussierbares Element einen lokalisierten Skip-Link auf `main` einbauen und dessen sichtbaren Focus-State global gestalten.

### M-09 — Footer ist noch der alte Gradient-/Pill-Abschluss

**Evidenz:** `components/layout/Footer.tsx:18-20`, `components/layout/Footer.tsx:46-74`.

Der blau-rote Gradient-Strip und die pillenförmigen Legal-Chips widersprechen Register-Hairlines und Mono-Linknavigation. Der Desktopabschluss wirkt wie ein separates altes Modul; Mobile ist lesbar, aber ohne Dossier-Raster.

**Fix:** Einfarbige Hairline, klarer Spaltenregister, Mono-Links ohne Pillflächen; Rot nur, wenn Protection-Semantik vorliegt.

## Nice-to-have

### N-01 — Contact-Bild löst im Dev-Audit eine LCP-Warnung aus

**Evidenz:** `components/sections/ContactSection.tsx:61-68`.

Next meldete `/images/elaman-munich-office.jpg` wiederholt als LCP und empfahl eager loading. Da Element-Screenshots zur Contact-Sektion gescrollt haben, ist dies zunächst ein Hinweis, kein belastbarer Feldwert.

**Fix:** Mit Produktionsbuild/Web Vitals verifizieren. Nur wenn das Bild real LCP ist, `priority`/`loading="eager"` setzen; sonst Lazy Loading beibehalten und die Dossier-Relevanz des großen Fotos grundsätzlich prüfen.

### N-02 — Footer-ARIA-Labels sind in DE englisch

**Evidenz:** `components/layout/Footer.tsx:47-63`.

`Footer navigation` und `Legal navigation` sind hartcodiert.

**Fix:** Beide Labels aus lokalisierter Navigation/Content beziehen.

### N-03 — Normale Kontraste sind gut, aber Graphite-Soft hat wenig Reserve

**Evidenz:** `app/globals.css:9-13`, `app/globals.css:62-70`.

Messwerte:

| Kombination                              |   Ratio | Ergebnis                  |
| ---------------------------------------- | ------: | ------------------------- |
| graphite-soft `#667286` / paper `#fff`   |  4,87:1 | AA normal bestanden       |
| graphite-soft / paper-soft `#f7f8fa`     |  4,58:1 | AA normal knapp bestanden |
| on-dark-muted `#c7d0dc` / navy `#172033` | 10,45:1 | deutlich bestanden        |

**Fix:** Keine weitere Opacity auf kleinen `graphite-soft`-Texten anwenden; bei dünner Mono-Typografie erneut messen.

### N-04 — Keine Horizontal-Overflow-Regression bei 375px

**Evidenz:** Browsermessung auf `/en` und `/de`: `documentElement.scrollWidth === innerWidth === 375`.

Das ist ein positiver Befund. Bei der Dossier-Migration als Regressionstest beibehalten.

## Empfohlene Reihenfolge

1. C-01 sofort beheben und Reduced-Motion-Hydration als automatischen Test sichern.
2. Den fehlenden Precision-Dossier-Code/Commit wiederherstellen; erst dann C-02/H-01/H-02/H-03/H-09 konsistent lösen.
3. Header, Mobile-Menü und 404 als globale Navigationsebene korrigieren.
4. Legal, Footer und Contact-State auf die finalen Primitives migrieren.
5. EN/DE bei 1280/375 erneut mit echten Geist-Fonts, Reduced Motion und Produktionsbuild prüfen.

## Screenshot-Index

| View    | Hero                       | Experience                          | Story                                           | Services                              | Solutions                        | Protection                          | Delivery                          | Contact                          |
| ------- | -------------------------- | ----------------------------------- | ----------------------------------------------- | ------------------------------------- | -------------------------------- | ----------------------------------- | --------------------------------- | -------------------------------- |
| EN 1280 | `en-1280-hero-element.png` | `en-1280-experience-diagnostic.png` | `en-1280-story-local-p0.03.png` bis `p0.85.png` | `en-1280-capabilities-diagnostic.png` | `en-1280-systems-diagnostic.png` | `en-1280-protection-diagnostic.png` | `en-1280-delivery-diagnostic.png` | `en-1280-contact-diagnostic.png` |
| DE 1280 | `de-1280-hero.png`         | `de-1280-experience-diagnostic.png` | `de-1280-story-p0.03.png`, `p0.51.png`          | `de-1280-capabilities-diagnostic.png` | `de-1280-systems-diagnostic.png` | `de-1280-protection-diagnostic.png` | `de-1280-delivery-diagnostic.png` | `de-1280-contact-diagnostic.png` |
| EN 375  | `en-375-hero.png`          | `en-375-experience-diagnostic.png`  | `en-375-story.png`                              | `en-375-capabilities-diagnostic.png`  | `en-375-systems-diagnostic.png`  | `en-375-protection-diagnostic.png`  | `en-375-delivery-diagnostic.png`  | `en-375-contact-diagnostic.png`  |
| DE 375  | `de-375-hero.png`          | `de-375-experience-diagnostic.png`  | `de-375-story.png`                              | `de-375-capabilities-diagnostic.png`  | `de-375-systems-diagnostic.png`  | `de-375-protection-diagnostic.png`  | `de-375-delivery-diagnostic.png`  | `de-375-contact-diagnostic.png`  |

Weitere Evidenz: `en-375-menu-open.png`, `en-375-contact-errors.png`, `de-375-footer.png`, `de-1280-footer.png`, `imprint-*`, `private-policy-*`, `notfound-*`, `en-1280-reduced-motion-experience.png`.
