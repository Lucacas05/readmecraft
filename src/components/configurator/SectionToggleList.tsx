import { Check } from "lucide-react";

import { README_CONTROL_COPY, README_SECTION_LABELS } from "@/lib/readme-copy";
import { cn } from "@/lib/utils";
import { README_SECTION_ORDER, type ReadmeSectionKey, type ReadmeSectionState } from "@/types/readme";

type SectionToggleListProps = {
  sections: ReadmeSectionState;
  enabledSectionCount: number;
  enabledSectionLabels: string;
  onToggle: (section: ReadmeSectionKey) => void;
};

export function SectionToggleList({
  sections,
  enabledSectionCount,
  enabledSectionLabels,
  onToggle,
}: SectionToggleListProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {README_SECTION_ORDER.map((sectionKey) => {
          const enabled = sections[sectionKey];
          const isLastEnabled = enabled && enabledSectionCount === 1;

          return (
            <button
              key={sectionKey}
              type="button"
              onClick={() => onToggle(sectionKey)}
              className={cn(
                "flex items-center justify-between gap-4 border-2 px-4 py-3 text-left transition-colors",
                enabled
                  ? "border-border bg-secondary text-secondary-foreground"
                  : "border-border bg-background text-foreground hover:bg-highlight",
              )}
            >
              <span>
                <span className="block font-black uppercase tracking-[0.12em]">
                  {README_SECTION_LABELS[sectionKey]}
                </span>
                <span className="mt-1 block font-mono text-xs uppercase tracking-[0.16em] opacity-80">
                  {isLastEnabled
                    ? README_CONTROL_COPY.guardrailLabel
                    : enabled
                      ? README_CONTROL_COPY.enabledLabel
                      : README_CONTROL_COPY.disabledLabel}
                </span>
              </span>
              {enabled ? <Check className="h-5 w-5 shrink-0" /> : null}
            </button>
          );
        })}
      </div>

      <div className="border-2 border-border bg-muted p-4">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {README_CONTROL_COPY.sectionOrderLabel}
        </p>
        <p className="mt-3 text-sm leading-6 text-foreground">{enabledSectionLabels}</p>
      </div>
    </div>
  );
}
