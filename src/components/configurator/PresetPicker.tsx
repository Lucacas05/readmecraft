import { README_PRESET_ORDER } from "@/data/presets";
import { cn } from "@/lib/utils";
import type { ReadmePresetKey } from "@/types/readme";

type PresetPickerProps = {
  activePreset: ReadmePresetKey;
  onSelect: (preset: ReadmePresetKey) => void;
};

export function PresetPicker({ activePreset, onSelect }: PresetPickerProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {README_PRESET_ORDER.map((preset) => {
        const isActive = preset.key === activePreset;

        return (
          <button
            key={preset.key}
            type="button"
            onClick={() => onSelect(preset.key)}
            className={cn(
              "min-h-11 w-full border-2 px-3 py-2 text-left text-xs font-black uppercase tracking-[0.14em] transition-colors",
              isActive
                ? "border-border bg-primary text-primary-foreground"
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
