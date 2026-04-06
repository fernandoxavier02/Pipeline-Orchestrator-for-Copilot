# Complexity Matrix (SSOT) — Pipeline Orchestrator Copilot Bridge

This is the SINGLE SOURCE OF TRUTH for complexity classification and proportional behavior.
All pipeline agents reference this file — never define complexity rules inline.

---

## Classification Criteria

| Dimension | SIMPLES | MEDIA | COMPLEXA |
|-----------|---------|-------|----------|
| Files affected | 1-2 | 3-5 | 6+ |
| Lines changed | < 30 | 30-100 | > 100 |
| Domains | 1 | 2 | 3+ |
| Risk | Low | Medium | High |
| Has spec | No | Optional | Required |
| Auth impact | No | Maybe | Yes |
| Data model change | No | Minor | Structural |

### Boundary Rule

Values at exact boundaries are classified as the HIGHER complexity level. Example: 3 files = MEDIA, 30 lines = MEDIA.

### Automatic Elevation Rules

1. Touches authentication/authorization → minimum MEDIA
2. Touches data model/schema → minimum MEDIA
3. Touches payment/billing LOGIC (write, compute, modify) → minimum COMPLEXA. Read-only display of billing data → UI domain, no elevation.
4. Affects 3+ domains → minimum MEDIA
5. Production incident → minimum COMPLEXA

---

## Proportional Behavior by Complexity

| Aspect | SIMPLES | MEDIA | COMPLEXA |
|--------|---------|-------|----------|
| **Pipeline** | DIRETO (no pipeline) | Light variant | Heavy variant |
| **Batch size** | All at once | 2-3 tasks | 1 task |
| **TDD tests** | 1 main + 1 edge | 1 main + 1 regression + 1 edge | 1+ main + 2+ regression + 2+ edge |
| **Plan Mode** | Skip | Optional (--plan) | Automatic |
| **Architecture review** | Skip | Per-batch | Per-batch (deep) |
| **Adversarial checklists** | IF auth touched: auth + injection; ELSE: skip | auth + input-validation + error-handling | All 7 checklists |
| **Sentinel checkpoints** | #1 (post_orchestrator) + #4 (phase_2_to_3) | #1 + #4 mandatory, #2-3-5 recommended | All 5 mandatory |
| **Checkpoint validation** | Build only | Build + tests | Build + tests + regression |
| **Sanity check** | Build only | Build + tests | Build + tests + regression + coverage |
| **Pa de Cal criteria** | Build passes | Build + tests pass, no high vulns | Build + tests + no vulns + regression + AC met |

---

## Pipeline Routing Matrix

| Type \ Complexity | SIMPLES | MEDIA | COMPLEXA |
|-------------------|---------|-------|----------|
| **Bug Fix** | DIRETO | bugfix-light | bugfix-heavy |
| **Feature** | DIRETO | implement-light | implement-heavy |
| **User Story** | DIRETO | user-story-light | user-story-heavy |
| **Audit** | DIRETO | audit-light | audit-heavy |
| **UX Simulation** | DIRETO | ux-sim-light | ux-sim-heavy |

DIRETO = Direct execution without pipeline (build + test only, max 2 files, < 30 lines).

---

## Adversarial Gate Behavior by Complexity

| Aspect | SIMPLES | MEDIA | COMPLEXA |
|--------|---------|-------|----------|
| **Per-batch gate** | Ask (skippable) | Ask (skippable) | Ask (skippable) |
| **Mandatory override** | If auth/crypto/data touched | If auth/crypto/data touched | If auth/crypto/data touched |
| **Final review gate** | Recommended | Recommended | Strongly recommended |
| **Final review team** | 1 reviewer (security) | 2 reviewers (security + architecture) | 3 reviewers (security + architecture + quality) |
| **Final review intensity** | Light (1 reviewer) | Standard (2 reviewers) | Full (3 reviewers) |

---

## Gate Hardness Taxonomy

The hardness level of each gate is FIXED. What varies is whether the gate is triggered by complexity:

| Gate | Hardness | SIMPLES | MEDIA | COMPLEXA |
|------|----------|---------|-------|----------|
| SSOT_CONFLICT | MANDATORY | Always | Always | Always |
| ADVERSARIAL_GATE_MANDATORY | MANDATORY | If domain touched | If domain touched | If domain touched |
| INFO_GATE_BLOCKED | HARD | Always | Always | Always |
| TDD_APPROVAL | HARD | Always | Always | Always |
| PLAN_REJECTED | HARD | N/A (no plan) | If --plan | Always |
| STOP_RULE | CIRCUIT_BREAKER | Always | Always | Always |
| FIX_LOOP_EXHAUSTED | CIRCUIT_BREAKER | Always | Always | Always |
| STALE_CONTEXT | SOFT | Always (continue mode) | Always (continue mode) | Always (continue mode) |
| MICRO_GATE_GAP | HARD | Always | Always | Always |
| CHECKPOINT_FAIL | HARD | Always | Always | Always |
| ADVERSARIAL_BLOCK | HARD | Always | Always | Always |
| ADVERSARIAL_GATE | SOFT | Skippable | Skippable | Skippable |
| FINAL_ADVERSARIAL_GATE | SOFT | Recommended | Recommended | Strongly recommended |
| FINAL_ADVERSARIAL_REWORK | HARD | If critical findings | If critical findings | If critical findings |
| CLOSEOUT_CONFIRM | SOFT | Always | Always | Always |

---

## Confidence Score Thresholds

| Zone | Score Range | Advisory Signal |
|------|-------------|-----------------|
| HIGH | >= 0.80 | High confidence — no score-related concerns |
| MEDIUM | 0.60 - 0.79 | Moderate confidence — review skipped gates |
| LOW | < 0.60 | Low confidence — investigate root cause |

Score is PURELY ADVISORY — it informs final-validator but NEVER overrides binary PASS/FAIL checks.

| Confidence Event | Impact |
|-----------------|--------|
| Info-gate gaps resolved | +0.05 per gap |
| Checkpoint PASS | +0.10 per batch |
| Adversarial review CLEAN | +0.15 |
| Adversarial review with minor findings fixed | +0.08 |
| Checkpoint FAIL | -0.15 |
| Info-gate BLOCKED (unresolved) | -0.20 |
| Fix loop needed | -0.05 per loop |
