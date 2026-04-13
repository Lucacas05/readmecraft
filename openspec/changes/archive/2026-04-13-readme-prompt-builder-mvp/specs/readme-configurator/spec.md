# readme-configurator Specification

## Purpose

Define the chooser-based MVP flow for configuring README style without collecting repository facts.

## Requirements

### Requirement: Selection-driven README configuration

The system MUST provide a single-page configurator with starter presets and preset/filter controls for README tone, structure, and presentation. The system MUST NOT require or request project-specific facts in the UI.

#### Scenario: Configure from a starter preset

- GIVEN the user opens the app
- WHEN the user selects a starter preset and adjusts one or more filters
- THEN the shared README configuration updates to reflect those selections
- AND the prompt output and preview use the updated configuration

#### Scenario: No repo-facts input path

- GIVEN the user is using the configurator
- WHEN the user reviews available controls
- THEN the UI only exposes preset/filter choices
- AND no form field asks for repository details, summaries, or feature lists

### Requirement: Guided MVP usability

The system SHOULD start from a valid default preset, keep all visible selections in a valid state, and present helper copy that explains the app creates instructions for a local IDE agent rather than analyzing the repository itself.

#### Scenario: First-load clarity

- GIVEN the user opens the app for the first time
- WHEN the initial screen renders
- THEN one preset is already active with valid defaults
- AND helper text explains the local-agent handoff
