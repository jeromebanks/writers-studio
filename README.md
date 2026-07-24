# Writer's Studio

An Astrans-first, project-neutral AI writer's studio for planning, writing,
revising, evaluating, and navigating long-form literary works. See
[`INIT.md`](INIT.md) for the full mission, authority model, and product
principles, and [`ROADMAP.md`](ROADMAP.md) for the milestone sequence this
repository is being built against. [`AGENTS.md`](AGENTS.md) has the rules
Claude Code and Codex both follow while working in this repo.

This repository is currently at **Stage 0 — Repository foundation**
(ROADMAP.md): a monorepo skeleton and shared quality tooling, with no
product features yet.

## Setup

Requires Node.js 20+, [pnpm](https://pnpm.io) (via `corepack enable`), and
[uv](https://docs.astral.sh/uv/).

```bash
pnpm install
uv sync
```

## Checks

```bash
./scripts/check.sh   # everything: TS lint/typecheck/test, Python ruff/mypy/pytest
pnpm check           # TypeScript half only
uv run pytest        # Python half only
```

No model API key or running database is required for the default suite.

## Local database (optional)

Only needed once app code reads/writes Postgres/pgvector — not required for
`scripts/check.sh`.

```bash
cp .env.example .env
docker compose up -d
```

## Architecture

Modular monolith, per `INIT.md`'s "Proposed architecture":

- `apps/web` — Next.js/React writer-facing UI (Stage 4+).
- `apps/worker` — Python workers for embeddings, stylometry, and narrative
  analysis (Stage 6+).
- `packages/project-schema` — canonical JSON Schema contracts, validated
  identically from TypeScript (ajv) and Python (jsonschema); see
  [ADR-0001](docs/adr/0001-canonical-schema-source.md).
- `packages/project-kernel` — project loader, validator, scene context
  packet builder (Stage 1).
- `packages/astrans-adapter` — upstream Astrans import adapter (Stage 2).
- `packages/model-adapters`, `packages/evaluation`, `packages/preferences`,
  `packages/mcp-server` — model provider abstraction, critics, preference
  capture, and the MCP surface for Claude Code/Codex (Stages 5–9).
- `projects/` — Git-backed Markdown/YAML/JSON literary project packages.
- `docs/adr/` — architecture decision records.
- `.worktrees/` — gitignored upstream checkouts (e.g. Astrans), never
  vendored into this repo.

## Contributing

Read `INIT.md` and the current `ROADMAP.md` milestone before changing
architecture. Follow `AGENTS.md`. Record durable architectural decisions as
an ADR under `docs/adr/` using `docs/adr/template.md`.
