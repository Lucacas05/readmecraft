import { createConfigFromPreset } from "@/data/presets";
import { buildPreview } from "@/lib/generate-preview";

describe("buildPreview", () => {
  it("stays clearly illustrative and placeholder-only", () => {
    const preview = buildPreview(createConfigFromPreset("professional"));

    expect(preview).toContain("# [Project Name Placeholder]");
    expect(preview).toContain("> Final project facts still come from your local IDE agent after it inspects the repository.");
    expect(preview).toContain("[One-sentence summary inferred from the repository goes here.]");
    expect(preview).toContain("[License details placeholder — verify the actual license file or package metadata.]");
    expect(preview).not.toContain("This app analyzed your repository");
  });

  it("uses the same config inputs to mirror enabled sections and presentation guidance", () => {
    const preview = buildPreview(createConfigFromPreset("portfolio"));

    expect(preview).toContain("personal tone, standard structure, and showcase presentation");
    expect(preview).toContain("## Screenshots");
    expect(preview).not.toContain("## Installation");
    expect(preview).not.toContain("## License");
  });
});
