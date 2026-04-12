## Exploration: README Prompt Builder MVP

### Current State
The repository is still a scaffold: `openspec/config.yaml` explicitly says no tech stack, app architecture, or test tooling has been detected, and there are no source files under the project root. That means this change is not constrained by legacy code, but the first implementation choice will define the product structure, developer workflow, and default complexity.

Product-wise, the idea is a README-planning tool rather than a README generator that asks the user for repository facts. The app would let users pick presets and filters for README style, tone, sections, and visual treatment, then output (1) a prompt-template for their local IDE agent to run with full repo context and (2) a live placeholder README preview that reflects those choices.

### Affected Areas
- `openspec/config.yaml` — confirms the repo is currently empty, so framework and testing decisions are greenfield.
- `openspec/changes/readme-prompt-builder-mvp/exploration.md` — stores the exploration artifact for downstream proposal/spec/design work.
- `src/` or `app/` (new) — the eventual UI shell, state model, and prompt/preview generation logic will be introduced here because no application code exists yet.
- `package.json` and frontend tooling files (new) — required once a conservative web stack is chosen.

### Approaches
1. **Vanilla HTML/CSS/JS with small modules** — Serverless-style static app with minimal tooling.
   - Pros: Lowest conceptual overhead, easiest to explain, fastest load time, trivial deployment.
   - Cons: Manual state management, weaker component reuse, preview/preset UI can become messy quickly, harder to scale after MVP.
   - Effort: Low

2. **React + Vite + TypeScript** — Single-page app with local state and simple component composition.
   - Pros: Still conservative, widely understood, easy to explain, good fit for interactive filters + live preview, plenty of simple hosting options.
   - Cons: More setup than vanilla JS, introduces build tooling immediately, TypeScript may add some learning overhead.
   - Effort: Low/Medium

3. **Next.js app router** — Full-stack React framework with routing and server capabilities.
   - Pros: Strong long-term path if the product later adds auth, saved presets, or server-side generation.
   - Cons: Unnecessary complexity for a local-prompt-builder MVP, more concepts to learn, more architectural decisions up front.
   - Effort: Medium

### Recommendation
Recommend **React + Vite**, with either plain JavaScript or light TypeScript depending how strongly the user wants guardrails. It is the simplest explainable option that still fits the product interaction model: a control panel of filters/presets, a generated prompt-template, and a synchronized README preview. Vanilla JS is viable, but the UI is inherently stateful enough that component-based rendering will reduce rework without forcing the team into heavier framework decisions.

### Risks
- The placeholder README preview can drift from the generated prompt-template if both are built from separate logic instead of one shared config model.
- “Visual treatment” is intentionally deferred, so proposal/spec must separate information architecture from final visual design.
- If presets are too granular, the MVP may become a complex README editor instead of a fast chooser-based tool.
- Without repo inputs, the prompt-template must clearly instruct the user's IDE agent to infer project facts from local repository context.
- The boundary between “preview text” and “final generated README” must stay clear so users do not expect the web app itself to inspect repos.

### Ready for Proposal
Yes — the concept is clear enough to propose around a chooser-driven README planning tool, with scope centered on preset selection, prompt-template generation, and synchronized preview. The next phase should lock down the MVP interaction model, recommended stack, and explicit non-goals so the product does not expand into direct README generation or repository analysis.

## Product Framing and Differentiation
- **Core framing**: “README Prompt Builder” is a planning interface for telling an IDE agent how to write a README, not a form that collects repo metadata and not a hosted AI that reads code.
- **Differentiator**: most README tools ask users to manually type project facts; this product instead lets users express presentation intent only, then hands off repo-aware generation to the agent already running inside their local IDE.
- **Positioning**: a low-friction bridge between “I know the README style I want” and “my coding agent already knows the codebase.”
- **Value**: reduces blank-page friction, standardizes README direction, and keeps sensitive repository context local.

## Target Users and Jobs-to-be-Done
- **Indie developers using IDE agents**
  - Job: “Help me quickly tell my agent what kind of README to create without filling out a long brief.”
- **Developers polishing side projects/open source repos**
  - Job: “Give me a better README structure and tone without forcing me to think about sections from scratch.”
- **Small teams with repeatable README expectations**
  - Job: “Let us reuse a consistent README style prompt across projects while leaving code-specific details to local tools.”
- **Non-expert writers shipping technical projects**
  - Job: “Show me what a README might look like as I click options so I can choose confidently.”

## MVP Scope vs Non-Goals
### MVP Scope
- Filter/preset controls for README **style**, **tone**, **section set**, and **visual treatment preference**.
- Real-time generated **prompt-template** for a local IDE agent.
- Real-time **placeholder README preview** driven by the same selections.
- A few opinionated starter presets (for example: minimal OSS, polished SaaS, technical/internal).
- Copy-to-clipboard for prompt-template and possibly preview structure.
- No-auth, single-page web experience.

### Non-Goals
- No direct repository ingestion, git sync, or uploaded code analysis.
- No asking for project name, description, features, or setup steps inside the app.
- No in-browser LLM generation for MVP.
- No multi-user accounts, saved workspaces, or cloud persistence.
- No advanced theming/animation system yet; visual direction comes later.

## UX Model and Key Interactions
- User lands on a single workspace with two coordinated regions:
  - **Control panel**: preset chips + filter groups.
  - **Output panel**: prompt-template and placeholder README preview.
- Selecting a preset initializes all controls to a coherent baseline.
- Toggling filters updates one shared README configuration object.
- That shared object drives:
  - prompt-template text (instructions for the IDE agent), and
  - placeholder preview sections/order/voice hints.
- Key interactions:
  - choose preset,
  - fine-tune tone/style/sections,
  - see preview update instantly,
  - copy prompt-template.
- Helpful UX guardrail: show short helper text that the final README will be produced by the user's local agent using repository context, while this app only defines the brief.

## Technical Approach Options with Tradeoffs
| Option | Pros | Cons | Complexity |
|---|---|---|---|
| Vanilla HTML/CSS/JS | Easiest to understand, lowest tool overhead, static deploy | State and UI composition become manual fast | Low |
| React + Vite | Best simplicity/flexibility balance, component-based preview UI, easy local state | Introduces bundler and framework concepts | Low/Medium |
| Next.js | Good future path for auth/storage/server features | Overbuilt for MVP, more concepts than needed | Medium |

**Simplicity-first recommendation**: start with **React + Vite** and keep architecture shallow:
- local component state or a tiny central config object,
- pure functions to map selections → prompt text and preview blocks,
- static hosting,
- no backend.

## Risks / Open Questions
- Should the initial implementation use plain JavaScript or TypeScript for best user comprehension?
- Which filter dimensions are required for MVP versus nice-to-have? (Too many controls will reduce clarity.)
- How opinionated should presets be, and how many are enough to feel useful without becoming a template catalog?
- How literal should the preview be? It should demonstrate structure and tone direction without pretending to know repo facts.
- Should “visual treatment” in MVP mean textual guidance only (for example “badge-heavy”, “clean/minimal”), or actual styled preview chrome?
- Does the product need mobile support from day one, or is desktop-primary acceptable for the first cut?
