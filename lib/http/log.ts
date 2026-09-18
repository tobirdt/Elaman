/**
 * What to say about an error that reached a route handler.
 *
 * The routes were logging only `error.name`, which for anything from the
 * database is the string "error" — enough to know something failed and not
 * enough to know what, as diagnosing one of these proved.
 *
 * So: the fields that identify the fault, and not the message. A Postgres
 * message helpfully quotes the offending value, which for this application
 * means an email address in the logs, and the SQLSTATE plus the constraint
 * name says the same thing about the *code* without saying anything about the
 * person.
 */
type PostgresLike = {
  code?: unknown;
  constraint?: unknown;
  table?: unknown;
  routine?: unknown;
};

export function describeError(error: unknown): Record<string, string> {
  if (!(error instanceof Error)) {
    return { name: "UnknownError" };
  }

  const details: Record<string, string> = { name: error.name };
  const candidate = error as Error & PostgresLike;

  // Present only on driver errors; a plain Error contributes none of them.
  for (const key of ["code", "constraint", "table", "routine"] as const) {
    const value = candidate[key];

    if (typeof value === "string" && value.length > 0) {
      details[key] = value;
    }
  }

  // A non-database error carries nothing else useful, and its message is ours
  // rather than a quoted row, so it is safe and worth having.
  if (!details.code) {
    details.message = error.message.slice(0, 300);
  }

  return details;
}
