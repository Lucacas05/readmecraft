import { getPresetDefinition } from "@/data/presets";
import {
  README_PRESENTATION_LABELS,
  README_SECTION_LABELS,
  README_STRUCTURE_LABELS,
  README_TONE_LABELS,
} from "@/lib/readme-copy";
import { getEnabledSectionKeys, type ReadmeConfig, type ReadmeSectionKey } from "@/types/readme";

const STRUCTURE_GUIDANCE: Record<ReadmeConfig["structure"], string> = {
  lean: "Keep the README tight and essentials-first. Prefer concise sections over long explanations.",
  standard: "Keep the README balanced and practical, with enough context for a first-time reader to get started.",
  expanded: "Use fuller documentation with stronger implementation detail, contributor context, and explicit guidance.",
};

const PRESENTATION_GUIDANCE: Record<ReadmeConfig["presentation"], string> = {
  plain: "Prefer straightforward prose and simple Markdown structure without decorative flourishes.",
  scannable: "Use headings, bullets, and short blocks so the README is easy to skim.",
  showcase: "Lead with impact, highlight outcomes, and make the README feel presentation-forward while staying honest.",
};

const TONE_GUIDANCE: Record<ReadmeConfig["tone"], string> = {
  concise: "Write in a concise tone with direct sentences and minimal filler.",
  professional: "Write in a professional tone that is clear, polished, and practical.",
  technical: "Write in a technical tone that favors specificity, implementation detail, and precise terminology.",
  personal: "Write in a personal tone that feels human and creator-led without inventing facts.",
};

function formatSectionChecklist(sectionKeys: ReadmeSectionKey[]) {
  return sectionKeys.map((sectionKey, index) => `${index + 1}. ${README_SECTION_LABELS[sectionKey]}`).join("\n");
}

export function buildPrompt(config: ReadmeConfig) {
  const enabledSections = getEnabledSectionKeys(config.sections);
  const presetLabel = getPresetDefinition(config.preset).name;

  return [
    "You are working locally inside this repository.",
    "Inspect the codebase, docs, config files, package manifests, tests, and any existing notes before writing the README.",
    "Infer project facts from the repository itself. Do not rely on the user to fill in missing project details unless the repo truly does not contain them.",
    "Do not say this prompt builder analyzed the repository. It only provided style and structure preferences.",
    "",
    "Create or rewrite README.md using the following configuration:",
    `- Preset: ${presetLabel}`,
    `- Tone: ${README_TONE_LABELS[config.tone]}`,
    `- Structure: ${README_STRUCTURE_LABELS[config.structure]}`,
    `- Presentation: ${README_PRESENTATION_LABELS[config.presentation]}`,
    "",
    "Required section order:",
    formatSectionChecklist(enabledSections),
    "",
    "Writing guidance:",
    `- ${TONE_GUIDANCE[config.tone]}`,
    `- ${STRUCTURE_GUIDANCE[config.structure]}`,
    `- ${PRESENTATION_GUIDANCE[config.presentation]}`,
    "- Verify claims against the repository. If a fact is uncertain, inspect more files or keep the wording explicitly tentative.",
    "- Use Markdown that is ready to commit as README.md.",
    "",
    "For each enabled section, prefer repository-derived details over generic filler. If a selected section is unsupported by the repository, keep the section honest and minimal rather than inventing content.",
  ].join("\n");
}
