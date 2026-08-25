[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))

Write-Host "Algorithmics project setup"
Write-Host "Root: $projectRoot"

$required = @(
    "00-inicio.md",
    "AGENTS.md",
    "docs\ai\PROJECT-MEMORY.md",
    "docs\brand\BRAND-SYSTEM.md",
    "config\brand\tokens.json",
    "assets\brand\logos",
    "assets\brand\fonts\montserrat",
    "config\assets\catalog.json",
    ".obsidian\app.json",
    "vault",
    ".agents\skills"
)

foreach ($relativePath in $required) {
    $fullPath = Join-Path $projectRoot $relativePath
    if (-not (Test-Path -LiteralPath $fullPath)) {
        throw "Required project resource is missing: $relativePath"
    }
}

$remote = & git -C $projectRoot remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Git origin: $remote"
} else {
    Write-Warning "Git origin is not configured."
}

& git -C $projectRoot lfs version *> $null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Git LFS: available"
} else {
    Write-Warning "Git LFS is required for binary master files."
}

$fontCount = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot "assets\brand\fonts\montserrat") -Recurse -File -Filter "*.ttf").Count
$logoCount = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot "assets\brand\logos") -Recurse -File -Filter "*.png").Count

Write-Host "Fonts available: $fontCount"
Write-Host "Logos available: $logoCount"
Write-Host "Codex repo skills: $((Get-ChildItem -LiteralPath (Join-Path $projectRoot '.agents\skills') -Directory).Count)"
Write-Host "Obsidian vault: open this project root and start at 00-inicio.md"
Write-Host "Setup check complete. Install Montserrat in the operating system only if your design application requires it."
