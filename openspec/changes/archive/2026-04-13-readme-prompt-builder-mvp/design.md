# Design: README Prompt Builder MVP

## Technical Approach

Implement a frontend-only React + Vite + TypeScript SPA from a greenfield repo. A typed `ReadmeConfig` remains the single source of truth for preset/filter state; pure generators still derive both prompt text and placeholder preview. New design direction now hardens the UI architecture: use Tailwind for tokens/utilities, keep a shadcn-compatible component layout (`components/ui`, `lib/utils`), and adapt referenced 21st.dev hero/code-block patterns into a brutalist poster-like system rather than shipping their default SaaS styling.

## 1. Locked Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| App stack | React + Vite + TypeScript | Matches proposal, keeps SPA static-hostable, and fits synchronized local state. |
| Styling system | Tailwind CSS with app-level tokens in `src/styles.css` | Best fit for strong typographic hierarchy, border-heavy utilities, and fast adaptation of referenced components. |
| Component structure | shadcn-compatible paths (`src/components/ui`, `src/lib/utils`) | Keeps 21st.dev imports portable and reduces rewrite friction. |
| State model | Reducer + local context around `ReadmeConfig` | Enough coordination for prompt/preview sync without external store overhead. |
| Output generation | Pure `buildPrompt(config)` and `buildPreview(config)` helpers | Prevents drift and keeps specs testable. |
| Reference component policy | Fork/adapt 21st.dev hero and code block | Required because stock rounded/subtle SaaS defaults conflict with brutalist direction. |

## 2. Visual-System Decisions Now Available

- **Philosophy**: brutalist, typographic, minimal, poster-like; avoid soft dashboard aesthetics.
- **Palette**: warm cream `#f0f0e8`, near-black `#1a1a1a`, forest green `#2d5a2d`, soft green highlight `#7cb87c`.
- **Typography**: headline-first scale with black weights, tight tracking, dramatic contrast between oversized headings and compact support copy.
- **Surfaces**: flat fills, strong 2px borders, square corners, alternating cream/dark sections.
- **Interactions**: direct hover states via fills, underlines, and color swaps; avoid low-contrast opacity-only feedback.
- **Reference mapping**:
  - Animated hero becomes a typographic masthead with restrained motion on rotating words.
  - Code block becomes a bordered artifact panel for prompt output, restyled away from rounded card aesthetics.

## 3. Deferred Design Decisions Waiting for Future Input

- Final font family selection and whether to use a hosted display face or system stack.
- Exact breakpoint behavior for collapsing the poster layout into mobile-first stacked sections.
- Whether the preview should render via `react-markdown` or remain a preformatted markdown artifact.
- Final preset count and whether empty section states are allowed.
- Whether shiki highlighting is worth the bundle cost versus plain monospace prompt rendering.

## Data Flow

```text
Controls -> readme-config reducer -> ReadmeConfig
                                   |-> buildPrompt -> Prompt artifact/code block
                                   \-> buildPreview -> README preview panel
```

## File Changes

| File | Action | Description |
|---|---|---|
| `package.json` | Create | Vite scripts plus React, Tailwind, and likely `lucide-react`, `framer-motion`, `class-variance-authority`, `@radix-ui/react-slot`; `shiki` only if code block keeps syntax highlighting. |
| `src/main.tsx`, `src/App.tsx` | Create | App bootstrap and page composition. |
| `src/styles.css` | Create | Global tokens, Tailwind layers, brutalist primitives. |
| `src/lib/utils.ts` | Create | shadcn-style `cn` helper. |
| `src/components/ui/*` | Create | Adapted button, animated hero, code block primitives. |
| `src/components/configurator/*`, `src/components/output/*` | Create | Form controls and synchronized outputs. |
| `src/state/readme-config.tsx`, `src/lib/generate-*.ts`, `src/types/readme.ts` | Create | Shared state and generators. |

## 4. Impact on Implementation Slices

1. Scaffold Vite + TS + Tailwind + base utility structure before feature work.
2. Establish brutalist tokens/primitives and adapt `Button`, hero, and artifact/code-block shells.
3. Build `ReadmeConfig` reducer, presets, and configurator controls using those primitives.
4. Implement prompt output in the adapted code-block artifact, then copy behavior.
5. Implement synchronized README preview and add reducer/generator/UI sync tests.

## Interfaces / Contracts

`ReadmeConfig` contract stays unchanged from prior design; UI wording may evolve, but generator inputs remain typed config values, not raw labels.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | Prompt/preview generators | Vitest assertions across config permutations. |
| Unit | Reducer + preset application | Ensure valid default state and synchronized section changes. |
| Integration | Adapted UI primitives | Render tests for hero/code-block variants and prompt/preview sync. |

## Migration / Rollout

No migration required. Roll out as a static SPA.

## 5. Risks/Tradeoffs from Tailwind + shadcn-Compatible References

| Risk/Tradeoff | Impact | Mitigation |
|---|---|---|
| Added dependency weight (`framer-motion`, icons, shadcn utilities, maybe `shiki`) | Larger MVP bundle | Keep motion sparse; make `shiki` optional if plain prompt panel is sufficient. |
| Reference aesthetic mismatch | Can drift into generic SaaS UI | Treat 21st.dev code as structural inspiration only; rewrite classes/tokens to brutalist defaults. |
| Greenfield setup overhead | More upfront infra work before feature logic | Make slice 1 exclusively scaffold/tokens so later work stays consistent. |
| Path expectations from copied components | Broken imports if structure differs | Lock shadcn-compatible paths from the start. |

## Open Questions

- [ ] Confirm whether the hero remains on the MVP landing view or collapses into the app header.
- [ ] Confirm if syntax highlighting is necessary for prompt output.
