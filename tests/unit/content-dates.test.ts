import { execFileSync } from "node:child_process";

import { describe, expect, it } from "vitest";

import {
  contentDate,
  contentKeys,
  contentLastModified,
  contentSources,
} from "@/lib/seo/content-dates";

/**
 * `YYYY-MM-DD` of the last commit that touched any of the files, or `null`
 * when the checkout has no history to ask (a tarball, a shallow clone).
 * Strings in this format compare correctly as strings, so no parsing.
 */
function lastCommitDate(files: readonly string[]): string | null {
  try {
    const depth = execFileSync("git", ["rev-parse", "--is-shallow-repository"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (depth === "true") {
      return null;
    }

    const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    return date || null;
  } catch {
    return null;
  }
}

const today = new Date().toISOString().slice(0, 10);

/**
 * True when any of the files has uncommitted edits, staged or not. Without
 * this the check could only ever see committed dates, so it fired one step
 * too late: the copy change and its stale date went in together and CI
 * caught them afterwards. Counting a dirty file as changed today moves the
 * failure to where it belongs, before the commit.
 */
function hasUncommittedChanges(files: readonly string[]): boolean {
  try {
    return (
      execFileSync("git", ["status", "--porcelain", "--", ...files], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim().length > 0
    );
  } catch {
    return false;
  }
}

/** The last commit to the files, or today when they are still uncommitted. */
function lastChangeDate(files: readonly string[]): string | null {
  return hasUncommittedChanges(files) ? today : lastCommitDate(files);
}

describe("content dates", () => {
  it("names a date for every route", () => {
    for (const key of contentKeys) {
      expect(contentLastModified[key]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(contentLastModified[key] <= today).toBe(true);
      expect(contentDate(key).toISOString()).toBe(
        `${contentLastModified[key]}T00:00:00.000Z`,
      );
    }
  });

  // A copy change that forgets its date would tell crawlers nothing moved.
  // The check needs history, so it only runs where git has the full log.
  const history = lastCommitDate(["package.json"]);

  it.skipIf(history === null).each(contentKeys)(
    "keeps %s at least as new as the last commit to its copy",
    (key) => {
      const changed = lastChangeDate(contentSources[key]);

      expect(changed).not.toBeNull();
      expect(
        contentLastModified[key] >= changed!,
        `${key}: ${contentSources[key].join(", ")} changed on ${changed}, contentLastModified says ${contentLastModified[key]}`,
      ).toBe(true);
    },
  );
});
