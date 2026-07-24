# ADR-0001: JSON Schema is the canonical contract source

- Status: accepted
- Date: 2026-07-24

## Context

Stage 0's acceptance criteria (ROADMAP.md) require that "TypeScript and
Python contracts can validate the same sample artifact." The application
layer is TypeScript (Zod is the stated validation library there) and the
worker layer is Python (Pydantic/JSON Schema, per INIT.md's architecture
table). Every project artifact — project metadata, canon entries, timeline
events, constitution clauses, proposals, findings, comparisons — will need a
schema validated identically on both sides of that boundary, so this needs
to be settled before Stage 1 schemas are written, not discovered by drift
between two independently hand-written model definitions.

## Decision

JSON Schema is the single canonical, versioned source of truth for every
project-package contract. Canonical schema files live under
`packages/project-schema/schema/*.schema.json`.

Each language validates directly against these files at runtime, rather than
maintaining a hand-duplicated parallel model:

- TypeScript: `ajv` compiles and validates against the JSON Schema file
  directly (`packages/project-schema/src`).
- Python: the `jsonschema` library validates against the same file directly
  (`packages/project-schema/python/src`).

Ergonomic Zod or Pydantic wrappers may be introduced later, per domain
package, once real domain schemas exist (Stage 1) — but if introduced, they
must be generated from or validated against the canonical JSON Schema in a
contract test, never hand-maintained as an independent source of truth.

## Consequences

- Adding or changing a contract means editing one JSON Schema file; both
  runtimes pick it up without a codegen step.
- Contract tests (`tests/contract/`) can assert "TS accepts what Python
  accepts, and both reject the same malformed input" directly against the
  same file, which is the literal Stage 0 acceptance criterion.
- We give up some TypeScript/Python authoring ergonomics (branded types,
  Pydantic validators with custom logic) until/unless a later ADR adds a
  generated-wrapper layer on top of this.
- Non-structural validation (cross-field business rules, e.g. "a scene
  override must cite a reason") stays out of JSON Schema and lives in
  domain-package code on both sides, evaluated in each language's own tests.

## Alternatives considered

- **Zod canonical, generate JSON Schema for Python:** keeps the ergonomic
  authoring experience TypeScript engineers expect, but makes Python a
  second-class consumer of a TypeScript-shaped artifact, and requires a
  codegen step to stay in sync. Rejected for Stage 0; may revisit once
  domain schemas stabilize.
- **Pydantic canonical, generate JSON Schema for TypeScript:** same
  asymmetry problem in the other direction, and ties the contract format to
  a single Python library's schema dialect.
- **Independent Zod and Pydantic models, cross-checked by contract tests
  only:** cheapest to start, but the two models were expected to drift
  the moment either side changes without a coordinated PR review — no
  structural guarantee, only a test that might get skipped.
