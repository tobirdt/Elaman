import { resolve } from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Mirrors the `@/*` path mapping in tsconfig.json so unit tests import
    // application modules exactly the way the application does.
    alias: {
      "@": resolve(import.meta.dirname),
    },
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
});
