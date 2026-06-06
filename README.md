# Elaman Website

Production-ready Next.js website for Elaman GmbH.

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

## Git Readiness

If this folder is not already a git repository, initialize and commit only after reviewing the generated file list:

```bash
git init
git add .
git commit -m "Initial Elaman website"
```

Then connect the repository to the chosen remote:

```bash
git remote add origin <repository-url>
git branch -M main
git push -u origin main
```

Do not commit `.env`, `.env.local`, `.next`, `node_modules`, or TypeScript build-info files. These are covered by `.gitignore`.

## Post-Deployment Checklist

1. Confirm the live homepage loads over HTTPS.
2. Confirm canonical and Open Graph URLs use the live domain.
3. Confirm the desktop sticky story works at wide desktop sizes.
4. Confirm tablet and mobile use the unpinned story sequence.
5. Confirm the mobile menu opens and links navigate.
6. Submit an invalid contact form and confirm field errors.
7. Submit a valid contact form and confirm email delivery.
8. Confirm reply-to uses the submitter email.
9. Confirm phone and email links work.
10. Confirm `/imprint` and `/private-policy` render without overflow.

## Legal Review Note

The imprint and privacy policy content is preserved from the extracted existing legal text. Before production launch, legal counsel or the responsible site owner should review whether the preserved privacy policy still reflects the actual production tracking, cookies, and data-processing setup.
