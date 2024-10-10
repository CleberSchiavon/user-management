/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/configs/eslint-preset.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "no-unused-vars": "off",
  },
};
