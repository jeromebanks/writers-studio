#!/usr/bin/env bash
# Runs every deterministic check: TypeScript lint/typecheck/test, then
# Python lint/typecheck/test. No model API key or running Postgres required.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

echo "== TypeScript: lint, typecheck, test =="
pnpm check

echo "== Python: ruff, mypy, pytest =="
uv run ruff check .
uv run ruff format --check .
uv run mypy apps/worker/src packages/project-schema/python/src tests/contract
uv run pytest
