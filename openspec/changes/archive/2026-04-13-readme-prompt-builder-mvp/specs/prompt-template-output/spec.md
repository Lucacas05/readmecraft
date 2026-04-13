# prompt-template-output Specification

## Purpose

Define the generated prompt-template that a user copies into a local IDE agent to create the real README from repository context.

## Requirements

### Requirement: Repo-aware prompt-template generation

The system MUST generate prompt text from the shared README configuration. The prompt-template MUST instruct the local IDE agent to inspect the repository locally, infer project details from code and docs, and produce a README matching the selected tone, structure, and presentation preferences.

#### Scenario: Generate configured prompt-template

- GIVEN the user has a valid README configuration
- WHEN the prompt output is shown
- THEN the template includes instructions to inspect local repo context
- AND the template reflects the currently selected tone, section order, and presentation style

#### Scenario: Prevent unsupported data collection

- GIVEN the prompt-template is generated
- WHEN the user reads it
- THEN it does not claim the app analyzed the repository
- AND it does not require user-entered project facts to be complete

### Requirement: Copy-ready output

The system SHOULD present the prompt-template in a copyable format and MUST allow the user to copy the full current template without manual cleanup.

#### Scenario: Copy current template

- GIVEN the latest prompt-template is visible
- WHEN the user activates copy
- THEN the copied text matches the currently displayed template
