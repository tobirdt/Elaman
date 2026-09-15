# Elaman Website

Bilingual (German/English) Next.js website for Elaman GmbH: a five-section homepage, two dossier pages (Company, Systems), a contact page with an inquiry form, and localised legal pages.

## Stack

- Next.js 16 / React 19, App Router, Turbopack
- Tailwind CSS 4
- Geist and Geist Mono through `next/font`
- Resend for inquiry delivery

The site has no client animation library. Its entrance and scroll-linked reveal motion live in `app/globals.css` as CSS transitions and `animation-timeline: view()`.

## Pages

| Page    | German            | English              |
| ------- | ----------------- | -------------------- |
| Home    | `/de`             | `/en`                |
| Company | `/de/unternehmen` | `/en/company`        |
| Systems | `/de/systeme`     | `/en/systems`        |
| Contact | `/de/kontakt`     | `/en/contact`        |
| Imprint | `/de/impressum`   | `/en/site-notice`    |
| Privacy | `/de/datenschutz` | `/en/privacy-policy` |

`/imprint` and `/private-policy` redirect permanently (308) to the German legal pages (`next.config.ts`). Every internal path is built with the typed helpers in `lib/i18n.ts` (`homePath`, `detailPagePath`, `contactPagePath`, `legalPagePath`); no component casts an href with `as Route`.

Unknown routes render the full branded 404 (`app/global-not-found.tsx`) through `dynamicParams = false` on the catch-all page. Next.js 16.3.4 additionally logs an internal `NoFallbackError` for these correctly-answered 404s — a confirmed upstream issue ([vercel/next.js#90537](https://github.com/vercel/next.js/issues/90537)), not a defect in this site. The static parameter limit stays in place because it serves the complete branded 404 from the server, without JavaScript.

Global navigation (`Header`, `Footer`) shows Company, Systems, and Contact as real pages, plus the locale switch; there are no in-page anchors or scroll-spy. See `AGENTS.md` and `CONTENT_BLUEPRINT.md` for the content and navigation contract, `DESIGN_SYSTEM.md` for the visual and motion contract.

## Local development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000` or `http://localhost:3000`.

## Validation gate

Run before every deployment:

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test:unit
npm run build
npm run test:e2e
npm audit --omit=dev
```

- `npm run test:unit` runs the Vitest suite in `tests/unit` (contact validation, email rendering, locale routing) without a browser.
- `npm run test:e2e` runs Playwright (`tests/e2e`) against `next dev` locally; with `CI=true` it runs against the production server (`next start`) instead, which is what CI does.

## CI

`.github/workflows/ci.yml` runs on every push to `main` and every pull request: lint, typecheck, format check, unit tests, and build in one job; Playwright (Chromium + iPhone WebKit portrait/landscape) against a production build in a second job that depends on the first. `.github/dependabot.yml` checks npm and GitHub Actions dependencies weekly (Mondays, Europe/Berlin), grouping minor and patch updates into separate pull requests per ecosystem.

## Environment variables

Create a local `.env.local` (see `.env.example`) and configure the same values in Vercel:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=https://www.elaman.de
```

`RESEND_API_KEY` is used by `/api/contact`. `CONTACT_TO_EMAIL` receives inquiries. `CONTACT_FROM_EMAIL` must be a verified Resend sender. `NEXT_PUBLIC_SITE_URL` controls canonical, social, and structured-data URLs and must not end with a slash. If any of the three mail variables is missing, `/api/contact` fails safely with `send_failed` — it never fakes a successful delivery.

## Deployment

- Vercel project `elaman` (`prj_oQRgobA8NAnFffCZKIyCC6SNcaLn`), team `tobirumscheidt-1382s-projects` (`team_ABJQhrM75EFv0Y1WEsFyY3j0`).
- Domains: `elaman.de` and `www.elaman.de`; canonical base `https://www.elaman.de`, with `/` redirecting to `/de`.
- Build command: `npm run build`.
- The serverless function region is pinned to `fra1` via `vercel.json` — not via a route segment's `preferredRegion` export, which Next 16 deprecated and which now only accepts `"auto"`, `"global"`, or `"home"` on Vercel (see the comment in `app/api/contact/route.ts`).

Before promoting a deployment: verify the Resend sending domain/sender, run the full validation gate, push a preview branch, and check desktop/tablet/mobile and reduced-motion behaviour on the Vercel Preview.

## Regenerating icons

```bash
npm run icons
```

Runs `scripts/generate-icons.mjs`, which renders `public/brand/elaman-icon.svg` into `favicon.ico`, `icon-32/192/512.png`, `icon-512-maskable.png`, and `apple-touch-icon.png`, and re-crops `public/images/elaman-munich-office.jpg` into the contact page's `public/images/elaman-contact-og.jpg` social image. Deterministic and idempotent — re-run it whenever the source signet or the office photograph changes. It depends on `sharp`, which is available transitively through Next's own optional dependency once `npm install` has run.

## Contact form delivery

Flow: form → client-side validation → `POST /api/contact` → server-side checks, in this order: payload size → JSON parsing → request origin (`Sec-Fetch-Site` / `Origin` vs. request host; forbidden origins get `403`) → rate limit (per-IP, in-memory, best effort) → honeypot → completion-time check (`startedAt`; submissions under 3 seconds, with no stamp, or with a future stamp are silently discarded as `{ "ok": true }`) → field validation → send via Resend.

Server-side field error messages are localised (German/English) in `lib/validation/contact.ts`, independent of the marketing content module. The email (`lib/email/contact-email.ts`) is in German regardless of the inquiry's language (the language is called out as a row in the table so the team replies in kind), with subject `Anfrage über elaman.de: <name>, <company>` and both an escaped plain-text and an escaped HTML body. API responses are never cached.

## Legal review note

Both legal documents exist in German and English at localised routes; `/imprint` and `/private-policy` redirect permanently to the German versions. The privacy policy (`lib/content/legal.ts`) describes only processing that actually happens on this site: server access logs at the hosting provider (Vercel) and the inquiry form, processed at Vercel's data centre in Frankfurt am Main and delivered by Resend. It is dated September 2026.

**Before production launch, legal counsel must sign the documents off.** The text is factually accurate against the current code, but it is not legal advice. Confirm the register and tax details in the imprint against current records. If the named processors, the data flow, or the retention rationale change, update `lib/content/legal.ts` in the same change.

## Post-deployment checklist

1. Confirm the live homepage loads over HTTPS on `www.elaman.de`.
2. Confirm canonical and Open Graph URLs use the live domain.
3. Confirm Company, Systems, and Contact resolve in both locales and the active-page state is correct.
4. Confirm the language switch on every page opens the matching reciprocal route.
5. Confirm the mobile menu opens without page bleed, traps focus, closes with Escape/outside click, and navigates.
6. Confirm reduced motion disables the hero entrance and the scroll-linked reveal, showing final states immediately.
7. Submit an invalid contact form and confirm field errors and focus movement.
8. Submit a valid production inquiry and confirm email delivery and reply-to behaviour.
9. Confirm phone and email links work on the homepage, contact page, and footer.
10. Confirm legal, dossier, contact, and 404 routes render without horizontal overflow.
11. Confirm there are no browser-console errors.

The Playwright suite (`tests/e2e`) covers this route, interaction, accessibility, and overflow smoke coverage in desktop Chromium plus iPhone 15 portrait and landscape WebKit emulation. Use `npm run test:e2e:iphone` for the focused mobile gate.
