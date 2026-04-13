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
  enabledLabel: "Enabled",
  disabledLabel: "Disabled",
  sectionOrderLabel: "Enabled section order",
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
  promptSync:
    "Copy this prompt into your local IDE agent. It tells the agent to inspect the repo before drafting README content.",
  previewSync:
    "This preview mirrors the same chooser state as the prompt, but it remains a placeholder-only sketch.",
  previewBadge: "Illustrative preview only",
  previewLabel:
    "Placeholder README layout. Final project facts still come from your local IDE agent's repository inspection.",
} as const;

export const README_PANEL_COPY = {
  configuratorTitle: "Choose the README direction",
  configuratorDescription:
    "Adjust the same shared config object that drives both the agent prompt and the illustrative preview.",
  promptTitle: "Prompt for your local IDE agent",
  promptEyebrow: "Copy-ready output",
  promptAction: "Copy prompt",
  promptActionDone: "Copied",
  promptFallbackAction: "Copy manually",
  previewTitle: "Illustrative README preview",
  previewEyebrow: "Placeholder output",
} as const;
