#!/usr/bin/env node
/**
 * Creates the Elaman admin accounts and prints one invitation link each.
 *
 * Nobody, including this script, ever sets another person's password. What it
 * writes is an account with no credentials and a one-time link; the password
 * and the authenticator are chosen by the person who opens it. That is why
 * there is no `--password` flag here and never should be.
 *
 * The token helpers are imported from the application rather than reimplemented,
 * which is why this runs under `--experimental-strip-types`: a second copy of
 * "generate 32 random bytes and store the SHA-256" is a second copy that can
 * quietly differ from the one the login path uses.
 *
 *   npm run seed:admins
 *   npm run seed:admins -- --reissue    also re-invite accounts that exist
 *
 * Run it again and it is a no-op: existing accounts are left alone unless
 * --reissue is given, and an account that has already been set up is never
 * reset by it.
 */
import { generateToken, hashToken } from "../lib/auth/crypto.ts";
import { closePool, query, queryOne, transaction } from "../lib/db/client.ts";

const admins = [
  { email: "tobias.rumscheidt@elaman.de", name: "Tobias Rumscheidt" },
  { email: "holger.rumscheidt@elaman.de", name: "Holger Rumscheidt" },
  { email: "stephan.floss@elaman.de", name: "Stephan Floss" },
];

const invitationDays = 7;
const reissue = process.argv.includes("--reissue");
const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

function invitationLink(token) {
  return `${baseUrl}/de/portal/invitation?token=${token}`;
}

try {
  for (const admin of admins) {
    const existing = await queryOne(
      "select id, status from users where lower(email) = lower($1)",
      [admin.email],
    );

    if (existing && !reissue) {
      console.log(`  unchanged   ${admin.email} (${existing.status})`);
      continue;
    }

    if (existing?.status === "active" && reissue) {
      // Re-inviting an active account would let anyone holding the new link
      // replace a working credential. If that is really wanted, the account
      // has to be disabled first, deliberately.
      console.log(`  skipped     ${admin.email} (already set up)`);
      continue;
    }

    const token = generateToken();

    await transaction(async (client) => {
      const userId =
        existing?.id ??
        (
          await client.query(
            `insert into users (email, name, role, status)
             values ($1, $2, 'admin', 'invited')
             returning id`,
            [admin.email, admin.name],
          )
        ).rows[0].id;

      // One live invitation per account: an older link should stop working the
      // moment a new one is handed out.
      await client.query(
        "delete from invitations where user_id = $1 and redeemed_at is null",
        [userId],
      );

      await client.query(
        `insert into invitations (user_id, token_hash, expires_at)
         values ($1, $2, now() + ($3::int * interval '1 day'))`,
        [userId, hashToken(token), invitationDays],
      );
    });

    console.log(`  ${existing ? "reinvited" : "created  "}   ${admin.email}`);
    console.log(`              ${invitationLink(token)}`);
  }

  const total = await query("select count(*)::int as n from users where role = 'admin'");
  console.log(
    `\nAdmin accounts: ${total[0].n}. Links are valid for ${invitationDays} days.`,
  );
} finally {
  await closePool();
}
