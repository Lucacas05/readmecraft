# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review. | branch-pr | /Users/lucas/.claude/skills/branch-pr/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature. | issue-creation | /Users/lucas/.claude/skills/issue-creation/SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen". | judgment-day | /Users/lucas/.claude/skills/judgment-day/SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI. | skill-creator | /Users/lucas/.claude/skills/skill-creator/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage. | go-testing | /Users/lucas/.claude/skills/go-testing/SKILL.md |

## Compact Rules

### branch-pr
- Every PR MUST link an approved issue; blank PRs without issue linkage are blocked.
- Add exactly one `type:*` label that matches the change type.
- Use branch names matching `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)/[a-z0-9._-]+$`.
- Use conventional commits: `type(scope): description` or `type: description`.
- Include PR summary bullets, file-change table, and explicit test plan.
- Run `shellcheck` on modified shell scripts before opening the PR.

### issue-creation
- Search existing issues first and use the correct issue template; blank issues are disabled.
- New issues auto-receive `status:needs-review`; maintainers must add `status:approved` before any PR.
- Questions belong in Discussions, not Issues.
- Bug reports must include reproduction steps, expected behavior, and actual behavior.
- Feature requests must describe the problem, proposed solution, and affected area.

### judgment-day
- Run two blind parallel judges against the same target; neither judge should know about the other.
- Resolve project standards from the registry before launching judges whenever possible.
- Treat findings confirmed by both judges as highest confidence.
- Re-judge after fixes only for confirmed CRITICALs; theoretical warnings become INFO.
- After two fix iterations, escalate to the user before continuing.

### skill-creator
- Create skills only for reusable patterns, not one-off tasks or already-documented behavior.
- Use `skills/{skill-name}/SKILL.md` with lowercase hyphenated names.
- Frontmatter must include `name`, `description` with Trigger text, `license`, and `metadata`.
- Put must-follow instructions in critical patterns; keep examples minimal and focused.
- Use `assets/` for templates/schemas and `references/` only for local-doc links.
- Register new skills in the project's agent/convention index when one exists.

### go-testing
- Prefer table-driven tests for functions with multiple cases or error paths.
- Test Bubble Tea state transitions directly through `Model.Update()` when possible.
- Use `teatest.NewTestModel()` for full interactive TUI flows.
- Use golden files for stable view/output assertions.
- Use `t.TempDir()` for filesystem tests and mock side effects behind interfaces.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| — | — | No project-level convention files detected in repository root. |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
