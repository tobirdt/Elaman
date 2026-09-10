# Elaman Website

Production-ready bilingual Next.js website for Elaman GmbH. The current product combines a five-section homepage, two focused dossier pages, legal pages, and a server-validated contact form.

## Stack

- Next.js 16 / React 19
- Tailwind CSS 4
- Geist and Geist Mono through `next/font`
- Resend for inquiry delivery

The site intentionally has no client animation library. Its restrained entrance, feedback, and responsive soft-snap behavior live in `app/globals.css`.

## Homepage

The fixed bilingual sequence is:

1. `#hero` — Home / Start
2. `#profile` — Company / Unternehmen
3. `#advice` — Approach / Vorgehen
4. `#systems` — Systems / Systeme
5. `#contact` — Contact / Kontakt

Desktop sections occupy at least the visible height below the sticky header. Mobile, tablet, short displays, and sections with additional content grow and scroll naturally.

## Dossier pages

| Topic   | German            | English       |
| ------- | ----------------- | ------------- |
| Company | `/de/unternehmen` | `/en/company` |
| Systems | `/de/systeme`     | `/en/systems` |

Each route has reciprocal language links, canonical/hreflang metadata, structured data, and a route-specific social preview. Detail pages use normal document flow and do not opt into homepage scroll snap.

## Global navigation

The points-only signet links to the localised homepage. Desktop navigation links directly to Company and Systems, followed by the homepage anchors Approach and Contact. The mobile menu prepends an explicit Home / Start entry. Active styling follows either the current dossier route or the corresponding homepage section.

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000` or `http://localhost:3000`.

## Validation

Run the full local quality gate before deployment:

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run test:e2e
npm audit --omit=dev
```

For visual changes, verify DE and EN at 320×568, 390×844, 768×1024, 1024×768, 1366×768, 1440×900, and 1600×1000.

## Required Environment Variables

Create a local `.env.local` file and configure the same values in Vercel:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=https://www.elaman.de
```

`RESEND_API_KEY` is used by `/api/contact`. `CONTACT_TO_EMAIL` receives inquiries. `CONTACT_FROM_EMAIL` must be a verified Resend sender. `NEXT_PUBLIC_SITE_URL` controls canonical, social, and structured-data URLs and must not end with a slash.

## Search visibility

The site publishes localised titles and descriptions, canonical and `hreflang` links, a canonical-only sitemap, robots directives, and linked `Organization`, `WebSite`, `WebPage`, and factual management structured data. Search language stays aligned with the visible service content; hidden keyword lists and duplicate search pages are intentionally not used.

After a production deployment and final DNS cutover:

1. Verify `https://www.elaman.de` as a domain property in Google Search Console.
2. Submit `https://www.elaman.de/sitemap.xml`.
3. Inspect and request indexing for `/de`, `/en`, the four dossier URLs, and the four legal URLs.
4. Check that Google sees the production canonical URLs rather than the previous Wix deployment.
5. Recheck coverage and search queries after Google has recrawled the domain.

## Contact Form Delivery

The contact API validates all submissions server-side, enforces the payload limit while reading the request stream, checks the hidden honeypot, applies a bounded best-effort in-memory rate limit per runtime instance, and sends through Resend when all required environment variables are configured. API responses are never cached, and rate-limited responses include `Retry-After`.

If the honeypot is filled, the API returns `{ "ok": true }` without sending email. If mail variables are missing locally, a valid submission returns `send_failed`; production success is never faked. The email includes escaped plain text and minimal escaped HTML.

## Vercel Deployment Preparation

1. Link or select the Vercel project.
2. Add all required environment variables.
3. Verify the Resend sending domain or sender address.
4. Run the full local validation gate.
5. Push a non-production branch and inspect its Vercel Preview.
6. Check desktop, tablet, mobile, and reduced-motion behavior on the Preview.
7. Check `/de`, `/en`, all four dossier URLs, all four legal URLs, the 404 page, metadata, and the sitemap.
8. Promote or merge only after Preview acceptance.
9. Submit a production test inquiry and confirm delivery and reply-to behavior.

Build command:

```bash
npm run build
```

## Post-Deployment Checklist

1. Confirm the live homepage loads over HTTPS.
2. Confirm canonical and Open Graph URLs use the live domain.
3. Confirm all global-navigation destinations and active page/section states work in both locales.
4. Confirm the language switch preserves the active hash or opens the reciprocal dossier route.
5. Confirm each dossier language switch opens its matching reciprocal route.
6. Confirm the mobile menu opens without page bleed, traps focus, closes with Escape/outside click, and navigates.
7. Confirm touch/tablet scrolling is free and desktop snap remains gentle.
8. Confirm reduced motion disables smooth scrolling and snap.
9. Submit an invalid contact form and confirm field errors and focus movement.
10. Submit a valid production inquiry and confirm email delivery and reply-to.
11. Confirm phone and email links work.
12. Confirm legal, dossier, and 404 routes render without overflow.
13. Confirm there are no browser-console errors or horizontal overflow.

The Playwright suite runs this route, interaction, serious-accessibility, and overflow smoke coverage in desktop Chromium plus iPhone 15 portrait and landscape WebKit emulation. Use `npm run test:e2e:iphone` for the focused mobile gate.

## Legal Review Note

Both legal documents exist in German and English at localised routes; `/imprint` and `/private-policy` redirect permanently to the German versions.

The privacy policy was rewritten to describe only the processing that actually happens on this site: access logs at the hosting provider, and the inquiry form delivered through Resend. The previous text declared Google Analytics, Google Maps, cookies and Flash storage that the site never used, and cited the EU-US Privacy Shield, invalid since 2020.

**Before production launch, legal counsel must sign the documents off.** The rewrite is factually accurate against the current code, but it is not legal advice. Two things need confirming against your records: the register and tax details in the imprint, and the named processors — the policy states Vercel (hosting) and Resend (email delivery). If either changes, or if the site ever gains analytics, an embed or a cookie, the policy has to be updated in the same change.
