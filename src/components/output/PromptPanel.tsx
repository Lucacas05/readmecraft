import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockCode, CodeBlockHeader } from "@/components/ui/code-block";
import { README_PANEL_COPY } from "@/lib/readme-copy";

import { PromptDialog } from "./PromptDialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setCopyLabel(README_PANEL_COPY.promptAction);
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
    <section
      aria-label={README_PANEL_COPY.promptTitle}
      className="section-shell flex min-w-0 flex-col xl:sticky xl:top-6"
    >
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
            className="max-h-[23rem] overflow-hidden whitespace-pre-wrap break-words"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-secondary via-secondary/90 to-transparent" />
        </div>
        <div className="border-t-2 border-border bg-background px-4 py-3">
          <Button
            size="sm"
            variant="outline"
            aria-haspopup="dialog"
            aria-expanded={isDialogOpen}
            onClick={() => setIsDialogOpen(true)}
          >
            {README_PANEL_COPY.promptExpandAction}
          </Button>
        </div>
      </CodeBlock>

      <PromptDialog
        open={isDialogOpen}
        prompt={prompt}
        copyLabel={copyLabel}
        onCopy={handleCopy}
        onClose={() => setIsDialogOpen(false)}
      />
    </section>
  );
}
