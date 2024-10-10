#!/usr/bin/env bash
set -e

echo "PRETTYING STAGED FILES..."

prettier --write "**/*.{ts,tsx,js,jsx,md,json,yml}"
eslint --fix --cache --quiet --ext ts,tsx,js,jsx,json,yml --format html

echo "FILES ARE NOW PRETTY AGAIN