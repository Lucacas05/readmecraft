import { createConfigFromPreset } from "@/data/presets";
import { buildPrompt } from "@/lib/generate-prompt";

describe("buildPrompt", () => {
  it("requires local repo inspection and never claims app-side analysis", () => {
    const prompt = buildPrompt(createConfigFromPreset("professional"));

    expect(prompt).toContain("You are working locally inside this repository.");
    expect(prompt).toContain("Inspect the codebase, docs, config files, package manifests, tests, and any existing notes before writing the README.");
    expect(prompt).toContain("Infer project facts from the repository itself.");
    expect(prompt).toContain("Do not say this prompt builder analyzed the repository.");
  });

  it("maps preset and selection labels into the generated prompt", () => {
    const config = createConfigFromPreset("open-source");
    const prompt = buildPrompt(config);

    expect(prompt).toContain("- Preset: Open Source");
    expect(prompt).toContain("- Tone: Technical");
    expect(prompt).toContain("- Structure: Expanded");
    expect(prompt).toContain("- Presentation: Scannable");
    expect(prompt).toContain("1. Overview");
    expect(prompt).toContain("6. Contributing");
    expect(prompt).not.toContain("Screenshots");
  });
});
