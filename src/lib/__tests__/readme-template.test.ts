import { createConfigFromPreset } from "@/data/presets";
import { buildReadmeTemplate } from "@/lib/readme-template";

describe("buildReadmeTemplate", () => {
  it("generates a repo-fillable markdown scaffold instead of an illustrative preview disclaimer", () => {
    const template = buildReadmeTemplate(createConfigFromPreset("professional"));

    expect(template).toContain("# [Project Name]");
    expect(template).toContain("Replace every placeholder with repository-derived facts.");
    expect(template).toContain("[Write a one-sentence summary grounded in the repository.]");
    expect(template).toContain("[State the real license after verifying the license file or package metadata.]");
    expect(template).not.toContain("Illustrative draft aligned");
  });

  it("respects enabled sections from the shared config", () => {
    const template = buildReadmeTemplate(createConfigFromPreset("portfolio"));

    expect(template).toContain("personal tone with a standard structure and showcase presentation");
    expect(template).toContain("## Screenshots");
    expect(template).not.toContain("## Installation");
    expect(template).not.toContain("## License");
  });
});
