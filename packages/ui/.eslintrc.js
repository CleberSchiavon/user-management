/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/configs/eslint-preset'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
}
