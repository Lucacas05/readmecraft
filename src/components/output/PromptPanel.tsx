import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockCode, CodeBlockHeader } from "@/components/ui/code-block";
import { README_DISCLAIMER_COPY, README_PANEL_COPY } from "@/lib/readme-copy";

type PromptPanelProps = {
  prompt: string;
};

async function copyWithFallback(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  if (typeof document === "undefined") {
    return false;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  return copied;
}

export function PromptPanel({ prompt }: PromptPanelProps) {
  const [copyLabel, setCopyLabel] = useState<string>(README_PANEL_COPY.promptAction);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setCopyLabel(README_PANEL_COPY.promptAction);
    setIsExpanded(false);
  }, [prompt]);

  async function handleCopy() {
    try {
      const copied = await copyWithFallback(prompt);
      setCopyLabel(copied ? README_PANEL_COPY.promptActionDone : README_PANEL_COPY.promptFallbackAction);
    } catch {
      setCopyLabel(README_PANEL_COPY.promptFallbackAction);
    }
  }

  return (
    <section className="section-shell min-w-0 space-y-4 xl:sticky xl:top-6">
      <div className="space-y-2">
        <h2 className="text-3xl leading-none md:text-4xl">{README_PANEL_COPY.promptTitle}</h2>
      </div>

      <CodeBlock>
        <CodeBlockHeader className="justify-end">
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copyLabel}
          </Button>
        </CodeBlockHeader>
        <div className="relative">
          <CodeBlockCode
            code={prompt}
            language="txt"
            className={[
              "whitespace-pre-wrap break-words transition-[max-height] duration-300 ease-out",
              isExpanded ? "max-h-[70vh]" : "max-h-[23rem] overflow-hidden",
            ].join(" ")}
          />
          {!isExpanded ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-secondary via-secondary/90 to-transparent" />
          ) : null}
        </div>
        <div className="border-t-2 border-border bg-background px-4 py-3">
          <Button
            size="sm"
            variant="outline"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((value) => !value)}
          >
            {isExpanded ? README_PANEL_COPY.promptCollapseAction : README_PANEL_COPY.promptExpandAction}
          </Button>
        </div>
      </CodeBlock>
    </section>
  );
}
