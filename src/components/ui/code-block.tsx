import * as React from "react";

import { cn } from "@/lib/utils";

const CodeBlock = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "poster-frame overflow-hidden bg-secondary text-secondary-foreground",
        className,
      )}
      {...props}
    />
  ),
);

CodeBlock.displayName = "CodeBlock";

const CodeBlockHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between gap-4 border-b-2 border-border bg-background px-4 py-3 text-xs font-mono uppercase tracking-[0.18em] text-foreground",
      className,
    )}
    {...props}
  />
));

CodeBlockHeader.displayName = "CodeBlockHeader";

type CodeBlockCodeProps = React.HTMLAttributes<HTMLPreElement> & {
  code: string;
  language?: string;
};

const CodeBlockCode = React.forwardRef<HTMLPreElement, CodeBlockCodeProps>(
  ({ className, code, language = "txt", ...props }, ref) => (
    <pre
      ref={ref}
      className={cn(
        "overflow-x-auto px-4 py-5 font-mono text-[13px] leading-6 text-secondary-foreground",
        className,
      )}
      {...props}
    >
      <code data-language={language}>{code}</code>
    </pre>
  ),
);

CodeBlockCode.displayName = "CodeBlockCode";

export { CodeBlock, CodeBlockCode, CodeBlockHeader };
