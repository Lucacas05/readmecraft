# Proposal: README Prompt Builder MVP

## Intent

Developers using local IDE agents still face a blank page when deciding README tone, structure, and polish. The opportunity is a simple chooser-based app that turns style selections into a reusable prompt-template plus a synchronized placeholder preview, without collecting repo facts or sending code anywhere.

## Scope

### In Scope
- Single-page UI for preset and filter selection covering README tone, structure, and presentation preferences.
- Generated prompt-template instructing a local IDE agent to inspect the repository and fill in project-specific details.
- Live placeholder README preview driven by the same shared configuration model.
- Copy-to-clipboard for the prompt-template and a small set of opinionated starter presets.

### Out of Scope
- Direct repo ingestion, uploads, git integration, or in-browser AI generation.
- Asking users for project-specific facts.
- Accounts, saved presets, backend services, or finalized visual identity/theming.

## Capabilities

### New Capabilities
- `readme-configurator`: Configure README intent through presets and filters without entering repository facts.
- `prompt-template-output`: Generate a repo-aware prompt-template for the user's local IDE agent.
- `readme-preview`: Render a live placeholder README preview from the same config object.

### Modified Capabilities
- None.

## Approach

Start with React + Vite and keep the architecture shallow: local UI state, a shared README configuration object, and pure mapping functions from selections to prompt text and preview blocks. This best fits the interactive MVP while staying understandable, static-hostable, and lighter than Next.js; it also avoids the UI sprawl likely with vanilla JS.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `package.json` | New | Frontend scripts and dependencies |
| `src/` | New | App shell, controls, outputs, shared state |
| `src/lib/` | New | Prompt + preview generation helpers |
| `openspec/changes/readme-prompt-builder-mvp/proposal.md` | New | Proposal artifact |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Prompt and preview drift | Med | Generate both from one shared config model |
| Too many controls for MVP | Med | Limit filters and start with few presets |
| Users expect repo analysis in app | Med | Add explicit helper copy about local-agent handoff |

## Rollback Plan

Revert the new frontend scaffold and generated files, leaving only SDD artifacts. Because MVP starts with no backend or repo integration, rollback is limited to removing the static app surface.

## Dependencies

- React + Vite frontend scaffold
- Static hosting target (later)

## Success Criteria

- [ ] Users can choose a preset and refine README options without entering project facts.
- [ ] The app always outputs a prompt-template that tells the local IDE agent to infer repo details from local context.
- [ ] Preview and prompt stay synchronized from one shared configuration source.
- [ ] MVP remains frontend-only, understandable, and deployable without backend infrastructure.
