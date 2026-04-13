# Apply Progress: readme-prompt-builder-mvp

## Batch

- Phase 1 foundation slice
- Phase 2 domain model and shared copy slice
- Phase 3 outputs and UI wiring slice
- Phase 4 verification and test coverage slice
- Phase 4 verification follow-up slice

## Mode

- Standard

## Completed Tasks

- [x] 1.1 Create `package.json`, `tsconfig.json`, `vite.config.ts`, `postcss.config.js`, `tailwind.config.ts`, and `src/main.tsx` for a React + Vite + TypeScript SPA with Tailwind, Vitest, and shadcn-compatible alias/path setup.
- [x] 1.2 Create `src/styles.css`, `src/lib/utils.ts`, and `src/components/ui/button.tsx` with brutalist tokens/utilities (cream/black/green palette, square corners, 2px borders) instead of stock shadcn defaults.
- [x] 1.3 Create `src/components/ui/animated-hero.tsx` and `src/components/ui/code-block.tsx` by adapting the referenced 21st.dev structures into poster-like hero/artifact panels; keep prompt rendering plain monospace first and leave `shiki` optional/deferred.
- [x] 2.1 Create `src/types/readme.ts` and `src/data/presets.ts` with `ReadmeConfig`, section/tone/presentation contracts, and the locked presets: Minimal, Professional, Open Source, and Portfolio.
- [x] 2.2 Create `src/state/readme-config.tsx` with reducer, provider, valid default preset, preset application, and a guard that prevents disabling the last enabled section.
- [x] 2.3 Create `src/lib/readme-copy.ts` with stable UI labels, local-agent disclaimers, and illustrative-preview messaging reused by generators and panels.
- [x] 3.1 Create `src/lib/generate-prompt.ts` and `src/lib/generate-preview.ts` so one `ReadmeConfig` snapshot drives both outputs, requires local repo inspection, and keeps preview content placeholder-safe.
- [x] 3.2 Create `src/components/layout/AppShell.tsx`, `src/components/configurator/PresetPicker.tsx`, `ToneControl.tsx`, `StructureControl.tsx`, `PresentationControl.tsx`, and `SectionToggleList.tsx` using the brutalist UI primitives.
- [x] 3.3 Create `src/components/output/PromptPanel.tsx`, `PreviewPanel.tsx`, and `PreviewNotice.tsx` with copy-ready prompt output, explicit sync/disclaimer copy, and illustrative preview labeling.
- [x] 3.4 Wire `src/App.tsx` so hero/header, configurator, prompt panel, and preview panel stay synchronized on every selection change.
- [x] 4.1 Create `src/lib/__tests__/generate-prompt.test.ts` covering repo-inspection instructions, preset/selection mapping, and no false claim that the app analyzed the repo.
- [x] 4.2 Create `src/lib/__tests__/generate-preview.test.ts` and `src/state/__tests__/readme-config.test.tsx` covering placeholder-only preview content, preset validity, prompt/preview alignment inputs, and the last-section guardrail.
- [x] 4.3 Create `src/components/__tests__/App.test.tsx` verifying first-load disclaimers, control-to-output synchronization, and the adapted brutalist prompt/preview presentation.

## Files Changed

