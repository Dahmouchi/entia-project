import { Level, Subject, Grade, SUBJECT_COLORS } from "@/lib/secion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface LevelItemFormProps {
  item: Level;
  onChange: (item: Partial<Level>) => void;
  onRemove: () => void;
}

interface GradeItemFormProps {
  grade: Grade;
  onChange: (grade: Partial<Grade>) => void;
  onRemove: () => void;
}

const GradeItemForm = ({ grade, onChange, onRemove }: GradeItemFormProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleAddSubject = () => {
    onChange({
      subjects: [...grade.subjects, { name: "", color: "bg-purple-400" }],
    });
  };

  const handleUpdateSubject = (
    index: number,
    field: keyof Subject,
    value: string
  ) => {
    const updated = [...grade.subjects];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ subjects: updated });
  };

  const handleRemoveSubject = (index: number) => {
    onChange({ subjects: grade.subjects.filter((_, i) => i !== index) });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-border/50 rounded-lg p-3 bg-background/50">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </Button>
            </CollapsibleTrigger>
            <Input
              className="flex-1"
              placeholder="Le nom du grade (e.g., BTS, L3, M1)"
              value={grade.name}
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <X size={14} />
          </Button>
        </div>

        <CollapsibleContent className="mt-3 space-y-2">
          <Label className="text-xs text-muted-foreground">Les matieres</Label>
          <div className="space-y-2 pl-4">
            {grade.subjects.map((subject, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  className="flex-1"
                  placeholder="Le nom de la matiere"
                  value={subject.name}
                  onChange={(e) =>
                    handleUpdateSubject(index, "name", e.target.value)
                  }
                />
                <Select
                  value={subject.color}
                  onValueChange={(value) =>
                    handleUpdateSubject(index, "color", value)
                  }
                >
                  <SelectTrigger className="w-28">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${subject.color}`} />
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECT_COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded ${color}`} />
                          <span className="text-xs">
                            {color.replace("bg-", "").replace("-400", "")}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleRemoveSubject(index)}
                >
                  <X size={12} />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddSubject}
              className="h-7 text-xs"
            >
              <Plus size={12} className="mr-1" />
              Ajouter
            </Button>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export const LevelItemForm = ({
  item,
  onChange,
  onRemove,
}: LevelItemFormProps) => {
  const handleAddGrade = () => {
    const newGrade: Grade = {
      id: crypto.randomUUID(),
      name: "",
      subjects: [],
      order: item.grades.length,
    };
    onChange({ grades: [...item.grades, newGrade] });
  };

  const handleUpdateGrade = (index: number, updates: Partial<Grade>) => {
    const updated = [...item.grades];
    updated[index] = { ...updated[index], ...updates };
    onChange({ grades: updated });
  };

  const handleRemoveGrade = (index: number) => {
    onChange({ grades: item.grades.filter((_, i) => i !== index) });
  };

  return (
    <Card className="bg-muted/30">
      <CardContent className="pt-4 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label>Le nom du niveau</Label>
              <Input
                placeholder="e.g., Bac+2, Bac+3 (Licence)"
                value={item.name}
                onChange={(e) => onChange({ name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Les grades</Label>
              <div className="space-y-3">
                {item.grades.map((grade, index) => (
                  <GradeItemForm
                    key={grade.id}
                    grade={grade}
                    onChange={(updates) => handleUpdateGrade(index, updates)}
                    onRemove={() => handleRemoveGrade(index)}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddGrade}
                >
                  <Plus size={14} className="mr-1" />
                  Ajouter un grade
                </Button>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive ml-2"
            onClick={onRemove}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
