# Prompt Engineering Guide

Every prompt should contain

- Goal
- Requirements
- Constraints
- Expected Output

---

## Example

Goal

Generate a Spring Boot REST API.

Requirements

- Java 21
- Spring Boot
- PostgreSQL
- JWT
- Swagger

Constraints

- Clean Architecture
- RESTful
- Validation
- DTO Mapping

Expected Output

- Controller
- Service
- Repository
- Entity
- DTO
- Mapper

---

## Prompt Rules

Prompt should be

- explicit
- deterministic
- reproducible

Avoid

- vague wording
- missing requirements
- contradictory instructions

---

## See also

- `../templates/prompt-template.md` — fillable version of this format (Role/Context/Task/Constraints/Output/Example) for a new reusable prompt.
- `../architecture/`, `../standards/` — the docs a prompt's "Requirements"/"Constraints" section should usually point back to, rather than restating them inline.
