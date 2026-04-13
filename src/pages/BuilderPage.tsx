import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { PresentationControl } from "@/components/configurator/PresentationControl";
import { PresetPicker } from "@/components/configurator/PresetPicker";
import { SectionToggleList } from "@/components/configurator/SectionToggleList";
import { StructureControl } from "@/components/configurator/StructureControl";
import { ToneControl } from "@/components/configurator/ToneControl";
import { PromptPanel } from "@/components/output/PromptPanel";
import { README_CONTROL_COPY } from "@/lib/readme-copy";
import { buildPrompt } from "@/lib/generate-prompt";
import { useReadmeConfig } from "@/state/readme-config";

export function BuilderPage() {
  const { config, dispatch } = useReadmeConfig();
  const prompt = buildPrompt(config);

  return (
    <AppShell
      hero={
        <header className="flex flex-col gap-4 border-b-2 border-border pb-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <h1 className="text-3xl leading-none md:text-4xl">README.md Builder</h1>
          </div>
        </header>
      }
      configurator={
        <div className="poster-frame flex h-full flex-col justify-between gap-5 p-5 md:p-6">
          <ControlGroup title={README_CONTROL_COPY.presetHeading}>
            <PresetPicker
              activePreset={config.preset}
              onSelect={(preset) => dispatch({ type: "apply-preset", preset })}
            />
          </ControlGroup>

          <div className="grid gap-5 md:grid-cols-3 md:items-start">
            <ControlGroup title={README_CONTROL_COPY.toneHeading}>
              <ToneControl value={config.tone} onChange={(tone) => dispatch({ type: "set-tone", tone })} />
            </ControlGroup>

            <ControlGroup title={README_CONTROL_COPY.structureHeading}>
              <StructureControl
                value={config.structure}
                onChange={(structure) => dispatch({ type: "set-structure", structure })}
              />
            </ControlGroup>

            <ControlGroup title={README_CONTROL_COPY.presentationHeading}>
              <PresentationControl
                value={config.presentation}
                onChange={(presentation) => dispatch({ type: "set-presentation", presentation })}
              />
            </ControlGroup>
          </div>

          <ControlGroup title={README_CONTROL_COPY.sectionsHeading}>
            <SectionToggleList
              sections={config.sections}
              onToggle={(section) => dispatch({ type: "toggle-section", section })}
            />
          </ControlGroup>
        </div>
      }
      outputs={<PromptPanel prompt={prompt} />}
    />
  );
}

function ControlGroup({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}
