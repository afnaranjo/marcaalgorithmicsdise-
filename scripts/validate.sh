#!/usr/bin/env sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
ERRORS=0

require_file() {
  if [ ! -f "$PROJECT_ROOT/$1" ]; then
    printf 'ERROR: missing required file: %s\n' "$1" >&2
    ERRORS=$((ERRORS + 1))
  fi
}

for path in \
  README.md 00-inicio.md AGENTS.md CHANGELOG.md CONTRIBUTING.md .gitignore .gitattributes .env.example \
  docs/ai/PROJECT-MEMORY.md docs/brand/BRAND-SYSTEM.md docs/brand/COLORS.md \
  docs/brand/TYPOGRAPHY.md docs/content/VOICE-AND-TONE.md docs/content/AUDIENCES.md \
  docs/privacy/CHILD-SAFETY.md config/brand/colors.json config/brand/typography.json \
  config/brand/formats.json config/brand/tokens.json config/assets/catalog.json \
  .obsidian/app.json .obsidian/appearance.json .obsidian/daily-notes.json \
  .obsidian/templates.json .obsidian/snippets/algorithmics-brand.css \
  vault/02-catalogo-visual.md vault/03-memoria-operativa.md
do
  require_file "$path"
done

for skill in algorithmics-brand-designer algorithmics-copywriter algorithmics-social-media algorithmics-campaign-designer crear-presentaciones-nid
do
  require_file ".agents/skills/$skill/SKILL.md"
  require_file ".agents/skills/$skill/agents/openai.yaml"
done

if ! grep -Eq '^\*\.pptx[[:space:]]+filter=lfs' "$PROJECT_ROOT/.gitattributes"; then
  printf 'ERROR: PPTX files are not configured for Git LFS.\n' >&2
  ERRORS=$((ERRORS + 1))
fi

if ! git -C "$PROJECT_ROOT" lfs version >/dev/null 2>&1; then
  printf 'ERROR: Git LFS is required but unavailable.\n' >&2
  ERRORS=$((ERRORS + 1))
fi

for color in '#602B7A' '#FFD749' '#33DFC0' '#F44C75'
do
  if ! grep -Fq "$color" "$PROJECT_ROOT/config/brand/colors.json"; then
    printf 'ERROR: approved hard color is missing: %s\n' "$color" >&2
    ERRORS=$((ERRORS + 1))
  fi
done

if find "$PROJECT_ROOT" \
  -path "$PROJECT_ROOT/.git" -prune -o \
  -path "$PROJECT_ROOT/.validator-deps" -prune -o \
  -path "$PROJECT_ROOT/.skill-staging" -prune -o \
  -path '*/node_modules' -prune -o \
  -type f \( -name '.env' -o -name '*.pem' -o -name '*.key' -o -name '*.p12' -o -name '*.pfx' \) -print | grep -q .; then
  printf 'ERROR: credential-like files detected.\n' >&2
  ERRORS=$((ERRORS + 1))
fi

if git -C "$PROJECT_ROOT" diff --check >/dev/null; then
  :
else
  printf 'ERROR: git diff --check found whitespace errors.\n' >&2
  ERRORS=$((ERRORS + 1))
fi

if [ "$ERRORS" -ne 0 ]; then
  printf 'Validation failed: %s error(s).\n' "$ERRORS" >&2
  exit 1
fi

printf 'Validation passed.\n'
