#!/usr/bin/env bash
# Fails if any nav/footer logo <img> in the site's .html files is not
# wrapped in a link to index.html. Run before any commit that adds or
# modifies a session page (see CONTRIBUTING.md).
set -euo pipefail

cd "$(dirname "$0")/.."

fail=0

for f in *.html; do
  while IFS=: read -r lineno line; do
    if [[ "$line" != *'href="index.html"'* ]]; then
      echo "FAIL: $f:$lineno — logo image is not linked to index.html"
      echo "  $line"
      fail=1
    fi
  done < <(grep -n 'src="logo_\(color\|blanco\)_cropped\.png"' "$f" || true)
done

if [[ "$fail" -ne 0 ]]; then
  echo
  echo "One or more logos don't link to index.html. Fix before committing."
  exit 1
fi

echo "OK: every logo links to index.html."
