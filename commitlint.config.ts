import { RuleConfigSeverity, UserConfig } from "@commitlint/types";

import { GitlintConfig } from "./gitlint.config.js";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      issuePrefixes: GitlintConfig.ISSUE_PREFIXES.map((prefix) => `${prefix}-`),
    },
  },
  rules: {
    "references-empty": [RuleConfigSeverity.Error, "never"],
    "scope-enum": [
      RuleConfigSeverity.Error,
      "always",
      [...GitlintConfig.SCOPES],
    ],
  },
};

export default config;
