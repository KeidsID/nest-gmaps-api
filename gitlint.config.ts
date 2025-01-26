import conventionalCommitLint from "@commitlint/config-conventional";

export const GitlintConfig = {
  ENVIRONMENT: "main",
  TYPES: conventionalCommitLint.rules["type-enum"]["2"],
  SCOPES: [
    "root",
    "src",
    "src-domain",
    "src-infrastructures",
    "src-use_cases",
    "src-interfaces",
    "test",
    "github",
  ],
  ISSUE_PREFIXES: ["gm", "release"],
} as const;
