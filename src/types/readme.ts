export const README_PRESET_KEYS = [
  "minimal",
  "professional",
  "open-source",
  "portfolio",
] as const;

export const README_TONE_KEYS = [
  "concise",
  "professional",
  "technical",
  "personal",
] as const;

export const README_STRUCTURE_KEYS = ["lean", "standard", "expanded"] as const;

export const README_PRESENTATION_KEYS = [
  "plain",
  "scannable",
  "showcase",
] as const;

export const README_SECTION_ORDER = [
  "overview",
  "installation",
  "usage",
  "features",
  "configuration",
  "contributing",
  "license",
  "screenshots",
] as const;

export type ReadmePresetKey = (typeof README_PRESET_KEYS)[number];
export type ReadmeToneKey = (typeof README_TONE_KEYS)[number];
export type ReadmeStructureKey = (typeof README_STRUCTURE_KEYS)[number];
export type ReadmePresentationKey = (typeof README_PRESENTATION_KEYS)[number];
export type ReadmeSectionKey = (typeof README_SECTION_ORDER)[number];

export type ReadmeSectionState = Record<ReadmeSectionKey, boolean>;

export type ReadmeConfig = {
  preset: ReadmePresetKey;
  tone: ReadmeToneKey;
  structure: ReadmeStructureKey;
  presentation: ReadmePresentationKey;
  sections: ReadmeSectionState;
};

export type ReadmePresetDefinition = {
  key: ReadmePresetKey;
  name: string;
  summary: string;
  config: ReadmeConfig;
};

export function countEnabledSections(sections: ReadmeSectionState) {
  return README_SECTION_ORDER.reduce(
    (count, sectionKey) => count + Number(sections[sectionKey]),
    0,
  );
}

export function getEnabledSectionKeys(sections: ReadmeSectionState) {
  return README_SECTION_ORDER.filter((sectionKey) => sections[sectionKey]);
}

export function cloneSectionState(sections: ReadmeSectionState): ReadmeSectionState {
  return README_SECTION_ORDER.reduce(
    (nextSections, sectionKey) => {
      nextSections[sectionKey] = sections[sectionKey];
      return nextSections;
    },
    {} as ReadmeSectionState,
  );
}
