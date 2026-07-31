# Prompt: <name>

Format required by `../prompts/AGENT.md`. Use for reusable prompts aimed at an AI coding agent working in this repo (code review, refactor, doc generation, test generation, debugging).

## Role

Who the agent should act as for this prompt (e.g. "senior Spring Boot reviewer focused on the layering rules in `standards/coding.md`").

## Context

What the agent needs loaded before it can do this well — usually a subset of `.ai/architecture/`, `.ai/standards/`, and the specific files in play. Name them explicitly; don't rely on the agent to guess which docs are relevant.

```
Read before starting:
- .ai/standards/coding.md
- .ai/architecture/<relevant>.md
- <specific source files>
```

## Task

The actual instruction, stated as a concrete, checkable outcome — not "improve this."

## Constraints

What the agent must not do (e.g. "don't touch files outside `apps/api/.../generator/`", "don't add a new mock", "don't skip the build/verify step").

## Output format

What form the result should take — a diff, a report, a new file, a structured list of findings.

## Example

One filled-in example of this prompt applied to something real in this repo, if one exists — makes the template self-checking.

## Versioning

Bump a version note here (`v1`, `v2`, ...) when the prompt changes meaningfully, per `../prompts/AGENT.md`.
