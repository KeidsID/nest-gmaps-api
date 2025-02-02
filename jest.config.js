import { pathsToModuleNameMapper } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  rootDir: "src",
  moduleFileExtensions: ["js", "cjs", "ts"],
  moduleNameMapper: pathsToModuleNameMapper(
    { "~/*": ["<rootDir>/*"] },
    { useESM: true },
  ),
  testRegex: ".*\\.test\\.ts$",
  coverageDirectory: "../coverage",
  collectCoverageFrom: ["{domain,infrastructures,use_cases}/**/*.(t|j|cj)s"],
  coveragePathIgnorePatterns: [
    ".entity.ts",
    // ignored since interfaces layer tests are optional
    "use_cases/modules.ts",
    "libs",
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      functions: 90,
      lines: 90,
      branches: 80,
    },
  },
  transform: {
    "^.+.(j|cj|t)s?$": ["ts-jest", { useESM: true }],
  },
};
