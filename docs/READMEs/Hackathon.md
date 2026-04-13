<p align="center">
  <img src="src/main/sources/ico800x800.svg" alt="SabeloTODO logo" width="200" height="200" />
</p>

<div align="center" style="position: relative;">
  <h1 style="margin: 0; display: inline-block;">SabeloTODO</h1>
  <img
    src="./docs/kodee-thinking.gif"
    alt="Kodee thinking"
    width="52"
    height="52"
    style="position: absolute; margin-left: 8px; top: 8px;"
  />
</div>

<p align="center">
    <strong>
        IntelliJ IDEA TODO intelligence for teams that want visible, actionable technical debt.
    </strong>
</p>

<p align="center">
  SabeloTODO is a Kotlin-based LivePlugin for IntelliJ IDEA that tracks TODO and FIXME comments,
  enriches them with Git metadata, scores their urgency, and turns scattered code annotations into a
  dashboard-driven workflow with issue integration.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-In%20Development-2563eb?style=for-the-badge" alt="Status: In Development" />
  <img src="https://img.shields.io/badge/Stack-Kotlin%20%7C%20IntelliJ%20IDEA%20%7C%20LivePlugin-7c3aed?style=for-the-badge" alt="Stack: Kotlin | IntelliJ IDEA | LivePlugin" />
  <img src="https://img.shields.io/badge/License-MIT-059669?style=for-the-badge" alt="License: MIT" />
</p>

---

## Overview

SabeloTODO is an IntelliJ IDEA plugin focused on making technical debt visible inside the editor. It detects `TODO` and `FIXME` comments, enriches them with Git context, calculates a priority score, and surfaces the result in an interactive dashboard so teams can review, filter, and act on pending work faster.

The plugin is built for repositories where code comments should be more than passive notes. By combining source analysis, ownership signals, aging data, and issue tracking hooks, it gives teams a practical way to manage unresolved work directly from the IDE.

---

## What it looks like

<table>
  <tr>
    <td align="center">
      <img src="docs/screenshots/dashboard.png" alt="Main Dashboard" width="260"/><br/>
      <sub><b>Dashboard</b> — TODOs &amp; FIXMEs ranked by priority score</sub>
    </td>
    <td align="center">
      <img src="docs/screenshots/ai-assistant.png" alt="AI Assistant" width="260"/><br/>
      <sub><b>AI Assistant</b> — contextual fix suggestions powered by Kodee</sub>
    </td>
    <td align="center">
      <img src="docs/screenshots/detail-view.png" alt="Detail View" width="260"/><br/>
      <sub><b>Detail View</b> — proposed fix, diff, and validation checklist</sub>
    </td>
  </tr>
</table>


---

## Core Features

### Smart Comment Tracking

- Detects `TODO` and `FIXME` comments using IntelliJ's internal `PsiTodoSearchHelper`.
- Refreshes tracked records automatically when files are saved or the active Git branch changes.
- Keeps unresolved code comments visible without requiring a separate manual audit.

### Git-Aware Context

- Captures the active branch, last author, and modification date for each tracked line.
- Builds a 5-line code preview around every comment for quick triage.
- Identifies the surrounding code structure, such as the containing class or method.
- Attributes unsaved edits to a virtual author named `Local Changes`.

### Dashboard and Metrics

- Presents results in a dedicated IntelliJ tool window.
- Sorts items by priority score by default.
- Supports filtering by text, author, age range, and external task status.
- Includes a detail panel with code preview and score breakdown.
- Highlights project metrics, including the oldest unresolved comment owners.

### Issue Integration

- Persists shared tracking data in `.todo-tracker.json` at the repository root.
- Creates GitHub or GitLab issues directly from the editor.
- Embeds generated ticket IDs such as `#123` back into comments and exposes them as clickable links.

---

## Priority Scoring

Each tracked comment receives a dynamic score based on the following model:

$$
\text{Score} = (F + T + M) \times S \times I
$$

