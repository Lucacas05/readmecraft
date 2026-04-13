import {
  README_PRESENTATION_LABELS,
  README_SECTION_LABELS,
  README_STRUCTURE_LABELS,
  README_TONE_LABELS,
} from "@/lib/readme-copy";
import { getEnabledSectionKeys, type ReadmeConfig, type ReadmeSectionKey } from "@/types/readme";

function buildIntro(config: ReadmeConfig) {
  const intro = [
    "<a id=\"readme-top\"></a>",
    "",
    "<!-- Replace every placeholder in brackets with repository-derived facts. Remove any optional block the repository does not support. -->",
    "",
    "# [Project Name]",
    "",
    `> Write this README in a ${README_TONE_LABELS[config.tone].toLowerCase()} tone with a ${README_STRUCTURE_LABELS[config.structure].toLowerCase()} structure and ${README_PRESENTATION_LABELS[config.presentation].toLowerCase()} presentation. Replace every placeholder with repository-derived facts.`,
    "",
    "[Write a one-sentence summary grounded in the repository.]",
  ];

  if (config.presentation === "showcase") {
    intro.push(
      "",
      "[Add a short showcase-style paragraph that explains what makes the project compelling after inspecting the repo.]",
      "",
      "[Optional: add verified links such as Demo · Docs · Report Bug · Request Feature if the repository clearly supports them.]",
      "",
      "[Optional: add a verified badge row for status, version, platform, build, or license if those signals exist in the repository.]",
    );
  } else if (config.presentation === "scannable") {
    intro.push(
      "",
      "[Add one short supporting sentence about who this project is for or what outcome it enables.]",
      "",
      "[Optional: add verified quick links such as Docs, Demo, Issues, or Releases if the repository clearly supports them.]",
    );
  } else {
    intro.push("", "[Explain who the project is for and what problem it solves after local repo inspection.]");
  }

  return intro;
}

function buildTableOfContents(enabledSections: ReadmeSectionKey[], config: ReadmeConfig) {
  if (config.presentation === "plain" && config.structure === "lean") {
    return [];
  }

  const lines = [
    "<!-- TABLE OF CONTENTS -->",
    "<details>",
    "  <summary>Table of Contents</summary>",
    "  <ol>",
    ...enabledSections.map((sectionKey) => `    <li><a href=\"#${sectionKey}\">${README_SECTION_LABELS[sectionKey]}</a></li>`),
    "  </ol>",
    "</details>",
  ];

  return ["", ...lines];
}

function buildBackToTop(config: ReadmeConfig) {
  if (config.structure === "lean" && config.presentation === "plain") {
    return [];
  }

  return ["", '<p align="right">(<a href="#readme-top">back to top</a>)</p>'];
}

