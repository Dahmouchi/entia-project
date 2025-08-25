'use client';

import { useState } from 'react';

interface MatterportViewerProps {
  spaceId: string;
  width?: string;
  height?: string;
}

export default function MatterportViewer({ 
  spaceId, 
  width = '100%', 
  height = '500px' 
}: MatterportViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setError('Impossible de charger le modèle 3D Matterport');
    setIsLoading(false);
  };

  const iframeSrc = `https://my.matterport.com/show/?m=${spaceId}&play=1&qs=1&gt=0&hr=0`;

  if (error) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-lg" style={{ width, height }}>
        <div className="text-center p-4">
          <div className="text-red-500 text-lg mb-2">⚠️</div>
          <p className="text-gray-700">{error}</p>
          <p className="text-sm text-gray-500 mt-2">
            Vérifiez que l&apos;ID du modèle est correct: {spaceId}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10"
          style={{ width, height }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Chargement du modèle 3D...</p>
          </div>
        </div>
      )}
      <iframe
        src={iframeSrc}
        width={width}
        height={height}
        style={{ border: 'none', borderRadius: '8px' }}
        allow="fullscreen; vr"
        allowFullScreen
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        className="rounded-lg"
        title={`Matterport 3D Model - ${spaceId}`}
      />
    </div>
  );
}
