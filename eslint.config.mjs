import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    // `.claude/**` holds transient agent worktrees with their own build output;
    // Prettier already skips them through .gitignore, ESLint needs it here.
    ignores: [".claude/**", ".next/**", "node_modules/**", "out/**"],
  },
];

export default eslintConfig;
