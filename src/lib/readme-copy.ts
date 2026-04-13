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
  handoffLabel: "Unified local agent handoff",
  enabledLabel: "Enabled",
  disabledLabel: "Disabled",
  sectionOrderLabel: "Enabled section order",
} as const;

export const README_DISCLAIMER_COPY = {
  configurator:
    "This MVP chooses structure and style. Your local IDE agent still inspects the repository and fills the README.",
  prompt:
    "The copied handoff tells the local IDE agent to inspect the repository, then create or update README.md using the embedded template.",
  promptSync:
    "Copy this unified handoff into your local IDE agent. It includes both the repository-inspection instructions and the README template to complete.",
  sharedConfig:
    "One copy now contains the instructions and the README template generated from this same shared config.",
} as const;

export const README_PANEL_COPY = {
  configuratorTitle: "Choose the README direction",
  configuratorDescription:
    "Adjust the shared config that shapes the agent instructions and the embedded README.md template.",
  promptTitle: "Unified handoff for your local IDE agent",
  promptEyebrow: "Instructions + template",
  promptAction: "Copy handoff",
  promptActionDone: "Copied",
  promptFallbackAction: "Copy manually",
  promptExpandAction: "See more",
  promptCollapseAction: "See less",
} as const;
