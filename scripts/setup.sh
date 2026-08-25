#!/usr/bin/env sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

printf 'Algorithmics project setup\nRoot: %s\n' "$PROJECT_ROOT"

for path in \
  AGENTS.md \
  docs/ai/PROJECT-MEMORY.md \
  docs/brand/BRAND-SYSTEM.md \
  config/brand/tokens.json \
  assets/brand/logos \
  assets/brand/fonts/montserrat \
  .agents/skills
do
  if [ ! -e "$PROJECT_ROOT/$path" ]; then
    printf 'Missing required project resource: %s\n' "$path" >&2
    exit 1
  fi
done

if git -C "$PROJECT_ROOT" remote get-url origin >/dev/null 2>&1; then
  printf 'Git origin: %s\n' "$(git -C "$PROJECT_ROOT" remote get-url origin)"
else
  printf 'Warning: Git origin is not configured.\n' >&2
fi

if git -C "$PROJECT_ROOT" lfs version >/dev/null 2>&1; then
  printf 'Git LFS: available\n'
else
  printf 'Warning: Git LFS is required for binary master files.\n' >&2
fi

printf 'Setup check complete. Install Montserrat in the operating system only when required by the design application.\n'
