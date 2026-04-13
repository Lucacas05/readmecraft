import { Check } from "lucide-react";

import { README_SECTION_LABELS } from "@/lib/readme-copy";
import { cn } from "@/lib/utils";
import { README_SECTION_ORDER, type ReadmeSectionKey, type ReadmeSectionState } from "@/types/readme";

type SectionToggleListProps = {
  sections: ReadmeSectionState;
  onToggle: (section: ReadmeSectionKey) => void;
};

export function SectionToggleList({ sections, onToggle }: SectionToggleListProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {README_SECTION_ORDER.map((sectionKey) => {
        const enabled = sections[sectionKey];

        return (
          <button
            key={sectionKey}
            type="button"
            onClick={() => onToggle(sectionKey)}
            className={cn(
              "flex min-h-11 items-center justify-between gap-3 border-2 px-3 py-2 text-left transition-colors",
              enabled
                ? "border-border bg-secondary text-secondary-foreground"
                : "border-border bg-background text-foreground hover:bg-highlight",
            )}
          >
            <span className="text-xs font-black uppercase tracking-[0.12em]">
              {README_SECTION_LABELS[sectionKey]}
            </span>
            {enabled ? <Check className="h-3.5 w-3.5 shrink-0" /> : null}
          </button>
        );
      })}
    </div>
  );
}
