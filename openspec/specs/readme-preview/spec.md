# readme-preview Specification

## Purpose

Define the live placeholder README preview that mirrors configuration choices before real repo details are filled by the local agent.

## Requirements

### Requirement: Config-synchronized preview rendering

The system MUST render a live placeholder README preview from the same shared configuration used for prompt generation. The preview MUST update when selections change and MUST mirror the configured section structure and presentation emphasis.

#### Scenario: Preview stays synchronized

- GIVEN the user changes tone or structure selections
- WHEN the configuration updates
- THEN the preview reflects the latest headings, ordering, and stylistic placeholders
- AND the prompt-template remains aligned with the same configuration

#### Scenario: Placeholder-safe content

- GIVEN the preview is visible
- WHEN it renders README content blocks
- THEN it uses illustrative placeholder content only
- AND it avoids unverified repository-specific claims or invented facts

### Requirement: Preview expectation setting

The system SHOULD label the preview as illustrative so users understand the final README will be produced later by their local IDE agent using repository context.

#### Scenario: Preview is identified as illustrative

- GIVEN the preview panel is displayed
- WHEN the user scans the panel
- THEN the UI includes concise copy that the preview is a placeholder representation
