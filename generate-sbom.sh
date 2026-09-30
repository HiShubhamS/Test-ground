#!/usr/bin/env bash
set -euo pipefail

OUT="${1:-sbom/sbom.cdx.json}"
mkdir -p "$(dirname "$OUT")"

if command -v syft >/dev/null 2>&1; then
  syft dir:. -o "cyclonedx-json=$OUT"
elif command -v cyclonedx-npm >/dev/null 2>&1; then
  cyclonedx-npm --output-file "$OUT"
else
  echo "No SBOM generator found. Install Syft or @cyclonedx/cyclonedx-npm." >&2
  echo "Example: syft dir:. -o cyclonedx-json=$OUT" >&2
  exit 1
fi

echo "SBOM written to $OUT"
