import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from "react";

import {
  createConfigFromPreset,
  DEFAULT_README_PRESET_KEY,
  getPresetDefinition,
} from "@/data/presets";
import {
  cloneSectionState,
  countEnabledSections,
  getEnabledSectionKeys,
  type ReadmeConfig,
  type ReadmePresentationKey,
  type ReadmePresetKey,
  type ReadmeSectionKey,
  type ReadmeStructureKey,
  type ReadmeToneKey,
} from "@/types/readme";

type ReadmeConfigAction =
  | { type: "apply-preset"; preset: ReadmePresetKey }
  | { type: "set-tone"; tone: ReadmeToneKey }
  | { type: "set-structure"; structure: ReadmeStructureKey }
  | { type: "set-presentation"; presentation: ReadmePresentationKey }
  | { type: "toggle-section"; section: ReadmeSectionKey };

type ReadmeConfigContextValue = {
  config: ReadmeConfig;
  dispatch: Dispatch<ReadmeConfigAction>;
  enabledSectionCount: number;
  enabledSections: ReadmeSectionKey[];
};

const ReadmeConfigContext = createContext<ReadmeConfigContextValue | undefined>(
  undefined,
);

export function createInitialReadmeConfig() {
  return createConfigFromPreset(DEFAULT_README_PRESET_KEY);
}

export function readmeConfigReducer(
  state: ReadmeConfig,
  action: ReadmeConfigAction,
): ReadmeConfig {
  switch (action.type) {
    case "apply-preset":
      return createConfigFromPreset(action.preset);
    case "set-tone":
      return { ...state, tone: action.tone };
    case "set-structure":
      return { ...state, structure: action.structure };
    case "set-presentation":
      return { ...state, presentation: action.presentation };
    case "toggle-section": {
      const nextValue = !state.sections[action.section];

      if (!nextValue && countEnabledSections(state.sections) === 1) {
        return state;
      }

      return {
        ...state,
        sections: {
          ...cloneSectionState(state.sections),
          [action.section]: nextValue,
        },
      };
    }
    default:
      return state;
  }
}

export function ReadmeConfigProvider({ children }: PropsWithChildren) {
  const [config, dispatch] = useReducer(readmeConfigReducer, undefined, createInitialReadmeConfig);

  const value = useMemo(
    () => ({
      config,
      dispatch,
      enabledSectionCount: countEnabledSections(config.sections),
      enabledSections: getEnabledSectionKeys(config.sections),
    }),
    [config],
  );

  return <ReadmeConfigContext.Provider value={value}>{children}</ReadmeConfigContext.Provider>;
}

export function useReadmeConfig() {
  const context = useContext(ReadmeConfigContext);

  if (!context) {
    throw new Error("useReadmeConfig must be used within a ReadmeConfigProvider");
  }

  return context;
}

export function useActivePresetDefinition() {
  const { config } = useReadmeConfig();

  return getPresetDefinition(config.preset);
}
