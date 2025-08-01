"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FileText, Download, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizDisplay from "./quizSection";

const CourseContent = ({ course, userId }: any) => {
  const handleScoreUpdate = (score: any) => {
    console.log("Nouveau score:", score);
    // Ici vous pouvez envoyer le score à votre API ou mettre à jour votre état global
  };
  if (!course) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-500 text-center">
          Sélectionnez un cours pour voir le contenu
        </p>
      </div>
    );
  }

  const documents = course.documents;
  const quizzes = course.quizzes;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Navigation par onglets */}

      {/* Contenu des sections */}
      <div className="lg:p-6 p-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Documents et ressources
          </h3>

          {documents.length > 0 ? (
            <div className="grid gap-3">
              {documents.map((document: any) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {document.name}
                      </h4>
                      <p className="text-xs text-gray-500">Document PDF</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(document.url, "_blank")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">
                Aucun document disponible pour ce cours.
              </p>
            </div>
          )}
        </div>
        <div className="space-y-4 mt-5">
          <QuizDisplay
            quizzes={quizzes}
            userId={userId}
            onScoreUpdate={handleScoreUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
