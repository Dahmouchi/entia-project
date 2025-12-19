"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, List, Edit2 } from "lucide-react";
import { toast } from "react-toastify";
import { SectionCard } from "./SectionCard";
import { SectionPreview } from "./SectionPreview";
import { SectionForm } from "./SectionForm";
import { SectionWithFeatures } from "@/lib/secion";
import { createSection, deleteSection, updateSection } from "@/actions/landing";
import { useRouter } from "next/navigation";

// Sample data for demonstration

export const SectionManager = (initialSections: { initialSections: any[] }) => {
  const [sections, setSections] = useState<any[]>(
    initialSections.initialSections
  );
  const [editingSection, setEditingSection] =
    useState<SectionWithFeatures | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [previewSection, setPreviewSection] =
    useState<SectionWithFeatures | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "preview">("list");
  const router = useRouter();

  const handleSave = async (data: Partial<SectionWithFeatures>) => {
    if (editingSection) {
      setSections(
        sections.map((s) =>
          s.id === editingSection.id
            ? { ...s, ...data, updatedAt: new Date() }
            : s
        )
      );
      const res = await updateSection(editingSection.id, data);
      if (res.success) {
        toast.success("Section updated successfully");
        window.location.reload();
      } else {
        console.log(res);
        toast.error("Section update failed");
      }
    } else {
      const newSection: SectionWithFeatures = {
        id: crypto.randomUUID(),
        key: data.key || "",
        title: data.title || "",
        subtitle: data.subtitle || "",
        description: data.description || "",
        backgroundImageUrl: data.backgroundImageUrl || null,
        designStyleKey: data.designStyleKey || "modern-dark",
        order: data.order || sections.length,
        layoutType: data.layoutType || "hero-banner",
        checklistItems: data.checklistItems || "",
        levels: data.levels || [],
        heroImageUrl: data.heroImageUrl || null,
        visible: data.visible ?? true,
        featureItems: data.featureItems || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const res = await createSection(newSection);
      if (res.success) {
        window.location.reload();
        setSections([...sections, newSection]);
        toast.success("Section created successfully");
      }
    }
    setIsFormOpen(false);
    setEditingSection(null);
  };

  const handleDelete = async (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
    await deleteSection(id);
    toast.success("Section deleted");
    window.location.reload();
  };

  const handleToggleVisibility = (id: string) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  };

  const handleDuplicate = (section: SectionWithFeatures) => {
    const duplicate: SectionWithFeatures = {
      ...section,
      id: crypto.randomUUID(),
      key: `${section.key}_copy`,
      title: `${section.title} (Copy)`,
      order: sections.length,
      createdAt: new Date(),
      updatedAt: new Date(),
      featureItems: section.featureItems.map((item: any) => ({
        ...item,
        id: crypto.randomUUID(),
      })),
    };
    setSections([...sections, duplicate]);
    toast.success("Section duplicated");
  };

  const handleEdit = (section: SectionWithFeatures) => {
    setEditingSection(section);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingSection(null);
    setIsFormOpen(true);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Sections de la page d&apos;accueil
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez et personnalisez les sections de votre page d&apos;accueil
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as "list" | "preview")}
          >
            <TabsList>
              <TabsTrigger value="list" className="gap-2">
                <List size={16} />
                Liste
              </TabsTrigger>

              <TabsTrigger value="preview" className="gap-2">
                <Eye size={16} />
                Aperçu
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={handleAddNew} className="gap-2">
            <Plus size={18} />
            Ajouter une section
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "list" ? (
        <div className="space-y-4">
          {sections.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg mb-4">Aucune section pour le moment</p>
              <Button
                onClick={handleAddNew}
                variant="outline"
                className="gap-2"
              >
                <Plus size={18} />
                Créer votre première section
              </Button>
            </div>
          ) : (
            sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleVisibility={handleToggleVisibility}
                  onDuplicate={handleDuplicate}
                />
              ))
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {sections
            .filter((s) => s.visible)
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <div key={section.id} className="relative group">
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(section)}
                    className="gap-2"
                  >
                    <Edit2 size={16} />
                    Modifier
                  </Button>
                </div>
                <SectionPreview section={section} />
              </div>
            ))}
          {sections.filter((s) => s.visible).length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p>Aucune section visible pour &apos;aperçu</p>
            </div>
          )}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="h-[80vh] min-w-[80vw] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSection ? "Edit Section" : "Create New Section"}
            </DialogTitle>
          </DialogHeader>
          <SectionForm
            section={editingSection || undefined}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingSection(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