function getSectionPlaceholderLines(sectionKey: ReadmeSectionKey, config: ReadmeConfig) {
  const { structure, presentation } = config;

  switch (sectionKey) {
    case "overview": {
      if (structure === "lean") {
        return [
          "[Write a one-sentence summary grounded in the repository.]",
          "",
          "- [State the primary user, team, or use case confirmed from the repo.]",
          "- [State the main problem solved or outcome delivered.]",
          "- [Mention the primary stack, platform, or runtime only if verified.]",
        ];
      }

      const lines = [
        "[Explain what the project does, who it is for, and why it exists using details confirmed from the repository.]",
        "",
        "### Built With",
        "",
        "- [Primary language, runtime, or platform verified from the repo]",
        "- [Main framework or library verified from the repo]",
        "- [Important tooling, service, or deployment target if relevant]",
      ];

      if (structure === "expanded") {
        lines.splice(
          2,
          0,
          "### Why This Project",
          "",
          "- [Describe the audience or team this project serves.]",
          "- [Describe the core workflow or job-to-be-done it supports.]",
          "- [Describe a differentiator that is clearly backed by the repo.]",
          "",
        );
      }

      if (presentation === "showcase") {
        lines.push("", "[Optional: add one concise proof-point, screenshot note, or product highlight if verified.]");
      }

      return lines;
    }
    case "installation": {
      if (structure === "lean") {
        return [
          "1. [Document clone, install, and setup steps verified from the repo.]",
          "2. [Call out prerequisites, environment setup, or required services.]",
          "3. [End with the first command that gets the project running.]",
        ];
      }

      const lines = [
        "### Prerequisites",
        "",
        "- [List the verified tools, runtimes, package managers, or services required.]",
        "",
        "### Setup",
        "",
        "1. [Clone or obtain the project in the verified way.]",
        "2. [Install dependencies using the real package manager or build tooling.]",
        "3. [Configure required environment variables, secrets, or local services.]",
        "",
        "### Run",
        "",
        "```sh",
        "[Insert the first verified command that starts, builds, or serves the project]",
        "```",
      ];

      if (structure === "expanded") {
        lines.push("", "[Add any seeded data, migrations, workspace setup, or multi-service boot instructions only if verified.]");
      }

      return lines;
    }
    case "usage": {
      if (structure === "lean") {
        return [
          "[Describe the primary workflow using commands, routes, or UI behavior verified from the repo.]",
          "",
          "```sh",
          "[Insert one representative command or invocation]",
          "```",
        ];
      }

      const lines = [
        "### Typical Workflow",
        "",
        "1. [Describe the most common way a user or developer interacts with the project.]",
        "2. [Describe the next meaningful step, screen, route, or command.]",
        "3. [Describe the expected output, result, or artifact.]",
        "",
        "### Example",
        "",
        "```sh",
        "[Insert a concrete example command, route, or interaction sequence verified from the repo]",
        "```",
        "",
        "[Explain what the reader should expect after running the example.]",
      ];

      if (presentation === "showcase") {
        lines.push("", "[Optional: add a short product-style note about the most impressive outcome or flow.]");
      }

      return lines;
    }
    case "features": {
      if (structure === "expanded") {
        return [
          "### Core Capabilities",
          "",
          "- **[Feature name]** — [Explain what it does using verified repository details.]",
          "- **[Feature name]** — [Explain what it does using verified repository details.]",
          "- **[Feature name]** — [Explain what it does using verified repository details.]",
          "",
          "### Notable Details",
          "",
          "- [Highlight an implementation, integration, workflow, or UX detail that stands out.]",
          "- [Highlight a second detail only if it is clearly supported by the repository.]",
        ];
      }

      return [
        "- **[Feature name]** — [Key capability confirmed in code or docs.]",
        "- **[Feature name]** — [Second capability confirmed in code or docs.]",
        "- **[Feature name]** — [Optional standout detail if the repo clearly supports it.]",
      ];
    }
    case "configuration": {
      if (structure === "lean") {
        return [
          "- [Environment variable, config file, CLI flag, or setting found in the repo.]",
          "- [Required value, default, or setup caveat.]",
        ];
      }

      const lines = [
        "| Setting | Required | Default | Notes |",
        "| --- | --- | --- | --- |",
        "| [VAR_OR_OPTION] | [Yes/No] | [value or none] | [What it controls and where it is used] |",
        "| [VAR_OR_OPTION] | [Yes/No] | [value or none] | [What it controls and where it is used] |",
      ];

      if (structure === "expanded") {
        lines.push("", "[Add environment file locations, secret-handling notes, or deployment-specific caveats only if verified.]");
      }

      return lines;
    }
    case "contributing": {
      if (structure === "lean") {
        return [
          "[Explain the contribution flow, setup expectations, and tests using verified repository files.]",
        ];
      }

      const lines = [
        "[Explain who can contribute, what standards matter, and where to look for contribution guidance based on repository files.]",
        "",
        "1. [Describe the verified setup path for contributors.]",
        "2. [Describe the branch, change, or implementation workflow if the repo defines one.]",
        "3. [Describe the tests, linters, or checks contributors should run.]",
        "4. [Describe how to submit changes, issues, or pull requests.]",
      ];

      if (structure === "expanded") {
        lines.push("", "[Add coding standards, review expectations, or release notes workflow only if the repository documents them.]");
      }

      return lines;
    }
    case "license": {
      return [
        "[State the real license after verifying the license file or package metadata.]",
        "",
        "[If relevant, add a short sentence about usage, distribution, or attribution expectations based on the actual license.]",
      ];
    }
    case "screenshots": {
      if (presentation === "showcase") {
        return [
          "[Add verified screenshots, GIFs, or demo stills only if the repository contains or references them.]",
          "",
          "- **[Screenshot name]** — [Explain what the reader is seeing and why it matters.]",
          "- **[Screenshot name]** — [Explain what the reader is seeing and why it matters.]",
        ];
      }

      return [
        "[Add screenshots, demo links, or visual notes only if the repository actually supports them.]",
      ];
    }
  }
}

function formatSection(sectionKey: ReadmeSectionKey, config: ReadmeConfig) {
  return [
    `## ${README_SECTION_LABELS[sectionKey]}`,
    "",
    ...getSectionPlaceholderLines(sectionKey, config),
    ...buildBackToTop(config),
  ].join("\n");
}

export function buildReadmeTemplate(config: ReadmeConfig) {
  const enabledSections = getEnabledSectionKeys(config.sections);

  return [
    ...buildIntro(config),
    ...buildTableOfContents(enabledSections, config),
    "",
    ...enabledSections.flatMap((sectionKey, index) =>
      index === enabledSections.length - 1 ? [formatSection(sectionKey, config)] : [formatSection(sectionKey, config), ""],
    ),
  ]
    .join("\n")
    .trim();
}
