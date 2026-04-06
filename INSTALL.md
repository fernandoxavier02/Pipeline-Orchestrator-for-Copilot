# Installation — Pipeline Orchestrator for Copilot CLI

## Prerequisites

- GitHub Copilot CLI installed and authenticated
- Git configured with your GitHub credentials

---

## Quick Install (Windows)

```powershell
# 1. Clone this repository
git clone https://github.com/fernandoxavier02/Pipeline-Orchestrator-for-Copilot.git
cd Pipeline-Orchestrator-for-Copilot

# 2. Run the installer
.\install.ps1
```

---

## Manual Install

Copy files to your Copilot CLI user directory (`~/.copilot/`):

```powershell
$src = ".\Pipeline-Orchestrator-for-Copilot"
$dst = "$env:USERPROFILE\.copilot"

# Create directories
New-Item -ItemType Directory -Force -Path "$dst\agents"
New-Item -ItemType Directory -Force -Path "$dst\references"
New-Item -ItemType Directory -Force -Path "$dst\extensions\pipeline-hook"

# Copy agents (all 11 pipeline agents)
Copy-Item "$src\agents\pipeline-*.agent.md" "$dst\agents\"

# Copy complexity matrix (SSOT)
Copy-Item "$src\references\complexity-matrix.md" "$dst\references\"

# Copy extension hook
Copy-Item "$src\extensions\pipeline-hook\extension.mjs" "$dst\extensions\pipeline-hook\"

# Merge copilot-instructions.md
# If you already have ~/.copilot/copilot-instructions.md, append the pipeline section:
Get-Content "$src\copilot-instructions.md" | Add-Content "$dst\copilot-instructions.md"
# Otherwise, copy it directly:
# Copy-Item "$src\copilot-instructions.md" "$dst\"
```

---

## Verify Installation

After installing, confirm agents are loaded:

```
/agents
```

You should see all 11 `pipeline-*` agents listed.

---

## Usage

```
/pipeline fix the login bug that throws 500 on empty password
```

```
/pipeline --grill add real-time notifications feature
```

```
/pipeline review-only
```

---

## File Layout After Install

```
~/.copilot/
├── agents/
│   ├── pipeline-orchestrator.agent.md
│   ├── pipeline-information-gate.agent.md
│   ├── pipeline-design-interrogator.agent.md
│   ├── pipeline-plan-architect.agent.md
│   ├── pipeline-executor-controller.agent.md
│   ├── pipeline-checkpoint-validator.agent.md
│   ├── pipeline-review-orchestrator.agent.md
│   ├── pipeline-executor-fix.agent.md
│   ├── pipeline-final-adversarial.agent.md
│   ├── pipeline-finishing-branch.agent.md
│   └── pipeline-sentinel.agent.md
├── references/
│   └── complexity-matrix.md
├── extensions/
│   └── pipeline-hook/
│       └── extension.mjs
└── copilot-instructions.md
```

---

## Notes

- **Slash commands are not extensible** in Copilot CLI — `/pipeline` is triggered via NLP routing in `copilot-instructions.md` and the extension hook, not as a registered slash command.
- The extension hook (`extension.mjs`) provides lifecycle interception for `UserPromptSubmit` events.
- All agents save pipeline artifacts to `.pipeline/docs/Pre-{level}-action/{date}-{summary}/`.
