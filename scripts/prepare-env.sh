#!/usr/bin/env bash
set -e

echo "Preparing Repo Environment"


echo "Installing All Repo Dependencies"
yarn install
echo "Repo Dependencies Installed"

yarn run husky:install

echo "Checking Enviroment Requirements"
yarn run env-check

echo "Application is Ready to Start, type yarn run dev to start the local application :)"