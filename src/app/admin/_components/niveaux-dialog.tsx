"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Niveau } from "@/types/menu";

interface NiveauDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  niveau: Niveau | null;
  onSave: (data: { name: string }) => void;
}

export default function NiveauDialog({
  open,
  onOpenChange,
  niveau,
  onSave,
}: NiveauDialogProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (niveau) {
      setName(niveau.name);
    } else {
      setName("");
    }
  }, [niveau]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }

    setLoading(true);
    
    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave({ name: name.trim() });
    setLoading(false);
    setName("");
  };

  const handleCancel = () => {
    setName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {niveau ? "Modifier le niveau" : "Créer un nouveau niveau"}
            </DialogTitle>
            <DialogDescription>
              {niveau 
                ? "Modifiez les informations du niveau d'éducation."
                : "Créez un nouveau niveau d'éducation pour votre établissement."
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom *
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Primaire, Collège, Lycée..."
                className="col-span-3"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {niveau ? "Modification..." : "Création..."}
                </div>
              ) : (
                niveau ? "Modifier" : "Créer"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
