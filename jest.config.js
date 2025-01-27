import { pathsToModuleNameMapper } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  rootDir: "src",
  moduleFileExtensions: ["js", "cjs", "ts"],
  moduleNameMapper: pathsToModuleNameMapper(
    { "~/*": ["./*"] },
    { useESM: true },
  ),
  testRegex: ".*\\.test\\.ts$",
  coverageDirectory: "../coverage",
  collectCoverageFrom: ["**/*.(t|j|cj)s"],
  transform: {
    "^.+.(j|cj|t)s?$": ["ts-jest", { useESM: true }],
  },
};
