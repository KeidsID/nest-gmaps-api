import { danger, fail, type GitHubPRDSL as LibraryGitHubDSL } from "danger";

import { GitlintConfig } from "./gitlint.config.js";

type PRLintConfig = {
  TITLE: { PATTERN: RegExp | null };
  BRANCH: { PATTERN: RegExp | null };
  ASSIGNEES: { IS_REQUIRED: boolean };
  LABELS: { IS_REQUIRED: boolean };
};

const config: PRLintConfig = {
  TITLE: {
    PATTERN: new RegExp(
      `^(${GitlintConfig.TYPES.join("|")})` +
        `(\\((${GitlintConfig.SCOPES.join("|")})(\\/(${GitlintConfig.SCOPES.join("|")}))*\\))?: ` +
        `(.*\\S )?(${GitlintConfig.ISSUE_PREFIXES.join("|")})-` +
        "[0-9]{1,6}((\\.[0-9]+){1,2})?$",
    ),
  },
  BRANCH: {
    PATTERN: new RegExp(
      `^[0-9]{1,6}-${GitlintConfig.TYPES.join("|")}-` +
        "[a-zA-Z\\d-]+$|" +
        `(${GitlintConfig.ENVIRONMENT})$`,
    ),
  },
  ASSIGNEES: { IS_REQUIRED: true },

  LABELS: { IS_REQUIRED: true },
};

type GitHubPRDSL = LibraryGitHubDSL & {
  labels: unknown[];
  milestone: Record<string, unknown> | null;
  project_id: null | string;
};

const pr = danger.github.pr as GitHubPRDSL;

const checkTitle = (titlePattern: RegExp): void => {
  const isTitleValid = titlePattern.test(pr.title);

  if (!isTitleValid) {
    fail(
      `The pull request title should match the following pattern: ${String(
        titlePattern,
      )}.`,
    );
  }
};

const checkBranch = (branchPattern: RegExp): void => {
  const isBranchValid = branchPattern.test(pr.head.ref);

  if (!isBranchValid) {
    fail(
      `The pull request branch should match the following pattern: ${String(
        branchPattern,
      )}.`,
    );
  }
};

const checkAssignees = (): void => {
  const hasAssignees = Boolean(pr.assignee);

  if (!hasAssignees) {
    fail("This pull request should have at least one assignee.");
  }
};

const checkLabels = (): void => {
  const hasLabels = pr.labels.length > 0;

  if (!hasLabels) {
    fail("This pull request should have at least one label.");
  }
};

const main = (): void => {
  if (config.TITLE.PATTERN) {
    checkTitle(config.TITLE.PATTERN);
  }

  if (config.BRANCH.PATTERN) {
    checkBranch(config.BRANCH.PATTERN);
  }

  if (config.ASSIGNEES.IS_REQUIRED) {
    checkAssignees();
  }

  if (config.LABELS.IS_REQUIRED) {
    checkLabels();
  }
};
void main();
