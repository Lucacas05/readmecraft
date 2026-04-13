import { Check, Sparkles } from "lucide-react";

import { README_PRESET_ORDER } from "@/data/presets";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
} from "@/components/ui/code-block";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { Button } from "@/components/ui/button";
import {
  README_CONTROL_COPY,
  README_DISCLAIMER_COPY,
  README_PRESENTATION_LABELS,
  README_SECTION_LABELS,
  README_STRUCTURE_LABELS,
  README_TONE_LABELS,
} from "@/lib/readme-copy";
import {
  ReadmeConfigProvider,
  useActivePresetDefinition,
  useReadmeConfig,
} from "@/state/readme-config";
import {
  README_PRESENTATION_KEYS,
  README_SECTION_ORDER,
  README_STRUCTURE_KEYS,
  README_TONE_KEYS,
} from "@/types/readme";

function ConfiguredApp() {
  const { config, dispatch, enabledSectionCount, enabledSections } = useReadmeConfig();
  const activePreset = useActivePresetDefinition();
  const configSnapshot = JSON.stringify(config, null, 2);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-6 md:py-8">
      <AnimatedHero />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="section-shell space-y-4">
          <span className="eyebrow">Phase 2 · shared model</span>
          <h2 className="text-3xl leading-none md:text-4xl">
            One config object now drives the chooser state.
          </h2>
          <p className="support-copy">
            {README_DISCLAIMER_COPY.configurator}
          </p>
          <ul className="grid gap-3 text-sm text-foreground md:grid-cols-2">
            {[
              `Preset locked: ${activePreset.name}`,
              `${enabledSectionCount} sections enabled right now`,
              `Tone: ${README_TONE_LABELS[config.tone]}`,
              `Presentation: ${README_PRESENTATION_LABELS[config.presentation]}`,
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-2 border-border bg-muted px-4 py-3"
              >
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <CodeBlock>
          <CodeBlockHeader>
            <span>Shared config snapshot</span>
            <span>{README_DISCLAIMER_COPY.sharedConfig}</span>
          </CodeBlockHeader>
          <CodeBlockCode code={configSnapshot} language="json" />
        </CodeBlock>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="section-shell space-y-8">
          <div className="space-y-3">
            <p className="eyebrow">{README_CONTROL_COPY.handoffLabel}</p>
            <p className="support-copy">{README_DISCLAIMER_COPY.prompt}</p>
          </div>

          <ControlGroup
            title={README_CONTROL_COPY.presetHeading}
            description={activePreset.summary}
          >
            <div className="grid gap-3 md:grid-cols-2">
              {README_PRESET_ORDER.map((preset) => {
                const isActive = preset.key === config.preset;

                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => dispatch({ type: "apply-preset", preset: preset.key })}
                    className={[
                      "text-left border-2 p-4 transition-colors",
                      isActive
                        ? "border-border bg-primary text-primary-foreground shadow-brutal"
                        : "border-border bg-background hover:bg-highlight",
                    ].join(" ")}
                  >
                    <span className="block font-black uppercase tracking-[0.14em]">
                      {preset.name}
                    </span>
                    <span className="mt-2 block text-sm leading-6 opacity-90">
                      {preset.summary}
                    </span>
                  </button>
                );
              })}
            </div>
          </ControlGroup>

          <ControlGroup title={README_CONTROL_COPY.toneHeading}>
            <ChoiceRow>
              {README_TONE_KEYS.map((tone) => (
                <Button
                  key={tone}
                  variant={config.tone === tone ? "default" : "outline"}
                  onClick={() => dispatch({ type: "set-tone", tone })}
                >
                  {README_TONE_LABELS[tone]}
                </Button>
              ))}
            </ChoiceRow>
          </ControlGroup>

          <ControlGroup title={README_CONTROL_COPY.structureHeading}>
            <ChoiceRow>
              {README_STRUCTURE_KEYS.map((structure) => (
                <Button
                  key={structure}
                  variant={config.structure === structure ? "default" : "outline"}
                  onClick={() => dispatch({ type: "set-structure", structure })}
                >
                  {README_STRUCTURE_LABELS[structure]}
                </Button>
              ))}
            </ChoiceRow>
          </ControlGroup>

          <ControlGroup title={README_CONTROL_COPY.presentationHeading}>
            <ChoiceRow>
              {README_PRESENTATION_KEYS.map((presentation) => (
                <Button
                  key={presentation}
                  variant={config.presentation === presentation ? "default" : "outline"}
                  onClick={() => dispatch({ type: "set-presentation", presentation })}
                >
                  {README_PRESENTATION_LABELS[presentation]}
                </Button>
              ))}
            </ChoiceRow>
          </ControlGroup>
        </div>

        <div className="section-shell space-y-6">
          <div className="space-y-2">
            <span className="eyebrow">{README_CONTROL_COPY.sectionsHeading}</span>
            <h3 className="text-2xl leading-none md:text-3xl">Toggle README sections.</h3>
            <p className="support-copy">{README_DISCLAIMER_COPY.preview}</p>
          </div>

          <div className="grid gap-3">
            {README_SECTION_ORDER.map((sectionKey) => {
              const enabled = config.sections[sectionKey];
              const isLastEnabled = enabled && enabledSectionCount === 1;

              return (
                <button
                  key={sectionKey}
                  type="button"
                  onClick={() => dispatch({ type: "toggle-section", section: sectionKey })}
                  className={[
                    "flex items-center justify-between gap-4 border-2 px-4 py-3 text-left transition-colors",
                    enabled
                      ? "border-border bg-secondary text-secondary-foreground"
                      : "border-border bg-background text-foreground hover:bg-highlight",
                  ].join(" ")}
                >
                  <span>
                    <span className="block font-black uppercase tracking-[0.12em]">
                      {README_SECTION_LABELS[sectionKey]}
                    </span>
                    <span className="mt-1 block font-mono text-xs uppercase tracking-[0.16em] opacity-80">
                      {isLastEnabled
                        ? README_CONTROL_COPY.guardrailLabel
                        : enabled
                          ? "Enabled"
                          : "Disabled"}
                    </span>
                  </span>
                  {enabled ? <Check className="h-5 w-5 shrink-0" /> : null}
                </button>
              );
            })}
          </div>

          <div className="border-2 border-border bg-muted p-4">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Enabled section order
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground">
              {enabledSections.map((sectionKey) => README_SECTION_LABELS[sectionKey]).join(" · ")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ControlGroup({
  title,
  description,
  children,
}: React.PropsWithChildren<{ title: string; description?: string }>) {
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

function ChoiceRow({ children }: React.PropsWithChildren) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}

function App() {
  return (
    <ReadmeConfigProvider>
      <ConfiguredApp />
    </ReadmeConfigProvider>
  );
}

export default App;
