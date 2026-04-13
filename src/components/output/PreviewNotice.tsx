import { README_DISCLAIMER_COPY } from "@/lib/readme-copy";

export function PreviewNotice() {
  return (
    <div className="border-2 border-border bg-highlight px-4 py-3 text-foreground">
      <p className="font-mono text-xs uppercase tracking-[0.16em]">{README_DISCLAIMER_COPY.previewBadge}</p>
      <p className="mt-2 text-sm leading-6">{README_DISCLAIMER_COPY.previewLabel}</p>
    </div>
  );
}
