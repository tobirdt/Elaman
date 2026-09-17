import { describe, expect, it } from "vitest";

import {
  base32Decode,
  base32Encode,
  counterFor,
  generateTotpSecret,
  hotp,
  totp,
  totpUri,
  verifyTotp,
} from "@/lib/auth/totp";

/** The shared secret both RFCs use for their published vectors. */
const RFC_SECRET = Buffer.from("12345678901234567890", "utf8");
const RFC_SECRET_BASE32 = base32Encode(RFC_SECRET);

describe("base32", () => {
  // RFC 4648 section 10, without the padding this encoder omits.
  it.each([
    ["", ""],
    ["f", "MY"],
    ["fo", "MZXQ"],
    ["foo", "MZXW6"],
    ["foob", "MZXW6YQ"],
    ["fooba", "MZXW6YTB"],
    ["foobar", "MZXW6YTBOI"],
  ])("encodes %o as %o", (input, expected) => {
    expect(base32Encode(Buffer.from(input, "utf8"))).toBe(expected);
  });

  it("round-trips arbitrary bytes", () => {
    for (let length = 0; length < 40; length += 1) {
      const bytes = Buffer.from(Array.from({ length }, (_, index) => (index * 37) % 256));
      expect(base32Decode(base32Encode(bytes))).toEqual(bytes);
    }
  });

  it("accepts padding and whitespace, rejects other characters", () => {
    expect(base32Decode("MZXW 6YTB OI======")).toEqual(Buffer.from("foobar", "utf8"));
    expect(() => base32Decode("MZXW1")).toThrow();
  });
});

describe("hotp", () => {
  // RFC 4226 appendix D.
  it.each([
    [0n, "755224"],
    [1n, "287082"],
    [2n, "359152"],
    [3n, "969429"],
    [4n, "338314"],
    [5n, "254676"],
    [6n, "287922"],
    [7n, "162583"],
    [8n, "399871"],
    [9n, "520489"],
  ])("matches the published value for counter %s", (counter, expected) => {
    expect(hotp(RFC_SECRET, counter)).toBe(expected);
  });
});

describe("totp", () => {
  // RFC 6238 appendix B, the SHA-1 rows, which are eight digits wide.
  it.each([
    [59, "94287082"],
    [1_111_111_109, "07081804"],
    [1_111_111_111, "14050471"],
    [1_234_567_890, "89005924"],
    [2_000_000_000, "69279037"],
    [20_000_000_000, "65353130"],
  ])("matches the published value at T=%s", (atSeconds, expected) => {
    expect(totp(RFC_SECRET_BASE32, atSeconds, 8)).toBe(expected);
  });

  it("steps every thirty seconds", () => {
    expect(counterFor(0)).toBe(0n);
    expect(counterFor(29)).toBe(0n);
    expect(counterFor(30)).toBe(1n);
    expect(counterFor(59)).toBe(1n);
  });
});

describe("verifyTotp", () => {
  const now = 1_700_000_000;

  it("accepts the current code", () => {
    const code = totp(RFC_SECRET_BASE32, now);
    expect(verifyTotp(RFC_SECRET_BASE32, code, { atSeconds: now })).toEqual({
      valid: true,
      step: counterFor(now),
    });
  });

  it("tolerates one step of clock drift in either direction", () => {
    for (const drift of [-30, 30]) {
      const code = totp(RFC_SECRET_BASE32, now + drift);
      expect(verifyTotp(RFC_SECRET_BASE32, code, { atSeconds: now }).valid).toBe(true);
    }
  });

  it("refuses a code two steps away", () => {
    for (const drift of [-60, 60]) {
      const code = totp(RFC_SECRET_BASE32, now + drift);
      expect(verifyTotp(RFC_SECRET_BASE32, code, { atSeconds: now }).valid).toBe(false);
    }
  });

  // A code stays valid for up to ninety seconds, so without this a shoulder
  // surfer or a log reader could present the same one again.
  it("refuses a code that was already used", () => {
    const code = totp(RFC_SECRET_BASE32, now);
    const first = verifyTotp(RFC_SECRET_BASE32, code, { atSeconds: now });

    expect(first.valid).toBe(true);
    expect(
      verifyTotp(RFC_SECRET_BASE32, code, {
        atSeconds: now,
        lastUsedStep: first.valid ? first.step : null,
      }).valid,
    ).toBe(false);
  });

  it("refuses anything that is not digits", () => {
    for (const code of ["", "abcdef", "12345", "1234567", "12 34 56", "-12345"]) {
      expect(verifyTotp(RFC_SECRET_BASE32, code, { atSeconds: now }).valid).toBe(false);
    }
  });

  it("refuses a code from a different secret", () => {
    const other = generateTotpSecret();
    const code = totp(other, now);

    expect(verifyTotp(RFC_SECRET_BASE32, code, { atSeconds: now }).valid).toBe(false);
  });
});

describe("generateTotpSecret", () => {
  it("returns 160 bits, freshly, every time", () => {
    const secrets = new Set(Array.from({ length: 50 }, () => generateTotpSecret()));

    expect(secrets.size).toBe(50);
    for (const secret of secrets) {
      expect(base32Decode(secret)).toHaveLength(20);
    }
  });
});

describe("totpUri", () => {
  it("carries what an authenticator needs", () => {
    const uri = new URL(totpUri("ABCDEF", "a.person@elaman.de"));

    expect(uri.protocol).toBe("otpauth:");
    expect(decodeURIComponent(uri.pathname)).toContain("Elaman:a.person@elaman.de");
    expect(uri.searchParams.get("secret")).toBe("ABCDEF");
    expect(uri.searchParams.get("issuer")).toBe("Elaman");
    expect(uri.searchParams.get("digits")).toBe("6");
    expect(uri.searchParams.get("period")).toBe("30");
  });
});
