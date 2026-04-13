import { Sparkles } from "lucide-react";

import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
} from "@/components/ui/code-block";
import { AnimatedHero } from "@/components/ui/animated-hero";

const promptExample = `You are my local IDE agent.

Inspect this repository locally before writing anything.
Infer the project type, stack, scripts, and meaningful structure.
Then draft a README that matches the selected tone and section choices.

Do not ask me to fill in project facts that you can discover from the repo.`;

function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-6 md:py-8">
      <AnimatedHero />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="section-shell space-y-4">
          <span className="eyebrow">Foundation batch</span>
          <h2 className="text-3xl leading-none md:text-4xl">
            Brutalist primitives before product logic.
          </h2>
          <p className="support-copy">
            The app foundation is now ready for a single shared config object,
            chooser-only controls, and synchronized prompt plus preview panels in
            the next batch.
          </p>
          <ul className="grid gap-3 text-sm text-foreground md:grid-cols-2">
            {[
              "React + Vite + TypeScript scaffold",
              "Tailwind tokens with cream / black / green baseline",
              "shadcn-compatible aliases and /components/ui structure",
              "Adapted hero and artifact panel without SaaS styling",
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
            <span>Prompt artifact shell</span>
            <span>plain monospace · shiki deferred</span>
          </CodeBlockHeader>
          <CodeBlockCode code={promptExample} language="md" />
        </CodeBlock>
      </section>
    </main>
  );
}

export default App;
