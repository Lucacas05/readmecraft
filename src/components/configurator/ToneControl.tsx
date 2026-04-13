import { Button } from "@/components/ui/button";
import { README_TONE_LABELS } from "@/lib/readme-copy";
import { README_TONE_KEYS, type ReadmeToneKey } from "@/types/readme";

type ToneControlProps = {
  value: ReadmeToneKey;
  onChange: (tone: ReadmeToneKey) => void;
};

export function ToneControl({ value, onChange }: ToneControlProps) {
  return (
    <div className="grid gap-3">
      {README_TONE_KEYS.map((tone) => (
        <Button
          key={tone}
          size="sm"
          className="w-full justify-start"
          variant={value === tone ? "default" : "outline"}
          onClick={() => onChange(tone)}
        >
          {README_TONE_LABELS[tone]}
        </Button>
      ))}
    </div>
  );
}
