# Feature: <name>

## Summary

One paragraph: what this feature does and why it matters, in terms a user would recognize — not in terms of the system that implements it.

## User story

As a <role>, I want to <action>, so that <outcome>.

## Scope

**In scope:**
-

**Out of scope:**
-

## Affected modules

| Layer | Module(s) | New or modified? |
|---|---|---|
| Backend | | |
| Frontend | | |
| Database | | |

Reference `../architecture/system.md` to confirm which module actually owns this — don't create a new module if an existing one already fits.

## API changes

New/changed endpoints, request/response shape. Follow `../standards/api.md`. Update that file's endpoint table once shipped.

## UI changes

Routes/components touched. Confirm against `../architecture/frontend.md` which `features/<domain>/` this belongs in — most routes already have a home.

## Data model changes

New tables/columns → new Flyway migration (`../architecture/database.md`), never an edit to an already-applied one.

## Testing plan

What proves this works — specific scenarios, not "add tests."

## Rollout

Any feature flag, migration ordering, or dependency on another in-flight task. If this depends on something not yet real (check `../memory/known-issues.md`), say so here.
