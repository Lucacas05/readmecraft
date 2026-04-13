import {
  cloneSectionState,
  type ReadmeConfig,
  type ReadmePresetDefinition,
  type ReadmePresetKey,
} from "@/types/readme";

export const README_PRESETS: Record<ReadmePresetKey, ReadmePresetDefinition> = {
  minimal: {
    key: "minimal",
    name: "Minimal",
    summary: "Lean structure for quick documentation with only the essentials.",
    config: {
      preset: "minimal",
      tone: "concise",
      structure: "lean",
      presentation: "plain",
      sections: {
        overview: true,
        installation: true,
        usage: true,
        features: false,
        configuration: false,
        contributing: false,
        license: true,
        screenshots: false,
      },
    },
  },
  professional: {
    key: "professional",
    name: "Professional",
    summary: "Balanced README for products or internal tools that need clarity.",
    config: {
      preset: "professional",
      tone: "professional",
      structure: "standard",
      presentation: "scannable",
      sections: {
        overview: true,
        installation: true,
        usage: true,
        features: true,
        configuration: true,
        contributing: false,
        license: true,
        screenshots: false,
      },
    },
  },
  "open-source": {
    key: "open-source",
    name: "Open Source",
    summary: "Community-first structure with contribution and setup guidance.",
    config: {
      preset: "open-source",
      tone: "technical",
      structure: "expanded",
      presentation: "scannable",
      sections: {
        overview: true,
        installation: true,
        usage: true,
        features: true,
        configuration: true,
        contributing: true,
        license: true,
        screenshots: false,
      },
    },
  },
  portfolio: {
    key: "portfolio",
    name: "Portfolio",
    summary: "Showcase-led README with emphasis on presentation and highlights.",
    config: {
      preset: "portfolio",
      tone: "personal",
      structure: "standard",
      presentation: "showcase",
      sections: {
        overview: true,
        installation: false,
        usage: true,
        features: true,
        configuration: false,
        contributing: false,
        license: false,
        screenshots: true,
      },
    },
  },
};

export const README_PRESET_ORDER = [
  README_PRESETS.minimal,
  README_PRESETS.professional,
  README_PRESETS["open-source"],
  README_PRESETS.portfolio,
];

export const DEFAULT_README_PRESET_KEY: ReadmePresetKey = "professional";

export function createConfigFromPreset(presetKey: ReadmePresetKey): ReadmeConfig {
  const preset = README_PRESETS[presetKey];

  return {
    ...preset.config,
    sections: cloneSectionState(preset.config.sections),
  };
}

export function getPresetDefinition(presetKey: ReadmePresetKey) {
  return README_PRESETS[presetKey];
}
