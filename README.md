# Elaman Website

Production-ready bilingual Next.js website for Elaman GmbH. The current product is a four-composition one-pager with legal pages and a server-validated contact form.

## Stack

- Next.js 16 / React 19
- Tailwind CSS 4
- Geist and Geist Mono through `next/font`
- Resend for inquiry delivery

The site intentionally has no client animation library; its restrained transitions live in `app/globals.css`.

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

## Required Environment Variables

Create a local `.env.local` file and configure the same values in Vercel:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=https://www.elaman.de
```

`RESEND_API_KEY` is the Resend API key used by `/api/contact`.

`CONTACT_TO_EMAIL` is the inbox that receives website inquiries.

`CONTACT_FROM_EMAIL` must be a verified sender in Resend. For production, verify the sender domain in the Resend dashboard before enabling live traffic.

`NEXT_PUBLIC_SITE_URL` controls canonical URLs, Open Graph URLs, Twitter metadata, and structured data. Set it to the final production domain without a trailing slash.

## Contact Form Delivery

The contact API validates all submissions server-side, checks the hidden honeypot field, applies a small best-effort in-memory rate limit per runtime instance, and sends through Resend when all required environment variables are configured.

If the honeypot field is filled, the API returns `{ "ok": true }` without sending email.

If Resend variables are missing locally, valid submissions return `send_failed`. This is intentional and confirms that production sending is not being faked without credentials.

The email includes plain text and minimal escaped HTML. User-provided content is not rendered as raw HTML.

## Vercel Deployment Preparation

1. Create or select the Vercel project.
2. Set the framework preset to Next.js.
3. Add the environment variables listed above in Vercel Project Settings.
4. Verify the sending domain or sender address in Resend.
5. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
6. Run the validation commands locally.
7. Deploy from Vercel after the environment is configured.
8. Submit a test inquiry in production and confirm delivery to `CONTACT_TO_EMAIL`.
9. Check metadata/social preview output for the final domain.
10. Check `/imprint` and `/private-policy`.
11. Check desktop, tablet, and mobile behavior on the live domain.
12. Attach/configure the final domain if it was not used for the first deploy.

Build command:

```bash
npm run build
```

Output is handled by Next.js/Vercel automatically.

## Post-Deployment Checklist

1. Confirm the live homepage loads over HTTPS.
2. Confirm canonical and Open Graph URLs use the live domain.
3. Confirm the capability ledger uses two columns on tablet/desktop and one on mobile.
4. Confirm the mobile menu opens, closes with Escape/outside click, and links navigate.
5. Submit an invalid contact form and confirm field errors.
6. Submit a valid contact form and confirm email delivery.
7. Confirm reply-to uses the submitter email.
8. Confirm phone and email links work.
9. Confirm `/imprint`, `/private-policy`, and 404 states render without overflow.
10. Check both locales with normal and reduced motion.

## Legal Review Note

The imprint and privacy policy content is preserved from the extracted existing legal text. Before production launch, legal counsel or the responsible site owner should review whether the preserved privacy policy still reflects the actual production tracking, cookies, and data-processing setup.
