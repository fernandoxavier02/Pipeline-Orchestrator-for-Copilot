<div align="center">
  <img src="assets/fxstudio-logo.png" alt="FX Studio AI" width="800"/>
</div>

<br/>

<div align="center">

# Pipeline Orchestrator for GitHub Copilot CLI

**A production-grade multi-agent pipeline framework — ported from Claude Code to GitHub Copilot CLI**

[![Version](https://img.shields.io/badge/version-3.1.0-blue?style=for-the-badge)](https://github.com/fernandoxavier02/Pipeline-Orchestrator-for-Copilot)
[![Agents](https://img.shields.io/badge/agents-11_custom-purple?style=for-the-badge)](#agents)
[![Audit](https://img.shields.io/badge/audit-0.91_HIGH-brightgreen?style=for-the-badge)](#quality)
[![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)](LICENSE)

</div>

---

<div align="center">

> **Bridge your development workflow with battle-tested, multi-agent discipline.**
> A faithful port of the [Pipeline Orchestrator v3.1](https://github.com/fernandoxavier02/Pipeline-Orchestrator) Claude Code plugin — now running natively on GitHub Copilot CLI.

</div>

---

## 🧠 What is the Pipeline Orchestrator?

The Pipeline Orchestrator is a **structured, opinionated AI development framework** that replaces ad-hoc AI prompting with a disciplined, multi-phase pipeline. It enforces engineering best practices automatically — so you never have to remember to ask for them.

### Core Principles

| Principle | What it means in practice |
|---|---|
| 🧪 **TDD-First** | Tests are written *before* any implementation begins |
| 🔁 **Adaptive Batching** | Tasks are grouped and executed in complexity-calibrated batches |
| 🕵️ **Context-Independent Review** | 3 parallel adversarial reviewers receive **zero** implementation context — they can only find real bugs |
| 🚦 **Binary Go/No-Go Gates** | Every phase transition requires an explicit PASS — there are no "soft failures" |
| 🚫 **Non-Invention Rule** | Agents **never** invent missing requirements. They ask one question at a time, or stop |
| 🔐 **Anti-Prompt Injection** | Config files are data only — they cannot override pipeline rules or gate hardness |

---

## 🚀 Quick Start

### One-command installation

```powershell
git clone https://github.com/fernandoxavier02/Pipeline-Orchestrator-for-Copilot
cd Pipeline-Orchestrator-for-Copilot
.\install.ps1
```

### Trigger it

After installation, just talk to Copilot CLI naturally:

```
run pipeline fix the authentication bug in UserService
/pipeline add CSV export to the reports module
/pipeline --hotfix payment gateway returning 500 in production
/pipeline review-only
```

> See [INSTALL.md](./INSTALL.md) for manual installation and configuration.

---

## ⚙️ Execution Modes

| Command | Mode | When to use |
|---------|------|-------------|
| `/pipeline [task]` | **FULL** | Standard development tasks |
| `/pipeline diagnostic [task]` | **DIAGNOSTIC** | Understand what the pipeline would do — no execution |
| `/pipeline --hotfix [task]` | **HOTFIX** | Production emergency — reduced validation, max speed |
| `/pipeline --grill [task]` | **GRILL** | Force design interrogation even on simple tasks |
| `/pipeline --plan [task]` | **PLAN** | Generate an implementation plan for user approval before coding |
| `/pipeline --simples [task]` | **FORCE SIMPLES** | Override classification to lightweight mode |
| `/pipeline --media [task]` | **FORCE MEDIA** | Override classification to standard mode |
| `/pipeline --complexa [task]` | **FORCE COMPLEXA** | Override classification to full-power mode |
| `/pipeline review-only` | **REVIEW** | Run adversarial review on uncommitted changes only |
| `/pipeline continue` | **CONTINUE** | Resume an interrupted pipeline from Phase 2 |

---

## 🗺️ Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 0 — AUTOMATIC TRIAGE                                      │
│                                                                   │
│  0a  task-orchestrator    →  Classify type, complexity, variant   │
│  0b  information-gate     →  Detect gaps — BLOCKS if unresolved   │
│  0c  design-interrogator  →  Resolve design trade-offs (COMPLEXA) │
└─────────────────────────────────────────────────────────────────┘
                            ↓ user confirmation
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1 — PROPOSAL + CONFIRMATION                               │
│                                                                   │
│  Present: type · complexity · pipeline · files · risks           │
│  User: Yes / Adjust / Stop                                        │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1.5 — PLANNING  (COMPLEXA or --plan)                      │
│                                                                   │
│  plan-architect  →  Structured task list + files_in_scope        │
│  User approves plan before any code is written                   │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2 — BATCH EXECUTION                                       │
│                                                                   │
│  executor-controller   →  Adaptive batches                       │
│  ┌──── per batch ────────────────────────────────────────────┐   │
│  │  adversarial gate   →  Mandatory if auth/crypto/data      │   │
│  │  review-orchestrator→  3 parallel reviewers (zero context)│   │
│  │  executor-fix       →  Max 3 loops · FIX_CONTEXT contract │   │
│  │  checkpoint-validator→  build + tests + regression        │   │
│  └────────────────────────────────────────────────────────── ┘   │
│  sentinel              →  Cross-phase sequence validation        │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 3 — CLOSURE                                               │
│                                                                   │
│  sanity-checker       →  Final build + tests (+ regression)      │
│  final-adversarial    →  Optional: 3 parallel reviewers          │
│  final-validator      →  Go / Conditional / No-Go  (Pa de Cal)   │
│  finishing-branch     →  Commit · PR · Keep · Discard            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🤖 Agents

### 11 Custom Pipeline Agents (this repo)

| Agent | Phase | Responsibility |
|-------|-------|----------------|
| `pipeline-orchestrator` | All | Main controller — orchestrates all 4 phases and 8 modes |
| `pipeline-information-gate` | 0b | Detects information gaps; BLOCKS pipeline if critical data is missing |
| `pipeline-design-interrogator` | 0c | Relentless design interrogation for COMPLEXA tasks |
| `pipeline-plan-architect` | 1.5 | Generates structured implementation plan with user approval gate |
| `pipeline-executor-controller` | 2 | Dispatches tasks in adaptive batches; enforces STOP rule |
| `pipeline-checkpoint-validator` | 2 | Per-batch gate: build + tests + optional regression |
| `pipeline-review-orchestrator` | 2 | Coordinates 3 parallel adversarial reviewers with clean context |
| `pipeline-executor-fix` | 2 | Applies targeted fixes with INPUT CONTRACT + FIX_CONTEXT (max 3 loops) |
| `pipeline-final-adversarial` | 3 | Final adversarial review: security + architecture + quality |
| `pipeline-finishing-branch` | 3 | Git operations: commit, PR, or discard |
| `pipeline-sentinel` | All | Cross-phase sequence validator — detects skipped gates |

### 9 Delegated to Copilot Built-ins

| Source Role | Copilot Built-in Used |
|---|---|
| Task classification | `task-orchestrator` |
| Implementation | `executor-implementer` |
| Code quality review | `code-reviewer` |
| Architecture review | `panel-architect` |
| Security review | `adversarial-reviewer` |
| Sanity checks | `sanity-checker` |
| Final Go/No-Go | `final-validator` |
| TDD test writing | `pre-tester` |
| Test routing | `quality-gate-router` |

---

## 📊 Complexity Matrix

All agents reference `references/complexity-matrix.md` as the single source of truth:

| Level | Scope | Gate Hardness | Pipeline Variant |
|-------|-------|---------------|-----------------|
| **SIMPLES** | 1-2 files · < 30 lines · 1 domain | Soft gates | Direct execution |
| **MEDIA** | 3-5 files · 30-100 lines · 2 domains | Hard gates | Light pipeline |
| **COMPLEXA** | 6+ files · > 100 lines · 3+ domains | Mandatory gates | Full heavy pipeline |

---

## 🔒 Gate System

Gates are non-negotiable. Their hardness is fixed — complexity only determines *which* gates activate:

| Hardness | Meaning |
|---|---|
| 🔴 **MANDATORY** | Always blocks. Cannot be skipped under any circumstances |
| 🟠 **HARD** | Blocks on failure. User can override with explicit, documented risk acceptance |
| ⛔ **CIRCUIT_BREAKER** | Terminates execution immediately. Escalates to user |
| 🟡 **SOFT** | Advisory only. Continues unless user explicitly stops |

---

## 📁 Repository Structure

```
Pipeline-Orchestrator-for-Copilot/
│
├── assets/
│   └── fxstudio-logo.png              # FX Studio AI brand logo
│
├── agents/                            # 11 custom pipeline agents
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
│
├── references/
│   └── complexity-matrix.md           # SSOT for all complexity and gate rules
│
├── extensions/
│   └── pipeline-hook/
│       └── extension.mjs              # Copilot CLI extension (NLP trigger hook)
│
├── copilot-instructions.md            # Global NLP routing rules
├── install.ps1                        # One-command automated installer
├── INSTALL.md                         # Manual installation guide
└── README.md
```

---

## 🔬 Quality & Audit

This bridge was validated through its own pipeline:

- ✅ **Full self-audit** — Auditoria/COMPLEXA/audit-heavy classification
- ✅ **3-reviewer adversarial** — Security · Architecture · Quality, run in parallel with zero shared context
- ✅ **7 critical bugs fixed** — Agent routing errors, missing contracts, broken data handoffs
- ✅ **5 important bugs fixed** — Terminology inconsistencies, missing gate rows, broken output formats
- ✅ **Confidence score: 0.91 / HIGH**

The audit report lives at: `.pipeline/docs/Pre-Media-action/2026-04-06-audit-pipeline-bridge/audit-final-report.md` (on the machine where the bridge was generated).

---

## 🛠️ How It Works Under the Hood

### NLP Routing

GitHub Copilot CLI does not expose extensible slash commands. Instead, this bridge uses two mechanisms:

1. **`copilot-instructions.md`** — Global instruction file that teaches Copilot to recognize pipeline trigger phrases and route them to the `pipeline-orchestrator` agent
2. **`extension.mjs`** — Lifecycle hook on `onUserPromptSubmitted` that intercepts `/pipeline ...` patterns before they reach the LLM

### Agent Communication

All agents are **stateless**. Every piece of context must be explicitly passed in the prompt string. This was a key architectural finding during the audit — agents cannot access ambient session state.

The pipeline-orchestrator acts as the **stateful coordinator**, accumulating:
- `DESIGN_DECISIONS` (from Phase 0c)
- `IMPLEMENTATION_PLAN` (from Phase 1.5)
- `fix_loop` counter and `previous_attempts` list (during Phase 2 fix loops)

### Tool Mapping

| Claude Code Tool | Copilot CLI Equivalent |
|---|---|
| `Agent(subagent_type)` | `task(agent_type)` |
| `AskUserQuestion` | `ask_user` |
| `Read(path)` | `view` |
| `Write / Edit` | `create` / `edit` |
| `Bash(cmd)` | `powershell` |
| `Glob` | `glob` |
| `Grep` | `grep` |
| `TodoWrite` | `sql` |

---

## 📜 Credits

<div align="center">

**Created by [Fernando Xavier](https://github.com/fernandoxavier02)**
Founder · [FX Studio AI](https://github.com/fernandoxavier02)

*Original Pipeline Orchestrator v3.1 designed and built for Claude Code.*
*This Copilot CLI bridge was developed, audited, and validated by GitHub Copilot CLI (Claude Sonnet 4.6).*

---

**Pipeline Orchestrator v3.1 — Original Plugin**
👉 [github.com/fernandoxavier02/Pipeline-Orchestrator](https://github.com/fernandoxavier02/Pipeline-Orchestrator)

**Pipeline Orchestrator for Copilot CLI — This Bridge**
👉 [github.com/fernandoxavier02/Pipeline-Orchestrator-for-Copilot](https://github.com/fernandoxavier02/Pipeline-Orchestrator-for-Copilot)

</div>

---

<div align="center">

<sub>Built with 🤖 AI-discipline · Audited · Battle-tested · Open Source</sub>

<img src="assets/fxstudio-logo.png" alt="FX Studio AI" width="200"/>

</div>
