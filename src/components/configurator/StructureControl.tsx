import { Button } from "@/components/ui/button";
import { README_STRUCTURE_LABELS } from "@/lib/readme-copy";
import { README_STRUCTURE_KEYS, type ReadmeStructureKey } from "@/types/readme";

type StructureControlProps = {
  value: ReadmeStructureKey;
  onChange: (structure: ReadmeStructureKey) => void;
};

export function StructureControl({ value, onChange }: StructureControlProps) {
  return (
    <div className="grid gap-3">
      {README_STRUCTURE_KEYS.map((structure) => (
        <Button
          key={structure}
          size="sm"
          className="w-full justify-start"
          variant={value === structure ? "default" : "outline"}
          onClick={() => onChange(structure)}
        >
          {README_STRUCTURE_LABELS[structure]}
        </Button>
      ))}
    </div>
  );
}
