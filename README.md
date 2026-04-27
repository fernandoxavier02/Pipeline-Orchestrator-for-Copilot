<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/branding/01-horizontal-dark.png">
    <img src="assets/branding/02-horizontal-light.png" alt="FX Studio AI" width="600"/>
  </picture>
</div>

<h1 align="center">Pipeline Orchestrator for Copilot</h1>

<p align="center">
  <strong>Multi-Agent Pipeline Engine for VS Code + GitHub Copilot</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-VS%20Code%20%2B%20Copilot-007ACC?style=flat-square" alt="Platform"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/language-JavaScript-F7DF1E?style=flat-square" alt="Language"/>
</p>

## What It Does

Pipeline Orchestrator for Copilot is a port of the Pipeline Orchestrator framework to GitHub Copilot in VS Code. It delivers multi-agent pipeline execution with auto-classification, TDD integration, adversarial review, and Go/No-Go gates — all operating within the Copilot Chat environment.

Tasks are automatically classified, decomposed into subtasks, and routed through specialized agents. Built-in adversarial review challenges every proposal before execution, and quality gates ensure nothing ships without passing structured validation.

## Features

- **4-Phase Pipeline** — Triage, Proposal, Execution, Closure with binary Go/No-Go gates at each transition
- **Auto-Classification** — Tasks are categorized by type, risk level, and complexity (Simples, Media, Complexa)
- **TDD-First Execution** — Tests are written before any implementation begins
- **Adversarial Review** — 3 parallel reviewers receive zero implementation context to find real bugs
- **11 Custom Agents** — Orchestrator, information gate, design interrogator, plan architect, executor, checkpoint validator, review orchestrator, fix agent, final adversarial, finishing branch, and sentinel
- **Adaptive Batching** — Tasks are grouped and executed in complexity-calibrated batches
- **Copilot Chat Commands** — Pipeline operations accessible as native chat commands
- **Non-Invention Rule** — Agents never invent missing requirements; they ask or stop

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fernandoxavier02/Pipeline-Orchestrator-for-Copilot.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Pipeline-Orchestrator-for-Copilot
   ```

3. Run the installer:
   ```powershell
   .\install.ps1
   ```

4. Open the project in VS Code with GitHub Copilot Chat active. See [INSTALL.md](./INSTALL.md) for manual installation.

## Usage

Trigger the pipeline in Copilot Chat:

```
# Standard pipeline execution
/pipeline fix the authentication bug in UserService

# Diagnostic mode — see what the pipeline would do without executing
/pipeline diagnostic add CSV export to reports

# Hotfix mode — production emergency, reduced validation
/pipeline --hotfix payment gateway returning 500

# Review only — adversarial review on uncommitted changes
/pipeline review-only

# Resume an interrupted pipeline
/pipeline continue
```

The pipeline processes each task through four phases:

1. **Triage** — Classify type, complexity, and detect information gaps
2. **Proposal** — Present plan for user confirmation before any code is written
3. **Execution** — Adaptive batches with per-batch adversarial gates and checkpoint validation
4. **Closure** — Final sanity check, adversarial review, and Go/No-Go decision

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <strong>Built by <a href="https://github.com/fernandoxavier02">Fernando Xavier</a></strong>
  <br/>
  <a href="https://fxstudioai.com">FX Studio AI</a> — Business Automation with AI
</div>
