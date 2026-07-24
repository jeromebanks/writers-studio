import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validateAgainstSchema } from "@writers-studio/project-schema";

const fixtureDir = fileURLToPath(
  new URL("../fixtures/toy-scene", import.meta.url),
);

function loadFixture(name: string): unknown {
  return JSON.parse(readFileSync(`${fixtureDir}/${name}`, "utf-8"));
}

describe("toy-scene.schema.json (TypeScript/ajv)", () => {
  it("accepts the valid fixture", () => {
    const result = validateAgainstSchema(
      "toy-scene.schema.json",
      loadFixture("valid.json"),
    );
    expect(result.valid).toBe(true);
  });

  it("rejects the invalid fixture", () => {
    const result = validateAgainstSchema(
      "toy-scene.schema.json",
      loadFixture("invalid.json"),
    );
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
