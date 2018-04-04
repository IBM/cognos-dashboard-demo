#!/bin/bash -e

# shellcheck disable=SC1090
source "$(dirname "$0")"/../scripts/resources.sh

if ./node_modules/.bin/eslint --config .tslint.json .; then
    test_passed "$0"
else
    test_failed "$0"
fi
