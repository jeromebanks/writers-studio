# Writer's Studio Roadmap

## How to use this roadmap

Work milestone by milestone. Each milestone must produce a demonstrable,
testable increment and leave the repository usable. Mark individual tasks in
issues or a project board; keep this document focused on outcomes, dependencies,
acceptance criteria, and sequencing.

Astrans is the proving ground, not a source of hard-coded domain assumptions.
When a milestone needs novel content, pull only the required material from
<https://github.com/jeromebanks/astrans>, record the resolved commit SHA and
source hashes, and use the importer described in `INIT.md`.

## Stage 0 — Repository foundation

**Outcome:** Claude Code and Codex can work safely and consistently in the same
repository.

### Deliverables

- TypeScript/Python monorepo skeleton.
- `AGENTS.md` with shared coding-agent constraints.
- Root README with setup and architecture summary.
- ADR directory and decision template.
- Formatter, linter, type checking, unit-test, and contract-test commands.
- Local PostgreSQL/pgvector development environment.
- Configuration and secret-handling conventions.
- CI for deterministic checks.
- `.gitignore` covering `.worktrees/`, imported caches, model outputs, local
  databases, and secrets.

### Acceptance

- A clean clone can install and run checks from documented commands.
- TypeScript and Python contracts can validate the same sample artifact.
- No model API key is needed to run the default test suite.

## Stage 1 — Portable literary project kernel

**Outcome:** a literary project is a validated, versioned package of ordinary
files that works without the web UI.

### Deliverables

- Versioned schemas for:
  - project metadata;
  - book/chapter/scene metadata;
  - source provenance;
  - canon entries;
  - timeline events and character knowledge;
  - constitution clauses and named dimensions;
  - references and anti-references;
  - proposals, findings, comparisons, and decisions.
- Project loader and validator.
- Stable IDs independent of filenames.
- Content hashing and derived-artifact invalidation.
- Scene context packet builder.
- CLI commands to initialize, validate, inspect, and search a project.

### Acceptance

- The example project validates in TypeScript and Python.
- Renaming a file does not destroy domain identity.
- Changing a source invalidates only its dependent derived artifacts.
- A context packet explains why each included item was selected.

## Stage 2 — Astrans adapter and first corpus

**Outcome:** the studio can reproducibly import an intentional Astrans slice
without making a fork of the novel.

### Deliverables

- `astrans` upstream adapter.
- Clone/fetch/ref-resolution workflow for
  `https://github.com/jeromebanks/astrans.git`.
- Manifest parser for `manuscript/chapters/manifest.json`.
- Import of chapters 6, 7, and 8.
- Import/mapping of `direction-notes-chapter-7.md`.
- Source snapshot and normalization layers.
- Chapter-to-scene segmentation workflow with human review.
- Provenance report including upstream SHA and per-file hashes.
- Fixture-based importer tests that do not require network access.
- Evaluation of whether to port or call upstream `scripts/text_metrics.py`.

### Acceptance

- Re-importing the same SHA is idempotent.
- The source snapshot matches upstream byte-for-byte.
- Chapter 7 has stable scene IDs and links to chapters 6 and 8 for continuity.
- Generated HTML and game files are not imported.
- No command pushes to Astrans.

## Stage 3 — Aesthetic constitution workshop

**Outcome:** Kenny can express and revise what "Astrans-like" means in readable,
reviewable artifacts.

### Deliverables

- Constitution editor for Markdown principles.
- Structured dimension editor with anchors, ranges, weights, applicability, and
  scene overrides.
- Positive and negative reference passage workflow.
- Decision log for exceptions and changes.
- Seed workshop around five provisional dimensions:
  - psychic distance;
  - exposition explicitness;
  - sentence texture;
  - technological/alien uncanniness;
  - emotional temperature.
- Clause and reference citations usable by critics.

### Acceptance

- Kenny can understand and edit the constitution without reading embeddings.
- Every structured dimension has human-readable anchors and textual examples.
- No seed claim is promoted to Astrans intent without explicit human approval.
- A scene override includes scope, reason, and author.

## Stage 4 — Writer-facing editor

**Outcome:** Kenny can perform ordinary scene writing and revision without
working directly with repository mechanics.

### Deliverables

- Project navigator for parts, chapters, scenes, canon, plans, and constitution.
- Tiptap/ProseMirror scene editor.
- Scene metadata and intent inspector.
- Autosave, named snapshots, comments, and local revision history.
- Lossless Markdown import/export and round-trip test corpus.
- Search across manuscript, canon, and constitution.
- Keyboard-first writing and distraction-free mode.