| File | Action | What Was Done |
|---|---|---|
| `package.json` | Created | Added React/Vite/Tailwind/Vitest scripts and the UI dependency baseline. |
| `tsconfig.json` | Created | Enabled strict TypeScript and `@/*` aliasing for shadcn-compatible imports. |
| `vite.config.ts` | Created | Added React plugin, alias resolution, and jsdom Vitest config. |
| `postcss.config.js`, `tailwind.config.ts` | Created | Wired Tailwind with app tokens and content scanning. |
| `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts` | Created / Updated | Added the app bootstrap and switched the landing screen to use shared config state plus chooser-only controls. |
| `src/styles.css` | Created | Defined brutalist palette, typography, poster shells, and core utilities. |
| `src/lib/utils.ts` | Created | Added shadcn-style `cn` helper. |
| `src/components/ui/button.tsx` | Created | Reworked button variants to square, border-heavy brutalist defaults. |
| `src/components/ui/animated-hero.tsx` | Updated | Retuned hero copy to match the chooser-only shared-config flow. |
| `src/components/ui/code-block.tsx` | Created | Adapted the code artifact shell to plain monospace, no `shiki`. |
| `src/types/readme.ts` | Created | Added the shared README config contracts, locked keys, and section helpers. |
| `src/data/presets.ts` | Created | Added the four locked presets and a safe config factory. |
| `src/state/readme-config.tsx` | Created | Added reducer/context state with preset application and last-section guardrail. |
| `src/lib/readme-copy.ts` | Created | Centralized labels plus local-agent and illustrative preview disclaimers. |
| `src/lib/generate-prompt.ts` | Updated | Built the local-agent prompt generator from the shared config snapshot and switched prompt preset output to the human-facing preset label. |
| `src/lib/generate-preview.ts` | Created | Built the placeholder-only preview generator from the shared config snapshot. |
| `src/components/layout/AppShell.tsx` | Created | Extracted the page shell so layout no longer lives inline in `App.tsx`. |
| `src/components/configurator/*.tsx` | Created | Extracted preset, tone, structure, presentation, and section controls into dedicated brutalist configurator components. |
| `src/components/output/*.tsx` | Created | Added prompt, preview, and preview-notice panels with copy support and explicit disclaimer copy. |
| `src/App.tsx` | Updated | Replaced the temporary config snapshot with synchronized configurator, prompt, and preview wiring. |
| `components.json` | Created | Added shadcn-compatible project metadata for future component additions. |
| `src/test/setup.ts` | Created | Registered `@testing-library/jest-dom` matchers for Vitest integration tests. |
| `src/lib/__tests__/generate-prompt.test.ts` | Created | Added generator assertions for repo-inspection language, selection mapping, and chooser-only handoff guarantees. |
| `src/lib/__tests__/generate-preview.test.ts` | Created | Added placeholder-only preview coverage and config-to-preview alignment checks. |
| `src/state/__tests__/readme-config.test.tsx` | Created | Added reducer tests for default preset validity, preset resets, and last-enabled-section guardrails. |
| `src/components/__tests__/App.test.tsx` | Created | Added app-level sync and disclaimer coverage across preset and control changes. |
| `src/components/__tests__/App.test.tsx` | Updated | Added runtime coverage that the chooser-only flow exposes no repo-facts inputs and that copy uses the exact displayed prompt template. |
| `package-lock.json` | Updated | Captured installed Testing Library packages for reproducible validation runs. |
| `package.json`, `vite.config.ts` | Updated | Added Testing Library dependencies and a shared Vitest setup file for DOM assertions. |
| `openspec/changes/readme-prompt-builder-mvp/tasks.md` | Updated | Marked Phase 4 tasks complete. |
| `openspec/changes/readme-prompt-builder-mvp/apply-progress.md` | Updated | Merged cumulative apply progress for Phases 1 through 4. |
| `openspec/changes/readme-prompt-builder-mvp/apply-progress.md` | Updated | Merged the verification follow-up batch into cumulative apply progress without changing task completion state. |

## Validation

- ✅ `npm run typecheck`
- ✅ `npm run build`
- ✅ `npm run test`

## Notes

- Added `index.html`, `components.json`, `src/App.tsx`, and `src/vite-env.d.ts` as minimal wiring so the foundation slice renders coherently.
- Kept prompt rendering plain monospace and deferred syntax highlighting.
- Replaced the temporary shared-config snapshot panel with prompt and preview panels derived from the same `ReadmeConfig` snapshot.
- Added clipboard copy with `navigator.clipboard` first and a `document.execCommand("copy")` fallback for older browser contexts.
- Added Testing Library-powered unit and integration coverage without introducing any backend or repo-fact input path.
- Tightened the prompt generator so preset output now uses the human-facing preset label instead of the internal key.
- Added explicit runtime coverage for the spec's chooser-only constraint by proving the app renders no project-name, description, repo-details, or feature-list inputs.
- Added a runtime clipboard-path assertion that the copied prompt matches the exact `code` block content currently displayed to the user.

## Remaining Tasks

- None.

## Status

13/13 tasks complete. Ready for verify.
