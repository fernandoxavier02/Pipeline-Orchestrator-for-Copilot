# Pipeline Orchestrator for Copilot CLI — Installer
# Usage: .\install.ps1

$src = $PSScriptRoot
$dst = "$env:USERPROFILE\.copilot"

Write-Host ""
Write-Host "+================================================================+" -ForegroundColor Cyan
Write-Host "|  Pipeline Orchestrator for Copilot CLI — Installer            |" -ForegroundColor Cyan
Write-Host "+================================================================+" -ForegroundColor Cyan
Write-Host ""

# Create directories
Write-Host "Creating directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "$dst\agents" | Out-Null
New-Item -ItemType Directory -Force -Path "$dst\references" | Out-Null
New-Item -ItemType Directory -Force -Path "$dst\extensions\pipeline-hook" | Out-Null

# Copy agents
Write-Host "Installing pipeline agents..." -ForegroundColor Yellow
$agents = Get-ChildItem "$src\agents" -Filter "pipeline-*.agent.md"
foreach ($agent in $agents) {
    Copy-Item $agent.FullName "$dst\agents\" -Force
    Write-Host "  ✅ $($agent.Name)" -ForegroundColor Green
}

# Copy complexity matrix
Write-Host "Installing references..." -ForegroundColor Yellow
Copy-Item "$src\references\complexity-matrix.md" "$dst\references\" -Force
Write-Host "  ✅ complexity-matrix.md" -ForegroundColor Green

# Copy extension hook
Write-Host "Installing extension hook..." -ForegroundColor Yellow
Copy-Item "$src\extensions\pipeline-hook\extension.mjs" "$dst\extensions\pipeline-hook\" -Force
Write-Host "  ✅ extension.mjs" -ForegroundColor Green

# Merge or copy copilot-instructions.md
Write-Host "Installing copilot instructions..." -ForegroundColor Yellow
$instructionsPath = "$dst\copilot-instructions.md"
if (Test-Path $instructionsPath) {
    $existing = Get-Content $instructionsPath -Raw
    $new = Get-Content "$src\copilot-instructions.md" -Raw
    if ($existing -notmatch "pipeline-orchestrator") {
        Add-Content $instructionsPath "`n`n$new"
        Write-Host "  ✅ copilot-instructions.md (appended)" -ForegroundColor Green
    } else {
        Write-Host "  ⏭️  copilot-instructions.md (already contains pipeline rules — skipped)" -ForegroundColor Yellow
    }
} else {
    Copy-Item "$src\copilot-instructions.md" $instructionsPath -Force
    Write-Host "  ✅ copilot-instructions.md (created)" -ForegroundColor Green
}

Write-Host ""
Write-Host "+================================================================+" -ForegroundColor Cyan
Write-Host "|  Installation complete!                                        |" -ForegroundColor Cyan
Write-Host "|  11 agents + complexity matrix + extension hook installed.     |" -ForegroundColor Cyan
Write-Host "|                                                                |" -ForegroundColor Cyan
Write-Host "|  Usage: 'run pipeline [your task]'                             |" -ForegroundColor Cyan
Write-Host "+================================================================+" -ForegroundColor Cyan
Write-Host ""
