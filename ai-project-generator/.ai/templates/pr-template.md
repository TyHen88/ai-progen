# PR: <title>

Title follows `../standards/commit.md` conventions: `<type>(<scope>): <summary>`.

## Summary

What changed and why, 2-3 sentences. Link the task file (`../tasks/`) or roadmap item (`../context/roadmap.md`) this closes, if any.

## Changes

-
-

## Testing done

What you actually ran, not what should be run:
- [ ] `cd apps/web && npx tsc --noEmit && npx next build` (if frontend touched)
- [ ] `cd apps/api && .\gradlew.bat compileJava` (if backend touched)
- [ ] Manually exercised: <specific flow>

## Screenshots

If UI-visible, before/after. Delete this section if not applicable.

## Checklist

- [ ] Follows `../standards/coding.md` and `../standards/naming.md`
- [ ] No new hardcoded/mocked behavior presented as real (`../standards/coding.md`) — if something's still a stub, it's logged in `../memory/known-issues.md`
- [ ] New endpoints documented in `../standards/api.md`
- [ ] New schema changes are a new Flyway migration, not an edit to an existing one
- [ ] No secret or credential committed, including as a `@Value`/env fallback outside a dev profile (`../standards/security.md`)
- [ ] `../memory/changelog.md` updated if this is a notable milestone
