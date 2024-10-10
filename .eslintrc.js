const rootLibraryConfig = require("@repo/configs/eslint-preset");
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...rootLibraryConfig,
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