Where:
- `F` is the type factor: `FIXME` adds 20 points and `TODO` adds 0.
- `T` is the time factor: `D x 0.5`, where `D` is the number of days since the line was last modified.
- `M` is the branch impact: comments on the main branch add 10 points.
- `S` is the scope multiplier: urgency is reduced to `0.7` for testing or documentation folders.
- `I` is the integration multiplier: urgency is reduced to `0.5` when the comment already links to an external task.

This score is recalculated whenever the IDE starts so prioritization stays current and the dashboard reflects the most relevant items first.

---

## Architecture

The plugin is designed to stay responsive inside the IDE while working with repository data and external systems.

- Scanning, Git lookups, and network calls run in background jobs to avoid blocking the UI.
- Indexing and loading states are handled defensively to reduce crashes and noisy failures.
- `.todo-tracker.json` is rewritten only when code changes or the active branch changes.
- GitHub and GitLab credentials are stored in the IntelliJ secure vault rather than plain text.

```
  File saved / Branch changed
          │
          ▼
  ┌───────────────────────┐
  │   TodoProjectScanner  │  ← PSI scan + file paths
  └──────────┬────────────┘
             │
             ▼
  ┌───────────────────────┐
  │    Git Blame Layer    │  ← author, date, branch
  └──────────┬────────────┘
             │
             ▼
  ┌───────────────────────┐
  │    ScoreCalculator    │  ← (F + T + M) × S × I
  └──────────┬────────────┘
             │
             ▼
  ┌───────────────────────┐     ┌─────────────────────┐
  │   Dashboard (Swing)   │────▶│  .todo-tracker.json │
  └───────────────────────┘     └─────────────────────┘
             │
             ▼
  ┌───────────────────────┐
  │   GitHub / GitLab     │  ← issue creation via API
  └───────────────────────┘
```

---

## Toolbar Actions

The tool window is centered around quick, high-value actions:

- `Refresh` to reload tracked data on demand.
- `Jump to Source` to open the exact comment location in the editor.
- `Copy Link` to copy the external issue reference.
- `Create Issue` to create a remote task without leaving IntelliJ IDEA.
- `Solve` to get an AI-assisted fix suggestion for the selected item.

---

## Installation

### Option A — Install from `.zip` (recommended)

This is the easiest way to get up and running without building from source.

1. Download `todo-tracker-liveplugin-1.0-SNAPSHOT.zip` from the [Releases](../../releases) page.
2. Open IntelliJ IDEA and go to **Settings → Plugins**.
3. Click the **⚙ gear icon** → **Install Plugin from Disk…**

   <p align="center">
     <img src="docs/screenshots/install-from-disk.png" alt="Install Plugin from Disk" width="480"/>
   </p>

4. Select the downloaded `.zip` file and confirm.
5. **Restart IntelliJ IDEA** when prompted.
6. The **SabeloTODO** tool window will appear under **View → Tool Windows → SabeloTODO**.

### Option B — Run from source via LivePlugin

1. Install the [LivePlugin](https://plugins.jetbrains.com/plugin/7282-liveplugin) plugin in IntelliJ IDEA.
2. Clone this repository into the LivePlugin directory:

   ```bash
   git clone https://github.com/<your-org>/SabeloTODO \
     ~/Library/Application\ Support/JetBrains/IntelliJIdea2026.1/live-plugins/SabeloTODO
   ```

3. In IntelliJ IDEA open the **LivePlugins** panel, locate `plugin.kts`, and press **▶ Run Plugin**.

### Optional — GitHub / GitLab integration

1. Open the tool window: **View → Tool Windows → SabeloTODO**
2. Click the **⚙** icon and enter your GitHub or GitLab personal access token.
3. Tokens are stored in the IntelliJ **PasswordSafe** vault — never in plain text or version control.

---

## Acknowledgements

- JetBrains for the opportunity to build this project during the hackathon.
- The IntelliJ Platform and LivePlugin ecosystem for enabling rapid plugin experimentation in Kotlin.

<p align="center">
  <br/>
  <img src="src/main/sources/kodee love.png" alt="Kodee loves SabeloTODO" height="64" />
  <br/>
  <sub>Built with love for the JetBrains Hackathon · Powered by IntelliJ Platform · LivePlugin · Kotlin 2.3</sub>
</p>