import { SectionWithFeatures, ThemeStyle } from "@/lib/secion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, EyeOff, GripVertical, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  section: SectionWithFeatures;
  onEdit: (section: SectionWithFeatures) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onDuplicate: (section: SectionWithFeatures) => void;
}

export const SectionCard = ({
  section,
  onEdit,
  onDelete,
  onToggleVisibility,
  onDuplicate,
}: SectionCardProps) => {
  const themeLabels: Record<string, string> = {
    "modern-dark": "Modern Dark",
    "light-minimal": "Light Minimal",
    "gradient-bold": "Gradient Bold",
    corporate: "Corporate",
  };

  const layoutLabels: Record<string, string> = {
    "feature-grid": "Feature Grid",
    "carousel-cards": "Carousel",
    "hero-banner": "Hero Banner",
  };

  return (
    <Card
      className={cn(
        "glass-card group transition-all duration-300 hover:shadow-xl",
        !section.visible && "opacity-60"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Drag Handle */}
          <div className="pt-2 opacity-0 group-hover:opacity-50 cursor-grab transition-opacity">
            <GripVertical size={20} />
          </div>

          {/* Theme Preview */}
          <div
            className={cn(
              "w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center",
              section.designStyleKey === "modern-dark" && "theme-modern-dark",
              section.designStyleKey === "light-minimal" &&
                "theme-light-minimal border border-border",
              section.designStyleKey === "gradient-bold" &&
                "theme-gradient-bold",
              section.designStyleKey === "corporate" && "theme-corporate"
            )}
          >
            <span className="text-2xl font-bold opacity-50">
              {section.order}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{section.title}</h3>
              {!section.visible && (
                <Badge variant="secondary" className="text-xs">
                  Hidden
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate mb-2">
              {section.subtitle || section.description || "No description"}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {layoutLabels[section.layoutType] || "Feature Grid"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {themeLabels[section.designStyleKey]}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {section.featureItems.length > 0
                  ? `${section.featureItems.length} items`
                  : section.levels && section.levels.length > 0
                  ? `${section.levels.length} levels`
                  : "0 items"}
              </Badge>
              <code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {section.key}
              </code>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(section)}
              title="Edit section"
            >
              <Edit size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive/80"
              onClick={() => onDelete(section.id)}
              title="Delete section"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
