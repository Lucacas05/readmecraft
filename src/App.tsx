import type { PropsWithChildren } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { PresentationControl } from "@/components/configurator/PresentationControl";
import { PresetPicker } from "@/components/configurator/PresetPicker";
import { SectionToggleList } from "@/components/configurator/SectionToggleList";
import { StructureControl } from "@/components/configurator/StructureControl";
import { ToneControl } from "@/components/configurator/ToneControl";
import { PreviewPanel } from "@/components/output/PreviewPanel";
import { PromptPanel } from "@/components/output/PromptPanel";
import { AnimatedHero } from "@/components/ui/animated-hero";
import {
  README_CONTROL_COPY,
  README_DISCLAIMER_COPY,
  README_PANEL_COPY,
  README_PRESENTATION_LABELS,
  README_SECTION_LABELS,
  README_TONE_LABELS,
} from "@/lib/readme-copy";
import { buildPreview } from "@/lib/generate-preview";
import { buildPrompt } from "@/lib/generate-prompt";
import {
  ReadmeConfigProvider,
  useActivePresetDefinition,
  useReadmeConfig,
} from "@/state/readme-config";

function ConfiguredApp() {
  const { config, dispatch, enabledSectionCount, enabledSections } = useReadmeConfig();
  const activePreset = useActivePresetDefinition();
  const prompt = buildPrompt(config);
  const preview = buildPreview(config);
  const enabledSectionLabels = enabledSections
    .map((sectionKey) => README_SECTION_LABELS[sectionKey])
    .join(" · ");

  return (
    <AppShell
      hero={<AnimatedHero />}
      configurator={
        <div className="section-shell space-y-8">
          <div className="space-y-3">
            <p className="eyebrow">{README_CONTROL_COPY.handoffLabel}</p>
            <h2 className="text-3xl leading-none md:text-4xl">{README_PANEL_COPY.configuratorTitle}</h2>
            <p className="support-copy">{README_PANEL_COPY.configuratorDescription}</p>
          </div>

          <div className="grid gap-3 text-sm text-foreground md:grid-cols-2">
            {[
              `Preset locked: ${activePreset.name}`,
              `${enabledSectionCount} sections enabled right now`,
              `Tone: ${README_TONE_LABELS[config.tone]}`,
              `Presentation: ${README_PRESENTATION_LABELS[config.presentation]}`,
            ].map((item) => (
              <div key={item} className="border-2 border-border bg-muted px-4 py-3">
                {item}
              </div>
            ))}
          </div>

          <ControlGroup
            title={README_CONTROL_COPY.presetHeading}
            description={activePreset.summary}
          >
            <PresetPicker
              activePreset={config.preset}
              onSelect={(preset) => dispatch({ type: "apply-preset", preset })}
            />
          </ControlGroup>

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
          <ControlGroup title={README_CONTROL_COPY.sectionsHeading} description={README_DISCLAIMER_COPY.preview}>
            <SectionToggleList
              sections={config.sections}
              enabledSectionCount={enabledSectionCount}
              enabledSectionLabels={enabledSectionLabels}
              onToggle={(section) => dispatch({ type: "toggle-section", section })}
            />
          </ControlGroup>
        </div>
      }
      outputs={
        <div className="grid gap-6">
          <PromptPanel prompt={prompt} />
          <PreviewPanel preview={preview} />
        </div>
      }
    />
  );
}

function ControlGroup({
  title,
  description,
  children,
}: PropsWithChildren<{ title: string; description?: string }>) {
  return (
    <section className="space-y-3">
      <div className="space-y-2">
        <h3 className="text-xl leading-none md:text-2xl">{title}</h3>
        {description ? <p className="support-copy max-w-none">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function App() {
  return (
    <ReadmeConfigProvider>
      <ConfiguredApp />
    </ReadmeConfigProvider>
  );
}

export default App;
