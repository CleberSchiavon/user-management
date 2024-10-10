const nestApiEslint = require("@repo/configs/eslint/nest-api.js");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...nestApiEslint,
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', 
  },
};