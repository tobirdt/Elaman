/**
 * The two checks every JSON endpoint on this site performs before it looks at
 * a payload: is the request from us, and is it small enough to read.
 *
 * Extracted from the contact route, which had the only copy. A second copy of
 * a cross-site check is a copy that will eventually disagree with the first,
 * and disagreement in this particular check means one endpoint quietly accepts
 * what the other refuses.
 */

/**
 * Cheap, dependency-free cross-site gate.
 *
 * A browser posting one of our own forms sends either `Sec-Fetch-Site:
 * same-origin` or an `Origin` matching the host that served the page, so a
 * form embedded on someone else's domain is refused outright. A client that
 * sends neither header is still accepted: this is a speed bump in front of
 * the real defences, not authentication.
 *
 * For the portal the substantive protection is the session cookie's
 * `SameSite=Lax`, which the browser will not attach to a cross-site POST at
 * all.
 */
export function isForbiddenOrigin(request: Request): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return true;
  }

  const origin = request.headers.get("origin");

  if (!origin) {
    return false;
  }

  const requestHost =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host")?.trim();

  if (!requestHost) {
    return false;
  }

  try {
    return new URL(origin).host !== requestHost;
  } catch {
    return true;
  }
}

/**
 * Reads the body while counting bytes, and gives up rather than buffering
 * something large.
 *
 * `content-length` is checked by the caller as a first pass, but it is a claim
 * the client makes; this counts what actually arrives. Returns null when the
 * limit is exceeded, "" when there is no body.
 */
export async function readCappedBody(
  request: Request,
  maxBytes: number,
): Promise<string | null> {
  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytesRead = 0;
  let body = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    bytesRead += value.byteLength;

    if (bytesRead > maxBytes) {
      await reader.cancel();
      return null;
    }

    body += decoder.decode(value, { stream: true });
  }

  return body + decoder.decode();
}

/** The claimed size, for the cheap check before anything is read. */
export function exceedsClaimedSize(request: Request, maxBytes: number): boolean {
  return Number(request.headers.get("content-length") ?? 0) > maxBytes;
}

/**
 * Reads a JSON object from the request, or says why it could not.
 *
 * A JSON array or a bare literal is rejected along with malformed input: every
 * endpoint here expects an object, and accepting an array would push the
 * type confusion one layer deeper.
 */
export async function readJsonObject(
  request: Request,
  maxBytes: number,
): Promise<
  | { ok: true; value: Record<string, unknown> }
  | { ok: false; reason: "too_large" | "malformed" }
> {
  if (exceedsClaimedSize(request, maxBytes)) {
    return { ok: false, reason: "too_large" };
  }

  const raw = await readCappedBody(request, maxBytes);

  if (raw === null) {
    return { ok: false, reason: "too_large" };
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false, reason: "malformed" };
    }

    return { ok: true, value: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, reason: "malformed" };
  }
}

/** A string field, trimmed. Anything that is not a string reads as empty. */
export function readStringField(payload: Record<string, unknown>, key: string): string {
  const value = payload[key];

  return typeof value === "string" ? value.trim() : "";
}

/**
 * A password or code field, deliberately **not** trimmed: leading and trailing
 * spaces are part of a passphrase someone chose, and silently removing them
 * here would mean the password that was set is not the password that verifies.
 */
export function readSecretField(payload: Record<string, unknown>, key: string): string {
  const value = payload[key];

  return typeof value === "string" ? value : "";
}
