import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * HOTP (RFC 4226) and TOTP (RFC 6238), implemented against the standard
 * library. Both RFCs publish test vectors, so this is one of the rare places
 * where a hand-written implementation can be proven correct rather than
 * merely reviewed: `tests/unit/totp.test.ts` runs every published vector.
 *
 * Authenticator apps expect SHA-1, six digits and a thirty-second step. Those
 * are the RFC defaults and not a weakness here: the secret is 160 bits from a
 * CSPRNG, and HMAC-SHA1 has no practical attack in this construction.
 */
const DIGITS = 6;
const STEP_SECONDS = 30;

/** RFC 4648 base32, the alphabet authenticator apps read. */
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Encode(bytes: Buffer): string {
  let bits = 0;
  let value = 0;
  let output = "";

  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

export function base32Decode(text: string): Buffer {
  const clean = text.replace(/=+$/, "").replace(/\s+/g, "").toUpperCase();
  let bits = 0;
  let value = 0;
  const output: number[] = [];

  for (const character of clean) {
    const index = BASE32_ALPHABET.indexOf(character);

    if (index === -1) {
      throw new Error(`Not base32: ${character}`);
    }

    value = (value << 5) | index;
    bits += 5;

    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(output);
}

/** 160 bits, the size RFC 4226 recommends and every authenticator accepts. */
export function generateTotpSecret(): string {
  return base32Encode(randomBytes(20));
}

/** RFC 4226 section 5.3: HMAC, dynamic truncation, modulo. */
export function hotp(secret: Buffer, counter: bigint, digits = DIGITS): string {
  const message = Buffer.alloc(8);
  message.writeBigUInt64BE(counter);

  const digest = createHmac("sha1", secret).update(message).digest();
  const offset = digest[digest.length - 1] & 0x0f;
  const binary =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  return String(binary % 10 ** digits).padStart(digits, "0");
}

export function counterFor(atSeconds: number, step = STEP_SECONDS): bigint {
  return BigInt(Math.floor(atSeconds / step));
}

export function totp(
  secretBase32: string,
  atSeconds: number = Date.now() / 1000,
  digits = DIGITS,
): string {
  return hotp(base32Decode(secretBase32), counterFor(atSeconds), digits);
}

export type TotpVerification =
  | { valid: false }
  /** The step that matched, so the caller can refuse to accept it twice. */
  | { valid: true; step: bigint };

/**
 * Accepts the current step and one on either side, which covers the usual
 * clock drift between a phone and a server without widening the window
 * enough to matter.
 *
 * `lastUsedStep` closes the replay hole a time window opens: a code stays
 * valid for up to ninety seconds, so anyone who reads it over a shoulder or
 * out of a log could present it again. Callers store the returned step and
 * pass it back on the next attempt.
 */
export function verifyTotp(
  secretBase32: string,
  code: string,
  options: {
    atSeconds?: number;
    window?: number;
    lastUsedStep?: bigint | null;
  } = {},
): TotpVerification {
  const { atSeconds = Date.now() / 1000, window = 1, lastUsedStep = null } = options;
  const candidate = code.replace(/\s+/g, "");

  if (!/^\d+$/.test(candidate)) {
    return { valid: false };
  }

  const secret = base32Decode(secretBase32);
  const current = counterFor(atSeconds);

  for (let offset = -window; offset <= window; offset += 1) {
    const step = current + BigInt(offset);

    if (step < 0n || (lastUsedStep !== null && step <= lastUsedStep)) {
      continue;
    }

    const expected = Buffer.from(hotp(secret, step, candidate.length), "utf8");
    const actual = Buffer.from(candidate, "utf8");

    if (expected.length === actual.length && timingSafeEqual(expected, actual)) {
      return { valid: true, step };
    }
  }

  return { valid: false };
}

/**
 * The `otpauth://` URI an authenticator reads from a QR code. The issuer is
 * repeated as a parameter because some apps only read it there.
 */
export function totpUri(
  secretBase32: string,
  account: string,
  issuer = "Elaman",
): string {
  const label = `${encodeURIComponent(issuer)}:${encodeURIComponent(account)}`;
  const parameters = new URLSearchParams({
    secret: secretBase32,
    issuer,
    algorithm: "SHA1",
    digits: String(DIGITS),
    period: String(STEP_SECONDS),
  });

  return `otpauth://totp/${label}?${parameters.toString()}`;
}
