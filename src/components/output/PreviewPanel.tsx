import { README_DISCLAIMER_COPY, README_PANEL_COPY } from "@/lib/readme-copy";

import { PreviewNotice } from "./PreviewNotice";

type PreviewPanelProps = {
  preview: string;
};

export function PreviewPanel({ preview }: PreviewPanelProps) {
  return (
    <section className="section-shell min-w-0 space-y-4">
      <div className="space-y-2">
        <span className="eyebrow">{README_PANEL_COPY.previewEyebrow}</span>
        <h2 className="text-3xl leading-none md:text-4xl">{README_PANEL_COPY.previewTitle}</h2>
        <p className="support-copy">{README_DISCLAIMER_COPY.previewSync}</p>
      </div>

      <PreviewNotice />

      <div className="poster-frame bg-background p-5 text-foreground">
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[13px] leading-6">
          <code>{preview}</code>
        </pre>
      </div>
    </section>
  );
}
