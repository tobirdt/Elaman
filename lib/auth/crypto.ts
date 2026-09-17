import {
  createHash,
  randomBytes,
  scrypt as scryptCallback,
  type ScryptOptions,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

/**
 * `promisify` resolves to scrypt's three-argument overload and drops the one
 * that takes options, which is where the cost parameters live. The signature
 * is restated here rather than casting at each call site.
 */
const scrypt = promisify(scryptCallback) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
  options: ScryptOptions,
) => Promise<Buffer>;

/**
 * scrypt from `node:crypto` rather than argon2id, which would mean a native
 * dependency. Everything here is in the standard library, so the portal's
 * password handling carries no supply-chain surface of its own.
 *
 * N = 2^16 with r = 8 costs 64 MB and roughly half a second per hash. That is
 * deliberately slow for an attacker with the table in hand and unnoticeable
 * for someone signing in, and it fits inside a serverless function's memory
 * alongside concurrent requests. `maxmem` has to be raised explicitly because
 * Node caps scrypt at 32 MB by default. Raising N later is a one-line change:
 * the cost is stored per hash, so old hashes keep verifying and are upgraded
 * on the next successful sign-in.
 */
const SCRYPT_COST = 2 ** 16;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELISM = 1;
const SCRYPT_KEY_LENGTH = 64;
const SCRYPT_SALT_LENGTH = 16;

function scryptMaxmem(cost: number, blockSize: number): number {
  // Node's own formula for the working set, doubled so it never sits exactly
  // at the ceiling.
  return 128 * cost * blockSize * 2;
}

/**
 * `scrypt$N$r$p$salt$key`, both parts base64url. Self-describing, so a hash
 * made under different parameters still verifies after they change.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SCRYPT_SALT_LENGTH);
  const key = await scrypt(password.normalize("NFKC"), salt, SCRYPT_KEY_LENGTH, {
    N: SCRYPT_COST,
    r: SCRYPT_BLOCK_SIZE,
    p: SCRYPT_PARALLELISM,
    maxmem: scryptMaxmem(SCRYPT_COST, SCRYPT_BLOCK_SIZE),
  });

  return [
    "scrypt",
    SCRYPT_COST,
    SCRYPT_BLOCK_SIZE,
    SCRYPT_PARALLELISM,
    salt.toString("base64url"),
    key.toString("base64url"),
  ].join("$");
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");

  if (parts.length !== 6 || parts[0] !== "scrypt") {
    return false;
  }

  const [, costText, blockSizeText, parallelismText, saltText, keyText] = parts;
  const cost = Number(costText);
  const blockSize = Number(blockSizeText);
  const parallelism = Number(parallelismText);

  if (
    !Number.isInteger(cost) ||
    !Number.isInteger(blockSize) ||
    !Number.isInteger(parallelism)
  ) {
    return false;
  }

  const expected = Buffer.from(keyText, "base64url");

  let actual: Buffer;
  try {
    actual = await scrypt(
      password.normalize("NFKC"),
      Buffer.from(saltText, "base64url"),
      expected.length,
      {
        N: cost,
        r: blockSize,
        p: parallelism,
        maxmem: scryptMaxmem(cost, blockSize),
      },
    );
  } catch {
    // Absurd stored parameters would throw rather than mismatch; treat that
    // as a failed verification instead of a server error.
    return false;
  }

  return equals(actual, expected);
}

/** True when the hash was made under parameters we no longer use. */
export function needsRehash(stored: string): boolean {
  const parts = stored.split("$");

  if (parts.length !== 6 || parts[0] !== "scrypt") {
    return true;
  }

  return (
    Number(parts[1]) !== SCRYPT_COST ||
    Number(parts[2]) !== SCRYPT_BLOCK_SIZE ||
    Number(parts[3]) !== SCRYPT_PARALLELISM
  );
}

/**
 * A session or invitation token: 32 random bytes, handed out once and never
 * stored. What goes in the database is `hashToken` of it, so a copy of the
 * table contains nothing anyone could present.
 */
export function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

/**
 * SHA-256, deliberately not scrypt. These tokens are 256 bits of entropy from
 * a CSPRNG, so there is nothing to guess and no reason to make the lookup on
 * every request expensive.
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Constant-time comparison that tolerates differing lengths. */
export function equals(a: Buffer | string, b: Buffer | string): boolean {
  const left = Buffer.isBuffer(a) ? a : Buffer.from(a, "utf8");
  const right = Buffer.isBuffer(b) ? b : Buffer.from(b, "utf8");

  // timingSafeEqual throws on a length mismatch, which would itself leak the
  // length. Comparing digests of equal size keeps the work constant, and
  // equal digests imply equal input for any hash worth using.
  const leftDigest = createHash("sha256").update(left).digest();
  const rightDigest = createHash("sha256").update(right).digest();

  return timingSafeEqual(leftDigest, rightDigest);
}
