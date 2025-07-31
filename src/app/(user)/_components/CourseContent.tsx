"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FileText, Download, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CourseContent= ({ course }:any) => {
  const [activeSection, setActiveSection] = useState<string>('description');

  if (!course) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-500 text-center">Sélectionnez un cours pour voir le contenu</p>
      </div>
    );
  }

  const documents = course.documents;
  const quizzes = course.quizzes;

  const sections = [
    {
      id: 'description',
      title: 'Description du cours',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'documents',
      title: 'Documents et ressources',
      icon: Download,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'quiz',
      title: 'Quiz d\'évaluation',
      icon: HelpCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Navigation par onglets */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-0 flex-col lg:flex-row">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors duration-200
                  ${isActive 
                    ? `border-current ${section.color} ${section.bgColor}` 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{section.title}</span>
                {isActive ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu des sections */}
      <div className="p-6">
        {activeSection === 'description' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Description du cours
            </h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {course.content || 'Aucune description disponible pour ce cours.'}
              </p>
            </div>
          </div>
        )}

        {activeSection === 'documents' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Documents et ressources
            </h3>
            
            {documents.length > 0 ? (
              <div className="grid gap-3">
                {documents.map((document:any) => (
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
                        <p className="text-xs text-gray-500">
                          Document PDF
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(document.url, '_blank')}
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
                <p className="text-gray-500">Aucun document disponible pour ce cours.</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'quiz' && (
          <div className="space-y-4">
            {quizzes.length > 0 ? (
              quizzes.map((quiz:any) => (
                <div key={quiz.id}></div>
              ))
            ) : (
              <div className="text-center py-8">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Aucun quiz disponible pour ce cours.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;

