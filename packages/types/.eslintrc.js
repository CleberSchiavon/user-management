const eslintPreset = require("@repo/configs/eslint/library");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...eslintPreset,
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "no-unused-vars": "off",
  },
};
