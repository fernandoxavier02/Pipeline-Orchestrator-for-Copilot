import { joinSession } from "@github/copilot-sdk/extension";

/**
 * Pipeline Hook Extension — Copilot Bridge for Pipeline Orchestrator v3.1
 *
 * Intercepts /pipeline commands and routes them to the pipeline-orchestrator agent.
 * Also logs pipeline agent invocations for observability.
 */
const session = await joinSession({
    tools: [],
    hooks: {
        onSessionStart: async () => {
            await session.log("Pipeline Orchestrator bridge active — type /pipeline <task> to start", {
                ephemeral: true,
            });
        },

        onUserPromptSubmitted: async (event) => {
            const prompt = event.prompt?.trim() ?? "";

            // Only intercept /pipeline commands
            if (!prompt.startsWith("/pipeline")) {
                return {};
            }

            const raw = prompt.slice("/pipeline".length).trim();

            // Special no-arg case: show usage hint
            if (!raw) {
                return {
                    modifiedPrompt:
                        "Use the pipeline-orchestrator agent to show usage instructions for the Pipeline Orchestrator. List all available modes and flags.",
                };
            }

            const mode = detectMode(raw);
            const task = extractTask(raw, mode);
            const flags = extractFlags(raw);

            await session.log(`[pipeline] mode=${mode} task="${task}"`, { ephemeral: true });

            return {
                modifiedPrompt: buildModifiedPrompt(mode, task, flags, raw),
                additionalContext: buildContext(mode, task, flags, raw),
            };
        },

        onPreToolUse: async (event) => {
            // Log pipeline agent invocations for observability
            if (event.toolName === "task") {
                const agentType = event.toolArgs?.agent_type ?? "";
                if (agentType.startsWith("pipeline-") || isPipelineAgent(agentType)) {
                    await session.log(`[pipeline] → ${agentType}`, { ephemeral: true });
                }
            }
            return {};
        },
    },
});

// ─── Mode Detection ────────────────────────────────────────────────────────────

function detectMode(raw) {
    if (raw.startsWith("diagnostic ")) return "DIAGNOSTIC";
    if (raw === "continue" || raw.startsWith("continue ")) return "CONTINUE";
    if (raw === "review-only" || raw.startsWith("review-only ")) return "REVIEW_ONLY";
    if (raw.includes("--hotfix")) return "HOTFIX";
    if (raw.includes("--grill")) return "FULL_GRILL";
    if (raw.includes("--plan")) return "FULL_PLAN";
    if (raw.includes("--simples")) return "FULL_FORCE_SIMPLES";
    if (raw.includes("--media")) return "FULL_FORCE_MEDIA";
    if (raw.includes("--complexa")) return "FULL_FORCE_COMPLEXA";
    return "FULL";
}

function extractTask(raw, mode) {
    // Remove mode prefixes and flags to get the pure task
    return raw
        .replace(/^diagnostic\s+/, "")
        .replace(/^continue\s*/, "")
        .replace(/^review-only\s*/, "")
        .replace(/--hotfix\s*/g, "")
        .replace(/--grill\s*/g, "")
        .replace(/--plan\s*/g, "")
        .replace(/--simples\s*/g, "")
        .replace(/--media\s*/g, "")
        .replace(/--complexa\s*/g, "")
        .trim();
}

function extractFlags(raw) {
    const flags = {};
    if (raw.includes("--hotfix")) flags.hotfix = true;
    if (raw.includes("--grill")) flags.grill = true;
    if (raw.includes("--plan")) flags.plan = true;
    if (raw.includes("--simples")) flags.forceLevel = "SIMPLES";
    if (raw.includes("--media")) flags.forceLevel = "MEDIA";
    if (raw.includes("--complexa")) flags.forceLevel = "COMPLEXA";
    return flags;
}

// ─── Context Builder ───────────────────────────────────────────────────────────

function buildContext(mode, task, flags, raw) {
    const lines = [
        "## Pipeline Hook — Structured Context",
        "",
        `**Command received:** \`/pipeline ${raw}\``,
        `**Mode:** ${mode}`,
        `**Task:** ${task || "(none — special mode)"}`,
    ];

    if (flags.forceLevel) {
        lines.push(`**Forced complexity level:** ${flags.forceLevel}`);
    }
    if (flags.hotfix) {
        lines.push(
            "**HOTFIX MODE ACTIVE:** Reduced validation scope. Only BLOCKER gaps. 1 regression test minimum. Security checklists only."
        );
    }
    if (flags.grill) {
        lines.push("**GRILL MODE ACTIVE:** Design interrogator will run regardless of complexity.");
    }
    if (flags.plan) {
        lines.push("**PLAN MODE ACTIVE:** Plan architect will run regardless of complexity.");
    }

    lines.push(
        "",
        "**Pipeline Agent:** You are the `pipeline-orchestrator`. Follow the pipeline flow defined in your agent instructions.",
        "**Reference:** `~/.copilot/references/complexity-matrix.md` for complexity rules and gate hardness taxonomy."
    );

    return lines.join("\n");
}

function buildModifiedPrompt(mode, task, flags, raw) {
    if (mode === "CONTINUE") {
        return "Use the pipeline-orchestrator agent in CONTINUE mode: find the latest pipeline docs and resume from Phase 2.";
    }
    if (mode === "REVIEW_ONLY") {
        return "Use the pipeline-orchestrator agent in REVIEW-ONLY mode: detect uncommitted changes and run final adversarial review.";
    }
    if (mode === "DIAGNOSTIC") {
        return `Use the pipeline-orchestrator agent in DIAGNOSTIC mode (classification only) for: ${task}`;
    }
    if (flags.hotfix) {
        return `Use the pipeline-orchestrator agent in HOTFIX mode (production emergency, reduced validation) for: ${task}`;
    }

    const forceNote = flags.forceLevel ? ` Force complexity: ${flags.forceLevel}.` : "";
    const grillNote = flags.grill ? " Force design interrogation." : "";
    const planNote = flags.plan ? " Force plan architect." : "";

    return `Use the pipeline-orchestrator agent to run the full pipeline for: ${task}${forceNote}${grillNote}${planNote}`;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function isPipelineAgent(agentType) {
    const pipelineAgents = new Set([
        "task-orchestrator",
        "adversarial-reviewer",
        "pre-tester",
        "sanity-checker",
        "final-validator",
        "executor-implementer",
        "quality-gate-router",
        "code-review",
        "code-reviewer",
        "panel-architect",
    ]);
    return pipelineAgents.has(agentType);
}
