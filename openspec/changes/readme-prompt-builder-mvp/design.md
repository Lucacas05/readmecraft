# Design: README Prompt Builder MVP

## Technical Approach

Build a frontend-only React + Vite + TypeScript SPA. One typed `ReadmeConfig` object is the source of truth; pure generators derive both the copyable prompt-template and the illustrative README preview from that config. This matches the proposal’s shallow architecture, keeps the MVP static-hostable, and avoids any backend or repo-ingestion path.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| App stack | React+Vite, Next.js, vanilla JS | React + Vite + TS | Best fit for interactive local state, fastest scaffold, no SSR/backend need, more maintainable than vanilla for synchronized panels. |
| State shape | Scattered component state, reducer/context, external store | Reducer + local app context | Enough structure for synchronized outputs without introducing Zustand/Redux overhead. |
| Output generation | Template strings in UI, shared generators | Shared pure generators in `src/lib/` | Prevents prompt/preview drift and makes testing deterministic. |
| Preview fidelity | Rich markdown renderer, simple placeholder blocks | Simple markdown string + renderer | Close enough to final README shape while remaining easy to reason about. |

## Data Flow

```text
Preset/filter controls -> config reducer -> ReadmeConfig
                                   |-> buildPrompt(config) -> prompt panel/copy
                                   \-> buildPreview(config) -> preview panel
```

Sequence:

```text
User selects preset
  -> reducer merges preset defaults into config
  -> derived selectors recompute prompt + preview
  -> output panels rerender from same config snapshot
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Create | Vite scripts and runtime/dev dependencies |
| `tsconfig.json` | Create | TypeScript config for app + tests |
| `vite.config.ts` | Create | Vite app config |
| `src/main.tsx` | Create | App entry point |
| `src/App.tsx` | Create | Page composition and provider wiring |
| `src/styles.css` | Create | Minimal layout styling; visual identity deferred |
| `src/types/readme.ts` | Create | Domain types for config, presets, outputs |
| `src/data/presets.ts` | Create | Opinionated preset definitions |
| `src/state/readme-config.tsx` | Create | Reducer, defaults, context/hooks |
| `src/lib/generate-prompt.ts` | Create | Prompt-template generator |
| `src/lib/generate-preview.ts` | Create | Placeholder README generator |
| `src/components/configurator/*` | Create | Preset picker and filter controls |
| `src/components/output/PromptPanel.tsx` | Create | Copy-ready prompt display |
| `src/components/output/PreviewPanel.tsx` | Create | Live illustrative preview |
| `src/components/layout/AppShell.tsx` | Create | Two-panel responsive layout |
| `src/lib/__tests__/*.test.ts` | Create | Generator/reducer tests |

## Interfaces / Contracts

```ts
type Tone = 'professional' | 'friendly' | 'technical';
type StructurePreset = 'standard' | 'minimal' | 'deep-dive';
type PresentationStyle = 'concise' | 'balanced' | 'showcase';
type SectionKey = 'overview' | 'installation' | 'usage' | 'features' | 'architecture' | 'contributing' | 'faq';

interface ReadmeConfig {
  presetId: string;
  tone: Tone;
  structure: StructurePreset;
  presentation: PresentationStyle;
  sections: SectionKey[];
  includeToc: boolean;
  includeFaq: boolean;
  emphasis: 'clarity' | 'adoption' | 'engineering-depth';
}
```

Generators accept only `ReadmeConfig` and return strings:
- `buildPrompt(config): string`
- `buildPreview(config): string`

## UI Structure

- `AppShell`
  - `Header` (app purpose + local-agent disclaimer)
  - `ConfiguratorPanel`
    - `PresetPicker`
    - `ToneControl`
    - `StructureControl`
    - `PresentationControl`
    - `SectionToggleList`
    - `PreviewNotice`
  - `OutputPanelGroup`
    - `PromptPanel`
    - `PreviewPanel`

## Prompt-template Generation Approach

Use a fixed instruction skeleton with interpolated config-derived directives. The template explicitly tells the IDE agent to inspect the local repository, infer facts from code/docs, avoid fabricating missing details, and write sections in the selected order/tone. Config values should map to normalized instruction phrases rather than raw labels so future UI wording changes do not affect prompt quality.

## Preview Generation Approach

Generate markdown placeholder content from the same config and section list. Each section uses safe illustrative text such as `[Project overview inferred by your IDE agent]` or `[Usage example based on repository commands]`. A small banner above the preview states it is illustrative and not repo-aware.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Prompt/preview generators | Vitest snapshot/string assertions by config permutation |
| Unit | Reducer validity | Reducer tests for preset application and section toggles |
| Integration | App synchronization | React Testing Library render: one change updates both panels |
| E2E | Deferred | Add only after MVP stabilizes |

## Migration / Rollout

No migration required. Roll out as a static SPA with no feature flags.

## Initial Implementation Slices

1. Scaffold Vite/React/TS and minimal app shell.
2. Add typed config model, presets, reducer, and helper copy.
3. Implement prompt generator + prompt panel + copy action.
4. Implement preview generator + preview panel.
5. Add synchronization tests and light responsive polish.

## Open Questions

- [ ] Confirm exact MVP preset count (recommend 3).
- [ ] Decide whether section toggles should allow invalid empty states or enforce one required section.
- [ ] Choose markdown renderer (`react-markdown`) versus plain preformatted output; default is simple renderer.
