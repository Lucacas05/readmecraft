import { README_PRESET_ORDER } from "@/data/presets";
import { cn } from "@/lib/utils";
import type { ReadmePresetKey } from "@/types/readme";

type PresetPickerProps = {
  activePreset: ReadmePresetKey;
  onSelect: (preset: ReadmePresetKey) => void;
};

export function PresetPicker({ activePreset, onSelect }: PresetPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {README_PRESET_ORDER.map((preset) => {
        const isActive = preset.key === activePreset;

        return (
          <button
            key={preset.key}
            type="button"
            onClick={() => onSelect(preset.key)}
            className={cn(
              "border-2 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] transition-colors",
              isActive
                ? "border-border bg-primary text-primary-foreground shadow-brutal"
                : "border-border bg-background hover:bg-highlight",
            )}
          >
            {preset.name}
          </button>
        );
      })}
    </div>
  );
}
