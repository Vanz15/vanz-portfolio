import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Agent tooling and agent instruction files. Not app source, and some of
    // it is generated, so linting it only produces noise.
    ".claude/**",
    ".codex/**",
    ".cursor/**",
    ".roo/**",
    ".opencode/**",
    ".kiro/**",
    ".windsurf/**",
    "**/*.md",
  ]),
]);

export default eslintConfig;
