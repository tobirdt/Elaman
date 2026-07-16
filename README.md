# Elaman Website

Production-ready bilingual Next.js website for Elaman GmbH. The current product is a six-section one-pager with legal pages and a server-validated contact form.

## Stack

- Next.js 16 / React 19
- Tailwind CSS 4
- Geist and Geist Mono through `next/font`
- Resend for inquiry delivery

The site intentionally has no client animation library. Its restrained entrance, feedback, and responsive soft-snap behavior live in `app/globals.css`.

## Homepage

The fixed bilingual sequence is:

1. `#hero` — Home / Start
2. `#profile` — Profile / Profil
3. `#advice` — Advice / Beratung
4. `#systems` — Surveillance / Observation
5. `#protection` — Protection / Schutz
6. `#contact` — Contact / Kontakt

Desktop sections occupy at least the visible height below the sticky header. Mobile, tablet, short displays, and sections with additional content grow and scroll naturally.

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

## Contact Form Delivery

The contact API validates all submissions server-side, checks the hidden honeypot, applies a small best-effort in-memory rate limit per runtime instance, and sends through Resend when all required environment variables are configured.

If the honeypot is filled, the API returns `{ "ok": true }` without sending email. If mail variables are missing locally, a valid submission returns `send_failed`; production success is never faked. The email includes escaped plain text and minimal escaped HTML.

## Vercel Deployment Preparation

1. Link or select the Vercel project.
2. Add all required environment variables.
3. Verify the Resend sending domain or sender address.
4. Run the full local validation gate.
5. Push a non-production branch and inspect its Vercel Preview.
6. Check desktop, tablet, mobile, and reduced-motion behavior on the Preview.
7. Check `/de`, `/en`, `/imprint`, `/private-policy`, 404, metadata, and sitemap.
8. Promote or merge only after Preview acceptance.
9. Submit a production test inquiry and confirm delivery and reply-to behavior.

Build command:

```bash
npm run build
```

## Post-Deployment Checklist

1. Confirm the live homepage loads over HTTPS.
2. Confirm canonical and Open Graph URLs use the live domain.
3. Confirm all six anchors and active navigation work in both locales.
4. Confirm the language switch preserves the active hash.
5. Confirm the mobile menu opens, closes with Escape/outside click, and navigates.
6. Confirm touch/tablet scrolling is free and desktop snap remains gentle.
7. Confirm reduced motion disables smooth scrolling and snap.
8. Submit an invalid contact form and confirm field errors and focus movement.
9. Submit a valid production inquiry and confirm email delivery and reply-to.
10. Confirm phone and email links work.
11. Confirm legal and 404 routes render without overflow.
12. Confirm there are no browser-console errors or horizontal overflow.

## Legal Review Note

The imprint and privacy policy content is preserved from the extracted existing legal text. Before production launch, responsible counsel or the site owner should confirm that it reflects the actual production tracking, cookies, and data processing.
