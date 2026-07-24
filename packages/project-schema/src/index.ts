// Stage 1 (ROADMAP.md): canonical JSON Schema definitions for project
// packages. See docs/adr/0001-canonical-schema-source.md for why JSON
// Schema (not Zod or Pydantic models) is the source of truth here.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Ajv2020 } from "ajv/dist/2020.js";
import type { ErrorObject, ValidateFunction } from "ajv";

const schemaDir = fileURLToPath(new URL("../schema", import.meta.url));

export interface ValidationResult {
  valid: boolean;
  errors: ErrorObject[];
}

const ajv = new Ajv2020({ allErrors: true, strict: true });
const compiledCache = new Map<string, ValidateFunction>();

export function loadSchema(schemaFileName: string): unknown {
  const path = `${schemaDir}/${schemaFileName}`;
  return JSON.parse(readFileSync(path, "utf-8"));
}

export function validateAgainstSchema(
  schemaFileName: string,
  data: unknown,
): ValidationResult {
  let validate = compiledCache.get(schemaFileName);
  if (!validate) {
    validate = ajv.compile(loadSchema(schemaFileName) as object);
    compiledCache.set(schemaFileName, validate);
  }
  const valid = validate(data);
  return { valid, errors: valid ? [] : (validate.errors ?? []) };
}
