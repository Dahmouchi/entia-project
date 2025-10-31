/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { SendSynthese } from "@/actions/sendEmail";
import { toast } from "react-toastify";
import { NotebookText } from "lucide-react";

const ButtonSynthese = ({ course, userId }: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return toast.error("Veuillez sélectionner un fichier PDF.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("courseId", course?.id);

    try {
      setLoading(true);
      await SendSynthese(formData);
      toast.success("Synthèse envoyée avec succès !");
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l’envoi du fichier.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="relative py-6 w-full cursor-pointer overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:scale-[1.03] focus:ring-2 focus:ring-blue-300">
            <span className="relative z-10 flex items-center justify-center gap-3"> Déposer Synthèse <NotebookText /></span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-300 hover:opacity-30" />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Déposer la Synthèse
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-3">
            <div>
              <p>
                <strong>Cours :</strong> {course?.title}
              </p>
              <p>
                <strong>Professeur :</strong>{" "}
                {course?.data?.teacher?.name || "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Choisir un fichier PDF</Label>
              <Input
                id="file"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!file || loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? "Envoi en cours..." : "Envoyer"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ButtonSynthese;
