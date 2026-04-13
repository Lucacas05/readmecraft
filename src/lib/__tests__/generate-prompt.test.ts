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

  it("tells the agent to create or update README.md using the embedded template", () => {
    const prompt = buildPrompt(createConfigFromPreset("professional"));

    expect(prompt).toContain("If README.md already exists, read it first and preserve any verified project-specific details that should remain.");
    expect(prompt).toContain("If README.md does not exist, create it.");
    expect(prompt).toContain("Write the final result into README.md in this repository.");
    expect(prompt).toContain("Start from this README.md template:");
    expect(prompt).toContain("```md");
    expect(prompt).toContain("## Overview");
  });

  it("maps preset and selection labels into the generated prompt and template", () => {
    const config = createConfigFromPreset("open-source");
    const prompt = buildPrompt(config);

    expect(prompt).toContain("- Preset: Open Source");
    expect(prompt).toContain("- Tone: Technical");
    expect(prompt).toContain("- Structure: Expanded");
    expect(prompt).toContain("- Presentation: Scannable");
    expect(prompt).toContain("1. Overview");
    expect(prompt).toContain("6. Contributing");
    expect(prompt).toContain("## Contributing");
    expect(prompt).not.toContain("## Screenshots");
  });
});
