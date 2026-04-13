import { createConfigFromPreset } from "@/data/presets";
import { createInitialReadmeConfig, readmeConfigReducer } from "@/state/readme-config";

describe("readmeConfigReducer", () => {
  it("starts from the locked default preset", () => {
    const initial = createInitialReadmeConfig();

    expect(initial.preset).toBe("professional");
    expect(initial.tone).toBe("professional");
    expect(initial.structure).toBe("standard");
    expect(initial.presentation).toBe("scannable");
    expect(initial.sections.features).toBe(true);
  });

  it("applies presets as full snapshots", () => {
    const mutated = {
      ...createConfigFromPreset("minimal"),
      tone: "technical" as const,
      sections: {
        ...createConfigFromPreset("minimal").sections,
        features: true,
      },
    };

    const next = readmeConfigReducer(mutated, { type: "apply-preset", preset: "portfolio" });

    expect(next).toEqual(createConfigFromPreset("portfolio"));
    expect(next.sections).not.toBe(createConfigFromPreset("portfolio").sections);
  });

  it("prevents disabling the final enabled section", () => {
    const singleSection = {
      ...createConfigFromPreset("minimal"),
      sections: {
        overview: true,
        installation: false,
        usage: false,
        features: false,
        configuration: false,
        contributing: false,
        license: false,
        screenshots: false,
      },
    };

    const next = readmeConfigReducer(singleSection, { type: "toggle-section", section: "overview" });

    expect(next).toBe(singleSection);
    expect(next.sections.overview).toBe(true);
  });
});