### Acceptance

- Loading and saving an untouched scene causes no semantic or formatting drift.
- A writer can recover an earlier local snapshot.
- The editor remains useful with all AI providers disabled.
- The exact source file and revision are visible from an open scene.

## Stage 5 — Proposal and review workflow

**Outcome:** AI-assisted edits are inspectable proposals, never silent
manuscript mutation.

### Deliverables

- Provider-neutral model adapter contract.
- Focused scene context packet preview.
- Generate two alternatives plus unchanged control.
- Immutable candidate lineage and provenance.
- Side-by-side and inline diffs.
- Accept, reject, partially apply, and manually edit proposal flows.
- Audit event for every canonical change.

### Acceptance

- A model response cannot write directly to canonical prose.
- Each proposal records model, prompt/rubric version, context hash, source
  revision, and generation parameters.
- Acceptance fails safely if the source scene changed underneath the proposal.
- Partial acceptance remains attributable at the span level.

## Stage 6 — Evaluation workbench

**Outcome:** three narrow critics produce useful, evidence-backed findings and
their disagreement remains visible.

### Deliverables

- Continuity critic.
- Character critic.
- Constitution/style critic.
- Structured finding schema with source spans, citations, confidence, and
  insufficient-evidence state.
- Deterministic stylometry based on the useful concepts in Astrans'
  `scripts/text_metrics.py`.
- Critic result comparison and disagreement view.
- Model identity blinding and prompt/model versioning.
- Feedback mechanism for useful, wrong, and irrelevant findings.

### Acceptance

- Every strong warning links to a passage and a rule/canon source.
- Critics can abstain.
- The same finding schema works across providers.
- Deterministic metrics are labeled descriptive, not aesthetic judgments.
- Critic reliability can be computed against later human decisions.

## Stage 7 — Pairwise comparison and preference history

**Outcome:** ordinary editorial decisions produce clean, reusable preference
data without burdening the writer.

### Deliverables

- Blind randomized A/B comparison.
- Choice scale: A strongly, A slightly, tie, B slightly, B strongly, reject
  both.
- Reason tags plus optional notes.
- Append-only comparison records.
- Candidate lineage and constitution-version capture.
- Repeat-comparison sampling for self-consistency.
- Comparison history and export.
- Initial Pareto candidate selection rather than one aggregate score.

### Acceptance

- Display order cannot leak candidate identity into stored preference meaning.
- A decision remains interpretable after prompts and constitutions change.
- Repeated comparisons can measure consistency.
- The workflow collects 50–100 genuine Kenny decisions before personalized
  training begins.

## Stage 8 — Aesthetic visualization

**Outcome:** style and drift become explorable without implying that a 2D map is
an objective quality surface.

### Deliverables

- Separate semantic, style, and stylometric representations.
- Embedding/algorithm registry and reproducibility metadata.
- Nearest-passage search.
- Style Constellation using canonical scenes, references, candidates, and
  rejected passages.
- Filters for chapter, POV, character, artifact type, and decision status.
- Aesthetic Control Board for named dimensions and confidence.
- Revision trajectories and style-drift timeline.
- Passage/provenance drawer for every visual mark.

### Acceptance

- Every point opens the exact passage and its derivation metadata.
- UI copy states that projected axes have no inherent literary meaning.
- Users can distinguish semantic similarity from style similarity.
- Named-dimension estimates show targets, confidence, and intentional
  overrides.
- A visualization can be regenerated from pinned inputs.

## Stage 9 — Agent interfaces for Claude Code and Codex

**Outcome:** the web UI, CLI, Claude Code, and Codex use the same project kernel
and safety boundaries.

### Deliverables

- Application API.
- Deterministic CLI workflows.
- MCP server implementing:
  - `get_scene_context`;
  - `search_canon`;
  - `get_constitution`;
  - `generate_alternatives`;
  - `run_critics`;
  - `compare_candidates`;
  - `propose_patch`;
  - `record_preference`.
- Project-level agent instructions and examples.
- Permission split between read, propose, evaluate, decide, and accept.
- Golden end-to-end tests shared by UI, CLI, and MCP.

### Acceptance

- Claude Code and Codex can each complete the same proposal workflow.
- Both receive identical context packet semantics.
- Neither can silently accept a proposal or change the constitution.
- Tool outputs are schema-valid and include provenance.

## Stage 10 — Personalized evaluator

**Outcome:** the studio predicts situated preferences while exposing uncertainty
and avoiding reward-model overreach.

### Deliverables

