import type {
  ReadmePresentationKey,
  ReadmeSectionKey,
  ReadmeStructureKey,
  ReadmeToneKey,
} from "@/types/readme";

export const README_TONE_LABELS: Record<ReadmeToneKey, string> = {
  concise: "Concise",
  professional: "Professional",
  technical: "Technical",
  personal: "Personal",
};

export const README_STRUCTURE_LABELS: Record<ReadmeStructureKey, string> = {
  lean: "Lean",
  standard: "Standard",
  expanded: "Expanded",
};

export const README_PRESENTATION_LABELS: Record<ReadmePresentationKey, string> = {
  plain: "Plain",
  scannable: "Scannable",
  showcase: "Showcase",
};

export const README_SECTION_LABELS: Record<ReadmeSectionKey, string> = {
  overview: "Overview",
  installation: "Installation",
  usage: "Usage",
  features: "Features",
  configuration: "Configuration",
  contributing: "Contributing",
  license: "License",
  screenshots: "Screenshots",
};

export const README_CONTROL_COPY = {
  presetHeading: "Start from a locked preset",
  toneHeading: "Tone",
  structureHeading: "Structure",
  presentationHeading: "Presentation",
  sectionsHeading: "Sections",
  guardrailLabel: "At least one section stays enabled.",
  handoffLabel: "Local agent handoff",
} as const;

export const README_DISCLAIMER_COPY = {
  configurator:
    "This MVP only chooses structure and style. Your local IDE agent inspects the repository later.",
  prompt:
    "Prompt output will instruct the local IDE agent to inspect the repository before writing the final README.",
  preview:
    "Preview content stays illustrative. It never claims this app already analyzed your repository.",
  sharedConfig:
    "Prompt and preview stay aligned because they will read from this same shared config object.",
} as const;
