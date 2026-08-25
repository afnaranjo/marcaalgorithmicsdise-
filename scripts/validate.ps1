[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$errors = [Collections.Generic.List[string]]::new()
$warnings = [Collections.Generic.List[string]]::new()

function Add-ValidationError([string]$message) {
    $script:errors.Add($message)
}

function Add-ValidationWarning([string]$message) {
    $script:warnings.Add($message)
}

$requiredFiles = @(
    "README.md",
    "AGENTS.md",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    ".gitignore",
    ".gitattributes",
    ".env.example",
    "docs\ai\PROJECT-MEMORY.md",
    "docs\brand\BRAND-SYSTEM.md",
    "docs\brand\COLORS.md",
    "docs\brand\TYPOGRAPHY.md",
    "docs\content\VOICE-AND-TONE.md",
    "docs\content\AUDIENCES.md",
    "docs\privacy\CHILD-SAFETY.md",
    "config\brand\colors.json",
    "config\brand\typography.json",
    "config\brand\formats.json",
    "config\brand\tokens.json"
)

foreach ($relativePath in $requiredFiles) {
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $relativePath) -PathType Leaf)) {
        Add-ValidationError "Missing required file: $relativePath"
    }
}

foreach ($relativePath in @(
    "config\brand\colors.json",
    "config\brand\typography.json",
    "config\brand\formats.json",
    "config\brand\tokens.json"
)) {
    $fullPath = Join-Path $projectRoot $relativePath
    if (Test-Path -LiteralPath $fullPath) {
        try {
            Get-Content -Raw -LiteralPath $fullPath | ConvertFrom-Json | Out-Null
        } catch {
            Add-ValidationError "Invalid JSON: $relativePath — $($_.Exception.Message)"
        }
    }
}

$colorsPath = Join-Path $projectRoot "config\brand\colors.json"
if (Test-Path -LiteralPath $colorsPath) {
    $colors = Get-Content -Raw -LiteralPath $colorsPath | ConvertFrom-Json
    if ($colors.colors.primary.purple -ne "#602B7A") { Add-ValidationError "Primary purple token changed." }
    if ($colors.colors.accent.turquoise -ne "#33DFC0") { Add-ValidationError "Turquoise token changed." }
    if ($colors.colors.accent.yellow -ne "#FFD749") { Add-ValidationError "Yellow token changed." }
}

$logoRoot = Join-Path $projectRoot "assets\brand\logos"
$fontRoot = Join-Path $projectRoot "assets\brand\fonts\montserrat"
$logoCount = if (Test-Path -LiteralPath $logoRoot) { @(Get-ChildItem -LiteralPath $logoRoot -Recurse -File -Filter "*.png").Count } else { 0 }
$fontCount = if (Test-Path -LiteralPath $fontRoot) { @(Get-ChildItem -LiteralPath $fontRoot -Recurse -File -Filter "*.ttf").Count } else { 0 }
if ($logoCount -ne 5) { Add-ValidationError "Expected 5 official Algorithmics PNG logos; found $logoCount." }
if ($fontCount -ne 20) { Add-ValidationError "Expected 20 Montserrat TTF files; found $fontCount." }
if (-not (Test-Path -LiteralPath (Join-Path $fontRoot "OFL.txt"))) { Add-ValidationError "Montserrat OFL.txt is missing." }

$attributesPath = Join-Path $projectRoot ".gitattributes"
if (Test-Path -LiteralPath $attributesPath) {
    $attributes = Get-Content -Raw -LiteralPath $attributesPath
    if ($attributes -notmatch "\*\.pptx\s+filter=lfs") {
        Add-ValidationError "PPTX files are not configured for Git LFS."
    }
}
& git -C $projectRoot lfs version *> $null
if ($LASTEXITCODE -ne 0) { Add-ValidationError "Git LFS is required but unavailable." }

$expectedSkills = @(
    "algorithmics-brand-designer",
    "algorithmics-copywriter",
    "algorithmics-social-media",
    "algorithmics-campaign-designer",
    "crear-presentaciones-nid"
)
$skillsRoot = Join-Path $projectRoot ".agents\skills"
foreach ($skillName in $expectedSkills) {
    $skillRoot = Join-Path $skillsRoot $skillName
    if (-not (Test-Path -LiteralPath (Join-Path $skillRoot "SKILL.md"))) {
        Add-ValidationError "Missing SKILL.md for $skillName."
    }
    if (-not (Test-Path -LiteralPath (Join-Path $skillRoot "agents\openai.yaml"))) {
        Add-ValidationError "Missing agents/openai.yaml for $skillName."
    }
}

$allFiles = @(Get-ChildItem -LiteralPath $projectRoot -Recurse -File -Force -ErrorAction SilentlyContinue | Where-Object {
    $_.FullName -notmatch "\\.git\\|\\node_modules\\|\\.validator-deps\\|\\.skill-staging\\"
})

$forbiddenFiles = @($allFiles | Where-Object {
    $_.Name -ne ".env.example" -and (
        $_.Name -eq ".env" -or
        $_.Extension -in @(".pem", ".key", ".p12", ".pfx") -or
        $_.FullName -match "\\(secrets|credentials|private)\\"
    )
})
foreach ($file in $forbiddenFiles) {
    Add-ValidationError "Forbidden credential-like file: $($file.FullName.Substring($projectRoot.Length + 1))"
}

foreach ($file in $allFiles | Where-Object { $_.Length -gt 100MB }) {
    Add-ValidationError "File exceeds 100 MB: $($file.FullName.Substring($projectRoot.Length + 1))"
}
foreach ($file in $allFiles | Where-Object { $_.Length -gt 25MB -and $_.Length -le 100MB }) {
    $relativePath = $file.FullName.Substring($projectRoot.Length + 1).Replace("\", "/")
    $filterAttribute = & git -C $projectRoot check-attr filter -- $relativePath
    if ($filterAttribute -notmatch ": filter: lfs$") {
        Add-ValidationWarning "Large file is not tracked by Git LFS: $relativePath"
    }
}

$nidVerifier = Join-Path $skillsRoot "crear-presentaciones-nid\scripts\verify_locked_system.mjs"
if (Test-Path -LiteralPath $nidVerifier) {
    $node = $env:RUNTIME_NODE
    if (-not $node) {
        $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
        if ($nodeCommand) { $node = $nodeCommand.Source }
    }
    if ($node) {
        & $node $nidVerifier
        if ($LASTEXITCODE -ne 0) { Add-ValidationError "NID locked system verification failed." }
    } else {
        Add-ValidationWarning "Node runtime unavailable; NID locked system was not verified."
    }
}

& git -C $projectRoot diff --check
if ($LASTEXITCODE -ne 0) { Add-ValidationError "git diff --check found whitespace errors." }

foreach ($warning in $warnings) { Write-Warning $warning }
foreach ($validationError in $errors) { Write-Error $validationError -ErrorAction Continue }

if ($errors.Count -gt 0) {
    Write-Host "Validation failed: $($errors.Count) error(s), $($warnings.Count) warning(s)."
    exit 1
}

Write-Host "Validation passed: 0 errors, $($warnings.Count) warning(s)."
