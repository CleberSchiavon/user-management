#!/usr/bin/env bash
set -e

echo "INSTALLING HUSKY..."

rm -fr .husky
yarn husky install
yarn husky add .husky/pre-commit "yarn run audit:branch"
yarn husky add .husky/pre-push "yarn run lint && yarn run changelog"
yarn husky add .husky/commit-msg "npx commitlint --edit $1"

echo "HUSKY INSTALLED"