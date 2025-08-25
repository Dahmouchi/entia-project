import MatterportViewer from '@/components/MatterportViewer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Test d&apos;intégration Matterport
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Démonstration d&apos;un modèle 3D Matterport intégré dans une application Next.js 
            avec TypeScript et Tailwind CSS.
          </p>
        </div>

        {/* Matterport Viewer */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Modèle 3D - Aon Lobby
            </h2>
            <MatterportViewer 
              spaceId="UoqjwziqrZs"
              width="100%"
              height="600px"
            />
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-blue-600 text-2xl mb-3">🏗️</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Next.js 15</h3>
            <p className="text-gray-600">
              Application construite avec la dernière version de Next.js et le App Router.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-blue-600 text-2xl mb-3">📝</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">TypeScript</h3>
            <p className="text-gray-600">
              Code entièrement typé pour une meilleure maintenabilité et développement.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-blue-600 text-2xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tailwind CSS</h3>
            <p className="text-gray-600">
              Interface utilisateur moderne et responsive avec Tailwind CSS.
            </p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Détails techniques
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-gray-700">SDK Matterport:</strong>
                <span className="text-gray-600 ml-2">@matterport/sdk v1.5.1</span>
              </div>
              <div>
                <strong className="text-gray-700">Modèle 3D:</strong>
                <span className="text-gray-600 ml-2">Aon Lobby (UoqjwziqrZs)</span>
              </div>
              <div>
                <strong className="text-gray-700">Framework:</strong>
                <span className="text-gray-600 ml-2">Next.js 15 + TypeScript</span>
              </div>
              <div>
                <strong className="text-gray-700">Styling:</strong>
                <span className="text-gray-600 ml-2">Tailwind CSS v4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}