- Retrieval of similar past comparisons.
- Preference critic grounded in those precedents.
- Offline accuracy and calibration report.
- Breakdown by scene type, character, dimension, and confidence.
- Hidden human-rated holdout set.
- Baselines: majority, generic critic, nearest-neighbor, Bradley–Terry.
- Optional small preference head only when data supports it.
- Drift detection when preferences or constitution change.

### Acceptance

- Personalized predictions beat explicit baselines on untouched comparisons.
- The UI explains which precedents informed a prediction.
- Low-confidence and out-of-distribution cases abstain.
- Optimization never trains on the held-out evaluation set.
- No single preference score replaces the critic panel or writer decision.

## Stage 11 — Collaboration and general literary framework

**Outcome:** Writer's Studio supports Jerome and Kenny collaboratively and can
onboard a second, genuinely different creative work.

### Deliverables

- Yjs-based collaboration, presence, and offline editing.
- Roles and permissions for author, editor, reader, and agent.
- Comments, assignments, and decision ownership.
- Reusable project templates and import/export.
- Plugin contracts for critics, importers, visualizations, and model providers.
- A second project with a deliberately different constitution and format.
- Genre-specific starter packs labeled as editable defaults, not rules.

### Acceptance

- Concurrent edits converge without corrupting Markdown or proposal lineage.
- Astrans-specific code is isolated in its adapter/template.
- The second project requires configuration and content, not core forks.
- Authors control who may accept prose and change artistic intent.

## Stage 12 — Optimization experiments

**Outcome:** evaluate whether generation optimization improves human outcomes
without teaching the system to exploit its own critics.

### Possible experiments

1. Best-of-N candidate generation and Pareto filtering.
2. Prompt and context-packet optimization.
3. DPO/LoRA preference tuning with a held-out human set.
4. Multi-audience preference profiles.
5. Active learning that chooses informative comparisons.
6. Cross-modal constitutions for illustrated fiction, animation, and design.

### Guardrails

- Require human evaluation on a hidden set.
- Monitor stylistic homogenization and novelty loss.
- Preserve unchanged controls.
- Test for superficial reward hacking such as ornate prose, excessive metaphor,
  melodrama, or mechanically repeated stylistic quirks.
- Prefer reversible reranking experiments before generator training.
- Do not begin online reinforcement learning until simpler methods show clear
  value and failure modes are understood.

## Release landmarks

### Prototype: Astrans chapter 7

Stages 0–7 complete for chapters 6–8, with a working editor, three critics, and
pairwise decisions.

### Alpha: visible aesthetic space

Stages 8–9 complete, including the Style Constellation, Control Board, and shared
Claude Code/Codex interfaces.

### Beta: learned preference

Stage 10 complete with measured, calibrated personalized predictions based on
real Kenny decisions.

### Framework release

Stage 11 complete with collaboration and a second literary project proving that
the kernel is not merely an Astrans-specific application.

## Cross-cutting risks

| Risk | Mitigation |
|---|---|
| Markdown corruption | Golden round-trip corpus and source snapshots |
| Invented canon | Evidence requirements, abstention, and human decisions |
| Generic "AI pretty" prose | Personal references, anti-references, pairwise choices |
| Critic authority bias | Show evidence/disagreement; measure reliability |
| Embedding mystification | Separate representations and explicit projection caveats |
| Preference overfitting | Holdout set, calibration, drift checks, abstention |
| Reward hacking | Pareto views, controls, and human evaluation |
| Context overload | Inspectable scene packets and retrieval budgets |
| Astrans coupling | Adapter boundary and second-project validation |
| Agent conflict | Shared schemas, tests, `AGENTS.md`, and small commits |
| Premature infrastructure | Modular monolith and persistent jobs first |
| Upstream damage | Read-only import by default; explicit reviewed export |

## Immediate backlog

These are the first implementable issues:

1. Scaffold the monorepo and shared quality commands.
2. Add `AGENTS.md`, ADR template, and architecture overview.
3. Define project, source provenance, chapter, scene, and constitution schemas.
4. Create cross-language schema fixtures and validation tests.
5. Implement the Astrans checkout/ref resolver.
6. Parse the 35-chapter Astrans manifest.
7. Import chapters 6–8 and chapter 7 direction notes into source snapshots.
8. Produce a provenance report and idempotency test.
9. Define a human-reviewable chapter-to-scene segmentation format.
10. Build `studio project validate` and `studio scene context`.
11. Port deterministic metrics behind a stable analysis contract.
12. Build the minimal editor and Markdown round-trip tests.
