# Pipeline Orchestrator for GitHub Copilot CLI

> A faithful Copilot CLI bridge of the [Pipeline Orchestrator v3.1](https://github.com/fernandoxavier02/Pipeline-Orchestrator) Claude Code plugin — bringing disciplined multi-agent AI-assisted development to GitHub Copilot CLI.

---

## What is this?

The Pipeline Orchestrator is a structured development framework that enforces:

- **TDD-first** — tests written before implementation
- **Adaptive batch execution** — tasks run in complexity-calibrated batches
- **Context-independent adversarial review** — 3 parallel reviewers with zero implementation context
- **Go/No-Go validation** — binary PASS/FAIL gates at every phase
- **Non-invention rule** — agents never invent missing requirements; they ask or stop

This repo ports all of that to GitHub Copilot CLI's agent system.

---

## Structure

```
├── agents/                          # 11 custom pipeline agents
│   ├── pipeline-orchestrator.agent.md          # Main entry point — all 4 phases
│   ├── pipeline-information-gate.agent.md      # Phase 0b: gap detection
│   ├── pipeline-design-interrogator.agent.md   # Phase 0c: design decisions (COMPLEXA)
│   ├── pipeline-plan-architect.agent.md        # Phase 1.5: implementation plan
│   ├── pipeline-executor-controller.agent.md   # Phase 2: adaptive batch execution
│   ├── pipeline-checkpoint-validator.agent.md  # Phase 2: per-batch build+test gate
│   ├── pipeline-review-orchestrator.agent.md   # Phase 2: adversarial review coordinator
│   ├── pipeline-executor-fix.agent.md          # Phase 2: targeted fix loops (max 3)
│   ├── pipeline-final-adversarial.agent.md     # Phase 3: final 3-reviewer adversarial
│   ├── pipeline-finishing-branch.agent.md      # Phase 3: git operations
│   └── pipeline-sentinel.agent.md              # Cross-phase sequence validator
│
├── references/
│   └── complexity-matrix.md         # SSOT: complexity thresholds + gate hardness
│
├── extensions/
│   └── pipeline-hook/
│       └── extension.mjs            # Copilot CLI extension hook (NLP trigger)
│
└── copilot-instructions.md          # Global NLP routing rules
```

---

## Pipeline Phases

```
Phase 0: TRIAGE
  0a → task-orchestrator     (classify: type, complexity, pipeline variant)
  0b → information-gate      (detect info gaps — BLOCKS if unresolved)
  0c → design-interrogator   (COMPLEXA only: resolve design trade-offs)

Phase 1: PROPOSAL
  → Present proposal to user → ask_user confirmation

Phase 1.5: PLANNING (COMPLEXA or --plan)
  → plan-architect           (structured task list with files_in_scope)

Phase 2: EXECUTION
  → executor-controller      (adaptive batches)
  → per-batch: adversarial gate (mandatory if auth/crypto/data touched)
  → review-orchestrator      (3 parallel reviewers — zero shared context)
  → executor-fix             (max 3 loops, circuit breaker, FIX_CONTEXT contract)
  → checkpoint-validator     (build + tests + regression per complexity)

Phase 3: CLOSURE
  → sanity-checker           (final build + tests)
  → final-adversarial        (optional: 3 parallel reviewers)
  → final-validator          (Go/No-Go — Pa de Cal)
  → finishing-branch         (commit / PR / discard)
```

---

## Execution Modes

| Command | Mode |
|---------|------|
| `/pipeline [task]` | Full pipeline — all 4 phases |
| `/pipeline diagnostic [task]` | Classification only (Phase 0-1) |
| `/pipeline --hotfix [task]` | Emergency bypass — reduced validation |
| `/pipeline --grill [task]` | Full + forced design interrogation |
| `/pipeline --plan [task]` | Full + plan mode |
| `/pipeline --complexa [task]` | Full + force COMPLEXA classification |
| `/pipeline review-only` | Adversarial review of uncommitted changes only |
| `/pipeline continue` | Resume interrupted pipeline from Phase 2 |

---

## Built-in Agent Delegation

9 source plugin agents are correctly mapped to existing Copilot built-ins:

| Source Agent | Copilot Built-in |
|---|---|
| adversarial-batch | `adversarial-reviewer` |
| final-validator | `final-validator` |
| sanity-checker | `sanity-checker` |
| task-orchestrator | `task-orchestrator` |
| executor-implementer | `executor-implementer` |
| executor-quality-reviewer | `code-reviewer` |
| architecture-reviewer | `panel-architect` |
| pre-tester | `pre-tester` |
| quality-gate-router | `quality-gate-router` |

---

## Complexity Classification

All agents reference `references/complexity-matrix.md` as SSOT:

| Level | Files | Lines | Domains | Pipeline |
|-------|-------|-------|---------|----------|
| SIMPLES | 1-2 | < 30 | 1 | Direct (no pipeline) |
| MEDIA | 3-5 | 30-100 | 2 | Light variant |
| COMPLEXA | 6+ | > 100 | 3+ | Heavy variant |

---

## Gate System

Every gate has a fixed hardness level — complexity only controls whether it triggers:

| Hardness | Behavior |
|---|---|
| MANDATORY | Always blocks; cannot be skipped |
| HARD | Blocks on failure; user can override with explicit risk acceptance |
| CIRCUIT_BREAKER | Terminates execution; escalates to user |
| SOFT | Advisory; continue mode unless user stops |

---

## Installation

See [INSTALL.md](./INSTALL.md).

---

## Source Plugin

This bridge is derived from the [Pipeline Orchestrator v3.1](https://github.com/fernandoxavier02/Pipeline-Orchestrator) Claude Code plugin by [@fernandoxavier02](https://github.com/fernandoxavier02).
