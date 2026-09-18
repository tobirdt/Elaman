import { Pool, type PoolClient, type QueryResultRow } from "@neondatabase/serverless";

/**
 * Neon's driver rather than `pg`. It speaks the Postgres protocol over a
 * WebSocket on port 443 instead of a raw socket on 5432, which is what Neon
 * recommends for serverless functions and what makes the database reachable
 * from networks that only allow HTTPS. The API mirrors `pg`, so everything
 * below is the same code it was.
 *
 * Node 22 supplies the global `WebSocket` the driver needs, so nothing has to
 * be configured and no polyfill is pulled in.
 *
 * One pool per process. Next.js reloads modules in development, so the pool
 * is parked on `globalThis` to avoid opening a new one on every edit and
 * exhausting the database's connection limit.
 */
declare global {
  var __elamanPool: Pool | undefined;
}

function connectionString(): string {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. The portal needs a Postgres connection; the public site does not.",
    );
  }

  return url;
}

export function pool(): Pool {
  if (!globalThis.__elamanPool) {
    globalThis.__elamanPool = new Pool({
      connectionString: connectionString(),
      // Serverless functions are short-lived and many; a small ceiling per
      // instance keeps the total inside what a small Postgres plan allows.
      max: Number(process.env.DATABASE_POOL_MAX ?? 4),
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
    });
  }

  return globalThis.__elamanPool;
}

export async function query<T extends QueryResultRow>(
  text: string,
  params: readonly unknown[] = [],
): Promise<T[]> {
  const result = await pool().query<T>(text, params as unknown[]);

  return result.rows;
}

/** The single row a query must return, or `null` when it returned none. */
export async function queryOne<T extends QueryResultRow>(
  text: string,
  params: readonly unknown[] = [],
): Promise<T | null> {
  const rows = await query<T>(text, params);

  if (rows.length > 1) {
    throw new Error(`Expected at most one row, got ${rows.length}`);
  }

  return rows[0] ?? null;
}

/**
 * Runs the callback inside a transaction. Anything that writes more than one
 * table belongs in here: approving a request creates a user and an invitation
 * and an audit entry, and a half-done approval is worse than none.
 */
export async function transaction<T>(
  run: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool().connect();

  try {
    await client.query("begin");
    const result = await run(client);
    await client.query("commit");

    return result;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

export async function closePool(): Promise<void> {
  await globalThis.__elamanPool?.end();
  globalThis.__elamanPool = undefined;
}
