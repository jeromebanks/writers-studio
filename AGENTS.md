# Agent Instructions

This file applies to any coding agent working in this repository, including
Claude Code and Codex. It is shared truth alongside the repository's schemas
and tests; read it and `INIT.md` before making architectural changes.

## Rules

1. Read `INIT.md` and the current roadmap milestone (`ROADMAP.md`) before
   changing architecture.
2. Search for existing schemas and contracts before inventing new ones.
3. Preserve project portability and Markdown round-tripping.
4. Make small, reviewable commits scoped to one roadmap slice.
5. Never edit imported source snapshots in place.
6. Never invent Astrans canon to resolve a missing fact.
7. Keep generated artifacts out of Git unless intentionally used as fixtures.
8. Use provider-neutral interfaces in core packages.
9. Attach source provenance to all analysis.
10. Run the relevant unit, contract, importer, and round-trip tests.
11. Update architectural decisions (see `docs/adr/`) when changing a durable
    contract.
12. Leave acceptance of manuscript proposals and constitutional changes to a
    human-authorized operation.

## Capability surfaces

Claude Code and Codex should be able to use the same capabilities through:

1. the application API;
2. a CLI for deterministic local workflows; and
3. an MCP server exposing read/search/propose/evaluate operations (see
   `INIT.md` for the initial MCP surface).

Never expose unrestricted "replace canonical manuscript" or "change
constitution" tools to autonomous agents.

## Local workflow

- Package manager: `pnpm` (TypeScript workspace), `uv` (Python workspace).
- Run `pnpm install` then `pnpm check` (lint, type-check, test) before
  committing. Python packages run their own `uv run` equivalents; see each
  package's README.
- The default check/test suite must run without a model API key and without a
  running Postgres instance.
