# Writer's Studio — Project Initialization Brief

## Mission

Build an Astrans-first, project-neutral AI writer's studio for planning, writing,
revising, evaluating, and navigating long-form literary works.

The product should feel like a cross between Scrivener and an AI-assisted code
review environment. It is not a chatbot wrapped around a text box. Writers work
with scenes, canon, artistic intent, alternatives, critiques, diffs, and
decisions. AI work is always proposed; it never silently replaces canonical
prose.

Astrans is the first real project and test corpus. The framework must remain
general enough to support other novels, genre fiction, screenplays, animation,
and radically different artistic constitutions without Astrans-specific logic
in the application kernel.

## Primary hypothesis

The studio can help a writer make better, more intentional decisions while:

1. preserving the writer's final authority;
2. maintaining canon and continuity across a long work;
3. evaluating candidates against explicit artistic intent rather than a vague
   universal "quality" score;
4. collecting pairwise choices that gradually model the writer's situated
   preferences; and
5. making style, drift, similarities, and tradeoffs visible without presenting
   embeddings as objective truth.

## Authority model

Keep these forms of knowledge distinct:

1. **Canonical source** — accepted manuscript, characters, world facts,
   chronology, and other facts the work treats as true.
2. **Aesthetic constitution** — human-readable, versioned intent: principles,
   named dimensions, examples, anti-examples, exceptions, and decisions.
3. **Derived analysis** — embeddings, stylometry, critic estimates, narrative
   graphs, clusters, and summaries. These can be regenerated and can be wrong.
4. **Preference history** — append-only records of the writer's real choices
   between candidates in a specific context.

Markdown and structured YAML/JSON are authoritative. Embeddings are derived
instruments for retrieval and visualization; they are never the constitution.

## Astrans upstream

The Astrans repository is authoritative for the current novel:

- Repository: <https://github.com/jeromebanks/astrans>
- Git remote: `https://github.com/jeromebanks/astrans.git`
- Default branch: `main`

At initialization time, Astrans contains:

- `astrans.md`, the complete manuscript;
- `manuscript/chapters/manifest.json`, describing 35 generated chapter files;
- `manuscript/chapters/*.md`, the chapter-level reading/editing sources;
- `direction-notes.md` and chapter-specific direction notes;
- `scripts/split_manuscript.py`, which generates chapter sources;
- `scripts/text_metrics.py`, a deterministic prose metrics baseline; and
- a generated HTML reader and a separate browser game, which are not part of
  Writer's Studio's initial import scope.

### Import policy

Do not vendor the whole Astrans repository into Writer's Studio and do not make
Writer's Studio the accidental source of truth for Kenny's novel.

Implement an explicit upstream adapter that:

1. clones or fetches Astrans into a gitignored workspace/cache;
2. records the remote URL, requested ref, resolved commit SHA, import timestamp,
   source path, and content hash;
3. reads the chapter manifest and imports a deliberately selected vertical
   slice;
4. maps direction notes into scene/chapter intent without rewriting them;
5. optionally reuses or ports `scripts/text_metrics.py`, preserving attribution
   and provenance;
6. never imports `novel/`, game assets, build output, or unrelated files by
   default; and
7. never pushes changes back to Astrans without an explicit, human-approved
   export operation.

Suggested local setup:

```bash
mkdir -p .worktrees
git clone https://github.com/jeromebanks/astrans.git .worktrees/astrans
git -C .worktrees/astrans fetch origin main
git -C .worktrees/astrans checkout main
git -C .worktrees/astrans pull --ff-only
```

The importer should later support:

```bash
pnpm studio import \
  --adapter astrans \
  --source .worktrees/astrans \
  --ref main \
  --chapters 6,7,8
```

Use chapters 6–8 for the first vertical slice. Chapter 7 has unusually useful
direction notes and chapters 6 and 8 provide continuity boundaries. Preserve
source text byte-for-byte in the import snapshot; transformations belong in
separate normalized artifacts.

