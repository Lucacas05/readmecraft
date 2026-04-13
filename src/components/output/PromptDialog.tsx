import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockCode, CodeBlockHeader } from "@/components/ui/code-block";
import { README_PANEL_COPY } from "@/lib/readme-copy";

type PromptDialogProps = {
  open: boolean;
  prompt: string;
  copyLabel: string;
  onCopy: () => void;
  onClose: () => void;
};

export function PromptDialog({ open, prompt, copyLabel, onCopy, onClose }: PromptDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={README_PANEL_COPY.promptTitle}
            className="poster-frame relative z-10 flex h-[min(85vh,52rem)] w-full max-w-4xl flex-col overflow-hidden bg-card"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <CodeBlock className="flex h-full flex-col border-0 shadow-none">
              <CodeBlockHeader className="justify-between">
                <span>{README_PANEL_COPY.promptTitle}</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={onCopy}>
                    {copyLabel}
                  </Button>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Close dialog"
                    onClick={onClose}
                    className="inline-flex h-9 w-9 items-center justify-center border-2 border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </CodeBlockHeader>
              <CodeBlockCode
                code={prompt}
                language="txt"
                className="flex-1 overflow-auto whitespace-pre-wrap break-words"
              />
            </CodeBlock>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
