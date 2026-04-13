import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { AppRoutes } from "@/App";
import { ReadmeConfigProvider } from "@/state/readme-config";

function renderAt(path: string) {
  return render(
    <ReadmeConfigProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </ReadmeConfigProvider>,
  );
}

function getPromptSection() {
  return screen.getByRole("region", { name: /unified handoff for your local ide agent/i });
}

describe("LandingPage", () => {
  it("shows the hero and sends users to the builder on CTA click", async () => {
    const user = userEvent.setup();
    renderAt("/");

    expect(
      screen.getByRole("heading", { name: /build a readme prompt that stays/i }),
    ).toBeInTheDocument();

    expect(screen.queryByRole("region", { name: /unified handoff for your local ide agent/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /start building/i }));

    expect(screen.getByRole("region", { name: /unified handoff for your local ide agent/i })).toBeInTheDocument();
  });
});

describe("BuilderPage", () => {
  it("keeps the chooser-only flow free of repo-facts inputs", () => {
    renderAt("/builder");

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/project name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/project description/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/repo facts|repository details|feature list/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/project name|project description|repository details|feature list/i)).not.toBeInTheDocument();
  });

  it("shows shared-copy guidance and a unified prompt with the embedded template", () => {
    renderAt("/builder");

    expect(
      screen.queryByText(/one copy now contains the instructions and the readme template generated from this same shared config/i),
    ).not.toBeInTheDocument();
    const seeMore = screen.getByRole("button", { name: /see more/i });
    expect(seeMore).toHaveAttribute("aria-expanded", "false");
    expect(seeMore).toHaveAttribute("aria-haspopup", "dialog");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const promptSection = getPromptSection();

    expect(within(promptSection).getByText(/Inspect the codebase, docs, config files, package manifests, tests, and any existing notes before writing the README./)).toBeInTheDocument();
    expect(within(promptSection).getByText(/- Preset: Professional/)).toBeInTheDocument();
    expect(within(promptSection).getByText(/- Tone: Professional/)).toBeInTheDocument();
    expect(within(promptSection).getByText(/Start from this README.md template:/)).toBeInTheDocument();
    expect(within(promptSection).getByText(/## Overview/)).toBeInTheDocument();
    expect(within(promptSection).getByText(/## Installation/)).toBeInTheDocument();
  });

  it("keeps the unified prompt aligned when preset and controls change", () => {
    renderAt("/builder");

    fireEvent.click(screen.getByRole("button", { name: /portfolio/i }));

    let promptSection = getPromptSection();

    expect(within(promptSection).getByText(/- Preset: Portfolio/)).toBeInTheDocument();
    expect(within(promptSection).getByText(/- Tone: Personal/)).toBeInTheDocument();
    expect(within(promptSection).getByText(/showcase presentation/i)).toBeInTheDocument();
    expect(within(promptSection).getByText(/## Screenshots/)).toBeInTheDocument();
    expect(within(promptSection).queryByText(/## Installation/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^expanded$/i }));

    promptSection = getPromptSection();

    expect(within(promptSection).getByText(/- Structure: Expanded/)).toBeInTheDocument();
    expect(promptSection).toHaveTextContent(/inspect the codebase/i);
    expect(within(promptSection).getByText(/expanded structure/i)).toBeInTheDocument();
  });

  it("copies exactly the displayed unified handoff", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    renderAt("/builder");

    const promptSection = getPromptSection();
    const displayedPrompt = promptSection.querySelector("code")?.textContent;

    expect(displayedPrompt).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /copy handoff/i }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(displayedPrompt);
    });

    expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument();
  });

  it("opens the full handoff in a modal dialog when the user asks for more", async () => {
    const user = userEvent.setup();
    renderAt("/builder");

    const trigger = screen.getByRole("button", { name: /see more/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(trigger);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(within(dialog).getByText(/Inspect the codebase, docs, config files, package manifests, tests, and any existing notes before writing the README./)).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