## Product principles

- **Writer authority:** acceptance into canonical prose requires an explicit
  human action.
- **Proposals, not mutation:** agents emit revisions, patches, or comments with
  provenance.
- **Evidence before scores:** critiques point to text spans and cite the canon
  rule or constitution clause involved.
- **Plural evaluation:** use narrow critics and preserve disagreement.
- **Pairwise preference:** prefer A/B comparisons, including "tie" and "reject
  both," over absolute 1–10 ratings.
- **No universal aesthetic oracle:** evaluate alignment with a writer, project,
  scene intent, and audience.
- **Inspectability:** every derived value links back to its source text,
  algorithm/model version, prompt version, and confidence.
- **Portability:** a project remains readable and useful as ordinary Markdown,
  YAML, JSON, and Git.
- **Focused context:** build a scene packet from relevant canon and intent; do
  not stuff the entire novel into every model call.
- **Model neutrality:** OpenAI, Anthropic, and local models sit behind adapters.
- **Measurement without Goodharting:** do not collapse all aesthetic dimensions
  into a single reward too early.

## Initial user experience

The desktop web layout has four working regions:

1. **Project navigator (left):** parts, chapters, scenes, characters, places,
   plot threads, constitution, references, draft state, and warnings.
2. **Manuscript editor (center):** prose, scene metadata, comments, tracked
   proposals, named snapshots, and revision diffs.
3. **Studio inspector (right):** scene intent, relevant canon, character state,
   critics, alternatives, continuity, style position, and history.
4. **Comparison tray (bottom):** blind A/B comparison between the current
   passage and alternatives, with preference strength and reason tags.

The editor must work as an ordinary writing tool before advanced AI features
are required. Markdown round-tripping is a first-class acceptance test.

## Aesthetic constitution

Each literary project should be able to contain:

```text
projects/<project-id>/
├── project.yaml
├── constitution/
│   ├── artistic-intent.md
│   ├── narrative-principles.md
│   ├── prose-style.md
│   ├── emotional-palette.md
│   ├── ambiguity-and-exposition.md
│   ├── anti-patterns.md
│   ├── dimensions.yaml
│   ├── references/
│   │   ├── positive/
│   │   └── negative/
│   └── decisions/
├── canon/
│   ├── characters/
│   ├── locations/
│   ├── factions/
│   ├── technology/
│   └── timeline.yaml
├── manuscript/
│   └── books/<book-id>/chapters/<chapter-id>/scenes/
├── plans/
│   ├── series-arc.md
│   ├── book-01.md
│   └── unresolved-threads.yaml
└── preferences/
    └── comparisons.jsonl
```

Named aesthetic dimensions are project-defined, not universal. A dimension
contains human-readable anchors, a target range, applicability rules, and a
weight. Scenes can override targets with a written reason.

Start the Astrans constitution workshop with five provisional dimensions:

- psychic distance;
- exposition explicitness;
- sentence texture;
- alien/technological uncanniness; and
- emotional temperature.

These are hypotheses to review with Kenny, not inferred canon. Do not populate
them with invented claims about Astrans. Seed them from direction notes and
passages, then require human confirmation.

## Derived representations

Keep separate, versioned representations:

| Representation | Purpose |
|---|---|
| Semantic embedding | Subject and conceptual similarity |
| Style embedding | Prose affinity beyond subject matter |
| Stylometric vector | Deterministic rhythm, diction, dialogue, and repetition signals |
| Character voice profile | Compare dialogue and narration by character |
| Narrative-state graph | Events, causality, knowledge, chronology, and continuity |
| Preference representation | Predict choices in similar contexts |

Every derived artifact must record:

- source IDs and hashes;
- source revision or upstream commit;
- model/algorithm name and version;
- prompt or rubric version when applicable;
- creation time;
- confidence or limitations; and
- invalidation dependencies.

## Evaluation system

Begin with three critics:

