const nextEslint = require('@repo/configs/eslint/next.js');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...nextEslint,
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
};
