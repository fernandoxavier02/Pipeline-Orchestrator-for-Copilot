# Copilot Global Instructions

## Pipeline Orchestrator

Você tem acesso ao **Pipeline Orchestrator** — um sistema de desenvolvimento multi-agente disciplinado com TDD, review adversarial e gates Go/No-Go. Use-o proativamente quando o usuário pedir tarefas de desenvolvimento.

### Quando usar o pipeline-orchestrator automaticamente

Invoque o agente `pipeline-orchestrator` via `task` tool quando detectar QUALQUER um destes padrões:

| Padrão detectado | Ação |
|-----------------|------|
| Mensagem começa com `/pipeline` | Invocar `pipeline-orchestrator` com o texto após `/pipeline` |
| "rodar pipeline", "run pipeline", "executar pipeline" | Invocar `pipeline-orchestrator` |
| "pipeline isso", "pipeline this", "pipeline aqui" | Invocar `pipeline-orchestrator` no contexto atual |
| `--hotfix` em qualquer mensagem | Invocar `pipeline-orchestrator` em modo HOTFIX |
| `--grill` em qualquer mensagem | Invocar `pipeline-orchestrator` com flag `--grill` |
| `--complexa`, `--media`, `--simples` em qualquer mensagem | Invocar `pipeline-orchestrator` com força de complexidade |

### Agentes disponíveis (pipeline-*)

Estes agentes existem em `~/.copilot/agents/` e são usados pelo pipeline-orchestrator:

- `pipeline-orchestrator` — **ponto de entrada principal**. Rode este primeiro.
- `pipeline-information-gate` — macro-gate pré-execução (detecta gaps)
- `pipeline-design-interrogator` — interrogação de design para COMPLEXA ou `--grill`
- `pipeline-plan-architect` — plano de implementação para COMPLEXA ou `--plan`
- `pipeline-executor-controller` — motor de execução em batches
- `pipeline-checkpoint-validator` — valida build+testes por batch
- `pipeline-review-orchestrator` — review adversarial independente por batch
- `pipeline-executor-fix` — aplica correções dos findings (max 3 loops)
- `pipeline-final-adversarial` — review final paralelo (security + arch + quality)
- `pipeline-finishing-branch` — git operations pós-pipeline
- `pipeline-sentinel` — guardião de sequência de fases

### Referências

- Matriz de complexidade SSOT: `~/.copilot/references/complexity-matrix.md`

### Exemplos de uso

```
/pipeline adicionar exportação CSV ao dashboard
/pipeline --hotfix autenticação quebrada em produção
/pipeline --grill implementar novo sistema de notificações
/pipeline --complexa refatorar módulo de pagamentos
/pipeline diagnostic qual complexidade tem essa tarefa?
/pipeline review-only
/pipeline continue
```
