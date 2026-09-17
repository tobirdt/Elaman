#!/usr/bin/env node
/**
 * Applies the numbered SQL files in lib/db/migrations in order, once each,
 * inside a transaction per file. A tiny runner rather than a migration
 * framework: the portal has one schema and one deployment target, and a
 * dependency that rewrites the database deserves more scrutiny than forty
 * lines we can read in full.
 *
 *   DATABASE_URL=postgres://… node scripts/migrate.mjs          apply
 *   DATABASE_URL=postgres://… node scripts/migrate.mjs --status  list only
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import pg from "pg";

const directory = "lib/db/migrations";
const statusOnly = process.argv.includes("--status");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

try {
  await client.query(`
    create table if not exists schema_migrations (
      name text primary key,
      applied_at timestamptz not null default now()
    )
  `);

  const applied = new Set(
    (await client.query("select name from schema_migrations")).rows.map(
      (row) => row.name,
    ),
  );

  const files = (await readdir(directory)).filter((name) => name.endsWith(".sql")).sort();

  if (files.length === 0) {
    console.error(`No .sql files in ${directory}`);
    process.exit(1);
  }

  let pending = 0;

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`  applied   ${file}`);
      continue;
    }

    pending += 1;

    if (statusOnly) {
      console.log(`  PENDING   ${file}`);
      continue;
    }

    const sql = await readFile(join(directory, file), "utf8");

    await client.query("begin");
    try {
      await client.query(sql);
      await client.query("insert into schema_migrations (name) values ($1)", [file]);
      await client.query("commit");
      console.log(`  applied   ${file}`);
    } catch (error) {
      await client.query("rollback");
      console.error(`  FAILED    ${file}`);
      throw error;
    }
  }

  if (statusOnly) {
    console.log(
      pending === 0 ? "Schema is up to date." : `${pending} migration(s) pending.`,
    );
  }
} finally {
  await client.end();
}
