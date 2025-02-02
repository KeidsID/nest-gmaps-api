import { pathsToModuleNameMapper } from "ts-jest";

import baseConfig from "../jest.config.js";

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  ...baseConfig,
  rootDir: "../",
  moduleNameMapper: pathsToModuleNameMapper(
    {
      "~/*": ["<rootDir>/src/*"],
      "~test/*": ["<rootDir>/test/*"],
    },
    { useESM: true },
  ),
  testRegex: ".*\\.e2e\\.test\\.ts$",
  coverageDirectory: "test/coverage",
};
