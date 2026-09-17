import { describe, expect, it } from "vitest";

import {
  equals,
  generateToken,
  hashPassword,
  hashToken,
  needsRehash,
  verifyPassword,
} from "@/lib/auth/crypto";

// scrypt is deliberately slow, so these hash as few times as the point needs.
const PASSWORD = "ein hinreichend langes Kennwort 2026";

describe("password hashing", () => {
  it("verifies the password it hashed, and nothing else", async () => {
    const stored = await hashPassword(PASSWORD);

    await expect(verifyPassword(PASSWORD, stored)).resolves.toBe(true);
    await expect(verifyPassword(`${PASSWORD} `, stored)).resolves.toBe(false);
    await expect(verifyPassword(PASSWORD.toUpperCase(), stored)).resolves.toBe(false);
    await expect(verifyPassword("", stored)).resolves.toBe(false);
  });

  it("salts, so the same password never yields the same hash", async () => {
    const [first, second] = await Promise.all([
      hashPassword(PASSWORD),
      hashPassword(PASSWORD),
    ]);

    expect(first).not.toBe(second);
  });

  it("stores its own parameters", async () => {
    const [scheme, cost, blockSize, parallelism, salt, key] = (
      await hashPassword(PASSWORD)
    ).split("$");

    expect(scheme).toBe("scrypt");
    expect(Number(cost)).toBe(65536);
    expect(Number(blockSize)).toBe(8);
    expect(Number(parallelism)).toBe(1);
    expect(Buffer.from(salt, "base64url")).toHaveLength(16);
    expect(Buffer.from(key, "base64url")).toHaveLength(64);
  });

  // Unicode normalisation matters: the same word typed on two keyboards can
  // arrive as different byte sequences.
  it("treats canonically equivalent input as the same password", async () => {
    const composed = "Grüße";
    const decomposed = "Grüße";
    const stored = await hashPassword(composed);

    await expect(verifyPassword(decomposed, stored)).resolves.toBe(true);
  });

  it("refuses anything that is not a hash we wrote", async () => {
    for (const stored of [
      "",
      "not-a-hash",
      "bcrypt$1$2$3$4$5",
      "scrypt$x$8$1$AAAA$BBBB",
      "scrypt$65536$8$1$AAAA",
    ]) {
      await expect(verifyPassword(PASSWORD, stored)).resolves.toBe(false);
    }
  });
});

describe("needsRehash", () => {
  it("passes a current hash and flags everything else", async () => {
    expect(needsRehash(await hashPassword(PASSWORD))).toBe(false);
    expect(needsRehash("scrypt$16384$8$1$AAAA$BBBB")).toBe(true);
    expect(needsRehash("bcrypt$2b$12$whatever")).toBe(true);
    expect(needsRehash("")).toBe(true);
  });
});

describe("tokens", () => {
  it("returns 256 bits, freshly, every time", () => {
    const tokens = Array.from({ length: 200 }, () => generateToken());

    expect(new Set(tokens).size).toBe(200);
    for (const token of tokens) {
      expect(Buffer.from(token, "base64url")).toHaveLength(32);
      // base64url, so it survives a URL and a cookie without escaping.
      expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    }
  });

  it("hashes stably, and differently for different tokens", () => {
    const token = generateToken();

    expect(hashToken(token)).toBe(hashToken(token));
    expect(hashToken(token)).toHaveLength(64);
    expect(hashToken(token)).not.toBe(hashToken(generateToken()));
  });

  // The stored hash must not be presentable: it has to differ from the token.
  it("never stores the token itself", () => {
    const token = generateToken();

    expect(hashToken(token)).not.toBe(token);
  });
});

describe("equals", () => {
  it("compares content, not identity, across strings and buffers", () => {
    expect(equals("abc", "abc")).toBe(true);
    expect(equals(Buffer.from("abc"), "abc")).toBe(true);
    expect(equals("abc", "abd")).toBe(false);
  });

  // A length mismatch must be an ordinary false, not a thrown error, or the
  // caller leaks the length through the difference in behaviour.
  it("handles differing lengths without throwing", () => {
    expect(equals("abc", "abcdef")).toBe(false);
    expect(equals("", "a")).toBe(false);
    expect(equals("", "")).toBe(true);
  });
});
