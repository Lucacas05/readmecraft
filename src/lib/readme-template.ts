import {
  README_PRESENTATION_LABELS,
  README_SECTION_LABELS,
  README_STRUCTURE_LABELS,
  README_TONE_LABELS,
} from "@/lib/readme-copy";
import { getEnabledSectionKeys, type ReadmeConfig, type ReadmeSectionKey } from "@/types/readme";

const SECTION_PLACEHOLDERS: Record<ReadmeSectionKey, string[]> = {
  overview: [
    "[Write a one-sentence summary grounded in the repository.]",
    "[Explain who the project is for and what problem it solves after local repo inspection.]",
  ],
  installation: [
    "1. [Document clone, install, and setup steps verified from the repo.]",
    "2. [Call out prerequisites, environment setup, or required services.]",
    "3. [End with the first command that gets the project running.]",
  ],
  usage: [
    "[Describe the primary workflow using commands, routes, or UI behavior verified from the repo.]",
    "[Add one concrete example of the most common use case.]",
  ],
  features: [
    "- [Key capability confirmed in code or docs.]",
    "- [Second capability confirmed in code or docs.]",
    "- [Optional standout detail if the repo clearly supports it.]",
  ],
  configuration: [
    "- [Environment variables, flags, or config files found in the repo.]",
    "- [Defaults, required values, or setup caveats.]",
  ],
  contributing: [
    "[Explain setup, standards, testing expectations, and contribution flow based on repository files.]",
  ],
  license: [
    "[State the real license after verifying the license file or package metadata.]",
  ],
  screenshots: [
    "[Add screenshots, demo links, or visual notes only if the repository actually supports them.]",
  ],
};

function formatSection(sectionKey: ReadmeSectionKey) {
  return [`## ${README_SECTION_LABELS[sectionKey]}`, ...SECTION_PLACEHOLDERS[sectionKey]].join("\n");
}

export function buildReadmeTemplate(config: ReadmeConfig) {
  const enabledSections = getEnabledSectionKeys(config.sections);

  return [
    "# [Project Name]",
    "",
    `> Write this README in a ${README_TONE_LABELS[config.tone].toLowerCase()} tone with a ${README_STRUCTURE_LABELS[config.structure].toLowerCase()} structure and ${README_PRESENTATION_LABELS[config.presentation].toLowerCase()} presentation. Replace every placeholder with repository-derived facts.`,
    "",
    ...enabledSections.flatMap((sectionKey) => [formatSection(sectionKey), ""]),
  ]
    .join("\n")
    .trim();
}