1. **Continuity critic** — facts, chronology, causality, and what each character
   can know.
2. **Character critic** — motivation, voice, behavior, and emotional state.
3. **Constitution critic** — project-specific aesthetic alignment and named
   dimension estimates.

Later add narrative, prose, originality, adversarial, reader-simulator, and copy
editing critics.

Critics return structured findings, not rewritten prose:

```json
{
  "critic": "constitution",
  "dimension": "exposition_explicitness",
  "assessment": 0.72,
  "target": [0.15, 0.40],
  "confidence": 0.81,
  "evidence": [
    {
      "source_span": {"start": 1204, "end": 1288},
      "quote": "Short evidence excerpt",
      "reason": "Information already implied by the preceding action is explained."
    }
  ],
  "rule_refs": ["constitution/ambiguity-and-exposition.md#implicit-causality"],
  "recommendation": "Preserve the observable consequence and test removing the explanation."
}
```

Findings without evidence should be labeled weak or insufficient. Blind critics
to model identity, randomize A/B order, occasionally repeat comparisons, and
track agreement with later human decisions by critic, dimension, and scene type.

## Candidate and preference model

Generation produces multiple immutable candidates plus an unchanged control.
The system selects a small Pareto set rather than declaring a universal winner:

- strongest character voice;
- most emotionally effective;
- closest to established project style;
- clearest;
- most original; and
- predicted human preference.

A preference record includes project/scene context, constitution version,
candidate hashes, randomized display order, choice strength, reason tags,
confidence, and optional notes. Start with retrieval of similar past decisions.
Train a Bradley–Terry model or small preference head only after enough genuine
comparisons exist and a held-out set has been established.

## Aesthetic visualization

Build two complementary views:

### Style Constellation

A 2D projection of canonical passages, references, candidates, and rejected
passages. It supports filtering and nearest-neighbor exploration. Its X/Y axes
have no intrinsic literary meaning. It is a discovery map, never a quality map.

### Aesthetic Control Board

Named, understandable project dimensions showing:

- target range;
- current estimate and confidence;
- chapter average;
- previous revision;
- relevant exemplars; and
- intentional scene overrides.

Add a style-drift timeline only after both views trace every point or estimate
back to exact passages and provenance.

## Proposed architecture

Start as a modular monolith:

- **Web:** Next.js, React, TypeScript, Tiptap/ProseMirror.
- **Application/API:** TypeScript modules with explicit domain boundaries.
- **Database:** PostgreSQL and pgvector for metadata, provenance, full-text
  search, and vector retrieval.
- **Workers:** Python for embeddings, stylometry, UMAP, narrative analysis, and
  later preference training.
- **Files:** Git-backed Markdown/YAML/JSON project packages.
- **Validation:** Zod in TypeScript and Pydantic/JSON Schema across the worker
  boundary.
- **Jobs:** a persistent job table/queue with idempotency, retries, and
  observable provenance; avoid premature distributed infrastructure.
- **Visualization:** Observable Plot or a similarly lightweight layer.
- **Collaboration:** Yjs later, after single-writer round-tripping is reliable.

Suggested repository shape:

```text
writers-studio/
├── INIT.md
├── ROADMAP.md
├── AGENTS.md
├── apps/
│   ├── web/
│   └── worker/
├── packages/
│   ├── project-schema/
│   ├── project-kernel/
│   ├── astrans-adapter/
│   ├── model-adapters/
│   ├── evaluation/
│   ├── preferences/
│   └── mcp-server/
├── projects/
│   └── examples/
├── scripts/
├── tests/
│   ├── fixtures/
│   ├── contract/
│   └── roundtrip/
└── .worktrees/              # gitignored upstream checkouts
```

Do not create microservices until runtime or ownership constraints require
them.

## Claude Code and Codex collaboration

Both coding agents should treat the repository files and tests as shared truth.
Create `AGENTS.md` early with these rules:

