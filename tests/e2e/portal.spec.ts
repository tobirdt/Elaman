import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { generateToken, hashToken } from "@/lib/auth/crypto";
import { closePool, query, queryOne } from "@/lib/db/client";
import { counterFor, hotp, base32Decode } from "@/lib/auth/totp";

/**
 * The portal, end to end, against a real database.
 *
 * This is the only suite that needs `DATABASE_URL`, and it skips without one,
 * so CI keeps running unchanged while the public site has no database. Run it
 * against the development branch:
 *
 *   DATABASE_URL=… npx playwright test portal --project=desktop-chromium
 *
 * Everything it creates carries a marker in the address and is removed
 * afterwards, so it can run against a database that has real accounts in it
 * without touching them.
 */
const marker = `e2e-${Date.now()}`;
const testEmail = `${marker}@example.test`;
const testPassword = "ein ausreichend langes Kennwort";

/**
 * Fields are addressed by role and accessible name, not by label text.
 *
 * The visible label carries a required marker — "Kennwort *" — which is
 * `aria-hidden`, so it is not part of what a screen reader announces but is
 * part of the label's text content. `getByLabel` matches the text content and
 * would need the asterisk spelled into every locator; the accessible name is
 * both the cleaner match and the property actually worth asserting.
 */
function field(page: Page, name: string) {
  return page.getByRole("textbox", { name, exact: true });
}

/**
 * A code the server will still accept.
 *
 * The replay guard refuses any step at or below the last one accepted, and
 * enrolling the authenticator already spends the step it happened in. So the
 * code for "now" is often the one code that cannot work, and a test that used
 * it would pass or fail depending on which second it ran in.
 *
 * This asks the database which step was last spent and takes the first one
 * after it, waiting only if that step has not arrived yet — the verifier
 * accepts one step of drift ahead, so in practice it never has to wait.
 */
async function freshCode(userId: string, secret: string): Promise<string> {
  const row = await queryOne<{ totp_last_step: string | null }>(
    "select totp_last_step from users where id = $1",
    [userId],
  );
  const lastUsed = row?.totp_last_step == null ? -1n : BigInt(row.totp_last_step);
  const current = counterFor(Date.now() / 1000);

  // The current step when it has not been spent, otherwise the one after the
  // last spent step.
  const step = current > lastUsed ? current : lastUsed + 1n;

  // The verifier accepts one step of drift ahead, so a wait is only needed if
  // the chosen step is further out than that. It should not happen; it is here
  // so the test waits rather than fails if it ever does.
  while (step > counterFor(Date.now() / 1000) + 1n) {
    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }

  return hotp(base32Decode(secret), step);
}

