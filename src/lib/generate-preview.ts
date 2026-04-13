import {
  README_PRESENTATION_LABELS,
  README_SECTION_LABELS,
  README_STRUCTURE_LABELS,
  README_TONE_LABELS,
} from "@/lib/readme-copy";
import { getEnabledSectionKeys, type ReadmeConfig, type ReadmeSectionKey } from "@/types/readme";

const SECTION_PLACEHOLDERS: Record<ReadmeSectionKey, string[]> = {
  overview: [
    "[One-sentence summary inferred from the repository goes here.]",
    "[Explain who the project is for and what problem it solves after local repo inspection.]",
  ],
  installation: [
    "1. [Clone or download instructions based on the real repo.]",
    "2. [Install dependencies and setup requirements discovered locally.]",
    "3. [Run the first command that gets the project working.]",
  ],
  usage: [
    "[Describe the main workflow using commands, routes, or UI behavior verified from the repo.]",
    "[Add one example of the most common use case.]",
  ],
  features: [
    "- [Key capability confirmed in code or docs.]",
    "- [Second capability confirmed in code or docs.]",
    "- [Optional standout detail if the repo supports it.]",
  ],
  configuration: [
    "- [Environment variables, flags, or config files found in the repo.]",
    "- [Defaults, required values, or setup caveats.]",
  ],
  contributing: [
    "[Contribution workflow placeholder: setup, standards, and PR guidance based on repository files.]",
  ],
  license: [
    "[License details placeholder — verify the actual license file or package metadata.]",
  ],
  screenshots: [
    "[Screenshot or demo placeholder — add only if the repository provides assets or a UI worth showing.]",
  ],
};

function formatSection(sectionKey: ReadmeSectionKey) {
  return [`## ${README_SECTION_LABELS[sectionKey]}`, ...SECTION_PLACEHOLDERS[sectionKey]].join("\n");
}

export function buildPreview(config: ReadmeConfig) {
  const enabledSections = getEnabledSectionKeys(config.sections);

  return [
    "# [Project Name Placeholder]",
    "",
    `> Illustrative draft aligned to ${README_TONE_LABELS[config.tone].toLowerCase()} tone, ${README_STRUCTURE_LABELS[config.structure].toLowerCase()} structure, and ${README_PRESENTATION_LABELS[config.presentation].toLowerCase()} presentation.`,
    "> Final project facts still come from your local IDE agent after it inspects the repository.",
    "",
    ...enabledSections.flatMap((sectionKey) => [formatSection(sectionKey), ""]),
  ]
    .join("\n")
    .trim();
}
