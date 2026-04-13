import { Button } from "@/components/ui/button";
import { README_PRESENTATION_LABELS } from "@/lib/readme-copy";
import { README_PRESENTATION_KEYS, type ReadmePresentationKey } from "@/types/readme";

type PresentationControlProps = {
  value: ReadmePresentationKey;
  onChange: (presentation: ReadmePresentationKey) => void;
};

export function PresentationControl({ value, onChange }: PresentationControlProps) {
  return (
    <div className="grid gap-3">
      {README_PRESENTATION_KEYS.map((presentation) => (
        <Button
          key={presentation}
          size="sm"
          className="w-full justify-start"
          variant={value === presentation ? "default" : "outline"}
          onClick={() => onChange(presentation)}
        >
          {README_PRESENTATION_LABELS[presentation]}
        </Button>
      ))}
    </div>
  );
}