test.describe("portal", () => {
  test.skip(!process.env.DATABASE_URL, "Needs DATABASE_URL.");
  // Serial because the steps build on one another in the database: the
  // invitation has to be redeemed before there is a password to sign in with.
  // It does *not* share a browser context — each test gets a fresh one, so the
  // session cookie does not survive between them and anything that needs a
  // signed-in browser has to sign in inside its own test.
  test.describe.configure({ mode: "serial" });

  let companyId = "";
  let userId = "";
  let invitationToken = "";
  let totpSecret = "";

  test.beforeAll(async () => {
    companyId = (await queryOne<{ id: string }>(
      "insert into companies (name) values ($1) returning id",
      [`Testfirma ${marker}`],
    ))!.id;

    userId = (await queryOne<{ id: string }>(
      `insert into users (email, name, role, company_id, status)
         values ($1, $2, 'customer', $3, 'invited')
         returning id`,
      [testEmail, "Testkundin Beispiel", companyId],
    ))!.id;

    invitationToken = generateToken();
    await query(
      `insert into invitations (user_id, token_hash, expires_at)
       values ($1, $2, now() + interval '1 day')`,
      [userId, hashToken(invitationToken)],
    );
  });

  test.afterAll(async () => {
    // Children first: sessions and invitations cascade from the user, but the
    // company would be held by the foreign key.
    await query("delete from users where id = $1", [userId]);
    await query("delete from companies where id = $1", [companyId]);
    await query("delete from login_attempts where email = $1", [testEmail]);
    await query("delete from audit_log where actor_email = $1", [testEmail]);
    await closePool();
  });

  test("an invitation link sets the password and enrols the authenticator", async ({
    page,
  }) => {
    await page.goto(`/de/portal/invitation?token=${invitationToken}`);

    // The secret is shown for anyone who cannot scan; the test reads it the
    // same way a person with a desktop authenticator would.
    await expect(
      page.getByRole("heading", { name: "Authenticator verbinden" }),
    ).toBeVisible();
    const secret = await queryOne<{ totp_secret: string }>(
      "select totp_secret from users where id = $1",
      [userId],
    );
    totpSecret = secret!.totp_secret.replace(/\s/g, "");
    expect(totpSecret.length).toBeGreaterThan(20);

    // A QR code is rendered inline, on the server: no image request.
    await expect(page.locator("svg[viewBox]").first()).toBeVisible();

    await field(page, "Kennwort").fill(testPassword);
    await field(page, "Kennwort wiederholen").fill(testPassword);
    await field(page, "Code aus der App").fill(await freshCode(userId, totpSecret));
    await page.getByRole("button", { name: "Konto einrichten" }).click();

    await expect(
      page.getByRole("heading", { name: "Konto ist eingerichtet" }),
    ).toBeVisible();

    // The account is only active once both halves exist; the schema refuses
    // any other combination, so this also proves the constraint held.
    const row = await queryOne<{
      status: string;
      password_hash: string | null;
      totp_enrolled_at: Date | null;
    }>("select status, password_hash, totp_enrolled_at from users where id = $1", [
      userId,
    ]);

    expect(row?.status).toBe("active");
    expect(row?.password_hash).not.toBeNull();
    expect(row?.totp_enrolled_at).not.toBeNull();
  });

  // The ordinary case for a new account: enrol, then sign in seconds later.
  // The code is right and already spent, and saying "wrong code" here would
  // send someone looking for a problem with their app.
  test("the code used for enrolment is refused as spent, not as wrong", async ({
    page,
  }) => {
    const spent = await queryOne<{ totp_last_step: string | null }>(
      "select totp_last_step from users where id = $1",
      [userId],
    );
    const spentCode = hotp(base32Decode(totpSecret), BigInt(spent!.totp_last_step!));

    await page.goto("/de/portal");
    await field(page, "E-Mail-Adresse").fill(testEmail);
    await field(page, "Kennwort").fill(testPassword);
    await page.getByRole("button", { name: "Weiter" }).click();
    await field(page, "Sechsstelliger Code").fill(spentCode);
    await page.getByRole("button", { name: "Anmelden" }).click();

    await expect(page.getByText("bereits verwendet")).toBeVisible();
    // The step is kept, so the next code can simply be typed in.
    await expect(field(page, "Sechsstelliger Code")).toBeVisible();
  });

  test("the same invitation link cannot be used twice", async ({ page }) => {
    await page.goto(`/de/portal/invitation?token=${invitationToken}`);

    await expect(
      page.getByRole("heading", { name: "Einladung nicht gültig" }),
    ).toBeVisible();
  });

  test("a wrong password is refused, and says nothing about the account", async ({
    page,
  }) => {
    await page.goto("/de/portal");
    await field(page, "E-Mail-Adresse").fill(testEmail);
    await field(page, "Kennwort").fill("das ist nicht das Kennwort");
    await page.getByRole("button", { name: "Weiter" }).click();

    await expect(page.getByText("Anmeldung nicht möglich")).toBeVisible();
    // Still on the first step: no challenge was opened.
    await expect(field(page, "E-Mail-Adresse")).toBeVisible();
  });

  test("an unknown address gets the identical message", async ({ page }) => {
    await page.goto("/de/portal");
    await field(page, "E-Mail-Adresse").fill(`niemand-${marker}@example.test`);
    await field(page, "Kennwort").fill("irgendein langes Kennwort");
    await page.getByRole("button", { name: "Weiter" }).click();

    await expect(page.getByText("Anmeldung nicht möglich")).toBeVisible();
  });

  test("the right password alone does not sign anyone in", async ({ page }) => {
    await page.goto("/de/portal");
    await field(page, "E-Mail-Adresse").fill(testEmail);
    await field(page, "Kennwort").fill(testPassword);
    await page.getByRole("button", { name: "Weiter" }).click();

    // Second step, not the overview.
    await expect(page.getByRole("heading", { name: "Bestätigungscode" })).toBeVisible();
    expect(new URL(page.url()).pathname).toBe("/de/portal");

    // And no session cookie has been issued yet.
    const cookies = await page.context().cookies();
    expect(cookies.find((cookie) => cookie.name === "elaman_session")).toBeUndefined();
  });

  test("a wrong code is refused", async ({ page }) => {
    await page.goto("/de/portal");
    await field(page, "E-Mail-Adresse").fill(testEmail);
    await field(page, "Kennwort").fill(testPassword);
    await page.getByRole("button", { name: "Weiter" }).click();
    await field(page, "Sechsstelliger Code").fill("000000");
    await page.getByRole("button", { name: "Anmelden" }).click();

    await expect(page.getByText("Anmeldung nicht möglich")).toBeVisible();
    const cookies = await page.context().cookies();
    expect(cookies.find((cookie) => cookie.name === "elaman_session")).toBeUndefined();
  });

  test("password and code together sign in, and the overview names the account", async ({
    page,
  }) => {
    await page.goto("/de/portal");
    await field(page, "E-Mail-Adresse").fill(testEmail);
    await field(page, "Kennwort").fill(testPassword);
    await page.getByRole("button", { name: "Weiter" }).click();
    await field(page, "Sechsstelliger Code").fill(await freshCode(userId, totpSecret));
    await page.getByRole("button", { name: "Anmelden" }).click();

    await page.waitForURL("**/de/portal/overview");
    await expect(page.getByRole("heading", { name: "Übersicht" })).toBeVisible();
    await expect(page.getByText("Testkundin Beispiel").first()).toBeVisible();
    await expect(page.getByText(`Testfirma ${marker}`)).toBeVisible();

    const cookie = (await page.context().cookies()).find(
      (entry) => entry.name === "elaman_session",
    );
    expect(cookie).toBeDefined();
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.sameSite).toBe("Lax");

    // The session in the table stores a hash, never the value in the cookie.
    const stored = await queryOne<{ token_hash: string }>(
      "select token_hash from sessions where user_id = $1",
      [userId],
    );
    expect(stored?.token_hash).toBe(hashToken(cookie!.value));
    expect(stored?.token_hash).not.toBe(cookie!.value);

    // And with that session in hand, the sign-in form is not offered again.
    await page.goto("/de/portal");
    await page.waitForURL("**/de/portal/overview");
  });

  /**
   * The scenario this guards against: someone reads a code over a shoulder or
   * out of a log and presents it from their own machine. Two browser contexts,
   * because two cookie jars is exactly what that looks like.
   */
  test("the same code cannot be replayed from another browser", async ({ browser }) => {
    const code = await freshCode(userId, totpSecret);

    const mine = await browser.newContext();
    const theirs = await browser.newContext();

    try {
      // Earlier tests left sessions of their own behind; what matters is that
      // the replay adds none, not the absolute count.
      const before = (await query("select id from sessions where user_id = $1", [userId]))
        .length;

      const myPage = await mine.newPage();
      await myPage.goto("/de/portal");
      await field(myPage, "E-Mail-Adresse").fill(testEmail);
      await field(myPage, "Kennwort").fill(testPassword);
      await myPage.getByRole("button", { name: "Weiter" }).click();
      await field(myPage, "Sechsstelliger Code").fill(code);
      await myPage.getByRole("button", { name: "Anmelden" }).click();
      await myPage.waitForURL("**/de/portal/overview");

      // Same password, same code, different browser.
      const theirPage = await theirs.newPage();
      await theirPage.goto("/de/portal");
      await field(theirPage, "E-Mail-Adresse").fill(testEmail);
      await field(theirPage, "Kennwort").fill(testPassword);
      await theirPage.getByRole("button", { name: "Weiter" }).click();
      await field(theirPage, "Sechsstelliger Code").fill(code);
      await theirPage.getByRole("button", { name: "Anmelden" }).click();

      await expect(theirPage.getByText("bereits verwendet")).toBeVisible();
      expect(new URL(theirPage.url()).pathname).toBe("/de/portal");
      expect(
        (await theirs.cookies()).find((entry) => entry.name === "elaman_session"),
      ).toBeUndefined();

      // One new session, mine, and none from the replay.
      const after = await query("select id from sessions where user_id = $1", [userId]);
      expect(after).toHaveLength(before + 1);
    } finally {
      await mine.close();
      await theirs.close();
    }
  });

  test("signing out ends the session and the overview is closed again", async ({
    page,
  }) => {
    await page.goto("/de/portal");
    await field(page, "E-Mail-Adresse").fill(testEmail);
    await field(page, "Kennwort").fill(testPassword);
    await page.getByRole("button", { name: "Weiter" }).click();
    // A fresh step, so the previous test's code is out of the way.
    await field(page, "Sechsstelliger Code").fill(await freshCode(userId, totpSecret));
    await page.getByRole("button", { name: "Anmelden" }).click();
    await page.waitForURL("**/de/portal/overview");

    // The row that belongs to *this* browser. Signing out on one device must
    // not end a session on another, so the assertion is about this one row
    // rather than about how many the account has.
    const cookie = (await page.context().cookies()).find(
      (entry) => entry.name === "elaman_session",
    );
    expect(cookie).toBeDefined();
    const tokenHash = hashToken(cookie!.value);
    expect(
      await query("select id from sessions where token_hash = $1", [tokenHash]),
    ).toHaveLength(1);

    await page.getByRole("button", { name: "Abmelden" }).click();
    await page.waitForURL("**/de/portal");

    expect(
      await query("select id from sessions where token_hash = $1", [tokenHash]),
    ).toHaveLength(0);
    expect(
      (await page.context().cookies()).find((entry) => entry.name === "elaman_session"),
    ).toBeUndefined();

    await page.goto("/de/portal/overview");
    await page.waitForURL("**/de/portal");
    await expect(field(page, "E-Mail-Adresse")).toBeVisible();
  });

  test("the portal is not offered to search engines", async ({ page }) => {
    await page.goto("/de/portal");

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  });

  /**
   * Measured with reduced motion, which the site honours by rendering the
   * settled state outright.
   *
   * Without it the check lands mid-entrance: the opening band fades from
   * nothing, and text at 89% opacity over white computes to #778193 against
   * #667286, which is 3.9:1 instead of 4.5:1. That is the animation, not the
   * design — the entrance is deliberate and the settled page is what a
   * contrast rule is about. The public routes only avoid this by doing enough
   * other work before they call axe, which is luck rather than intent.
   *
   * The same bar the public routes are held to, applied where it matters most.
   * Three of these four screens are forms, and a form is where an accessible
   * name goes missing, an error message is never announced, or a required
   * marker is read out as an asterisk.
   *
   * Both steps of the sign-in are checked, because the second one replaces the
   * first in place and could have carried its own problems.
   */
  test("every portal screen passes the accessibility check", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();

    async function seriousViolations() {
      const result = await new AxeBuilder({ page }).analyze();

      return result.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );
    }

    for (const path of ["/de/portal", "/en/portal"]) {
      await page.goto(path);
      expect(await seriousViolations(), path).toEqual([]);
    }

    // The second step, in place.
    await page.goto("/de/portal");
    await field(page, "E-Mail-Adresse").fill(testEmail);
    await field(page, "Kennwort").fill(testPassword);
    await page.getByRole("button", { name: "Weiter" }).click();
    await expect(page.getByRole("heading", { name: "Bestätigungscode" })).toBeVisible();
    expect(await seriousViolations(), "code step").toEqual([]);

    // An error state, which is the part most likely to be unannounced.
    await field(page, "Sechsstelliger Code").fill("000000");
    await page.getByRole("button", { name: "Anmelden" }).click();
    await expect(page.getByText("Anmeldung nicht möglich")).toBeVisible();
    expect(await seriousViolations(), "code error").toEqual([]);

    // A live invitation, for the QR code and the enrolment form.
    const freshToken = generateToken();
    await query(
      `insert into invitations (user_id, token_hash, expires_at)
       values ($1, $2, now() + interval '1 day')`,
      [userId, hashToken(freshToken)],
    );
    await page.goto(`/de/portal/invitation?token=${freshToken}`);
    expect(await seriousViolations(), "invitation").toEqual([]);
    await query("delete from invitations where token_hash = $1", [hashToken(freshToken)]);

    // And the signed-in overview.
    await page.goto("/de/portal");
    await field(page, "E-Mail-Adresse").fill(testEmail);
    await field(page, "Kennwort").fill(testPassword);
    await page.getByRole("button", { name: "Weiter" }).click();
    await field(page, "Sechsstelliger Code").fill(await freshCode(userId, totpSecret));
    await page.getByRole("button", { name: "Anmelden" }).click();
    await page.waitForURL("**/de/portal/overview");
    expect(await seriousViolations(), "overview").toEqual([]);

    await context.close();
  });

  test("the header offers the portal in both languages", async ({ page }) => {
    await page.goto("/de");
    await expect(
      page.getByRole("link", { name: "Login", exact: true }).first(),
    ).toHaveAttribute("href", "/de/portal");

    await page.goto("/en");
    await expect(
      page.getByRole("link", { name: "Login", exact: true }).first(),
    ).toHaveAttribute("href", "/en/portal");
  });
});
