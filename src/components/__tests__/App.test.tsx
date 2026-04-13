import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "@/App";
import { README_DISCLAIMER_COPY } from "@/lib/readme-copy";

function getPromptSection() {
  const heading = screen.getByRole("heading", { name: /prompt for your local ide agent/i });
  return heading.closest("section") as HTMLElement;
}

function getPreviewSection() {
  const heading = screen.getByRole("heading", { name: /illustrative readme preview/i });
  return heading.closest("section") as HTMLElement;
}

describe("App", () => {
  it("keeps the chooser-only flow free of repo-facts inputs", () => {
    render(<App />);

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/project name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/project description/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/repo facts|repository details|feature list/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/project name|project description|repository details|feature list/i)).not.toBeInTheDocument();
  });

  it("shows first-load disclaimers and synchronized chooser-only outputs", () => {
    render(<App />);

    expect(screen.getByText(README_DISCLAIMER_COPY.promptSync)).toBeInTheDocument();
    expect(screen.getByText(README_DISCLAIMER_COPY.previewSync)).toBeInTheDocument();
    expect(screen.getByText(README_DISCLAIMER_COPY.previewLabel)).toBeInTheDocument();

    const promptSection = getPromptSection();
    const previewSection = getPreviewSection();

    expect(within(promptSection).getByText(/- Preset: Professional/)).toBeInTheDocument();
    expect(within(promptSection).getByText(/- Tone: Professional/)).toBeInTheDocument();
    expect(within(previewSection).getByText(/professional tone, standard structure, and scannable presentation/i)).toBeInTheDocument();
  });

  it("keeps prompt and preview aligned when preset and controls change", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /portfolio/i }));

    let promptSection = getPromptSection();
    let previewSection = getPreviewSection();

    expect(within(promptSection).getByText(/- Preset: Portfolio/)).toBeInTheDocument();
    expect(within(promptSection).getByText(/- Tone: Personal/)).toBeInTheDocument();
    expect(within(previewSection).getByText(/personal tone, standard structure, and showcase presentation/i)).toBeInTheDocument();
    expect(within(previewSection).getByText(/## Screenshots/)).toBeInTheDocument();
    expect(within(previewSection).queryByText(/## Installation/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^expanded$/i }));

    promptSection = getPromptSection();
    previewSection = getPreviewSection();

    expect(within(promptSection).getByText(/- Structure: Expanded/)).toBeInTheDocument();
    expect(within(previewSection).getByText(/personal tone, expanded structure, and showcase presentation/i)).toBeInTheDocument();
    expect(promptSection).toHaveTextContent(/inspect the repo/i);
  });

  it("copies exactly the displayed prompt template", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<App />);

    const promptSection = getPromptSection();
    const displayedPrompt = promptSection.querySelector("code")?.textContent;

    expect(displayedPrompt).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /copy prompt/i }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(displayedPrompt);
    });

    expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument();
  });
});
