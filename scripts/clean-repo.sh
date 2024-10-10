#!/usr/bin/env bash
set -e

echo "CLEANING DEPENDENCIES AND NODE_MODULES..."

rm -fr node_modules
rm -fr apps/*/node_modules
rm -fr apps/*/dist
rm -fr apps/*/.turbo
rm -fr apps/*/.next
rm -fr packages/*/node_modules
rm -fr .husky
rm -fr reports
rm -fr "*/**/package-lock.json"
rm -fr "*/**/yarn.lock"

echo "CLEAN & DEPENDENCIES COMPLETE"
echo "Please run prepare-env command again to reinstall project"