type Step = {
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    title: "Choose",
    description: "Pick a preset, tone, structure, and presentation that fit your project.",
  },
  {
    title: "Tune",
    description: "Toggle the sections you need and drop the ones you don't.",
  },
  {
    title: "Hand off",
    description: "Copy the prompt and drop it into your local IDE agent.",
  },
];

export function HowItWorks() {
  return (
    <section className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="eyebrow mx-auto">The flow</p>
        <h2 className="text-balance text-4xl leading-none sm:text-5xl md:text-6xl">
          How it works.
        </h2>
      </div>

      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title} className="poster-frame overflow-hidden">
            <div className="flex items-start justify-between gap-4 bg-secondary px-6 py-6 text-secondary-foreground">
              <span className="text-5xl font-black leading-none md:text-6xl">
                {index + 1}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-secondary-foreground/60">
                Step
              </span>
            </div>
            <div className="space-y-3 border-t-2 border-border bg-card px-6 py-6">
              <h3 className="text-2xl leading-none text-primary md:text-3xl">
                {step.title}
              </h3>
              <p className="font-mono text-sm leading-6 text-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
