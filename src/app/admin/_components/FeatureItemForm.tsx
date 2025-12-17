import { FeatureItem, AVAILABLE_ICONS, IconName } from "@/lib/secion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import * as Icons from "lucide-react";

interface FeatureItemFormProps {
  item: FeatureItem;
  onChange: (item: Partial<FeatureItem>) => void;
  onRemove: () => void;
}

export const FeatureItemForm = ({
  item,
  onChange,
  onRemove,
}: FeatureItemFormProps) => {
  const IconComponent = Icons[
    item.iconName as keyof typeof Icons
  ] as React.ComponentType<{ size?: number }>;

  return (
    <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Icon</Label>
            <Select
              value={item.iconName}
              onValueChange={(value) => onChange({ iconName: value })}
            >
              <SelectTrigger>
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {IconComponent && <IconComponent size={16} />}
                    <span>{item.iconName}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_ICONS.map((icon: any) => {
                  const Icon = Icons[
                    icon as keyof typeof Icons
                  ] as React.ComponentType<{ size?: number }>;
                  return (
                    <SelectItem key={icon} value={icon}>
                      <div className="flex items-center gap-2">
                        {Icon && <Icon size={16} />}
                        <span>{icon}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Order</Label>
            <Input
              type="number"
              value={item.order}
              onChange={(e) => onChange({ order: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive/80"
          onClick={onRemove}
        >
          <Trash2 size={18} />
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          placeholder="Feature title"
          value={item.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Feature description"
          value={item.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={2}
        />
      </div>
    </div>
  );
};
