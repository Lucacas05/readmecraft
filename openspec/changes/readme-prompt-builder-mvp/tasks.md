# Tasks: README Prompt Builder MVP

## Phase 1: Setup and foundation

- [ ] 1.1 Create `package.json`, `tsconfig.json`, and `vite.config.ts` for a React + Vite + TypeScript SPA with Vitest and React Testing Library.
- [ ] 1.2 Create `src/main.tsx`, `src/App.tsx`, and `src/styles.css` with a minimal app bootstrap and deferred visual identity styling.
- [ ] 1.3 Create `src/types/readme.ts` for `ReadmeConfig`, enums/unions, output contracts, and section keys used across UI and generators.

## Phase 2: Domain model and state

- [ ] 2.1 Create `src/data/presets.ts` with the four locked MVP presets: Minimal, Professional, Open Source, and Portfolio.
- [ ] 2.2 Create `src/state/readme-config.tsx` with reducer, provider, defaults, preset application, and a guard that prevents disabling the last enabled section.
- [ ] 2.3 Add config-to-label/helper mappings in `src/lib/readme-copy.ts` so generator wording stays stable if UI labels change.

## Phase 3: UI and interaction wiring

- [ ] 3.1 Create `src/components/layout/AppShell.tsx` with header copy explaining the local-agent handoff and a responsive configurator/output layout.
- [ ] 3.2 Create `src/components/configurator/PresetPicker.tsx`, `ToneControl.tsx`, `StructureControl.tsx`, and `PresentationControl.tsx` bound to reducer actions.
- [ ] 3.3 Create `src/components/configurator/SectionToggleList.tsx` and `PreviewNotice.tsx` with at-least-one-section validation and illustrative-preview messaging.
- [ ] 3.4 Wire the full page composition in `src/App.tsx` so control changes recompute both outputs from one config snapshot.

## Phase 4: Prompt and preview outputs

- [ ] 4.1 Create `src/lib/generate-prompt.ts` to build a copy-ready template that instructs the IDE agent to inspect the local repo, infer facts, and avoid fabrication.
- [ ] 4.2 Create `src/components/output/PromptPanel.tsx` with rendered prompt text and clipboard copy for the current template.
- [ ] 4.3 Create `src/lib/generate-preview.ts` to build placeholder-safe markdown reflecting selected order, sections, tone, and presentation.
- [ ] 4.4 Create `src/components/output/PreviewPanel.tsx` to render the illustrative README preview and keep it synchronized with the prompt output.

## Phase 5: Verification

- [ ] 5.1 Create `src/lib/__tests__/generate-prompt.test.ts` covering repo-inspection instructions, selection mapping, and no user-fact collection claims.
- [ ] 5.2 Create `src/lib/__tests__/generate-preview.test.ts` covering placeholder-only content, section ordering, and preview/prompt alignment inputs.
- [ ] 5.3 Create `src/state/__tests__/readme-config.test.tsx` covering default preset validity, preset merges, and the last-section guardrail.
- [ ] 5.4 Create `src/components/__tests__/App.test.tsx` verifying one control change updates both panels and helper copy/labels appear on first load.
