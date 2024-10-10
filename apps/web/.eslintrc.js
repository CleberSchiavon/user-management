/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/configs/eslint-preset.js", "plugin:storybook/recommended"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  rules: {
    'no-unused-vars': 'off',
  },
}
