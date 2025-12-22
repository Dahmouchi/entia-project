import { SectionWithFeatures, ThemeStyle, THEME_STYLES } from "@/lib/secion";
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
  const themeConfig = THEME_STYLES[section.designStyleKey as ThemeStyle];

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

  // Get theme preview background
  const getThemePreviewBg = (theme: string) => {
    switch (theme) {
      case "modern-dark":
        return "bg-gradient-to-br from-slate-800 to-slate-900";
      case "light-minimal":
        return "bg-gradient-to-br from-white to-gray-100";
      case "gradient-bold":
        return "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500";
      case "corporate":
        return "bg-gradient-to-br from-blue-600 to-sky-500";
      default:
        return "bg-gradient-to-br from-slate-800 to-slate-900";
    }
  };

  // Get theme preview text color
  const getThemePreviewText = (theme: string) => {
    switch (theme) {
      case "modern-dark":
        return "text-indigo-400";
      case "light-minimal":
        return "text-gray-900";
      case "gradient-bold":
        return "text-yellow-300";
      case "corporate":
        return "text-blue-100";
      default:
        return "text-indigo-400";
    }
  };

  // Get badge colors based on theme
  const getThemeBadgeColor = (theme: string) => {
    switch (theme) {
      case "modern-dark":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
      case "light-minimal":
        return "bg-gray-100 text-gray-900 border-gray-300";
      case "gradient-bold":
        return "bg-gradient-to-r from-purple-500/10 to-orange-500/10 text-yellow-400 border-yellow-500/30";
      case "corporate":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      default:
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
    }
  };

  return (
    <Card
      className={cn(
        "glass-card group transition-all duration-300 hover:shadow-xl relative overflow-hidden",
        !section.visible && "opacity-60"
      )}
    >
      {/* Theme indicator strip */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1",
          section.designStyleKey === "modern-dark" &&
            "bg-gradient-to-r from-indigo-500 to-indigo-600",
          section.designStyleKey === "light-minimal" &&
            "bg-gradient-to-r from-gray-400 to-gray-500",
          section.designStyleKey === "gradient-bold" &&
            "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
          section.designStyleKey === "corporate" &&
            "bg-gradient-to-r from-blue-500 to-sky-500"
        )}
      />

      <CardContent className="">
        <div className="flex items-start gap-4">
          {/* Drag Handle */}
          <div className="pt-2 opacity-0 group-hover:opacity-50 cursor-grab transition-opacity">
            <GripVertical size={20} className="text-muted-foreground" />
          </div>

          {/* Theme Preview */}
          <div
            className={cn(
              "w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden shadow-md",
              getThemePreviewBg(section.designStyleKey),
              section.designStyleKey === "light-minimal" &&
                "border border-gray-300"
            )}
          >
            {/* Animated background effect */}
            <div
              className={cn(
                "absolute inset-0 opacity-20",
                section.designStyleKey === "modern-dark" &&
                  "bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.3),transparent_70%)]",
                section.designStyleKey === "gradient-bold" &&
                  "bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.3),transparent_70%)]",
                section.designStyleKey === "corporate" &&
                  "bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.3),transparent_70%)]"
              )}
            />

            {/* Order number */}
            <span
              className={cn(
                "text-2xl font-bold relative z-10",
                getThemePreviewText(section.designStyleKey)
              )}
            >
              {section.order}
            </span>

            {/* Mini decorative elements */}
            <div className="absolute bottom-1 right-1 flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1 h-1 rounded-full",
                    section.designStyleKey === "modern-dark" &&
                      "bg-indigo-400/50",
                    section.designStyleKey === "light-minimal" &&
                      "bg-gray-400/50",
                    section.designStyleKey === "gradient-bold" &&
                      "bg-yellow-300/50",
                    section.designStyleKey === "corporate" && "bg-blue-300/50"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{section.title}</h3>
              {!section.visible && (
                <Badge variant="secondary" className="text-xs">
                  <EyeOff size={12} className="mr-1" />
                  Hidden
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate mb-3">
              {section.subtitle || section.description || "No description"}
            </p>

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Layout Badge */}
              <Badge variant="outline" className="text-xs">
                {layoutLabels[section.layoutType] || "Feature Grid"}
              </Badge>

              {/* Theme Badge */}
              <Badge
                className={cn(
                  "text-xs border",
                  getThemeBadgeColor(section.designStyleKey)
                )}
              >
                {themeLabels[section.designStyleKey]}
              </Badge>

              {/* Feature count if applicable */}
              {section.featureItems && section.featureItems.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {section.featureItems.length} items
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(section)}
                title="Edit section"
                className="h-8 w-8"
              >
                <Edit size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive/80 h-8 w-8"
                onClick={() => onDelete(section.id)}
                title="Delete section"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
