import globals from "globals";
import jsPlugin from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfigLib from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";

/** @typedef {import("eslint").Linter.Config} */
let Config;

/** @type {Config["files"]} */
const files = ["**/*.{ts,js,cjs}"];

/** @type {Config["ignores"]} */
const ignores = [
  "node_modules",
  "build/**/*.{ts,js,cjs}",
  "*.config.{ts,js,cjs}",
  "dangerfile.ts",
  "test/*.config.{ts,js,cjs}",
];

/** @type {Config["languageOptions"]} */
const languageOptions = {
  globals: {
    ...globals.es2020,
    ...globals.node,
    ...globals.commonjs,
    ...globals.jest,
  },
};

/** @type {Config} */
const jsConfig = {
  files,
  ignores,
  languageOptions,
  rules: {
    ...jsPlugin.configs.recommended.rules,
    "arrow-parens": ["error", "always"],
    curly: ["error", "all"],
    "max-params": ["error", 3],
    "no-console": ["error"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-restricted-syntax": [
      "error",
      {
        message: "Import all (*) is forbidden.",
        selector: "ImportAllDeclaration",
      },
      // {
      //   message: "Exports should be at the end of the file.",
      //   selector: "ExportNamedDeclaration[declaration!=null]",
      // },
      {
        message: "TS features are forbidden.",
        selector: "TSEnumDeclaration",
      },
      {
        message:
          "Avoid import type { Type } from './module'. Prefer import { type Type } from './module'.",
        selector: "ImportDeclaration[importKind=type]",
      },
    ],
    "object-shorthand": ["error"],
    "prefer-destructuring": ["error"],
    quotes: ["error", "double"],
  },
};

/** @type {Config} */
const tsConfig = {
  files,
  ignores,
  languageOptions: {
    ...languageOptions,
    parser: tsParser,
    parserOptions: {
      project: "./tsconfig.json",
    },
  },
  plugins: { "@typescript-eslint": tsPlugin },
  rules: {
    ...tsPlugin.configs["strict-type-checked"].rules,
    "@typescript-eslint/consistent-type-exports": ["error"],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/no-magic-numbers": [
      "error",
      {
        ignoreEnums: true,
        ignoreReadonlyClassProperties: true,
      },
    ],
    "@typescript-eslint/return-await": ["error", "always"],
    "@typescript-eslint/no-extraneous-class": [
      "error",
      { allowWithDecorator: true },
    ],
    "@typescript-eslint/no-non-null-assertion": ["off"],
  },
};

/** @type {Config} */
const prettierConfig = {
  ...prettierConfigLib,
  files,
  ignores,
  languageOptions,
};

/** @type {Config} */
const perfectionistConfig = {
  files,
  ignores,
  languageOptions,
  plugins: { perfectionist },
  rules: {
    "perfectionist/sort-exports": ["error"],
    "perfectionist/sort-imports": ["error"],
    "perfectionist/sort-named-exports": ["error"],
    "perfectionist/sort-named-imports": ["error"],
  },
};

/** @type {Config} */
const unicornConfig = {
  files,
  ignores,
  languageOptions,
  plugins: { unicorn },
  rules: {
    ...unicorn.configs["recommended"].rules,
    "unicorn/filename-case": ["error", { case: "snakeCase" }],
    "unicorn/prefer-top-level-await": ["off"],
    "unicorn/prevent-abbreviations": [
      "error",
      { ignore: ["\\.e2e.(test|config)$"] },
    ],
    "unicorn/better-regex": ["error"],
  },
};

/** @type {Config[]} */
const overrideConfigs = [
  {
    files: ["{src,test}/**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-magic-numbers": ["off"],
    },
  },
];

/** @type {Config[]} */
const configs = [
  jsConfig,
  tsConfig,
  prettierConfig,
  perfectionistConfig,
  unicornConfig,
  ...overrideConfigs,
];

export default configs;
