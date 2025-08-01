/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, Download, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Configuration de PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  documentName: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose, pdfUrl, documentName }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Callback quand le document est chargé
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
    setError(null);
  }, []);

  // Callback en cas d'erreur de chargement
  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Erreur de chargement PDF:', error);
    setIsLoading(false);
    setError('Impossible de charger le document PDF. Vérifiez que le fichier est accessible.');
  }, []);

  // Navigation entre les pages
  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));

  // Contrôles de zoom
  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  // Rotation
  const rotate = () => setRotation(prev => (prev + 90) % 360);

  // Plein écran
  const toggleFullscreen = () => setIsFullscreen(prev => !prev);

  // Réinitialiser l'état quand le modal s'ouvre
  React.useEffect(() => {
    if (isOpen) {
      setPageNumber(1);
      setScale(1.0);
      setRotation(0);
      setIsLoading(true);
      setError(null);
      setIsFullscreen(false);
    }
  }, [isOpen]);

  // Gestion des touches du clavier
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevPage();
          break;
        case 'ArrowRight':
          goToNextPage();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case 'r':
        case 'R':
          rotate();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pageNumber, numPages]);

  // Empêcher le scroll du body
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalClasses = isFullscreen 
    ? 'fixed inset-0 z-50 bg-black'
    : 'fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4';

  const contentClasses = isFullscreen
    ? 'w-full h-full bg-white flex flex-col'
    : 'bg-white rounded-2xl shadow-2xl max-w-6xl h-full  w-full flex flex-col';

  return (
    <div className={modalClasses} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={contentClasses} onClick={(e) => e.stopPropagation()}>
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate max-w-md">
                {documentName}
              </h3>
              <p className="text-sm text-gray-500">
                {numPages > 0 && `${numPages} page${numPages > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Navigation */}
            <div className="flex items-center space-x-1 bg-white rounded-lg border px-2 py-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <span className="text-sm font-medium px-2 min-w-[60px] text-center">
                {pageNumber} / {numPages || '?'}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Zoom */}
            <div className="flex items-center space-x-1 bg-white rounded-lg border px-2 py-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomOut}
                disabled={scale <= 0.5}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              <span className="text-sm font-medium px-2 min-w-[50px] text-center">
                {Math.round(scale * 100)}%
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomIn}
                disabled={scale >= 3.0}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            {/* Autres contrôles */}
            <Button
              variant="ghost"
              size="sm"
              onClick={rotate}
              className="h-8 w-8 p-0"
              title="Rotation (R)"
            >
              <RotateCw className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 w-8 p-0"
              title="Plein écran (F)"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(pdfUrl, '_blank')}
              className="h-8 w-8 p-0"
              title="Télécharger"
            >
              <Download className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
              title="Fermer (Esc)"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contenu PDF */}
        <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4">
          {isLoading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Chargement du document...</p>
            </div>
          )}

          {error && (
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Erreur de chargement</h4>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.open(pdfUrl, '_blank')} variant="outline">
                Ouvrir dans un nouvel onglet
              </Button>
            </div>
          )}

          {!isLoading && !error && (
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mx-auto mb-2"></div>
                  <p className="text-gray-600">Chargement...</p>
                </div>
              }
              error={
                <div className="text-center text-red-600">
                  <p>Erreur de chargement du PDF</p>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                loading={
                  <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chargement de la page...</p>
                  </div>
                }
                error={
                  <div className="w-full h-96 bg-red-50 rounded-lg flex items-center justify-center">
                    <p className="text-red-600">Erreur de chargement de la page</p>
                  </div>
                }
                className="shadow-lg"
              />
            </Document>
          )}
        </div>

        {/* Barre d'état */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Zoom: {Math.round(scale * 100)}%</span>
            <span>Rotation: {rotation}°</span>
            {numPages > 0 && <span>Pages: {numPages}</span>}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-xs">
              Raccourcis: ← → (navigation), +/- (zoom), R (rotation), F (plein écran), Esc (fermer)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;