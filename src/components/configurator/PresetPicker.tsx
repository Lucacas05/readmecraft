import { README_PRESET_ORDER } from "@/data/presets";
import { cn } from "@/lib/utils";
import type { ReadmePresetKey } from "@/types/readme";

type PresetPickerProps = {
  activePreset: ReadmePresetKey;
  onSelect: (preset: ReadmePresetKey) => void;
};

export function PresetPicker({ activePreset, onSelect }: PresetPickerProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {README_PRESET_ORDER.map((preset) => {
        const isActive = preset.key === activePreset;

        return (
          <button
            key={preset.key}
            type="button"
            onClick={() => onSelect(preset.key)}
            className={cn(
              "border-2 p-4 text-left transition-colors",
              isActive
                ? "border-border bg-primary text-primary-foreground shadow-brutal"
                : "border-border bg-background hover:bg-highlight",
            )}
          >
            <span className="block font-black uppercase tracking-[0.14em]">{preset.name}</span>
            <span className="mt-2 block text-sm leading-6 opacity-90">{preset.summary}</span>
          </button>
        );
      })}
    </div>
  );
}
