#!/bin/bash -e

# shellcheck disable=SC1090
source "$(dirname "$0")"/../scripts/resources.sh

if find . -path ./node_modules -prune -o \( -name '*.htm' -o -name '*.html' \) -print0 | xargs -n1 -0 -I % ./node_modules/.bin/html-lint % --verbose --strict; then
    test_passed "$0"
else
    test_failed "$0"
fi
