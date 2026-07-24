import json
from pathlib import Path

from writers_studio_project_schema import validate_against_schema

FIXTURE_DIR = Path(__file__).resolve().parents[1] / "fixtures" / "toy-scene"


def load_fixture(name: str) -> object:
    return json.loads((FIXTURE_DIR / name).read_text())


def test_accepts_the_valid_fixture() -> None:
    result = validate_against_schema("toy-scene.schema.json", load_fixture("valid.json"))
    assert result.valid is True


def test_rejects_the_invalid_fixture() -> None:
    result = validate_against_schema("toy-scene.schema.json", load_fixture("invalid.json"))
    assert result.valid is False
    assert len(result.errors) > 0
