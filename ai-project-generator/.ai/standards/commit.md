# Commit Message Convention

This repo doesn't have commit history yet to derive a convention from, so it uses [Conventional Commits](https://www.conventionalcommits.org/) — adopt it from the first commit onward.

## Format

```
<type>(<scope>): <summary>

<body — optional, explain why not what>

<footer — optional, task/issue references>
```

## Types

| Type | Use for |
|---|---|
| `feat` | a new user-facing capability |
| `fix` | a bug fix |
| `refactor` | code change with no behavior change |
| `docs` | documentation only (including `.ai/` and `AGENT.md` files) |
| `test` | adding or fixing tests |
| `chore` | tooling, deps, build config |
| `perf` | performance improvement with no behavior change |

## Scope

Use the app or package the change lives in: `api`, `web`, `worker`, `admin`, `sdk`, `template-engine`, `ai-provider`, etc. Omit scope only for repo-wide changes (e.g. root `CLAUDE.md`).

## Rules

- Summary in imperative mood, no trailing period: `fix(api): persist generation jobs to the database`, not `Fixed a bug where...`.
- One logical change per commit — don't bundle an unrelated refactor into a feature commit.
- If a commit closes out a task file under `.ai/tasks/`, reference it in the footer: `Refs: tasks/<task-file>`.
- Never write `fix stuff` / `wip` / `updates` as a final commit message — these are fine as intermediate local commits, squash before merging.