- read `INIT.md` and the current roadmap milestone before changing architecture;
- search for existing schemas and contracts before inventing new ones;
- preserve project portability and Markdown round-tripping;
- make small, reviewable commits scoped to one roadmap slice;
- never edit imported source snapshots in place;
- never invent Astrans canon to resolve a missing fact;
- keep generated artifacts out of Git unless intentionally used as fixtures;
- use provider-neutral interfaces in core packages;
- attach source provenance to all analysis;
- run the relevant unit, contract, importer, and round-trip tests;
- update architectural decisions when changing a durable contract; and
- leave acceptance of manuscript proposals and constitutional changes to a
  human-authorized operation.

Claude Code and Codex should be able to use the same capabilities through:

1. the application API;
2. a CLI for deterministic local workflows; and
3. an MCP server exposing read/search/propose/evaluate operations.

Initial MCP surface:

```text
get_scene_context(scene_id)
search_canon(query, scope)
get_constitution(scope)
generate_alternatives(scene_id, strategy)
run_critics(revision_id, critic_ids)
compare_candidates(candidate_a, candidate_b)
propose_patch(scene_id, patch)
record_preference(comparison_id, choice, reasons)
```

Do not expose unrestricted "replace canonical manuscript" or "change
constitution" tools to autonomous agents.

## First vertical slice

The first end-to-end slice is deliberately narrow:

1. import Astrans chapters 6, 7, and 8 plus the chapter 7 direction notes;
2. define chapter/scene IDs and source provenance;
3. manually or semi-automatically segment chapter 7 into scenes;
4. build a minimal, human-reviewed five-dimension constitution;
5. edit one scene with lossless Markdown round-tripping;
6. assemble a focused context packet from adjacent scenes, notes, and canon;
7. generate two alternatives plus the unchanged control;
8. run continuity, character, and constitution critics;
9. display evidence-backed findings and a side-by-side diff;
10. record one blind pairwise decision in an append-only log;
11. show canonical passages and candidates in a simple style constellation; and
12. accept a chosen proposal into a local project revision, never directly into
    upstream Astrans.

## Initial engineering sequence

Implement in this order:

1. repository conventions, ADR template, linting, tests, and local development;
2. project package and JSON Schemas;
3. Astrans importer with commit/hash provenance and fixture tests;
4. project loader, validator, scene context builder, and CLI;
5. lossless editor vertical slice;
6. immutable proposal/diff/acceptance model;
7. deterministic text metrics;
8. three structured critics behind model adapters;
9. comparison and preference log;
10. style embeddings and visualization;
11. MCP interface for Claude Code and Codex.

Do not begin preference-model training, real-time collaboration, or a plugin
marketplace before the vertical slice produces trustworthy preference records.

## Definition of done for the foundation

The foundation milestone is complete when:

- a clean clone can start locally from documented commands;
- an Astrans ref can be imported reproducibly and its SHA is visible;
- project data validates against versioned schemas;
- Markdown survives editor load/save without unintended change;
- a scene context packet is inspectable and excludes irrelevant novel content;
- AI generation creates immutable proposals with diffs and provenance;
- all three initial critics return schema-valid, evidence-linked findings;
- a writer can compare candidates blindly and record "A/B/tie/reject both";
- acceptance creates a new local canonical revision with an audit record;
- no process can silently rewrite upstream Astrans;
- tests cover importer fixtures, schema evolution, Markdown round-trip, and the
  proposal lifecycle; and
- README/AGENTS documentation is sufficient for either Claude Code or Codex to
  continue the next roadmap item.

## Non-goals for the first release

- declaring prose objectively good with a single scalar score;
- training a foundation model;
- full online reinforcement learning;
- replacing Git or the upstream Astrans publishing workflow;
- automatic canon invention;
- simultaneous multiplayer editing;
- importing the Astrans game or generated novel website;
- supporting every literary format or genre immediately; and
- optimizing architecture for hypothetical large-scale multi-tenancy.
