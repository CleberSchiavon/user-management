#!/usr/bin/env bash
set -e

echo "AUDITING CURRENT BRANCH & COMMITS"

yarn validate-branch-name

echo "AUDIT COMPLETE"