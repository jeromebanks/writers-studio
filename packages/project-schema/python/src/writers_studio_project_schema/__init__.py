"""Python-side validation against the canonical JSON Schema in
packages/project-schema/schema/. See docs/adr/0001-canonical-schema-source.md
for why JSON Schema, not a hand-written Pydantic model, is the source of
truth here.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import cast

import jsonschema

_SCHEMA_DIR = Path(__file__).resolve().parents[3] / "schema"


@dataclass
class ValidationResult:
    valid: bool
    errors: list[str] = field(default_factory=list)


def load_schema(schema_file_name: str) -> dict[str, object]:
    return cast(dict[str, object], json.loads((_SCHEMA_DIR / schema_file_name).read_text()))


def validate_against_schema(schema_file_name: str, data: object) -> ValidationResult:
    schema = load_schema(schema_file_name)
    validator = jsonschema.Draft202012Validator(schema)
    errors = [error.message for error in validator.iter_errors(data)]
    return ValidationResult(valid=len(errors) == 0, errors=errors)
