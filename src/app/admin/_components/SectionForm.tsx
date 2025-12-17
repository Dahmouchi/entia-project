import { useState } from "react";
import {
  ThemeStyle,
  SectionLayout,
  FeatureItem,
  SectionWithFeatures,
  Level,
} from "@/lib/secion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { FeatureItemForm } from "./FeatureItemForm";
import { ThemeSelector } from "./ThemeSelector";
import { LayoutSelector } from "./LayoutSelectorProps";
import { cn } from "@/lib/utils";
import { FileUpload } from "./courAddForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LevelItemForm } from "./LevelItemForm";

interface SectionFormProps {
  section?: SectionWithFeatures;
  onSave: (section: Partial<SectionWithFeatures>) => void;
  onCancel: () => void;
}

export const SectionForm = ({
  section,
  onSave,
  onCancel,
}: SectionFormProps) => {
  const [formData, setFormData] = useState({
    key: section?.key || "",
    title: section?.title || "",
    subtitle: section?.subtitle || "",
    description: section?.description || "",
    backgroundImageUrl: section?.backgroundImageUrl || null,
    heroImageUrl: section?.heroImageUrl || null,
    designStyleKey: section?.designStyleKey || ("modern-dark" as ThemeStyle),
    layoutType: section?.layoutType || ("feature-grid" as SectionLayout),
    order: section?.order || 0,
    levels: section?.levels || ([] as Level[]),

    visible: section?.visible ?? true,
    featureItems: section?.featureItems || ([] as FeatureItem[]),
    checklistItems: section?.checklistItems || "",
  });
  const [localChecklistItems, setLocalChecklistItems] = useState(
    formData.checklistItems
      ? formData.checklistItems.split(", ").filter((item) => item.trim() !== "")
      : []
  );

  const [newItemText, setNewItemText] = useState("");

  const handleAddItem = () => {
    // Only add if the text input is not empty
    if (newItemText.trim() === "") return;

    const updated = [...localChecklistItems, newItemText.trim()];
    setLocalChecklistItems(updated);
    setNewItemText(""); // Clear the input field after adding

    // OPTIONAL: Update the parent formData immediately on add
    setFormData({
      ...formData,
      checklistItems: updated.join(", "), // Convert back to string and update final state
    });
  };

  // Function to handle changes in an existing item input
  const handleItemChange = (e: any, index: number) => {
    const updated = [...localChecklistItems];
    updated[index] = e.target.value;
    setLocalChecklistItems(updated);

    // OPTIONAL: Update the parent formData immediately on change
    setFormData({
      ...formData,
      checklistItems: updated.join(", "), // Convert back to string and update final state
    });
  };

  // Function to remove an item
  const handleRemoveItem = (index: number) => {
    const updated = localChecklistItems.filter((_, i) => i !== index);
    setLocalChecklistItems(updated);

    // OPTIONAL: Update the parent formData immediately on removal
    setFormData({
      ...formData,
      checklistItems: updated.join(", "), // Convert back to string and update final state
    });
  };
  const handleAddFeatureItem = () => {
    const maxOrder = formData.featureItems.reduce(
      (max, item) => Math.max(max, item.order),
      -1
    );
    const newItem: FeatureItem = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      iconName: "Star",
      order: maxOrder + 1,
      sectionId: section?.id || "",
    };
    setFormData({
      ...formData,
      featureItems: [...formData.featureItems, newItem],
    });
  };

  const handleUpdateFeatureItem = (
    index: number,
    item: Partial<FeatureItem>
  ) => {
    const updated = [...formData.featureItems];
    updated[index] = { ...updated[index], ...item };
    setFormData({ ...formData, featureItems: updated });
  };

  const handleRemoveFeatureItem = (index: number) => {
    const updated = formData.featureItems.filter((_, i) => i !== index);
    setFormData({ ...formData, featureItems: updated });
  };
  const handleAddLevel = () => {
    const maxOrder = formData.levels.reduce(
      (max, level) => Math.max(max, level.order),
      -1
    );
    const newLevel: Level = {
      id: crypto.randomUUID(),
      name: "",
      grades: [],
      order: maxOrder + 1,
    };
    setFormData({ ...formData, levels: [...formData.levels, newLevel] });
  };

  const handleUpdateLevel = (index: number, item: Partial<Level>) => {
    const updated = [...formData.levels];
    updated[index] = { ...updated[index], ...item };
    setFormData({ ...formData, levels: updated });
  };

  const handleRemoveLevel = (index: number) => {
    const updated = formData.levels.filter((_, i) => i !== index);
    setFormData({ ...formData, levels: updated });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Type de mise en page</CardTitle>
        </CardHeader>
        <CardContent>
          <LayoutSelector
            value={formData.layoutType}
            onChange={(value) =>
              setFormData({ ...formData, layoutType: value })
            }
          />
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Style de thème</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeSelector
            value={formData.designStyleKey}
            onChange={(value) =>
              setFormData({ ...formData, designStyleKey: value })
            }
          />
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Informations de base</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="key">Clé de section</Label>
              <Input
                id="key"
                placeholder="e.g., why_choose_us"
                value={formData.key}
                onChange={(e) =>
                  setFormData({ ...formData, key: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Ordre d&apos;affichage</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              placeholder="Titre de la section"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Sous-titre</Label>
            <Input
              id="subtitle"
              placeholder="Sous-titre optionnel"
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description de la section"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="backgroundImageUrl">Image de couverture</Label>
            <FileUpload
              onFileSelect={(files) =>
                setFormData((prev) => ({
                  ...prev,
                  backgroundImageUrl: files[0] || null,
                }))
              }
              accept="image/*"
              label="Image de couverture"
              description="Glissez-déposez une image ou cliquez pour sélectionner (JPG, PNG)"
              currentFiles={
                formData.backgroundImageUrl ? [formData.backgroundImageUrl] : []
              }
            />
          </div>

          {formData.layoutType === "hero-banner" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="heroImageUrl">Image Principale</Label>
                <FileUpload
                  onFileSelect={(files) =>
                    setFormData((prev) => ({
                      ...prev,
                      heroImageUrl: files[0] || null,
                    }))
                  }
                  accept="image/*"
                  label="Image de couverture"
                  description="Glissez-déposez une image ou cliquez pour sélectionner (JPG, PNG)"
                  currentFiles={
                    formData.heroImageUrl ? [formData.heroImageUrl] : []
                  }
                />
              </div>
              <div className="space-y-4">
                <Label>Éléments de la liste</Label>

                {/* Existing Items List (maps over the local ARRAY state) */}
                <div className="space-y-2">
                  {localChecklistItems.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        value={item}
                        onChange={(e) => handleItemChange(e, index)} // Use the new handler
                        placeholder="Checklist item"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(index)} // Use the new handler
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Input for adding new items */}
                <div className="flex gap-2 pt-2">
                  <Input
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="New checklist item"
                    // Allows pressing Enter to add the item
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddItem();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddItem} // Use the new handler
                  >
                    <Plus size={16} className="mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center gap-3">
            <Switch
              id="visible"
              checked={formData.visible}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, visible: checked })
              }
            />
            <Label htmlFor="visible">Section Visible</Label>
          </div>
        </CardContent>
      </Card>
      {formData.layoutType === "feature-grid" && (
        <div className="space-y-6">
          {/* ---------------------- CARD 1: FEATURE ITEMS ---------------------- */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Niveaux (Programmes)</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddLevel}
                >
                  <Plus size={16} className="mr-2" />
                  Ajouter un niveau
                </Button>
              </div>

              {formData.levels.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun niveau actuellement. Ajoutez des niveaux pour afficher
                  des cartes de programmes avec des notes et des matières.
                </div>
              ) : (
                formData.levels.map((level, index) => (
                  <div key={level.id} className="relative group">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 cursor-grab">
                      <GripVertical size={16} />
                    </div>

                    <LevelItemForm
                      item={level}
                      onChange={(updated) => handleUpdateLevel(index, updated)}
                      onRemove={() => handleRemoveLevel(index)}
                    />
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* ---------------------- CARD 2: LEVELS (PROGRAMS) ---------------------- */}
        </div>
      )}

      {formData.layoutType === "carousel-cards" && (
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {formData.layoutType === "carousel-cards"
                ? "Cartes de programmes"
                : "Éléments de fonctionnalité"}
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddFeatureItem}
            >
              <Plus size={16} className="mr-2" />
              Ajouter un élément
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.featureItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucun élément actuellement. Cliquez sur &quot;Ajouter un
                élément&quot; pour en créer un.
              </div>
            ) : (
              formData.featureItems.map((item, index) => (
                <div key={item.id} className="relative group">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 cursor-grab">
                    <GripVertical size={16} />
                  </div>
                  <FeatureItemForm
                    item={item}
                    onChange={(updated) =>
                      handleUpdateFeatureItem(index, updated)
                    }
                    onRemove={() => handleRemoveFeatureItem(index)}
                  />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">
          {section ? "Mettre à jour la section" : "Créer la section"}
        </Button>
      </div>
    </form>
  );
};
