# Tasks: README Prompt Builder MVP

## Phase 1: Setup and design system

- [x] 1.1 Create `package.json`, `tsconfig.json`, `vite.config.ts`, `postcss.config.js`, `tailwind.config.ts`, and `src/main.tsx` for a React + Vite + TypeScript SPA with Tailwind, Vitest, and shadcn-compatible alias/path setup.
- [x] 1.2 Create `src/styles.css`, `src/lib/utils.ts`, and `src/components/ui/button.tsx` with brutalist tokens/utilities (cream/black/green palette, square corners, 2px borders) instead of stock shadcn defaults.
- [x] 1.3 Create `src/components/ui/animated-hero.tsx` and `src/components/ui/code-block.tsx` by adapting the referenced 21st.dev structures into poster-like hero/artifact panels; keep prompt rendering plain monospace first and leave `shiki` optional/deferred.

## Phase 2: Domain model and shared copy

- [x] 2.1 Create `src/types/readme.ts` and `src/data/presets.ts` with `ReadmeConfig`, section/tone/presentation contracts, and the locked presets: Minimal, Professional, Open Source, and Portfolio.
- [x] 2.2 Create `src/state/readme-config.tsx` with reducer, provider, valid default preset, preset application, and a guard that prevents disabling the last enabled section.
- [x] 2.3 Create `src/lib/readme-copy.ts` with stable UI labels, local-agent disclaimers, and illustrative-preview messaging reused by generators and panels.

## Phase 3: Outputs and UI wiring

- [x] 3.1 Create `src/lib/generate-prompt.ts` and `src/lib/generate-preview.ts` so one `ReadmeConfig` snapshot drives both outputs, requires local repo inspection, and keeps preview content placeholder-safe.
- [x] 3.2 Create `src/components/layout/AppShell.tsx`, `src/components/configurator/PresetPicker.tsx`, `ToneControl.tsx`, `StructureControl.tsx`, `PresentationControl.tsx`, and `SectionToggleList.tsx` using the brutalist UI primitives.
- [x] 3.3 Create `src/components/output/PromptPanel.tsx`, `PreviewPanel.tsx`, and `PreviewNotice.tsx` with copy-ready prompt output, explicit sync/disclaimer copy, and illustrative preview labeling.
- [x] 3.4 Wire `src/App.tsx` so hero/header, configurator, prompt panel, and preview panel stay synchronized on every selection change.

## Phase 4: Verification

- [ ] 4.1 Create `src/lib/__tests__/generate-prompt.test.ts` covering repo-inspection instructions, preset/selection mapping, and no false claim that the app analyzed the repo.
- [ ] 4.2 Create `src/lib/__tests__/generate-preview.test.ts` and `src/state/__tests__/readme-config.test.tsx` covering placeholder-only preview content, preset validity, prompt/preview alignment inputs, and the last-section guardrail.
- [ ] 4.3 Create `src/components/__tests__/App.test.tsx` verifying first-load disclaimers, control-to-output synchronization, and the adapted brutalist prompt/preview presentation.
